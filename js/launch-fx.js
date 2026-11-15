/* Animations : séquence de lancement (style centre de contrôle) + recap animé après chaque décision. 100 % local, hors-ligne. */
(function () {
  const $ = (id) => document.getElementById(id), ARIA = localStorage.getItem("infinity_mode") === "aria";
  const css = document.createElement("style");
  css.textContent = `.fx{position:absolute;inset:0;width:100%;height:100%;z-index:0}.ov>*:not(canvas){position:relative;z-index:1}
  #launch{z-index:10050;background:#020617;flex-direction:column;text-align:center}
  #launch h3{letter-spacing:3px;color:#67e8f9;margin:0 0 10px;font-size:clamp(14px,3vw,20px)}
  #launch ul{list-style:none;padding:0;margin:0 auto;max-width:520px;text-align:left;min-height:120px;font-family:ui-monospace,monospace;font-size:clamp(13px,2.8vw,16px);color:#86efac}
  #launch li{animation:lt .4s ease both;margin:4px 0}@keyframes lt{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
  #cd{font-size:clamp(70px,22vw,150px);font-weight:900;color:#fb923c;height:1.1em;line-height:1.1;text-shadow:0 0 30px #fb923c88}
  #cd.p{animation:cdp .9s ease}@keyframes cdp{0%{transform:scale(1.6);opacity:0}30%{opacity:1}100%{transform:scale(1)}}
  #rk{font-size:clamp(50px,14vw,100px);transition:transform 1.5s cubic-bezier(.5,0,1,.6),opacity 1.5s}#rk.up{transform:translateY(-130vh) scale(.7);opacity:.2}
  #skipL{position:absolute;right:14px;top:14px;z-index:2;background:#1e293b;color:#fff;border:0;border-radius:999px;padding:8px 14px}
  .gr{display:grid;grid-template-columns:120px 1fr 48px;align-items:center;gap:8px;margin:6px 0;font-size:14px}.gb{height:12px;background:#cbd5e1;border-radius:8px;overflow:hidden}
  .gb i{display:block;height:100%;width:0;border-radius:8px;transition:width 1.2s cubic-bezier(.2,.8,.2,1),background .6s}.gr b{text-align:right}
  .stamp{display:inline-block;border:4px solid #16a34a;color:#16a34a;border-radius:10px;padding:2px 14px;font-weight:900;letter-spacing:2px;transform:rotate(-6deg);animation:sl .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:.3s;margin-bottom:6px}
  .stamp.no{border-color:#d97706;color:#d97706}@keyframes sl{from{transform:rotate(-6deg) scale(3);opacity:0}to{transform:rotate(-6deg) scale(1);opacity:1}}
  .rc:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,transparent,#22d3ee,transparent);animation:sc 2.2s ease-in-out 2}@keyframes sc{from{top:0}to{top:100%}}
  .rc{position:relative}.rc .impact-tag{display:inline-block;margin:2px 4px 2px 0;padding:3px 9px;border-radius:999px;font-weight:700;font-size:13px}.rc .impact-pos{background:#dcfce7;color:#166534}.rc .impact-neg{background:#fee2e2;color:#991b1b}`;
  document.head.appendChild(css);

  function stars(cv, speed) {
    const c = cv.getContext("2d"); let w, h, S = [], sp = speed;
    const fit = () => { w = cv.width = cv.offsetWidth || innerWidth; h = cv.height = cv.offsetHeight || innerHeight; }; fit();
    for (let i = 0; i < 150; i++) S.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() });
    (function f() {
      if (!cv.isConnected) return; c.clearRect(0, 0, w, h); c.fillStyle = c.strokeStyle = "#e2e8f0";
      S.forEach((s) => { const pz = s.z; s.z -= sp.v; if (s.z <= 0.02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; return; }
        const x = w / 2 + (s.x / s.z) * w * 0.25, y = h / 2 + (s.y / s.z) * h * 0.25;
        if (sp.v > 0.02) { const x0 = w / 2 + (s.x / pz) * w * 0.25, y0 = h / 2 + (s.y / pz) * h * 0.25; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x, y); c.stroke(); }
        else c.fillRect(x, y, 1 + (1 - s.z) * 2, 1 + (1 - s.z) * 2); });
      requestAnimationFrame(f); })();
    return sp;
  }

  function launch() {
    sessionStorage.setItem("infinity_launched", "1");
    const f = window.REAL_FLARE, o = document.createElement("div"); o.className = "ov"; o.id = "launch";
    o.innerHTML = `<canvas class="fx"></canvas><button id="skipL" type="button">Passer ›</button><h3>${ARIA ? "SÉQUENCE DE LANCEMENT — INFINITY SPACE" : "COMPTE À REBOURS, PETIT ASTRONAUTE !"}</h3><ul id="tl"></ul><div id="cd"></div><div id="rk">🚀</div>`;
    document.body.appendChild(o);
    const sp = stars(o.querySelector("canvas"), { v: 0.004 }), T = [];
    const lines = ["✔ Site d'atterrissage : cratère Jezero, Mars", "✔ Équipage : 4 astronautes", "✔ Météo solaire (NASA DONKI) : " + (f ? f.cls + (f.live ? " — direct" : " — archive") : "…"), "✔ Support vital : eau · air · énergie · protection"];
    let done = false;
    const end = () => { if (done) return; done = true; T.forEach(clearTimeout); o.style.transition = "opacity .5s"; o.style.opacity = 0; setTimeout(() => { o.remove(); window.__launching = false; window.dispatchEvent(new Event("launchdone")); }, 500); };
    lines.forEach((l, i) => T.push(setTimeout(() => { const li = document.createElement("li"); li.textContent = l; $("tl").appendChild(li); }, 300 + i * 450)));
    ["3", "2", "1"].forEach((n, i) => T.push(setTimeout(() => { const c = $("cd"); if (!c) return; c.textContent = n; c.className = ""; void c.offsetWidth; c.className = "p"; }, 2300 + i * 900)));
    T.push(setTimeout(() => { const c = $("cd"); if (c) { c.textContent = "DÉCOLLAGE !"; c.style.fontSize = "clamp(34px,9vw,64px)"; } $("rk").className = "up"; sp.v = 0.06; }, 5000));
    T.push(setTimeout(end, 6600)); $("skipL").onclick = end;
  }
  const sv = window.switchView;
  window.switchView = switchView = function (id) {
    const go = id === "view-mission" && state.started && state.day === 1 && !sessionStorage.getItem("infinity_launched");
    if (go) window.__launching = true;
    const r = sv.apply(this, arguments); if (go) launch(); return r;
  };

  // Recap animé : barres avant -> après
  const _x = window.executeDecision;
  window.executeDecision = executeDecision = function () { window.__prev = Object.assign({}, state); return _x.apply(this, arguments); };
  const _s = window.showInstantResult;
  window.showInstantResult = showInstantResult = function (m, d, fail) {
    _s.apply(this, arguments);
    const all = document.querySelectorAll(".ov"), o = all[all.length - 1], rc = o && o.querySelector(".rc"); if (!rc || !window.__prev) return;
    const g = (s) => ({ v: Math.round(Math.min(s.eau, s.oxygene, s.nourriture)), e: Math.round(s.energie), p: Math.round(100 - s.radiation) });
    const a = g(window.__prev), b = g(state), win = !fail && state.day >= 10;
    const row = (k, l) => `<div class="gr"><span>${l}</span><div class="gb"><i data-to="${b[k]}" style="width:${a[k]}%"></i></div><b data-a="${a[k]}" data-b="${b[k]}">${a[k]}%</b></div>`;
    const box = document.createElement("div"); box.className = "box";
    box.innerHTML = "<b>Avant → après ce choix</b>" + row("v", "🫧💧🌱 Vivre") + row("e", "⚡ Énergie") + row("p", "🛡️ Protection");
    rc.insertBefore(box, rc.querySelector("#rcb"));
    if (fail || win) { const st = document.createElement("div"); st.className = "stamp" + (fail ? " no" : ""); st.textContent = fail ? "À RÉESSAYER" : "MISSION RÉUSSIE"; rc.insertBefore(st, rc.firstChild.nextSibling); }
    const cv = document.createElement("canvas"); cv.className = "fx"; o.insertBefore(cv, o.firstChild); stars(cv, { v: 0.0015 });
    setTimeout(() => {
      box.querySelectorAll("i").forEach((i) => { const v = +i.dataset.to; i.style.width = v + "%"; i.style.background = v <= 25 ? "#ef4444" : v <= 45 ? "#f59e0b" : "#34d399"; });
      box.querySelectorAll("b[data-a]").forEach((n) => { const A = +n.dataset.a, B = +n.dataset.b; let k = 0; const t = setInterval(() => { k++; n.textContent = Math.round(A + ((B - A) * k) / 20) + "%"; if (k >= 20) clearInterval(t); }, 60); });
    }, 350);
  };
})();
