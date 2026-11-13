// =====================================================
// mission-data.js : les textes et les chiffres de la mission
// Première version écrite pour l'équipe INFINITY SPACE.
// À relire et à corriger avec les sources du tableau de recherche.
//
// IMPORTANT : tous les chiffres ci-dessous sont des
// « VALEURS DE JEU » inventées pour apprendre. Ce ne sont pas
// des données NASA. Quand une valeur vient d'une source,
// l'écrire en commentaire à côté, avec le lien.
//
// Comment lire les « effects » : un nombre positif AJOUTE à la
// ressource, un nombre négatif la RETIRE. Exemple : { energy: -20 }
// retire 20 points d'énergie.
// =====================================================

var MISSION_DATA = {

  // ---------- Présentation (pour la page d'accueil) ----------
  title: "INFINITY SPACE : Mission Trainer",
  intro: "Quatre astronautes viennent d'arriver dans un habitat lunaire. Les réserves sont limitées et personne ne peut en apporter d'autres pendant 10 jours. À toi de garder l'équipage en sécurité : chaque décision a un coût !",

  // ---------- Paramètres de la mission (valeurs de jeu) ----------
  totalDays: 10,
  maxReserveUses: 2,   // la réserve de secours ne peut servir que 2 fois

  // Niveaux de départ (en %), valeurs de jeu
  start: { crew: 4, water: 100, oxygen: 100, energy: 100, food: 100, shielding: 60 },

  // ---------- Décisions possibles (une par jour) ----------
  actions: {
    saveEnergy: {
      label: "Économiser l'énergie",
      effects: { energy: 12, water: -3 },
      explanation: "Tu éteins des équipements qui ne sont pas indispensables : l'énergie remonte. Mais le traitement de l'eau tourne moins bien, donc l'eau baisse un peu. Sur une base, l'électricité est limitée : chaque appareil allumé en consomme."
    },
    repair: {
      label: "Réparer un équipement",
      effects: { energy: -8, oxygen: 6, water: 4 },
      explanation: "Tu remets en état les systèmes de l'air et de l'eau. Une réparation n'est pas gratuite : elle demande de l'énergie et du temps à l'équipage."
    },
    useReserve: {
      label: "Utiliser la réserve de secours",
      effects: { water: 15, oxygen: 10, food: 10 },
      explanation: "La réserve aide beaucoup, mais il n'y en a que pour 2 utilisations. Une base très loin de la Terre ne peut pas être ravitaillée à tout moment."
    },
    reinforceShield: {
      label: "Renforcer la protection contre les radiations",
      effects: { shielding: 15, energy: -6 },
      explanation: "Un abri mieux protégé réduit le risque pour l'équipage, mais cela coûte de l'énergie. Dans la réalité, la protection dépend du type de rayonnement, des matériaux et de leur épaisseur : ici, on la résume en une seule jauge."
    }
  },

  // ---------- Événements (un seul par jour au maximum) ----------
  events: [
    {
      day: 3,
      title: "Panne électrique",
      text: "Un panneau solaire est tombé en panne : la base produit moins d'électricité.",
      effects: { energy: -20 },
      explanation: "Quand l'énergie baisse, certains équipements doivent s'arrêter. Surveille ta jauge d'énergie : en dessous de 25, le recyclage de l'eau et de l'air s'arrête dans ce jeu."
    },
    {
      day: 5,
      title: "Fuite d'eau",
      text: "Une fuite a vidé une partie d'un réservoir.",
      effects: { water: -15 },
      explanation: "L'eau est limitée : une fuite se paie cher. Réparer à temps ou utiliser la réserve peut sauver la mission."
    },
    {
      day: 7,
      title: "Alerte radiation",
      text: "Une éruption du Soleil envoie beaucoup de particules vers la Lune. L'équipage se met à l'abri.",
      effects: { shielding: -20 },
      explanation: "Les radiations sont un risque pour la santé. Dans ce jeu, la protection s'use quand l'alerte est forte : mieux vaut l'avoir renforcée avant."
    },
    {
      day: 9,
      title: "Baisse de la production de nourriture",
      text: "La petite serre expérimentale produit moins que prévu.",
      effects: { food: -10 },
      explanation: "Une petite serre expérimentale ne nourrit pas tout un équipage : les stocks restent indispensables."
    }
  ]
};
