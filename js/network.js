/* RÉSEAU : Firebase / salle partagée (utilise window.FB) */
    let db = null;
    let currentUser = null;
    let unsub = null;
    let roomInputTimer = null;

    function setNetBadge(status, text) {
      const el = document.getElementById('lobby-net-status');
      if (!el) return;
      el.textContent = text;
      el.className = status === 'ok'
        ? 'text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300'
        : 'text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300';
    }

    /* Plus de repli silencieux : si le réseau ne marche pas, on le dit clairement avec la raison. */
    function netUnavailable(reason) {
      console.warn('Multijoueur indisponible :', reason);
      state.netOk = false;
      state.commanderId = state.playerId;
      state.commanderName = state.playerName;
      state.commanderOnline = true;
      state.gameMode = 'solo';
      updateLobbyUI();
      setNetBadge('warn', '⚠️ Hors-ligne (' + reason + ') — solo seulement');
    }

    async function initFirebase() {
      const hasConfig = typeof __firebase_config !== 'undefined' && __firebase_config;
      if (!hasConfig) return netUnavailable('config Firebase manquante dans js/config.js');
      if (!window.FB) return netUnavailable('outils Firebase non chargés, vérifie internet');
      try {
        const app = FB.initializeApp(JSON.parse(__firebase_config));
        const auth = FB.getAuth(app);
        db = FB.getFirestore(app);
        const cred = typeof __initial_auth_token !== 'undefined' && __initial_auth_token
          ? await FB.signInWithCustomToken(auth, __initial_auth_token)
          : await FB.signInAnonymously(auth);
        currentUser = cred.user;
        if (currentUser?.uid) state.playerId = currentUser.uid;
        subscribeToRoom();
      } catch (e) {
        netUnavailable((e && (e.code || e.message)) || 'erreur inconnue');
      }
    }

    function getRoomRef() {
      if (!db || !currentUser) return null;
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'infinity-space-coop';
      const cleanCode = (state.roomCode || 'ARTEMIS-5').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
      return FB.doc(db, 'artifacts', appId, 'public', 'data', 'rooms', cleanCode || 'ARTEMIS-5');
    }

    function deriveSeatsFromPlayers(playersMap) {
      const freshSeats = { energy: null, shield: null, life: null, comms: null, nav: null };
      if (!playersMap || typeof playersMap !== 'object') return freshSeats;
      Object.entries(playersMap).forEach(([pid, info]) => {
        if (info && info.role && ROLES.includes(info.role)) {
          freshSeats[info.role] = { playerId: pid, name: info.name || 'Astronaute' };
        }
      });
      return freshSeats;
    }

    async function announcePresenceInRoom(claimAdmin = false) {
      const ref = getRoomRef();
      if (!ref) return;
      try {
        const payload = {
          players: {
            [state.playerId]: {
              name: state.playerName,
              role: state.myRole || null,
              online: true,
              updatedAt: Date.now()
            }
          }
        };
        if (claimAdmin) {
          payload.commanderId = state.playerId;
          payload.commanderName = state.playerName;
        }
        await FB.setDoc(ref, payload, { merge: true });
      } catch (e) {}
    }

    async function syncMyPlayerChoice(role) {
      const ref = getRoomRef();
      if (!ref) return;
      try {
        await FB.setDoc(ref, {
          players: {
            [state.playerId]: {
              name: state.playerName,
              role: role,
              online: true,
              updatedAt: Date.now()
            }
          }
        }, { merge: true });
      } catch (e) {}
    }

    /* Score partagé : chaque joueur envoie seulement SES points gagnés/perdus (increment),
       pour que les actions de deux joueurs ne s'écrasent plus. */
    let pendingScore = 0;
    function addScore(delta) {
      state.score = Math.max(0, state.score + delta);
      pendingScore += delta;
    }

    /* scope 'mine'   : seulement ma fiche d'équipage + mes points (par défaut)
       scope 'bots'   : + les fiches des IA (admin)
       scope 'shared' : état global de la partie (admin : lancement, nouveau jour, fin) */
    async function syncToCloud(scope = 'mine', absoluteScore = false) {
      const ref = getRoomRef();
      if (!ref) return;
      try {
        const payload = { radioText: state.radioText };
        if (absoluteScore) { payload.score = state.score; pendingScore = 0; }
        else if (pendingScore !== 0) { payload.score = FB.increment(pendingScore); pendingScore = 0; }
        if (state.gameOver) { payload.gameOver = true; payload.failReason = state.failReason || ''; }
        const crew = {};
        if (scope === 'shared' && isMeAdmin()) {
          Object.assign(payload, {
            started: state.started, commanderId: state.commanderId, commanderName: state.commanderName,
            sol: state.sol, energy: state.energy, shield: state.shield, life: state.life,
            gameOver: state.gameOver, failReason: state.failReason || '', victory: !!state.victory
          });
          ROLES.forEach(r => { crew[r] = state.crew[r]; });
        } else {
          if (state.myRole && state.crew[state.myRole]) crew[state.myRole] = state.crew[state.myRole];
          if (scope === 'bots' && isMeAdmin()) ROLES.forEach(r => { if (state.crew[r].isBot) crew[r] = state.crew[r]; });
        }
        if (Object.keys(crew).length) payload.crew = crew;
        await FB.setDoc(ref, payload, { merge: true });
      } catch (e) { console.warn('Sync Firebase :', e); }
    }

    function subscribeToRoom() {
      const ref = getRoomRef();
      if (!ref) return;
      if (unsub) unsub();

      unsub = FB.onSnapshot(ref, (snap) => {
        setNetBadge('ok', `🟢 Salon ${state.roomCode} synchronisé`);
        if (!snap.exists()) {
          state.lobbySeats = { energy: null, shield: null, life: null, comms: null, nav: null };
          if (state.canCreateRoom) {
            /* Je suis l'hôte : je crée la salle et je deviens Admin */
            state.commanderId = state.playerId;
            state.commanderName = state.playerName;
            state.commanderOnline = true;
            announcePresenceInRoom(true);
          } else {
            /* J'ai un lien d'invitation mais l'hôte n'a pas encore créé la salle : j'attends, je ne deviens PAS Admin */
            state.commanderId = null;
            state.commanderName = null;
            state.commanderOnline = false;
            state.roomMissing = true;
            showLobbyError("🔎 Salle introuvable : l'hôte doit d'abord ouvrir sa salle. Vérifie le lien reçu.");
          }
          updateLobbyUI();
          return;
        }
        const data = snap.data();
        if (state.roomMissing) { state.roomMissing = false; showLobbyError(''); }
        if (!data.commanderId && state.canCreateRoom) {
          state.commanderId = state.playerId;
          state.commanderName = state.playerName;
          announcePresenceInRoom(true);
        } else {
          state.commanderId = data.commanderId || null;
          state.commanderName = data.commanderName || 'Admin';
        }

        state.lobbySeats = deriveSeatsFromPlayers(data.players);
        let myConfirmed = null;
        ROLES.forEach(r => {
          if (state.lobbySeats[r]?.playerId === state.playerId) myConfirmed = r;
        });
        state.myRole = myConfirmed;
        updateLobbyUI();

        if (data.gameOver && !state.gameOver && state.started) {
          state.gameOver = true;
          if (data.victory) {
            state.victory = true;
            if (typeof data.score === 'number') state.score = data.score;
            playSfx('success');
            renderUI();
            openEndModal(true, "Victoire totale ! L'escouade a survécu aux 5 Sols lunaires.");
            return;
          }
          state.failReason = data.failReason || "Échec de l'escouade.";
          playSfx('fail');
          triggerShake();
          renderUI();
          openEndModal(false, state.failReason);
          return;
        }

        if (!data.gameOver && state.gameOver && state.started) {
          state.gameOver = false;
          state.victory = false;
          state.failReason = '';
          state.sol = data.sol || 1;
          ROLES.forEach(r => { state.crew[r].done = false; state.crew[r].attempts = 3; });
          state.secondsLeft = 75;
          document.getElementById('endgame-modal').classList.add('hidden');
          document.getElementById('endgame-modal').classList.remove('flex');
          buildPuzzleForRole();
        }

        if (data.started && !state.started && state.myRole) {
          enterGameFromLobby(data);
        }

        if (data.sol && data.sol !== state.sol) {
          state.sol = data.sol;
          state.secondsLeft = 75;
          ROLES.forEach(r => { if (state.crew[r]) { state.crew[r].done = false; state.crew[r].attempts = 3; } });
          showCinematicBanner(`JOUR LUNAIRE ${state.sol} / ${state.maxSols}`, 'SYNCHRONISATION ESCUADE');
          buildPuzzleForRole();
        }
        if (typeof data.score === 'number') state.score = data.score;
        if (typeof data.energy === 'number') state.energy = data.energy;
        if (typeof data.shield === 'number') state.shield = data.shield;
        if (typeof data.life === 'number') state.life = data.life;
        if (data.radioText) state.radioText = data.radioText;
        if (data.crew) {
          ROLES.forEach(r => {
            if (!data.crew[r]) return;
            if (r !== state.myRole) {
              state.crew[r] = { attempts: 3, ...data.crew[r] };
            } else {
              /* Ma fiche : j'adopte le nom/identifiant du cloud, mais je garde mes tentatives et mon état "validé" locaux */
              state.crew[r] = { ...data.crew[r], done: state.crew[r].done, attempts: state.crew[r].attempts };
            }
          });
        }
        if (state.started) {
          renderUI();
          checkTeamReady();
        }
      }, (err) => netUnavailable((err && err.code) || 'lecture refusée'));
    }
