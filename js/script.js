const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('siteNav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Expandable cards (Projects) — vanilla JS
(function () {
  const cards = Array.from(document.querySelectorAll('.exp-card'));
  if (!cards.length) return;

  let open = cards.find(c => c.classList.contains('open')) || null;

  function toggle(card) {
    if (open && open !== card) {
      open.classList.remove('open');
      open.setAttribute('aria-expanded', 'false');
    }
    const willOpen = !card.classList.contains('open');
    card.classList.toggle('open');
    card.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    open = willOpen ? card : null;
  }

  cards.forEach(card => {
    // Click anywhere on card
    card.addEventListener('click', (e) => {
      // Avoid toggling when clicking a button/link inside
      const t = e.target;
      if (t.closest('a,button')) return;
      toggle(card);
    });
    // Keyboard a11y
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(card); }
    });
  });
})();


//----------------------------------------------------------------
// Lightbox for images (global, once per site)

// ===== Simple Lightbox for .proj-gallery images =====
(function(){
  const overlay = document.getElementById('lightbox');
  if (!overlay) return;

  const imgEl = overlay.querySelector('.lb-img');
  const capEl = overlay.querySelector('#lbCaption');
  const btnClose = overlay.querySelector('.lb-close');
  const btnPrev  = overlay.querySelector('.lb-prev');
  const btnNext  = overlay.querySelector('.lb-next');

  // collect all gallery images (order across the page)
  const imgs = Array.from(document.querySelectorAll('.proj-gallery img'));
  if (!imgs.length) return;

  let idx = 0;

  function openAt(i){
    idx = i;
    const src = imgs[idx].src;
    const cap = imgs[idx].dataset.caption || imgs[idx].alt || '';
    imgEl.src = src;
    imgEl.alt = cap;
    capEl.textContent = cap;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden'; // no page scroll
    btnClose.focus();
  }
  function close(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    imgEl.src = '';
    document.body.style.overflow = '';
  }
  function prev(){ openAt((idx - 1 + imgs.length) % imgs.length); }
  function next(){ openAt((idx + 1) % imgs.length); }

  // click on any gallery image
  imgs.forEach((im, i) => im.addEventListener('click', () => openAt(i)));

  // controls
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // close when clicking the dark backdrop (not the image/buttons)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // keyboard: Esc, ←, →
  window.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
