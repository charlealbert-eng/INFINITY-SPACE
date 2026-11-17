/* ==========================================================================
   INFINITY EDU GABON — NIVEAUX PAR CHAPITRE, SCANNER DE COURS & MOBILE MONEY
   Fonctionnalités :
   1. Programme Éducatif Gabonais découpé en Niveaux de Simulation (Level 1 à 10)
      correspondant aux chapitres étudiés en classe (accompagnement du manuel papier).
   2. Scanner de page de cahier / manuel (caméra ou photo) avec reconnaissance
      automatique de texte (OCR) + génération instantanée d'un niveau de quiz
      jouable immédiatement !
   3. Certification obligatoire des droits d'auteur (respect de la propriété intellectuelle).
   4. Simulation de déblocage des niveaux avancés via Airtel Money, Moov Money
      ou Code Prépayé (vendu en espèces / librairie / établissement).
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);

  const UNIVERSE_KEY = "infinity_edu_universe"; // "gabon" | "mars"
  const WORKS_KEY = "infinity_gabon_works_v2";
  const PASS_KEY = "infinity_gabon_pass_unlocked";

  // Œuvres et chapitres pré-chargés (Level 1 à Level 4 gratuits, Level 5+ déblocables ou créés par l'élève)
  const DEFAULT_GABON_WORKS = [
    {
      id: "gw-1",
      chapterNum: 1,
      title: "Chapitre 1 : La forêt du Bassin du Congo & le Parc National de la Lopé",
      subject: "SVT & Environnement",
      level: "Collège / Lycée",
      author: "Classe de 3e B — Lycée National Léon Mba (Libreville)",
      authorRole: "Élèves",
      validated: true,
      isPrivateNote: false,
      summary: "Le Gabon est recouvert à près de 88 % par la forêt tropicale et absorbe plus de CO₂ qu'il n'en émet. Le Parc de la Lopé, classé au patrimoine mondial de l'UNESCO, abrite une biodiversité unique (éléphants de forêt, mandrills, gorilles) ainsi que des vestiges archéologiques millénaires.",
      question: "Pourquoi le Gabon est-il considéré comme un « poumon vert » mondial et un pays à bilan carbone positif ?",
      choices: [
        {
          title: "Grâce à ses 88 % de couverture forestière qui absorbent massivement le CO₂",
          desc: "Rôle de puits de carbone et gestion durable des parcs nationaux",
          ok: true,
          explanation: "Exact ! Les forêts gabonaises séquestrent plus de 100 millions de tonnes de CO₂ par an, faisant du Gabon un leader mondial de la conservation."
        },
        {
          title: "Parce qu'il n'y a aucun cours d'eau ni zone humide dans le pays",
          desc: "Hypothèse géographique",
          ok: false,
          explanation: "Au contraire, le Gabon possède un réseau hydrographique très dense dominé par le fleuve Ogooué et ses affluents."
        },
        {
          title: "Uniquement grâce aux importations de bois étranger",
          desc: "Hypothèse économique",
          ok: false,
          explanation: "Non, le Gabon interdit l'exportation de grumes brutes depuis 2010 pour transformer localement le bois et préserver ses forêts."
        },
        {
          title: "Parce que le climat y est polaire toute l'année",
          desc: "Hypothèse climatique",
          ok: false,
          explanation: "Le Gabon bénéficie d'un climat équatorial chaud et humide favorable à la forêt dense."
        }
      ]
    },
    {
      id: "gw-2",
      chapterNum: 2,
      title: "Chapitre 2 : Le bassin versant de l'Ogooué et l'hydroélectricité (Grand Poubara)",
      subject: "Géographie & Énergie",
      level: "Lycée / Université",
      author: "Club Sciences & Énergie — USTM (Franceville)",
      authorRole: "Étudiants",
      validated: true,
      isPrivateNote: false,
      summary: "Long d'environ 1 200 km, le fleuve Ogooué draine près de 72 % du territoire gabonais. Les aménagements hydroélectriques comme les chutes de Poubara dans le Haut-Ogooué fournissent une énergie propre et renouvelable essentielle aux villes et aux industries.",
      question: "Quel avantage stratégique majeur offre l'hydroélectricité sur le bassin de l'Ogooué pour le Gabon ?",
      choices: [
        {
          title: "Produire une électricité renouvelable et réduire la dépendance aux énergies fossiles",
          desc: "Valorisation durable du potentiel hydraulique national",
          ok: true,
          explanation: "Bravo ! Le potentiel hydroélectrique du Gabon est estimé à plus de 6 000 MW, permettant d'alimenter durablement les foyers et l'industrie."
        },
        {
          title: "Assécher complètement le fleuve Ogooué pendant la saison des pluies",
          desc: "Impact environnemental",
          ok: false,
          explanation: "Les barrages au fil de l'eau régulent et utilisent le débit sans assécher le fleuve."
        },
        {
          title: "Remplacer totalement l'eau potable par de l'eau salée",
          desc: "Traitement hydrique",
          ok: false,
          explanation: "L'hydroélectricité utilise l'énergie mécanique de l'eau douce sans la saliniser."
        },
        {
          title: "Empêcher la navigation sur l'ensemble de l'estuaire du Komo",
          desc: "Transport fluvial",
          ok: false,
          explanation: "Les ouvrages de Poubara sont situés en amont dans le Haut-Ogooué et n'entravent pas l'estuaire du Komo."
        }
      ]
    },
    {
      id: "gw-3",
      chapterNum: 3,
      title: "Chapitre 3 : Les Mangroves de l'Estuaire et la protection des côtes gabonaises",
      subject: "Écologie & Sciences Marines",
      level: "Primaire / Collège",
      author: "Mme Ntoutoume & Élèves de CM2 — École Publique de Glass",
      authorRole: "Enseignant + Élèves",
      validated: true,
      isPrivateNote: false,
      summary: "Autour de Libreville, dans l'estuaire du Komo, la baie de la Mondah et le parc d'Akanda, les palétuviers de la mangrove forment une barrière naturelle contre l'érosion côtière et servent de nurserie aux poissons et crevettes.",
      question: "Que se passe-t-il si l'on détruit les mangroves autour de Libreville et d'Akanda ?",
      choices: [
        {
          title: "Les côtes s'érodent plus vite et les poissons perdent leur zone de reproduction",
          desc: "Déséquilibre de l'écosystème côtier",
          ok: true,
          explanation: "Exact ! Les racines des palétuviers freinent les vagues, filtrent l'eau et protègent les jeunes poissons."
        },
        {
          title: "Il y aura automatiquement deux fois plus de poissons dans l'estuaire",
          desc: "Dynamique marine",
          ok: false,
          explanation: "Sans mangrove, les alevins n'ont plus d'abri face aux prédateurs."
        },
        {
          title: "Les montagnes des Monts de Cristal disparaissent",
          desc: "Relief continental",
          ok: false,
          explanation: "Les Monts de Cristal sont situés à l'intérieur des terres."
        },
        {
          title: "La pluie cesse de tomber sur tout l'équateur",
          desc: "Climatologie",
          ok: false,
          explanation: "La destruction locale de la mangrove affecte surtout le littoral et la biodiversité marine."
        }
      ]
    },
    {
      id: "gw-4",
      chapterNum: 4,
      title: "Chapitre 4 : Le Mvett, patrimoine oral et littérature épique du Gabon",
      subject: "Français & Culture Gabonaise",
      level: "Collège / Lycée / Université",
      author: "Département de Lettres Modernes — UOB (Libreville)",
      authorRole: "Étudiants & Enseignants",
      validated: true,
      isPrivateNote: false,
      summary: "Le Mvett est à la fois un instrument à cordes et une grande épopée orale d'Afrique centrale (notamment chez les Fang du Gabon). Le joueur de Mvett (Mbômô Mvett) mêle récit épique, musique, philosophie, histoire et poésie pour transmettre la mémoire collective.",
      question: "Quel rôle joue le Mvett dans la transmission du savoir au Gabon ?",
      choices: [
        {
          title: "C'est une œuvre totale unissant musique, épopée littéraire, histoire et éducation morale",
          desc: "Patrimoine culturel immatériel vivant",
          ok: true,
          explanation: "Parfait ! Le Mvett est une véritable encyclopédie vivante qui transmet l'histoire, les valeurs sociales et l'art oratoire aux jeunes générations."
        },
        {
          title: "C'est uniquement un règlement sportif moderne",
          desc: "Domaine sportif",
          ok: false,
          explanation: "Non, le Mvett est une tradition littéraire, musicale et philosophique ancestrale."
        },
        {
          title: "C'est un logiciel informatique inventé au XXIe siècle",
          desc: "Technologie récente",
          ok: false,
          explanation: "Le Mvett est un patrimoine oral séculaire que le numérique aide aujourd'hui à préserver."
        },
        {
          title: "Il ne se pratique que sans parole ni musique",
          desc: "Expression artistique",
          ok: false,
          explanation: "Le Mvett associe indissociablement la harpe-cithare, le chant, le récit et l'interaction avec le public."
        }
      ]
    }
  ];

  // Les 10 Niveaux de Simulation correspondant aux Chapitres du programme
  const GABON_CURRICULUM_MISSIONS = [
    {
      solLabel: "LEVEL 01 • CHAPITRE 1 (GRATUIT)",
      title: "LEVEL 01 — Chapitre 1 : La Forêt du Bassin du Congo & Parc de la Lopé",
      location: "PARC NATIONAL DE LA LOPÉ • OGOOUÉ-IVINDO, GABON",
      badge: "COMPAGNON DU MANUEL • SVT & ÉCOLOGIE",
      description: "Tu as vu ce chapitre en classe. Mets tes connaissances en pratique : le Gabon abrite 88 % de couverture forestière. Comment protéger cette biodiversité et maintenir son bilan carbone positif ?",
      advice: "Relie ta leçon de SVT à un cas concret de gestion d'un parc national gabonais !",
      decisions: [
        ["Renforcer la surveillance des parcs nationaux et l'écotourisme scientifique", "Les 13 parcs nationaux du Gabon protègent 11 % du territoire et favorisent la recherche sur la faune et le climat."],
        ["Autoriser l'exploitation forestière sans plan de reboisement ni contrôle", "Sans gestion durable, la déforestation détruit les habitats et réduit l'absorption de CO₂."]
      ]
    },
    {
      solLabel: "LEVEL 02 • CHAPITRE 2 (GRATUIT)",
      title: "LEVEL 02 — Chapitre 2 : Le Fleuve Ogooué & l'Hydroélectricité",
      location: "CHUTES DE POUBARA • HAUT-OGOOUÉ, GABON",
      badge: "COMPAGNON DU MANUEL • GÉOGRAPHIE & ÉNERGIE",
      description: "Le fleuve Ogooué traverse le Gabon sur 1 200 km. La demande en électricité augmente à Libreville, Port-Gentil et Franceville : quelle stratégie énergétique privilégier ?",
      advice: "Compare le potentiel hydraulique renouvelable aux centrales thermiques polluantes.",
      decisions: [
        ["Développer les barrages hydroélectriques durables et moderniser le réseau", "L'hydroélectricité valorise les fleuves gabonais tout en réduisant les émissions de gaz à effet de serre."],
        ["Compter uniquement sur des groupes électrogènes au diesel", "Le diesel coûte cher, pollue l'air et dépend des importations."]
      ]
    },
    {
      solLabel: "LEVEL 03 • CHAPITRE 3 (GRATUIT)",
      title: "LEVEL 03 — Chapitre 3 : Les Mangroves d'Akanda & de la Mondah",
      location: "BAIE DE LA MONDAH & ESTUAIRE DU KOMO • LIBREVILLE",
      badge: "COMPAGNON DU MANUEL • SVT CÔTIÈRE",
      description: "Les mangroves autour de Libreville protègent le littoral contre l'érosion et servent de nurserie aux poissons. Une zone côtière est menacée par les déchets plastiques.",
      advice: "Protège la mangrove : elle nourrit les populations et freine l'érosion !",
      decisions: [
        ["Organiser un nettoyage citoyen et classer la zone de palétuviers", "Les mangroves stockent jusqu'à 4 fois plus de carbone par hectare que les forêts terrestres."],
        ["Remblayer la mangrove avec des déchets pour construire sans étude", "La destruction des palétuviers provoque des inondations côtières et la chute des prises de pêche."]
      ]
    },
    {
      solLabel: "LEVEL 04 • CHAPITRE 4 (GRATUIT)",
      title: "LEVEL 04 — Chapitre 4 : Agriculture Durable & Autosuffisance Alimentaire",
      location: "CEINTURE MARAÎCHÈRE DE NKOLTANG & MOUILA, GABON",
      badge: "COMPAGNON DU MANUEL • AGRONOMIE & ÉCONOMIE",
      description: "Le Gabon importe encore une grande partie de son alimentation. Comment encourager la production locale (manioc, banane plantain, maraîchage) dans les lycées agricoles et coopératives ?",
      advice: "Associe techniques agroécologiques modernes et valorisation des cultures vivrières locales.",
      decisions: [
        ["Créer des fermes-écoles agroécologiques et soutenir les coopératives locales", "La formation pratique des jeunes agriculteurs réduit la dépendance aux importations et crée des emplois."],
        ["Abandonner les terres cultivables pour tout importer par bateau", "Dépendre uniquement des importations expose le pays aux hausses des prix mondiaux."]
      ]
    },
    {
      solLabel: "LEVEL 05 • CHAPITRE 5 (PASS SIMULATION)",
      title: "LEVEL 05 — Chapitre 5 : La Zone Économique Spéciale de Nkok",
      location: "NKOK • PROVINCE DE L'ESTUAIRE, GABON",
      badge: "SIMULATION AVANCÉE • ÉCONOMIE & INDUSTRIE",
      description: "Depuis 2010, le Gabon interdit l'exportation de grumes non transformées afin de créer des emplois industriels locaux (meubles, contreplaqué, menuiserie) à Nkok.",
      advice: "Réfléchis à la valeur ajoutée créée sur place pour les jeunes diplômés gabonais.",
      decisions: [
        ["Transformer le bois localement avec certification durable (FSC)", "La transformation locale multiplie la valeur économique tout en exigeant une gestion responsable des forêts."],
        ["Exporter les troncs bruts sans aucune transformation sur place", "Exporter la matière première brute prive le pays d'emplois et de compétences techniques."]
      ]
    },
    {
      solLabel: "LEVEL 06 • CHAPITRE 6 (PASS SIMULATION)",
      title: "LEVEL 06 — Chapitre 6 : Climat Équatorial & Énergie Solaire",
      location: "STATION MÉTÉOROLOGIQUE DE LIBREVILLE • GABON",
      badge: "SIMULATION AVANCÉE • PHYSIQUE-CHIMIE",
      description: "Situé sur l'équateur, le Gabon reçoit un fort rayonnement solaire toute l'année. Comment exploiter cette énergie pour les écoles de l'intérieur du pays ?",
      advice: "Utilise l'énergie solaire pour électrifier les écoles des villages éloignés !",
      decisions: [
        ["Installer des kits solaires autonomes dans les écoles rurales", "L'énergie solaire permet aux établissements de l'intérieur du pays d'alimenter tablettes et éclairage."],
        ["Laisser les écoles sans aucune source d'électricité", "Sans énergie, l'accès aux outils numériques éducatifs reste bloqué."]
      ]
    },
    {
      solLabel: "LEVEL 07 • CHAPITRE 7 (PASS SIMULATION)",
      title: "LEVEL 07 — Chapitre 7 : Qualité de l'Eau & Prévention Sanitaire",
      location: "BASSIN DE LA NYANGA & DU KOMO • GABON",
      badge: "SIMULATION AVANCÉE • SVT & SANTÉ",
      description: "En saison des pluies, le ruissellement peut contaminer les puits et cours d'eau. Quelle action enseigner aux élèves pour garantir une eau saine ?",
      advice: "La filtration et l'assainissement protègent toute la communauté scolaire.",
      decisions: [
        ["Filtrer et traiter l'eau tout en protégeant les points de captage", "Une eau potable saine prévient les maladies hydriques et améliore la réussite scolaire."],
        ["Boire l'eau de ruissellement sans filtration ni traitement", "L'eau non traitée contient des micro-organismes dangereux pour la santé."]
      ]
    },
    {
      solLabel: "LEVEL 08 • CHAPITRE 8 (PASS SIMULATION)",
      title: "LEVEL 08 — Chapitre 8 : Tortues Luth de Pongara & Baleines à Bosse",
      location: "PARC NATIONAL DE PONGARA & MAYUMBA • GABON",
      badge: "SIMULATION AVANCÉE • BIOLOGIE MARINE",
      description: "Les plages du Gabon accueillent l'une des plus grandes pontes mondiales de tortues luth, et ses eaux reçoivent chaque année les baleines à bosse.",
      advice: "Protège les zones de ponte contre le braconnage et la pollution lumineuse.",
      decisions: [
        ["Sensibiliser les populations et patrouiller sur les plages de ponte", "Le suivi scientifique et l'implication des jeunes assurent la survie des espèces marines protégées."],
        ["Laisser des déchets et des lumières vives sur les plages la nuit", "Les lumières artificielles désorientent les bébés tortues qui ne retrouvent plus l'océan."]
      ]
    },
    {
      solLabel: "LEVEL 09 • CHAPITRE 9 (PASS SIMULATION)",
      title: "LEVEL 09 — Chapitre 9 : Le Mvett & le Patrimoine Culturel Gabonais",
      location: "OYEM • PROVINCE DU WOLEU-NTEM, GABON",
      badge: "SIMULATION AVANCÉE • FRANÇAIS & CULTURE",
      description: "Les récits du Mvett, les contes traditionnels et les langues gabonaises constituent une richesse culturelle immense. Comment les préserver grâce au numérique ?",
      advice: "Numérise et partage les œuvres culturelles dans la base de l'école !",
      decisions: [
        ["Enregistrer les conteurs et intégrer leurs récits dans l'application éducative", "Le numérique permet aux élèves de tout le pays d'écouter et d'étudier leur patrimoine vivant."],
        ["Ne rien transcrire ni partager avec les jeunes générations", "Sans transmission, la mémoire orale risque de s'effacer."]
      ]
    },
    {
      solLabel: "LEVEL 10 • EXAMEN FINAL (PASS SIMULATION)",
      title: "LEVEL 10 — Examen Final : Jeunes Innovateurs & Souveraineté Numérique",
      location: "LIBREVILLE • PÔLE NUMÉRIQUE DU GABON",
      badge: "VALIDATION FINALE DU PROGRAMME",
      description: "Félicitations ! Tu arrives au dernier niveau du programme. Comment pérenniser cette plateforme éducative dans toutes les écoles et universités du Gabon ?",
      advice: "La collaboration entre élèves, enseignants et institutions fait la force du projet !",
      decisions: [
        ["Encourager chaque école à publier ses œuvres validées par les professeurs", "Chaque établissement enrichit ainsi une bibliothèque nationale accessible même hors-ligne !"],
        ["Garder l'application vide sans aucune contribution des élèves", "Une plateforme éducative vit grâce aux savoirs partagés par ses élèves et enseignants."]
      ]
    }
  ];

  function getUniverse() {
    return localStorage.getItem(UNIVERSE_KEY) || "gabon";
  }

  function setUniverse(u) {
    const val = u === "mars" ? "mars" : "gabon";
    localStorage.setItem(UNIVERSE_KEY, val);
    document.body.classList.toggle("edu-gabon-mode", val === "gabon");
    applyUniverseContent();
  }

  function isPassUnlocked() {
    return localStorage.getItem(PASS_KEY) === "1";
  }

  function setPassUnlocked(val) {
    localStorage.setItem(PASS_KEY, val ? "1" : "0");
    applyUniverseContent();
  }

  function getGabonWorks() {
    try {
      const raw = localStorage.getItem(WORKS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_GABON_WORKS.slice();
  }

  function saveGabonWorks(list) {
    try {
      localStorage.setItem(WORKS_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  /* ========================================================================
     1. EXTRACTION AUTOMATIQUE DE QUIZ DEPUIS UNE PAGE DE COURS SCANNÉE
     ======================================================================== */
  function generateQuizFromScannedText(rawText, customTitle) {
    const clean = (rawText || "").replace(/\s+/g, " ").trim();
    const sentences = clean
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 25 && s.length <= 240);

    const summary = clean.slice(0, 380) + (clean.length > 380 ? "…" : "");

    // Identifier une phrase clé avec un verbe ou une définition pour bâtir une question intelligente
    let keySentence = sentences[0] || clean.slice(0, 140);
    for (const s of sentences) {
      if (/\b(est|sont|permet|désigne|consiste|représente|produit|protège|définit|provoque)\b/i.test(s)) {
        keySentence = s;
        break;
      }
    }

    // Extraire des mots importants du texte pour fabriquer des distracteurs crédibles
    const words = clean
      .replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 5);
    const uniqueWords = [...new Set(words)];
    const topicHint = customTitle || uniqueWords.slice(0, 3).join(" ") || "ce chapitre du cours";

    const question = `D'après la page de cours scannée sur « ${topicHint} », quelle affirmation est exacte ?`;
    const goodAnswer = keySentence.length > 130 ? keySentence.slice(0, 127) + "…" : keySentence;

    return {
      summary: summary || "Note de cours scannée par l'élève pour révision interactive.",
      question,
      good: goodAnswer || "Cette notion est définie dans la page de cours scannée.",
      exp: `Bravo ! Cette information provient directement de ton cours : « ${goodAnswer} »`,
      bad1: `Le cours indique exactement l'inverse concernant ${uniqueWords[0] || "ce sujet"}.`,
      bad2: `Ce phénomène n'a aucun lien avec ${uniqueWords[1] || "le chapitre étudié"}.`
    };
  }

  /* ========================================================================
     2. ADAPTATION DES MISSIONS AU PROGRAMME GABONAIS & AUX COURS SCANNÉS
     ======================================================================== */
  function applyUniverseContent() {
    const u = getUniverse();
    document.body.classList.toggle("edu-gabon-mode", u === "gabon");

    if (typeof MISSIONS_DATA === "undefined") return;

    if (!window.__SPACE_MISSIONS_BACKUP) {
      window.__SPACE_MISSIONS_BACKUP = JSON.parse(JSON.stringify(MISSIONS_DATA));
    }

    if (u === "mars") {
      window.__SPACE_MISSIONS_BACKUP.forEach((orig, i) => {
        MISSIONS_DATA[i] = JSON.parse(JSON.stringify(orig));
      });
      return;
    }

    const unlocked = isPassUnlocked();
    const works = getGabonWorks().filter((w) => w.validated);

    MISSIONS_DATA.forEach((m, i) => {
      const mod = GABON_CURRICULUM_MISSIONS[i];
      if (!mod) return;
      const isLockedLevel = i >= 4 && !unlocked;

      m.sol = isLockedLevel ? `🔒 ${mod.solLabel}` : mod.solLabel;
      m.sourceBadge = isLockedLevel
        ? "PASS SIMULATION REQUIS (AIRTEL / MOOV MONEY OU CODE)"
        : mod.badge;
      m.title.fr = mod.title;
      m.location.fr = mod.location;
      m.description.fr = isLockedLevel
        ? `${mod.description} — [Débloque les niveaux 5 à 10 via Airtel Money, Moov Money ou un code prépayé dans l'onglet « 🇬🇦 Niveaux & Scan Cours »]`
        : mod.description;
      m.ariaAdvice.fr = mod.advice;

      if (m.decisions[0] && mod.decisions[0]) {
        m.decisions[0].title.fr = mod.decisions[0][0];
        m.decisions[0].scienceText.fr = mod.decisions[0][1];
        m.decisions[0].scienceRef = "Programme Éducatif Gabon • Compagnon du Manuel";
        m.decisions[0].ok = true;
      }
      if (m.decisions[1] && mod.decisions[1]) {
        m.decisions[1].title.fr = mod.decisions[1][0];
        m.decisions[1].scienceText.fr = mod.decisions[1][1];
        m.decisions[1].scienceRef = "Analyse Pédagogique • Gabon";
        m.decisions[1].ok = false;
      }
    });

    // Injecter les cours scannés et œuvres créées par l'utilisateur en tête des niveaux jouables !
    const customWorks = works.slice(4);
    customWorks.forEach((w, idx) => {
      const targetIdx = idx % MISSIONS_DATA.length;
      const m = MISSIONS_DATA[targetIdx];
      if (!m) return;
      m.sol = `📸 COURS SCANNÉ • LEVEL ${String(targetIdx + 1).padStart(2, "0")}`;
      m.sourceBadge = `${w.isPrivateNote ? "CARNET PRIVÉ ÉLÈVE" : "ŒUVRE PARTAGÉE"} • ${w.subject.toUpperCase()}`;
      m.title.fr = `LEVEL ${String(targetIdx + 1).padStart(2, "0")} — ${w.title}`;
      m.location.fr = `${w.author.toUpperCase()} • GABON`;
      m.description.fr = `${w.summary} — Défi du cours : ${w.question}`;
      w.choices.forEach((c, ci) => {
        if (m.decisions[ci]) {
          m.decisions[ci].title.fr = c.title;
          m.decisions[ci].desc.fr = c.desc;
          m.decisions[ci].scienceText.fr = c.explanation;
          m.decisions[ci].scienceRef = `Source : ${w.author}`;
          m.decisions[ci].ok = !!c.ok;
        }
      });
    });
  }

  /* ========================================================================
     3. MODALE : NIVEAUX PAR CHAPITRE, SCANNER DE COURS & MOBILE MONEY
     ======================================================================== */
  let currentTab = "levels"; // "levels" | "scan" | "unlock" | "teacher"

  function openGabonWorksModal(defaultTab = "levels") {
    currentTab = defaultTab;
    let modal = $("gabon-works-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "gabon-works-modal";
      document.body.appendChild(modal);
    }
    modal.classList.add("open");
    renderGabonWorksModal();
  }

  function closeGabonWorksModal() {
    const modal = $("gabon-works-modal");
    if (modal) modal.classList.remove("open");
  }

  function launchLevelDirectly(missionIndex) {
    setUniverse("gabon");
    closeGabonWorksModal();
    if (typeof state !== "undefined" && typeof renderMissionView === "function") {
      state.missionIndex = missionIndex;
      renderMissionView();
    }
  }

  function renderGabonWorksModal() {
    const modal = $("gabon-works-modal");
    if (!modal) return;
    const works = getGabonWorks();
    const u = getUniverse();
    const unlocked = isPassUnlocked();

    modal.innerHTML = `
      <div class="gw-dialog">
        <div class="gw-header">
          <div>
            <div class="gw-flag-pill">🇬🇦 INFINITY EDU GABON • COMPAGNON DU MANUEL SCOLAIRE & UNIVERSITAIRE</div>
            <h2 style="margin:6px 0 2px;font-size:21px;color:#ffffff">Niveaux de Simulation par Chapitre & Scanner de Cours</h2>
            <p style="margin:0;font-size:13px;color:#94a3b8">
              Révise ton livre papier à la maison sous forme de niveaux interactifs ou scanne une page de ton cahier pour créer ton propre jeu !
            </p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            <button type="button" class="gw-tab ${u === "gabon" ? "active" : ""}" id="gw-switch-gabon">🇬🇦 Programme Gabon</button>
            <button type="button" class="gw-tab ${u === "mars" ? "active" : ""}" id="gw-switch-mars">🚀 Mode Espace</button>
            <button type="button" class="ao-btn ao-btn-back" id="gw-close-btn">✕ Fermer</button>
          </div>
        </div>

        <div class="gw-tabs">
          <button type="button" class="gw-tab ${currentTab === "levels" ? "active" : ""}" data-gw-tab="levels">
            🎮 Niveaux par Chapitre (1 à 10)
          </button>
          <button type="button" class="gw-tab ${currentTab === "scan" ? "active" : ""}" data-gw-tab="scan">
            📸 Scanner mon Cours / Créer un Level
          </button>
          <button type="button" class="gw-tab ${currentTab === "unlock" ? "active" : ""}" data-gw-tab="unlock">
            💳 Débloquer Pass Simulation ${unlocked ? "(✅ Actif)" : "(Airtel / Moov / Code)"}
          </button>
          <button type="button" class="gw-tab ${currentTab === "teacher" ? "active" : ""}" data-gw-tab="teacher">
            🧑‍🏫 Bibliothèque & Enseignants (${works.length})
          </button>
        </div>

        <div id="gw-body"></div>
      </div>
    `;

    $("gw-close-btn").onclick = closeGabonWorksModal;
    $("gw-switch-gabon").onclick = () => {
      setUniverse("gabon");
      if (typeof renderMissionView === "function") renderMissionView();
      renderGabonWorksModal();
    };
    $("gw-switch-mars").onclick = () => {
      setUniverse("mars");
      if (typeof renderMissionView === "function") renderMissionView();
      renderGabonWorksModal();
    };

    modal.querySelectorAll("[data-gw-tab]").forEach((btn) => {
      btn.onclick = () => {
        currentTab = btn.dataset.gwTab;
        renderGabonWorksModal();
      };
    });

    const body = $("gw-body");

    /* ------------------ ONGLET 1 : NIVEAUX PAR CHAPITRE ------------------ */
    if (currentTab === "levels") {
      body.innerHTML = `
        <div style="background:rgba(0,158,96,0.12);border:1px solid #009e60;border-radius:14px;padding:10px 14px;margin-bottom:14px;font-size:13px;color:#d1fae5">
          <strong>📖 Comment ça marche avec ton livre scolaire :</strong> En classe, tu suis le cours avec ton manuel papier. À la maison, clique sur le <strong>Level</strong> correspondant au chapitre étudié pour t'entraîner en simulation !
        </div>
        <div class="gw-grid">
          ${GABON_CURRICULUM_MISSIONS.map((mod, idx) => {
            const locked = idx >= 4 && !unlocked;
            const customWork = works.slice(4)[idx];
            const displayTitle = customWork ? `LEVEL ${String(idx + 1).padStart(2, "0")} — ${customWork.title}` : mod.title;
            const displayBadge = customWork ? `📸 Ton cours scanné (${customWork.subject})` : mod.badge;
            return `
              <div class="gw-work-card ${locked ? "locked-card" : ""}">
                <div>
                  <div class="gw-meta-row" style="margin-bottom:8px">
                    <span class="gw-tag ${locked ? "gw-tag-pending" : "gw-tag-status"}">
                      ${locked ? "🔒 Pass Simulation requis" : "✅ Niveau accessible"}
                    </span>
                    <span class="gw-tag">${displayBadge}</span>
                  </div>
                  <h3 style="margin:0 0 6px;font-size:15.5px;color:#fde047">${displayTitle}</h3>
                  <p style="margin:0;font-size:12.5px;line-height:1.45;color:#cbd5e1">
                    ${customWork ? customWork.summary : mod.description}
                  </p>
                </div>
                <div style="margin-top:8px">
                  ${locked
                    ? `<button type="button" class="ao-btn ao-btn-next" style="width:100%;font-size:13px" data-unlock-jump="${idx}">🔓 Activer via Airtel / Moov / Code</button>`
                    : `<button type="button" class="ao-btn ao-btn-next" style="width:100%;font-size:13px" data-play-level="${idx}">▶ Jouer ce Niveau maintenant</button>`
                  }
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;

      body.querySelectorAll("[data-play-level]").forEach((btn) => {
        btn.onclick = () => launchLevelDirectly(Number(btn.dataset.playLevel));
      });
      body.querySelectorAll("[data-unlock-jump]").forEach((btn) => {
        btn.onclick = () => {
          currentTab = "unlock";
          renderGabonWorksModal();
        };
      });
      return;
    }

    /* ------------------ ONGLET 2 : SCANNER UNE PAGE DE COURS ------------------ */
    if (currentTab === "scan") {
      body.innerHTML = `
        <div class="gw-scan-box">
          <div style="font-size:16px;font-weight:900;color:#7dd3fc">📸 Scanner une page de ton cahier ou de ton manuel</div>
          <p style="margin:6px auto 0;max-width:640px;font-size:13px;color:#cbd5e1">
            Prends en photo une page de ton cours (ou importe une image). L'application va lire le texte automatiquement et générer un <strong>Level de quiz jouable</strong> pour réviser !
          </p>
          <div class="gw-scan-btns">
            <label class="ao-btn ao-btn-next" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px">
              📷 Prendre une photo avec la caméra
              <input type="file" id="gw-camera-input" accept="image/*" capture="environment" style="display:none" />
            </label>
            <label class="ao-btn ao-btn-back" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px">
              🖼️ Choisir une image dans la galerie
              <input type="file" id="gw-gallery-input" accept="image/*" style="display:none" />
            </label>
          </div>
          <img id="gw-scan-img" class="gw-scan-preview" alt="Aperçu de la page scannée" />
          <div class="gw-progress-wrap" id="gw-ocr-progress-wrap">
            <div class="gw-progress-bar" id="gw-ocr-progress-bar"></div>
          </div>
          <div id="gw-ocr-status" style="margin-top:8px;font-size:12.5px;font-weight:700;color:#fde047"></div>
        </div>

        <form class="gw-form" id="gw-add-form">
          <div class="gw-field">
            <label>1. Texte extrait de ta page de cours (ou colle/saisis ton résumé ici) *</label>
            <textarea id="gw-f-summary" rows="4" required placeholder="Le texte scanné depuis ta photo apparaîtra ici automatiquement. Tu peux aussi le corriger ou le compléter avant de générer ton jeu..."></textarea>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
            <button type="button" class="gw-tab active" id="gw-auto-quiz-btn">
              ⚡ Générer automatiquement la question et les réponses depuis ce texte
            </button>
            <span style="font-size:12px;color:#94a3b8">Transforme ton cours en défi jouable en 1 clic</span>
          </div>

          <div class="gw-form-row">
            <div class="gw-field">
              <label>Titre du chapitre ou de l'œuvre *</label>
              <input type="text" id="gw-f-title" required placeholder="Ex. Chapitre 3 : La respiration cellulaire / Le roman gabonais" />
            </div>
            <div class="gw-field">
              <label>Matière scolaire ou universitaire *</label>
              <select id="gw-f-subject">
                <option value="SVT & Environnement">SVT & Environnement</option>
                <option value="Histoire & Géographie du Gabon">Histoire & Géographie du Gabon</option>
                <option value="Français & Littérature Gabonaise">Français & Littérature Gabonaise</option>
                <option value="Mathématiques & Physique-Chimie">Mathématiques & Physique-Chimie</option>
                <option value="Économie, Droit & Gestion">Économie, Droit & Gestion</option>
                <option value="Informatique & Numérique">Informatique & Numérique</option>
              </select>
            </div>
          </div>

          <div class="gw-form-row">
            <div class="gw-field">
              <label>Niveau d'enseignement *</label>
              <select id="gw-f-level">
                <option value="Collège (6e à 3e)">Collège (6e à 3e)</option>
                <option value="Lycée (2nde à Terminale)">Lycée (2nde à Terminale)</option>
                <option value="Université / Institut Supérieur">Université / Institut Supérieur</option>
                <option value="Primaire (7-11 ans)">Primaire (7-11 ans)</option>
              </select>
            </div>
            <div class="gw-field">
              <label>Auteur(s) & Établissement *</label>
              <input type="text" id="gw-f-author" required placeholder="Ex. Moi-même — Lycée National Léon Mba" />
            </div>
          </div>

          <div class="gw-field">
            <label>Question de simulation posée dans le jeu *</label>
            <input type="text" id="gw-f-question" required placeholder="La question générée apparaîtra ici..." />
          </div>

          <div class="gw-form-row">
            <div class="gw-field">
              <label>Bonne réponse (Réponse exacte du cours) *</label>
              <input type="text" id="gw-f-good" required placeholder="Réponse correcte..." />
            </div>
            <div class="gw-field">
              <label>Explication pédagogique affichée après le choix *</label>
              <input type="text" id="gw-f-exp" required placeholder="Pourquoi cette réponse est juste..." />
            </div>
          </div>

          <div class="gw-form-row">
            <div class="gw-field">
              <label>Mauvaise réponse 1 (Piège plausible) *</label>
              <input type="text" id="gw-f-bad1" required placeholder="Proposition incorrecte..." />
            </div>
            <div class="gw-field">
              <label>Mauvaise réponse 2</label>
              <input type="text" id="gw-f-bad2" placeholder="Deuxième proposition incorrecte..." />
            </div>
          </div>

          <div class="gw-legal-box">
            <label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;margin:0">
              <input type="checkbox" id="gw-f-copyright" required style="width:auto;margin-top:3px" />
              <span>
                <strong>Respect des droits d'auteur (Obligatoire) :</strong> Je certifie que ce contenu est soit mon propre cours/résumé personnel (usage privé de révision), soit une œuvre originale dont j'ai l'autorisation de partage, sans piratage intégral d'un manuel commercial.
              </span>
            </label>
            <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:14px;font-size:12.5px">
              <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">
                <input type="radio" name="gw-visibility" value="private" checked style="width:auto" />
                🔒 Garder dans mon carnet personnel de révision (100 % légal pour tout livre acheté)
              </label>
              <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer">
                <input type="radio" name="gw-visibility" value="public" style="width:auto" />
                🌍 Proposer à la bibliothèque de l'école (soumis à validation de l'enseignant)
              </label>
            </div>
          </div>

          <div class="gw-actions-bar">
            <span style="font-size:12px;color:#94a3b8">💾 Sauvegardé sur ton appareil (fonctionne hors-ligne)</span>
            <button type="submit" class="ao-btn ao-btn-next">🚀 Créer le Level et y jouer immédiatement !</button>
          </div>
        </form>
      `;

      // Gestion du scan d'image + OCR Tesseract.js (avec repli hors-ligne gracieux)
      async function handleScanFile(file) {
        if (!file) return;
        const img = $("gw-scan-img");
        const status = $("gw-ocr-status");
        const pWrap = $("gw-ocr-progress-wrap");
        const pBar = $("gw-ocr-progress-bar");

        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
          img.style.display = "inline-block";
        };
        reader.readAsDataURL(file);

        pWrap.style.display = "block";
        pBar.style.width = "15%";
        status.textContent = "🔍 Analyse de la photo de ton cours en cours…";

        try {
          if (!window.Tesseract) {
            await new Promise((resolve, reject) => {
              const s = document.createElement("script");
              s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
              s.onload = resolve;
              s.onerror = reject;
              document.head.appendChild(s);
            });
          }

          const worker = await window.Tesseract.createWorker("fra", 1, {
            logger: (m) => {
              if (m.status === "recognizing text" && typeof m.progress === "number") {
                const pct = Math.max(20, Math.round(m.progress * 100));
                pBar.style.width = pct + "%";
                status.textContent = `📖 Lecture du texte de la page : ${pct} %…`;
              }
            }
          });

          const { data } = await worker.recognize(file);
          await worker.terminate();

          const extracted = (data && data.text ? data.text : "").replace(/\n+/g, " ").trim();
          pBar.style.width = "100%";

          if (extracted.length >= 15) {
            $("gw-f-summary").value = extracted;
            if (!$("gw-f-title").value.trim()) {
              const firstWords = extracted.split(/\s+/).slice(0, 6).join(" ");
              $("gw-f-title").value = "Cours scanné : " + firstWords;
            }
            const generated = generateQuizFromScannedText(extracted, $("gw-f-title").value);
            $("gw-f-question").value = generated.question;
            $("gw-f-good").value = generated.good;
            $("gw-f-exp").value = generated.exp;
            $("gw-f-bad1").value = generated.bad1;
            $("gw-f-bad2").value = generated.bad2;
            status.textContent = "✅ Page lue avec succès ! Vérifie les champs ci-dessous puis clique sur « Créer le Level et y jouer ».";
          } else {
            status.textContent = "⚠️ Photo peu lisible. Saisis ou colle directement les phrases clés de ta page dans la case 1 ci-dessous.";
          }
        } catch (err) {
          pBar.style.width = "100%";
          status.textContent = "📴 Mode hors-ligne détecté : ta photo est chargée ! Saisis ou dicte le résumé de ta page dans la case 1 puis clique sur « Générer automatiquement ».";
        }
      }

      $("gw-camera-input").onchange = (e) => handleScanFile(e.target.files && e.target.files[0]);
      $("gw-gallery-input").onchange = (e) => handleScanFile(e.target.files && e.target.files[0]);

      $("gw-auto-quiz-btn").onclick = () => {
        const txt = $("gw-f-summary").value.trim();
        if (!txt) {
          $("gw-ocr-status").textContent = "✍️ Commence par scanner une photo ou écrire quelques phrases de ton cours dans la case 1.";
          $("gw-f-summary").focus();
          return;
        }
        if (!$("gw-f-title").value.trim()) {
          $("gw-f-title").value = "Révision : " + txt.split(/\s+/).slice(0, 5).join(" ");
        }
        const gen = generateQuizFromScannedText(txt, $("gw-f-title").value);
        $("gw-f-question").value = gen.question;
        $("gw-f-good").value = gen.good;
        $("gw-f-exp").value = gen.exp;
        $("gw-f-bad1").value = gen.bad1;
        $("gw-f-bad2").value = gen.bad2;
        $("gw-ocr-status").textContent = "⚡ Question et réponses générées automatiquement depuis ton cours !";
      };

      $("gw-add-form").onsubmit = (e) => {
        e.preventDefault();
        const title = $("gw-f-title").value.trim();
        const subject = $("gw-f-subject").value;
        const level = $("gw-f-level").value;
        const author = $("gw-f-author").value.trim();
        const summary = $("gw-f-summary").value.trim();
        const question = $("gw-f-question").value.trim();
        const good = $("gw-f-good").value.trim();
        const exp = $("gw-f-exp").value.trim();
        const bad1 = $("gw-f-bad1").value.trim();
        const bad2 = $("gw-f-bad2").value.trim() || "Proposition non conforme au cours";
        const vis = document.querySelector('input[name="gw-visibility"]:checked');
        const isPrivateNote = !vis || vis.value === "private";

        const newWork = {
          id: "gw-" + Date.now(),
          title,
          subject,
          level,
          author,
          authorRole: isPrivateNote ? "Carnet Privé Élève" : "Contribution Partagée",
          validated: true, // Actif immédiatement en démo pour que l'élève voie l'effet dans le jeu
          isPrivateNote,
          summary,
          question,
          choices: [
            { title: good, desc: "Réponse conforme au cours", ok: true, explanation: exp },
            { title: bad1, desc: "À revoir dans le cahier", ok: false, explanation: exp },
            { title: bad2, desc: "À revoir dans le cahier", ok: false, explanation: exp },
            { title: "Aucune de ces réponses", desc: "Proposition alternative", ok: false, explanation: exp }
          ]
        };

        const list = getGabonWorks();
        list.push(newWork);
        saveGabonWorks(list);
        setUniverse("gabon");

        // Lancer directement le Level 01 où ce cours scanné vient d'être injecté !
        const targetMissionIdx = (list.slice(4).length - 1) % 10;
        launchLevelDirectly(targetMissionIdx);
      };
      return;
    }

    /* ------------------ ONGLET 3 : PASS SIMULATION (AIRTEL / MOOV / CODE) ------------------ */
    if (currentTab === "unlock") {
      body.innerHTML = `
        <div style="background:rgba(59,130,246,0.14);border:1px solid #3b82f6;border-radius:14px;padding:12px 14px;margin-bottom:14px;font-size:13px;color:#dbeafe">
          <strong>💡 Modèle adapté aux élèves et étudiants du Gabon :</strong><br/>
          • Les <strong>Levels 1 à 4</strong> et le <strong>Scanner de tes propres cours</strong> sont <strong>100 % gratuits</strong>.<br/>
          • Tu achètes ton livre papier en librairie pour l'école, et tu actives ici uniquement le <strong>Pass Simulation (Levels 5 à 10)</strong> pour réviser à la maison, sans carte bancaire !
        </div>

        ${unlocked ? `
          <div style="background:rgba(16,185,129,0.2);border:2px solid #10b981;border-radius:16px;padding:16px;text-align:center;margin-bottom:14px">
            <div style="font-size:18px;font-weight:900;color:#6ee7b7">✅ PASS SIMULATION ACTIVÉ !</div>
            <p style="margin:6px 0 12px;font-size:13.5px;color:#ecfdf5">Tous les chapitres (Levels 1 à 10) sont débloqués sur cet appareil, même hors-ligne.</p>
            <button type="button" class="ao-btn ao-btn-next" id="gw-go-play-unlocked">🎮 Jouer aux Levels 5 à 10</button>
            <button type="button" class="gw-tab" style="margin-left:8px" id="gw-reset-lock">Réinitialiser (Test Démo)</button>
          </div>
        ` : ""}

        <div class="gw-pay-grid">
          <div class="gw-pay-card voucher">
            <div style="font-weight:900;color:#6ee7b7;font-size:15px">🎟️ 1. Code Prépayé (Espèces / École)</div>
            <p style="font-size:12.5px;color:#cbd5e1;margin:6px 0 10px">
              Pour les collégiens et lycéens : carte à gratter vendue en espèces (1 500 FCFA / trimestre) en librairie ou distribuée gratuitement par l'école partenaire.
            </p>
            <input type="text" id="gw-voucher-input" placeholder="Ex. ENVOL2026 ou GABON-EDU" style="width:100%;box-sizing:border-box;background:#0f172a;border:1.5px solid #10b981;border-radius:10px;padding:9px;color:#fff;margin-bottom:8px" />
            <button type="button" class="ao-btn ao-btn-next" style="width:100%;font-size:13px" id="gw-btn-voucher">Valider le code</button>
          </div>

          <div class="gw-pay-card airtel">
            <div style="font-weight:900;color:#fca5a5;font-size:15px">📱 2. Airtel Money Gabon</div>
            <p style="font-size:12.5px;color:#cbd5e1;margin:6px 0 10px">
              Paiement mobile instantané par l'étudiant ou le parent d'élève (Pass Trimestre : 1 500 FCFA).
            </p>
            <input type="tel" id="gw-airtel-num" placeholder="Numéro Airtel (074 / 077 XX XX XX)" style="width:100%;box-sizing:border-box;background:#0f172a;border:1.5px solid #ef4444;border-radius:10px;padding:9px;color:#fff;margin-bottom:8px" />
            <button type="button" class="ao-btn ao-btn-next" style="width:100%;font-size:13px;background:#dc2626" id="gw-btn-airtel">Simuler paiement Airtel Money</button>
          </div>

          <div class="gw-pay-card moov">
            <div style="font-weight:900;color:#93c5fd;font-size:15px">📱 3. Moov Money Gabon</div>
            <p style="font-size:12.5px;color:#cbd5e1;margin:6px 0 10px">
              Paiement mobile sans carte bancaire pour les étudiants et familles (Pass Trimestre : 1 500 FCFA).
            </p>
            <input type="tel" id="gw-moov-num" placeholder="Numéro Moov (062 / 066 XX XX XX)" style="width:100%;box-sizing:border-box;background:#0f172a;border:1.5px solid #3b82f6;border-radius:10px;padding:9px;color:#fff;margin-bottom:8px" />
            <button type="button" class="ao-btn ao-btn-next" style="width:100%;font-size:13px;background:#2563eb" id="gw-btn-moov">Simuler paiement Moov Money</button>
          </div>
        </div>
        <div id="gw-pay-msg" style="margin-top:12px;font-size:13px;font-weight:800;color:#fde047;text-align:center"></div>
      `;

      if ($("gw-go-play-unlocked")) {
        $("gw-go-play-unlocked").onclick = () => launchLevelDirectly(4);
      }
      if ($("gw-reset-lock")) {
        $("gw-reset-lock").onclick = () => {
          setPassUnlocked(false);
          if (typeof renderMissionView === "function") renderMissionView();
          renderGabonWorksModal();
        };
      }

      $("gw-btn-voucher").onclick = () => {
        const code = ($("gw-voucher-input").value || "").trim().toUpperCase();
        if (code.length >= 4) {
          setPassUnlocked(true);
          if (typeof renderMissionView === "function") renderMissionView();
          renderGabonWorksModal();
        } else {
          $("gw-pay-msg").textContent = "⚠️ Saisis un code d'activation (ex. ENVOL2026 pour la démonstration).";
        }
      };

      $("gw-btn-airtel").onclick = () => {
        $("gw-pay-msg").textContent = "⏳ Validation USSD Airtel Money en cours…";
        setTimeout(() => {
          setPassUnlocked(true);
          if (typeof renderMissionView === "function") renderMissionView();
          renderGabonWorksModal();
        }, 700);
      };

      $("gw-btn-moov").onclick = () => {
        $("gw-pay-msg").textContent = "⏳ Validation USSD Moov Money en cours…";
        setTimeout(() => {
          setPassUnlocked(true);
          if (typeof renderMissionView === "function") renderMissionView();
          renderGabonWorksModal();
        }, 700);
      };
      return;
    }

    /* ------------------ ONGLET 4 : BIBLIOTHÈQUE & ESPACE ENSEIGNANTS ------------------ */
    if (currentTab === "teacher") {
      body.innerHTML = `
        <div style="display:grid;gap:14px">
          <div style="background:#1e293b;border:1px solid #334155;border-radius:16px;padding:14px">
            <h3 style="margin:0 0 6px;font-size:16px;color:#6ee7b7">🧑‍🏫 Modération des œuvres & Respect des droits d'auteur</h3>
            <p style="margin:0 0 12px;font-size:13px;color:#cbd5e1">
              Les notes personnelles restent privées sur le téléphone de l'élève. Les œuvres partagées avec l'école sont validées par les enseignants avant diffusion.
            </p>
            <div style="display:grid;gap:8px">
              ${works.map((w, idx) => `
                <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;background:#0f172a;padding:10px 12px;border-radius:12px;border:1px solid #334155">
                  <div>
                    <strong style="color:#f8fafc">${w.title}</strong>
                    <div style="font-size:12px;color:#94a3b8">${w.subject} • ${w.author} ${w.isPrivateNote ? "• 🔒 Carnet privé" : "• 🌍 Bibliothèque"}</div>
                  </div>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="gw-tab ${w.validated ? "active" : ""}" data-toggle-val="${idx}">
                      ${w.validated ? "✔ Actif dans le jeu" : "Activer"}
                    </button>
                    ${idx >= 4 ? `<button type="button" class="gw-tab" style="border-color:#ef4444;color:#fca5a5" data-del-work="${idx}">🗑️</button>` : ""}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <div style="background:#1e293b;border:1px solid #334155;border-radius:16px;padding:14px">
            <h3 style="margin:0 0 6px;font-size:16px;color:#fde047">📦 Partage Hors-Ligne entre Classes (Fichier JSON)</h3>
            <p style="margin:0 0 12px;font-size:13px;color:#cbd5e1">
              Exportez les niveaux créés par l'enseignant ou la classe pour les partager par Bluetooth, clé USB ou WhatsApp sans internet.
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:10px">
              <button type="button" class="ao-btn ao-btn-next" id="gw-export-json">⬇️ Exporter les cours & quiz (.json)</button>
              <label class="ao-btn ao-btn-back" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px">
                ⬆️ Importer un pack de cours (.json)
                <input type="file" id="gw-import-json" accept=".json" style="display:none" />
              </label>
            </div>
          </div>
        </div>
      `;

      body.querySelectorAll("[data-toggle-val]").forEach((btn) => {
        btn.onclick = () => {
          const i = Number(btn.dataset.toggleVal);
          const list = getGabonWorks();
          if (list[i]) {
            list[i].validated = !list[i].validated;
            saveGabonWorks(list);
            applyUniverseContent();
            if (typeof renderMissionView === "function") renderMissionView();
            renderGabonWorksModal();
          }
        };
      });

      body.querySelectorAll("[data-del-work]").forEach((btn) => {
        btn.onclick = () => {
          const i = Number(btn.dataset.delWork);
          const list = getGabonWorks();
          list.splice(i, 1);
          saveGabonWorks(list);
          applyUniverseContent();
          if (typeof renderMissionView === "function") renderMissionView();
          renderGabonWorksModal();
        };
      });

      $("gw-export-json").onclick = () => {
        const blob = new Blob([JSON.stringify(getGabonWorks(), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cours-et-niveaux-infinity-edu-gabon.json";
        a.click();
        URL.revokeObjectURL(url);
      };

      $("gw-import-json").onchange = (ev) => {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = JSON.parse(reader.result);
            if (Array.isArray(imported)) {
              saveGabonWorks(imported);
              applyUniverseContent();
              if (typeof renderMissionView === "function") renderMissionView();
              renderGabonWorksModal();
            }
          } catch (err) {}
        };
        reader.readAsText(file);
      };
    }
  }

  /* ========================================================================
     4. INTÉGRATION DANS LA BARRE D'OUTILS & L'ÉCRAN DE SÉLECTION DE PROFIL
     ======================================================================== */
  function injectGabonControls() {
    const tb = $("env-toolbar");
    if (tb && !$("tb-gabon-works-btn")) {
      const scanBtn = document.createElement("button");
      scanBtn.type = "button";
      scanBtn.id = "tb-gabon-scan-btn";
      scanBtn.className = "env-btn env-btn-scan";
      scanBtn.textContent = "📸 Scanner un Cours";
      scanBtn.onclick = () => openGabonWorksModal("scan");
      tb.prepend(scanBtn);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "tb-gabon-works-btn";
      btn.className = "env-btn env-btn-gabon";
      btn.textContent = "🇬🇦 Niveaux & Chapitres";
      btn.onclick = () => openGabonWorksModal("levels");
      tb.prepend(btn);
    }

    const onb = $("adaptive-onboard");
    if (onb) {
      const card = onb.querySelector(".ao-card");
      if (card && !card.querySelector(".ao-universe-switch") && card.querySelector(".ao-audience-grid")) {
        const sw = document.createElement("div");
        sw.className = "ao-universe-switch";
        const u = getUniverse();
        sw.innerHTML = `
          <button type="button" class="ao-univ-btn ${u === "gabon" ? "active-gabon" : ""}" id="pick-univ-gabon">
            🇬🇦 Programme Éducatif Gabon (Niveaux & Scan Cours)
          </button>
          <button type="button" class="ao-univ-btn ${u === "mars" ? "active-mars" : ""}" id="pick-univ-mars">
            🚀 Programme Exploration Spatiale (Mars & NASA)
          </button>
        `;
        card.insertBefore(sw, card.querySelector(".ao-audience-grid"));

        $("pick-univ-gabon").onclick = () => {
          setUniverse("gabon");
          sw.querySelector("#pick-univ-gabon").className = "ao-univ-btn active-gabon";
          sw.querySelector("#pick-univ-mars").className = "ao-univ-btn";
        };
        $("pick-univ-mars").onclick = () => {
          setUniverse("mars");
          sw.querySelector("#pick-univ-mars").className = "ao-univ-btn active-mars";
          sw.querySelector("#pick-univ-gabon").className = "ao-univ-btn";
        };
      }
    }
  }

  const _prevRender = window.renderMissionView;
  if (typeof _prevRender === "function") {
    window.renderMissionView = renderMissionView = function () {
      applyUniverseContent();
      _prevRender.apply(this, arguments);
      injectGabonControls();
    };
  }

  window.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem(UNIVERSE_KEY)) {
      localStorage.setItem(UNIVERSE_KEY, "gabon");
    }
    applyUniverseContent();
    setTimeout(injectGabonControls, 150);

    const obs = new MutationObserver(() => injectGabonControls());
    obs.observe(document.body, { childList: true, subtree: true });
  });
})();
