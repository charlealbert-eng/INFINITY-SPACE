/* HISTOIRE : ARIA raconte le contexte avant le Sol 1 (style roman visuel). Boutons Retour / Continuer / Passer. */
const STORY = {
  fr: ["Commandant, bienvenue sur Mars. Je suis ARIA, l'intelligence de bord de l'avant-poste ARES-01.",
    "Nous sommes dans le cratère Jezero, un ancien lac. C'est ici que le rover Perseverance cherche des traces de vie passée.",
    "Mars est impitoyable : l'air est irrespirable, il fait environ −60 °C, et sans champ magnétique les éruptions solaires nous irradient.",
    "Cinq ressources à surveiller : eau, oxygène, énergie, nourriture et radiation. Chacune de vos décisions les modifie aussitôt.",
    "Pendant 10 sols, vous recevrez une situation et plusieurs solutions. Choisissez, puis lisez mon explication scientifique : c'est ainsi qu'on apprend.",
    "Nos données viennent de la NASA : DONKI pour le Soleil, Perseverance pour les photos, et la planète derrière moi tourne en temps réel. Prêt, Commandant ?"],
  en: ["Commander, welcome to Mars. I am ARIA, the onboard AI of Outpost ARES-01.",
    "We are in Jezero Crater, an ancient lake. Here the Perseverance rover searches for traces of past life.",
    "Mars is unforgiving: the air is unbreathable, it is about −60 °C, and with no magnetic field solar flares irradiate us.",
    "Five resources to watch: water, oxygen, energy, food and radiation. Each decision changes them instantly.",
    "Over 10 sols you will get a situation and several solutions. Choose, then read my scientific explanation: that is how we learn.",
    "Our data comes from NASA: DONKI for the Sun, Perseverance for photos, and the planet behind me spins in real time. Ready, Commander?"]
};
const STORY_UI = { fr: { back: "← Retour", next: "Continuer →", skip: "Passer l'histoire", go: "▶ Commencer le Sol 1", name: "ARIA — INTELLIGENCE DE BORD", home: "← Accueil" },
                   en: { back: "← Back", next: "Continue →", skip: "Skip story", go: "▶ Start Sol 1", name: "ARIA — ONBOARD AI", home: "← Home" } };
let storyIdx = 0, storyTimer = null, storyBypass = false;
const ARIA_SVG = `<svg viewBox="0 0 96 120" class="story-avatar"><rect x="22" y="14" width="52" height="42" rx="14" fill="#cbd5e1"/><rect x="30" y="26" width="36" height="16" rx="8" fill="#0b131f"/><circle cx="42" cy="34" r="4" fill="#52d1b8"/><circle cx="54" cy="34" r="4" fill="#52d1b8"/><rect x="46" y="4" width="4" height="12" fill="#94a3b8"/><circle cx="48" cy="4" r="4" fill="#ed8936"/><rect x="28" y="60" width="40" height="44" rx="12" fill="#94a3b8"/><rect x="38" y="72" width="20" height="10" rx="3" fill="#52d1b8"/><rect x="10" y="62" width="14" height="30" rx="7" fill="#cbd5e1"/><rect x="72" y="62" width="14" height="30" rx="7" fill="#cbd5e1"/></svg>`;

function storyType(text) {
  clearInterval(storyTimer);
  const el = document.getElementById("story-text"); let i = 0; el.textContent = "";
  storyTimer = setInterval(() => { el.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(storyTimer); }, 16);
}
function storyRender() {
  const S = STORY[currentLang], U = STORY_UI[currentLang], last = storyIdx === S.length - 1;
  document.getElementById("story-name").textContent = U.name;
  document.getElementById("story-dots").innerHTML = S.map((_, i) => `<i class="${i <= storyIdx ? "on" : ""}"></i>`).join("");
  document.getElementById("story-back").textContent = U.back;
  document.getElementById("story-skip").textContent = U.skip;
  document.getElementById("story-next").textContent = last ? U.go : U.next;
  storyType(S[storyIdx]);
}
function storyLaunch() { clearInterval(storyTimer); storyBypass = true; document.getElementById("btn-start-mission").click(); storyBypass = false; }
function storyHomeLabels() {
  const t = STORY_UI[currentLang].home;
  ["btn-back-home", "btn-result-home"].forEach((id) => { const b = document.getElementById(id); if (b) b.textContent = t; });
}
window.addEventListener("DOMContentLoaded", () => {
  const v = document.createElement("section"); v.id = "view-story"; v.className = "view";
  v.innerHTML = `<div class="story-box">${ARIA_SVG}<div class="story-card"><div class="story-name" id="story-name"></div><p class="story-text" id="story-text"></p><div class="story-dots" id="story-dots"></div><div class="story-actions"><button id="story-back" type="button"></button><button id="story-skip" type="button"></button><button id="story-next" class="go" type="button"></button></div></div></div>`;
  document.body.appendChild(v);
  const S = () => STORY[currentLang];
  document.getElementById("story-back").onclick = () => { playTone(360, .07); if (storyIdx === 0) switchView("view-welcome"); else { storyIdx--; storyRender(); } };
  document.getElementById("story-next").onclick = () => { playTone(500, .08); if (storyIdx >= S().length - 1) storyLaunch(); else { storyIdx++; storyRender(); } };
  document.getElementById("story-skip").onclick = storyLaunch;
  document.getElementById("story-text").onclick = () => { clearInterval(storyTimer); document.getElementById("story-text").textContent = S()[storyIdx]; };
  document.getElementById("btn-start-mission").addEventListener("click", (e) => { if (storyBypass) return; e.stopImmediatePropagation(); storyIdx = 0; switchView("view-story"); storyRender(); }, true);
  /* boutons Retour : mission (déjà présent) et page de résultat */
  const next = document.getElementById("btn-next-day");
  if (next && next.parentElement) { const b = document.createElement("button"); b.id = "btn-result-home"; b.type = "button"; b.className = "back-btn";
    b.onclick = () => { playTone(360, .07); if (state.started) document.getElementById("btn-continue-mission").classList.remove("hidden"); switchView("view-welcome"); };
    next.parentElement.prepend(b); }
  storyHomeLabels();
  const _a = applyLanguage; applyLanguage = function (l) { _a(l); storyHomeLabels(); if (v.classList.contains("active")) storyRender(); };
});
