/* Style « Qui veut gagner des millions » + ressources en haut + sons façon messages iPhone */
(function () {
  const $ = (id) => document.getElementById(id), ARIA = localStorage.getItem("infinity_mode") === "aria";
  const css = document.createElement("style");
  css.textContent = `
  #resStrip{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 14px;background:#0b1226;position:sticky;top:0;z-index:50;border-bottom:2px solid #1e3a8a}
  .rb{background:linear-gradient(180deg,#1e293b,#0f172a);border:2px solid #334155;border-radius:14px;padding:8px 12px;color:#fff;transition:border-color .4s,box-shadow .4s}
  .rb .t{display:flex;justify-content:space-between;align-items:baseline;font-weight:800;font-size:clamp(13px,2.4vw,17px)}.rb .t b{font-size:clamp(18px,3.4vw,26px)}
  .rb .bar{height:10px;background:#334155;border-radius:8px;overflow:hidden;margin-top:6px}.rb .bar i{display:block;height:100%;width:0;border-radius:8px;transition:width .8s cubic-bezier(.2,.8,.2,1),background .4s}
  .rb small{display:block;margin-top:4px;font-size:clamp(11px,2vw,13px);color:#94a3b8}.rb.low{border-color:#ef4444;animation:lw 1s infinite}.rb.mid{border-color:#f59e0b}.rb.ok{border-color:#22c55e55}
  #core3,#detailBtn{display:none!important}
  #ladder{display:flex;gap:6px;justify-content:center;margin:6px 0 10px}#ladder i{width:26px;height:8px;border-radius:5px;background:#334155}#ladder i.done{background:#22c55e}#ladder i.now{background:#fb923c;box-shadow:0 0 10px #fb923c;animation:bt 1.4s infinite}
  .mission-brief-card{background:radial-gradient(circle at 50% 0,#1d4ed8,#0b1226 75%)!important;border:3px solid #fbbf24!important;border-radius:28px!important;color:#fff!important;padding:18px 22px!important;box-shadow:0 0 0 4px #0b1226,0 0 24px #1d4ed8aa}
  .mission-brief-card .mission-description{color:#fff!important;font-size:clamp(17px,2.8vw,23px)!important;line-height:1.45;text-align:center;font-weight:600}
  .mission-brief-card .brief-badge{background:#fbbf24!important;color:#1e293b!important;font-weight:900!important}.mission-brief-card .brief-radlab,.mission-brief-card .aria-order-line{color:#e2e8f0!important}
  .decisions-grid{display:grid!important;grid-template-columns:1fr 1fr;gap:12px}.decisions-grid .decision-card:nth-child(odd):last-child{grid-column:1/-1}
  .decision-card{position:relative;display:block!important;text-align:left;background:linear-gradient(180deg,#1e3a8a,#0b1a4a)!important;color:#fff!important;border:2px solid #60a5fa!important;border-radius:999px 999px 999px 999px!important;border-radius:26px!important;padding:12px 16px 12px 58px!important;box-shadow:0 0 14px #1d4ed855;cursor:pointer}
  .decision-card .decision-title{color:#fff!important;font-weight:800;font-size:clamp(15px,2.5vw,19px)}.decision-card .decision-desc{color:#cbd5e1!important;font-size:clamp(13px,2.2vw,15px);margin-top:4px}
  .decision-card .decision-lead{color:#fbbf24!important;font-size:12px}
  .decision-card .ltr{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:#fbbf24;color:#1e293b;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:18px}
  .decision-card:hover{border-color:#fbbf24!important;box-shadow:0 0 22px #fbbf24aa}
  .decision-card.sel{background:linear-gradient(180deg,#f59e0b,#b45309)!important;border-color:#fde68a!important;animation:blk .35s infinite alternate}@keyframes blk{to{filter:brightness(1.35)}}
  .decision-card.lock{animation:none;filter:none;box-shadow:0 0 30px #fbbf24}.decision-card.dim{opacity:.35;pointer-events:none}
  #finalQ{grid-column:1/-1;text-align:center;font-weight:900;color:#fbbf24;font-size:20px;animation:pop .3s ease}
  .decision-impact,.decision-impacts .impact-tag{font-size:12px}
  @media(max-width:640px){.decisions-grid{grid-template-columns:1fr}#resStrip{grid-template-columns:1fr 1fr 1fr;gap:6px;padding:8px}}
  .panel-center{display:flex!important;flex-direction:column}#rover-card{order:9}.station-bottom-metrics{order:10}.decisions-section{order:5}.panel-resources .panel-heading{display:none}.station-banner{padding-top:8px!important;padding-bottom:8px!important}
  #sndBtn{position:fixed;left:10px;bottom:94px;z-index:9999;padding:8px 12px;border-radius:999px;border:0;background:#1e293b;color:#fff;font-size:13px;opacity:.85}`;
  document.head.appendChild(css);

  // ---------- Sons façon iPhone (WebAudio, aucun fichier) ----------
  let ctx, muted = localStorage.getItem("infinity_mute") === "1";
  function ac() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (ctx && ctx.state === "suspended") ctx.resume(); return ctx; }
  function n(f, d, o) { o = o || {}; const c = ac(); if (!c || muted) return; const t = c.currentTime + (o.at || 0), os = c.createOscillator(), g = c.createGain();
    os.type = o.type || "sine"; os.frequency.setValueAtTime(f, t); if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + d);
    g.gain.setValueAtTime(o.v || 0.16, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); os.connect(g); g.connect(c.destination); os.start(t); os.stop(t + d + 0.02); }
  const sfx = {
    pop: () => { n(900, 0.07, { to: 520 }); },
    key: () => n(1500, 0.03, { type: "triangle", v: 0.07 }),
    send: () => { n(520, 0.2, { to: 1500, v: 0.14 }); n(1500, 0.08, { at: 0.18, v: 0.06 }); },
    tick: (k) => n(300 + (k || 0) * 60, 0.05, { type: "square", v: 0.05 }),
    receive: () => [1319, 1568, 2093].forEach((f, i) => n(f, 0.16, { at: i * 0.09, v: 0.13 })),
    win: () => [523, 659, 784, 1047].forEach((f, i) => n(f, 0.22, { at: i * 0.1, type: "triangle", v: 0.16 })),
    lose: () => { n(392, 0.35, { to: 196, type: "triangle", v: 0.16 }); }
  };
  window.SFX = sfx; window.playTone = playTone = function () {}; // remplace les anciens bips
  const vib = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
  document.addEventListener("pointerdown", (e) => { if (e.target.closest("button,a,.decision-card,[role=button]") && !e.target.closest(".decision-card")) { sfx.pop(); vib(8); } }, true);
  document.addEventListener("keydown", (e) => { if (!e.repeat && e.key.length <= 2 || e.key === "Enter" || e.key === "Backspace") sfx.key(); }, true);
  document.addEventListener("DOMContentLoaded", () => {
    const b = document.createElement("button"); b.id = "sndBtn"; b.type = "button"; const p = () => (b.textContent = muted ? "🔇 Sons : OFF" : "🔊 Sons : ON");
    b.onclick = () => { muted = !muted; localStorage.setItem("infinity_mute", muted ? "1" : "0"); p(); if (!muted) sfx.pop(); }; p(); document.body.appendChild(b); build();
  });

  // ---------- Ressources en haut (3 cases) ----------
  function build() {
    const h = document.querySelector("#view-mission .cmd-topbar"); if (!h || $("resStrip")) return; const s = document.createElement("div"); s.id = "resStrip";
    s.innerHTML = [["v", "🫧💧🌱 Vivre"], ["e", "⚡ Énergie"], ["p", "🛡️ Protection"]].map((x) => `<div class="rb ok" id="rb-${x[0]}"><div class="t"><span>${x[1]}</span><b id="rv-${x[0]}">0%</b></div><div class="bar"><i id="ri-${x[0]}"></i></div><small id="rs-${x[0]}"></small></div>`).join("");
    h.after(s);
  }
  function paint() {
    build(); if (!$("resStrip") || typeof state === "undefined") return;
    const v = { v: Math.min(state.eau, state.oxygene, state.nourriture), e: state.energie, p: 100 - state.radiation };
    const sub = { v: `💧 ${Math.round(state.eau)} · 🫧 ${Math.round(state.oxygene)} · 🌱 ${Math.round(state.nourriture)}`, e: "lumière, chauffage, machines", p: `☢️ radiation ${Math.round(state.radiation)}%` };
    for (const k in v) { const x = Math.max(0, Math.min(100, Math.round(v[k]))); $("rv-" + k).textContent = x + "%"; const i = $("ri-" + k); i.style.width = x + "%"; i.style.background = x <= 25 ? "#ef4444" : x <= 45 ? "#f59e0b" : "#22c55e"; $("rs-" + k).textContent = sub[k]; $("rb-" + k).className = "rb " + (x <= 25 ? "low" : x <= 45 ? "mid" : "ok"); }
  }
  const _u = window.updateResourceBar; window.updateResourceBar = updateResourceBar = function () { _u.apply(this, arguments); paint(); };

  // ---------- Questionnaire façon Millionnaire ----------
  const _r = window.renderMissionView;
  window.renderMissionView = renderMissionView = function () {
    _r.apply(this, arguments); build(); paint();
    const day = state.day, card = document.querySelector(".mission-brief-card");
    let l = $("ladder"); if (!l && card) { l = document.createElement("div"); l.id = "ladder"; card.parentNode.insertBefore(l, card); }
    if (l) l.innerHTML = Array.from({ length: 10 }, (_, i) => `<i class="${i + 1 < day ? "done" : i + 1 === day ? "now" : ""}"></i>`).join("");
    const bd = document.querySelector(".brief-badge"); if (bd) bd.textContent = (typeof currentLang !== "undefined" && currentLang === "en" ? "❓ QUESTION " : "❓ QUESTION ") + day + " / 10";
    document.querySelectorAll("#decisions-container .decision-card").forEach((c, i) => { if (!c.querySelector(".ltr")) { const s = document.createElement("span"); s.className = "ltr"; s.textContent = "ABCD"[i]; c.prepend(s); } });
    const q = $("finalQ"); if (q) q.remove(); sfx.receive();
  };
  document.addEventListener("click", (e) => {
    const c = e.target.closest("#decisions-container .decision-card"); if (!c) return;
    e.stopPropagation(); e.preventDefault(); const box = $("decisions-container"); if (box.dataset.busy) return; box.dataset.busy = "1";
    const idx = Array.prototype.indexOf.call(box.querySelectorAll(".decision-card"), c);
    box.querySelectorAll(".decision-card").forEach((x) => x.classList.add(x === c ? "sel" : "dim")); vib([15, 30, 15]);
    sfx.send(); const q = document.createElement("div"); q.id = "finalQ"; q.textContent = "Réponse finale ? 🥁"; box.appendChild(q);
    [350, 650, 900, 1100].forEach((t, k) => setTimeout(() => sfx.tick(k), t));
    setTimeout(() => { c.classList.remove("sel"); c.classList.add("lock"); sfx.pop(); }, 1250);
    setTimeout(() => { delete box.dataset.busy; executeDecision(idx); }, 1550);
  }, true);
  const _s = window.showInstantResult;
  window.showInstantResult = showInstantResult = function (m, d, fail) { _s.apply(this, arguments); if (fail || d.ok === false) sfx.lose(); else sfx.win(); };

  // ---------- Mode ARIA : nettoyer les restes de Lili ----------
  if (ARIA) setInterval(() => {
    document.querySelectorAll(".aria-pill").forEach((e) => (e.textContent = "ARIA"));
    document.querySelectorAll("button,div,span").forEach((e) => { if (e.children.length === 0 && /Lili parle|Écouter Lili/.test(e.textContent)) (e.closest("button") || e).style.display = "none"; });
  }, 800);
})();
