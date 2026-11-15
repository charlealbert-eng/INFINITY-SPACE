/* Météo spatiale réelle (NASA DONKI) -> gameplay du Sol 6, + délai Terre-Mars au Sol 9 */
(function () {
  const ARCHIVE = { cls: "X9.0", date: "2024-10-03", live: false }; // éruption réelle archivée (DONKI), utilisée si l'API ne répond pas
  const rank = (c) => ({ C: 1, M: 2, X: 3 }[(c || "C")[0]] || 0) * 100 + (parseFloat((c || "").slice(1)) || 0);
  function factor(cls) { const l = cls[0], n = parseFloat(cls.slice(1)) || 1; return l === "X" ? (n >= 5 ? 1.5 : n >= 2 ? 1.2 : 1) : 0.6; }
  function deepReplace(o, a, b) { for (const k in o) { if (typeof o[k] === "string") o[k] = o[k].split(a).join(b); else if (o[k] && typeof o[k] === "object") deepReplace(o[k], a, b); } }
  function apply(f) {
    window.REAL_FLARE = f; window.dispatchEvent(new Event("flare"));
    const m = MISSIONS_DATA[5]; if (!m) return;
    if (!m._base) { m._base = "X1.8"; m._rad0 = m.decisions.map((d) => d.impacts.radiation || 0); }
    deepReplace(m, m._base, f.cls); m._base = f.cls;
    const k = factor(f.cls);
    m.decisions.forEach((d, i) => { const r = m._rad0[i]; if (typeof d.impacts.radiation === "number") d.impacts.radiation = r > 0 ? Math.round(r * k) : r; });
    m.sourceBadge = (f.live ? "NASA DONKI (DIRECT, " : "NASA DONKI (ARCHIVE, ") + f.date + ")";
    const el = document.getElementById("welcome-donki-status");
    if (el) el.textContent = (f.live ? "EN DIRECT • " : "ARCHIVE • ") + f.cls + " • " + f.date;
  }
  apply(ARCHIVE);
  fetch("https://api.nasa.gov/DONKI/FLR?api_key=DEMO_KEY").then((r) => r.json()).then((d) => {
    if (!Array.isArray(d) || !d.length) return;
    const best = d.filter((x) => x.classType).sort((a, b) => rank(b.classType) - rank(a.classType))[0];
    if (best) apply({ cls: best.classType.split(".")[0] + (best.classType.includes(".") ? "." + best.classType.split(".")[1].slice(0, 1) : ""), date: (best.beginTime || "").slice(0, 10), live: true });
  }).catch(() => {});

  // Délai de communication Terre-Mars (réel : environ 3 à 22 minutes dans un sens)
  const delay = Math.round(3 + Math.random() * 19);
  function addDelay() { const m9 = MISSIONS_DATA[8];
  if (m9) { m9.description.fr += ` 📡 La Terre est à ${delay} min de message dans un sens : un aller-retour prend ${delay * 2} min. Impossible d'attendre sa réponse, tu dois décider seul !`; m9.description.en += ` 📡 Earth is ${delay} min away one way: a round trip takes ${delay * 2} min. You can't wait for an answer, you must decide alone!`; } }
  addDelay(); window.applyFlare = apply; window.addDelay = addDelay;

  document.addEventListener("DOMContentLoaded", () => {
    const a = document.createElement("a"); a.href = "sources.html"; a.target = "_blank"; a.textContent = "🔬 Sources & science";
    a.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:9999;padding:8px 12px;border-radius:999px;background:#1e293b;color:#fff;font-size:13px;text-decoration:none;opacity:.85";
    document.body.appendChild(a);
  });
})();
