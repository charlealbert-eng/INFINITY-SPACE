/* FOND 3D : Mars tourne derrière toutes les pages et réagit aux manipulations (clic, glissement, décision). */
(function () {
  let boost = 0, mx = 0, my = 0, drag = false, lx = 0;
  window.marsKick = (n = 1) => { boost = Math.min(boost + n * .06, .18); };
  window.addEventListener("DOMContentLoaded", () => {
    if (typeof THREE === "undefined") return;
    const cv = document.createElement("canvas"); cv.id = "bg-mars"; document.body.prepend(cv);
    let rd; try { rd = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true }); } catch (e) { return; }
    rd.setPixelRatio(1);
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, .1, 100); cam.position.z = 6;
    const mat = new THREE.MeshStandardMaterial({ map: mapProceduralTexture(), roughness: 1 });
    const mars = new THREE.Mesh(new THREE.SphereGeometry(2.6, 64, 64), mat);
    const atm = new THREE.Mesh(new THREE.SphereGeometry(2.72, 48, 48), new THREE.MeshBasicMaterial({ color: 0xff8a50, transparent: true, opacity: .1, side: THREE.BackSide }));
    const g = new THREE.Group(); g.add(mars, atm); sc.add(g);
    const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(new Float32Array(Array.from({ length: 450 }, () => (Math.random() - .5) * 60)), 3)), new THREE.PointsMaterial({ color: 0xffffff, size: .05 }));
    sc.add(stars, new THREE.AmbientLight(0x553322, .9));
    const L = new THREE.DirectionalLight(0xfff0e0, 1.6); L.position.set(5, 2, 5); sc.add(L);
    mapLoadTexture((t) => { mat.map = t; mat.needsUpdate = true; });
    function size() { const w = innerWidth, h = innerHeight; rd.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); g.position.set(w > h ? 2.6 : 0, w > h ? 0 : 1.6, 0); }
    addEventListener("resize", size); size();
    addEventListener("pointerdown", (e) => { drag = true; lx = e.clientX; marsKick(1.5); });
    addEventListener("pointerup", () => (drag = false));
    addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; if (drag) { mars.rotation.y += (e.clientX - lx) * .006; lx = e.clientX; } });
    document.addEventListener("click", (e) => { if (e.target.closest("button")) marsKick(1); }, true);
    (function loop() {
      requestAnimationFrame(loop); if (document.hidden) return;
      boost *= .96; mars.rotation.y += .0012 + boost * .1; g.rotation.x += (my * .35 - g.rotation.x) * .05; g.rotation.z = mx * .1;
      stars.rotation.y += .0002; rd.render(sc, cam);
    })();
  });
})();
