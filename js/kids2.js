/* ==========================================================================
   VERSION ENFANTS 2 : intro 3D (la station part de la Terre vers Mars), écran « Coucou », 4 choix par sol,
   chrono, 3 cœurs, Lili (visage humain) qui console avec une sucette, mini-visite de Lili au Sol 1.
   ========================================================================== */
const EXTRA = [
 [["Isoler la maison avec de la terre rouge","Sur Mars, on peut empiler de la terre autour de la maison pour la protéger du froid et des rayons. Ça prend du temps, mais c'est futé !",{radiation:-6,energie:-6,oxygene:2},1],["Faire une grande fête dehors pour fêter l'arrivée","C'est joyeux, mais dehors il n'y a ni air ni protection contre les rayons. La fête attendra !",{radiation:8,oxygene:-6,sante:-5},0]],
 [["Faire pousser des plantes pour fabriquer de l'air","Les plantes donnent de l'oxygène, c'est leur magie ! C'est lent, mais ça marche.",{oxygene:8,nourriture:4,energie:-5},1],["Retenir sa respiration pour économiser l'air","Ce n'est pas possible et pas sain ! Il faut vraiment fabriquer de l'air.",{oxygene:-6,sante:-8},0]],
 [["Faire fondre de la glace pour avoir de l'eau","La glace de Mars peut devenir de l'eau, mais il faut beaucoup d'énergie pour la chauffer.",{eau:12,energie:-12},1],["Boire l'eau du circuit de refroidissement","Cette eau n'est pas propre ! On ne boit jamais n'importe quelle eau.",{eau:4,sante:-12},0]],
 [["Planter des salades qui poussent vite","Certaines plantes, comme la laitue, poussent vite : les astronautes de la station spatiale en ont déjà mangé !",{nourriture:10,eau:-4,energie:-5},1],["Arroser les plantes avec beaucoup trop d'eau","Trop d'eau étouffe les racines et gaspille l'eau précieuse.",{eau:-12,nourriture:-4},0]],
 [["Tourner les panneaux face au Soleil","Les panneaux solaires doivent regarder le Soleil, comme les tournesols !",{energie:10,oxygene:-2},1],["Éteindre le chauffage de toute la maison","Ça économise l'énergie, mais il fait −60 °C dehors : on aurait très froid.",{energie:6,sante:-10},0]],
 [["Rester dans la pièce la mieux protégée","Au milieu de la maison, il y a plus de murs entre toi et les rayons. Astuce de vrais astronautes !",{radiation:-8,energie:-4},1],["Aller regarder l'éruption dehors avec des jumelles","Regarder le Soleil de près est très dangereux ! On l'observe avec des instruments, jamais dehors.",{radiation:20,sante:-14},0]],
 [["Garder seulement la chaleur et la lumière","Quand il reste peu d'énergie, on garde ce qui est vital : la chaleur et l'air.",{energie:-6,oxygene:-2},1],["Sortir réparer les panneaux pendant la tempête","Dehors, la tempête est trop forte : on ne voit rien et c'est dangereux.",{energie:4,sante:-12,radiation:5},0]],
 [["Réchauffer le tuyau avec une petite lampe","Parfois un peu de chaleur suffit à débloquer un tuyau gelé.",{energie:-6,eau:4},1],["Taper très fort sur la pompe avec un marteau","Taper sur une machine fragile peut la casser pour de bon !",{integrite:-12},0]],
 [["Chaque astronaute vérifie une ressource","Travailler en équipe, c'est la clé : chacun surveille une chose et personne n'oublie rien.",{energie:-4,eau:5,oxygene:5},1],["Oublier de vérifier et attendre demain","Si on ne vérifie pas, on découvre les problèmes trop tard.",{energie:-2,eau:-6,oxygene:-6},0]],
 [["Faire un dessin pour raconter la mission à la Terre","Les astronautes ont aussi des journaux de bord et des photos. Raconter, c'est important pour la science !",{energie:-3,nourriture:3,oxygene:4},1],["Éteindre tous les capteurs pour dormir plus tôt","Les capteurs envoient les mesures à la Terre. Sans eux, la science s'arrête.",{energie:6,oxygene:-6,radiation:4},0]]
];
MISSIONS_DATA.forEach((m, i) => {
  m.decisions.forEach((d, j) => (d.ok = j === 0));
  EXTRA[i].forEach((e) => m.decisions.push({ lead: "LILI", ok: !!e[3], impacts: e[2], scienceRef: "Le savais-tu ? • NASA",
    title: { fr: e[0], en: e[0] }, desc: { fr: kidHint(e[2]), en: kidHint(e[2]) }, scienceText: { fr: e[1], en: e[1] },
    ariaFeedback: { fr: e[3] ? "Bien joué, c'est un malin choix ! 🎉" : "Oups, ce n'était pas le meilleur choix… on apprend ! 💪", en: "" } }));
  m.decisions.forEach((d) => { if (!d.ok) d.ariaFeedback.fr = "Oups, ce n'était pas le meilleur choix… tu perds un cœur ! 💪"; });
});
const _gds = getDefaultState; getDefaultState = () => ({ ..._gds(), hearts: 3 });
if (state.hearts === undefined) state.hearts = 3;

/* ----- Lili au visage humain, avec un corps ----- */
function liliSVG(sad) {
  return `<svg viewBox="0 0 120 190" class="story-avatar lili-big"><ellipse cx="60" cy="182" rx="30" ry="6" fill="#0003"/><rect x="42" y="132" width="14" height="44" rx="7" fill="#f1f5f9"/><rect x="64" y="132" width="14" height="44" rx="7" fill="#f1f5f9"/><rect x="38" y="172" width="20" height="10" rx="5" fill="#ed8936"/><rect x="62" y="172" width="20" height="10" rx="5" fill="#ed8936"/>
  <rect x="32" y="84" width="56" height="56" rx="20" fill="#f8fafc"/><rect x="48" y="98" width="24" height="14" rx="5" fill="#52d1b8"/><circle cx="60" cy="125" r="5" fill="#ed8936"/>
  <rect x="14" y="88" width="16" height="42" rx="8" fill="#f8fafc" transform="rotate(${sad ? -140 : 12} 22 92)"/><rect x="90" y="88" width="16" height="42" rx="8" fill="#f8fafc" transform="rotate(${sad ? 140 : -12} 98 92)"/>
  <circle cx="22" cy="130" r="8" fill="#a0603a"/><circle cx="98" cy="130" r="8" fill="#a0603a"/>
  <circle cx="30" cy="30" r="14" fill="#3b2314"/><circle cx="90" cy="30" r="14" fill="#3b2314"/><circle cx="60" cy="44" r="38" fill="#3b2314"/><ellipse cx="60" cy="52" rx="29" ry="32" fill="#a0603a"/>
  <path d="M30 40q30-26 60 0q-8-14-30-14t-30 14z" fill="#3b2314"/>
  <ellipse cx="48" cy="52" rx="5" ry="${sad ? 4 : 6}" fill="#fff"/><ellipse cx="72" cy="52" rx="5" ry="${sad ? 4 : 6}" fill="#fff"/><circle cx="48" cy="${sad ? 54 : 53}" r="3" fill="#1b0f08"/><circle cx="72" cy="${sad ? 54 : 53}" r="3" fill="#1b0f08"/>
  <path d="${sad ? "M40 42l10 4M80 42l-10 4" : "M41 44q7-5 14 0M65 44q7-5 14 0"}" stroke="#1b0f08" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="${sad ? "M50 72q10-9 20 0" : "M48 66q12 14 24 0z"}" stroke="#7a1f1f" stroke-width="3" fill="${sad ? "none" : "#fff"}" stroke-linecap="round"/>
  <circle cx="40" cy="62" r="5" fill="#ff8a8a" opacity=".5"/><circle cx="80" cy="62" r="5" fill="#ff8a8a" opacity=".5"/>
  ${sad ? '<path class="tear" d="M44 60q-4 8 0 12q4-4 0-12z" fill="#7dd3fc"/><path class="tear t2" d="M76 60q-4 8 0 12q4-4 0-12z" fill="#7dd3fc"/>' : ""}
  <path d="M24 56q-6 40 6 52M96 56q6 40-6 52" stroke="#d6e4f0" stroke-width="7" fill="none" opacity=".85"/><circle cx="60" cy="52" r="46" fill="none" stroke="#e2e8f0" stroke-width="5" opacity=".9"/></svg>`;
}
/* ----- Cœurs, chrono, écran de consolation ----- */
let dlTimer = null, dlLeft = 90;
function paintHearts() { const h = document.getElementById("hearts"); if (h) h.textContent = "❤️".repeat(Math.max(0, state.hearts)) + "🤍".repeat(Math.max(0, 3 - state.hearts)); }
function stopDeadline() { clearInterval(dlTimer); }
function startDeadline(sec) {
  stopDeadline(); dlLeft = sec || 90; paintDl();
  dlTimer = setInterval(() => { if (document.getElementById("liliSad")?.classList.contains("show")) return; dlLeft--; paintDl();
    if (dlLeft <= 0) { dlLeft = 60; state.hearts--; saveState(); paintHearts(); lili("Le temps est fini ! Tu perds un cœur. Vite, choisis !");
      if (state.hearts <= 0) { stopDeadline(); showSad("Le temps est passé trop vite…"); } } }, 1000);
}
function paintDl() { const e = document.getElementById("deadline"); if (e) { e.textContent = "⏰ " + dlLeft + " s"; e.classList.toggle("urgent", dlLeft <= 15); } }
function showSad(reason) {
  stopDeadline(); let s = document.getElementById("liliSad");
  if (!s) { s = document.createElement("div"); s.id = "liliSad"; document.body.appendChild(s); }
  s.innerHTML = `<div class="sad-card">${liliSVG(true)}<h2>Oh non… ${reason || ""}</h2><p>Ce n'est pas grave ! Tu rattraperas ça la prochaine fois. Continue de jouer, tu es déjà un super astronaute.<br><span class="lolly">🍭</span><br>Tiens, je te donne une sucette !</p><button id="sad-replay" type="button" class="btn-primary-large">▶ Rejouer avec moi</button></div>`;
  s.classList.add("show");
  document.getElementById("sad-replay").onclick = () => { s.classList.remove("show"); speechSynthesis.cancel(); state = getDefaultState(); state.started = true; saveState(); paintHearts(); renderMissionView(); switchView("view-mission"); };
  if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance("Oh non… Ce n'est pas grave ! Tu rattraperas ça la prochaine fois. Continue de jouer. Tiens, je te donne une sucette !"); u.lang = "fr-FR"; u.pitch = 1.5; u.rate = .85; if (voiceOn) { speechSynthesis.cancel(); speechSynthesis.speak(u); } }
}
const _sir2 = showInstantResult;
showInstantResult = function (mission, decision, fail) {
  stopDeadline();
  if (!fail && decision.ok === false) { state.hearts--; saveState(); if (state.hearts <= 0) fail = "Tu n'as plus de cœurs !"; }
  paintHearts(); _sir2(mission, decision, fail);
  if (fail) setTimeout(() => showSad(""), 900);
};
const _smr2 = renderMissionView;
renderMissionView = function () { const m = getMissionForDay(state.day); if (m) m.decisions.sort(() => Math.random() - .5); _smr2(); paintHearts(); };
const _sv = switchView;
switchView = function (id) { _sv(id); const hud = document.getElementById("hud-kid"); if (hud) hud.style.display = (id === "view-mission" || id === "view-result") ? "flex" : "none";
  if (id === "view-mission" && state.started) { startDeadline(90); maybeTour(); } else stopDeadline(); };

/* ----- Visite guidée de Lili (une seule fois, au Sol 1) ----- */
const TOUR = ["Regarde à gauche : ce sont tes ressources ! 💧 l'eau, 🫧 l'air, ⚡ l'énergie, 🍅 la nourriture et ☢️ les rayons. Si l'une tombe à zéro, c'est perdu !",
  "Chaque jour, un problème arrive sur Mars. Je te le raconte, et toi, tu aides les astronautes à le résoudre.",
  "Tu as 4 solutions. Chacune aide un peu… et coûte un peu. Lis bien le 👍 et le 👎 avant de choisir !",
  "Attention : tu as 3 cœurs ❤️❤️❤️ et un chrono ⏰. Un mauvais choix, ou trop de temps, et tu perds un cœur. Bonne chance !"];
let tourI = 0;
function maybeTour() { if (localStorage.getItem("infinity_tour") || state.day !== 1) return; tourI = 0; stopDeadline(); tourShow(); }
function tourShow() {
  let t = document.getElementById("tour");
  if (!t) { t = document.createElement("div"); t.id = "tour"; document.body.appendChild(t); }
  t.className = "show"; const last = tourI === TOUR.length - 1;
  t.innerHTML = `<div class="story-box">${liliSVG(false)}<div class="story-card"><div class="story-name">LILI TE MONTRE</div><p class="story-text">${TOUR[tourI]}</p><div class="story-actions"><button id="tour-b" type="button">← Retour</button><button id="tour-n" class="go" type="button">${last ? "▶ Jouer !" : "Suivant →"}</button></div></div></div>`;
  lili(TOUR[tourI]);
  document.getElementById("tour-b").onclick = () => { if (tourI > 0) { tourI--; tourShow(); } };
  document.getElementById("tour-n").onclick = () => { if (last) { localStorage.setItem("infinity_tour", "1"); t.className = ""; speechSynthesis.cancel(); startDeadline(90); } else { tourI++; tourShow(); } };
}
/* ----- Intro 3D + écran d'accueil enfant ----- */
function buildIntro() {
  const o = document.createElement("div"); o.id = "intro-kid";
  o.innerHTML = `<canvas id="intro-cv"></canvas><div id="intro-load"><b>🚀 Initialisation du voyage vers Mars…</b><div class="bar"><i id="intro-bar"></i></div><button id="intro-skip" type="button">Passer ›</button></div>
  <div id="intro-hello"><div class="floaties">${["🧸","⭐","🌟","🚀","🪐","🧑‍🚀","🧸","⭐","🎈","🌙"].map((e, i) => `<span style="left:${(i * 11 + 4) % 92}%;top:${(i * 37) % 80}%;animation-delay:${i * .3}s;font-size:${28 + (i % 3) * 14}px">${e}</span>`).join("")}</div>
  <h1>Coucou, petit astronaute !</h1><p>Prêt(e) pour une grande aventure sur Mars ?</p><button id="intro-go" type="button">🚀 LANCER LA MISSION</button>${state.started && state.day > 1 ? '<button id="intro-resume" type="button">↩ Reprendre ma mission</button>' : ""}</div>`;
  document.body.appendChild(o);
  const cv = document.getElementById("intro-cv"); let rd, raf, done = false;
  const finish = () => { if (done) return; done = true; cancelAnimationFrame(raf); if (rd) rd.dispose(); o.classList.add("hello"); };
  try {
    rd = new THREE.WebGLRenderer({ canvas: cv, antialias: true }); rd.setSize(innerWidth, innerHeight, false);
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, .1, 200); cam.position.set(-4, 1.5, 7);
    const c = document.createElement("canvas"); c.width = 512; c.height = 256; const x = c.getContext("2d"); x.fillStyle = "#1f6fd1"; x.fillRect(0, 0, 512, 256); x.fillStyle = "#3aa655";
    for (let i = 0; i < 40; i++) { x.beginPath(); x.ellipse(Math.random() * 512, 30 + Math.random() * 190, 14 + Math.random() * 40, 8 + Math.random() * 22, Math.random() * 3, 0, 7); x.fill(); }
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1.6, 48, 48), new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c) })); earth.position.set(-5, 0, 0);
    const mars = new THREE.Mesh(new THREE.SphereGeometry(.9, 48, 48), new THREE.MeshStandardMaterial({ map: mapProceduralTexture() })); mars.position.set(7, 0, -3);
    const st = new THREE.Group(), mt = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: .4, roughness: .4 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, .8, 16), mt); body.rotation.z = Math.PI / 2; st.add(body);
    [-.35, .35].forEach((z) => { const p = new THREE.Mesh(new THREE.BoxGeometry(.6, .02, .3), new THREE.MeshStandardMaterial({ color: 0x2563eb })); p.position.set(0, 0, z * 1.3); st.add(p); });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(.12, .4, 12), new THREE.MeshBasicMaterial({ color: 0xffa500 })); flame.rotation.z = Math.PI / 2; flame.position.x = -.6; st.add(flame);
    const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(new Float32Array(Array.from({ length: 900 }, () => (Math.random() - .5) * 90)), 3)), new THREE.PointsMaterial({ color: 0xffffff, size: .1 }));
    sc.add(earth, mars, st, stars, new THREE.AmbientLight(0x889aaa, .8)); const L = new THREE.DirectionalLight(0xffffff, 1.6); L.position.set(2, 3, 6); sc.add(L);
    const T = 6500, t0 = performance.now();
    (function loop(now) { const p = Math.min(1, (now - t0) / T); earth.rotation.y += .004; mars.rotation.y += .006;
      st.position.set(-3.6 + p * 9.6, Math.sin(p * 6) * .25, -p * 2.2); st.rotation.z = Math.sin(now / 250) * .05; flame.scale.y = 1 + Math.sin(now / 60) * .3;
      cam.position.x = -3 + p * 6; cam.lookAt(st.position.x * .5, 0, -1); rd.render(sc, cam);
      document.getElementById("intro-bar").style.width = Math.round(p * 100) + "%"; if (p >= 1) return finish(); raf = requestAnimationFrame(loop); })(t0);
  } catch (e) { setTimeout(finish, 1500); }
  document.getElementById("intro-skip").onclick = finish;
  const go = (id) => { o.remove(); document.getElementById(id).click(); };
  document.getElementById("intro-go").onclick = () => go("btn-start-mission");
  const r = document.getElementById("intro-resume"); if (r) r.onclick = () => go("btn-continue-mission");
}
window.addEventListener("DOMContentLoaded", () => {
  const hud = document.createElement("div"); hud.id = "hud-kid"; hud.innerHTML = '<span id="hearts"></span><span id="deadline"></span>'; document.body.appendChild(hud); paintHearts();
  const av = document.querySelector("#view-story .story-avatar"); if (av) av.outerHTML = liliSVG(false);
  buildIntro();
});
