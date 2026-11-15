/* ==========================================================================
   INFINITY SPACE — DONNÉES DE MISSION, TRADUCTIONS (FR/EN) & RESSOURCES NASA/ASC
   Fichier séparé pour zéro latence et maintenance facile sur GitHub Pages
   ========================================================================== */

const UI_DICTIONARY = {
  fr: {
    versionTag: "SYSTÈME DE COMMANDEMENT • V2.0",
    btnScientificSources: "🛰️ RESSOURCES NASA & ASC",
    btnSettings: "⚙️ PARAMÈTRES",
    welcomeKicker: "PROGRAMME D'EXPLORATION MARTIENNE • 10 SOLS DE SURVIE",
    welcomeTitle: "BIENVENUE SUR INFINITY SPACE",
    welcomeSubtitle:
      "Prenez le commandement du premier avant-poste scientifique sur Mars. Analysez chaque alerte réelle, choisissez la meilleure solution technique et assurez la survie de vos 4 spécialistes pendant 10 jours martiens.",
    ariaRole: "ASSISTANT SCIENTIFIQUE IA",
    welcomeAriaMsg:
      "« Bienvenue, Commandant. Les flux NASA DONKI, RadLab, OSDR Bio, Mars Trek et les protocoles hydroponiques de l'Agence spatiale canadienne sont chargés. Concentrez-vous sur chaque mission et surveillez l'impact de vos décisions sur nos 5 ressources vitales. »",
    btnStartMission: "LANCER LA MISSION",
    btnContinueMission: "REPRENDRE LA PARTIE EN COURS",
    teleSector: "SECTEUR D'ATTERRISSAGE",
    teleSolarFeed: "TÉLÉMÉTRIE NASA DONKI",
    teleCrewCount: "ÉQUIPAGE",
    teleCrewReady: "4 SPÉCIALISTES • OPÉRATIONNELS",
    showcaseHeader: "STATION MARTIENNE • MODULE OBSERVATOIRE",
    sfAtmosphere: "ATMOSPHÈRE MARS",
    sfGravity: "GRAVITÉ SURFACE",
    sfRecycle: "RECYCLAGE EAU ASC",

    dayLabel: "JOUR",
    aliveLabel: "EN VIE",
    btnDataShort: "🛰️ DONNÉES NASA",
    btnSettingsShort: "⚙️ PARAMÈTRES",

    panelResources: "RESSOURCES",
    resWater: "EAU",
    resOxygen: "OXYGÈNE",
    resEnergy: "ÉNERGIE",
    resFood: "NOURRITURE",
    resRadiation: "RADIATION",
    radLow: "FAIBLE / SÛR",
    radMod: "MODÉRÉ / VIGILANCE",
    radHigh: "ÉLEVÉ / CRITIQUE",
    noteTitle: "ANALYSE EN DIRECT",
    panelSystems: "ÉTAT SYSTÈMES",
    sysPower: "Réseau électrique",
    sysLife: "Support vie",
    sysShield: "Bouclier anti-radiations",
    statusOnline: "EN LIGNE",
    statusNominal: "NOMINAL",
    statusActive: "ACTIF",
    statusAlert: "SOUS TENSION",

    missionSituationLabel: "MISSION DU JOUR — PROBLÈME SCIENTIFIQUE",
    chooseDecisionTitle: "CHOISISSEZ VOTRE SOLUTION OPÉRATIONNELLE",
    chooseDecisionHint: "Cliquez sur une décision pour voir immédiatement son résultat",
    metricIntegrity: "INTÉGRITÉ STRUCTURELLE",
    metricTemp: "TEMPÉRATURE HABITAT",
    metricThreat: "MENACE EXTERNE",

    panelCrew: "ÉQUIPAGE",
    campaignProgress: "PROGRESSION CAMPAGNE",

    resultSuccessBadge: "SOL VALIDÉ • MISSION ACCOMPLIE",
    resultFailBadge: "ALERTE CRITIQUE • ÉCHEC DE SURVIE",
    resultVictoryBadge: "VICTOIRE FINALE • HUMANITÉ SUR MARS",
    resultResourceImpact: "IMPACT IMMÉDIAT SUR LES RESSOURCES",
    failureDiagnosisTitle: "POURQUOI LA MISSION A ÉCHOUÉ (ANALYSE TECHNIQUE)",
    scienceExplanationTitle: "EXPLICATION SCIENTIFIQUE & SOURCES RÉELLES",
    btnNextDay: "PASSER AU JOUR SUIVANT",
    btnRestartMission: "RECOMMENCER LA MISSION",

    settingsTitle: "PARAMÈTRES & ACCESSIBILITÉ",
    btnClose: "✕ FERMER",
    settingLangLabel: "LANGUE DE L'INTERFACE",
    settingSfxLabel: "VOLUME EFFETS SONORES",
    settingAmbientLabel: "AMBIANCE STATION",
    audioActive: "SON ACTIVÉ",
    audioMuted: "SON COUPÉ (MUET)",
    btnFullscreen: "PLEIN ÉCRAN",
    btnResetSave: "RÉINITIALISER LA PARTIE",
    sourcesModalTitle: "RESSOURCES SCIENTIFIQUES NASA & ASC-CSA INTÉGRÉES",
    crewOk: "OK",
    crewTired: "FATIGUÉ",
    crewCritical: "CRITIQUE"
  },

  en: {
    versionTag: "COMMAND SYSTEM • V2.0",
    btnScientificSources: "🛰️ NASA & CSA RESOURCES",
    btnSettings: "⚙️ SETTINGS",
    welcomeKicker: "MARS EXPLORATION PROGRAM • 10 SURVIVAL SOLS",
    welcomeTitle: "WELCOME TO INFINITY SPACE",
    welcomeSubtitle:
      "Take command of humanity's first scientific outpost on Mars. Analyze real space telemetry, select the best technical solution, and keep your 4 specialists alive for 10 Martian days.",
    ariaRole: "AI SCIENTIFIC ASSISTANT",
    welcomeAriaMsg:
      "“Welcome, Commander. NASA DONKI, RadLab, OSDR Bio, Mars Trek telemetry and Canadian Space Agency hydroponic protocols are online. Focus on each mission and watch how your choices affect our 5 vital resources.”",
    btnStartMission: "START MISSION",
    btnContinueMission: "RESUME SAVED MISSION",
    teleSector: "LANDING SECTOR",
    teleSolarFeed: "NASA DONKI TELEMETRY",
    teleCrewCount: "CREW",
    teleCrewReady: "4 SPECIALISTS • READY",
    showcaseHeader: "MARTIAN STATION • OBSERVATORY MODULE",
    sfAtmosphere: "MARS ATMOSPHERE",
    sfGravity: "SURFACE GRAVITY",
    sfRecycle: "CSA WATER RECYCLING",

    dayLabel: "DAY",
    aliveLabel: "ALIVE",
    btnDataShort: "🛰️ NASA DATA",
    btnSettingsShort: "⚙️ SETTINGS",

    panelResources: "RESOURCES",
    resWater: "WATER",
    resOxygen: "OXYGEN",
    resEnergy: "ENERGY",
    resFood: "FOOD",
    resRadiation: "RADIATION",
    radLow: "LOW / SAFE",
    radMod: "MODERATE / CAUTION",
    radHigh: "HIGH / CRITICAL",
    noteTitle: "LIVE ANALYSIS",
    panelSystems: "SYSTEMS STATUS",
    sysPower: "Power Grid",
    sysLife: "Life Support",
    sysShield: "Radiation Shield",
    statusOnline: "ONLINE",
    statusNominal: "NOMINAL",
    statusActive: "ACTIVE",
    statusAlert: "STRAINED",

    missionSituationLabel: "DAILY MISSION — SCIENTIFIC CHALLENGE",
    chooseDecisionTitle: "CHOOSE YOUR OPERATIONAL SOLUTION",
    chooseDecisionHint: "Click a decision to immediately compute its outcome",
    metricIntegrity: "STRUCTURAL INTEGRITY",
    metricTemp: "HABITAT TEMPERATURE",
    metricThreat: "EXTERNAL THREAT",

    panelCrew: "CREW",
    campaignProgress: "CAMPAIGN PROGRESS",

    resultSuccessBadge: "SOL CLEARED • MISSION ACCOMPLISHED",
    resultFailBadge: "CRITICAL ALERT • SURVIVAL FAILURE",
    resultVictoryBadge: "FINAL VICTORY • HUMANITY ON MARS",
    resultResourceImpact: "IMMEDIATE RESOURCE IMPACT",
    failureDiagnosisTitle: "WHY THE MISSION FAILED (TECHNICAL ANALYSIS)",
    scienceExplanationTitle: "SCIENTIFIC EXPLANATION & REAL DATA",
    btnNextDay: "PROCEED TO NEXT DAY",
    btnRestartMission: "RESTART MISSION",

    settingsTitle: "SETTINGS & ACCESSIBILITY",
    btnClose: "✕ CLOSE",
    settingLangLabel: "INTERFACE LANGUAGE",
    settingSfxLabel: "SOUND EFFECTS VOLUME",
    settingAmbientLabel: "STATION AMBIENCE",
    audioActive: "AUDIO ON",
    audioMuted: "AUDIO MUTED",
    btnFullscreen: "FULLSCREEN",
    btnResetSave: "RESET PROGRESS",
    sourcesModalTitle: "INTEGRATED NASA & CSA SCIENTIFIC RESOURCES",
    crewOk: "OK",
    crewTired: "TIRED",
    crewCritical: "CRITICAL"
  }
};

/* Équipage de 4 spécialistes fidèle à la maquette */
const CREW_MEMBERS = [
  {
    id: "lou",
    name: "LOU",
    color: "#63b3ed",
    role: { fr: "INGÉNIEUR • ÉNERGIE & STRUCTURES", en: "ENGINEER • POWER & STRUCTURES" }
  },
  {
    id: "ken",
    name: "KEN",
    color: "#f6ad55",
    role: { fr: "PILOTE • NAVIGATION & BOUCLIERS", en: "PILOT • NAVIGATION & SHIELDS" }
  },
  {
    id: "zara",
    name: "ZARA",
    color: "#f687b3",
    role: { fr: "MÉDECIN • RADIOBIOLOGIE OSDR", en: "MEDICAL OFFICER • OSDR RADIOBIOLOGY" }
  },
  {
    id: "marc",
    name: "MARC",
    color: "#68d391",
    role: { fr: "BOTANISTE • HYDROPONIE ASC-CSA", en: "BOTANIST • CSA HYDROPONICS" }
  }
];

/* Les 6 ressources scientifiques fournies par l'utilisateur */
const SCIENTIFIC_SOURCES = [
  {
    name: "NASA Open APIs (api.nasa.gov)",
    url: "https://api.nasa.gov/",
    desc: {
      fr: "Portail officiel de données spatiales de la NASA utilisé pour synchroniser la télémétrie environnementale et solaire de la station.",
      en: "Official NASA open data gateway used to synchronize environmental and solar telemetry for the outpost."
    }
  },
  {
    name: "NASA DONKI — Météo Spatiale (CCMC GSFC)",
    url: "https://ccmc.gsfc.nasa.gov/tools/DONKI/",
    desc: {
      fr: "Base de données des éruptions solaires (classes M et X), éjections de masse coronale (CME) et tempêtes de particules énergétiques utilisées dans nos alertes.",
      en: "Database of solar flares (M and X classes), coronal mass ejections (CMEs), and solar energetic particle events driving our station alerts."
    }
  },
  {
    name: "NASA RadLab — Dosimétrie & Radiations Spatiales",
    url: "https://visualization.osdr.nasa.gov/radlab/gui/data-api/",
    desc: {
      fr: "Mesures réelles de débit de dose de rayonnement (mSv/sol) permettant de calibrer l'exposition de l'équipage sur Mars.",
      en: "Real radiation dose-rate measurements (mSv/sol) calibrating crew exposure on the Martian surface."
    }
  },
  {
    name: "NASA OSDR — Open Science Data Repository (Biologie)",
    url: "https://osdr.nasa.gov/bio/repo/",
    desc: {
      fr: "Données biologiques sur la réponse cellulaire, l'immunité et le stress oxydatif des organismes en environnement spatial.",
      en: "Biological research data on cellular response, immunity, and oxidative stress in spaceflight environments."
    }
  },
  {
    name: "NASA Mars Trek — Cartographie & Topographie Martienne",
    url: "https://trek.nasa.gov/mars/",
    desc: {
      fr: "Données topographiques et géologiques du Cratère Jezero, de Valles Marineris et des calottes polaires martiennes.",
      en: "Topographic and geological datasets of Jezero Crater, Valles Marineris, and Martian polar caps."
    }
  },
  {
    name: "Agence Spatiale Canadienne (ASC-CSA) — Production Alimentaire & STEM",
    url: "https://www.asc-csa.gc.ca/eng/youth-educators/toolkits/food-production/",
    desc: {
      fr: "Protocoles réels de serre hydroponique en circuit fermé, contrôle du pH nutritif et recyclage de l'eau utilisés par Marc.",
      en: "Closed-loop hydroponic greenhouse protocols, nutrient pH control, and water recycling used by Marc."
    }
  }
];

/* ==========================================================================
   LES 10 JOURS DE MISSION — ENTIÈREMENT EN FRANÇAIS & ANGLAIS
   ========================================================================== */
const MISSIONS_DATA = [
  {
    day: 1,
    sol: "SOL 001 • 08:30",
    sourceBadge: "NASA MARS TREK • DONKI",
    radLab: "0.64 mSv/sol",
    alert: {
      fr: "ALERTE : DÉPLOIEMENT INITIAL AU CRATÈRE JEZERO",
      en: "ALERT: INITIAL DEPLOYMENT AT JEZERO CRATER"
    },
    threat: { fr: "PRESSION 610 Pa", en: "PRESSURE 610 Pa" },
    title: {
      fr: "JOUR 01 — PREMIER CONTACT & INITIALISATION",
      en: "DAY 01 — FIRST CONTACT & INITIALIZATION"
    },
    location: {
      fr: "CRATÈRE JEZERO • MODULE OBSERVATOIRE",
      en: "JEZERO CRATER • OBSERVATORY MODULE"
    },
    description: {
      fr: "Votre module vient de se poser dans le Cratère Jezero (NASA Mars Trek). La pression atmosphérique extérieure n'est que de 610 Pa (0,6 % de la Terre) avec 95,3 % de CO₂. Il faut stabiliser l'habitat avant la première nuit martienne à -65°C.",
      en: "Your lander has touched down in Jezero Crater (NASA Mars Trek). Outside pressure is only 610 Pa (0.6% of Earth) with 95.3% CO₂. You must stabilize the habitat before the first -65°C Martian night."
    },
    ariaAdvice: {
      fr: "Commandant, l'étanchéité et le réseau électrique primaire sont prioritaires pour protéger nos 4 spécialistes.",
      en: "Commander, habitat sealing and primary power distribution are top priority to protect our 4 specialists."
    },
    decisions: [
      {
        lead: "LOU • INGÉNIEUR",
        title: {
          fr: "Option A : Calibration complète des panneaux solaires et pressurisation",
          en: "Option A: Full solar array calibration & habitat pressurization"
        },
        desc: {
          fr: "Déployer les ailes photovoltaïques orientées plein sud et équilibrer la pression interne à 101,3 kPa.",
          en: "Deploy south-facing solar wings and balance internal pressure to 101.3 kPa."
        },
        impacts: { energie: +12, oxygene: +4, eau: -3, radiation: -2 },
        scienceRef: "NASA Mars Trek & MOXIE",
        scienceText: {
          fr: "Sur Mars, l'atmosphère est 160 fois moins dense que sur Terre et composée à 95,3 % de dioxyde de carbone. Un habitat pressurisé étanche et une orientation solaire optimale (irradiance moyenne de 590 W/m²) sont indispensables dès la première heure.",
          en: "Mars's atmosphere is 160 times thinner than Earth's and 95.3% carbon dioxide. A sealed pressurized habitat and optimal solar alignment (590 W/m² mean irradiance) are essential from hour one."
        },
        ariaFeedback: {
          fr: "Excellent démarrage, Commandant. Le réseau électrique et la pressurisation sont parfaitement stables.",
          en: "Excellent start, Commander. Power grid and habitat pressurization are rock solid."
        }
      },
      {
        lead: "KEN • PILOTE",
        title: {
          fr: "Option B : Reconnaissance immédiate en rover vers un dépôt de glace",
          en: "Option B: Immediate rover scouting toward subsurface ice deposit"
        },
        desc: {
          fr: "Envoyer Ken et Lou cartographier la glace souterraine repérée par Mars Trek avant de finaliser l'isolation.",
          en: "Send Ken and Lou to map subsurface ice spotted by Mars Trek before finishing insulation."
        },
        impacts: { eau: +10, energie: -14, radiation: +6, sante: -4 },
        scienceRef: "NASA Mars Trek & RadLab",
        scienceText: {
          fr: "Mars Trek révèle d'anciens dépôts lacustres riches en minéraux hydratés dans Jezero, mais sortir sans avoir calibré les boucliers expose l'équipage aux rayons cosmiques galactiques (0,64 mSv/sol mesurés par RadLab).",
          en: "Mars Trek reveals ancient lakebed hydrated minerals in Jezero, but going outside before shield calibration exposes crew to galactic cosmic rays (0.64 mSv/sol measured by RadLab)."
        },
        ariaFeedback: {
          fr: "Nous avons localisé de l'eau, mais la sortie prématurée a coûté beaucoup d'énergie et exposé l'équipage.",
          en: "We located water, but the premature EVA drained energy and exposed the crew."
        }
      }
    ]
  },

  {
    day: 2,
    sol: "SOL 002 • 10:15",
    sourceBadge: "NASA MOXIE • SUPPORT VIE",
    radLab: "0.66 mSv/sol",
    alert: {
      fr: "ALERTE : BAISSE DE PRESSION D'OXYGÈNE MODULE B",
      en: "ALERT: OXYGEN PRESSURE DROP IN MODULE B"
    },
    threat: { fr: "FUITE VALVE O₂", en: "O₂ VALVE LEAK" },
    title: {
      fr: "JOUR 02 — PRODUCTION D'OXYGÈNE RESPIRABLE",
      en: "DAY 02 — BREATHABLE OXYGEN PRODUCTION"
    },
    location: {
      fr: "MODULE SUPPORT VIE & ÉLECTROLYSE",
      en: "LIFE SUPPORT & ELECTROLYSIS MODULE"
    },
    description: {
      fr: "La consommation de l'équipage fait baisser les réserves d'oxygène et un joint du générateur présente une micro-fuite. Il faut produire de l'O₂ sans épuiser nos réserves d'eau ou d'énergie.",
      en: "Crew respiration is lowering oxygen reserves and a generator seal has a micro-leak. You must produce O₂ without draining water or energy reserves."
    },
    ariaAdvice: {
      fr: "Chaque astronaute consomme environ 0,84 kg d'O₂ par jour. Réparer la fuite avant d'augmenter le débit évitera tout gaspillage.",
      en: "Each astronaut consumes about 0.84 kg of O₂ per day. Fixing the leak before boosting output prevents waste."
    },
    decisions: [
      {
        lead: "LOU & ZARA",
        title: {
          fr: "Option A : Colmater le joint et lancer l'électrolyse en cycle régulé",
          en: "Option A: Seal the valve and run regulated water electrolysis"
        },
        desc: {
          fr: "Isoler le circuit, remplacer le joint polymère et produire l'O₂ par électrolyse de l'eau recyclée.",
          en: "Isolate the loop, replace the polymer seal, and generate O₂ via recycled water electrolysis."
        },
        impacts: { oxygene: +14, eau: -5, energie: -8, sante: +2 },
        scienceRef: "NASA Life Support & MOXIE",
        scienceText: {
          fr: "À bord d'une station spatiale, l'électrolyse décompose l'eau (2H₂O → 2H₂ + O₂) pour fournir l'oxygène respirable, complétée sur Mars par la technologie MOXIE qui extrait l'O₂ directement du CO₂ atmosphérique.",
          en: "On space stations, electrolysis splits water (2H₂O → 2H₂ + O₂) to produce breathable oxygen, complemented on Mars by MOXIE technology extracting O₂ from atmospheric CO₂."
        },
        ariaFeedback: {
          fr: "Pression partielle d'oxygène rétablie à 21 kPa. L'équipage respire dans des conditions optimales.",
          en: "Oxygen partial pressure restored to 21 kPa. The crew is breathing in optimal conditions."
        }
      },
      {
        lead: "KEN • PILOTE",
        title: {
          fr: "Option B : Pousser les générateurs à 130 % sans réparer la fuite",
          en: "Option B: Overdrive generators to 130% without fixing the leak"
        },
        desc: {
          fr: "Compenser la perte par une surproduction brute immédiate.",
          en: "Compensate for the loss with immediate brute-force overproduction."
        },
        impacts: { oxygene: +5, energie: -20, eau: -12, integrite: -8 },
        scienceRef: "Thermodynamique des systèmes",
        scienceText: {
          fr: "Sur-solliciter un système de support vie non étanche entraîne une surconsommation électrique et accélère l'usure mécanique des compresseurs.",
          en: "Overdriving a leaking life-support loop causes massive electrical drain and accelerates compressor wear."
        },
        ariaFeedback: {
          fr: "Attention Commandant, les batteries ont fortement chuté à cause de la surcharge.",
          en: "Warning Commander, battery reserves dropped sharply due to the overload."
        }
      }
    ]
  },

  {
    day: 3,
    sol: "SOL 003 • 09:40",
    sourceBadge: "ASC-CSA • RECYCLAGE CIRCUIT FERMÉ",
    radLab: "0.65 mSv/sol",
    alert: {
      fr: "ALERTE : TURBIDITÉ ÉLEVÉE DANS LE CIRCUIT D'EAU",
      en: "ALERT: HIGH TURBIDITY IN WATER RECOVERY LOOP"
    },
    threat: { fr: "FILTRE EAU SATURÉ", en: "WATER FILTER CLOGGED" },
    title: {
      fr: "JOUR 03 — CHAQUE GOUTTE COMPTE",
      en: "DAY 03 — EVERY DROP COUNTS"
    },
    location: {
      fr: "UNITÉ DE PURIFICATION & RECYCLAGE",
      en: "PURIFICATION & RECYCLING UNIT"
    },
    description: {
      fr: "La poussière martienne fine (régolithe riche en perchlorates) a encrassé le pré-filtre de récupération des eaux grises. Sans recyclage actif, nos réserves d'eau chuteront sous le seuil critique en 48 heures.",
      en: "Fine Martian dust (perchlorate-rich regolith) has clogged the greywater recovery pre-filter. Without active recycling, water reserves will drop below critical levels within 48 hours."
    },
    ariaAdvice: {
      fr: "Selon les protocoles de l'Agence spatiale canadienne (ASC-CSA), une station doit recycler plus de 95 % de son eau en boucle fermée.",
      en: "According to Canadian Space Agency (CSA) protocols, an outpost must recycle over 95% of its water in a closed loop."
    },
    decisions: [
      {
        lead: "MARC & LOU",
        title: {
          fr: "Option A : Nettoyage des membranes et distillation sous vide",
          en: "Option A: Clean filtration membranes & run vacuum distillation"
        },
        desc: {
          fr: "Purger les perchlorates, remplacer la cartouche de filtration et relancer le cycle fermé à 98 %.",
          en: "Purge perchlorates, replace the filter cartridge, and restart the 98% closed loop."
        },
        impacts: { eau: +15, energie: -9, nourriture: +4 },
        scienceRef: "ASC-CSA & NASA ECLSS",
        scienceText: {
          fr: "Le régolithe martien contient 0,5 à 1 % de perchlorates toxiques pour la thyroïde humaine. Les systèmes ECLSS utilisent la distillation sous vide et des résines échangeuses d'ions pour récupérer jusqu'à 98 % de l'eau (sueur, condensation, eaux grises).",
          en: "Martian regolith contains 0.5–1% perchlorates toxic to the human thyroid. ECLSS systems use vacuum distillation and ion-exchange resins to recover up to 98% of water."
        },
        ariaFeedback: {
          fr: "Recyclage rétabli à 98,2 %. Nos réserves hydriques sont sécurisées.",
          en: "Recycling restored to 98.2%. Our water reserves are secure."
        }
      },
      {
        lead: "ZARA • MÉDECIN",
        title: {
          fr: "Option B : Rationnement strict de l'équipage sans maintenance",
          en: "Option B: Strict crew water rationing without maintenance"
        },
        desc: {
          fr: "Réduire l'hydratation quotidienne de l'équipage de 40 % pour économiser les réservoirs.",
          en: "Cut daily crew hydration by 40% to conserve tank levels."
        },
        impacts: { eau: -4, sante: -14, nourriture: -6 },
        scienceRef: "NASA OSDR Bio — Hydratation",
        scienceText: {
          fr: "Les études biomédicales NASA OSDR montrent que la déshydratation en gravité réduite augmente immédiatement le risque rénal, la fatigue cognitive et la vulnérabilité au stress spatial.",
          en: "NASA OSDR biomedical studies show dehydration in reduced gravity rapidly increases renal risk, cognitive fatigue, and vulnerability to space stress."
        },
        ariaFeedback: {
          fr: "Le rationnement affecte la santé et l'endurance de l'équipage. Il faudra surveiller leur récupération.",
          en: "Rationing is impacting crew health and stamina. We must monitor their recovery."
        }
      }
    ]
  },

  {
    day: 4,
    sol: "SOL 004 • 11:00",
    sourceBadge: "ASC-CSA FOOD PRODUCTION • OSDR BIO",
    radLab: "0.63 mSv/sol",
    alert: {
      fr: "ALERTE : DÉSÉQUILIBRE DE pH DANS LA SERRE HYDROPONIQUE",
      en: "ALERT: pH IMBALANCE IN HYDROPONIC GREENHOUSE"
    },
    threat: { fr: "DÉRIVE pH 7.4", en: "pH DRIFT 7.4" },
    title: {
      fr: "JOUR 04 — PRODUIRE DE LA NOURRITURE SUR MARS",
      en: "DAY 04 — GROWING FOOD ON MARS"
    },
    location: {
      fr: "BIODÔME HYDROPONIQUE • SECTEUR MARC",
      en: "HYDROPONIC BIODOME • MARC'S SECTOR"
    },
    description: {
      fr: "Le pH de la solution nutritive hydroponique est monté à 7,4, bloquant l'absorption du fer et du phosphore par les cultures (laitues, pommes de terre naines, spiruline). Nos rations diminuent chaque jour.",
      en: "The hydroponic nutrient solution pH drifted to 7.4, blocking iron and phosphorus uptake by crops (lettuce, dwarf potatoes, spirulina). Rations drop every day."
    },
    ariaAdvice: {
      fr: "La boîte à outils Food Production de l'ASC-CSA recommande un pH entre 5,8 et 6,2 et un éclairage LED rouge/bleu optimisé.",
      en: "The CSA Food Production toolkit recommends a pH between 5.8 and 6.2 with optimized red/blue LED lighting."
    },
    decisions: [
      {
        lead: "MARC • BOTANISTE",
        title: {
          fr: "Option A : Stabiliser le pH à 6,0 et activer les LED horticoles ciblées",
          en: "Option A: Stabilize pH to 6.0 & activate targeted horticultural LEDs"
        },
        desc: {
          fr: "Injecter une solution tampon acide, équilibrer les nitrates et cibler les longueurs d'onde 450 nm et 660 nm.",
          en: "Inject acid buffer solution, balance nitrates, and target 450 nm and 660 nm wavelengths."
        },
        impacts: { nourriture: +18, eau: -5, energie: -8, oxygene: +4 },
        scienceRef: "ASC-CSA Food Production Toolkit",
        scienceText: {
          fr: "En hydroponie spatiale (ASC-CSA), maintenir le pH autour de 5,8–6,2 maximise la biodisponibilité des nutriments. De plus, la photosynthèse des plantes absorbe le CO₂ expiré par l'équipage et rejette de l'oxygène frais !",
          en: "In space hydroponics (CSA), keeping pH around 5.8–6.2 maximizes nutrient bioavailability. Plus, plant photosynthesis absorbs crew CO₂ and releases fresh oxygen!"
        },
        ariaFeedback: {
          fr: "Croissance végétale relancée ! La serre produit désormais des rations fraîches et un bonus d'oxygène.",
          en: "Plant growth restored! The greenhouse now yields fresh rations and bonus oxygen."
        }
      },
      {
        lead: "LOU • INGÉNIEUR",
        title: {
          fr: "Option B : Mettre la serre en veille pour économiser l'électricité",
          en: "Option B: Put greenhouse on standby to save electricity"
        },
        desc: {
          fr: "Couper les rampes LED et puiser uniquement dans les rations lyophilisées.",
          en: "Turn off LED arrays and rely solely on freeze-dried rations."
        },
        impacts: { nourriture: -14, energie: +8, sante: -5 },
        scienceRef: "NASA OSDR — Nutrition spatiale",
        scienceText: {
          fr: "Sans production biorégénérative, les stocks alimentaires s'épuisent vite et la perte de vitamines fraîches réduit les défenses antioxydantes de l'équipage face aux radiations (OSDR Bio).",
          en: "Without bioregenerative food production, rations deplete rapidly and loss of fresh vitamins lowers crew antioxidant defenses against radiation (OSDR Bio)."
        },
        ariaFeedback: {
          fr: "Énergie préservée, mais nos réserves alimentaires sont désormais sous surveillance.",
          en: "Energy conserved, but our food reserves are now under close watch."
        }
      }
    ]
  },

  {
    day: 5,
    sol: "SOL 005 • 14:20",
    sourceBadge: "NASA DONKI • GÉNIE ÉLECTRIQUE",
    radLab: "0.71 mSv/sol",
    alert: {
      fr: "ALERTE : ACCUMULATION DE POUSSIÈRE SUR LES PANNEAUX SOLAIRES",
      en: "ALERT: DUST ACCUMULATION ON SOLAR ARRAYS"
    },
    threat: { fr: "RENDEMENT -32%", en: "EFFICIENCY -32%" },
    title: {
      fr: "JOUR 05 — CRISE ÉNERGÉTIQUE",
      en: "DAY 05 — POWER CRISIS"
    },
    location: {
      fr: "CHAMP PHOTOVOLTAÏQUE & BATTERIES LI-S",
      en: "PHOTOVOLTAIC FIELD & LI-S BATTERIES"
    },
    description: {
      fr: "Les vents martiens chargés électrostatiquement ont déposé une pellicule de poussière rouge sur les panneaux solaires, réduisant la production de 32 %. Les batteries principales se déchargent.",
      en: "Electrostatically charged Martian winds deposited a film of red dust on the solar panels, cutting output by 32%. Main batteries are draining."
    },
    ariaAdvice: {
      fr: "Sur Mars, les panneaux photovoltaïques perdent jusqu'à 0,3 % d'efficacité par sol à cause de la poussière fine.",
      en: "On Mars, photovoltaic arrays lose up to 0.3% efficiency per sol due to fine dust deposition."
    },
    decisions: [
      {
        lead: "LOU • INGÉNIEUR",
        title: {
          fr: "Option A : Activer le nettoyage électrostatique et délester les zones vides",
          en: "Option A: Activate electrostatic dust clearing & shed non-essential loads"
        },
        desc: {
          fr: "Envoyer une impulsion haute tension sur le revêtement conducteur des panneaux et couper le chauffage des sas inoccupés.",
          en: "Pulse high voltage across the conductive panel coating and cut heating in unoccupied airlocks."
        },
        impacts: { energie: +20, integrite: +2, eau: -2 },
        scienceRef: "NASA Electrodynamic Dust Shield",
        scienceText: {
          fr: "La NASA a développé le bouclier électrodynamique (EDS) qui utilise des ondes électriques progressives pour repousser la poussière martienne sans eau ni brosses mécaniques.",
          en: "NASA developed the Electrodynamic Dust Shield (EDS) using traveling electric waves to lift Martian dust off solar arrays without water or mechanical brushes."
        },
        ariaFeedback: {
          fr: "Rendement solaire restauré à 96 % ! Les batteries se rechargent rapidement.",
          en: "Solar efficiency restored to 96%! Batteries are recharging rapidly."
        }
      },
      {
        lead: "KEN • PILOTE",
        title: {
          fr: "Option B : Sortie extravéhiculaire manuelle en pleine journée",
          en: "Option B: Manual EVA brushing during peak daylight"
        },
        desc: {
          fr: "Faire nettoyer chaque panneau manuellement par deux astronautes en scaphandre.",
          en: "Have two suited astronauts manually brush every solar panel."
        },
        impacts: { energie: +12, radiation: +9, sante: -8, oxygene: -5 },
        scienceRef: "NASA RadLab & EVA",
        scienceText: {
          fr: "Les sorties extravéhiculaires sur Mars exposent directement les astronautes aux radiations de surface et consomment l'oxygène portable des scaphandres.",
          en: "EVAs on Mars directly expose astronauts to surface radiation and consume portable spacesuit oxygen."
        },
        ariaFeedback: {
          fr: "Panneaux nettoyés, mais la sortie a fatigué l'équipage et augmenté la dose de radiation reçue.",
          en: "Panels cleaned, but the EVA fatigued the crew and increased radiation dose."
        }
      }
    ]
  },

  {
    day: 6,
    sol: "SOL 006 • 06:12",
    sourceBadge: "NASA DONKI • RADLAB • OSDR BIO",
    radLab: "14.8 mSv/sol (PIC)",
    alert: {
      fr: "ALERTE : ÉRUPTION SOLAIRE CLASSE X1.8 DÉTECTÉE PAR DONKI",
      en: "ALERT: X1.8 SOLAR FLARE DETECTED BY DONKI"
    },
    threat: { fr: "ÉRUPTION CLASSE X", en: "X-CLASS FLARE" },
    title: {
      fr: "JOUR 06 — LA MENACE DES RADIATIONS SOLAIRES",
      en: "DAY 06 — THE SOLAR RADIATION THREAT"
    },
    location: {
      fr: "ABRI ANTI-RADIATIONS & MODULE CENTRAL",
      en: "RADIATION SHELTER & CORE MODULE"
    },
    description: {
      fr: "Le système NASA DONKI signale une éruption solaire majeure de classe X1.8 accompagnée d'un flux de protons énergétiques (SEP). Mars n'ayant ni champ magnétique global ni atmosphère épaisse, les capteurs RadLab grimpent en flèche.",
      en: "NASA DONKI reports a major X1.8 solar flare with a Solar Energetic Particle (SEP) storm. Because Mars lacks a global magnetic field and thick atmosphere, RadLab sensors are spiking."
    },
    ariaAdvice: {
      fr: "Zara confirme via NASA OSDR Bio que l'eau et les polymères riches en hydrogène bloquent efficacement les protons solaires.",
      en: "Zara confirms via NASA OSDR Bio that water walls and hydrogen-rich polymers effectively block solar protons."
    },
    decisions: [
      {
        lead: "ZARA & KEN",
        title: {
          fr: "Option A : Confiner l'équipage derrière les réservoirs d'eau et activer le bouclier",
          en: "Option A: Shelter crew behind water tanks & boost magnetic shielding"
        },
        desc: {
          fr: "Utiliser les parois d'eau comme blindage hydrogéné passif et alimenter le bouclier actif.",
          en: "Use water walls as passive hydrogen shielding and power the active deflector."
        },
        impacts: { radiation: -14, energie: -14, sante: +2 },
        scienceRef: "NASA DONKI, RadLab & OSDR Bio",
        scienceText: {
          fr: "Contrairement à la Terre protégée par sa magnétosphère, Mars reçoit de plein fouet les tempêtes de protons solaires. L'hydrogène contenu dans l'eau (H₂O) et le polyéthylène freine les particules ionisantes sans créer de rayonnement secondaire dangereux.",
          en: "Unlike Earth protected by its magnetosphere, Mars takes the full brunt of solar proton storms. Hydrogen in water (H₂O) and polyethylene slows ionizing particles without creating hazardous secondary radiation."
        },
        ariaFeedback: {
          fr: "Bouclier hydrogéné efficace ! La dose reçue par l'équipage est restée sous la limite de sécurité.",
          en: "Hydrogen shielding effective! Crew dose stayed well below safety limits."
        }
      },
      {
        lead: "MARC • BOTANISTE",
        title: {
          fr: "Option B : Maintenir les opérations normales dans l'observatoire vitré",
          en: "Option B: Maintain normal operations inside the glass observatory"
        },
        desc: {
          fr: "Économiser l'énergie en laissant l'équipage travailler dans les dômes supérieurs.",
          en: "Save power by letting the crew continue working in the upper domes."
        },
        impacts: { radiation: +26, sante: -18, energie: +5 },
        scienceRef: "NASA OSDR Bio — Radiobiologie",
        scienceText: {
          fr: "Les données OSDR Bio démontrent que les particules énergétiques solaires (SEP) causent des cassures double-brin de l'ADN et un syndrome d'irradiation aiguë si l'équipage n'est pas abrité.",
          en: "OSDR Bio data demonstrates that Solar Energetic Particles (SEPs) cause double-strand DNA breaks and acute radiation sickness if crew members remain unshielded."
        },
        ariaFeedback: {
          fr: "Alerte médicale ! L'exposition aux radiations a fortement affaibli l'équipage.",
          en: "Medical alert! Radiation exposure has severely weakened the crew."
        }
      }
    ]
  },

  {
    day: 7,
    sol: "SOL 007 • 15:45",
    sourceBadge: "NASA MARS TREK • MÉTÉO MARTIENNE",
    radLab: "0.58 mSv/sol",
    alert: {
      fr: "ALERTE : TEMPÊTE DE POUSSIÈRE RÉGIONALE EN APPROCHE",
      en: "ALERT: REGIONAL DUST STORM APPROACHING"
    },
    threat: { fr: "VENTS 95 KM/H", en: "WINDS 95 KM/H" },
    title: {
      fr: "JOUR 07 — LA GRANDE TEMPÊTE DE POUSSIÈRE",
      en: "DAY 07 — THE GREAT DUST STORM"
    },
    location: {
      fr: "ENSEMBLE DE L'AVANT-POSTE JEZERO",
      en: "ENTIRE JEZERO OUTPOST"
    },
    description: {
      fr: "Un front de poussière opaque de 400 km recouvre le Cratère Jezero. L'obscurité réduit la production solaire de 75 % pendant 24 heures et les rafales menacent les antennes et les sas.",
      en: "An opaque 400 km dust front is engulfing Jezero Crater. Darkness cuts solar output by 75% for 24 hours while gusts threaten antennas and airlocks."
    },
    ariaAdvice: {
      fr: "Il faut verrouiller l'enveloppe extérieure et basculer sur nos batteries de secours intelligentes.",
      en: "We must lock down the outer hull and switch to smart backup battery reserves."
    },
    decisions: [
      {
        lead: "KEN & LOU",
        title: {
          fr: "Option A : Verrouiller les volets blindés et activer le mode survie batteries",
          en: "Option A: Lock armored shutters & activate smart battery survival mode"
        },
        desc: {
          fr: "Mettre les panneaux en drapeau, verrouiller les sas et alimenter uniquement le support vie et le chauffage.",
          en: "Feather solar wings, lock airlocks, and power only life support and thermal control."
        },
        impacts: { energie: -10, integrite: +5, oxygene: -3, eau: -3 },
        scienceRef: "Météorologie martienne (Mars Trek)",
        scienceText: {
          fr: "Bien que l'atmosphère martienne soit ténue, les tempêtes de poussière soulèvent des particules fines en altitude pendant des semaines, bloquant la lumière solaire (comme lors de la fin de la mission NASA Opportunity en 2018).",
          en: "Although Mars's atmosphere is thin, dust storms lift fine particles high aloft for weeks, blocking sunlight (as seen during NASA's Opportunity rover mission in 2018)."
        },
        ariaFeedback: {
          fr: "La station a résisté sans dégât structurel. La tempête commence à se dissiper.",
          en: "The station weathered the storm with zero structural damage. Skies are clearing."
        }
      },
      {
        lead: "LOU • INGÉNIEUR",
        title: {
          fr: "Option B : Garder tous les laboratoires et la serre à pleine puissance",
          en: "Option B: Keep all labs and greenhouse at full power"
        },
        desc: {
          fr: "Ignorer la baisse d'ensoleillement et tirer au maximum sur les accumulateurs.",
          en: "Ignore the drop in sunlight and draw maximum current from batteries."
        },
        impacts: { energie: -26, integrite: -12, nourriture: +4 },
        scienceRef: "Gestion des réserves énergétiques",
        scienceText: {
          fr: "Décharger profondément des batteries spatiales dans un environnement à -70°C provoque une chute brutale de tension pouvant couper le chauffage et le recyclage d'air.",
          en: "Deep-discharging space batteries in a -70°C environment causes a severe voltage drop that can shut down heating and air revitalization."
        },
        ariaFeedback: {
          fr: "Alerte critique sur les batteries ! Nos réserves électriques sont au plus bas.",
          en: "Critical battery warning! Our electrical reserves are dangerously low."
        }
      }
    ]
  },

  {
    day: 8,
    sol: "SOL 008 • 07:50",
    sourceBadge: "INGÉNIERIE SYSTÈMES • REDONDANCE",
    radLab: "0.65 mSv/sol",
    alert: {
      fr: "ALERTE : DÉFAILLANCE EN CASCADE SUR L'ÉCHANGEUR THERMIQUE",
      en: "ALERT: CASCADING FAILURE IN THERMAL EXCHANGER"
    },
    threat: { fr: "SURCHAUFFE BOUCLE", en: "LOOP OVERHEAT" },
    title: {
      fr: "JOUR 08 — DÉFAILLANCE SYSTÈME & REDONDANCE",
      en: "DAY 08 — SYSTEM FAILURE & REDUNDANCY"
    },
    location: {
      fr: "SALLE DES MACHINES & RÉGULATION THERMIQUE",
      en: "UTILITY BAY & THERMAL CONTROL"
    },
    description: {
      fr: "Après la tempête, de la poussière abrasive a bloqué la pompe de l'échangeur thermique qui régule à la fois la température de l'habitat et le condenseur d'humidité. Vous devez prioriser la réparation.",
      en: "After the storm, abrasive dust jammed the thermal exchanger pump regulating both habitat temperature and the humidity condenser. You must prioritize repairs."
    },
    ariaAdvice: {
      fr: "En ingénierie spatiale, la redondance permet d'isoler un circuit défaillant sans arrêter la mission.",
      en: "In space engineering, redundancy lets us isolate a failed loop without halting the mission."
    },
    decisions: [
      {
        lead: "LOU & MARC",
        title: {
          fr: "Option A : Basculer sur la pompe redondante B et purger le circuit A",
          en: "Option A: Switch to redundant Pump B & purge Loop A"
        },
        desc: {
          fr: "Mobiliser Lou et Marc pour transférer le fluide caloporteur et nettoyer la turbine.",
          en: "Assign Lou and Marc to transfer coolant and clean the turbine."
        },
        impacts: { integrite: +10, energie: -8, eau: +6, oxygene: +3 },
        scienceRef: "Ingénierie spatiale — Redondance",
        scienceText: {
          fr: "Tout système critique habité applique la règle de tolérance aux pannes (redondance double ou triple). Le condenseur thermique récupère aussi l'humidité expirée par l'équipage pour la retransformer en eau potable.",
          en: "Every crewed critical system applies fault-tolerance rules (dual or triple redundancy). The thermal condenser also captures crew-exhaled humidity to turn it back into potable water."
        },
        ariaFeedback: {
          fr: "Circuit thermique stabilisé à 21°C et récupération de condensation rétablie.",
          en: "Thermal loop stabilized at 21°C and condensate recovery restored."
        }
      },
      {
        lead: "KEN • PILOTE",
        title: {
          fr: "Option B : Arrêter le condenseur et ventiler avec l'air froid des sas",
          en: "Option B: Shut down condenser & vent using cold airlock air"
        },
        desc: {
          fr: "Solution rapide sans réparation mécanique immédiate.",
          en: "Quick workaround without immediate mechanical repair."
        },
        impacts: { eau: -12, oxygene: -8, integrite: -6, sante: -5 },
        scienceRef: "Cycle de l'eau en circuit fermé",
        scienceText: {
          fr: "Couper le condenseur empêche de récupérer les 2,5 litres d'eau émis chaque jour par la respiration et la transpiration de chaque astronaute.",
          en: "Shutting down the condenser forfeits the 2.5 liters of water released daily through each astronaut's respiration and perspiration."
        },
        ariaFeedback: {
          fr: "Nous avons perdu une quantité importante d'eau et de pression atmosphérique.",
          en: "We lost a significant amount of water and cabin pressure."
        }
      }
    ]
  },

  {
    day: 9,
    sol: "SOL 009 • 13:00",
    sourceBadge: "ASC-CSA • NASA OSDR • DONKI",
    radLab: "0.69 mSv/sol",
    alert: {
      fr: "ALERTE : TEST D'AUTONOMIE COMPLÈTE AVANT VALIDATION",
      en: "ALERT: FULL AUTONOMY STRESS TEST BEFORE VALIDATION"
    },
    threat: { fr: "TEST AUTONOMIE", en: "AUTONOMY TEST" },
    title: {
      fr: "JOUR 09 — L'ÉPREUVE D'INTERDÉPENDANCE",
      en: "DAY 09 — THE INTERDEPENDENCE TEST"
    },
    location: {
      fr: "TOUS LES MODULES • COORDINATION GLOBALE",
      en: "ALL MODULES • GLOBAL COORDINATION"
    },
    description: {
      fr: "À 24 heures de la fin de la mission, le contrôle terrestre demande un test d'équilibre complet : produire simultanément de l'oxygène, de l'eau recyclée et une récolte hydroponique tout en maintenant le bouclier anti-radiations.",
      en: "With 24 hours left in the mission, Earth control requests a full equilibrium test: simultaneously produce oxygen, recycled water, and a hydroponic harvest while maintaining radiation shielding."
    },
    ariaAdvice: {
      fr: "Commandant, observez vos jauges actuelles à gauche et choisissez l'option qui renforce votre ressource la plus faible.",
      en: "Commander, check your current gauges on the left and pick the option that reinforces your weakest resource."
    },
    decisions: [
      {
        lead: "ÉQUIPE COMPLÈTE",
        title: {
          fr: "Option A : Synergie biorégénérative (Serre + Sabatier + Énergie solaire)",
          en: "Option A: Bioregenerative synergy (Greenhouse + Sabatier + Solar)"
        },
        desc: {
          fr: "Coupler le CO₂ de l'équipage à la serre de Marc et transformer l'hydrogène d'électrolyse en eau via le réacteur Sabatier.",
          en: "Route crew CO₂ to Marc's greenhouse and convert electrolysis hydrogen into water via the Sabatier reactor."
        },
        impacts: { oxygene: +10, eau: +10, nourriture: +12, energie: -10, radiation: -4 },
        scienceRef: "Réacteur Sabatier & Mélissa (ESA/ASC)",
        scienceText: {
          fr: "La réaction de Sabatier (CO₂ + 4H₂ → CH₄ + 2H₂O) permet de récupérer l'hydrogène issu de l'électrolyse et le CO₂ respiratoire pour produire de l'eau, fermant ainsi les cycles de l'air, de l'eau et de la nourriture.",
          en: "The Sabatier reaction (CO₂ + 4H₂ → CH₄ + 2H₂O) combines electrolysis hydrogen with exhaled CO₂ to produce water, closing the air, water, and food loops."
        },
        ariaFeedback: {
          fr: "Synergie parfaite ! Tous les sous-systèmes coopèrent en cycle fermé.",
          en: "Perfect synergy! All subsystems are cooperating in a closed loop."
        }
      },
      {
        lead: "LOU • INGÉNIEUR",
        title: {
          fr: "Option B : Mode économie maximale (Mise en veille des productions)",
          en: "Option B: Maximum conservation mode (Standby all production)"
        },
        desc: {
          fr: "Recharger les batteries à 100 % en limitant la production d'eau et de nourriture pour le dernier jour.",
          en: "Recharge batteries to 100% by throttling water and food production for the final day."
        },
        impacts: { energie: +18, eau: -7, nourriture: -7, oxygene: -5 },
        scienceRef: "Gestion des réserves de fin de mission",
        scienceText: {
          fr: "Conserver de l'énergie est utile si les batteries sont basses, mais couper la production biologique consomme les stocks accumulés.",
          en: "Saving power helps if batteries are low, but halting biological production draws down accumulated stocks."
        },
        ariaFeedback: {
          fr: "Batteries rechargées au maximum pour l'ultime journée sur Mars.",
          en: "Batteries charged to maximum for the final day on Mars."
        }
      }
    ]
  },

  {
    day: 10,
    sol: "SOL 010 • 18:00",
    sourceBadge: "NASA • ASC-CSA • RAPPORT FINAL",
    radLab: "0.62 mSv/sol",
    alert: {
      fr: "ALERTE : CERTIFICATION FINALE DE L'AVANT-POSTE MARTIEN",
      en: "ALERT: FINAL CERTIFICATION OF MARTIAN OUTPOST"
    },
    threat: { fr: "CERTIFICATION SOL 10", en: "SOL 10 CERTIFICATION" },
    title: {
      fr: "JOUR 10 — L'AVENIR DE L'HUMANITÉ SUR MARS",
      en: "DAY 10 — HUMANITY'S FUTURE ON MARS"
    },
    location: {
      fr: "CENTRE DE COMMANDEMENT INFINITY SPACE",
      en: "INFINITY SPACE COMMAND CENTER"
    },
    description: {
      fr: "Dixième et dernier sol de la mission expérimentale. Tous les capteurs transmettent leur bilan final vers la Terre. Effectuez le protocole final de stabilisation pour valider la pérennité de la colonie.",
      en: "Tenth and final sol of the experimental mission. All sensors are beaming final telemetry back to Earth. Execute the final stabilization protocol to certify colony sustainability."
    },
    ariaAdvice: {
      fr: "Un dernier effort, Commandant. L'humanité est sur le point de franchir une étape historique sur la planète rouge.",
      en: "One final step, Commander. Humanity is about to achieve a historic milestone on the Red Planet."
    },
    decisions: [
      {
        lead: "COMMANDANT & ÉQUIPAGE",
        title: {
          fr: "Option A : Équilibrer toutes les jauges et transmettre le rapport scientifique complet",
          en: "Option A: Balance all life-support loops & transmit full scientific report"
        },
        desc: {
          fr: "Optimiser la répartition énergétique finale, sécuriser le bouclier et valider l'autonomie de la station.",
          en: "Optimize final power distribution, secure shielding, and certify outpost autonomy."
        },
        impacts: { oxygene: +6, eau: +6, energie: +6, nourriture: +6, radiation: -5, sante: +5 },
        scienceRef: "Programme Artemis & Mars Exploration",
        scienceText: {
          fr: "Grâce à la maîtrise combinée de l'énergie solaire, du recyclage de l'eau, de la production d'oxygène, de l'agriculture hydroponique et de la protection contre les radiations, une présence humaine durable sur Mars devient scientifiquement réalisable.",
          en: "Through combined mastery of solar power, water recycling, oxygen generation, hydroponic farming, and radiation shielding, a sustainable human presence on Mars becomes scientifically achievable."
        },
        ariaFeedback: {
          fr: "Transmission confirmée par la Terre ! Mission accomplie avec brio, Commandant.",
          en: "Transmission confirmed by Earth! Mission accomplished brilliantly, Commander."
        }
      },
      {
        lead: "KEN • PILOTE",
        title: {
          fr: "Option B : Lancer une collecte d'échantillons bonus avant la clôture",
          en: "Option B: Run bonus core-sample collection before mission close"
        },
        desc: {
          fr: "Effectuer un dernier prélèvement géologique sur le bord du cratère Jezero.",
          en: "Perform one last geological core sample on the rim of Jezero Crater."
        },
        impacts: { energie: -8, oxygene: -5, radiation: +4, nourriture: +4 },
        scienceRef: "NASA Mars 2020 / Jezero Core Samples",
        scienceText: {
          fr: "Le Cratère Jezero abrite un ancien delta fluvial où les roches sédimentaires peuvent conserver des biosignatures anciennes.",
          en: "Jezero Crater hosts an ancient river delta where sedimentary rocks may preserve ancient biosignatures."
        },
        ariaFeedback: {
          fr: "Échantillons sécurisés dans le sas scientifique et mission clôturée !",
          en: "Samples secured in the science airlock and mission completed!"
        }
      }
    ]
  }
];
