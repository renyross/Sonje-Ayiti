(() => {
  document.querySelectorAll('#album .album-category-panel, #programmes .album-category-panel').forEach(panel => {
    const slides = [...panel.querySelectorAll('.album-slide')];
    const stage = panel.querySelector('.album-stage');
    let current = 0, start = null;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      panel.querySelector('.album-position').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
    panel.querySelector('.album-controls').hidden = false;
    panel.querySelector('.album-prev').addEventListener('click', () => show(current - 1));
    panel.querySelector('.album-next').addEventListener('click', () => show(current + 1));
    stage.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    stage.addEventListener('touchstart', event => {
      start = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
    }, {passive:true});
    stage.addEventListener('touchend', event => {
      if (!start) return;
      const dx = event.changedTouches[0].clientX - start.x, dy = event.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
      start = null;
    }, {passive:true});
    stage.addEventListener('touchcancel', () => { start = null; }, {passive:true});
    show(0);
  });
})();
