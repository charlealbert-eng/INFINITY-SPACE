/* JEU : chrono, passage au sol suivant, affichage (renderUI) */
    let timerInterval = null;
    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(async () => {
        if (!state.started || state.gameOver) return;
        state.secondsLeft--;
        if (state.secondsLeft <= 10 && state.secondsLeft > 0) playSfx('tick');

        let botUpdated = false;
        ROLES.forEach(r => {
          if (isMeAdmin() && state.crew[r].isBot && !state.crew[r].done && state.secondsLeft <= 50 && Math.random() < 0.25) {
            state.crew[r].done = true;
            addScore(200);
            state.radioText = `🤖 ${state.crew[r].name} a verrouillé son poste !`;
            botUpdated = true;
          }
        });

        renderUI();
        if (botUpdated) {
          await syncToCloud('bots');
          checkTeamReady();
        }

        if (state.secondsLeft <= 0) {
          if (isMeAdmin()) await nextLunarDay(true);
          else state.secondsLeft = 0; /* l'Admin décide de la suite */
        }
      }, 1000);
    }

    async function checkTeamReady() {
      if (state.gameOver || !isMeAdmin()) return; /* seul l'Admin fait avancer les jours */
      if (ROLES.every(r => state.crew[r].done)) {
        await nextLunarDay(false);
      }
    }

    async function nextLunarDay(byTimeout) {
      if (state.gameOver) return;
      const incomplete = ROLES.filter(r => !state.crew[r].done);
      if (byTimeout && incomplete.length > 0) {
        playSfx('fail');
        triggerShake();
        const reason = `⏳ Temps écoulé ! L'équipe n'a pas validé tous les postes à temps. Échec de la mission.`;
        state.gameOver = true;
        state.failReason = reason;
        state.radioText = reason;
        renderUI();
        openEndModal(false, reason);
        await syncToCloud('shared');
        return;
      }

      playSfx('success');
      state.energy = Math.min(100, state.energy + 8);
      state.shield = Math.min(100, state.shield + 8);
      state.life   = Math.min(100, state.life + 8);
      addScore(500 + state.secondsLeft * 10);

      if (state.sol >= state.maxSols) {
        state.gameOver = true;
        state.victory = true;
        addScore(2000);
        renderUI();
        openEndModal(true, "Victoire totale ! L'escouade a survécu aux 5 Sols lunaires.");
        await syncToCloud('shared');
        return;
      }

      state.sol++;
      state.secondsLeft = 75;
      ROLES.forEach(r => {
        state.crew[r].done = false;
        state.crew[r].attempts = 3;
      });
      state.radioText = `☀️ Jour Lunaire ${state.sol} ! Nouveaux calculs attribués.`;
      showCinematicBanner(`JOUR LUNAIRE ${state.sol} / ${state.maxSols}`, 'SYNCHRONISATION ORBITALE');
      buildPuzzleForRole();
      renderUI();
      await syncToCloud('shared');
    }

    function renderUI() {
      if (typeof updateDebriefWait === 'function') updateDebriefWait();
      document.getElementById('hud-commander-name').textContent = state.commanderName || state.playerName;
      document.getElementById('hud-my-name').textContent = state.playerName;
      document.getElementById('hud-sol').textContent = state.sol;
      document.getElementById('hud-max-sol').textContent = state.maxSols;
      document.getElementById('hud-score').textContent = state.score.toLocaleString('fr-FR');
      document.getElementById('hud-radio-text').textContent = state.radioText;

      const myAtt = state.crew[state.myRole]?.attempts ?? 3;
      const attEl = document.getElementById('hud-my-attempts');
      if (attEl) attEl.textContent = `${'❤️'.repeat(myAtt)} (${myAtt}/3)`;

      const mins = String(Math.floor(state.secondsLeft / 60)).padStart(2, '0');
      const secs = String(state.secondsLeft % 60).padStart(2, '0');
      const timerEl = document.getElementById('hud-timer');
      timerEl.textContent = `${mins}:${secs}`;

      document.getElementById('val-energy').textContent = `${state.energy}%`;
      document.getElementById('bar-energy').style.width = `${state.energy}%`;
      document.getElementById('val-shield').textContent = `${state.shield}%`;
      document.getElementById('bar-shield').style.width = `${state.shield}%`;
      document.getElementById('val-life').textContent = `${state.life}%`;
      document.getElementById('bar-life').style.width = `${state.life}%`;

      let readyCount = 0;
      const crewList = document.getElementById('crew-status-list');
      crewList.innerHTML = ROLES.map(r => {
        const c = state.crew[r];
        if (c.done) readyCount++;
        const meta = ROLE_META[r];
        const isMe = r === state.myRole;
        return `
          <div class="p-2.5 rounded-lg hud-subpanel flex items-center justify-between ${isMe ? 'border-sky-400/60 bg-sky-500/10' : ''}">
            <div class="min-w-0">
              <div class="text-[11px] font-mono font-bold ${meta.color}">${meta.icon} ${meta.label}</div>
              <div class="text-xs text-slate-200 truncate">${c.name || 'Poste libre'} ${isMe ? '(Vous)' : ''}</div>
            </div>
            <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 ${
              c.done ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/15 text-amber-300 border border-amber-400/25'
            }">
              ${c.done ? '✔ PRÊT' : '⏳ ACTIF'}
            </span>
          </div>
        `;
      }).join('');

      document.getElementById('hud-ready-count').textContent = readyCount;

      const teams = [
        { name: `⭐ ${state.roomCode} (Vous)`, score: state.score, isMe: true },
        { name: '🛰️ APOLLO-IX', score: 1400 + state.sol * 580, isMe: false },
        { name: '🚀 ORION-04', score: 1250 + state.sol * 510, isMe: false }
      ].sort((a, b) => b.score - a.score);

      const lbEl = document.getElementById('leaderboard-list');
      lbEl.innerHTML = teams.map((t, i) => `
        <div class="px-3 py-2 rounded-lg hud-subpanel flex items-center justify-between text-xs ${t.isMe ? 'border-amber-400/60 bg-amber-500/10' : ''}">
          <span class="font-mono font-bold ${t.isMe ? 'text-amber-300' : 'text-slate-300'}">#${i + 1} ${t.name}</span>
          <span class="font-display font-bold text-white">${t.score.toLocaleString('fr-FR')}</span>
        </div>
      `).join('');
    }
