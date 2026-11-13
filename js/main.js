// =====================================================
// main.js : relie l'écran (index.html) au moteur du jeu
// =====================================================

var state = null;

var INF_LESSONS = {
  success: "Bravo ! Tu as vu que l'eau, l'oxygène, l'énergie, la nourriture et la protection sont liées. Quand l'énergie baisse trop, le recyclage ralentit et les réserves s'épuisent plus vite.",
  water: "L'eau est vitale et limitée. Une fuite ou une panne d'énergie (qui arrête le recyclage) peut vider les réserves très vite.",
  oxygen: "Sans oxygène, l'équipage ne survit pas longtemps. Le système d'air a besoin d'énergie pour fonctionner.",
  food: "Les stocks de nourriture doivent durer toute la mission. Une petite serre ne suffit pas à nourrir quatre astronautes.",
  energy: "L'énergie fait fonctionner tous les systèmes vitaux. Quand elle tombe à zéro, tout s'arrête.",
  shielding: "La protection contre les radiations s'use. Il faut la renforcer à temps, mais cela coûte de l'énergie."
};

// ---------- Outils d'affichage ----------
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

// ---------- Tableau de bord ----------
function renderDashboard() {
  setText("mission-day", state.day + " / " + getMissionData().totalDays);
  setText("crew-count", state.crew + " astronautes");

  INF_RESOURCES.forEach(function (r) {
    var value = Math.round(state[r]);
    var bar = el(r + "-bar");
    if (bar) {
      bar.style.width = value + "%";
      bar.style.background =
        value <= 15 ? "#e5484d" :
        value <= 30 ? "#f0a43a" : "";
    }
    setText(r + "-value", value + "%");
  });
}

// Affiche le résultat de la journée écoulée
function showDayResult() {
  var report = state.log[state.log.length - 1];
  if (!report) { return; }

  setText("mission-report", "Jour " + report.day + " : " + report.lines.join(" | "));

  var alertBox = el("event-alert");
  if (alertBox) {
    if (report.event) {
      alertBox.hidden = false;
      setText("event-title", report.event.title + " (" + report.event.effects + ")");
      var desc = report.event.text;
      if (report.event.explanation) {
        desc += " — " + report.event.explanation;
      }
      setText("event-text", desc);
    } else {
      alertBox.hidden = true;
    }
  }
}

// ---------- Bilan de fin ----------
function showEnd() {
  var ok = (state.status === "success");
  setText("end-title", ok ? "🎉 Mission réussie !" : "💥 Mission échouée");

  var endText = el("end-text");
  if (endText) {
    var summary = [];
    if (!ok) {
      summary.push("Cause : " + state.failureReason);
    }
    summary.push("Jours survécus : " + state.daysSurvived + " / " + getMissionData().totalDays + ".");
    summary.push(ok ? INF_LESSONS.success : INF_LESSONS[state.failureResource]);
    endText.textContent = summary.join(" ");
  }

  showScreen("end");
}

// ---------- Actions du joueur ----------
function startMission() {
  state = createInitialState();
  var alertBox = el("event-alert");
  if (alertBox) { alertBox.hidden = true; }
  setText("mission-report", "Mission démarrée. Choisis une action ou passe au jour suivant !");
  renderDashboard();
  showScreen("game");
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

// ---------- Démarrage de la page ----------
function init() {
  var start = el("start-button");
  if (start) { start.addEventListener("click", startMission); }

  var restart = el("restart-button");
  if (restart) { restart.addEventListener("click", startMission); }

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