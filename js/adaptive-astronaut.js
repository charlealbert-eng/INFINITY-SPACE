/* ==========================================================================
   INFINITY SPACE — SYSTÈME ADAPTATIF (7-12 ANS & EXPERTS), AMBIANCES & CASQUE 3D
   Extension modulaire : préserve 100 % des fonctionnalités existantes.
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);

  const PROFILE_KEY = "infinity_kid_profile";
  const ENV_THEME_KEY = "infinity_env_theme";
  const AUTO_ASTRO_KEY = "infinity_auto_astronaut";

  function getKidProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveKidProfile(prof) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(prof));
    } catch (e) {}
  }

  function isExpertMode() {
    return localStorage.getItem("infinity_mode") === "aria";
  }

  /* ========================================================================
     1. QUESTIONNAIRE & TEST D'EXPÉRIENCE POUR LES 7-12 ANS + ACCÈS DIRECT EXPERTS
     ======================================================================== */
  const QUIZ_STATE = {
    step: 0, // 0 = choix public (7-12 ans vs Experts), 1..4 = questionnaire enfant, 5 = résultat profil
    experience: "regular",
    genres: [],
    interests: [],
    q1: null,
    q2: null
  };

  function computeKidProfile() {
    let score = 0;
    if (QUIZ_STATE.experience === "pro") score += 3;
    else if (QUIZ_STATE.experience === "regular") score += 1;

    if (QUIZ_STATE.genres.includes("action")) score += 2;
    if (QUIZ_STATE.genres.includes("strategy")) score += 2;
    if (QUIZ_STATE.genres.includes("adventure")) score += 1;

    if (QUIZ_STATE.q1 === "a") score += 2;
    if (QUIZ_STATE.q2 === "a") score += 2;

    const isPro = score >= 4;
    const interestLabels = {
      rovers: "Pilote de Rovers",
      rockets: "Explorateur Spatial",
      science: "Détective Scientifique",
      bio: "Bio-Ingénieur Martien"
    };
    const mainInterest = QUIZ_STATE.interests[0]
      ? interestLabels[QUIZ_STATE.interests[0]]
      : "Explorateur Martien";

    return {
      tier: isPro ? "pro" : "junior",
      title: isPro
        ? `Commandant Tactique • ${mainInterest}`
        : `Explorateur Junior • ${mainInterest}`,
      score,
      experience: QUIZ_STATE.experience,
      genres: QUIZ_STATE.genres.slice(),
      interests: QUIZ_STATE.interests.slice()
    };
  }

  // Enrichissement des énoncés pour les enfants habitués aux jeux complexes (10-12 ans / profil "pro")
  const PRO_KID_UPGRADES = [
    {
      desc: "Atterrissage dans le cratère Jezero (pression 610 Pa, −60 °C la nuit). Tes capteurs indiquent une chute thermique rapide : comment sécuriser la base et l'énergie dès le Sol 1 ?",
      advice: "Analyse le bilan énergétique et thermique avant de lancer une sortie extravéhiculaire !"
    },
    {
      desc: "L'unité MOXIE d'électrolyse du CO₂ présente une micro-fuite de pression. Le débit d'O₂ baisse alors que l'équipage consomme ses réserves.",
      advice: "Compare le rendement énergétique d'une réparation ciblée face à une surcharge du compresseur."
    },
    {
      desc: "Des particules fines d'oxyde de fer obstruent la boucle de filtration d'eau (recyclage normalement à 98 %). Les réserves potables diminuent.",
      advice: "Privilégie une solution durable pour le circuit hydraulique plutôt qu'un simple rationnement."
    },
    {
      desc: "Dans la serre hydroponique, la conductivité nutritive et le spectre lumineux LED sont déséquilibrés : la photosynthèse ralentit.",
      advice: "Les plantes produisent à la fois des calories et de l'O₂ : optimise leur cycle !"
    },
    {
      desc: "Une couche de poussière électrostatique recouvre 40 % des panneaux photovoltaïques, réduisant la puissance électrique disponible.",
      advice: "Choisis entre le nettoyage électrostatique automatisé, l'orientation solaire ou une sortie risquée."
    },
    {
      desc: "Alerte NASA DONKI : une éruption solaire projette un flux de protons vers Mars (sans champ magnétique global pour nous protéger).",
      advice: "L'eau et le régolithe absorbent les radiations : utilise la physique à ton avantage !"
    },
    {
      desc: "Une tempête de poussière globale réduit l'ensoleillement de 75 % sur Jezero. Les batteries entrent en zone critique.",
      advice: "Passe en gestion tactique des charges : coupe le superflu et protège les systèmes vitaux."
    },
    {
      desc: "Après la tempête, la pompe primaire du circuit de chauffage est grippée par le régolithe martien.",
      advice: "Utilise la redondance matérielle (pompe de secours) sans endommager l'intégrité du module."
    },
    {
      desc: "Test d'autonomie intégrée : la Terre est à plusieurs minutes-lumière de délai radio. Tu dois équilibrer air, eau, serre et énergie en autonomie.",
      advice: "Synchronise tous les sous-systèmes : chaque ressource influence les autres."
    },
    {
      desc: "Sol 10 — Validation finale de l'avant-poste ARES-01 : stabilise toutes les jauges vitales et transmets la télémétrie complète à la Terre.",
      advice: "Dernière ligne droite, Commandant : assure la sécurité de l'équipage avant la transmission !"
    }
  ];

  function applyKidProfileAdaptations() {
    if (isExpertMode()) {
      document.body.classList.remove("kid-pro");
      return;
    }
    const prof = getKidProfile();
    if (!prof) return;

    if (prof.tier === "pro") {
      document.body.classList.add("kid-pro");
      if (typeof MISSIONS_DATA !== "undefined") {
        MISSIONS_DATA.forEach((m, idx) => {
          const up = PRO_KID_UPGRADES[idx];
          if (up && !m._proUpgraded) {
            m._proUpgraded = true;
            m.description.fr = up.desc;
            m.ariaAdvice.fr = up.advice;
          }
        });
      }
    } else {
      document.body.classList.remove("kid-pro");
    }

    const hud = $("tactical-kid-hud");
    if (hud) {
      hud.innerHTML = `
        <span>🎖️ <strong>${prof.title}</strong></span>
        <span>📊 Niveau interface : <strong>${prof.tier === "pro" ? "TACTIQUE AVANCÉ" : "EXPLORATEUR"}</strong></span>
      `;
    }
  }

  function openOnboardingModal(forceStep = 0) {
    // Masquer l'ancien sélecteur basique de lili-stage.js s'il existe
    const oldOv = $("modeOv");
    if (oldOv) oldOv.remove();

    QUIZ_STATE.step = forceStep;
    let ov = $("adaptive-onboard");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "adaptive-onboard";
      document.body.appendChild(ov);
    }
    ov.classList.remove("hidden");
    renderOnboardingStep();
  }

  function renderOnboardingStep() {
    const ov = $("adaptive-onboard");
    if (!ov) return;

    if (QUIZ_STATE.step === 0) {
      ov.innerHTML = `
        <div class="ao-card">
          <div class="ao-badge">🚀 INFINITY SPACE • EXPÉRIENCE ADAPTATIVE</div>
          <h1 class="ao-title">Bienvenue sur Mars ! Qui prend les commandes ?</h1>
          <p class="ao-sub">
            L'interface, le niveau des défis et l'immersion s'adaptent automatiquement à ton profil et à ton expérience.
          </p>
          <div class="ao-audience-grid">
            <button type="button" class="ao-aud-btn ao-aud-kid" id="ao-pick-kid">
              <span class="ao-aud-icon">🧸🎮</span>
              <span class="ao-aud-name">Jeunes Explorateurs (7 à 12 ans)</span>
              <span class="ao-aud-desc">
                Passe un mini-test rapide sur tes jeux préférés (Fortnite, Mario, Duolingo, jeux de société…) pour adapter l'interface et la difficulté à ton niveau !
              </span>
              <span class="ao-aud-pill">✨ Test personnalisé + Lili + Mode Astronaute</span>
            </button>

            <button type="button" class="ao-aud-btn ao-aud-expert" id="ao-pick-expert">
              <span class="ao-aud-icon">🧑‍🚀🛰️</span>
              <span class="ao-aud-name">Experts, Scientifiques & Étudiants</span>
              <span class="ao-aud-desc">
                Immersion immédiate dans la peau d'un astronaute sur Mars : combinaison spatiale, casque HUD 3D à 360° et missions scientifiques NASA DONKI & RadLab chargées directement.
              </span>
              <span class="ao-aud-pill">⚡ Chargement direct en combinaison d'astronaute</span>
            </button>
          </div>
        </div>
      `;

      $("ao-pick-kid").onclick = () => {
        QUIZ_STATE.step = 1;
        renderOnboardingStep();
      };

      $("ao-pick-expert").onclick = () => {
        localStorage.setItem("infinity_mode", "aria");
        localStorage.setItem(AUTO_ASTRO_KEY, "1");
        if (!isExpertMode()) {
          location.reload();
          return;
        }
        ov.classList.add("hidden");
        if (typeof state !== "undefined") {
          state.started = true;
          if (typeof saveState === "function") saveState();
        }
        if (typeof renderMissionView === "function") renderMissionView();
        if (typeof switchView === "function") switchView("view-mission");
        openAstronautMode(true);
      };
      return;
    }

    if (QUIZ_STATE.step === 1) {
      const opts = [
        { id: "beginner", icon: "🌱", title: "Débutant / Joueur tranquille", desc: "J'aime les jeux simples, clairs et faciles à comprendre." },
        { id: "regular", icon: "🎮", title: "Joueur régulier", desc: "Je joue souvent sur téléphone, tablette ou console." },
        { id: "pro", icon: "🔥", title: "Gamer expérimenté / Pro", desc: "J'ai l'habitude des jeux complexes, rapides et des grandes interfaces !" }
      ];
      ov.innerHTML = `
        <div class="ao-card">
          <div class="ao-progress"><i class="on"></i><i></i><i></i><i></i></div>
          <div class="ao-badge">ÉTAPE 1 / 4 • TON EXPÉRIENCE GAMING</div>
          <h2 class="ao-title">As-tu l'habitude de jouer aux jeux vidéo ?</h2>
          <p class="ao-sub">Cela nous aide à choisir entre une interface simple et guidée ou un poste de commandement plus complet.</p>
          <div class="ao-options-grid">
            ${opts.map((o) => `
              <button type="button" class="ao-opt ${QUIZ_STATE.experience === o.id ? "selected" : ""}" data-exp="${o.id}">
                <div class="ao-opt-top"><span>${o.icon}</span><span>${o.title}</span></div>
                <small>${o.desc}</small>
              </button>
            `).join("")}
          </div>
          <div class="ao-footer">
            <button type="button" class="ao-btn ao-btn-back" id="ao-prev">← Retour</button>
            <button type="button" class="ao-btn ao-btn-next" id="ao-next">Suivant →</button>
          </div>
        </div>
      `;
      ov.querySelectorAll("[data-exp]").forEach((btn) => {
        btn.onclick = () => {
          QUIZ_STATE.experience = btn.dataset.exp;
          renderOnboardingStep();
        };
      });
      $("ao-prev").onclick = () => { QUIZ_STATE.step = 0; renderOnboardingStep(); };
      $("ao-next").onclick = () => { QUIZ_STATE.step = 2; renderOnboardingStep(); };
      return;
    }

    if (QUIZ_STATE.step === 2) {
      const genres = [
        { id: "action", icon: "⚔️", title: "Action / Tir / Compétitif", desc: "Ex. Fortnite, Brawl Stars, jeux d'action rapides" },
        { id: "adventure", icon: "🍄", title: "Aventure / Plateforme", desc: "Ex. Mario, Minecraft, Zelda, exploration" },
        { id: "quiz", icon: "🧠", title: "Quiz / Éducatif", desc: "Ex. Duolingo, Kahoot, jeux de questions" },
        { id: "strategy", icon: "♟️", title: "Stratégie / Jeux de société", desc: "Ex. Monopoly, Clash Royale, gestion de base" },
        { id: "casual", icon: "🧩", title: "Jeux simples / Puzzle", desc: "Ex. Candy Crush, petits jeux rapides" }
      ];
      ov.innerHTML = `
        <div class="ao-card">
          <div class="ao-progress"><i class="on"></i><i class="on"></i><i></i><i></i></div>
          <div class="ao-badge">ÉTAPE 2 / 4 • TES JEUX PRÉFÉRÉS</div>
          <h2 class="ao-title">Quel genre de jeux as-tu l'habitude de jouer ?</h2>
          <p class="ao-sub">Tu peux en choisir un ou plusieurs !</p>
          <div class="ao-options-grid">
            ${genres.map((g) => `
              <button type="button" class="ao-opt ${QUIZ_STATE.genres.includes(g.id) ? "selected" : ""}" data-genre="${g.id}">
                <div class="ao-opt-top"><span>${g.icon}</span><span>${g.title}</span></div>
                <small>${g.desc}</small>
              </button>
            `).join("")}
          </div>
          <div class="ao-footer">
            <button type="button" class="ao-btn ao-btn-back" id="ao-prev">← Retour</button>
            <button type="button" class="ao-btn ao-btn-next" id="ao-next">Suivant →</button>
          </div>
        </div>
      `;
      ov.querySelectorAll("[data-genre]").forEach((btn) => {
        btn.onclick = () => {
          const id = btn.dataset.genre;
          const idx = QUIZ_STATE.genres.indexOf(id);
          if (idx >= 0) QUIZ_STATE.genres.splice(idx, 1);
          else QUIZ_STATE.genres.push(id);
          renderOnboardingStep();
        };
      });
      $("ao-prev").onclick = () => { QUIZ_STATE.step = 1; renderOnboardingStep(); };
      $("ao-next").onclick = () => { QUIZ_STATE.step = 3; renderOnboardingStep(); };
      return;
    }

    if (QUIZ_STATE.step === 3) {
      const interests = [
        { id: "rovers", icon: "🤖", title: "Robots & Rovers sur Mars", desc: "Piloter Perseverance et explorer les roches martiennes" },
        { id: "rockets", icon: "🚀", title: "Fusées & Étoiles", desc: "Voyager dans l'espace et observer les planètes" },
        { id: "science", icon: "🔬", title: "Énigmes & Science", desc: "Comprendre comment survivre aux tempêtes solaires" },
        { id: "bio", icon: "🌱", title: "Plantes & Vie sur Mars", desc: "Cultiver un potager spatial et recycler l'eau" }
      ];
      ov.innerHTML = `
        <div class="ao-card">
          <div class="ao-progress"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
          <div class="ao-badge">ÉTAPE 3 / 4 • CE QUE TU AIMES</div>
          <h2 class="ao-title">Qu'est-ce qui te plaît le plus dans l'espace ?</h2>
          <p class="ao-sub">Nous allons personnaliser tes animations et ta mission selon tes goûts.</p>
          <div class="ao-options-grid">
            ${interests.map((it) => `
              <button type="button" class="ao-opt ${QUIZ_STATE.interests.includes(it.id) ? "selected" : ""}" data-int="${it.id}">
                <div class="ao-opt-top"><span>${it.icon}</span><span>${it.title}</span></div>
                <small>${it.desc}</small>
              </button>
            `).join("")}
          </div>
          <div class="ao-footer">
            <button type="button" class="ao-btn ao-btn-back" id="ao-prev">← Retour</button>
            <button type="button" class="ao-btn ao-btn-next" id="ao-next">Passer au mini-défi →</button>
          </div>
        </div>
      `;
      ov.querySelectorAll("[data-int]").forEach((btn) => {
        btn.onclick = () => {
          const id = btn.dataset.int;
          const idx = QUIZ_STATE.interests.indexOf(id);
          if (idx >= 0) QUIZ_STATE.interests.splice(idx, 1);
          else QUIZ_STATE.interests.push(id);
          renderOnboardingStep();
        };
      });
      $("ao-prev").onclick = () => { QUIZ_STATE.step = 2; renderOnboardingStep(); };
      $("ao-next").onclick = () => { QUIZ_STATE.step = 4; renderOnboardingStep(); };
      return;
    }

    if (QUIZ_STATE.step === 4) {
      ov.innerHTML = `
        <div class="ao-card">
          <div class="ao-progress"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
          <div class="ao-badge">ÉTAPE 4 / 4 • MINI-TEST D'ASTRONAUTE</div>
          <h2 class="ao-title">Deux petites questions avant le décollage !</h2>
          <p class="ao-sub">Montre-nous comment tu réagis face à un imprévu sur Mars.</p>

          <div style="margin-bottom:14px">
            <strong>1. Une tempête de poussière cache le Soleil sur Mars. Que fais-tu en priorité ?</strong>
            <div class="ao-options-grid" style="margin-top:8px">
              <button type="button" class="ao-opt ${QUIZ_STATE.q1 === "a" ? "selected" : ""}" data-q1="a">
                <div class="ao-opt-top"><span>🔋</span><span>Économiser l'énergie pour le chauffage et l'air</span></div>
              </button>
              <button type="button" class="ao-opt ${QUIZ_STATE.q1 === "b" ? "selected" : ""}" data-q1="b">
                <div class="ao-opt-top"><span>💡</span><span>Allumer toutes les lumières à fond</span></div>
              </button>
            </div>
          </div>

          <div>
            <strong>2. Le radar affiche « ALERTE ÉRUPTION SOLAIRE ». Quelle est la bonne réaction ?</strong>
            <div class="ao-options-grid" style="margin-top:8px">
              <button type="button" class="ao-opt ${QUIZ_STATE.q2 === "a" ? "selected" : ""}" data-q2="a">
                <div class="ao-opt-top"><span>🛡️</span><span>Activer le bouclier et s'abriter derrière les réservoirs d'eau</span></div>
              </button>
              <button type="button" class="ao-opt ${QUIZ_STATE.q2 === "b" ? "selected" : ""}" data-q2="b">
                <div class="ao-opt-top"><span>🚶</span><span>Sortir dehors sans casque pour observer</span></div>
              </button>
            </div>
          </div>

          <div class="ao-footer">
            <button type="button" class="ao-btn ao-btn-back" id="ao-prev">← Retour</button>
            <button type="button" class="ao-btn ao-btn-next" id="ao-finish">✨ Découvrir mon profil !</button>
          </div>
        </div>
      `;
      ov.querySelectorAll("[data-q1]").forEach((b) => {
        b.onclick = () => { QUIZ_STATE.q1 = b.dataset.q1; renderOnboardingStep(); };
      });
      ov.querySelectorAll("[data-q2]").forEach((b) => {
        b.onclick = () => { QUIZ_STATE.q2 = b.dataset.q2; renderOnboardingStep(); };
      });
      $("ao-prev").onclick = () => { QUIZ_STATE.step = 3; renderOnboardingStep(); };
      $("ao-finish").onclick = () => {
        const prof = computeKidProfile();
        saveKidProfile(prof);
        QUIZ_STATE.step = 5;
        renderOnboardingStep();
      };
      return;
    }

    if (QUIZ_STATE.step === 5) {
      const prof = getKidProfile() || computeKidProfile();
      const wasAria = isExpertMode();
      localStorage.setItem("infinity_mode", "lili");
      localStorage.removeItem(AUTO_ASTRO_KEY);

      ov.innerHTML = `
        <div class="ao-card" style="text-align:center">
          <div class="ao-badge">🎉 PROFIL CALIBRÉ SUR MESURE</div>
          <h2 class="ao-title">${prof.title}</h2>
          <div class="ao-result-banner">
            <p style="margin:0 0 8px;font-size:16px">
              ${prof.tier === "pro"
                ? "🔥 <strong>Interface Tactique & Défis Relevés activés !</strong> Comme tu as l'habitude des jeux complexes, ton tableau de bord affiche toutes les ressources détaillées et des missions plus stratégiques."
                : "🌟 <strong>Interface Explorateur & Aventure Guidée activées !</strong> Lili t'accompagne avec des repères clairs, des animations et des énigmes super amusantes."}
            </p>
            <p style="margin:0;font-size:14px;color:#fde047">
              💡 Astuce : dans le jeu, tu pourras aussi activer le <strong>Mode Nuit 🌙</strong>, le <strong>Mode Étoiles ✨</strong> ou enfiler ta <strong>combinaison d'astronaute en 3D 🧑‍🚀</strong> !
            </p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:16px">
            <button type="button" class="ao-btn ao-btn-next" id="ao-start-normal">🚀 Jouer maintenant</button>
            <button type="button" class="ao-btn ao-btn-back" style="border:2px solid #38bdf8;color:#7dd3fc" id="ao-start-astro">🧑‍🚀 Enfiler la combinaison d'astronaute (3D)</button>
          </div>
        </div>
      `;

      const launchKidGame = (withAstronaut) => {
        if (wasAria) {
          if (withAstronaut) localStorage.setItem(AUTO_ASTRO_KEY, "1");
          location.reload();
          return;
        }
        ov.classList.add("hidden");
        const introKid = $("intro-kid");
        if (introKid) introKid.remove();
        applyKidProfileAdaptations();
        if (typeof state !== "undefined") {
          state.started = true;
          if (typeof saveState === "function") saveState();
        }
        if (typeof renderMissionView === "function") renderMissionView();
        if (typeof switchView === "function") switchView("view-mission");
        if (withAstronaut) openAstronautMode(true);
      };

      $("ao-start-normal").onclick = () => launchKidGame(false);
      $("ao-start-astro").onclick = () => launchKidGame(true);
    }
  }

  /* ========================================================================
     2. MODES VISUELS DYNAMIQUES : MODE JOUR / MODE NUIT / MODE DANS LES ÉTOILES
     ======================================================================== */
  let starfieldInit = false;
  function initStarfieldCanvas() {
    if (starfieldInit) return;
    starfieldInit = true;
    const cv = document.createElement("canvas");
    cv.id = "starfield-canvas";
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    let w = 0, h = 0;
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 2.1,
      sp: 0.0004 + Math.random() * 0.0012,
      ph: Math.random() * Math.PI * 2
    }));
    let shoot = null;

    function resize() {
      w = cv.width = window.innerWidth;
      h = cv.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function frame(t) {
      requestAnimationFrame(frame);
      if (!document.body.classList.contains("theme-night") && !document.body.classList.contains("theme-stars")) {
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const isStarsMode = document.body.classList.contains("theme-stars");

      if (isStarsMode) {
        const grad = ctx.createRadialGradient(w * 0.7, h * 0.25, 20, w * 0.7, h * 0.25, w * 0.55);
        grad.addColorStop(0, "rgba(168, 85, 247, 0.18)");
        grad.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      stars.forEach((s) => {
        s.y -= s.sp * (isStarsMode ? 1.8 : 0.6);
        if (s.y < 0) { s.y = 1; s.x = Math.random(); }
        const alpha = 0.4 + 0.6 * Math.sin(t * 0.003 + s.ph);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r * (isStarsMode ? 1.25 : 0.9), 0, Math.PI * 2);
        ctx.fill();
      });

      if (isStarsMode && !shoot && Math.random() < 0.015) {
        shoot = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.3, vx: 11, vy: 5, life: 1 };
      }
      if (shoot) {
        ctx.strokeStyle = `rgba(125, 211, 252, ${shoot.life})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(shoot.x - shoot.vx * 5, shoot.y - shoot.vy * 5);
        ctx.stroke();
        shoot.x += shoot.vx;
        shoot.y += shoot.vy;
        shoot.life -= 0.035;
        if (shoot.life <= 0) shoot = null;
      }
    }
    requestAnimationFrame(frame);
  }

  function applyEnvTheme(theme) {
    const valid = ["day", "night", "stars"].includes(theme) ? theme : "day";
    localStorage.setItem(ENV_THEME_KEY, valid);
    document.body.classList.remove("theme-day", "theme-night", "theme-stars");
    if (!isExpertMode() || valid !== "day") {
      document.body.classList.add("theme-" + valid);
    }
    document.querySelectorAll("[data-env-theme]").forEach((b) => {
      b.classList.toggle("active", b.dataset.envTheme === valid);
    });
  }

  /* ========================================================================
     3. ANIMATIONS DE MISSION DYNAMIQUES QUI CHANGENT À CHAQUE MISSION (SOL)
     ======================================================================== */
  const MISSION_SCENES = [
    {
      id: "dust_machines",
      label: "🌪️ Machines Anti-Poussière & Base Jezero",
      desc: "Les collecteurs électrostatiques nettoient les panneaux solaires pendant le passage d'un tourbillon de poussière."
    },
    {
      id: "perseverance_rover",
      label: "🤖 Rover Perseverance & Hélicoptère Ingenuity",
      desc: "Le rover Perseverance analyse les roches du cratère Jezero au laser pendant qu'Ingenuity survole le terrain."
    },
    {
      id: "hydroponic_dome",
      label: "🌱 Serre Bio-Dôme & Recyclage Hydroponique",
      desc: "Culture des plantes sous lampes LED horticoles et production d'oxygène et d'eau pure."
    },
    {
      id: "solar_shield",
      label: "☀️ Éruption Solaire DONKI & Bouclier Magnétique",
      desc: "Le dôme magnétique de la station dévie les particules énergétiques projetées par le Soleil."
    },
    {
      id: "mars_storm",
      label: "⛈️ Grande Tempête de Poussière & Réacteur Thermique",
      desc: "La station résiste aux rafales de poussière rouge grâce à son noyau thermique isolé."
    },
    {
      id: "earth_link",
      label: "📡 Relais Orbital & Faisceau Laser Terre-Mars",
      desc: "Transmission des données scientifiques depuis l'orbite martienne jusqu'à la Terre."
    }
  ];

  // Associe automatiquement chaque Sol (1 à 10) à une animation distincte
  const SOL_TO_SCENE_IDX = [0, 1, 2, 2, 0, 3, 4, 4, 1, 5];
  let currentSceneIdx = 0;
  let animStageRunning = false;

  function ensureMissionAnimStage() {
    const center = document.querySelector("#view-mission .panel-center");
    if (!center) return;

    if (!$("tactical-kid-hud")) {
      const th = document.createElement("div");
      th.id = "tactical-kid-hud";
      center.prepend(th);
      applyKidProfileAdaptations();
    }

    if (!$("mission-anim-stage")) {
      const stage = document.createElement("div");
      stage.id = "mission-anim-stage";
      stage.innerHTML = `
        <canvas id="mission-anim-canvas"></canvas>
        <div class="mission-anim-bar">
          <div>
            <strong id="anim-scene-title" style="color:#38bdf8"></strong>
            <div id="anim-scene-desc" style="font-size:11.5px;color:#94a3b8"></div>
          </div>
          <div class="mission-anim-controls">
            <button type="button" id="anim-prev-btn">◀ Scène</button>
            <button type="button" id="anim-next-btn">Changer d'animation ▶</button>
          </div>
        </div>
      `;
      const brief = center.querySelector(".mission-brief-card");
      if (brief) center.insertBefore(stage, brief);
      else center.prepend(stage);

      $("anim-prev-btn").onclick = () => {
        currentSceneIdx = (currentSceneIdx - 1 + MISSION_SCENES.length) % MISSION_SCENES.length;
        updateSceneCaption();
      };
      $("anim-next-btn").onclick = () => {
        currentSceneIdx = (currentSceneIdx + 1) % MISSION_SCENES.length;
        updateSceneCaption();
      };
    }

    if (!$("astronaut-invite-card")) {
      const inv = document.createElement("div");
      inv.id = "astronaut-invite-card";
      inv.innerHTML = `
        <div>
          <h4>🧑‍🚀 Veux-tu véritablement être dans la peau d'un astronaute ?</h4>
          <p>Enfile ta combinaison et ton casque 3D sur Mars : regarde à gauche, à droite, devant, derrière et résous les missions sur ta visière !</p>
        </div>
        <button type="button" id="btn-enter-astronaut">🥽 Enfiler le casque (360°)</button>
      `;
      const brief = center.querySelector(".mission-brief-card");
      if (brief) brief.after(inv);
      $("btn-enter-astronaut").onclick = () => openAstronautMode(false);
    }

    startMissionStageLoop();
  }

  function updateSceneCaption() {
    const sc = MISSION_SCENES[currentSceneIdx] || MISSION_SCENES[0];
    const tEl = $("anim-scene-title");
    const dEl = $("anim-scene-desc");
    if (tEl) tEl.textContent = sc.label;
    if (dEl) dEl.textContent = sc.desc;
  }

  function startMissionStageLoop() {
    if (animStageRunning) return;
    animStageRunning = true;

    function draw(now) {
      requestAnimationFrame(draw);
      const cv = $("mission-anim-canvas");
      if (!cv || !cv.offsetParent) return;
      const w = (cv.width = cv.offsetWidth || 640);
      const h = (cv.height = 190);
      const ctx = cv.getContext("2d");
      const t = now * 0.001;
      const sc = MISSION_SCENES[currentSceneIdx] || MISSION_SCENES[0];

      // Ciel de fond adapté au thème Jour / Nuit / Étoiles
      const isNight = document.body.classList.contains("theme-night") || document.body.classList.contains("theme-stars");
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      if (sc.id === "earth_link") {
        sky.addColorStop(0, "#020617");
        sky.addColorStop(1, "#0f172a");
      } else if (isNight) {
        sky.addColorStop(0, "#090d1f");
        sky.addColorStop(1, "#3b1d14");
      } else {
        sky.addColorStop(0, "#7c2d12");
        sky.addColorStop(0.65, "#c2410c");
        sky.addColorStop(1, "#ea580c");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Étoiles si nuit/étoiles/espace
      if (isNight || sc.id === "earth_link") {
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 45; i++) {
          const sx = ((i * 97) % w);
          const sy = ((i * 53) % (h * 0.75));
          ctx.globalAlpha = 0.4 + 0.6 * Math.sin(t * 2 + i);
          ctx.fillRect(sx, sy, 2, 2);
        }
        ctx.globalAlpha = 1;
      }

      if (sc.id === "earth_link") {
        // Mars à gauche
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(w * 0.22, h * 0.55, 52, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#9a3412";
        ctx.beginPath();
        ctx.arc(w * 0.20, h * 0.48, 16, 0, Math.PI * 2);
        ctx.fill();

        // Terre à droite
        ctx.fillStyle = "#2563eb";
        ctx.beginPath();
        ctx.arc(w * 0.82, h * 0.36, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(w * 0.81, h * 0.33, 10, 0, Math.PI * 2);
        ctx.fill();

        // Satellite + faisceau laser animé
        const satX = w * 0.34;
        const satY = h * 0.44 + Math.sin(t * 2) * 6;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 8]);
        ctx.lineDashOffset = -t * 60;
        ctx.beginPath();
        ctx.moveTo(satX, satY);
        ctx.lineTo(w * 0.82, h * 0.36);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(satX - 10, satY - 6, 20, 12);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(satX - 24, satY - 3, 12, 6);
        ctx.fillRect(satX + 12, satY - 3, 12, 6);
        return;
      }

      // Sol martien
      ctx.fillStyle = "#7c2d12";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.72);
      ctx.quadraticCurveTo(w * 0.3, h * 0.64, w * 0.65, h * 0.73);
      ctx.quadraticCurveTo(w * 0.85, h * 0.78, w, h * 0.70);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      if (sc.id === "dust_machines") {
        // Panneaux solaires + étincelles de nettoyage + tourbillon de poussière
        const px = w * 0.25, py = h * 0.56;
        ctx.fillStyle = "#1e3a8a";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.fillRect(px, py, 95, 34);
        ctx.strokeRect(px, py, 95, 34);
        // Onde électrostatique de nettoyage
        const sweep = ((t * 70) % 95);
        ctx.strokeStyle = "#facc15";
        ctx.beginPath();
        ctx.moveTo(px + sweep, py);
        ctx.lineTo(px + sweep, py + 34);
        ctx.stroke();

        // Tourbillon de poussière (dust devil)
        const dx = ((t * 55) % (w + 120)) - 60;
        for (let i = 0; i < 14; i++) {
          const yy = h * 0.74 - i * 7;
          const rr = 6 + i * 2.2;
          const off = Math.sin(t * 7 + i) * 8;
          ctx.strokeStyle = `rgba(253, 186, 116, ${0.55 - i * 0.03})`;
          ctx.beginPath();
          ctx.ellipse(dx + off, yy, rr, 3.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (sc.id === "perseverance_rover") {
        // Rover Perseverance mobile + laser vert + hélicoptère Ingenuity
        const rx = ((t * 38) % (w - 140)) + 40;
        const ry = h * 0.68;
        // Corps du rover
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(rx, ry - 22, 54, 18);
        // Mât caméra
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(rx + 40, ry - 40, 6, 18);
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(rx + 36, ry - 45, 16, 8);
        // 3 roues
        [8, 27, 46].forEach((wx) => {
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.arc(rx + wx, ry + 2, 7, 0, Math.PI * 2);
          ctx.fill();
        });
        // Laser SuperCam pulsant
        if (Math.sin(t * 4) > 0.2) {
          ctx.strokeStyle = "#4ade80";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rx + 52, ry - 41);
          ctx.lineTo(rx + 105, ry + 6);
          ctx.stroke();
        }
        // Hélicoptère Ingenuity
        const hx = rx + 25 + Math.sin(t * 2) * 35;
        const hy = h * 0.28 + Math.cos(t * 3) * 8;
        ctx.fillStyle = "#facc15";
        ctx.fillRect(hx - 6, hy - 5, 12, 10);
        ctx.strokeStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.moveTo(hx - 20 * Math.cos(t * 25), hy - 8);
        ctx.lineTo(hx + 20 * Math.cos(t * 25), hy - 8);
        ctx.stroke();
      } else if (sc.id === "hydroponic_dome") {
        // Dôme serre avec LED roses/bleues et plantes qui poussent
        const cx = w * 0.5, cy = h * 0.74;
        ctx.fillStyle = "rgba(56, 189, 248, 0.16)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 92, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rayons LED horticoles
        ctx.fillStyle = "rgba(232, 121, 249, 0.22)";
        ctx.fillRect(cx - 65, cy - 58, 130, 56);

        // Plantes vertes
        for (let i = -2; i <= 2; i++) {
          const px = cx + i * 26;
          const grow = 16 + Math.sin(t * 2 + i) * 4;
          ctx.fillStyle = "#22c55e";
          ctx.beginPath();
          ctx.arc(px, cy - grow, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(px - 2, cy - grow, 4, grow);
        }
      } else if (sc.id === "solar_shield") {
        // Soleil actif à gauche + particules déviées par le bouclier de la base
        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.arc(52, 46, 28 + Math.sin(t * 6) * 3, 0, Math.PI * 2);
        ctx.fill();

        const bx = w * 0.68, by = h * 0.73;
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(bx - 36, by - 26, 72, 26);
        // Bouclier magnétique
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.55 + 0.35 * Math.sin(t * 5)})`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(bx, by, 68, Math.PI, 0);
        ctx.stroke();

        for (let i = 0; i < 12; i++) {
          const prog = ((t * 0.9 + i * 0.13) % 1);
          const px = 80 + prog * (bx - 145);
          const py = 46 + prog * (by - 70) + Math.sin(i * 2) * 18;
          ctx.fillStyle = "#fb923c";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (sc.id === "mars_storm") {
        // Tempête rouge intense + station éclairée
        const bx = w * 0.5, by = h * 0.72;
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(bx - 55, by - 32, 110, 32);
        // Fenêtres chaudes
        ctx.fillStyle = "#facc15";
        ctx.fillRect(bx - 35, by - 20, 18, 10);
        ctx.fillRect(bx + 17, by - 20, 18, 10);

        ctx.strokeStyle = "rgba(251, 146, 60, 0.55)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 18; i++) {
          const sx = ((t * 260 + i * 65) % (w + 100)) - 50;
          const sy = 20 + ((i * 29) % (h - 40));
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + 48, sy + 4);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  /* ========================================================================
     4. MODE IMMERSION ASTRONAUTE 3D / CASQUE VISION X (360° SUR MARS)
     ======================================================================== */
  let astroActive = false;
  let astroYaw = 0;   // rotation horizontale (gauche / droite / derrière : 360°)
  let astroPitch = 0; // inclinaison verticale (haut / bas)
  let gyroEnabled = false;
  let visionXSplit = false;
  let astroRendererBuilt = false;

  function buildAstronautOverlay() {
    if ($("astronaut-vr-overlay")) return;
    const ov = document.createElement("div");
    ov.id = "astronaut-vr-overlay";
    ov.innerHTML = `
      <canvas id="astro-3d-canvas"></canvas>
      <div class="helmet-visor-frame"></div>
      <div class="helmet-visor-reflection"></div>

      <div class="helmet-hud-top">
        <div class="helmet-telemetry-pills">
          <span class="h-pill" id="h-pill-mode">🧑‍🚀 COMBINAISON EVA-01 • JEZERO</span>
          <span class="h-pill" id="h-pill-dir">🧭 NORD (0°)</span>
          <span class="h-pill" id="h-pill-env">🌡️ -58°C • GRAVITÉ 0.38g</span>
        </div>
        <div class="helmet-top-actions">
          <button type="button" class="h-btn" id="btn-astro-gyro">📱 Gyroscope / Vision X</button>
          <button type="button" class="h-btn" id="btn-astro-exit">🔄 Retourner en mode normal</button>
        </div>
      </div>

      <div class="helmet-look-pad">
        <button type="button" class="look-btn" id="look-left">⬅ Gauche</button>
        <button type="button" class="look-btn" id="look-up">⬆ Haut (Ciel)</button>
        <button type="button" class="look-btn" id="look-down">⬇ Bas (Sol)</button>
        <button type="button" class="look-btn" id="look-right">➡ Droite</button>
        <button type="button" class="look-btn" id="look-back">🔄 Derrière (180°)</button>
      </div>

      <div class="helmet-mission-hud" id="helmet-mission-hud">
        <!-- Mission & questions affichées directement sur la visière -->
      </div>

      <div class="helmet-suit-bottom">
        <svg class="suit-arm-svg" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,120 L35,45 Q55,30 85,48 L115,95 L90,120 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
          <rect x="44" y="54" width="34" height="14" rx="4" fill="#ea580c"/>
          <circle cx="96" cy="56" r="18" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
        </svg>

        <div class="suit-chest-console">
          <div style="font-size:11px;color:#fb923c;font-weight:900;letter-spacing:1px;margin-bottom:3px">
            TÉLÉMÉTRIE COMBINAISON • SOL <span id="suit-sol-num">1</span>/10
          </div>
          <div class="console-row" id="suit-res-row">
            <span>💧 82%</span>
            <span>🫧 94%</span>
            <span>⚡ 78%</span>
            <span>🛡️ 86%</span>
          </div>
        </div>

        <svg class="suit-arm-svg" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M180,120 L145,45 Q125,30 95,48 L65,95 L90,120 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
          <rect x="102" y="54" width="34" height="14" rx="4" fill="#0284c7"/>
          <circle cx="84" cy="56" r="18" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
        </svg>
      </div>
    `;
    document.body.appendChild(ov);

    // Contrôles de caméra 360° (glissement souris / tactile + boutons + clavier)
    const cv = $("astro-3d-canvas");
    let dragging = false, lx = 0, ly = 0;

    cv.addEventListener("pointerdown", (e) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    });
    window.addEventListener("pointerup", () => { dragging = false; });
    window.addEventListener("pointermove", (e) => {
      if (!dragging || !astroActive) return;
      astroYaw -= (e.clientX - lx) * 0.0065;
      astroPitch = Math.max(-1.1, Math.min(1.1, astroPitch - (e.clientY - ly) * 0.005));
      lx = e.clientX;
      ly = e.clientY;
      updateCompassPill();
    });

    window.addEventListener("keydown", (e) => {
      if (!astroActive) return;
      if (e.key === "ArrowLeft") { astroYaw += 0.25; updateCompassPill(); }
      if (e.key === "ArrowRight") { astroYaw -= 0.25; updateCompassPill(); }
      if (e.key === "ArrowUp") { astroPitch = Math.min(1.1, astroPitch + 0.18); }
      if (e.key === "ArrowDown") { astroPitch = Math.max(-1.1, astroPitch - 0.18); }
    });

    $("look-left").onclick = () => { astroYaw += 0.55; updateCompassPill(); };
    $("look-right").onclick = () => { astroYaw -= 0.55; updateCompassPill(); };
    $("look-up").onclick = () => { astroPitch = Math.min(1.05, astroPitch + 0.35); };
    $("look-down").onclick = () => { astroPitch = Math.max(-1.05, astroPitch - 0.35); };
    $("look-back").onclick = () => { astroYaw += Math.PI; updateCompassPill(); };

    $("btn-astro-exit").onclick = () => {
      closeAstronautMode();
    };

    $("btn-astro-gyro").onclick = () => {
      visionXSplit = !visionXSplit;
      ov.classList.toggle("vision-x-split", visionXSplit);
      $("btn-astro-gyro").classList.toggle("active", visionXSplit);
      enableMobileGyroscope();
    };

    initAstronaut3DScene();
  }

  function enableMobileGyroscope() {
    if (gyroEnabled) return;
    const handler = (ev) => {
      if (!astroActive || ev.alpha === null) return;
      astroYaw = (ev.alpha * Math.PI) / 180;
      if (ev.beta !== null) {
        astroPitch = Math.max(-1.0, Math.min(1.0, ((ev.beta - 65) * Math.PI) / 180));
      }
      updateCompassPill();
    };
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((res) => {
          if (res === "granted") {
            gyroEnabled = true;
            window.addEventListener("deviceorientation", handler);
          }
        })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      gyroEnabled = true;
      window.addEventListener("deviceorientation", handler);
    }
  }

  function updateCompassPill() {
    const el = $("h-pill-dir");
    if (!el) return;
    let deg = Math.round(((-astroYaw * 180) / Math.PI) % 360);
    if (deg < 0) deg += 360;
    const dirs = ["NORD", "NORD-EST", "EST", "SUD-EST", "SUD", "SUD-OUEST", "OUEST", "NORD-OUEST"];
    const label = dirs[Math.round(deg / 45) % 8];
    el.textContent = `🧭 ${label} (${deg}°)`;
  }

  function initAstronaut3DScene() {
    if (astroRendererBuilt) return;
    astroRendererBuilt = true;
    const cv = $("astro-3d-canvas");
    if (!cv) return;

    if (typeof THREE !== "undefined") {
      try {
        const rd = new THREE.WebGLRenderer({ canvas: cv, antialias: true });
        rd.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        const sc = new THREE.Scene();
        sc.fog = new THREE.FogExp2(0x9a3412, 0.018);

        const cam = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 250);
        cam.position.set(0, 1.75, 0); // Hauteur des yeux d'un astronaute sur Mars

        // Sol martien texturé et vallonné
        const groundGeo = new THREE.PlaneGeometry(220, 220, 64, 64);
        groundGeo.rotateX(-Math.PI / 2);
        const pos = groundGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          const dist = Math.hypot(x, z);
          const h = dist > 6 ? Math.sin(x * 0.15) * Math.cos(z * 0.15) * 1.4 + Math.sin(dist * 0.08) * 1.2 : 0;
          pos.setY(i, h);
        }
        groundGeo.computeVertexNormals();
        const groundMat = new THREE.MeshStandardMaterial({
          map: typeof mapProceduralTexture === "function" ? mapProceduralTexture() : null,
          color: 0xc2410c,
          roughness: 0.95
        });
        sc.add(new THREE.Mesh(groundGeo, groundMat));

        // Rochers martiens dispersés tout autour (360°)
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.9 });
        for (let i = 0; i < 65; i++) {
          const ang = (i / 65) * Math.PI * 2 + Math.random() * 0.2;
          const r = 7 + Math.random() * 55;
          const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + Math.random() * 1.1, 0), rockMat);
          rock.position.set(Math.cos(ang) * r, 0.2, Math.sin(ang) * r);
          rock.rotation.set(Math.random(), Math.random(), Math.random());
          sc.add(rock);
        }

        // Habitat ARES-01 devant-gauche
        const baseGroup = new THREE.Group();
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(3.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.3, roughness: 0.4 })
        );
        baseGroup.add(dome);
        const solar = new THREE.Mesh(
          new THREE.BoxGeometry(5.5, 0.1, 1.8),
          new THREE.MeshStandardMaterial({ color: 0x1d4ed8, emissive: 0x0ea5e9, emissiveIntensity: 0.25 })
        );
        solar.position.set(5.2, 1.4, 0);
        solar.rotation.x = 0.4;
        baseGroup.add(solar);
        baseGroup.position.set(-9, 0, -16);
        sc.add(baseGroup);

        // Rover Perseverance animé qui patrouille autour de l'astronaute
        const rover = new THREE.Group();
        const rBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.6, 1.0), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
        rBody.position.y = 0.65;
        const rMast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
        rMast.position.set(0.5, 1.2, 0);
        rover.add(rBody, rMast);
        sc.add(rover);

        // Ciel étoilé + Soleil martien
        const stars = new THREE.Points(
          new THREE.BufferGeometry().setAttribute(
            "position",
            new THREE.BufferAttribute(new Float32Array(Array.from({ length: 1200 }, () => (Math.random() - 0.5) * 240)), 3)
          ),
          new THREE.PointsMaterial({ color: 0xffffff, size: 0.45 })
        );
        sc.add(stars);

        sc.add(new THREE.AmbientLight(0xffedd5, 0.85));
        const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.5);
        sunLight.position.set(20, 35, -25);
        sc.add(sunLight);

        function onResize() {
          if (!astroActive) return;
          rd.setSize(window.innerWidth, window.innerHeight, false);
          cam.aspect = window.innerWidth / window.innerHeight;
          cam.updateProjectionMatrix();
        }
        window.addEventListener("resize", onResize);

        (function loop(now) {
          requestAnimationFrame(loop);
          if (!astroActive) return;
          const t = now * 0.001;
          rd.setSize(window.innerWidth, window.innerHeight, false);
          cam.aspect = window.innerWidth / window.innerHeight;
          cam.updateProjectionMatrix();

          // Rover en mouvement circulaire
          rover.position.set(Math.cos(t * 0.18) * 14, 0, Math.sin(t * 0.18) * 14 - 4);
          rover.rotation.y = -t * 0.18;

          // Direction du regard 360°
          const lookX = Math.sin(astroYaw) * Math.cos(astroPitch);
          const lookY = 1.75 + Math.sin(astroPitch);
          const lookZ = -Math.cos(astroYaw) * Math.cos(astroPitch);
          cam.lookAt(lookX * 10, lookY, lookZ * 10);

          const isNight = document.body.classList.contains("theme-night") || document.body.classList.contains("theme-stars");
          sc.background = new THREE.Color(isNight ? 0x050814 : 0x7c2d12);
          sc.fog.color.setHex(isNight ? 0x050814 : 0x9a3412);

          rd.render(sc, cam);
        })(0);
        return;
      } catch (e) {
        // Repli Canvas 2D panoramique si WebGL indisponible
      }
    }

    // Repli Canvas panoramique 360°
    (function fallbackLoop(now) {
      requestAnimationFrame(fallbackLoop);
      if (!astroActive) return;
      const w = (cv.width = window.innerWidth);
      const h = (cv.height = window.innerHeight);
      const ctx = cv.getContext("2d");
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#090d1f");
      sky.addColorStop(0.55, "#7c2d12");
      sky.addColorStop(1, "#431407");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const horizon = h * 0.56 + astroPitch * 180;
      ctx.fillStyle = "#9a3412";
      ctx.fillRect(0, horizon, w, h - horizon);

      // Repères panoramiques selon astroYaw
      const offset = ((astroYaw * 220) % w + w) % w;
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect((offset + 140) % w, horizon - 45, 90, 45);
    })(0);
  }

  function renderAstronautMissionHUD(resultData = null) {
    const hud = $("helmet-mission-hud");
    if (!hud || typeof state === "undefined" || typeof getMissionForDay !== "function") return;

    const m = getMissionForDay(state.day);
    const lang = typeof currentLang !== "undefined" ? currentLang : "fr";

    $("suit-sol-num").textContent = state.day;
    $("suit-res-row").innerHTML = `
      <span>💧 ${Math.round(state.eau)}%</span>
      <span>🫧 ${Math.round(state.oxygene)}%</span>
      <span>⚡ ${Math.round(state.energie)}%</span>
      <span>🌱 ${Math.round(state.nourriture)}%</span>
      <span>🛡️ ${Math.max(0, 100 - Math.round(state.radiation))}%</span>
    `;
    $("h-pill-mode").textContent = isExpertMode()
      ? `🧑‍🚀 COMMANDANT SCIENTIFIQUE • SOL ${state.day}/10`
      : `🧑‍🚀 ASTRONAUTE JUNIOR • SOL ${state.day}/10`;

    if (resultData) {
      const { decision, failureReason } = resultData;
      const isVictory = !failureReason && state.day >= 10;
      const isLast = Boolean(failureReason || isVictory);

      hud.innerHTML = `
        <h3 class="helmet-mission-title">
          ${failureReason ? "⚠️ ALERTE CRITIQUE SUR LA VISIÈRE" : isVictory ? "🏆 MISSION MARTIENNE ACCOMPLIE !" : "✅ RAPPORT TÉLÉMÉTRIQUE VALIDÉ"}
        </h3>
        <p class="helmet-mission-desc">
          <strong>Décision :</strong> ${decision.title[lang]}<br>
          <span>${failureReason || decision.scienceText[lang]}</span>
        </p>
        <div style="margin-bottom:10px">${typeof formatImpactBadges === "function" ? formatImpactBadges(decision.impacts) : ""}</div>
        <div style="background:rgba(15,23,42,0.85);border:1px solid #fbbf24;border-radius:14px;padding:10px 12px;margin-bottom:10px">
          <strong style="color:#fde047">Veux-tu continuer à résoudre les problèmes dans la peau de l'astronaute ou préfères-tu retourner en mode normal ?</strong>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          <button type="button" class="ao-btn ao-btn-next" id="astro-continue-btn">
            ${isLast ? "🔄 Recommencer en mode Astronaute" : "🧑‍🚀 Continuer en mode Astronaute (Sol suivant)"}
          </button>
          <button type="button" class="ao-btn ao-btn-back" id="astro-to-normal-btn">
            📋 Retourner en mode normal
          </button>
        </div>
      `;

      $("astro-continue-btn").onclick = () => {
        // Fermer d'éventuelles modales de résultat en arrière-plan
        document.querySelectorAll(".ov").forEach((el) => el.remove());
        if (isLast) {
          state = getDefaultState();
          state.started = true;
          saveState();
          renderMissionView();
          renderAstronautMissionHUD(null);
        } else {
          state.day += 1;
          saveState();
          renderMissionView();
          renderAstronautMissionHUD(null);
        }
      };

      $("astro-to-normal-btn").onclick = () => {
        document.querySelectorAll(".ov").forEach((el) => el.remove());
        closeAstronautMode();
        if (isLast) {
          const rBtn = $("btn-restart-game");
          if (rBtn) rBtn.click();
        } else {
          const nBtn = $("btn-next-day");
          if (nBtn) nBtn.click();
        }
      };
      return;
    }

    const letters = ["A", "B", "C", "D"];
    hud.innerHTML = `
      <h3 class="helmet-mission-title">${m.title[lang]}</h3>
      <p class="helmet-mission-desc">${m.description[lang]}</p>
      <div class="helmet-choices-grid">
        ${m.decisions.map((d, idx) => `
          <button type="button" class="astro-choice-btn" data-astro-dec="${idx}">
            <strong>[${letters[idx] || idx + 1}] ${d.title[lang]}</strong>
            <span>${d.desc[lang]}</span>
          </button>
        `).join("")}
      </div>
    `;

    hud.querySelectorAll("[data-astro-dec]").forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.astroDec);
        const decision = m.decisions[idx];
        // Exécuter le moteur existant puis afficher le bilan sur la visière
        if (typeof executeDecision === "function") {
          executeDecision(idx);
          // Fermer les overlays popups par-dessus le casque pour garder l'immersion
          setTimeout(() => {
            document.querySelectorAll(".ov").forEach((el) => el.remove());
          }, 30);
          const fail = state.oxygene <= 0 || state.eau <= 0 || state.energie <= 0 || state.radiation >= 100 || state.sante <= 0
            ? "Seuil vital critique atteint dans l'habitat."
            : null;
          renderAstronautMissionHUD({ decision, failureReason: fail });
        }
      };
    });
  }

  function openAstronautMode(autoExpert = false) {
    buildAstronautOverlay();
    astroActive = true;
    const ov = $("astronaut-vr-overlay");
    if (ov) ov.classList.add("active");
    if (autoExpert && typeof state !== "undefined" && !state.started) {
      state.started = true;
      if (typeof saveState === "function") saveState();
      if (typeof renderMissionView === "function") renderMissionView();
      if (typeof switchView === "function") switchView("view-mission");
    }
    updateCompassPill();
    renderAstronautMissionHUD(null);
  }

  function closeAstronautMode() {
    astroActive = false;
    const ov = $("astronaut-vr-overlay");
    if (ov) ov.classList.remove("active");
  }

  /* ========================================================================
     5. BARRE FLOTTANTE D'AMBIANCE (JOUR / NUIT / ÉTOILES) & ACCÈS RAPIDE
     ======================================================================== */
  function buildEnvToolbar() {
    if ($("env-toolbar")) return;
    const bar = document.createElement("div");
    bar.id = "env-toolbar";
    bar.innerHTML = `
      <button type="button" class="env-btn" data-env-theme="day" title="Mode Jour">☀️ Jour</button>
      <button type="button" class="env-btn" data-env-theme="night" title="Mode Nuit">🌙 Nuit</button>
      <button type="button" class="env-btn" data-env-theme="stars" title="Mode Dans les Étoiles">✨ Étoiles</button>
      <button type="button" class="env-btn env-btn-astro" id="tb-astro-btn">🧑‍🚀 Mode Astronaute</button>
      <button type="button" class="env-btn" id="tb-profile-btn">🎯 Profil / Test</button>
    `;
    document.body.appendChild(bar);

    bar.querySelectorAll("[data-env-theme]").forEach((btn) => {
      btn.onclick = () => applyEnvTheme(btn.dataset.envTheme);
    });

    $("tb-astro-btn").onclick = () => openAstronautMode(false);
    $("tb-profile-btn").onclick = () => {
      closeAstronautMode();
      openOnboardingModal(0);
    };
  }

  /* ========================================================================
     6. SYNCHRONISATION AVEC LE MOTEUR EXISTANT SANS RIEN CASSER
     ======================================================================== */
  const _origRenderMission = window.renderMissionView;
  if (typeof _origRenderMission === "function") {
    window.renderMissionView = renderMissionView = function () {
      applyKidProfileAdaptations();
      _origRenderMission.apply(this, arguments);
      ensureMissionAnimStage();
      if (typeof state !== "undefined") {
        currentSceneIdx = SOL_TO_SCENE_IDX[(state.day - 1) % SOL_TO_SCENE_IDX.length] || 0;
        updateSceneCaption();
      }
      if (astroActive) {
        renderAstronautMissionHUD(null);
      }
    };
  }

  window.addEventListener("DOMContentLoaded", () => {
    initStarfieldCanvas();
    buildEnvToolbar();
    applyEnvTheme(localStorage.getItem(ENV_THEME_KEY) || "day");
    applyKidProfileAdaptations();

    const mode = localStorage.getItem("infinity_mode");
    const kidProf = getKidProfile();

    // Si aucun profil n'est encore défini, ou si le mode enfant n'a pas encore fait son test
    if (!mode || (mode === "lili" && !kidProf)) {
      setTimeout(() => openOnboardingModal(mode === "lili" ? 1 : 0), 60);
    } else if (mode === "aria" && localStorage.getItem(AUTO_ASTRO_KEY) === "1") {
      // Les experts / scientifiques / étudiants sont automatiquement plongés dans la peau de l'astronaute !
      setTimeout(() => {
        if (typeof state !== "undefined") {
          state.started = true;
          if (typeof saveState === "function") saveState();
        }
        if (typeof renderMissionView === "function") renderMissionView();
        if (typeof switchView === "function") switchView("view-mission");
        openAstronautMode(true);
      }, 120);
    }
  });
})();
