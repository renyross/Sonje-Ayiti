const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Ouvrir le menu de navigation');
  nav.classList.remove('open');
  document.body.classList.remove('mobile-menu-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu de navigation');
  nav.classList.toggle('open', open);
  document.body.classList.toggle('mobile-menu-open', open);
  if (open) {
    closeSearch();
    if (!nav.querySelector('.mobile-submenu[open]')) {
      const firstSubmenu = nav.querySelector('.mobile-submenu');
      if (firstSubmenu) firstSubmenu.open = true;
    }
  }
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
window.matchMedia('(max-width: 1000px)').addEventListener('change', closeMenu);
const headerResizeObserver = new ResizeObserver(() => {
  document.documentElement.style.setProperty('--mobile-header-height', `${document.querySelector('#site-header').getBoundingClientRect().height}px`);
});
headerResizeObserver.observe(document.querySelector('#site-header'));
const dialog = document.querySelector('#info-dialog');
function showInfo(title, text) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-text').textContent = text;
  dialog.showModal();
}
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-cancel').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
document.querySelector('#privacy-button').addEventListener('click', () => showInfo('Confidentialité', 'Cette page ne collecte pas de données via un formulaire. Les liens de don, de parrainage et de contact ouvrent le site officiel sonje-ayiti.org, dont les conditions s’appliquent. Les images et polices sont chargées depuis Unsplash et Google Fonts. Le lecteur vidéo intégré est fourni par YouTube via youtube-nocookie.com ; son utilisation peut transmettre des informations techniques à YouTube.'));
document.querySelector('#terms-button').addEventListener('click', () => showInfo('À propos de cette présentation', 'Cette présentation reprend les informations fournies sur Sonje Ayiti. Les photographies sont des illustrations et ne représentent pas ses projets. Les mentions légales de cette version devront être complétées avant sa publication.'));
document.querySelector('#year').textContent = new Date().getFullYear();

const dropdowns = [...document.querySelectorAll('.nav-dropdown, .mobile-submenu, .desktop-blog-menu')];
dropdowns.forEach(item => item.addEventListener('click', event => {
  if (event.target.closest('a')) item.open = false;
}));
dropdowns.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) dropdowns.forEach(other => { if (other !== item) other.open = false; });
}));
const searchToggle = document.querySelector('.nav-search-toggle');
const searchPanel = document.querySelector('#site-search');
const searchInput = document.querySelector('#site-search-input');
const searchResults = document.querySelector('#site-search-results');
const sections = [ ['À propos de Sonje Ayiti', '#apropos'], ['Domaines d’intervention (Éducation, Économie, Santé, Agriculture)', '#programmes'], ['Éducation & Parrainage', '#parrainage'], ['Développement économique & Formation', '#card-economie'], ['Agriculture & Souveraineté', '#card-agriculture'], ['Zones d’intervention', '#impact'], ['Mesure & Impact en chiffres', '#mesure-impact'], ['Notre approche participative', '#approche'], ['Parrainer un étudiant', '#parrainage'], ['Faire un don — PayPal et Venmo', '#don'], ['Dernières nouvelles & actualités', '#actualites'], ['Restons connectés — Newsletter', '#newsletter'], ['Contact et questions', '#contact'] ];
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function updateSearch() {
  const query = normalize(searchInput.value.trim());
  const matches = sections.filter(([label]) => normalize(label).includes(query));
  searchResults.replaceChildren();
  matches.forEach(([label, href]) => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = href; a.textContent = label; li.append(a); searchResults.append(li); });
  document.querySelector('#search-status').textContent = matches.length ? `${matches.length} rubrique(s) trouvée(s).` : 'Aucune rubrique trouvée.';
}
function closeSearch() { searchPanel.hidden = true; searchToggle.setAttribute('aria-expanded', 'false'); }
searchToggle.addEventListener('click', () => {
  const open = searchPanel.hidden;
  searchPanel.hidden = !open; searchToggle.setAttribute('aria-expanded', String(open));
  dropdowns.forEach(item => { item.open = false; }); closeMenu();
  if (open) { updateSearch(); searchInput.focus(); }
});
searchInput.addEventListener('input', updateSearch);
searchResults.addEventListener('click', event => { if (event.target.closest('a')) { closeSearch(); searchToggle.focus(); } });
document.addEventListener('click', event => {
  dropdowns.forEach(item => { if (!item.contains(event.target)) item.open = false; });
  if (!searchPanel.contains(event.target) && !searchToggle.contains(event.target)) closeSearch();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    dropdowns.forEach(item => { if (item.open) { item.open = false; item.querySelector('summary').focus(); } });
    if (!searchPanel.hidden) { closeSearch(); searchToggle.focus(); }
  }
});
nav.addEventListener('click', event => { if (event.target.closest('a')) dropdowns.forEach(item => { item.open = false; }); });

// Carrousel des quatre axes : défilement tactile et commandes clavier natives.
const axesTrack = document.querySelector('.axes-grid');
const axesPrev = document.querySelector('#axes-prev');
const axesNext = document.querySelector('#axes-next');
if (axesTrack && axesPrev && axesNext && axesTrack.querySelector('.axis-card')) {
function axesState() {
  const cards = [...axesTrack.querySelectorAll('.axis-card')];
  const gap = parseFloat(getComputedStyle(axesTrack).gap) || 0;
  const step = cards[0].getBoundingClientRect().width + gap;
  const visible = Math.max(1, Math.round((axesTrack.clientWidth + gap) / step));
  const pages = Math.max(1, cards.length - visible + 1);
  const current = Math.min(pages - 1, Math.max(0, Math.round(axesTrack.scrollLeft / step)));
  return { step, pages, current };
}
function updateAxes() {
  const { pages, current } = axesState();
  axesPrev.disabled = current === 0;
  axesNext.disabled = current === pages - 1;
  document.querySelector('#axes-current').textContent = String(current + 1).padStart(2, '0');
  document.querySelector('#axes-total').textContent = String(pages).padStart(2, '0');
  const progress = document.querySelector('.axes-progress > span');
  progress.style.width = `${100 / pages}%`;
  progress.style.transform = `translateX(${current * 100}%)`;
}
function moveAxes(direction) {
  const { step, pages, current } = axesState();
  const target = Math.max(0, Math.min(pages - 1, current + direction));
  axesTrack.scrollTo({ left: target * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('#axes-status').textContent = `Position ${target + 1} sur ${pages}`;
}
axesPrev.addEventListener('click', () => moveAxes(-1));
axesNext.addEventListener('click', () => moveAxes(1));
axesTrack.addEventListener('scroll', updateAxes, { passive: true });
new ResizeObserver(updateAxes).observe(axesTrack);
axesTrack.addEventListener('keydown', event => {
  if (event.target === axesTrack && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault(); moveAxes(event.key === 'ArrowRight' ? 1 : -1);
  }
});
updateAxes();

}

// Interaction Carte des Territoires (Nord & Nord-Est)
const regionFilters = [...document.querySelectorAll('.region-filter')];
const mapPins = [...document.querySelectorAll('.map-pin-group')];
const targetCards = [...document.querySelectorAll('.target-card')];

function activateZone(zoneName) {
  targetCards.forEach(c => c.classList.toggle('active', c.dataset.zone === zoneName));
  mapPins.forEach(p => {
    const isSelected = p.dataset.zone === zoneName;
    p.classList.toggle('active', isSelected);
    const radar = p.querySelector('.pin-radar');
    if (radar) radar.classList.toggle('pulse-active', isSelected);
  });
}

targetCards.forEach(card => {
  card.addEventListener('click', () => activateZone(card.dataset.zone));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateZone(card.dataset.zone); } });
});

mapPins.forEach(pin => {
  pin.addEventListener('click', () => activateZone(pin.dataset.zone));
  pin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateZone(pin.dataset.zone); } });
});

regionFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    regionFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const region = btn.dataset.region;
    mapPins.forEach(p => {
      const match = region === 'all' || p.dataset.region === region;
      p.classList.toggle('dimmed', !match);
    });
    targetCards.forEach(c => {
      const match = region === 'all' || c.dataset.region === region;
      c.classList.toggle('dimmed', !match);
    });
  });
});

// Formulaire de contact direct
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const successMsg = document.querySelector('#contact-success');
    const submitBtn = document.querySelector('#contact-submit-btn');
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.querySelector('span').textContent = 'Transmission en cours...';
    }
    setTimeout(() => {
      if (successMsg) successMsg.hidden = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.querySelector('span').textContent = 'Envoyer votre message';
      }
      contactForm.reset();
    }, 500);
  });
}

// Carrousel des Dernières Nouvelles
const newsTrack = document.querySelector('#news-track');
const newsPrev = document.querySelector('#news-prev');
const newsNext = document.querySelector('#news-next');
const newsCurrent = document.querySelector('#news-current');
const newsTotal = document.querySelector('#news-total');

if (newsTrack && newsPrev && newsNext) {
  function getNewsState() {
    const cards = [...newsTrack.querySelectorAll('.news-card')];
    if (!cards.length) return { step: 0, pages: 1, current: 0 };
    const gap = parseFloat(getComputedStyle(newsTrack).gap) || 18;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const step = cardWidth + gap;
    const visibleCards = Math.max(1, Math.round((newsTrack.clientWidth + gap) / step));
    const totalPages = Math.max(1, cards.length - visibleCards + 1);
    const currentPage = Math.min(totalPages - 1, Math.max(0, Math.round(newsTrack.scrollLeft / step)));
    return { step, pages: totalPages, current: currentPage };
  }

  function updateNewsCarousel() {
    const { pages, current } = getNewsState();
    newsPrev.disabled = current <= 0;
    newsNext.disabled = current >= pages - 1;
    if (newsCurrent) newsCurrent.textContent = String(current + 1).padStart(2, '0');
    if (newsTotal) newsTotal.textContent = String(pages).padStart(2, '0');
  }

  function scrollNews(direction) {
    const { step, pages, current } = getNewsState();
    const targetPage = Math.max(0, Math.min(pages - 1, current + direction));
    newsTrack.scrollTo({
      left: targetPage * step,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }

  newsPrev.addEventListener('click', () => scrollNews(-1));
  newsNext.addEventListener('click', () => scrollNews(1));
  newsTrack.addEventListener('scroll', updateNewsCarousel, { passive: true });
  new ResizeObserver(updateNewsCarousel).observe(newsTrack);
  newsTrack.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollNews(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollNews(1); }
  });
  updateNewsCarousel();
}

// Images du parrainage : navigation circulaire, sans défilement automatique.
const sponsorSlides = [...document.querySelectorAll('#sponsor-slides .sponsor-slide')];
if (sponsorSlides.length) {
  let sponsorIndex = 0;
  function moveSponsor(direction) {
    sponsorIndex = (sponsorIndex + direction + sponsorSlides.length) % sponsorSlides.length;
    sponsorSlides.forEach((slide, index) => { slide.hidden = index !== sponsorIndex; });
    const pos = document.querySelector('#sponsor-position');
    if (pos) pos.textContent = `${String(sponsorIndex + 1).padStart(2, '0')} / ${String(sponsorSlides.length).padStart(2, '0')}`;
  }
  const prevBtn = document.querySelector('#sponsor-prev');
  const nextBtn = document.querySelector('#sponsor-next');
  if (prevBtn) prevBtn.addEventListener('click', () => moveSponsor(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveSponsor(1));
}

// 4 Domaines d'intervention : vitrine carrousel (style Parrainage)
const axesSlides = [...document.querySelectorAll('#axes-slides .axes-slide')];
if (axesSlides.length) {
  let axesIndex = 0;
  function moveAxes(direction) {
    axesIndex = (axesIndex + direction + axesSlides.length) % axesSlides.length;
    axesSlides.forEach((slide, index) => { slide.hidden = index !== axesIndex; });
    const pos = document.querySelector('#axes-position');
    if (pos) pos.textContent = `${String(axesIndex + 1).padStart(2, '0')} / ${String(axesSlides.length).padStart(2, '0')}`;
  }
  const prevBtn = document.querySelector('#axes-prev');
  const nextBtn = document.querySelector('#axes-next');
  if (prevBtn) prevBtn.addEventListener('click', () => moveAxes(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveAxes(1));
}

// Modules de don interactifs (Hero & Section #don)
function setupDonationModule(containerId, options = {}) {
  const card = document.querySelector(containerId);
  if (!card) return;

  const freqButtons = card.querySelectorAll('.freq-btn');
  const amountButtons = card.querySelectorAll('.amount-btn');
  const customInput = card.querySelector('input[type="number"]');
  const currencySelect = card.querySelector('select[aria-label="Devise"]');
  const processorSelect = card.querySelector('select[aria-label="Sélectionnez un processeur de paiement"]');
  const processorChips = card.querySelectorAll('.processor-chip');
  const submitBtn = card.querySelector('.hero-donation-submit-btn');
  const venmoDrawer = options.venmoDrawer ? document.querySelector(options.venmoDrawer) : null;
  const btnLabel = card.querySelector('#section-donation-btn-text');

  let currentProcessor = 'zeffy';
  let currentAmount = 100;
  let currentCurrency = '$';
  let currentFreq = 'once';

  function updateLink() {
    let url = 'https://www.zeffy.com/en-US/donation-form/sponsor-a-student-and-change-a-life';
    if (currentProcessor === 'paypal') {
      url = 'https://sonje-ayiti.org/donate/';
    } else if (currentProcessor === 'venmo') {
      url = containerId === '#hero-donation-card' ? '#don' : 'https://sonje-ayiti.org/donate/';
    }
    if (submitBtn) {
      submitBtn.href = url;
    }

    if (btnLabel) {
      const amtStr = typeof currentAmount === 'number' ? `${currentAmount} ${currentCurrency}` : '';
      const freqStr = currentFreq === 'monthly' ? ' / MOIS' : '';
      btnLabel.textContent = `JE FAIS UN DON ${amtStr}${freqStr}`;
    }
  }

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentFreq = btn.getAttribute('data-freq') || 'once';
      updateLink();
    });
  });

  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customInput) customInput.value = '';
      currentAmount = Number(btn.getAttribute('data-amount')) || 100;
      updateLink();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = Number(customInput.value);
      if (val > 0) {
        amountButtons.forEach(b => b.classList.remove('active'));
        currentAmount = val;
      } else {
        currentAmount = '';
      }
      updateLink();
    });
  }

  if (currencySelect) {
    currencySelect.addEventListener('change', () => {
      currentCurrency = currencySelect.value;
      const amounts = [50, 100, 250];
      amountButtons.forEach((btn, idx) => {
        btn.textContent = `${amounts[idx]} ${currentCurrency}`;
      });
      updateLink();
    });
  }

  function setProcessor(proc) {
    currentProcessor = proc;
    if (processorSelect) processorSelect.value = proc;
    processorChips.forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-proc') === proc);
    });

    if (venmoDrawer) {
      venmoDrawer.style.display = proc === 'venmo' ? 'block' : 'none';
    }

    updateLink();
  }

  if (processorSelect) {
    processorSelect.addEventListener('change', () => {
      setProcessor(processorSelect.value);
    });
  }

  processorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      setProcessor(chip.getAttribute('data-proc'));
    });
  });

  updateLink();
}

setupDonationModule('#hero-donation-card');
setupDonationModule('#section-donation-card', { venmoDrawer: '#section-venmo-drawer' });

