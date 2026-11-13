// =====================================================
// main.js : pilote l'interface, la modale et le Commandant
// =====================================================

var state = null;

var INF_LESSONS = {
  success: "Mission accomplie ! Vous avez maîtrisé l'équilibre d'un système fermé : anticiper la réparation du blindage et préserver l'énergie a sauvé les 4 astronautes.",
  water: "L'eau est le pilier de la vie spatiale et terrestre. Sans énergie suffisante, son recyclage chute brutalement.",
  oxygen: "L'oxygène dépend directement de l'électricité et de l'intégrité des systèmes de filtration.",
  food: "Lorsque le blindage thermique est faible, l'équipage dépense plus d'énergie physique et épuise ses rations.",
  energy: "L'énergie alimente chaque sous-système. Une panne électrique entraîne une réaction en chaîne.",
  shielding: "Le blindage protège l'équipage des radiations et du froid extrême de la Lune."
};

function el(id) { return document.getElementById(id); }

function setText(id, text) {
  var e = el(id);
  if (e) { e.textContent = text; }
}

function showScreen(name) {
  var screens = {
    start: el("home-screen"),
    game: el("dashboard"),
    end: el("end-screen")
  };
  for (var key in screens) {
    if (screens[key]) {
      screens[key].hidden = (key !== name);
    }
  }
}

// ---------- Mise à jour du Commandant réactif ----------
function updateCommander() {
  var panel = el("commander-panel");
  if (!panel || !state) { return; }

  // Trouver la ressource la plus basse
  var lowestName = "water";
  var lowestVal = 100;
  INF_RESOURCES.forEach(function (r) {
    if (state[r] < lowestVal) {
      lowestVal = state[r];
      lowestName = r;
    }
  });

  panel.classList.remove("state-calm", "state-worried", "state-panic");

  if (lowestVal <= 25) {
    panel.classList.add("state-panic");
    setText("commander-mood", "🚨 PANIQUE CRITIQUE · DANGER IMMÉDIAT");
    setText("commander-message",
      "ALERTE ROUGE Commandant ! Notre niveau de " + INF_LABELS[lowestName].toLowerCase() +
      " est tombé à " + Math.round(lowestVal) + " % ! L'équipage est en danger critique, agissez tout de suite !"
    );
    setText("crew-status", "Détresse critique");
  } else if (lowestVal <= 50) {
    panel.classList.add("state-worried");
    setText("commander-mood", "⚠️ VIGILANCE · SYSTÈMES SOUS TENSION");
    if (state.shielding < 45) {
      setText("commander-message",
        "Commandant, notre blindage est à " + Math.round(state.shielding) +
        " % ! Le froid s'infiltre dans la base et l'équipage consomme plus de nourriture. Renforcez la protection !"
      );
    } else {
      setText("commander-message",
        "Attention Commandant, notre réserve de " + INF_LABELS[lowestName].toLowerCase() +
        " descend à " + Math.round(lowestVal) + " %. L'équipage compte sur votre prochaine décision."
      );
    }
    setText("crew-status", "Sous tension");
  } else {
    panel.classList.add("state-calm");
    setText("commander-mood", "✅ NOMINAL · ÉQUIPAGE CONFIANT");
    setText("commander-message",
      "Excellente gestion, Commandant ! Tous les voyants sont au vert et les 4 astronautes gardent le moral."
    );
    setText("crew-status", "En pleine forme");
  }
}

// ---------- Tableau de bord ----------
function renderDashboard() {
  var total = getMissionData().totalDays;
  setText("mission-day", state.day + " / " + total);
  setText("crew-count", state.crew + " astronautes");

  INF_RESOURCES.forEach(function (r) {
    var value = Math.round(state[r]);
    var bar = el(r + "-bar");
    var card = el("card-" + r);
    var tag = el("tag-" + r);

    if (bar) {
      bar.style.width = value + "%";
      bar.style.background =
        value <= 25 ? "#ff4d5a" :
        value <= 50 ? "#ffa63d" : "";
    }
    if (card) {
      card.classList.toggle("is-critical", value <= 25);
      card.classList.toggle("is-low", value > 25 && value <= 50);
    }
    if (tag) {
      tag.textContent = value <= 25 ? "CRITIQUE" : (value <= 50 ? "FAIBLE" : "");
    }
    setText(r + "-value", value + "%");
  });

  // Aura du bouclier sur le dessin de la base
  var aura = el("dome-shield-aura");
  if (aura) {
    aura.setAttribute("stroke", state.shielding <= 25 ? "#ff4d5a" : (state.shielding < 45 ? "#ffa63d" : "#3dffa2"));
  }

  // Bouton réserve
  var remainingReserves = getMissionData().maxReserveUses - state.reserveUses;
  setText("reserve-count", remainingReserves);
  var reserveBtn = document.querySelector('[data-action="useReserve"]');
  if (reserveBtn) {
    reserveBtn.disabled = (remainingReserves <= 0);
  }

  updateCommander();
}

// ---------- Affichage du diagnostic du jour ----------
function showDayResult() {
  var report = state.log[state.log.length - 1];
  if (!report) { return; }

  var reportBox = el("mission-report");
  if (reportBox) {
    reportBox.innerHTML = "";
    report.lines.forEach(function (line) {
      var p = document.createElement("p");
      p.textContent = "Jour " + report.day + " — " + line;
      reportBox.appendChild(p);
    });
  }

  var alertBox = el("event-alert");
  if (alertBox) {
    if (report.event) {
      alertBox.hidden = false;
      setText("event-title", "🚨 Incident Jour " + report.day + " : " + report.event.title + " (" + report.event.effects + ")");
      setText("event-text", report.event.text);
      setText("event-consequence", "Impact système : " + (report.event.explanation || ""));
    } else if (state.shielding < 45) {
      alertBox.hidden = false;
      setText("event-title", "⚠️ Alerte Continue : Blindage affaibli (" + Math.round(state.shielding) + " %)");
      setText("event-text", "La protection de la base reste sous le seuil de sécurité de 45 %.");
      setText("event-consequence", "Conséquence : Surconsommation de nourriture et d'énergie tant que le blindage n'est pas renforcé.");
    } else {
      alertBox.hidden = true;
    }
  }
}

// ---------- Bilan de fin ----------
function showEnd() {
  var ok = (state.status === "success");
  setText("end-title", ok ? "🎉 Mission Réussie !" : "💥 Échec de la Mission");

  var endText = el("end-text");
  if (endText) {
    var lines = [];
    if (!ok) {
      lines.push(state.failureReason);
    }
    lines.push("Durée tenue : " + state.daysSurvived + " / " + getMissionData().totalDays + " jours.");
    lines.push(ok ? INF_LESSONS.success : INF_LESSONS[state.failureResource]);
    endText.textContent = lines.join(" ");
  }

  var statsBox = el("end-stats");
  if (statsBox) {
    statsBox.innerHTML = "";
    INF_RESOURCES.forEach(function (r) {
      var span = document.createElement("span");
      span.textContent = INF_LABELS[r] + " : " + Math.round(state[r]) + "%";
      statsBox.appendChild(span);
    });
  }

  showScreen("end");
}

// ---------- Démarrage & Actions ----------
function startMission() {
  state = createInitialState();

  var alertBox = el("event-alert");
  if (alertBox) {
    alertBox.hidden = false;
    setText("event-title", "Défi Jour 1 : Blindage endommagé à 42 %");
    setText("event-text", "L'impact lors de l'alunissage a fissuré la couche protectrice de l'habitat.");
    setText("event-consequence", "Conséquence : Tant que le blindage reste sous 45 %, l'équipage consomme plus de nourriture et d'énergie.");
  }

  var reportBox = el("mission-report");
  if (reportBox) {
    reportBox.innerHTML = "<p>Jour 1 — Alunissage effectué. Blindage endommagé à 42 %. En attente de votre première décision.</p>";
  }

  renderDashboard();
  showScreen("game");

  // Afficher la fenêtre de briefing au lancement
  var modal = el("briefing-modal");
  if (modal) { modal.hidden = false; }
}

function onAction(actionId) {
  if (!state || state.status !== "running") { return; }
  state = playDay(state, actionId);
  renderDashboard();
  showDayResult();
  if (state.status !== "running") {
    showEnd();
  }
}

function init() {
  var start = el("start-button");
  if (start) { start.addEventListener("click", startMission); }

  var restart = el("restart-button");
  if (restart) { restart.addEventListener("click", startMission); }

  var confirmBtn = el("confirm-mission-button");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      var modal = el("briefing-modal");
      if (modal) { modal.hidden = true; }
    });
  }

  var openBriefingBtn = el("open-briefing-btn");
  if (openBriefingBtn) {
    openBriefingBtn.addEventListener("click", function () {
      var modal = el("briefing-modal");
      if (modal) { modal.hidden = false; }
    });
  }

  var nextDay = el("next-day-button");
  if (nextDay) {
    nextDay.addEventListener("click", function () {
      onAction("none");
    });
  }

  var buttons = document.querySelectorAll("[data-action]");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      onAction(this.getAttribute("data-action"));
    });
  }

  showScreen("start");
}

window.addEventListener("DOMContentLoaded", init);