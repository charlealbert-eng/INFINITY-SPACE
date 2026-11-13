// =====================================================
// simulation.js : fait avancer la mission jour après jour
// Propriétaire : coordinateur (membre 5)
//
// Ce fichier marche SEUL : s'il ne trouve pas les fichiers des
// autres membres, il utilise des valeurs de secours.
// TOUTES les valeurs ci-dessous sont des « valeurs de jeu »
// inventées pour tester la logique (pas des données NASA).
// =====================================================

var INF_RESOURCES = ["water", "oxygen", "energy", "food", "shielding"];

var INF_LABELS = {
  water: "Eau",
  oxygen: "Oxygène",
  energy: "Énergie",
  food: "Nourriture",
  shielding: "Protection"
};

// ---------- Valeurs de secours (valeurs de jeu) ----------
var INF_DEFAULTS = {
  totalDays: 10,
  maxReserveUses: 2,
  start: { crew: 4, water: 100, oxygen: 100, energy: 100, food: 100, shielding: 60 },
  actions: {
    saveEnergy: {
      label: "Économiser l'énergie",
      effects: { energy: 12, water: -3 },
      explanation: "On éteint des équipements : on gagne de l'énergie, mais le traitement de l'eau ralentit."
    },
    repair: {
      label: "Réparer un équipement",
      effects: { energy: -8, oxygen: 6, water: 4 },
      explanation: "Une réparation demande de l'énergie, mais elle remet en état les systèmes de l'air et de l'eau."
    },
    useReserve: {
      label: "Utiliser la réserve",
      effects: { water: 15, oxygen: 10, food: 10 },
      explanation: "La réserve de secours aide beaucoup, mais elle est limitée : on ne peut l'utiliser que 2 fois."
    },
    reinforceShield: {
      label: "Renforcer la protection",
      effects: { shielding: 15, energy: -6 },
      explanation: "Renforcer l'abri protège contre les radiations, mais cela coûte de l'énergie."
    }
  },
  events: [
    { day: 3, title: "Panne électrique", text: "Un panneau solaire est tombé en panne.", effects: { energy: -20 },
      explanation: "Moins d'électricité : certains équipements doivent s'arrêter." },
    { day: 5, title: "Fuite d'eau", text: "Une fuite a vidé une partie du réservoir.", effects: { water: -15 },
      explanation: "L'eau est limitée : une fuite se paie cher." },
    { day: 7, title: "Alerte radiation", text: "Une éruption solaire frappe la Lune.", effects: { shielding: -20 },
      explanation: "La protection s'use quand les radiations sont fortes." },
    { day: 9, title: "Baisse de la production de nourriture", text: "La petite serre expérimentale produit moins.", effects: { food: -10 },
      explanation: "Une serre expérimentale ne nourrit pas tout un équipage." }
  ]
};

// ---------- Données de la mission ----------
// Utilise MISSION_DATA (fichier du membre 4) s'il existe,
// sinon les valeurs de secours ci-dessus.
function getMissionData() {
  var custom = (typeof MISSION_DATA !== "undefined") ? MISSION_DATA : {};
  var d = INF_DEFAULTS;
  return {
    totalDays: custom.totalDays || d.totalDays,
    maxReserveUses: custom.maxReserveUses || d.maxReserveUses,
    start: custom.start || d.start,
    actions: custom.actions || d.actions,
    events: custom.events || d.events
  };
}

// ---------- Outils ----------
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
    parts.push((INF_LABELS[key] || key) + " " + sign + effects[key]);
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

// Garde chaque ressource entre 0 et 100
function cleanValues(s) {
  INF_RESOURCES.forEach(function (r) {
    var v = Math.round(s[r] * 10) / 10;
    s[r] = Math.max(0, Math.min(100, v));
  });
}

// ---------- Consommation de secours ----------
// (le membre 1 la remplace avec applyDailyConsumption dans resources.js)
function defaultDailyConsumption(s) {
  var recyclingWorks = s.energy >= 25;   // règle de jeu : sans énergie, le recyclage s'arrête
  var extra = recyclingWorks ? 0 : 4;
  s.water -= s.crew * 2.25 + extra;
  s.oxygen -= s.crew * 2.25 + extra;
  s.food -= s.crew * 1.5;
  s.energy -= 6;
  return s;
}

// ---------- Début de partie ----------
function createInitialState() {
  var s = copyOf(getMissionData().start);
  s.day = 1;
  s.status = "running";          // "running", "success" ou "failure"
  s.failureResource = "";
  s.failureReason = "";
  s.daysSurvived = 0;
  s.reserveUses = 0;
  s.log = [];
  s.incidents = [];
  s.decisions = [];
  return s;
}

// ---------- Décision du joueur ----------
function applyAction(s, actionId, data, report) {
  var action = data.actions[actionId];
  if (!actionId || actionId === "none" || !action) {
    report.lines.push("Aucune décision aujourd'hui.");
    return;
  }
  if (actionId === "useReserve" && s.reserveUses >= data.maxReserveUses) {
    report.lines.push("Plus de réserve disponible !");
    return;
  }
  if (actionId === "useReserve") { s.reserveUses = s.reserveUses + 1; }
  addEffects(s, action.effects);
  s.decisions.push({ day: s.day, action: actionId, label: action.label });
  report.lines.push("Décision : " + action.label + " (" + effectsText(action.effects) + ")");
}

// ---------- Réussite ou échec ----------
function checkStatus(s, data) {
  var reasons = {
    water: "L'eau est épuisée.",
    oxygen: "L'oxygène est épuisé.",
    food: "La nourriture est épuisée.",
    energy: "Plus d'énergie : les systèmes vitaux s'arrêtent.",
    shielding: "La protection contre les radiations est tombée à zéro."
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

// ---------- Une journée complète ----------
// Reçoit l'état actuel et la décision, renvoie le NOUVEL état.
function playDay(oldState, actionId) {
  if (oldState.status !== "running") { return oldState; }
  var data = getMissionData();
  var s = copyOf(oldState);
  var report = { day: s.day, lines: [], event: null };

  // 1. Consommation de la journée
  var before = copyOf(s);
  var consume = (typeof applyDailyConsumption === "function") ? applyDailyConsumption : defaultDailyConsumption;
  var result = consume(s);
  if (result) { s = result; }
  report.lines.push("Consommation : " + diffText(before, s));

  // 2. Décision du joueur
  applyAction(s, actionId, data, report);

  // 3. Événement du jour (fichier events.js)
  var ev = getEventForDay(s.day);
  if (ev) { applyEvent(s, ev, report); }

  // 4. Nettoyage puis vérification de la fin
  cleanValues(s);
  checkStatus(s, data);
  s.log.push(report);
  if (s.status === "running") { s.day = s.day + 1; }
  return s;
}
