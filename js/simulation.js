/* SIMULATION : application instantanée d'une décision et résultat */

function executeDecision(decisionIndex) {
  const mission = getMissionForDay(state.day);
  const decision = mission.decisions[decisionIndex];
  if (!decision) return;

  playTone(520, 0.08, "triangle");

  // Appliquer immédiatement les impacts
  Object.entries(decision.impacts).forEach(([key, delta]) => {
    if (typeof state[key] === "number") {
      state[key] = clamp(state[key] + delta);
    }
  });

  // Vérifier les seuils critiques de survie
  let failureReason = null;
  if (state.oxygene <= 0) {
    failureReason =
      currentLang === "fr"
        ? "Rupture totale d'oxygène : la pression partielle d'O₂ est tombée sous le seuil vital."
        : "Total oxygen depletion: O₂ partial pressure dropped below survival threshold.";
  } else if (state.eau <= 0) {
    failureReason =
      currentLang === "fr"
        ? "Épuisement des réserves d'eau : le circuit de recyclage et l'hydratation sont à sec."
        : "Water reserves depleted: recycling loop and crew hydration ran dry.";
  } else if (state.energie <= 0) {
    failureReason =
      currentLang === "fr"
        ? "Blackout énergétique total : le chauffage et le support vie se sont arrêtés dans la nuit martienne."
        : "Total power blackout: heating and life support shut down during the Martian night.";
  } else if (state.radiation >= 100 || state.sante <= 0) {
    failureReason =
      currentLang === "fr"
        ? "Exposition radiologique critique : la santé de l'équipage a atteint un seuil irréversible."
        : "Critical radiation exposure: crew health reached an irreversible threshold.";
  }

  saveState();
  showInstantResult(mission, decision, failureReason);
}

function showInstantResult(mission, decision, failureReason) {
  const lang = currentLang;
  const isVictory = !failureReason && state.day >= 10;

  const badge = document.getElementById("result-status-badge");
  const failBox = document.getElementById("result-failure-box");
  const nextBtn = document.getElementById("btn-next-day");
  const restartBtn = document.getElementById("btn-restart-game");

  badge.classList.remove("fail");
  failBox.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");

  if (failureReason) {
    playTone(180, 0.25, "sawtooth");
    badge.textContent = t("resultFailBadge");
    badge.classList.add("fail");
    failBox.classList.remove("hidden");
    document.getElementById("result-failure-reason").textContent = failureReason;
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  } else if (isVictory) {
    playTone(660, 0.22, "triangle");
    badge.textContent = t("resultVictoryBadge");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  } else {
    playTone(580, 0.12, "sine");
    badge.textContent = t("resultSuccessBadge");
  }

  document.getElementById("result-day-tag").textContent = `${t("dayLabel")} ${String(
    state.day
  ).padStart(2, "0")} / 10`;
  document.getElementById("result-title").textContent = mission.title[lang];
  document.getElementById("result-choice-summary").textContent = decision.title[lang];
  document.getElementById("result-deltas-grid").innerHTML = formatImpactBadges(decision.impacts);
  document.getElementById("result-science-ref").textContent = decision.scienceRef;
  document.getElementById("result-science-text").textContent = decision.scienceText[lang];
  document.getElementById("result-aria-feedback").textContent = decision.ariaFeedback[lang];

  switchView("view-result");
}
