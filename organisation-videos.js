(() => {
  const root = document.querySelector('.conviction-media');
  if (!root) return;
  const videos = [
    {id:'DTH7kqEVCb0',title:'La musique de Sonje Ayiti.',label:'Musique'},
    {id:'rJB5TSyf2rM',title:'Une vision commune. Un avenir à construire ensemble.',label:'Présentation'}
  ];
  let current = 0;
  function show(step) {
    current = (current + step + videos.length) % videos.length;
    const video = videos[current];
    // Replacing the player stops the previous video's sound.
    const frame = root.querySelector('iframe');
    frame.src = `https://www.youtube.com/embed/${video.id}?rel=0`;
    frame.title = video.title;
    root.querySelector('.video-fallback-link').href = `https://www.youtube.com/watch?v=${video.id}`;
    root.querySelector('.conviction-caption h3').textContent = video.title;
    root.querySelector('.conviction-slide').setAttribute('aria-label', `${current + 1} sur 2 : ${video.label}`);
    const number = root.querySelector('.conviction-video-number');
    number.textContent = `0${current + 1} / 02`;
    number.setAttribute('aria-label', `Vidéo ${current + 1} sur 2`);
    root.querySelector('#organisation-video-position').textContent = `${video.label} · 0${current + 1} / 02`;
  }
  root.querySelector('#organisation-video-prev').addEventListener('click', () => show(-1));
  root.querySelector('#organisation-video-next').addEventListener('click', () => show(1));
})();
