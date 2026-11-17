/* ==========================================================================
   INFINITY SPACE — VOYAGE NARRATIF TERRE -> MARS EN 4 ACTES (3D)
   & DOUBLE EXPÉRIENCE RADICALEMENT DIFFÉRENTE (ENFANT LILY vs SCIENTIFIQUE NASA)
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const JOURNEY_DONE_KEY = "infinity_space_journey_completed";

  function isExpertProfile() {
    return localStorage.getItem("infinity_mode") === "aria";
  }

  function speakLily(text) {
    if (isExpertProfile()) return;
    try {
      if (typeof liliSpeak === "function") liliSpeak(text);
    } catch (e) {}
  }

  /* ========================================================================
     1. LES 4 ACTES DU VOYAGE SPATIAL (DÉCOLLAGE -> TRANSIT -> EDL -> MARS)
        Chaque acte possède deux rédactions et deux rendus 3D complètement
        différents :
        - junior : Aventure visuelle commentée par Lily pour débutants/enfants
        - expert : Simulation orbitale NASA / JPL avec équations et télémétrie
     ======================================================================== */
  const JOURNEY_ACTS = [
    {
      id: "launch",
      pillJunior: "1. 🚀 Décollage Terre",
      pillExpert: "ACT I • LAUNCH & TMI",
      kickerJunior: "ACTE 1 / 4 • PAS DE TIR SUR LA TERRE",
      kickerExpert: "ACT I • LAUNCH COMPLEX 39A • TRANS-MARS INJECTION",
      titleJunior: "3, 2, 1… Décollage vers l'espace !",
      titleExpert: "Fenêtre synodique & Injection Trans-Martienne (TMI)",
      storyJunior:
        "Regarde ! Notre grande fusée quitte la Terre bleue avec une flamme lumineuse. Pour échapper à la gravité de la Terre et filer vers Mars, nos moteurs doivent pousser très fort au bon moment. Aide l'équipage à gérer le décollage !",
      storyExpert:
        "Fenêtre d'opposition Terre-Mars ouverte (tous les 26 mois). Le lanceur lourd vient d'atteindre l'orbite de parking basse (LEO à 200 km, v = 7,8 km/s). Vous devez exécuter la poussée d'injection trans-martienne (Δv = 3,6 km/s) sur une orbite de transfert de Hohmann.",
      telemetry: { phase: "LEO -> TMI", dv: "3 610 m/s", dist: "0,0004 UA", rad: "0,2 mSv/j", hull: "100 %" },
      choicesJunior: [
        {
          title: "🚀 Larguer l'étage vide et allumer le moteur spatial",
          desc: "Alléger la fusée pour garder plein de carburant vers Mars",
          ok: true,
          consequence: "Super ! En larguant le réservoir vide, la fusée devient légère et file droit vers Mars avec 100 % de ses réserves !",
          impacts: { energie: +4, integrite: 0 }
        },
        {
          title: "⛽ Garder les gros réservoirs vides attachés",
          desc: "La fusée reste très lourde et consomme plus d'énergie",
          ok: false,
          consequence: "Oups ! La fusée était trop lourde : on a consommé 14 % d'énergie en plus, mais la mission continue ! On fera attention dans l'espace.",
          impacts: { energie: -14, integrite: -4 }
        }
      ],
      choicesExpert: [
        {
          title: "Exécuter la poussée TMI au périgée (Effet Oberth optimal)",
          desc: "Maximise l'énergie cinétique spécifique et économise les ergols cryogéniques",
          ok: true,
          consequence: "Trajectoire nominale verrouillée (C3 = 14,8 km²/s²). Injection sur l'ellipse de Hohmann réussie avec marge d'ergols intacte.",
          impacts: { energie: +5, integrite: 0 }
        },
        {
          title: "Retarder l'allumage de 18 minutes hors fenêtre nominale",
          desc: "Nécessite une correction de trajectoire (TCM) coûteuse en carburant",
          ok: false,
          consequence: "MODE DÉGRADÉ : Dérive angulaire de 2,4°. La correction TCM-1 a consommé 16 % des réserves énergétiques et sollicité la structure.",
          impacts: { energie: -16, integrite: -6 }
        }
      ]
    },
    {
      id: "transit",
      pillJunior: "2. 🌌 Voyage Spatial",
      pillExpert: "ACT II • DEEP-SPACE TRANSIT",
      kickerJunior: "ACTE 2 / 4 • DANS L'ESPACE ENTRE LA TERRE ET MARS",
      kickerExpert: "ACT II • HELIOCENTRIC CRUISE • NASA DONKI CME ALERT",
      titleJunior: "Attention, une tempête du Soleil arrive !",
      titleExpert: "Transit héliocentrique (210 jours) & Éjection de Masse Coronale",
      storyJunior:
        "Nous sommes au milieu de l'espace : la Terre est devenue un petit point bleu derrière nous, et Mars grandit devant ! Soudain, le Soleil envoie un vent de particules invisibles. Comment protéger les 4 astronautes ?",
      storyExpert:
        "Jour 114 du transit (distance 1,24 UA). Le réseau NASA DONKI signale une éruption solaire de classe X2.8 dirigée vers le vaisseau. Hors magnétosphère terrestre, le flux de protons risque d'infliger une dose aiguë à l'équipage.",
      telemetry: { phase: "CRUISE 1.24 UA", dv: "0 m/s (Balistique)", dist: "185 M km", rad: "4,8 mSv/j (!)", hull: "98 %" },
      choicesJunior: [
        {
          title: "🛡️ Placer les réservoirs d'eau autour de la cabine",
          desc: "L'eau bloque les rayons du Soleil comme un bouclier naturel",
          ok: true,
          consequence: "Génial ! L'eau absorbe les radiations du Soleil : l'équipage reste en pleine forme et le moral est au maximum !",
          impacts: { radiation: -4, sante: +3 }
        },
        {
          title: "🪟 Ouvrir tous les volets pour regarder l'éruption solaire",
          desc: "Les rayons traversent les hublots sans protection",
          ok: false,
          consequence: "Aïe ! L'équipage a reçu une dose de radiation (+18 %) et le moral baisse un peu. Heureusement, l'infirmerie spatiale stabilise tout le monde !",
          impacts: { radiation: +18, sante: -12 }
        }
      ],
      choicesExpert: [
        {
          title: "Activer l'abri anti-radiations entouré d'eau & polyéthylène (PEHD)",
          desc: "L'hydrogène léger stoppe les protons solaires sans rayonnement secondaire",
          ok: true,
          consequence: "Dose absorbée limitée à 12 mSv (seuil NASA respecté). Télémétrie biomédicale nominale et cohésion d'équipage préservée.",
          impacts: { radiation: -5, sante: +4 }
        },
        {
          title: "Maintenir le poste de quart standard sans blindage hydrogéné",
          desc: "Exposition directe au spectre de protons solaires > 100 MeV",
          ok: false,
          consequence: "MODE DÉGRADÉ : Dose cumulée +22 %, fatigue de l'équipage (-15 % santé) et micro-erreurs mémoire corrigées par redondance triple.",
          impacts: { radiation: +22, sante: -15 }
        }
      ]
    },
    {
      id: "edl",
      pillJunior: "3. 🪂 Descente Mars",
      pillExpert: "ACT III • EDL (7 MIN TERROR)",
      kickerJunior: "ACTE 3 / 4 • DESCENTE DANS LE CIEL ROUGE DE MARS",
      kickerExpert: "ACT III • ENTRY, DESCENT & LANDING • JEZERO ELLIPSE",
      titleJunior: "Ouverture du parachute géant sur Mars !",
      titleExpert: "Entrée atmosphérique (20 000 km/h) & Descente propulsée",
      storyJunior:
        "Nous voilà arrivés au-dessus de Mars ! Le vaisseau plonge dans l'air rouge de la planète. Il va très vite et chauffe comme une étoile filante. Que faut-il déclencher pour se poser en douceur dans le cratère Jezero ?",
      storyExpert:
        "Interface atmosphérique à 125 km d'altitude (v = 5,5 km/s, atmosphère 95 % CO₂ à 610 Pa). Le bouclier thermique atteint 1 450 °C. À Mach 1,7, vous devez enchaîner le parachute supersonique puis les rétrofusées de freinage final.",
      telemetry: { phase: "EDL MACH 1.7", dv: "-5 480 m/s", dist: "11 km ALT", rad: "0,7 mSv/j", hull: "94 %" },
      choicesJunior: [
        {
          title: "🪂 Bouclier thermique + Parachute + Rétrofusées",
          desc: "Freiner en 3 étapes pour atterrir tout en douceur",
          ok: true,
          consequence: "Atterrissage parfait ! Les pieds du module touchent le sable rouge de Jezero sans une égratignure !",
          impacts: { integrite: +2, oxygene: +2 }
        },
        {
          title: "⚡ Couper les rétrofusées trop tôt pour économiser",
          desc: "L'atterrissage est brutal et secoue les réservoirs",
          ok: false,
          consequence: "Choc à l'atterrissage ! La coque a subi des dégâts (-15 % intégrité) et une valve d'oxygène fuit légèrement, mais nous sommes posés sur Mars !",
          impacts: { integrite: -15, oxygene: -10 }
        }
      ],
      choicesExpert: [
        {
          title: "Séquence nominale : Bouclier PICA-X -> Parachute DGB -> Rétrofusées TRN",
          desc: "Navigation relative au terrain (TRN) évitant les blocs rocheux de Jezero",
          ok: true,
          consequence: "Touchdown confirmé dans le cratère Jezero (18,38° N, 77,58° E). Vitesse verticale finale : 0,75 m/s. Tous les systèmes vitaux opérationnels.",
          impacts: { integrite: +3, oxygene: +2 }
        },
        {
          title: "Descente balistique sans guidage TRN actif",
          desc: "Risque élevé de poser sur un talus rocheux incliné",
          ok: false,
          consequence: "MODE DÉGRADÉ : Posé incliné à 11° sur un éboulis. Train d'atterrissage endommagé (-18 % intégrité) et fuite sur le collecteur O₂ (-12 %).",
          impacts: { integrite: -18, oxygene: -12 }
        }
      ]
    },
    {
      id: "surface",
      pillJunior: "4. 🏜️ Sur Mars !",
      pillExpert: "ACT IV • SURFACE OPS (SOL 1)",
      kickerJunior: "ACTE 4 / 4 • BIENVENUE SUR LA PLANÈTE ROUGE !",
      kickerExpert: "ACT IV • SURFACE OPERATIONS • HABITAT ARES-01",
      titleJunior: "Nous sommes sur Mars ! L'aventure commence !",
      titleExpert: "Déploiement de l'avant-poste ARES-01 & Bilan de survie",
      storyJunior:
        "Bravo ! Tu as guidé la fusée depuis la Terre jusqu'au sol de Mars ! Regarde autour de toi : la base s'installe et le robot Perseverance est prêt. Maintenant, il faut gérer l'eau, l'air, les plantes et l'énergie pendant 10 jours martiens !",
      storyExpert:
        "Arrivée sur Mars validée. L'état actuel de vos réserves reflète directement vos décisions prises durant le lancement, le transit et la descente EDL. Prenez maintenant le commandement des opérations de surface sur 10 Sols.",
      telemetry: { phase: "SURFACE JEZERO", dv: "0 m/s (Posé)", dist: "0 m ALT", rad: "0,67 mSv/j", hull: "ACTIF" },
      choicesJunior: null,
      choicesExpert: null
    }
  ];

  let jState = {
    active: false,
    actIdx: 0,
    consequenceText: null,
    lastWasOk: true,
    animTime: 0
  };

  /* ========================================================================
     2. MOTEUR 3D / CINÉMATIQUE DU VOYAGE TERRE -> ESPACE -> MARS
        Rendu radicalement distinct entre Mode Junior (coloré, pédagogique,
        trajectoire lumineuse) et Mode Scientifique (WebGL orbital, shaders
        atmosphériques, télémétrie vectorielle).
     ======================================================================== */
  let journeyLoopStarted = false;

  function startJourneyCanvasLoop() {
    if (journeyLoopStarted) return;
    journeyLoopStarted = true;

    function renderFrame(now) {
      requestAnimationFrame(renderFrame);
      if (!jState.active) return;

      const cv = $("journey-3d-canvas");
      if (!cv) return;
      const w = (cv.width = window.innerWidth);
      const h = (cv.height = window.innerHeight);
      const ctx = cv.getContext("2d");
      const t = now * 0.001;
      const expert = isExpertProfile();
      const act = JOURNEY_ACTS[jState.actIdx] || JOURNEY_ACTS[0];

      // 1. Fond spatial
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 30, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
      if (act.id === "edl" || act.id === "surface") {
        bg.addColorStop(0, expert ? "#1e1b18" : "#7c2d12");
        bg.addColorStop(0.6, expert ? "#29150c" : "#9a3412");
        bg.addColorStop(1, "#020617");
      } else {
        bg.addColorStop(0, expert ? "#030b1a" : "#0f172a");
        bg.addColorStop(1, "#020617");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Champ d'étoiles avec parallaxe
      for (let i = 0; i < 110; i++) {
        const sx = ((i * 137 + t * (act.id === "transit" ? 35 : 6)) % w);
        const sy = ((i * 89) % (h * 0.72));
        const alpha = 0.35 + 0.65 * Math.sin(t * 2.2 + i);
        ctx.fillStyle = expert && i % 7 === 0 ? `rgba(56,189,248,${alpha})` : `rgba(255,255,255,${alpha})`;
        ctx.fillRect(sx, sy, i % 5 === 0 ? 2.4 : 1.4, i % 5 === 0 ? 2.4 : 1.4);
      }

      // Grille orbitale scientifique en mode Expert
      if (expert) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.14)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.42, w * 0.36, h * 0.17, -0.12, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* ---------------- ACTE 1 : DÉCOLLAGE DEPUIS LA TERRE ---------------- */
      if (act.id === "launch") {
        // Courbure de la Terre en bas
        const earthR = Math.min(w, h) * 0.55;
        const earthX = w * 0.5;
        const earthY = h * 0.78 + earthR * 0.68;

        const earthGrad = ctx.createRadialGradient(earthX - 60, earthY - earthR * 0.6, 40, earthX, earthY, earthR);
        earthGrad.addColorStop(0, "#38bdf8");
        earthGrad.addColorStop(0.55, "#1d4ed8");
        earthGrad.addColorStop(0.92, "#1e3a8a");
        earthGrad.addColorStop(1, "#60a5fa");
        ctx.fillStyle = earthGrad;
        ctx.beginPath();
        ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
        ctx.fill();

        // Halo atmosphérique
        ctx.strokeStyle = "rgba(125, 211, 252, 0.55)";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(earthX, earthY, earthR + 4, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        // Continents stylisés
        ctx.fillStyle = "rgba(34, 197, 94, 0.55)";
        ctx.beginPath();
        ctx.ellipse(earthX - 70, earthY - earthR * 0.72, 95, 36, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Fusée qui monte avec panache de flammes
        const rx = w * 0.5 + Math.sin(t * 9) * 1.5;
        const ry = h * 0.36 - Math.sin(t * 1.5) * 12;

        // Flamme propulseur
        const flameH = 48 + Math.sin(t * 35) * 12;
        const fGrad = ctx.createLinearGradient(rx, ry + 34, rx, ry + 34 + flameH);
        fGrad.addColorStop(0, "#ffffff");
        fGrad.addColorStop(0.35, expert ? "#38bdf8" : "#facc15");
        fGrad.addColorStop(1, "rgba(234, 88, 12, 0)");
        ctx.fillStyle = fGrad;
        ctx.beginPath();
        ctx.moveTo(rx - 12, ry + 34);
        ctx.lineTo(rx + 12, ry + 34);
        ctx.lineTo(rx, ry + 34 + flameH);
        ctx.closePath();
        ctx.fill();

        // Corps de la fusée
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(rx - 13, ry - 26, 26, 60);
        // Coiffe
        ctx.fillStyle = expert ? "#0284c7" : "#ea580c";
        ctx.beginPath();
        ctx.moveTo(rx - 13, ry - 26);
        ctx.lineTo(rx + 13, ry - 26);
        ctx.lineTo(rx, ry - 52);
        ctx.closePath();
        ctx.fill();
        // Ailerons
        ctx.beginPath();
        ctx.moveTo(rx - 13, ry + 16);
        ctx.lineTo(rx - 25, ry + 36);
        ctx.lineTo(rx - 13, ry + 34);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(rx + 13, ry + 16);
        ctx.lineTo(rx + 25, ry + 36);
        ctx.lineTo(rx + 13, ry + 34);
        ctx.fill();

        if (expert) {
          ctx.strokeStyle = "#38bdf8";
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(rx, ry - 55);
          ctx.quadraticCurveTo(rx + 90, ry - 130, w * 0.78, h * 0.18);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        return;
      }

      /* ---------------- ACTE 2 : TRANSIT TERRE -> MARS ---------------- */
      if (act.id === "transit") {
        const ex = w * 0.16, ey = h * 0.44;
        const mx = w * 0.84, my = h * 0.34;

        // Terre à gauche
        ctx.fillStyle = "#2563eb";
        ctx.beginPath();
        ctx.arc(ex, ey, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(ex - 8, ey - 6, 13, 0, Math.PI * 2);
        ctx.fill();

        // Mars à droite
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(mx, my, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#9a3412";
        ctx.beginPath();
        ctx.arc(mx + 6, my - 5, 9, 0, Math.PI * 2);
        ctx.fill();

        // Trajectoire de transfert de Hohmann
        ctx.strokeStyle = expert ? "#38bdf8" : "#facc15";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(ex + 38, ey);
        ctx.quadraticCurveTo(w * 0.5, h * 0.18, mx - 32, my);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vaisseau en transit au centre
        const sx = w * 0.5;
        const sy = h * 0.31 + Math.sin(t * 2.2) * 8;
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(sx - 24, sy - 9, 48, 18);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(sx - 12, sy - 28, 24, 16);
        ctx.fillRect(sx - 12, sy + 12, 24, 16);

        // Ondes d'éruption solaire depuis le haut-gauche
        for (let i = 0; i < 4; i++) {
          const r = ((t * 95 + i * 65) % 280);
          ctx.strokeStyle = `rgba(251, 146, 60, ${Math.max(0, 0.65 - r / 320)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(w * 0.34, h * 0.12, r, 0.2, 1.4);
          ctx.stroke();
        }
        return;
      }

      /* ---------------- ACTE 3 : ENTRÉE, DESCENTE & ATTERRISSAGE ---------------- */
      if (act.id === "edl") {
        // Horizon martien en bas
        ctx.fillStyle = "#7c2d12";
        ctx.beginPath();
        ctx.moveTo(0, h * 0.68);
        ctx.quadraticCurveTo(w * 0.5, h * 0.60, w, h * 0.70);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();

        const cx = w * 0.5 + Math.sin(t * 2.5) * 18;
        const cy = h * 0.36 + Math.sin(t * 1.6) * 14;

        // Parachute supersonique
        ctx.fillStyle = expert ? "#0284c7" : "#f97316";
        ctx.beginPath();
        ctx.arc(cx, cy - 68, 46, Math.PI, 0);
        ctx.closePath();
        ctx.fill();

        // Suspentes
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 42, cy - 68);
        ctx.lineTo(cx - 10, cy - 12);
        ctx.moveTo(cx + 42, cy - 68);
        ctx.lineTo(cx + 10, cy - 12);
        ctx.stroke();

        // Capsule d'atterrissage + rétrofusées
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath();
        ctx.moveTo(cx - 22, cy + 8);
        ctx.lineTo(cx + 22, cy + 8);
        ctx.lineTo(cx + 12, cy - 14);
        ctx.lineTo(cx - 12, cy - 14);
        ctx.closePath();
        ctx.fill();

        // Flammes des rétrofusées de freinage
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.moveTo(cx - 14, cy + 8);
        ctx.lineTo(cx - 8, cy + 8);
        ctx.lineTo(cx - 11, cy + 28 + Math.sin(t * 30) * 6);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx + 8, cy + 8);
        ctx.lineTo(cx + 14, cy + 8);
        ctx.lineTo(cx + 11, cy + 28 + Math.cos(t * 30) * 6);
        ctx.fill();
        return;
      }

      /* ---------------- ACTE 4 : POSÉ SUR MARS (BASE & ROVER) ---------------- */
      ctx.fillStyle = "#9a3412";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.62);
      ctx.quadraticCurveTo(w * 0.35, h * 0.54, w * 0.7, h * 0.63);
      ctx.quadraticCurveTo(w * 0.88, h * 0.67, w, h * 0.60);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Dôme de la base ARES-01 posé sur Mars
      const bx = w * 0.38, by = h * 0.61;
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(bx, by, 54, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(bx - 24, by - 22, 48, 12);

      // Rover Perseverance devant la base
      const rvx = w * 0.62 + Math.sin(t * 1.2) * 20;
      const rvy = h * 0.62;
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(rvx - 22, rvy - 18, 44, 14);
      ctx.fillStyle = "#1e293b";
      [-14, 0, 14].forEach((ox) => {
        ctx.beginPath();
        ctx.arc(rvx + ox, rvy, 5.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    requestAnimationFrame(renderFrame);
  }

  /* ========================================================================
     3. AFFICHAGE & INTERACTION DU VOYAGE EN 4 ACTES
     ======================================================================== */
  function openSpaceJourney(startAct = 0) {
    let modal = $("space-journey-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "space-journey-modal";
      document.body.appendChild(modal);
    }

    jState.active = true;
    jState.actIdx = startAct;
    jState.consequenceText = null;
    jState.lastWasOk = true;

    const expert = isExpertProfile();
    modal.classList.toggle("expert-theme", expert);
    modal.classList.add("active");
    startJourneyCanvasLoop();
    renderSpaceJourneyUI();
  }

  function closeSpaceJourney() {
    jState.active = false;
    const modal = $("space-journey-modal");
    if (modal) modal.classList.remove("active");
    localStorage.setItem(JOURNEY_DONE_KEY, "1");
  }

  function renderSpaceJourneyUI() {
    const modal = $("space-journey-modal");
    if (!modal) return;

    const expert = isExpertProfile();
    modal.classList.toggle("expert-theme", expert);
    const act = JOURNEY_ACTS[jState.actIdx] || JOURNEY_ACTS[0];
    const choices = expert ? act.choicesExpert : act.choicesJunior;
    const story = expert ? act.storyExpert : act.storyJunior;
    const title = expert ? act.titleExpert : act.titleJunior;
    const kicker = expert ? act.kickerExpert : act.kickerJunior;

    speakLily(`${title}. ${jState.consequenceText || story}`);

    const resSummary = typeof state !== "undefined"
      ? `💧 Eau ${Math.round(state.eau)}% • 🫧 Air ${Math.round(state.oxygene)}% • ⚡ Énergie ${Math.round(state.energie)}% • 🛠️ Coque ${Math.round(state.integrite)}%`
      : "";

    modal.innerHTML = `
      <canvas id="journey-3d-canvas"></canvas>

      <div class="sj-topbar">
        <div class="sj-acts-bar">
          ${JOURNEY_ACTS.map((a, idx) => `
            <span class="sj-act-pill ${idx < jState.actIdx ? "done" : idx === jState.actIdx ? "current" : ""}">
              ${expert ? a.pillExpert : a.pillJunior}
            </span>
          `).join("")}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:#cbd5e1">${resSummary}</span>
          <button type="button" class="ao-btn ao-btn-back" style="padding:7px 13px;font-size:12px" id="sj-skip-btn">
            ${expert ? "SKIP TO SURFACE OPS ⏭" : "Aller directement sur Mars ⏭"}
          </button>
        </div>
      </div>

      <div class="sj-expert-telemetry">
        <div class="sj-telem-box"><small>TRAJECTORY PHASE</small><strong>${act.telemetry.phase}</strong></div>
        <div class="sj-telem-box"><small>DELTA-V BUDGET</small><strong>${act.telemetry.dv}</strong></div>
        <div class="sj-telem-box"><small>RANGE / ALTITUDE</small><strong>${act.telemetry.dist}</strong></div>
        <div class="sj-telem-box"><small>RADIATION FLUX</small><strong>${act.telemetry.rad}</strong></div>
        <div class="sj-telem-box"><small>CREW & HULL</small><strong>${typeof state !== "undefined" ? Math.round(state.integrite) + " %" : act.telemetry.hull}</strong></div>
      </div>

      <div class="sj-bottom-stage">
        <div class="sj-dialogue-wrap">
          <div class="sj-lily-card">
            <svg viewBox="0 0 100 110" width="76" height="84" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="54" r="38" fill="#1e3a8a" stroke="#38bdf8" stroke-width="3"/>
              <circle cx="50" cy="56" r="27" fill="#fde68a"/>
              <circle cx="41" cy="52" r="4" fill="#0f172a"/>
              <circle cx="59" cy="52" r="4" fill="#0f172a"/>
              <path d="M41,65 Q50,74 59,65" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
              <path d="M22,44 Q50,20 78,44" fill="none" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
            </svg>
            <div style="font-size:12px;font-weight:900;color:#7dd3fc;margin-top:4px">LILY • GUIDE</div>
          </div>

          <div class="sj-narrative-card">
            <div class="sj-kicker">${kicker}</div>
            <h2 class="sj-title">${title}</h2>
            <p class="sj-story-text">${story}</p>

            ${jState.consequenceText ? `
              <div class="${jState.lastWasOk ? "sj-ok-alert" : "sj-degraded-alert"}">
                <strong>${jState.lastWasOk ? "✅ MANŒUVRE RÉUSSIE :" : "⚠️ ALERTE SYSTÈME (LA MISSION CONTINUE EN MODE DÉGRADÉ) :"}</strong>
                ${jState.consequenceText}
              </div>
              <div style="display:flex;justify-content:flex-end">
                <button type="button" class="ao-btn ao-btn-next" id="sj-next-act-btn">
                  ${jState.actIdx < JOURNEY_ACTS.length - 1
                    ? (expert ? "PROCEED TO NEXT MISSION PHASE →" : "Continuer le voyage vers Mars →")
                    : (expert ? "INITIALIZE SURFACE COMMAND (SOL 1) →" : "Commencer les missions sur Mars ! 🚀")}
                </button>
              </div>
            ` : choices ? `
              <div class="sj-choices-grid">
                ${choices.map((ch, idx) => `
                  <button type="button" class="sj-choice-btn" data-sj-choice="${idx}">
                    <strong>${ch.title}</strong>
                    <span>${ch.desc}</span>
                  </button>
                `).join("")}
              </div>
            ` : `
              <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end">
                <button type="button" class="ao-btn ao-btn-next" id="sj-enter-mars-btn">
                  ${expert ? "ENTER MARS SURFACE TELEMETRY (SOL 1) →" : "Découvrir la 1ère question sur Mars ! 🚀"}
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    $("sj-skip-btn").onclick = () => {
      closeSpaceJourney();
      if (typeof renderMissionView === "function") renderMissionView();
    };

    if ($("sj-next-act-btn")) {
      $("sj-next-act-btn").onclick = () => {
        jState.actIdx += 1;
        jState.consequenceText = null;
        renderSpaceJourneyUI();
      };
    }

    if ($("sj-enter-mars-btn")) {
      $("sj-enter-mars-btn").onclick = () => {
        closeSpaceJourney();
        if (typeof renderMissionView === "function") renderMissionView();
      };
    }

    modal.querySelectorAll("[data-sj-choice]").forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.sjChoice);
        const picked = choices[idx];
        if (!picked) return;

        // Appliquer les impacts réels sur les ressources de la colonie (mode dégradé si erreur)
        if (typeof state !== "undefined" && picked.impacts) {
          Object.entries(picked.impacts).forEach(([k, delta]) => {
            if (typeof state[k] === "number") {
              state[k] = Math.max(5, Math.min(100, state[k] + delta));
            }
          });
          if (typeof saveState === "function") saveState();
        }

        jState.lastWasOk = !!picked.ok;
        jState.consequenceText = picked.consequence;
        renderSpaceJourneyUI();
      };
    });
  }

  /* ========================================================================
     4. INTÉGRATION DANS LA BARRE D'OUTILS & DÉCLENCHEMENT APRÈS LE PROFIL
     ======================================================================== */
  function syncCockpitTheme() {
    document.body.classList.toggle("expert-cockpit-mode", isExpertProfile());
    const tb = $("env-toolbar");
    if (tb && !$("tb-journey-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "tb-journey-btn";
      btn.className = "env-btn";
      btn.style.background = "linear-gradient(135deg, #ea580c, #2563eb)";
      btn.style.color = "#ffffff";
      btn.style.fontWeight = "800";
      btn.textContent = "🚀 Voyage Terre → Mars";
      btn.onclick = () => openSpaceJourney(0);
      tb.appendChild(btn);
    }
  }

  // Exposer globalement pour pouvoir le lancer à tout moment
  window.openSpaceJourney = openSpaceJourney;

  // Intercepter la fin de l'onboarding (Profil Enfant ou Profil Scientifique)
  // pour lancer automatiquement la cinématique Terre -> Espace -> Mars !
  document.addEventListener("click", (e) => {
    const target = e.target.closest("#ao-start-normal, #ao-start-astro, #ao-pick-expert");
    if (!target) return;

    // Si l'utilisateur vient de choisir son profil et n'a pas encore vécu le voyage Terre -> Mars
    setTimeout(() => {
      syncCockpitTheme();
      if (!localStorage.getItem(JOURNEY_DONE_KEY)) {
        openSpaceJourney(0);
      }
    }, 180);
  });

  window.addEventListener("DOMContentLoaded", () => {
    syncCockpitTheme();
    const obs = new MutationObserver(() => syncCockpitTheme());
    obs.observe(document.body, { childList: true, subtree: true });
  });
})();
