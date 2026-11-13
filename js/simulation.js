// =====================================================
// simulation.js : moteur physique et interdépendance
// =====================================================

var INF_RESOURCES = ["water", "oxygen", "energy", "food", "shielding"];

var INF_LABELS = {
  water: "Eau",
  oxygen: "Oxygène",
  energy: "Énergie",
  food: "Nourriture",
  shielding: "Blindage"
};

function getMissionData() {
  return MISSION_DATA;
}

function copyOf(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addEffects(s, effects) {
  for (var key in effects) {
    s[key] = (s[key] || 0) + effects[key];
  }
}

function effectsText(effects) {
  var parts = [];
  for (var key in effects) {
    var sign = effects[key] > 0 ? "+" : "";
    parts.push((INF_LABELS[key] || key) + " " + sign + effects[key] + "%");
  }
  return parts.join(", ");
}

function diffText(before, after) {
  var diff = {};
  INF_RESOURCES.forEach(function (r) {
    var d = Math.round((after[r] - before[r]) * 10) / 10;
    if (d !== 0) { diff[r] = d; }
  });
  return effectsText(diff);
}

function cleanValues(s) {
  INF_RESOURCES.forEach(function (r) {
    var v = Math.round(s[r] * 10) / 10;
    s[r] = Math.max(0, Math.min(100, v));
  });
}

// Consommation quotidienne avec interdépendance des systèmes
function defaultDailyConsumption(s, report) {
  var lowEnergy = s.energy < 30;
  var lowShield = s.shielding < 45;

  var extraWaterOxy = lowEnergy ? 3.5 : 0;
  var extraFood = lowShield ? 2.5 : 0;
  var extraEnergy = lowShield ? 2.5 : 0;

  s.water -= (s.crew * 1.8) + extraWaterOxy;
  s.oxygen -= (s.crew * 1.8) + extraWaterOxy;
  s.food -= (s.crew * 1.6) + extraFood;
  s.energy -= 6 + extraEnergy;
  s.shielding -= 1.5;

  if (lowShield && report) {
    report.lines.push("⚠️ Alerte thermique (blindage < 45%) : l'équipage consomme plus de nourriture et d'énergie.");
  }
  if (lowEnergy && report) {
    report.lines.push("⚠️ Énergie faible (< 30%) : le recyclage ralentit, l'eau et l'oxygène baissent plus vite.");
  }
  return s;
}

function createInitialState() {
  var s = copyOf(getMissionData().start);
  s.day = 1;
  s.status = "running";
  s.failureResource = "";
  s.failureReason = "";
  s.daysSurvived = 0;
  s.reserveUses = 0;
  s.log = [];
  s.incidents = [];
  s.decisions = [];
  return s;
}

function applyAction(s, actionId, data, report) {
  var action = data.actions[actionId];
  if (!actionId || actionId === "none" || !action) {
    report.lines.push("Décision : Aucune intervention aujourd'hui (observation).");
    return;
  }
  if (actionId === "useReserve" && s.reserveUses >= data.maxReserveUses) {
    report.lines.push("Réserve d'urgence déjà épuisée !");
    return;
  }
  if (actionId === "useReserve") {
    s.reserveUses += 1;
  }
  addEffects(s, action.effects);
  s.decisions.push({ day: s.day, action: actionId, label: action.label });
  report.lines.push("Action : " + action.label + " (" + effectsText(action.effects) + ")");
  report.lines.push("Analyse : " + action.explanation);
}

function checkStatus(s, data) {
  var reasons = {
    water: "Les réserves d'eau sont tombées à 0 %. L'équipage ne peut plus s'hydrater.",
    oxygen: "L'oxygène est épuisé. L'air n'est plus respirable dans l'habitat.",
    food: "Plus aucune ration alimentaire disponible pour soutenir l'équipage.",
    energy: "Panne totale d'énergie : le chauffage et le support-vie se sont arrêtés.",
    shielding: "Le blindage a cédé (0 %) : l'habitat n'est plus protégé des radiations."
  };
  for (var i = 0; i < INF_RESOURCES.length; i++) {
    var r = INF_RESOURCES[i];
    if (s[r] <= 0) {
      s.status = "failure";
      s.failureResource = r;
      s.failureReason = reasons[r];
      s.daysSurvived = s.day - 1;
      return;
    }
  }
  if (s.day >= data.totalDays) {
    s.status = "success";
    s.daysSurvived = s.day;
  }
}

function playDay(oldState, actionId) {
  if (oldState.status !== "running") { return oldState; }
  var data = getMissionData();
  var s = copyOf(oldState);
  var report = { day: s.day, lines: [], event: null };

  // 1. Décision du joueur
  applyAction(s, actionId, data, report);

  // 2. Consommation quotidienne + effets croisés
  var before = copyOf(s);
  defaultDailyConsumption(s, report);
  report.lines.push("Consommation du jour : " + diffText(before, s));

  // 3. Événement du jour (events.js)
  var ev = getEventForDay(s.day);
  if (ev) { applyEvent(s, ev, report); }

  // 4. Nettoyage & vérification
  cleanValues(s);
  checkStatus(s, data);
  s.log.push(report);
  if (s.status === "running") { s.day += 1; }
  return s;
}