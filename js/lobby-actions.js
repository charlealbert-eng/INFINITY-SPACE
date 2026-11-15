/* SALON : actions (choix de rôle, lancement, lien de partage) */
    function setupLobbyListeners() {
      const inputRoom = document.getElementById('lobby-room-code');
      const inputName = document.getElementById('lobby-player-name');
      if (inputRoom) {
        inputRoom.value = defaultRoom;
        inputRoom.addEventListener('input', () => {
          clearTimeout(roomInputTimer);
          roomInputTimer = setTimeout(() => {
            state.roomCode = (inputRoom.value.trim() || 'ARTEMIS-5').toUpperCase();
            state.myRole = null;
            state.lobbySeats = { energy: null, shield: null, life: null, comms: null, nav: null };
            updateLobbyUI();
            subscribeToRoom();
          }, 300);
        });
      }
      if (inputName) {
        inputName.addEventListener('input', () => {
          state.playerName = inputName.value.trim() || 'Astronaute';
          if (isMeAdmin()) state.commanderName = state.playerName;
          if (state.myRole) state.lobbySeats[state.myRole] = { playerId: state.playerId, name: state.playerName };
          updateLobbyUI();
          announcePresenceInRoom(isMeAdmin());
        });
      }
      updateLobbyUI();
    }

    function showLobbyError(msg) {
      const errEl = document.getElementById('lobby-role-error');
      if (!errEl) return;
      if (!msg) {
        errEl.classList.add('hidden');
        errEl.textContent = '';
      } else {
        errEl.textContent = msg;
        errEl.classList.remove('hidden');
      }
    }

    window.copyShareLink = function() {
      playSfx('click');
      const code = (document.getElementById('lobby-room-code')?.value || 'ARTEMIS-5').trim().toUpperCase();
      const url = new URL(window.location.href);
      url.searchParams.set('room', code);
      const temp = document.createElement('input');
      temp.value = url.toString();
      document.body.appendChild(temp);
      temp.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(temp);
      const toast = document.getElementById('share-toast');
      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3500);
      }
    };

    window.pickRole = async function(role) {
      playSfx('click');
      showLobbyError('');
      state.playerName = document.getElementById('lobby-player-name').value.trim() || 'Astronaute';
      state.roomCode = (document.getElementById('lobby-room-code')?.value.trim() || 'ARTEMIS-5').toUpperCase();

      ROLES.forEach(r => {
        if (state.lobbySeats[r]?.playerId === state.playerId) {
          state.lobbySeats[r] = null;
        }
      });

      state.myRole = role;
      state.lobbySeats[role] = { playerId: state.playerId, name: state.playerName };
      updateLobbyUI();
      await syncMyPlayerChoice(role);
    };

    window.launchMission = async function() {
      playSfx('click');
      const isSolo = state.gameMode === 'solo';

      if (!isSolo && !isMeAdmin()) {
        showLobbyError(`🔒 Seul l'Admin (${state.commanderName || 'Hôte'}) peut lancer la mission.`);
        return;
      }

      state.playerName = document.getElementById('lobby-player-name').value.trim() || 'Astronaute';
      state.useAiBots = isSolo ? true : document.getElementById('lobby-ai-fill').checked;

      if (!state.myRole) {
        showLobbyError("⚠️ Veuillez sélectionner votre poste avant de lancer.");
        return;
      }

      let reservedCount = 0;
      ROLES.forEach(r => {
        if (state.lobbySeats[r] && state.lobbySeats[r].playerId) reservedCount++;
      });

      if (reservedCount < 5 && !state.useAiBots && !isSolo) {
        showLobbyError(`⏳ Il manque des joueurs (${reservedCount}/5). Cochez l'option IA pour lancer avec des robots.`);
        return;
      }

      ROLES.forEach(r => {
        const seat = state.lobbySeats[r];
        if (seat && seat.playerId) {
          state.crew[r] = { playerId: seat.playerId, name: seat.name, done: false, attempts: 3, isBot: false };
        } else if (state.useAiBots || isSolo) {
          state.crew[r] = { playerId: `bot_${r}`, name: `IA-${r.toUpperCase()}`, done: false, attempts: 3, isBot: true };
        }
      });

      state.started = true;
      state.sol = 1;
      state.secondsLeft = 75;
      state.gameOver = false;
      state.failReason = '';
      state.radioText = `🚀 Mission lancée par l'Admin ${state.playerName} ! Synchronisation immédiate.`;

      document.getElementById('lobby-modal').classList.add('hidden');
      buildPuzzleForRole();
      renderUI();
      startTimer();
      await syncToCloud('shared', true);
    };

    function enterGameFromLobby(data) {
      state.started = true;
      if (data && data.sol) state.sol = data.sol;
      if (data && typeof data.score === 'number') state.score = data.score;
      document.getElementById('lobby-modal').classList.add('hidden');
      buildPuzzleForRole();
      renderUI();
      startTimer();
    }
