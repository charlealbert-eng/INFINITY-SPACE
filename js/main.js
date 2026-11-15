/* ==========================================================================
   INFINITY SPACE — MOTEUR PRINCIPAL ULTRA-RÉACTIF (ZÉRO LATENCE)
   Gère : Langue FR/EN persistante, Ressources, Décisions, Résultats, Audio & SVG
   ========================================================================== */

const STORAGE_KEY = "infinity_space_v2_state";
const LANG_KEY = "infinity_space_lang";

// État initial de la colonie
function getDefaultState() {
  return {
    day: 1,
    eau: 82,
    oxygene: 94,
    energie: 78,
    nourriture: 72,
    radiation: 14,
    sante: 96,
    integrite: 100,
    started: false,
    donkiLiveLabel: null
  };
}

let state = loadState();
let currentLang = localStorage.getItem(LANG_KEY) || "fr"; // Français par défaut !
let audioSettings = {
  sfxVolume: 0.6,
  ambientVolume: 0.35,
  muted: false
};

/* ==========================================================================
   1. PERSISTANCE & TRADUCTION INTÉGRALE (FRANÇAIS / ANGLAIS)
   ========================================================================== */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaultState(), ...parsed };
    }
  } catch (e) {
    console.warn("LocalStorage indisponible", e);
  }
  return getDefaultState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Ignorer en mode privé strict
  }
}

function t(key) {
  const dict = UI_DICTIONARY[currentLang] || UI_DICTIONARY.fr;
  return dict[key] || UI_DICTIONARY.fr[key] || key;
}

function applyLanguage(lang) {
  currentLang = lang === "en" ? "en" : "fr";
  localStorage.setItem(LANG_KEY, currentLang);
  document.documentElement.lang = currentLang;

  // Mettre à jour tous les attributs data-i18n sur TOUTES les pages et modales
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  // Mettre à jour le sélecteur et le bouton rapide
  const selectLang = document.getElementById("select-language");
  if (selectLang) selectLang.value = currentLang;

  const quickLabel = document.getElementById("quick-lang-label");
  if (quickLabel) quickLabel.textContent = currentLang === "fr" ? "FRANÇAIS" : "ENGLISH";

  const muteLabel = document.getElementById("label-mute-state");
  if (muteLabel) muteLabel.textContent = audioSettings.muted ? t("audioMuted") : t("audioActive");

  // Re-rendre le contenu dynamique actif
  renderSourcesModal();
  renderMissionView();
}

/* ==========================================================================
   2. TÉLÉMÉTRIE NASA DONKI NON BLOQUANTE (ARRIÈRE-PLAN)
   ========================================================================== */
function fetchNasaDonkiTelemetry() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  fetch("https://api.nasa.gov/DONKI/FLR?api_key=DEMO_KEY", { signal: controller.signal })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      clearTimeout(timeoutId);
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[data.length - 1];
        const flareClass = latest.classType || "M4.2";
        const dateStr = (latest.beginTime || "").slice(0, 10);
        state.donkiLiveLabel = `${flareClass} (${dateStr})`;
        const el = document.getElementById("welcome-donki-status");
        if (el) el.textContent = `CLASSE ${flareClass} • ${dateStr}`;
      }
    })
    .catch(() => {
      // Bascule transparente instantanée sur les données DONKI embarquées
      clearTimeout(timeoutId);
    });
}

/* ==========================================================================
   3. SYNTHÉTISEUR AUDIO LÉGER (WEB AUDIO API — ZÉRO FICHIER EXTERNE)
   ========================================================================== */
let audioCtx = null;

function playTone(freq, duration = 0.09, type = "sine") {
  if (audioSettings.muted || audioSettings.sfxVolume <= 0) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(audioSettings.sfxVolume * 0.14, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio bloqué avant interaction
  }
}

/* ==========================================================================
   4. SCHÉMA ISOMÉTRIQUE DE LA STATION (FIDÈLE À LA MAQUETTE UTILISATEUR)
   ========================================================================== */
function getStationSvgMarkup(alertMode = false) {
  const accent = alertMode ? "#ed8936" : "#52d1b8";
  const panelColor = alertMode ? "#4a3b32" : "#244845";
  return `
  <svg viewBox="0 0 420 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="stationGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0b131f" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="210" cy="128" rx="185" ry="95" fill="url(#stationGlow)"/>

    <!-- Ailes Panneaux Solaires Gauche -->
    <g stroke="${accent}" stroke-width="1.4" fill="${panelColor}">
      <polygon points="45,145 125,105 148,117 68,157"/>
      <line x1="85" y1="125" x2="108" y2="137"/>
      <line x1="65" y1="135" x2="88" y2="147"/>
      <line x1="105" y1="115" x2="128" y2="127"/>

      <polygon points="78,165 158,125 181,137 101,177"/>
      <line x1="118" y1="145" x2="141" y2="157"/>
      <line x1="98" y1="155" x2="121" y2="167"/>
      <line x1="138" y1="135" x2="161" y2="147"/>
    </g>

    <!-- Ailes Panneaux Solaires Droite -->
    <g stroke="${accent}" stroke-width="1.4" fill="${panelColor}">
      <polygon points="240,122 320,82 343,94 263,134"/>
      <line x1="280" y1="102" x2="303" y2="114"/>
      <line x1="260" y1="112" x2="283" y2="124"/>
      <line x1="300" y1="92" x2="323" y2="104"/>

      <polygon points="272,142 352,102 375,114 295,154"/>
      <line x1="312" y1="122" x2="335" y2="134"/>
      <line x1="292" y1="132" x2="315" y2="144"/>
      <line x1="332" y1="112" x2="355" y2="124"/>
    </g>

    <!-- Bras pressurisés en croix -->
    <g stroke="#94a9c4" stroke-width="1.6" fill="#1b2e44">
      <polygon points="145,86 275,152 263,162 133,96"/>
      <polygon points="150,158 270,92 280,102 160,168"/>
    </g>

    <!-- Noyau Central & Module Observatoire -->
    <g stroke="${accent}" stroke-width="1.8">
      <ellipse cx="210" cy="136" rx="34" ry="18" fill="#15263a"/>
      <rect x="184" y="96" width="52" height="38" rx="8" fill="#1e354f"/>
      <ellipse cx="210" cy="96" rx="26" ry="12" fill="#274666"/>
      <!-- Dôme d'observation supérieur -->
      <path d="M194,92 Q210,72 226,92 Z" fill="${accent}" fill-opacity="0.35"/>
      <!-- Antenne télémétrie -->
      <line x1="210" y1="77" x2="210" y2="52" stroke="#edf2f7" stroke-width="2"/>
      <circle cx="210" cy="50" r="3.5" fill="${accent}"/>
    </g>

    <!-- Petits repères télémétriques -->
    <text x="16" y="24" fill="#94a9c4" font-size="10" font-family="monospace">JEZERO BASE • 18.38°N</text>
    <text x="295" y="236" fill="${accent}" font-size="10" font-family="monospace">SYS: ${alertMode ? "ALERT" : "NOMINAL"}</text>
  </svg>`;
}

/* ==========================================================================
   5. NAVIGATION ENTRE VUES (INSTANTANÉE)
   ========================================================================== */
function switchView(viewId) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) target.classList.add("active");
}

/* ==========================================================================
   6. RENDU DU TABLEAU DE BORD & DE LA MISSION EN COURS
   ========================================================================== */







/* ==========================================================================
   7. EXÉCUTION INSTANTANÉE D'UNE DÉCISION & RÉSULTAT DU JOUR (< 5 ms)
   ========================================================================== */


/* ==========================================================================
   8. MODALE DES RESSOURCES SCIENTIFIQUES
   ========================================================================== */
function renderSourcesModal() {
  const wrap = document.getElementById("sources-content");
  if (!wrap) return;
  wrap.innerHTML = SCIENTIFIC_SOURCES.map(
    (s) => `
    <div class="source-item">
      <h4>${s.name}</h4>
      <p>${s.desc[currentLang]}</p>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.url} ↗</a>
    </div>
  `
  ).join("");
}

/* ==========================================================================
   9. INITIALISATION & ÉVÉNEMENTS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Dessiner la station sur l'écran de bienvenue
  const welcomeSvg = document.getElementById("welcome-station-svg");
  if (welcomeSvg) welcomeSvg.innerHTML = getStationSvgMarkup(false);

  // Afficher le bouton Reprendre si une partie est déjà commencée
  if (state.started && state.day > 1 && state.day <= 10) {
    document.getElementById("btn-continue-mission").classList.remove("hidden");
  }

  // Appliquer la langue sauvegardée (Français par défaut)
  applyLanguage(currentLang);

  // Lancer la récupération télémétrique DONKI en arrière-plan
  fetchNasaDonkiTelemetry();

  // Bouton Lancer une nouvelle mission
  document.getElementById("btn-start-mission").addEventListener("click", () => {
    playTone(440, 0.1);
    state = getDefaultState();
    state.started = true;
    saveState();
    renderMissionView();
    switchView("view-mission");
  });

  // Bouton Reprendre
  document.getElementById("btn-continue-mission").addEventListener("click", () => {
    playTone(480, 0.1);
    renderMissionView();
    switchView("view-mission");
  });

  // Bouton Jour Suivant
  document.getElementById("btn-next-day").addEventListener("click", () => {
    playTone(520, 0.08);
    if (state.day < 10) {
      state.day += 1;
      saveState();
      renderMissionView();
      switchView("view-mission");
    }
  });

  // Bouton Recommencer
  document.getElementById("btn-restart-game").addEventListener("click", () => {
    playTone(400, 0.1);
    state = getDefaultState();
    state.started = true;
    saveState();
    renderMissionView();
    switchView("view-mission");
  });

  // Retour accueil
  document.getElementById("btn-back-home").addEventListener("click", () => {
    playTone(360, 0.07);
    if (state.started && state.day >= 1) {
      document.getElementById("btn-continue-mission").classList.remove("hidden");
    }
    switchView("view-welcome");
  });

  // Bascule rapide de langue sur l'écran d'accueil
  document.getElementById("btn-lang-quick").addEventListener("click", () => {
    playTone(600, 0.06);
    applyLanguage(currentLang === "fr" ? "en" : "fr");
  });

  // Sélecteur de langue dans les paramètres
  document.getElementById("select-language").addEventListener("change", (e) => {
    playTone(600, 0.06);
    applyLanguage(e.target.value);
  });

  // Ouverture / Fermeture Modale Paramètres
  const modalSettings = document.getElementById("modal-settings");
  document.getElementById("btn-open-settings-welcome").addEventListener("click", () => {
    modalSettings.classList.remove("hidden");
  });
  document.getElementById("btn-settings-mission").addEventListener("click", () => {
    modalSettings.classList.remove("hidden");
  });
  document.getElementById("btn-close-settings").addEventListener("click", () => {
    modalSettings.classList.add("hidden");
  });

  // Ouverture / Fermeture Modale Sources NASA & ASC
  const modalSources = document.getElementById("modal-sources");
  document.getElementById("btn-open-sources").addEventListener("click", () => {
    modalSources.classList.remove("hidden");
  });
  document.getElementById("btn-sources-mission").addEventListener("click", () => {
    modalSources.classList.remove("hidden");
  });
  document.getElementById("btn-close-sources").addEventListener("click", () => {
    modalSources.classList.add("hidden");
  });

  // Réglages audio & plein écran
  document.getElementById("range-sfx").addEventListener("input", (e) => {
    const val = Number(e.target.value);
    audioSettings.sfxVolume = val / 100;
    document.getElementById("label-sfx-val").textContent = `${val}%`;
  });

  document.getElementById("range-ambient").addEventListener("input", (e) => {
    const val = Number(e.target.value);
    audioSettings.ambientVolume = val / 100;
    document.getElementById("label-ambient-val").textContent = `${val}%`;
  });

  document.getElementById("btn-toggle-mute").addEventListener("click", () => {
    audioSettings.muted = !audioSettings.muted;
    document.getElementById("label-mute-state").textContent = audioSettings.muted
      ? t("audioMuted")
      : t("audioActive");
  });

  document.getElementById("btn-toggle-fullscreen").addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  document.getElementById("btn-reset-save").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = getDefaultState();
    document.getElementById("btn-continue-mission").classList.add("hidden");
    modalSettings.classList.add("hidden");
    renderMissionView();
    switchView("view-welcome");
  });
});
