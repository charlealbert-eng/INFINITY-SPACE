/* ==========================================================================
   MODE ENFANTS (7–12 ans) : mots simples, voix de Lili, jouets à gagner, métiers de l'espace.
   Les chiffres de la NASA restent dans l'explication « Le savais-tu ? » et dans la fenêtre Ressources.
   ========================================================================== */
const KID = [
 ["Arrivée sur Mars","Le petit vaisseau se pose sur Mars. La nuit, il fait très froid ! Il faut vite rendre la maison chaude et sûre.","Ingénieur(e) de l'énergie ⚡",
  ["Ouvrir les panneaux solaires et bien fermer la maison","Sur Mars, l'air est 160 fois plus léger que chez nous et on ne peut pas le respirer. Une maison bien fermée et des panneaux au soleil, c'est la base !"],
  ["Partir tout de suite chercher de la glace avec le rover","Il y a de la glace d'eau sous le sol de Mars, mais sortir sans protection est risqué : l'espace envoie des rayons invisibles."]],
 ["Respirer sur Mars","On a besoin d'air pour respirer, et la machine qui fabrique l'air a une petite fuite.","Chimiste de l'air 🫧",
  ["Réparer la fuite, puis fabriquer l'air doucement","Sur Mars, un appareil de la NASA appelé MOXIE a vraiment fabriqué de l'oxygène avec l'air de la planète. On le fait doucement pour ne pas l'abîmer."],
  ["Faire tourner la machine à fond sans la réparer","Une machine qui va trop vite avec une fuite perd l'air et use toute l'énergie. Mieux vaut réparer d'abord !"]],
 ["Chaque goutte compte","La poussière rouge a bouché le filtre de l'eau. Sans eau propre, personne ne peut boire !","Plombier(ère) de l'espace 💧",
  ["Nettoyer le filtre et refaire de l'eau propre","Dans l'espace, on recycle presque toute l'eau, même celle qu'on transpire ! Chaque goutte est précieuse."],
  ["Boire moins et ne rien réparer","Boire trop peu rend malade et fatigué. Il faut réparer la machine, pas seulement se priver."]],
 ["Un potager sur Mars","Les plantes de la serre jaunissent ! L'eau où elles mangent n'est pas bien réglée.","Jardinier(ère) de l'espace 🍅",
  ["Régler l'eau des plantes et allumer les lampes à plantes","Les astronautes cultivent des plantes sans terre, dans de l'eau pleine de nourriture. Les lampes roses et bleues les aident à grandir !"],
  ["Éteindre la serre pour garder de l'énergie","Ça économise l'énergie, mais sans lumière les plantes ne poussent plus et on aura moins à manger."]],
 ["Panne de courant","Le vent de Mars a couvert les panneaux solaires de poussière. Il y a de moins en moins d'électricité !","Électricien(ne) martien(ne) 🔌",
  ["Secouer la poussière avec l'électricité et éteindre les pièces vides","Les robots de Mars se couvrent de poussière aussi ! On l'enlève doucement et on éteint ce qu'on n'utilise pas."],
  ["Sortir tout de suite nettoyer à la main","Sortir en plein jour, c'est fatigant, et on reçoit plus de rayons du Soleil. C'est dangereux sans préparation."]],
 ["Le Soleil se fâche","Les savants de la NASA ont vu une grosse éruption du Soleil. Des rayons méchants arrivent !","Météorologue du Soleil ☀️",
  ["Se cacher derrière les réservoirs d'eau et lancer le bouclier","L'eau arrête très bien les rayons ! Les astronautes se cachent derrière elle pendant une tempête du Soleil. La NASA la surveille avec DONKI."],
  ["Continuer à travailler comme si de rien n'était","Les rayons du Soleil peuvent rendre malade. Mieux vaut se protéger, même si ça coûte de l'énergie."]],
 ["La grande tempête de poussière","Une énorme tempête rouge cache le Soleil. Il reste très peu d'énergie !","Ingénieur(e) de survie 🛡️",
  ["Fermer les volets et passer en mode économie","Sur Mars, une tempête de poussière peut durer des semaines. Les robots de la NASA se mettent en veille pour survivre."],
  ["Tout laisser allumé à fond","Sans soleil, les batteries se vident vite. Il faut choisir ce qui est vraiment important."]],
 ["Une pompe en panne","Après la tempête, la pompe du chauffage est bloquée par la poussière. Brrr !","Mécanicien(ne) de l'espace 🔧",
  ["Utiliser la pompe de secours et nettoyer l'autre","Dans l'espace, on prévoit toujours une pièce de secours. Deux, c'est plus sûr qu'une seule !"],
  ["Arrêter la pompe et laisser entrer l'air froid","L'air froid de dehors est très dur à gérer. Mieux vaut réparer que laisser faire."]],
 ["Tout marche ensemble","La Terre veut savoir : peut-on faire de l'air, de l'eau et de la nourriture en même temps ?","Scientifique de la vie 🌱",
  ["Faire travailler ensemble la serre, l'eau et le soleil","Dans une vraie base, tout est lié : les plantes donnent de l'air, l'eau fait pousser les plantes. C'est un grand cercle !"],
  ["Tout mettre en veille pour économiser","Économiser, c'est bien, mais si tout s'arrête, on ne produit plus rien pour demain."]],
 ["Mission réussie ?","C'est le dernier jour ! Il faut tout vérifier et envoyer un message à la Terre.","Astronaute 🧑‍🚀",
  ["Tout équilibrer et envoyer le rapport à la Terre","Les vrais astronautes envoient leurs mesures aux savants sur Terre pour voyager encore plus loin, jusqu'à Mars un jour."],
  ["Faire une dernière récolte de cailloux avant de finir","Les cailloux, c'est super pour la science, mais c'est risqué de s'attarder quand les réserves baissent."]]
];
const KN = { energie: "⚡ énergie", oxygene: "🫧 air", eau: "💧 eau", nourriture: "🍅 nourriture", sante: "❤️ santé", integrite: "🏠 maison" };
const TOYS = [["🧸", "un ours en peluche"], ["🪀", "un yoyo"], ["🚀", "une fusée"], ["🤖", "un robot"], ["🪁", "un cerf-volant"], ["🎈", "un ballon"], ["🛸", "une soucoupe"], ["🧩", "un puzzle"], ["🏆", "une coupe"], ["🌟", "une étoile"]];
function kidHint(imp) {
  const g = [], c = [];
  for (const k in imp) { const v = imp[k]; if (k === "radiation") (v < 0 ? g : c).push("☢️ rayons " + (v < 0 ? "en moins" : "en plus")); else if (KN[k]) (v > 0 ? g : c).push(KN[k]); }
  return (g.length ? "👍 Ça aide : " + g.join(", ") : "") + (c.length ? "  👎 Ça coûte : " + c.join(", ") : "");
}
MISSIONS_DATA.forEach((m, i) => {
  const k = KID[i]; if (!k) return;
  m.title.fr = `SOL ${String(m.day).padStart(2, "0")} — ${k[0]}`; m.description.fr = k[1]; m.job = k[2];
  m.ariaAdvice.fr = "Écoute bien, puis choisis avec ton cœur… et ta tête ! 💛";
  m.decisions.forEach((d, j) => { d.title.fr = k[3 + j][0]; d.desc.fr = kidHint(d.impacts); d.scienceText.fr = k[3 + j][1]; d.scienceRef = "Le savais-tu ? • NASA";
    const sc = Object.entries(d.impacts).reduce((s, [r, v]) => s + (r === "radiation" ? -v : (KN[r] ? v : 0)), 0);
    d.ariaFeedback.fr = sc >= 15 ? "Bravo, c'est un super choix ! 🎉" : sc >= 0 ? "Pas mal du tout, tu as bien réfléchi ! 👍" : "Aïe, ça coûte cher… mais c'est en essayant qu'on apprend ! 💪"; });
});
Object.assign(UI_DICTIONARY.fr, { welcomeTitle: "COUCOU, PETIT(E) ASTRONAUTE !" });
STORY.fr = ["Coucou ! Moi, c'est Lili, la petite astronaute ! Tu veux m'aider sur la planète Mars ?",
  "Mars est une planète rouge, toute froide et pleine de poussière. On y habite dans une petite maison spéciale.",
  "Dans la maison, il faut de l'air pour respirer, de l'énergie pour la lumière, de l'eau et de la nourriture.",
  "Mais attention ! Chaque choix donne quelque chose… et coûte quelque chose. Alors on réfléchit ensemble !",
  "Le Soleil envoie parfois des rayons méchants. Les vrais savants de la NASA le surveillent, et nous aussi !",
  "Tu es prêt(e) ? Allez, on commence l'aventure !"];
Object.assign(STORY_UI.fr, { name: "LILI, LA PETITE ASTRONAUTE", next: "Suivant →", go: "▶ C'est parti !" });

/* ----- Voix de Lili (voix du navigateur, aiguë et douce) ----- */
let voiceOn = localStorage.getItem("infinity_voice") !== "0", lastSpoken = "";
function lili(text) {
  if (!voiceOn || currentLang !== "fr" || !window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[^\p{L}\p{N}\s.,!?'’:-]/gu, "")); u.lang = "fr-FR"; u.pitch = 1.8; u.rate = .92;
  const vs = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("fr")); u.voice = vs.find((v) => /amélie|audrey|marie|julie|denise|google|female|femme/i.test(v.name)) || vs[0] || null;
  speechSynthesis.speak(u);
}
function jingle(ok) { (ok ? [523, 659, 784, 1047] : [392, 330, 262]).forEach((f, i) => setTimeout(() => playTone(f, .18, "triangle"), i * 160)); }

const _smr = renderMissionView;
renderMissionView = function () { _smr(); const k = "d" + state.day; if (k !== lastSpoken && state.started && document.getElementById("view-mission").classList.contains("active")) { lastSpoken = k; lili(getMissionForDay(state.day).description.fr); } };
const _sr = storyRender; storyRender = function () { _sr(); lili(STORY.fr[storyIdx]); };
const _sir = showInstantResult;
showInstantResult = function (mission, decision, fail) {
  _sir(mission, decision, fail);
  let toy = "", job = "";
  if (!fail) { const box = JSON.parse(localStorage.getItem("infinity_toys") || "[]"); const t = TOYS[(mission.day - 1) % TOYS.length]; if (!box.includes(t[0])) box.push(t[0]); localStorage.setItem("infinity_toys", JSON.stringify(box)); toy = `🎁 Tu gagnes ${t[1]} ${t[0]} !`; }
  const box2 = JSON.parse(localStorage.getItem("infinity_toys") || "[]");
  let r = document.getElementById("kid-reward"); if (!r) { r = document.createElement("div"); r.id = "kid-reward"; document.getElementById("btn-next-day").parentElement.before(r); }
  r.innerHTML = `<div class="kid-job">🧑‍🚀 Métier du jour : <b>${mission.job || ""}</b></div><div class="kid-toy">${fail ? "On réessaie ensemble, c'est comme ça qu'on apprend ! 💪" : toy}</div><div class="kid-box">Ma boîte à jouets : ${box2.join(" ") || "—"}</div>`;
  document.querySelectorAll("#view-result strong").forEach((s) => { if (/^ARIA/.test(s.textContent)) s.textContent = "Lili :"; });
  jingle(!fail); setTimeout(() => lili(`${decision.ariaFeedback.fr} ${decision.scienceText.fr}`), 700);
};
window.addEventListener("DOMContentLoaded", () => {
  const LILI = `<svg viewBox="0 0 96 120" class="story-avatar"><circle cx="48" cy="40" r="34" fill="#e2e8f0"/><circle cx="48" cy="42" r="26" fill="#1e3a5f"/><circle cx="48" cy="44" r="19" fill="#ffd9b8"/><circle cx="41" cy="43" r="3" fill="#2d1b0e"/><circle cx="55" cy="43" r="3" fill="#2d1b0e"/><path d="M40 52q8 8 16 0" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="36" cy="49" r="4" fill="#ff9aa2" opacity=".7"/><circle cx="60" cy="49" r="4" fill="#ff9aa2" opacity=".7"/><rect x="26" y="74" width="44" height="38" rx="14" fill="#f1f5f9"/><circle cx="48" cy="90" r="7" fill="#ed8936"/><circle cx="30" cy="86" r="8" fill="#f1f5f9"/><circle cx="66" cy="86" r="8" fill="#f1f5f9"/></svg>`;
  const av = document.querySelector("#view-story .story-avatar"); if (av) av.outerHTML = LILI;
  const wl = document.getElementById("view-welcome"); const toys = document.createElement("div"); toys.className = "kid-toys"; toys.innerHTML = "<span>🧑‍🚀</span><span>🧸</span><span>🚀</span><span>🪀</span><span>🤖</span><span>🪐</span><span>🎈</span>"; wl.appendChild(toys);
  const vb = document.createElement("button"); vb.id = "voice-btn"; vb.type = "button"; const paint = () => (vb.textContent = voiceOn ? "🔊 Lili parle" : "🔇 Lili se tait");
  vb.onclick = () => { voiceOn = !voiceOn; localStorage.setItem("infinity_voice", voiceOn ? "1" : "0"); if (!voiceOn) speechSynthesis.cancel(); paint(); }; paint(); document.body.appendChild(vb);
  const md = document.getElementById("mission-description"); if (md) { const b = document.createElement("button"); b.type = "button"; b.className = "back-btn"; b.textContent = "🔊 Écouter Lili"; b.onclick = () => lili(getMissionForDay(state.day).description.fr); md.after(b); }
  const c = document.createElement("div"); c.className = "kid-credit"; c.textContent = "Vraies données : NASA DONKI (météo du Soleil, en direct si internet), photos du rover Perseverance, cartes NASA Mars Trek."; document.body.appendChild(c);
  if (window.speechSynthesis) speechSynthesis.getVoices();
});
