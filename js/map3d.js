/* ==========================================================================
   CARTE 3D DE MARS — mosaïque Viking MDIM 2.1 (NASA/USGS) + sites d'intérêt, FR/EN
   Si la vraie carte ne charge pas : texture générée localement (aucun blocage).
   ========================================================================== */
const MAP_SITES = [
  { n: "Jezero (Perseverance)", lat: 18.4, lon: 77.6, fr: "Ancien delta de rivière : site de votre base et du rover Perseverance.", en: "Ancient river delta: your base and Perseverance's landing site." },
  { n: "Gale (Curiosity)", lat: -5.4, lon: 137.8, fr: "Cratère de 154 km avec une montagne de couches sédimentaires, le mont Sharp.", en: "154 km crater with a layered sediment mountain, Mount Sharp." },
  { n: "Olympus Mons", lat: 18.65, lon: -133.8, fr: "Plus grand volcan du système solaire : environ 22 km de haut.", en: "Largest volcano in the solar system: about 22 km high." },
  { n: "Valles Marineris", lat: -13.9, lon: -59.2, fr: "Canyon long d'environ 4 000 km, bien plus vaste que le Grand Canyon.", en: "Canyon about 4,000 km long, far larger than the Grand Canyon." },
  { n: "Hellas Planitia", lat: -42.4, lon: 70.5, fr: "Immense bassin d'impact : la pression atmosphérique y est la plus élevée.", en: "Huge impact basin: highest atmospheric pressure on Mars." },
  { n: "Pôle Nord / North Pole", lat: 85, lon: 0, fr: "Calotte d'eau gelée et de CO₂ : réserve d'eau potentielle.", en: "Cap of water ice and CO₂: a potential water reserve." }
];
let mapTex = null, mapTexTried = false, mapFocusFn = null;

function mapLoadTexture(cb) {
  if (mapTex) return cb(mapTex);
  if (mapTexTried || typeof THREE === "undefined") return;
  mapTexTried = true;
  const ld = new THREE.TextureLoader(); ld.setCrossOrigin("anonymous");
  ld.load("https://commons.wikimedia.org/wiki/Special:FilePath/Mars_Viking_MDIM21_ClrMosaic_global_1024.jpg",
    (t) => { mapTex = t; cb(t); }, undefined, () => {});
}
function mapProceduralTexture() {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 512; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, "#b5502a"); g.addColorStop(.5, "#c9663a"); g.addColorStop(1, "#a8462a");
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 240; i++) { x.fillStyle = `rgba(${60 + Math.random() * 60 | 0},25,15,${.08 + Math.random() * .16})`; x.beginPath(); x.ellipse(Math.random() * 1024, Math.random() * 512, 10 + Math.random() * 60, 6 + Math.random() * 26, Math.random() * 3, 0, 7); x.fill(); }
  x.fillStyle = "rgba(255,255,255,.85)"; x.fillRect(0, 0, 1024, 16); x.fillRect(0, 496, 1024, 16);
  return new THREE.CanvasTexture(c);
}
function mapLatLon(lat, lon, r) {
  const u = (lon + 180) / 360 * 2 * Math.PI, p = lat * Math.PI / 180;
  return new THREE.Vector3(-r * Math.cos(u) * Math.cos(p), r * Math.sin(p), r * Math.sin(u) * Math.cos(p));
}
function mapBuild() {
  const cv = document.getElementById("marsmap-canvas");
  if (!cv || typeof THREE === "undefined" || cv.dataset.built) return;
  cv.dataset.built = 1;
  const w = cv.clientWidth, h = cv.clientHeight, R = 1.4;
  const rd = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); rd.setSize(w, h, false);
  const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(42, w / h, .1, 50); cam.position.z = 4.1;
  const outer = new THREE.Group(), globe = new THREE.Group(); outer.add(globe); sc.add(outer);
  const mat = new THREE.MeshStandardMaterial({ map: mapTex || mapProceduralTexture(), roughness: 1 });
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), mat));
  mapLoadTexture((t) => { mat.map = t; mat.needsUpdate = true; });
  const marks = MAP_SITES.map((s, i) => { const m = new THREE.Mesh(new THREE.SphereGeometry(i === 0 ? .045 : .03, 12, 12), new THREE.MeshBasicMaterial({ color: i === 0 ? 0x4fc3f7 : 0xecc94b })); m.position.copy(mapLatLon(s.lat, s.lon, R + .02)); globe.add(m); return m; });
  sc.add(new THREE.AmbientLight(0x664433, .9)); const L = new THREE.DirectionalLight(0xfff0e0, 1.5); L.position.set(4, 2, 5); sc.add(L);
  let target = null, drag = false, lx = 0, ly = 0;
  mapFocusFn = (i) => { const s = MAP_SITES[i], p = mapLatLon(s.lat, s.lon, 1); target = { y: -Math.atan2(p.x, p.z), x: s.lat * Math.PI / 180 }; };
  cv.onpointerdown = (e) => { drag = true; target = null; lx = e.clientX; ly = e.clientY; };
  addEventListener("pointerup", () => (drag = false));
  cv.onpointermove = (e) => { if (!drag) return; globe.rotation.y += (e.clientX - lx) * .008; outer.rotation.x = Math.max(-1.2, Math.min(1.2, outer.rotation.x + (e.clientY - ly) * .006)); lx = e.clientX; ly = e.clientY; };
  (function loop(t) {
    if (!document.getElementById("map3d-modal").classList.contains("show")) { cv.dataset.built = ""; rd.dispose(); return; }
    if (target) { globe.rotation.y += (target.y - globe.rotation.y) * .08; outer.rotation.x += (target.x - outer.rotation.x) * .08; }
    else if (!drag) globe.rotation.y += .0025;
    marks.forEach((m, i) => m.scale.setScalar(1 + .35 * Math.sin(t / 300 + i)));
    rd.render(sc, cam); requestAnimationFrame(loop);
  })(0);
}
function mapShowInfo(i) {
  const s = MAP_SITES[i];
  document.getElementById("map-info").innerHTML = `<strong>${s.n}</strong> · ${s.lat}°, ${s.lon}°<br>${s[currentLang]}`;
  if (mapFocusFn) mapFocusFn(i);
}
function toggleMap3D(open) {
  const m = document.getElementById("map3d-modal"), fr = currentLang === "fr";
  m.classList.toggle("show", open);
  if (!open) return;
  document.getElementById("map3d-title").textContent = fr ? "🗺️ CARTE 3D DE MARS" : "🗺️ 3D MAP OF MARS";
  document.getElementById("map3d-hint").textContent = fr ? "Glissez pour tourner · touchez un site pour le localiser" : "Drag to rotate · tap a site to locate it";
  document.getElementById("map3d-close").textContent = fr ? "✕ Fermer" : "✕ Close";
  document.getElementById("map-info").innerHTML = fr ? "Choisissez un site : <strong>Jezero</strong> est l'emplacement de votre base." : "Pick a site: <strong>Jezero</strong> is your base location.";
  document.getElementById("map-sites").innerHTML = MAP_SITES.map((s, i) => `<button type="button" onclick="mapShowInfo(${i})">${s.n}</button>`).join("");
  requestAnimationFrame(mapBuild);
}
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div"); modal.id = "map3d-modal";
  modal.innerHTML = `<div class="wrap"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><strong id="map3d-title" style="color:var(--accent-orange)"></strong><button id="map3d-close" class="btn-chip" type="button"></button></div><canvas id="marsmap-canvas"></canvas><p id="map3d-hint" class="rover-meta" style="text-align:center"></p><div class="map-sites" id="map-sites"></div><div id="map-info"></div><p class="rover-meta">Mosaïque Viking MDIM 2.1 (NASA/USGS) · <a href="https://trek.nasa.gov/mars/" target="_blank" rel="noopener" style="color:var(--accent-cyan)">NASA Mars Trek</a></p></div>`;
  document.body.appendChild(modal);
  document.getElementById("map3d-close").onclick = () => toggleMap3D(false);
  const mk = (id) => { const b = document.createElement("button"); b.id = id; b.type = "button"; b.className = "btn-chip"; b.textContent = "🗺️ " + (currentLang === "fr" ? "CARTE 3D" : "3D MAP"); b.onclick = () => toggleMap3D(true); return b; };
  const a = document.getElementById("btn-open-sources"), b2 = document.getElementById("btn-sources-mission");
  if (a) a.before(mk("btn-map3d")); if (b2) b2.before(mk("btn-map3d-m"));
  mapLoadTexture(() => {}); // préchargement discret
});
/* le libellé des boutons suit la langue */
const _applyLangOrig = applyLanguage;
applyLanguage = function (l) { _applyLangOrig(l); ["btn-map3d", "btn-map3d-m"].forEach((id) => { const e = document.getElementById(id); if (e) e.textContent = "🗺️ " + (currentLang === "fr" ? "CARTE 3D" : "3D MAP"); }); };
