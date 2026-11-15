/* Gameplay : 3 jauges clés, coût de vie quotidien, événements aléatoires (rejouabilité) */
(function () {
  const $ = (id) => document.getElementById(id);
  const kid = () => true; // textes simples, adaptés 7-12 ans (explications détaillées dans « Le savais-tu ? »)

  // 1) Trois jauges clés (le détail des 5 ressources reste disponible via le bouton)
  const css = document.createElement("style");
  css.textContent = ".core3{display:grid;gap:10px;margin-bottom:10px}.core3 .c{background:#1e293b;border-radius:12px;padding:10px;color:#fff}.core3 .t{display:flex;justify-content:space-between;font-weight:700;font-size:15px}.core3 small{opacity:.75;display:block;margin-top:2px}.core3 .b{height:12px;background:#334155;border-radius:8px;margin-top:6px;overflow:hidden}.core3 .f{height:100%;transition:width .4s}.detail-off .res-item{display:none}#detailBtn{width:100%;margin-bottom:8px;padding:8px;border:0;border-radius:10px;background:#334155;color:#fff;font-size:13px}#evt{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:10000;max-width:92%;background:#7c2d12;color:#fff;padding:12px 16px;border-radius:14px;font-size:15px;box-shadow:0 6px 20px #0008}";
  document.head.appendChild(css);
  function build() {
    const p = document.querySelector(".panel-resources"); if (!p || $("core3")) return;
    const h = p.querySelector(".panel-heading");
    const d = document.createElement("div"); d.id = "core3"; d.className = "core3";
    d.innerHTML = [["vivre", "🫧💧🌱 Vivre", "air · eau · nourriture"], ["nrj", "⚡ Énergie", "lumière, chauffage, machines"], ["prot", "🛡️ Protection", "contre les rayons du Soleil"]]
      .map((x) => `<div class="c"><div class="t"><span>${x[1]}</span><span id="c-${x[0]}-v"></span></div><small id="c-${x[0]}-s">${x[2]}</small><div class="b"><div class="f" id="c-${x[0]}-f"></div></div></div>`).join("");
    const b = document.createElement("button"); b.id = "detailBtn"; b.type = "button";
    p.classList.add("detail-off"); b.textContent = "🔍 Voir le détail (5 ressources)";
    b.onclick = () => { p.classList.toggle("detail-off"); b.textContent = p.classList.contains("detail-off") ? "🔍 Voir le détail (5 ressources)" : "🔼 Masquer le détail"; };
    h.after(d, b);
  }
  function paint() {
    build(); if (!$("core3") || typeof state === "undefined") return;
    const arr = [["eau", "l'eau"], ["oxygene", "l'air"], ["nourriture", "la nourriture"]].sort((a, b) => state[a[0]] - state[b[0]]);
    const vals = { vivre: state[arr[0][0]], nrj: state.energie, prot: 100 - state.radiation };
    const col = (v) => (v <= 25 ? "#ef4444" : v <= 45 ? "#f59e0b" : "#34d399");
    for (const k in vals) { const v = Math.max(0, Math.min(100, vals[k])); $("c-" + k + "-v").textContent = v + "%"; const f = $("c-" + k + "-f"); f.style.width = v + "%"; f.style.background = col(v); }
    $("c-vivre-s").textContent = "le plus faible : " + arr[0][1];
  }
  const _u = window.updateResourceBar; window.updateResourceBar = updateResourceBar = function () { _u.apply(this, arguments); paint(); };

  // 2) Chaque sol coûte (rien n'est gratuit) + 3) événements aléatoires
  const EVENTS = [
    { t: "🌪️ Un tourbillon de poussière a nettoyé les panneaux solaires (ça arrive vraiment sur Mars !)", d: { energie: 8 } },
    { t: "☄️ Un petit caillou de l'espace a fait un trou dans la maison. Il faut boucher vite !", d: { oxygene: -6, integrite: -8 } },
    { t: "🌱 Belle récolte dans la serre !", d: { nourriture: 7, oxygene: 2 } },
    { t: "🧊 Nuit très froide : le chauffage travaille plus fort.", d: { energie: -7 } },
    { t: "💧 Le filtre à eau a mieux marché que prévu.", d: { eau: 6 } },
    { t: "☀️ Des particules du Soleil traversent la maison : un peu plus de rayons.", d: { radiation: 6 } }
  ];
  const DAILY = { eau: -1, oxygene: -1, nourriture: -1, energie: -1 }; // vivre coûte : les réserves baissent chaque sol
  function toast(txt) { let e = $("evt"); if (!e) { e = document.createElement("div"); e.id = "evt"; document.body.appendChild(e); } e.textContent = txt; e.style.display = "block"; clearTimeout(e._t); e._t = setTimeout(() => (e.style.display = "none"), 6000); }
  const _x = window.executeDecision;
  window.executeDecision = executeDecision = function (i) {
    const ev = state.day !== 6 && state.day !== 10 && Math.random() < 0.45 ? EVENTS[Math.floor(Math.random() * EVENTS.length)] : null;
    const all = Object.assign({}, DAILY);
    if (ev) for (const k in ev.d) all[k] = (all[k] || 0) + ev.d[k];
    for (const k in all) if (typeof state[k] === "number") state[k] = clamp(state[k] + all[k]);
    window.__lastEvent = ev ? ev.t : null;
    if (ev) toast("Événement du jour : " + ev.t);
    _x(i);
  };
  document.addEventListener("DOMContentLoaded", () => { build(); paint(); });
})();
