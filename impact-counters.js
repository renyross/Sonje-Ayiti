(() => {
// Compteurs indépendants, animés une seule fois à leur apparition.
const metricCounters = [...document.querySelectorAll('#mesure-impact .counter')];
const numberFormatter = new Intl.NumberFormat('fr-FR');
const reducedCounters = matchMedia('(prefers-reduced-motion: reduce)');
function animateMetric(counter) {
  const target = Number(counter.dataset.target);
  const suffix = counter.dataset.suffix || '';
  if (!Number.isFinite(target)) return;
  const finalText = numberFormatter.format(target) + suffix;
  counter.parentElement.setAttribute('aria-label', finalText);
  counter.setAttribute('aria-hidden', 'true');
  if (reducedCounters.matches) { counter.textContent = finalText; return; }
  let start;
  function frame(time) {
    start ??= time;
    const progress = Math.min((time - start) / 1600, 1);
    counter.textContent = numberFormatter.format(Math.round(target * (1 - Math.pow(1 - progress, 3)))) + suffix;
    if (progress < 1 && !reducedCounters.matches) requestAnimationFrame(frame);
    else counter.textContent = finalText;
  }
  requestAnimationFrame(frame);
}
if ('IntersectionObserver' in window) {
  const metricObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { metricObserver.unobserve(entry.target); animateMetric(entry.target); }
    });
  }, { threshold: 0.6 });
  metricCounters.forEach(counter => metricObserver.observe(counter));
} else metricCounters.forEach(animateMetric);


})();
