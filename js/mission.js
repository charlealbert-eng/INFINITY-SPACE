/* MISSION : situation du jour, tableau de bord, équipage */

function getMissionForDay(dayNum) {
  const idx = clamp(dayNum, 1, MISSIONS_DATA.length) - 1;
  return MISSIONS_DATA[idx];
}

function renderMissionView() {
  const mission = getMissionForDay(state.day);
  const lang = currentLang;

  // Topbar
  document.getElementById("hud-day").textContent = `${state.day} / 10`;
  document.getElementById("hud-sol").textContent = mission.sol;
  const aliveCount = state.sante > 0 ? 4 : 0;
  document.getElementById("hud-alive-count").textContent = `${aliveCount}/4`;
  document.getElementById("hud-alert-text").textContent = mission.alert[lang];

  // Jauges de ressources
  const liters = Math.round((state.eau / 100) * 500);
  const rations = Math.round((state.nourriture / 100) * 50);
  const radStatus =
    state.radiation >= 55 ? t("radHigh") : state.radiation >= 30 ? t("radMod") : t("radLow");

  updateResourceBar("eau", state.eau, `${state.eau}% • ${liters}/500 L`);
  updateResourceBar("oxygene", state.oxygene, `${state.oxygene}% • ${state.oxygene}/100%`);
  updateResourceBar("energie", state.energie, `${state.energie}% • ${state.energie}/100%`);
  updateResourceBar("nourriture", state.nourriture, `${state.nourriture}% • ${rations}/50 Rations`);
  updateResourceBar("radiation", state.radiation, `${state.radiation}% ${radStatus}`, true);

  // Note contextuelle ARIA à gauche
  const noteEl = document.getElementById("aria-live-note");
  if (state.oxygene <= 35) {
    noteEl.textContent =
      lang === "fr"
        ? "ALERTE : Réserve d'oxygène basse. Priorisez le support vie immédiatement."
        : "ALERT: Low oxygen reserve. Prioritize life support immediately.";
  } else if (state.eau <= 35) {
    noteEl.textContent =
      lang === "fr"
        ? "ALERTE : Niveau d'eau critique. Activez le recyclage en boucle fermée."
        : "ALERT: Critical water level. Activate closed-loop recycling.";
  } else if (state.energie <= 35) {
    noteEl.textContent =
      lang === "fr"
        ? "ALERTE : Batteries faibles. Optimisez la production photovoltaïque."
        : "ALERT: Low batteries. Optimize photovoltaic generation.";
  } else if (state.radiation >= 40) {
    noteEl.textContent =
      lang === "fr"
        ? "ALERTE : Radiations élevées détectées par RadLab. Renforcez le blindage."
        : "ALERT: High radiation detected by RadLab. Reinforce shielding.";
  } else {
    noteEl.textContent =
      lang === "fr"
        ? "Systèmes nominaux. Analysez la situation du jour et sélectionnez votre décision."
        : "Systems nominal. Analyze today's situation and select your decision.";
  }

  // État systèmes
  document.getElementById("status-power").textContent =
    state.energie > 35 ? t("statusOnline") : t("statusAlert");
  document.getElementById("status-life").textContent =
    state.oxygene > 35 && state.eau > 35 ? t("statusNominal") : t("statusAlert");
  document.getElementById("status-shield").textContent =
    state.radiation < 45 ? t("statusActive") : t("statusAlert");

  // Colonne centrale : Mission & Décisions
  document.getElementById("mission-source-badge").textContent = mission.sourceBadge;
  document.getElementById("mission-day-title").textContent = mission.title[lang];
  document.getElementById("mission-location-sub").textContent = mission.location[lang];
  document.getElementById("mission-radlab-tag").textContent = `NASA RadLab : ${mission.radLab}`;
  document.getElementById("mission-description").textContent = mission.description[lang];
  document.getElementById("mission-aria-advice").textContent = mission.ariaAdvice[lang];

  // Mini SVG de la station
  const isAlert = state.radiation >= 40 || state.energie <= 35 || state.day === 6 || state.day === 7;
  document.getElementById("hud-station-mini").innerHTML = getStationSvgMarkup(isAlert);

  // Métriques bas de station
  document.getElementById("val-integrite").textContent = `${state.integrite}%`;
  document.getElementById("val-temp").textContent =
    state.energie > 25 ? (lang === "fr" ? "21°C • STABLE" : "21°C • STABLE") : "11°C • BAISSE";
  document.getElementById("val-threat").textContent = mission.threat[lang];

  // Génération des cartes de décision
  const container = document.getElementById("decisions-container");
  container.innerHTML = "";

  mission.decisions.forEach((dec, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "decision-card";

    const impactBadges = formatImpactBadges(dec.impacts);

    btn.innerHTML = `
      <div class="decision-top">
        <span class="decision-title">${dec.title[lang]}</span>
        <span class="decision-lead">${dec.lead}</span>
      </div>
      <div class="decision-desc">${dec.desc[lang]}</div>
      <div class="decision-impacts">${impactBadges}</div>
    `;

    btn.addEventListener("click", () => executeDecision(idx));
    container.appendChild(btn);
  });

  // Colonne droite : Équipage
  renderCrewPanel();
}

function renderCrewPanel() {
  const list = document.getElementById("crew-list");
  list.innerHTML = "";

  const healthVal = clamp(state.sante);
  const statusText =
    healthVal >= 60 ? t("crewOk") : healthVal >= 30 ? t("crewTired") : t("crewCritical");
  const statusClass = healthVal >= 60 ? "" : "warn";

  CREW_MEMBERS.forEach((member, i) => {
    const stamina = clamp(healthVal - i * 3);
    const card = document.createElement("div");
    card.className = "crew-card";
    card.innerHTML = `
      <div class="crew-top">
        <div class="crew-avatar" style="background:${member.color}">${member.name[0]}</div>
        <div>
          <div class="crew-name">${member.name}</div>
          <div class="crew-role">${member.role[currentLang]}</div>
        </div>
      </div>
      <div class="crew-stamina-row">
        <span>${currentLang === "fr" ? "SANTÉ" : "HEALTH"} ${stamina}%</span>
        <div class="stamina-bar-wrap">
          <div class="stamina-bar-fill" style="width:${stamina}%"></div>
        </div>
        <span class="crew-status-pill ${statusClass}">${statusText}</span>
      </div>
    `;
    list.appendChild(card);
  });

  // Dots de campagne
  const pct = Math.round((state.day / 10) * 100);
  document.getElementById("cp-percent").textContent = `${pct}%`;
  const dotsWrap = document.getElementById("cp-dots");
  dotsWrap.innerHTML = "";
  for (let d = 1; d <= 10; d++) {
    const dot = document.createElement("div");
    dot.className = "cp-dot";
    if (d < state.day) dot.classList.add("done");
    else if (d === state.day) dot.classList.add("current");
    dotsWrap.appendChild(dot);
  }
}
