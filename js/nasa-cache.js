/* Clé NASA + cache de secours : chaque réponse api.nasa.gov réussie est gardée en localStorage
   et resservie si l'API est saturée (DEMO_KEY) ou hors-ligne.
   Clé perso gratuite : https://api.nasa.gov  puis, dans la console : localStorage.setItem("infinity_nasa_key","VOTRE_CLE") */
(function () {
  const realFetch = window.fetch.bind(window);
  const key = () => localStorage.getItem("infinity_nasa_key") || "DEMO_KEY";
  window.fetch = function (url, opts) {
    if (typeof url !== "string" || url.indexOf("api.nasa.gov") < 0) return realFetch(url, opts);
    url = url.replace(/api_key=DEMO_KEY/, "api_key=" + encodeURIComponent(key()));
    const ck = "infinity_cache_" + url.replace(/api_key=[^&]*/, "");
    return realFetch(url, opts).then((r) => {
      if (!r.ok) throw new Error("http " + r.status);
      r.clone().text().then((t) => { try { localStorage.setItem(ck, t); } catch (e) {} });
      return r;
    }).catch((e) => {
      const c = localStorage.getItem(ck);
      if (c) return new Response(c, { status: 200, headers: { "Content-Type": "application/json" } });
      throw e;
    });
  };
})();
