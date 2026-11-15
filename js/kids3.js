/* ==========================================================================
   STYLE ENFANT PARTOUT + Lili petite fille + voix joyeuse (voix réelle possible via assets/voix/*.mp3)
   ========================================================================== */
STORY.fr = VOIX.story; STORY_UI.fr.go = "▶ Viens, on y va !"; STORY_UI.fr.name = "LILI, TA COPINE ASTRONAUTE";
TOUR.length = 0; VOIX.tour.forEach((t) => TOUR.push(t));
const VOIXID = {}; VOIX.story.forEach((t, i) => (VOIXID[t] = "story-" + (i + 1))); VOIX.tour.forEach((t, i) => (VOIXID[t] = "tour-" + (i + 1)));
MISSIONS_DATA.forEach((m) => (VOIXID[m.description.fr] = "sol-" + m.day));
UI_DICTIONARY.fr.ariaRole = "TA COPINE ASTRONAUTE"; UI_DICTIONARY.fr.noteTitle = "LILI T'AIDE";

/* ----- Lili : petite fille en robe ----- */
function liliSVG(sad) {
  const skin = "#8d5a3b", dress = "#ff6b9d";
  return `<svg viewBox="0 0 120 190" class="story-avatar lili-big"><ellipse cx="60" cy="184" rx="34" ry="5" fill="#0002"/>
  <rect x="47" y="150" width="9" height="28" rx="4" fill="${skin}"/><rect x="65" y="150" width="9" height="28" rx="4" fill="${skin}"/><rect x="46" y="165" width="11" height="9" fill="#fff"/><rect x="64" y="165" width="11" height="9" fill="#fff"/>
  <path d="M38 176q12-9 22 0v7H38z M62 176q12-9 22 0v7H62z" fill="#e03131"/><rect x="40" y="180" width="18" height="4" fill="#a61e1e"/><rect x="63" y="180" width="18" height="4" fill="#a61e1e"/>
  <g class="${sad ? "" : "wave"}" style="transform-origin:90px 98px"><rect x="86" y="${sad ? 100 : 62}" width="11" height="38" rx="5.5" fill="${skin}" transform="rotate(${sad ? 8 : -20} 91 100)"/></g>
  <rect x="23" y="98" width="11" height="38" rx="5.5" fill="${skin}" transform="rotate(${sad ? -8 : 12} 28 100)"/>
  <path d="M44 88H76L84 112L102 156Q60 168 18 156L36 112Z" fill="${dress}"/><g fill="#fff" opacity=".8"><circle cx="34" cy="140" r="3"/><circle cx="52" cy="148" r="3"/><circle cx="70" cy="142" r="3"/><circle cx="88" cy="146" r="3"/><circle cx="60" cy="130" r="3"/></g>
  <rect x="38" y="110" width="44" height="7" fill="#ffd43b"/><polygon points="60,94 63,101 70,101 64.5,105 66.5,112 60,108 53.5,112 55.5,105 50,101 57,101" fill="#ffd43b"/>
  <path d="M48 87q12 10 24 0l-3-6H51z" fill="#fff"/><circle cx="40" cy="92" r="8" fill="${dress}"/><circle cx="80" cy="92" r="8" fill="${dress}"/>
  <rect x="54" y="78" width="12" height="10" fill="${skin}"/>
  <circle cx="30" cy="26" r="15" fill="#2a170c"/><circle cx="90" cy="26" r="15" fill="#2a170c"/><ellipse cx="60" cy="42" rx="37" ry="31" fill="#2a170c"/>
  <polygon points="30,14 32,19 37,19 33,22 35,27 30,24 25,27 27,22 23,19 28,19" fill="#ffd43b"/><polygon points="90,14 92,19 97,19 93,22 95,27 90,24 85,27 87,22 83,19 88,19" fill="#ffd43b"/>
  <ellipse cx="60" cy="56" rx="28" ry="29" fill="${skin}"/><path d="M33 48q27-28 54 0q-6-16-27-16t-27 16z" fill="#2a170c"/>
  <ellipse cx="49" cy="55" rx="6" ry="${sad ? 5 : 7}" fill="#fff"/><ellipse cx="71" cy="55" rx="6" ry="${sad ? 5 : 7}" fill="#fff"/><circle cx="49" cy="56" r="4" fill="#1b0f08"/><circle cx="71" cy="56" r="4" fill="#1b0f08"/><circle cx="50.5" cy="54" r="1.4" fill="#fff"/><circle cx="72.5" cy="54" r="1.4" fill="#fff"/>
  <path d="${sad ? "M41 45l12 5M79 45l-12 5" : "M42 46q7-6 14 0M64 46q7-6 14 0"}" stroke="#1b0f08" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M42 50l-3-3M78 50l3-3" stroke="#1b0f08" stroke-width="2" stroke-linecap="round"/><path d="M58 62q2 3 4 0" stroke="#5c3520" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${sad ? '<path d="M50 76q10-9 20 0" stroke="#7a1f1f" stroke-width="3.5" fill="none" stroke-linecap="round"/>' : '<path d="M46 70q14 18 28 0z" fill="#b02a37"/><path d="M48 70h24q-12 6-24 0z" fill="#fff"/><ellipse cx="60" cy="77" rx="6" ry="3" fill="#ff8fa3"/>'}
  <circle cx="40" cy="66" r="5.5" fill="#ff8a8a" opacity=".55"/><circle cx="80" cy="66" r="5.5" fill="#ff8a8a" opacity=".55"/>
  ${sad ? '<path class="tear" d="M44 63q-5 9 0 13q5-4 0-13z" fill="#74c0fc"/><path class="tear t2" d="M76 63q-5 9 0 13q5-4 0-13z" fill="#74c0fc"/>' : ""}</svg>`;
}

/* ----- Voix joyeuse : fichier mp3 si présent, sinon voix du navigateur avec intonation ----- */
let liliAudio = null, liliQueue = 0;
function liliStop() { liliQueue++; if (window.speechSynthesis) speechSynthesis.cancel(); if (liliAudio) { liliAudio.pause(); liliAudio = null; } }
function bestVoice() {
  const vs = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("fr"));
  const score = (v) => (/natural|neural|online/i.test(v.name) ? 5 : 0) + (/denise|eloise|éloïse|amélie|amelie|audrey|julie|hortense|marie|google fran/i.test(v.name) ? 3 : 0) - (/paul|thomas|henri|claude|male/i.test(v.name) ? 5 : 0);
  return vs.sort((a, b) => score(b) - score(a))[0] || null;
}
function liliSpeak(text) {
  const my = ++liliQueue, v = bestVoice();
  const parts = text.replace(/[^\p{L}\p{N}\s.,!?'’:…-]/gu, "").match(/[^.!?…]+[.!?…]*/g) || [text];
  parts.forEach((p, i) => { const u = new SpeechSynthesisUtterance(p.trim()); u.lang = "fr-FR"; if (v) u.voice = v;
    const ex = /!/.test(p), q = /\?/.test(p), hi = /hihi|super|miam|coucou|youpi|viens/i.test(p);
    u.pitch = Math.min(2, (q ? 1.5 : ex ? 1.42 : 1.28) + (hi ? .12 : 0) + (Math.random() - .5) * .08);
    u.rate = (ex ? 1.08 : q ? 1.02 : .97) + (hi ? .04 : 0); u.volume = 1;
    u.onstart = () => { if (my !== liliQueue) speechSynthesis.cancel(); }; speechSynthesis.speak(u); });
}
lili = function (text) {
  if (!voiceOn || currentLang !== "fr") return; liliStop(); const id = VOIXID[text];
  if (id) { const a = new Audio("assets/voix/" + id + ".mp3"); liliAudio = a; let fell = false;
    const fb = () => { if (!fell) { fell = true; if (liliAudio === a) liliSpeak(text); } }; a.onerror = fb; a.play().catch(fb); return; }
  if (window.speechSynthesis) liliSpeak(text);
};

/* ----- Habillage enfant partout ----- */
function confetti() { const f = document.createElement("div"); f.className = "confetti"; f.innerHTML = Array.from({ length: 22 }, (_, i) => `<span style="left:${i * 4.6}%;animation-delay:${(i % 7) * .15}s">${["⭐", "🎈", "🧸", "🌟", "🎉", "🍭"][i % 6]}</span>`).join(""); document.body.appendChild(f); setTimeout(() => f.remove(), 3800); }
const _sir3 = showInstantResult;
showInstantResult = function (m, d, fail) { _sir3(m, d, fail); if (!fail && d.ok !== false) confetti(); };
function rebrand() {
  document.querySelectorAll(".aria-pill").forEach((e) => (e.textContent = "LILI"));
  document.querySelectorAll(".result-aria-line strong").forEach((e) => (e.textContent = "Lili :"));
  document.querySelectorAll(".aria-avatar").forEach((e) => (e.innerHTML = liliSVG(false)));
  const w = document.querySelector(".aria-welcome-card p, .aria-welcome-card .aria-welcome-text"); if (w) w.textContent = "Coucou ! Je suis Lili. Viens jouer avec moi, Mars a besoin de toi !";
}
window.addEventListener("DOMContentLoaded", () => {
  const bg = document.createElement("div"); bg.id = "kid-bg"; bg.innerHTML = ["🧸", "⭐", "🪐", "🌟", "🚀", "🧸", "☁️", "⭐", "🎈", "🌙", "🧸", "🌟"].map((e, i) => `<span style="left:${(i * 9 + 3) % 94}%;top:${(i * 23 + 7) % 88}%;animation-delay:${i * .4}s;font-size:${26 + (i % 4) * 10}px">${e}</span>`).join("");
  document.body.prepend(bg);
  const c = document.createElement("div"); c.id = "lili-corner"; c.innerHTML = liliSVG(false); c.onclick = () => { const m = getMissionForDay(state.day); if (m) lili(m.description.fr); }; document.body.appendChild(c);
  rebrand(); const av = document.querySelector("#view-story .story-avatar"); if (av) av.outerHTML = liliSVG(false);
  const _v = switchView; switchView = function (id) { _v(id); c.style.display = (id === "view-mission" || id === "view-result") ? "block" : "none"; rebrand(); };
  c.style.display = "none";
});
