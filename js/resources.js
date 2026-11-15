/* RESSOURCES : jauges, libellés et badges d'impact */

function clamp(val, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(val)));
}

function updateResourceBar(key, value, labelText, isRadiation = false) {
  const bar = document.getElementById(`bar-${key}`);
  const valEl = document.getElementById(`val-${key}`);
  if (valEl) valEl.textContent = labelText;
  if (!bar) return;

  bar.style.width = `${clamp(value)}%`;
  bar.classList.remove("warn", "danger", "rad-low");

  if (isRadiation) {
    if (value >= 55) bar.classList.add("danger");
    else if (value >= 30) bar.classList.add("warn");
    else bar.classList.add("rad-low");
  } else {
    if (value <= 25) bar.classList.add("danger");
    else if (value <= 45) bar.classList.add("warn");
  }
}

function getResourceLabel(key) {
  const map = {
    eau: t("resWater"),
    oxygene: t("resOxygen"),
    energie: t("resEnergy"),
    nourriture: t("resFood"),
    radiation: t("resRadiation"),
    sante: currentLang === "fr" ? "SANTÉ" : "HEALTH",
    integrite: currentLang === "fr" ? "INTÉGRITÉ" : "INTEGRITY"
  };
  return map[key] || key.toUpperCase();
}

function formatImpactBadges(impacts) {
  return Object.entries(impacts)
    .map(([key, delta]) => {
      const sign = delta > 0 ? `+${delta}%` : `${delta}%`;
      // Pour la radiation, une baisse (-) est positive pour le joueur !
      const isBeneficial = key === "radiation" ? delta < 0 : delta > 0;
      const cls = isBeneficial ? "impact-pos" : "impact-neg";
      return `<span class="impact-tag ${cls}">${getResourceLabel(key)} ${sign}</span>`;
    })
    .join("");
}
