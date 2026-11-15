/* EFFETS : fin de mission, vibration, bannière */
    function openEndModal(victory, description) {
      const modal = document.getElementById('endgame-modal');
      document.getElementById('end-icon').textContent = victory ? '🏆' : '💥';
      document.getElementById('end-subtitle').textContent = victory ? 'MISSION ACCOMPLIE' : 'MISSION INTERROMPUE';
      document.getElementById('end-title').textContent = victory ? 'VICTOIRE DE L’ESCOUADE' : 'ÉCHEC COLLECTIF';
      document.getElementById('end-desc').textContent = description;
      document.getElementById('end-score').textContent = state.score.toLocaleString('fr-FR');
      document.getElementById('end-sol').textContent = `Sol ${state.sol} / ${state.maxSols}`;

      const btnRestart = document.getElementById('btn-restart-mission');
      const hintRestart = document.getElementById('end-restart-hint');
      if (btnRestart && hintRestart) {
        if (isMeAdmin()) {
          btnRestart.disabled = false;
          btnRestart.textContent = '🔄 Relancer la Mission (Admin)';
          btnRestart.className = 'game-btn w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-display font-black text-sm uppercase tracking-wider';
          hintRestart.classList.add('hidden');
        } else {
          btnRestart.disabled = true;
          btnRestart.textContent = `🔒 Seul l'Admin (${state.commanderName || 'Hôte'}) peut relancer`;
          btnRestart.className = 'w-full py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 font-display font-bold text-xs uppercase tracking-wider cursor-not-allowed';
          hintRestart.textContent = `Seul l'Admin du salon peut relancer la partie.`;
          hintRestart.classList.remove('hidden');
        }
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    window.restartMission = async function() {
      playSfx('click');
      if (!isMeAdmin()) return;
      state.sol = 1;
      state.secondsLeft = 75;
      state.score = 1500;
      state.victory = false;
      state.energy = 75;
      state.shield = 75;
      state.life = 75;
      state.gameOver = false;
      state.failReason = '';
      state.radioText = `🔄 Nouvelle tentative lancée par l'Admin ${state.playerName} !`;
      ROLES.forEach(r => {
        state.crew[r].done = false;
        state.crew[r].attempts = 3;
      });
      document.getElementById('endgame-modal').classList.add('hidden');
      document.getElementById('endgame-modal').classList.remove('flex');
      buildPuzzleForRole();
      renderUI();
      await syncToCloud('shared', true);
    };

    function triggerShake() {
      const grid = document.getElementById('game-main-grid');
      if (!grid) return;
      grid.classList.remove('shake-fx');
      void grid.offsetWidth;
      grid.classList.add('shake-fx');
    }

    function showCinematicBanner(title, sub) {
      const toast = document.getElementById('cinematic-toast');
      if (!toast) return;
      document.getElementById('cinematic-title').textContent = title;
      document.getElementById('cinematic-sub').textContent = sub;
      toast.classList.remove('hidden', 'cinematic-banner');
      void toast.offsetWidth;
      toast.classList.add('cinematic-banner');
    }
