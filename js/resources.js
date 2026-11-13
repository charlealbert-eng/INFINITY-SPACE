// ============================================================
// resources.js — INFINITY SPACE · Mission Trainer
// Les 5 ressources de la base lunaire et leurs règles de base.
// À charger dans index.html AVANT main.js :
//   <script src="js/resources.js"></script>
//   <script src="js/main.js"></script>
// ============================================================

// ---------- Réglages généraux de la mission ----------
const MISSION_DAYS = 10;   // durée de la mission (jours)
const CREW_SIZE = 4;       // nombre d'astronautes
const WARNING_LEVEL = 30;  // en dessous : alerte orange
const CRITICAL_LEVEL = 15; // en dessous : danger rouge

// ---------- Les 5 ressources ----------
// value        : niveau actuel (en %), même départ que dans index.html
// lossPerDay   : perte moyenne par jour pour tout l'équipage (en points de %)
// Ces valeurs sont des valeurs de JEU, faciles à modifier pour équilibrer.
const RESOURCES = {
  water:     { label: "Water",     value: 80, lossPerDay: 3.0 },
  oxygen:    { label: "Oxygen",    value: 90, lossPerDay: 2.5 },
  energy:    { label: "Energy",    value: 75, lossPerDay: 3.0 },
  food:      { label: "Food",      value: 85, lossPerDay: 2.5 },
  shielding: { label: "Shielding", value: 70, lossPerDay: 0.5 }
};

// ---------- Outils de base ----------

// Garde une valeur entre 0 et 100
function clampValue(value) {
  return Math.max(0, Math.min(100, value));
}

// Lire le niveau d'une ressource : getResource("water")
function getResource(name) {
  return RESOURCES[name].value;
}

// Ajouter (ou retirer avec un nombre négatif) : changeResource("water", -10)
function changeResource(name, amount) {
  RESOURCES[name].value = clampValue(RESOURCES[name].value + amount);
  return RESOURCES[name].value;
}

// État d'une ressource : "ok", "warning" ou "critical"
function getStatus(name) {
  const value = RESOURCES[name].value;
  if (value <= CRITICAL_LEVEL) return "critical";
  if (value <= WARNING_LEVEL) return "warning";
  return "ok";
}

// ---------- Passage d'un jour ----------
// Règle clé du document de recherche : les ressources sont liées.
// Si l'énergie est trop basse, le recyclage de l'eau et la production
// d'oxygène marchent moins bien : leurs pertes augmentent de 50 %.
function applyDailyConsumption() {
  const energyIsLow = RESOURCES.energy.value <= WARNING_LEVEL;
  const report = [];

  for (const name in RESOURCES) {
    let loss = RESOURCES[name].lossPerDay;

    if (energyIsLow && (name === "water" || name === "oxygen")) {
      loss = loss * 1.5;
      report.push("Énergie faible : " + RESOURCES[name].label + " se dégrade plus vite.");
    }

    changeResource(name, -loss);
  }
  return report; // liste de messages pour le "Mission Report"
}

// ---------- Fin de mission ----------

// Défaite si l'eau, l'oxygène ou la nourriture tombe à 0
// (les astronautes ne peuvent pas survivre sans).
function isMissionFailed() {
  return (
    RESOURCES.water.value <= 0 ||
    RESOURCES.oxygen.value <= 0 ||
    RESOURCES.food.value <= 0
  );
}

// Remettre les ressources au départ (bouton "recommencer")
function resetResources() {
  RESOURCES.water.value = 80;
  RESOURCES.oxygen.value = 90;
  RESOURCES.energy.value = 75;
  RESOURCES.food.value = 85;
  RESOURCES.shielding.value = 70;
}

// ---------- Affichage dans la page ----------
// Demande que index.html ait ces id : water-value / water-bar,
// oxygen-value / oxygen-bar, etc. Si un id manque, on l'ignore.
function renderResources() {
  for (const name in RESOURCES) {
    const valueEl = document.getElementById(name + "-value");
    const barEl = document.getElementById(name + "-bar");
    const rounded = Math.round(RESOURCES[name].value);

    if (valueEl) valueEl.textContent = rounded + "%";
    if (barEl) {
      barEl.style.width = rounded + "%";
      // Couleur de la barre selon l'état
      const status = getStatus(name);
      barEl.style.background =
        status === "critical" ? "#e5484d" :
        status === "warning" ? "#f0a43a" : "#21c5e8";
    }
  }
}
