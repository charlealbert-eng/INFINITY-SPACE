/* MINI-JEUX : un puzzle par rôle */
    // --- MINI-JEUX PÉDAGOGIQUES (NIVEAU LYCÉE) ---
    window.puzzle = null;

    function buildPuzzleForRole() {
      const r = state.myRole || 'energy';
      const heading = document.getElementById('puzzle-heading');
      const inst = document.getElementById('puzzle-instructions');
      const body = document.getElementById('puzzle-body');
      const sol = state.sol;

      if (r === 'energy') {
        const cells = Array.from({ length: 6 }, () => (Math.floor(Math.random() * 5) + 2 + sol) * 5);
        const target = cells[0] + cells[2] + cells[4];
        state.puzzle = { type: 'energy', cells, target, picked: new Set() };
        heading.textContent = `Calibrage Réacteur : ${target} MW requis`;
        inst.textContent = 'Sélectionnez exactement 3 cellules solaires dont la somme égale la puissance cible.';
        body.innerHTML = `
          <div class="grid grid-cols-3 gap-2.5">
            ${cells.map((val, idx) => `
              <button type="button" id="p-cell-${idx}" onclick="toggleEnergyCell(${idx})"
                class="game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-base font-bold text-amber-300">
                +${val} MW
              </button>
            `).join('')}
          </div>
          <div class="text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
            Somme actuelle : <strong id="p-energy-sum" class="text-amber-300">0 MW</strong> / ${target} MW
          </div>
        `;
      } else if (r === 'shield') {
        const start = 12 + sol * 2;
        const step = 5 + sol;
        const seq = [start, start + step, start + step * 2, start + step * 3];
        const ans = start + step * 4;
        const opts = [ans, ans + step, ans - 3, ans + 8].sort(() => Math.random() - 0.5);
        state.puzzle = { type: 'shield', answer: ans, chosen: null, seq, step };
        heading.textContent = 'Harmonisation Bouclier Fréquentiel';
        inst.textContent = `Complétez la suite logique : ${seq.join(' → ')} → [ ? ]`;
        body.innerHTML = `
          <div class="grid grid-cols-2 gap-3">
            ${opts.map((opt, idx) => `
              <button type="button" id="p-shield-${idx}" onclick="pickShieldOpt(${opt}, ${idx})"
                class="game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-lg font-bold text-rose-300">
                ${opt} Hz
              </button>
            `).join('')}
          </div>
        `;
      } else if (r === 'life') {
        const wTarget = 55 + sol * 5;
        const lTarget = 60 + sol * 4;
        state.puzzle = { type: 'life', wTarget, lTarget, water: 50, light: 50 };
        heading.textContent = `Régulation Serre O₂ : Eau ${wTarget}% | Lumière ${lTarget}%`;
        inst.textContent = 'Ajustez les curseurs pour correspondre exactement aux valeurs de la biosphère.';
        body.innerHTML = `
          <div class="hud-subpanel p-4 space-y-3">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-slate-400">DÉBIT EAU H₂O</span>
              <span id="life-w-val" class="text-emerald-400 font-bold">50%</span>
            </div>
            <input type="range" min="30" max="95" step="5" value="50" oninput="updateLifeSlider('water', this.value)" class="w-full accent-emerald-400 cursor-pointer" />
            <div class="flex justify-between text-xs font-mono pt-2">
              <span class="text-slate-400">INTENSITÉ LUMINEUSE</span>
              <span id="life-l-val" class="text-teal-400 font-bold">50%</span>
            </div>
            <input type="range" min="30" max="95" step="5" value="50" oninput="updateLifeSlider('light', this.value)" class="w-full accent-teal-400 cursor-pointer" />
          </div>
        `;
      } else if (r === 'comms') {
        const targetNum = 6 + sol * 2;
        state.puzzle = { type: 'comms', targetNum, bits: [0, 0, 0, 0] };
        heading.textContent = `Encodage Canal Télémétrie : #${targetNum}`;
        inst.textContent = 'Activez les interrupteurs binaires (8 - 4 - 2 - 1) pour composer le nombre.';
        body.innerHTML = `
          <div class="grid grid-cols-4 gap-2.5">
            ${[8, 4, 2, 1].map((w, idx) => `
              <button type="button" id="p-bit-${idx}" onclick="flipBit(${idx})"
                class="game-btn p-4 rounded-xl border-2 border-slate-700 bg-slate-900/90 text-center">
                <div class="text-[10px] font-mono text-slate-400">BIT ${w}</div>
                <div id="p-bit-lbl-${idx}" class="font-display text-2xl font-bold text-slate-500 mt-1">0</div>
              </button>
            `).join('')}
          </div>
          <div class="text-xs font-mono text-sky-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800">
            Total composé : <strong id="p-comms-val">0</strong> / ${targetNum}
          </div>
        `;
      } else {
        const mass = 4 + sol;
        const accel = 3 + (sol % 3);
        const ans = mass * accel;
        const opts = [ans, ans + mass, ans - accel, ans + 4].sort(() => Math.random() - 0.5);
        state.puzzle = { type: 'nav', answer: ans, chosen: null, mass, accel };
        heading.textContent = 'Calcul de Poussée Orbitale (F = m × a)';
        inst.textContent = `Masse = ${mass} t | Accélération = ${accel} m/s²`;
        body.innerHTML = `
          <div class="grid grid-cols-2 gap-3">
            ${opts.map((opt, idx) => `
              <button type="button" id="p-nav-${idx}" onclick="pickNav(${opt}, ${idx})"
                class="game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-base font-bold text-slate-300">
                ${opt} kN
              </button>
            `).join('')}
          </div>
        `;
      }
    }

    window.toggleEnergyCell = function(idx) {
      playSfx('click');
      const p = state.puzzle;
      if (!p || p.type !== 'energy') return;
      const btn = document.getElementById(`p-cell-${idx}`);
      if (p.picked.has(idx)) {
        p.picked.delete(idx);
        btn.className = "game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-base font-bold text-amber-300";
      } else {
        p.picked.add(idx);
        btn.className = "game-btn p-3.5 rounded-xl border-2 border-amber-400 bg-amber-500/25 font-display text-base font-bold text-white shadow-lg";
      }
      let sum = 0;
      p.picked.forEach(i => { sum += p.cells[i]; });
      document.getElementById('p-energy-sum').textContent = `${sum} MW`;
    };

    window.pickShieldOpt = function(val, idx) {
      playSfx('click');
      const p = state.puzzle;
      if (!p || p.type !== 'shield') return;
      p.chosen = val;
      for (let i = 0; i < 4; i++) {
        const el = document.getElementById(`p-shield-${i}`);
        if (!el) continue;
        el.className = i === idx
          ? "game-btn p-3.5 rounded-xl border-2 border-rose-400 bg-rose-500/25 font-display text-lg font-bold text-white shadow-lg"
          : "game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-lg font-bold text-slate-300";
      }
    };

    window.updateLifeSlider = function(prop, val) {
      state.puzzle[prop] = Number(val);
      document.getElementById(`life-${prop === 'water' ? 'w' : 'l'}-val`).textContent = val + '%';
    };

    window.submitMyTask = async function() {
      if (state.gameOver || !state.puzzle || state.crew[state.myRole]?.done) return;
      const p = state.puzzle;
      let ok = false;

      if (p.type === 'energy') ok = p.picked.size === 3 && [...p.picked].reduce((s, c) => s + p.cells[c], 0) === p.target;
      if (p.type === 'shield') ok = p.chosen === p.answer;
      if (p.type === 'life')   ok = Math.abs(p.water - p.wTarget) <= 5 && Math.abs(p.light - p.lTarget) <= 5;
      if (p.type === 'comms')  ok = p.bits.reduce((acc, b, idx) => acc + b * [8, 4, 2, 1][idx], 0) === p.targetNum;
      if (p.type === 'nav')    ok = p.chosen === p.answer;

      const msg = document.getElementById('puzzle-status-msg');
      if (!ok) {
        playSfx('fail');
        triggerShake();
        const currentAttempts = Math.max(0, (state.crew[state.myRole].attempts ?? 3) - 1);
        state.crew[state.myRole].attempts = currentAttempts;
        addScore(-150);

        if (currentAttempts <= 0) {
          const reason = `💥 ${state.playerName} (${ROLE_META[state.myRole].label}) a épuisé ses 3 tentatives ! Échec collectif de la base.`;
          state.gameOver = true;
          state.failReason = reason;
          state.radioText = reason;
          renderUI();
          openEndModal(false, reason);
          await syncToCloud();
          return;
        }

        state.radioText = `⚠️ Erreur de calcul de ${state.playerName} (${currentAttempts}/3 tentatives restantes).`;
        msg.textContent = `❌ Erreur ! Il vous reste ${currentAttempts}/3 tentative(s).`;
        msg.className = "text-xs font-mono text-rose-400 font-bold";
        renderUI();
        await syncToCloud();
        return;
      }

      playSfx('success');
      state.crew[state.myRole].done = true;
      addScore(250 + state.secondsLeft * 5);
      state.radioText = `✔ ${state.playerName} a verrouillé le poste ${ROLE_META[state.myRole].label} !`;
      msg.textContent = "✅ Poste verrouillé avec succès ! En attente de l'escouade...";
      msg.className = "text-xs font-mono text-emerald-400 font-bold";

      const btnSubmit = document.getElementById('btn-submit-task');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = '✅ Poste Verrouillé';
      }

      showDebrief(p);
      renderUI();
      await syncToCloud();
      checkTeamReady();
    };

    window.sendQuickRadio = async function(txt) {
      playSfx('click');
      state.radioText = `[${state.playerName}] ${txt}`;
      renderUI();
      await syncToCloud();
    };

    /* --- Réparations : ces deux fonctions étaient appelées par la page mais n'existaient pas --- */
    window.flipBit = function(idx) {
      playSfx('click');
      const p = state.puzzle;
      if (!p || p.type !== 'comms') return;
      p.bits[idx] = p.bits[idx] ? 0 : 1;
      const on = p.bits[idx] === 1;
      document.getElementById(`p-bit-${idx}`).className = on
        ? "game-btn p-4 rounded-xl border-2 border-sky-400 bg-sky-500/25 text-center shadow-lg"
        : "game-btn p-4 rounded-xl border-2 border-slate-700 bg-slate-900/90 text-center";
      const lbl = document.getElementById(`p-bit-lbl-${idx}`);
      lbl.textContent = p.bits[idx];
      lbl.className = on ? "font-display text-2xl font-bold text-white mt-1" : "font-display text-2xl font-bold text-slate-500 mt-1";
      const total = p.bits.reduce((acc, b, i) => acc + b * [8, 4, 2, 1][i], 0);
      document.getElementById('p-comms-val').textContent = total;
    };

    window.pickNav = function(val, idx) {
      playSfx('click');
      const p = state.puzzle;
      if (!p || p.type !== 'nav') return;
      p.chosen = val;
      for (let i = 0; i < 4; i++) {
        const el = document.getElementById(`p-nav-${i}`);
        if (!el) continue;
        el.className = i === idx
          ? "game-btn p-3.5 rounded-xl border-2 border-purple-400 bg-purple-500/25 font-display text-base font-bold text-white shadow-lg"
          : "game-btn p-3.5 rounded-xl border-2 border-slate-700 bg-slate-900/90 font-display text-base font-bold text-slate-300";
      }
    };

    /* --- COMPTE-RENDU : affiché au joueur qui a fini, pendant que les autres terminent --- */
    function debriefText(p) {
      if (p.type === 'energy') {
        const v = [...p.picked].map(i => p.cells[i]);
        return { calc: `${v.join(' + ')} = ${v.reduce((a, b) => a + b, 0)} MW`,
          why: `Le réacteur a besoin d'une puissance exacte de ${p.target} MW. En additionnant 3 cellules solaires bien choisies, tu atteins pile cette cible : ni trop (surchauffe), ni trop peu (coupure).` };
      }
      if (p.type === 'shield') {
        return { calc: `${p.seq.join(' → ')} → ${p.answer}   (pas de +${p.step})`,
          why: `C'est une suite arithmétique : on ajoute toujours ${p.step}. Le terme suivant est donc ${p.seq[3]} + ${p.step} = ${p.answer} Hz, la fréquence qui stabilise le bouclier.` };
      }
      if (p.type === 'life') {
        return { calc: `Eau ${p.water}% (cible ${p.wTarget}%) · Lumière ${p.light}% (cible ${p.lTarget}%)`,
          why: `Les plantes produisent l'oxygène par photosynthèse : il leur faut le bon équilibre entre eau et lumière. Tes réglages sont dans la marge de ±5 %, la serre fonctionne.` };
      }
      if (p.type === 'comms') {
        const w = [8, 4, 2, 1], on = p.bits.map((b, i) => b ? w[i] : null).filter(x => x !== null);
        return { calc: `${p.bits.join('')} (binaire) = ${on.join(' + ') || '0'} = ${p.targetNum}`,
          why: `Les ordinateurs comptent en binaire : chaque interrupteur allumé vaut 8, 4, 2 ou 1. En les additionnant, tu composes le nombre ${p.targetNum} du canal radio.` };
      }
      return { calc: `F = m × a = ${p.mass} × ${p.accel} = ${p.answer} kN`,
        why: `La seconde loi de Newton relie la force, la masse et l'accélération. Avec ${p.mass} tonnes et ${p.accel} m/s², la poussée nécessaire est ${p.answer} kN.` };
    }

    function showDebrief(p) {
      const body = document.getElementById('puzzle-body');
      const head = document.getElementById('puzzle-heading');
      const inst = document.getElementById('puzzle-instructions');
      if (!body) return;
      const d = debriefText(p);
      if (head) head.textContent = '✅ Poste verrouillé : compte-rendu de mission';
      if (inst) inst.textContent = 'Bravo ! Voici pourquoi ta réponse est la bonne.';
      body.innerHTML = `
        <div class="hud-subpanel p-4 space-y-3 border-emerald-400/40">
          <div class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Calcul effectué</div>
          <div class="font-display text-sm sm:text-base font-bold text-white break-words">${d.calc}</div>
          <div class="text-[10px] font-mono text-sky-300 uppercase tracking-widest pt-1">Pourquoi ça marche</div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${d.why}</p>
        </div>
        <div id="debrief-wait" class="text-xs font-mono text-amber-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800"></div>`;
      updateDebriefWait();
    }

    function updateDebriefWait() {
      const el = document.getElementById('debrief-wait');
      if (!el) return;
      const waiting = ROLES.filter(r => !state.crew[r].done);
      el.textContent = waiting.length
        ? '⏳ En attente de : ' + waiting.map(r => `${ROLE_META[r].icon} ${ROLE_META[r].label} (${state.crew[r].name})`).join(', ')
        : '🚀 Tout le monde a fini : la prochaine mission démarre…';
    }
