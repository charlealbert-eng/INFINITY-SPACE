/* Scène de Lili (intro animée, résultat, rapport de mission) + vrais modes Lili / ARIA + Soleil du jour */
(function () {
  const $ = (id) => document.getElementById(id);
  const MODE = localStorage.getItem("infinity_mode"); // "lili" | "aria" | null
  const ARIA = MODE === "aria";
  const LOG = []; let introDay = 0;
  const sp = (t) => { try { if (!ARIA && typeof liliSpeak === "function") liliSpeak(t); } catch (e) {} };

  const css = document.createElement("style");
  css.textContent = `
  .ov{position:fixed;inset:0;z-index:10001;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 30%,#1e3a8a,#0f172a 70%);color:#fff;font-family:system-ui,sans-serif;padding:16px;animation:ovIn .35s ease}
  @keyframes ovIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
  .stg{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:640px;width:100%}
  .stg .big svg{height:min(46vh,340px);width:auto;animation:fl 3s ease-in-out infinite}
  @keyframes fl{50%{transform:translateY(-12px) rotate(-1.5deg)}}
  .bub{background:#fff;color:#1e293b;border-radius:22px;padding:16px 20px;font-size:clamp(17px,3.6vw,22px);line-height:1.4;min-height:96px;width:100%;position:relative;box-shadow:0 8px 24px #0006;animation:pop .4s ease}
  .bub:before{content:"";position:absolute;top:-14px;left:50%;border:8px solid transparent;border-bottom:8px solid #fff;border-top:0;transform:translateX(-50%)}
  @keyframes pop{from{transform:scale(.9);opacity:0}to{transform:none;opacity:1}}
  .dots{display:flex;gap:8px}.dots i{width:10px;height:10px;border-radius:50%;background:#475569}.dots i.on{background:#fb923c;transform:scale(1.3)}
  .go{border:0;border-radius:16px;background:#fb923c;color:#fff;font-size:20px;font-weight:700;padding:14px 34px;box-shadow:0 5px 0 #c2410c;cursor:pointer;animation:bt 1.6s infinite}
  .go:active{transform:translateY(4px);box-shadow:none}@keyframes bt{50%{transform:scale(1.05)}}
  .rc{background:#fff;color:#1e293b;border-radius:24px;max-width:600px;width:100%;max-height:92vh;overflow:auto;padding:18px 20px;text-align:center;box-shadow:0 14px 40px #000a;animation:pop .45s ease}
  .rc.ok{border-top:10px solid #34d399}.rc.no{border-top:10px solid #f59e0b}.rc h2{margin:6px 0;font-size:26px}
  .rc .mini svg{height:110px;width:auto}.rc .mini.joy svg{animation:jy .7s ease 3}.rc .mini.sad svg{animation:sw 2s ease-in-out infinite}
  @keyframes jy{40%{transform:translateY(-22px) scale(1.08)}}@keyframes sw{50%{transform:rotate(-4deg) translateY(3px)}}
  .rc .box{background:#f1f5f9;border-radius:14px;padding:10px 12px;margin:10px 0;text-align:left;font-size:15px}
  .rc table{width:100%;border-collapse:collapse;font-size:14px;text-align:left}.rc td{padding:4px 6px;border-bottom:1px solid #e2e8f0}
  #view-mission.active>*:not(header){animation:fu .5s ease both}@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  #view-mission button:not(.icon-btn){transition:transform .15s,box-shadow .15s}#view-mission button:not(.icon-btn):hover{transform:translateY(-3px) scale(1.015);box-shadow:0 8px 20px #0005}
  .core3 .c.low{animation:lw 1s infinite}@keyframes lw{50%{box-shadow:0 0 0 4px #ef444488}}
  #modeBtn{position:fixed;left:10px;bottom:52px;z-index:9999;padding:8px 12px;border-radius:999px;border:0;background:#1e293b;color:#fff;font-size:13px;opacity:.85}
  #sunBadge{display:inline-block;margin:8px 0;padding:6px 12px;border-radius:999px;background:#1e293b;color:#fde68a;font-size:14px;font-weight:700}
  body.aria #kid-bg,body.aria #intro-kid,body.aria .kid-credit,body.aria [id*=heart],body.aria [class*=heart]{display:none!important}`;
  document.head.appendChild(css);
  if (ARIA) document.addEventListener("DOMContentLoaded", () => document.body.classList.add("aria"));

  // ----- Vrai mode ARIA : textes scientifiques d'origine, sans mascotte ni chrono -----
  if (ARIA && window.MISSIONS_ORIG) {
    MISSIONS_ORIG.forEach((m, i) => { MISSIONS_DATA[i] = JSON.parse(JSON.stringify(m)); });
    if (window.applyFlare && window.REAL_FLARE) applyFlare(window.REAL_FLARE);
    if (window.addDelay) addDelay();
    window.lili = function () {}; window.liliSpeak = function () {}; window.confetti = function () {};
    window.showSad = function () {}; window.startDeadline = function () {}; window.paintHearts = function () {};
    document.addEventListener("DOMContentLoaded", () => setTimeout(() => {
      document.querySelectorAll(".aria-pill").forEach((e) => (e.textContent = "ARIA"));
      document.querySelectorAll(".result-aria-line strong").forEach((e) => (e.textContent = "ARIA :"));
      document.querySelectorAll(".aria-avatar").forEach((e) => (e.textContent = "⌬"));
      const w = document.querySelector(".aria-welcome-card p, .aria-welcome-card .aria-welcome-text");
      if (w) w.textContent = "Je suis ARIA, l'assistant de bord. Analysons les données et prenons les bonnes décisions.";
    }, 50));
  }

  // ----- Choix du mode -----
  function chooser() {
    const o = document.createElement("div"); o.className = "ov"; o.id = "modeOv";
    o.innerHTML = `<div class="stg"><h1 style="text-align:center;margin:0">Choisis ton mode de jeu</h1>
    <button class="go" data-m="lili" style="width:100%">🧸 Mode LILI — 7 à 12 ans<br><small style="font-weight:400">Histoire, voix, animations</small></button>
    <button class="go" data-m="aria" style="width:100%;background:#0ea5e9;box-shadow:0 5px 0 #0369a1;animation:none">🛰️ Mode ARIA — grands et experts<br><small style="font-weight:400">Vocabulaire scientifique, interface sobre</small></button></div>`;
    o.onclick = (e) => { const m = e.target.closest("[data-m]"); if (m) { localStorage.setItem("infinity_mode", m.dataset.m); location.reload(); } };
    document.body.appendChild(o);
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (!MODE) chooser();
    const b = document.createElement("button"); b.id = "modeBtn"; b.type = "button";
    b.textContent = ARIA ? "🛰️ Mode : ARIA (changer)" : "🧸 Mode : LILI (changer)";
    b.onclick = () => { localStorage.removeItem("infinity_mode"); location.reload(); }; document.body.appendChild(b);
    paintSun();
  });

  // ----- Soleil récent (DONKI) -----
  function paintSun() {
    const f = window.REAL_FLARE; if (!f) return; let e = $("sunBadge");
    if (!e) { e = document.createElement("div"); e.id = "sunBadge"; const w = $("welcome-donki-status"); (w && w.parentNode ? w.parentNode : document.body).insertBefore(e, w ? w.nextSibling : null); }
    const lv = f.cls[0] === "X" ? "très actif" : f.cls[0] === "M" ? "actif" : "plutôt calme";
    e.textContent = "☀️ Soleil des 30 derniers jours : " + lv + " (" + f.cls + (f.live ? ", direct" : ", archive") + ")";
  }
  window.addEventListener("flare", paintSun);

  // ----- Intro animée de chaque mission (mode Lili) -----
  let earth = ""; fetch("https://eonet.gsfc.nasa.gov/api/v3/events?limit=1&status=open").then((r) => r.json()).then((d) => { if (d.events && d.events[0]) earth = d.events[0].title; }).catch(() => {});
  function intro(m) {
    const steps = [m.description.fr, "Aujourd'hui, tu es " + (m.job || "astronaute") + " ! Ta mission : choisir la meilleure solution.",
      state.day === 6 && window.REAL_FLARE ? "Attention : une vraie éruption du Soleil (" + REAL_FLARE.cls + ") est utilisée ici, vue par la NASA !" :
      state.day === 1 && earth ? "Savais-tu ? Pendant ce temps sur Terre, la NASA surveille : " + earth + " (NASA EONET)." :
      "Surveille tes 3 jauges : Vivre, Énergie, Protection. Chaque choix aide un peu… et coûte un peu !"];
    let i = 0, tm; const o = document.createElement("div"); o.className = "ov";
    o.innerHTML = `<div class="stg"><div class="big">${liliSVG(false)}</div><div class="bub" id="bub"></div><div class="dots">${steps.map(() => "<i></i>").join("")}</div><button class="go" type="button" id="nx">Suivant ›</button></div>`;
    document.body.appendChild(o);
    function show() {
      const t = steps[i], b = $("bub"); b.textContent = ""; clearInterval(tm); let k = 0;
      tm = setInterval(() => { b.textContent = t.slice(0, ++k); if (k >= t.length) clearInterval(tm); }, 22);
      o.querySelectorAll(".dots i").forEach((d, j) => d.classList.toggle("on", j === i)); sp(t);
      $("nx").textContent = i === steps.length - 1 ? "🚀 C'est parti !" : "Suivant ›";
    }
    $("nx").onclick = () => { if (++i >= steps.length) { clearInterval(tm); o.remove(); if (window.speechSynthesis) speechSynthesis.cancel(); } else show(); };
    show();
  }
  if (!ARIA && MODE) {
    const _r = window.renderMissionView;
    window.renderMissionView = renderMissionView = function () {
      _r.apply(this, arguments);
      const v = $("view-mission");
      if (state.started && v && v.classList.contains("active") && introDay !== state.day) { introDay = state.day; try { intro(getMissionForDay(state.day)); } catch (e) {} }
    };
  }

  // ----- Journal des décisions + écran de résultat centré -----
  const _x = window.executeDecision;
  window.executeDecision = executeDecision = function (i) {
    if (state.day === 1) LOG.length = 0;
    const m = getMissionForDay(state.day), d = m.decisions[i];
    LOG.push({ day: state.day, title: d ? d.title.fr : "", ev: "" });
    _x(i);
  };
  function report(win) {
    const n = win ? 10 : Math.max(0, state.day - 1) || state.day;
    const g = (k, l) => `<tr><td>${l}</td><td><b>${Math.round(state[k])}%</b></td></tr>`;
    const inc = LOG.filter((x) => x.ev).map((x) => `<li>Sol ${x.day} : ${x.ev}</li>`).join("") || "<li>Aucun événement aléatoire</li>";
    const dec = LOG.map((x) => `<li>Sol ${x.day} : ${x.title}</li>`).join("");
    return `<h2>📋 Rapport de mission</h2><p><b>${win ? "Mission réussie !" : "Mission à retenter"}</b> — sols survécus : <b>${n} / 10</b></p>
    <div class="box"><table>${g("eau", "💧 Eau")}${g("oxygene", "🫧 Air")}${g("energie", "⚡ Énergie")}${g("nourriture", "🌱 Nourriture")}${g("radiation", "☢️ Radiation")}</table></div>
    <div class="box"><b>Incidents rencontrés</b><ul>${inc}</ul></div><div class="box"><b>Tes décisions</b><ul>${dec}</ul></div>
    <div class="box"><b>Ce que tu as appris</b><ul><li>Sur Mars, tout est lié : eau, air, énergie, nourriture et protection.</li><li>Chaque choix aide quelque chose et en coûte une autre.</li><li>Les vraies éruptions du Soleil changent les risques pour les astronautes.</li></ul></div>`;
  }
  const _s = window.showInstantResult;
  window.showInstantResult = showInstantResult = function (m, d, fail) {
    _s(m, d, fail);
    if (LOG.length) LOG[LOG.length - 1].ev = window.__lastEvent || "";
    const old = $("liliSad"); if (old) old.remove();
    const win = !fail && state.day >= 10, last = fail || win, near = !fail && !win && d.ok === false;
    const next = $(last ? "btn-restart-game" : "btn-next-day");
    const o = document.createElement("div"); o.className = "ov";
    const feed = ARIA ? d.ariaFeedback.fr : d.ariaFeedback.fr;
    const head = fail ? "Oh non…" : win ? "Victoire !" : near ? "Presque !" : "Bravo !";
    const body = last ? report(win) : `<div class="box"><b>Ton choix :</b> ${d.title.fr}<div style="margin-top:6px">${formatImpactBadges(d.impacts)}</div></div>
      <div class="box"><b>${ARIA ? "ARIA" : "Lili"} explique :</b> ${fail ? failureText(fail) : feed}</div>
      <div class="box"><b>Le savais-tu ?</b> ${d.scienceText.fr}<br><small>${d.scienceRef || ""}</small></div>`;
    const mini = ARIA ? "" : `<div class="mini ${fail || near ? "sad" : "joy"}">${liliSVG(!!(fail || near))}</div>`;
    o.innerHTML = `<div class="rc ${fail || near ? "no" : "ok"}">${mini}<h2>${last ? "" : head}</h2>${last && fail ? `<div class="box">${failureText(fail)} Pas grave, les meilleurs astronautes réessaient !</div>` : ""}${body}<button class="go" type="button" id="rcb" style="animation:none">${last ? "🔄 Rejouer" : "Sol suivant ›"}</button></div>`;
    document.body.appendChild(o);
    $("rcb").onclick = () => { o.remove(); if (next) next.click(); };
    if (!ARIA) { sp(fail ? "Oh non. Ce n'est pas grave, on réessaie ensemble !" : win ? "Bravo, tu as réussi la mission !" : feed); if (!fail && !near && typeof confetti === "function") confetti(); }
    function failureText(t) { return t; }
  };
})();
