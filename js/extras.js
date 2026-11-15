/* Extras : mode sans chrono (accessibilité) + hors-ligne (PWA) */
(function () {
  const KEY = "infinity_notimer";
  const off = () => localStorage.getItem(KEY) === "1";
  if (typeof startDeadline === "function") {
    const orig = startDeadline;
    window.startDeadline = function (s) { if (off()) { stopDeadline(); const t = document.getElementById("timer") || document.querySelector("[id*=timer]"); if (t) t.style.visibility = "hidden"; return; } orig(s); };
    startDeadline = window.startDeadline;
  }
  const b = document.createElement("button");
  b.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:9999;padding:8px 12px;border-radius:999px;border:0;background:#1e293b;color:#fff;font-size:13px;opacity:.85";
  const paint = () => (b.textContent = off() ? "⏱️ Chrono : OFF" : "⏱️ Chrono : ON");
  b.onclick = () => { localStorage.setItem(KEY, off() ? "0" : "1"); paint(); if (off()) stopDeadline(); };
  paint(); document.body.appendChild(b);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
