/* FOND ÉTOILÉ */
    window.addEventListener('load', () => {
      const canvas = document.getElementById('space-bg-canvas');
      const ctx = canvas.getContext('2d');
      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resize);
      resize();
      function anim() {
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(anim);
      }
      anim();
    });
