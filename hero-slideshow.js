(() => {
  const hero = document.querySelector('#accueil');
  if (!hero) return;
  const frames = [...hero.querySelectorAll('.hero-frame')];
  const indicators = [...hero.querySelectorAll('.hero-indicator')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer, paused = reduced.matches;

  function show(next) {
    index = (next + frames.length) % frames.length;
    frames.forEach((frame, i) => {
      frame.classList.toggle('is-visible', i === index);
      frame.setAttribute('aria-hidden', String(i !== index));
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
  }

  function schedule() {
    clearInterval(timer);
    if (!paused && !document.hidden) {
      timer = setInterval(() => show(index + 1), 6000);
    }
  }

  indicators.forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = parseInt(btn.dataset.slide, 10);
      show(slide);
      schedule();
    });
  });

  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { show(index + 1); schedule(); }
    else if (e.key === 'ArrowLeft') { show(index - 1); schedule(); }
  });

  hero.addEventListener('focusin', () => { paused = true; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { if (reduced.matches) { paused = true; schedule(); } });

  show(0);
  schedule();
})();
