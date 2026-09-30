(() => {
  const choice = document.querySelector('#student-choice');
  const message = document.querySelector('#sponsor-message');
  const status = document.querySelector('#copy-status');
  function update() {
    message.value = `Bonjour, je souhaite parrainer ${choice.value || 'un étudiant'} à la Cima School of Hope. Pourriez-vous me confirmer les besoins actuels et les modalités du parrainage de 500 $ pour une année scolaire ? Merci.`;
    status.textContent = '';
  }
  choice.addEventListener('change', update);
  document.querySelectorAll('[data-student]').forEach(link => link.addEventListener('click', () => {
    choice.value = link.dataset.student; update();
  }));
  const copy = document.querySelector('.copy-message');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(message.value); status.textContent = 'Message copié. Vous pouvez le coller sur la page de contact de Sonje Ayiti.'; }
    catch { message.focus(); message.select(); status.textContent = 'Sélectionnez « Copier » pour copier le message.'; }
  });
})();
