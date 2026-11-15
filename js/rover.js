/* ==========================================================================
   NASA MARS ROVER PHOTOS API — photos réelles du rover Perseverance (Cratère Jezero)
   Jour N de la mission = Sol N de Perseverance : vous voyez ce que le rover a réellement photographié.
   Repli automatique : dernières photos -> message hors ligne. Ne bloque jamais le jeu.
   ========================================================================== */
const ROVER_NAME = "perseverance";
const ROVER_API = "https://api.nasa.gov/mars-photos/api/v1";
const ROVER_KEY = "DEMO_KEY"; // remplacez par votre clé gratuite : https://api.nasa.gov
const roverCache = {};
let roverView = { day: null, photos: [], idx: 0, label: "", manifest: null };

function roverFetch(url) {
  const c = new AbortController();
  const tid = setTimeout(() => c.abort(), 6000);
  return fetch(url, { signal: c.signal })
    .then((r) => { clearTimeout(tid); if (!r.ok) throw new Error(r.status); return r.json(); });
}

async function loadRoverManifest() {
  if (roverView.manifest) return roverView.manifest;
  try {
    const j = await roverFetch(`${ROVER_API}/manifests/${ROVER_NAME}?api_key=${ROVER_KEY}`);
    roverView.manifest = j.photo_manifest;
  } catch (e) { /* facultatif */ }
  return roverView.manifest;
}

async function loadRoverPhotos(day) {
  if (roverCache[day]) return roverCache[day];
  let result = { photos: [], label: "" };
  try {
    const j = await roverFetch(`${ROVER_API}/rovers/${ROVER_NAME}/photos?sol=${day}&api_key=${ROVER_KEY}`);
    if (j.photos && j.photos.length) {
      result = { photos: j.photos.slice(0, 12), label: "sol" };
    } else {
      const l = await roverFetch(`${ROVER_API}/rovers/${ROVER_NAME}/latest_photos?api_key=${ROVER_KEY}`);
      result = { photos: (l.latest_photos || []).slice(0, 12), label: "latest" };
    }
  } catch (e) { result = { photos: [], label: "error" }; }
  roverCache[day] = result;
  return result;
}

function roverText() {
  const fr = currentLang === "fr";
  return {
    title: fr ? "📷 PHOTOS RÉELLES — ROVER PERSEVERANCE (NASA)" : "📷 REAL PHOTOS — PERSEVERANCE ROVER (NASA)",
    loading: fr ? "Connexion aux archives de la NASA…" : "Connecting to NASA archives…",
    offline: fr ? "Photos indisponibles (hors ligne ou limite de l'API). Le jeu continue normalement." : "Photos unavailable (offline or API limit). The game continues normally.",
    same: (d) => fr ? `Sol ${d} de Perseverance : exactement ce que le rover a vu le même jour de sa mission.` : `Perseverance sol ${d}: exactly what the rover saw on the same day of its mission.`,
    latest: fr ? "Aucune photo pour ce sol : voici les dernières images envoyées par le rover." : "No photo for this sol: here are the rover's latest images.",
    cam: fr ? "Caméra" : "Camera", date: fr ? "Date terrestre" : "Earth date",
    total: fr ? "photos au total" : "photos in total", landed: fr ? "Atterrissage" : "Landing"
  };
}

function paintRoverCard() {
  const card = document.getElementById("rover-card");
  if (!card) return;
  const T = roverText(), v = roverView, m = v.manifest;
  const p = v.photos[v.idx];
  let html = `<div class="rover-head"><strong>${T.title}</strong>${m ? `<span>${T.landed} ${m.landing_date} · ${Number(m.total_photos).toLocaleString(currentLang)} ${T.total}</span>` : ""}</div>`;
  if (v.label === "loading") html += `<p class="rover-note">${T.loading}</p>`;
  else if (!p) html += `<p class="rover-note">${T.offline}</p>`;
  else {
    const src = p.img_src.replace("http://", "https://");
    html += `<p class="rover-note">${v.label === "latest" ? T.latest : T.same(p.sol)}</p>
      <div class="rover-frame"><button class="rover-nav" id="rover-prev" aria-label="prev">‹</button>
      <a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="Perseverance ${p.camera.full_name}" loading="lazy"></a>
      <button class="rover-nav" id="rover-next" aria-label="next">›</button></div>
      <p class="rover-meta">${T.cam} : ${p.camera.full_name} · ${T.date} : ${p.earth_date} · ${v.idx + 1}/${v.photos.length}</p>`;
  }
  card.innerHTML = html;
  const go = (d) => { v.idx = (v.idx + d + v.photos.length) % v.photos.length; paintRoverCard(); };
  const pr = document.getElementById("rover-prev"), nx = document.getElementById("rover-next");
  if (pr) pr.onclick = () => go(-1);
  if (nx) nx.onclick = () => go(1);
}

async function refreshRoverCard() {
  const day = state.day;
  if (roverView.day === day) { paintRoverCard(); return; } // même jour : on repeint seulement (changement de langue)
  roverView.day = day; roverView.photos = []; roverView.idx = 0; roverView.label = "loading";
  paintRoverCard();
  const [res] = await Promise.all([loadRoverPhotos(day), loadRoverManifest()]);
  if (roverView.day !== day) return; // l'utilisateur est déjà passé au jour suivant
  roverView.photos = res.photos; roverView.label = res.label;
  paintRoverCard();
}

/* Branchement sans modifier le moteur : on enveloppe renderMissionView */
const _renderMissionViewOrig = renderMissionView;
renderMissionView = function () { _renderMissionViewOrig(); refreshRoverCard(); };
