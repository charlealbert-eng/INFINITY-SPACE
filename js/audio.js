/* AUDIO : sons du jeu (playSfx, toggleAudio) */
    let audioEnabled = true;
    let audioCtx = null;

    function playSfx(type) {
      if (!audioEnabled) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'click') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.07);
        } else if (type === 'success') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(659, now + 0.09);
          osc.frequency.setValueAtTime(880, now + 0.18);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === 'fail') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.linearRampToValueAtTime(85, now + 0.45);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
          osc.start(now);
          osc.stop(now + 0.48);
        } else if (type === 'tick') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(920, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
        }
      } catch (e) {}
    }

    window.toggleAudio = function() {
      audioEnabled = !audioEnabled;
      const icon = audioEnabled ? '🔊' : '🔇';
      const l1 = document.getElementById('sound-icon-lobby');
      const l2 = document.getElementById('sound-icon-hud');
      if (l1) l1.textContent = icon;
      if (l2) l2.textContent = icon;
      if (audioEnabled) playSfx('click');
    };
