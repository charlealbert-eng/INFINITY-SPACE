/* SALON : affichage (selectGameMode, updateLobbyUI) */
    window.selectGameMode = function(mode) {
      playSfx('click');
      if (mode === 'coop' && !state.netOk) {
        showLobbyError("Le multijoueur n'est pas disponible : voir le message réseau en haut du salon.");
        return;
      }
      state.gameMode = mode;
      updateLobbyUI();
    };

    function updateLobbyUI() {
      const isSolo = state.gameMode === 'solo';
      const btnSolo = document.getElementById('mode-btn-solo');
      const btnCoop = document.getElementById('mode-btn-coop');
      if (btnSolo && btnCoop) {
        btnSolo.className = isSolo
          ? 'game-btn p-3.5 rounded-xl border-2 border-emerald-400 bg-emerald-500/15 text-left flex items-center gap-3 shadow-lg'
          : 'game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/85 text-left flex items-center gap-3 opacity-80';
        btnCoop.className = !isSolo
          ? 'game-btn p-3.5 rounded-xl border-2 border-sky-400 bg-sky-500/15 text-left flex items-center gap-3 shadow-lg'
          : 'game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/85 text-left flex items-center gap-3 opacity-80';
      }

      const coopRoomBox = document.getElementById('coop-room-box');
      const coopCmdRow = document.getElementById('coop-commander-row');
      if (coopRoomBox) coopRoomBox.classList.toggle('hidden', isSolo);
      if (coopCmdRow) coopCmdRow.classList.toggle('hidden', isSolo);

      const aiCheckbox = document.getElementById('lobby-ai-fill');
      state.useAiBots = isSolo ? true : (aiCheckbox?.checked || false);
      const amIAdmin = isMeAdmin();

      const aiBox = document.getElementById('commander-ai-box');
      if (aiBox && aiCheckbox) {
        aiCheckbox.disabled = !amIAdmin;
        aiBox.classList.toggle('opacity-50', !amIAdmin);
      }

      const cmdLabel = document.getElementById('commander-label');
      const cmdBadge = document.getElementById('commander-badge');
      if (cmdLabel && cmdBadge) {
        if (!state.commanderId) {
          cmdLabel.textContent = '👑 Enregistrement de l’Admin en cours...';
          cmdBadge.textContent = 'EN COURS';
        } else if (amIAdmin) {
          cmdLabel.textContent = `👑 Vous êtes l'Admin (${state.playerName})`;
          cmdBadge.textContent = 'VOUS (ADMIN)';
          cmdBadge.className = 'px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold';
        } else {
          cmdLabel.textContent = `👑 Admin : ${state.commanderName || 'Hôte'}`;
          cmdBadge.textContent = 'ACTIF';
          cmdBadge.className = 'px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold';
        }
      }

      const accents = {
        energy: 'border-amber-400 bg-amber-500/20 shadow-lg',
        shield: 'border-rose-400 bg-rose-500/20 shadow-lg',
        life:   'border-emerald-400 bg-emerald-500/20 shadow-lg',
        comms:  'border-sky-400 bg-sky-500/20 shadow-lg',
        nav:    'border-purple-400 bg-purple-500/20 shadow-lg'
      };

      let reservedCount = 0;
      ROLES.forEach(r => {
        const seat = isSolo
          ? (state.myRole === r ? { playerId: state.playerId, name: state.playerName } : null)
          : state.lobbySeats[r];
        if (seat) reservedCount++;
        const card = document.getElementById(`role-card-${r}`);
        const ownerBadge = document.getElementById(`role-owner-${r}`);
        if (!card || !ownerBadge) return;
        const span = r === 'nav' ? ' sm:col-span-2 lg:col-span-2' : '';

        if (seat && seat.playerId === state.playerId) {
          card.disabled = false;
          card.className = `game-btn p-3.5 rounded-xl border-2 ${accents[r]} text-left${span}`;
          ownerBadge.textContent = `✔ Vous (${seat.name})`;
          ownerBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-300 font-bold';
        } else if (seat && seat.playerId !== state.playerId) {
          card.disabled = false;
          card.className = `p-3.5 rounded-xl border-2 border-sky-500/40 bg-slate-900/90 text-left${span}`;
          ownerBadge.textContent = `👥 ${seat.name}`;
          ownerBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold';
        } else {
          card.disabled = false;
          card.className = `game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/85 text-left opacity-90 hover:opacity-100${span}`;
          ownerBadge.textContent = 'Libre';
          ownerBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300';
        }
      });

      const slotsCount = document.getElementById('lobby-slots-count');
      if (slotsCount) {
        slotsCount.textContent = `${reservedCount} / 5 postes réservés en direct`;
      }

      const btnLaunch = document.getElementById('btn-launch-mission');
      if (btnLaunch) {
        if (!amIAdmin && !isSolo) {
          btnLaunch.disabled = true;
          btnLaunch.textContent = `⏳ En attente du lancement par l'Admin (${state.commanderName || 'Hôte'})`;
          btnLaunch.className = 'w-full py-4 rounded-xl bg-slate-900 border border-sky-500/40 text-sky-300 font-display font-bold text-xs sm:text-sm tracking-wider uppercase cursor-not-allowed';
        } else if (!state.myRole) {
          btnLaunch.disabled = true;
          btnLaunch.textContent = '👆 Sélectionnez d’abord votre poste ci-dessus';
          btnLaunch.className = 'w-full py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 font-display font-bold text-xs sm:text-sm tracking-wider uppercase cursor-not-allowed';
        } else if (reservedCount < 5 && !state.useAiBots && !isSolo) {
          btnLaunch.disabled = true;
          btnLaunch.textContent = `⏳ En attente des coéquipiers (${reservedCount}/5) ou cochez l'option IA`;
          btnLaunch.className = 'w-full py-4 rounded-xl bg-slate-800 border border-amber-500/40 text-amber-300 font-display font-bold text-xs sm:text-sm tracking-wider uppercase cursor-not-allowed';
        } else {
          btnLaunch.disabled = false;
          btnLaunch.textContent = isSolo ? '🎮 Lancer la Mission Solo' : '🚀 Lancer la Mission (Admin)';
          btnLaunch.className = 'game-btn w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-slate-950 font-display font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-sky-500/25';
        }
      }
    }
    window.updateLobbyUI = updateLobbyUI;
