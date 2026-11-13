// =====================================================
// mission-data.js : scénario, chiffres initiaux et pannes
// Prêt à recevoir les constantes NASA officielles demain !
// =====================================================

var MISSION_DATA = {
  title: "INFINITY SPACE : Simulateur Lunaire (Libreville)",
  totalDays: 10,
  maxReserveUses: 2,

  // État initial juste après l'alunissage mouvementé :
  // Le blindage est déjà endommagé à 42 % !
  start: {
    crew: 4,
    water: 85,
    oxygen: 90,
    energy: 75,
    food: 80,
    shielding: 42
  },

  actions: {
    saveEnergy: {
      label: "Économiser l'énergie",
      effects: { energy: 12, water: -3 },
      explanation: "Les systèmes secondaires sont mis en veille : l'énergie remonte, mais le recyclage de l'eau ralentit légèrement."
    },
    repair: {
      label: "Réparer les systèmes",
      effects: { energy: -8, oxygen: 7, water: 5 },
      explanation: "L'équipage colmate les micro-fuites d'air et d'eau. L'opération mobilise de l'énergie."
    },
    useReserve: {
      label: "Utiliser la réserve de secours",
      effects: { water: 15, oxygen: 10, food: 12 },
      explanation: "Ouverture d'un conteneur d'urgence (stock limité à 2 utilisations sur toute la mission)."
    },
    reinforceShield: {
      label: "Renforcer le blindage",
      effects: { shielding: 18, energy: -6 },
      explanation: "Pose de plaques de régolithe et recalibrage du bouclier thermique : réduit la perte de chaleur et de nourriture."
    }
  },

  events: [
    {
      day: 2,
      title: "Chute thermique nocturne",
      text: "La température extérieure plonge brutalement. Les radiateurs tournent à plein régime.",
      effects: { energy: -12, food: -5 },
      explanation: "Pour maintenir leur température corporelle, les astronautes brûlent davantage de calories."
    },
    {
      day: 4,
      title: "Panne d'un panneau solaire",
      text: "De la poussière lunaire bloque l'orientation d'un capteur principal.",
      effects: { energy: -18 },
      explanation: "Si l'énergie passe sous 30 %, le recyclage de l'eau et de l'oxygène perd en efficacité."
    },
    {
      day: 6,
      title: "Micro-fuite sur le circuit d'eau",
      text: "Une valve de condensation fuit dans le module de vie.",
      effects: { water: -15 },
      explanation: "L'eau est essentielle pour l'hydratation et la production d'oxygène par électrolyse."
    },
    {
      day: 8,
      title: "Tempête solaire",
      text: "Une éruption solaire frappe la surface lunaire : alerte radiation !",
      effects: { shielding: -22, oxygen: -5 },
      explanation: "Le bouclier absorbe les particules solaires mais s'use fortement."
    },
    {
      day: 9,
      title: "Stress de la serre hydroponique",
      text: "La récolte expérimentale produit moins de rations que prévu.",
      effects: { food: -10 },
      explanation: "À la veille du retour, les réserves alimentaires sont mises à rude épreuve."
    }
  ]
};