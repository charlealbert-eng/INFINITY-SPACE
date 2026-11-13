// =====================================================
// main.js : relie l'écran (HTML) au moteur du jeu
// Propriétaire : coordinateur (membre 5)
//
// Il cherche dans la page les éléments avec ces identifiants (id) :
//   écrans    : start-screen, game-screen, end-screen
//   boutons   : start-button, restart-button
//   décisions : boutons avec data-action="saveEnergy" | "repair" |
//               "useReserve" | "reinforceShield" | "none"
//   jauges    : gauge-water, gauge-oxygen, gauge-energy, gauge-food,
//               gauge-shielding  (+ value-water... pour le chiffre)
//   textes    : day-display, crew-display, event-box, log-list, report
// Si un élément n'existe pas, le jeu l'ignore sans planter.
// =====================================================

var state = null;

var INF_LESSONS = {
  success: "Bravo ! Tu as vu que l'eau, l'oxygène, l'énergie, la nourriture et la protection sont liées. Dans ce jeu, quand l'énergie baisse trop, le recyclage s'arrête et l'eau et l'oxygène se consomment plus vite.",
  water: "L'eau est vitale et limitée. Dans ce jeu, une fuite ou une panne d'énergie (qui arrête le recyclage) peut vider les réserves très vite.",
  oxygen: "Sans oxygène, l'équipage ne survit pas longtemps. Dans ce jeu, le système de l'air a besoin d'énergie pour fonctionner.",
  food: "Les stocks de nourriture doivent durer toute la mission. Une petite serre ne suffit pas à nourrir quatre astronautes.",
  energy: "L'énergie fait fonctionner tous les systèmes vitaux. Quand elle tombe à zéro, tout s'arrête : c'est pourquoi chaque décision qui en consomme doit être pesée.",
  shielding: "La protection contre les radiations s'use. Il faut la renforcer à temps, mais cela coûte de l'énergie : c'est un compromis."
};

// ---------- Petits outils d'affichage ----------
function el(id) { return document.getElementById(id); }

function setText(id, text) {
  var e = el(id);
  if (e) { e.textContent = text; }
}

function addLine(parent, text, tag) {
  var p = document.createElement(tag || "p");
  p.textContent = text;
  parent.appendChild(p);
}

function showScreen(name) {
  ["start", "game", "end"].forEach(function (n) {
    var e = el(n + "-screen");
    if (e) { e.style.display = (n === name) ? "block" : "none"; }
  });
}

// ---------- Tableau de bord ----------
function renderDashboard() {
  setText("day-display", "Jour " + state.day + " / " + getMissionData().totalDays);
  setText("crew-display", state.crew + " astronautes");
  INF_RESOURCES.forEach(function (r) {
    var value = Math.round(state[r]);
    var gauge = el("gauge-" + r);
    if (gauge) {
      if (gauge.tagName === "PROGRESS" || gauge.tagName === "METER") {
        gauge.max = 100;
        gauge.value = value;
      } else {
        gauge.style.width = value + "%";
      }
      gauge.classList.toggle("low", value < 25);
    }
    setText("value-" + r, value + " %");
  });
}

// Affiche ce qui s'est passé pendant la journée qui vient de finir
function showDayResult() {
  var report = state.log[state.log.length - 1];
  var box = el("event-box");
  if (box) {
    box.innerHTML = "";
    addLine(box, "Jour " + report.day + " terminé", "h3");
    report.lines.forEach(function (line) { addLine(box, line); });
    if (report.event) {
      addLine(box, report.event.text);
      if (report.event.explanation) { addLine(box, "Pourquoi ? " + report.event.explanation); }
    }
  }
  var list = el("log-list");
  if (list) {
    var li = document.createElement("li");
    li.textContent = "Jour " + report.day + " : " + report.lines.join(" | ");
    list.appendChild(li);
  }
}

// ---------- Bilan de fin ----------
function showEnd() {
  var box = el("report");
  if (box) {
    box.innerHTML = "";
    var ok = (state.status === "success");
    addLine(box, ok ? "Mission réussie !" : "Mission échouée", "h2");
    if (!ok) { addLine(box, "Cause : " + state.failureReason); }
    addLine(box, "Jours survécus : " + state.daysSurvived + " / " + getMissionData().totalDays);

    addLine(box, "Ressources restantes", "h3");
    INF_RESOURCES.forEach(function (r) {
      addLine(box, INF_LABELS[r] + " : " + Math.round(state[r]) + " %");
    });

    addLine(box, "Incidents rencontrés", "h3");
    if (state.incidents.length === 0) { addLine(box, "Aucun."); }
    state.incidents.forEach(function (i) { addLine(box, "Jour " + i.day + " : " + i.title); });

    addLine(box, "Tes décisions", "h3");
    if (state.decisions.length === 0) { addLine(box, "Aucune."); }
    state.decisions.forEach(function (d) { addLine(box, "Jour " + d.day + " : " + d.label); });

    addLine(box, "Ce que tu as appris", "h3");
    addLine(box, ok ? INF_LESSONS.success : INF_LESSONS[state.failureResource]);
    addLine(box, "Les valeurs de ce jeu sont des paramètres fictifs, pensés pour l'apprentissage.");
  }
  showScreen("end");
}

// ---------- Actions du joueur ----------
function startMission() {
  state = createInitialState();
  var list = el("log-list");
  if (list) { list.innerHTML = ""; }
  var box = el("event-box");
  if (box) { box.textContent = "La mission commence. Choisis ta première décision."; }
  renderDashboard();
  showScreen("game");
}

function onAction(actionId) {
  if (!state || state.status !== "running") { return; }
  state = playDay(state, actionId);
  renderDashboard();
  showDayResult();
  if (state.status !== "running") { showEnd(); }
}

// ---------- Démarrage de la page ----------
function init() {
  var start = el("start-button");
  if (start) { start.addEventListener("click", startMission); }
  var restart = el("restart-button");
  if (restart) { restart.addEventListener("click", startMission); }

  var buttons = document.querySelectorAll("[data-action]");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      onAction(this.getAttribute("data-action"));
    });
  }

  showScreen("start");
  if (!start) { startMission(); }   // pas de bouton Start : on démarre direct
}

window.addEventListener("DOMContentLoaded", init);
