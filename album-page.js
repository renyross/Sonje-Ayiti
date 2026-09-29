(() => {
  const cards = [...document.querySelectorAll('.gallery figure')];
  const filters = document.querySelector('.filters');
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'Tout' && card.dataset.category !== button.dataset.filter; });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('#gallery-status').textContent = `${count} photographie${count > 1 ? 's' : ''}`;
  });
  const dialog = document.querySelector('#photo-viewer');
  let opener;
  document.querySelectorAll('.gallery-photo').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link;
    dialog.querySelector('img').src = link.href;
    dialog.querySelector('img').alt = link.querySelector('img').alt;
    dialog.querySelector('p').textContent = link.closest('figure').querySelector('h2').textContent;
    dialog.showModal();
  }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
})();
