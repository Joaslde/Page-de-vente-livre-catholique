/**
 * app.js — Logique principale : rendu, switch de langue, animations
 */

document.addEventListener('DOMContentLoaded', async () => {

  /* ─── Init i18n ─── */
  await I18N.init();
  render();

  /* ─── Boutons de switch ─── */
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lang = btn.dataset.langSwitch;
      await I18N.setLang(lang);
      render();
    });
  });

  /* ─── Scroll fluide ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});

/* ════════════════════════════════════════
   RENDER — applique toutes les traductions
   ════════════════════════════════════════ */
function render() {
  const lang = I18N.getLang();
  const t = key => I18N.t(key);

  /* ── <title> ── */
  document.title = t('meta.title');

  /* ── Indicateur actif sur boutons langue ── */
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langSwitch === lang);
  });

  /* ── Tous les éléments [data-i18n] ── */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val !== null && val !== key) el.textContent = val;
  });

  /* ── Éléments [data-i18n-html] (contenu HTML) ── */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (val !== null && val !== key) el.innerHTML = val;
  });

  /* ── Listes dynamiques ── */
  renderList('problem-him-list',     t('problem.him'));
  renderList('problem-her-list',     t('problem.her'));
  renderList('why-points-list',      t('why.points'));
  renderList('access-points-list',   t('access.points'));
  renderCards('men-cards',   t('learn.men'));
  renderCards('women-cards', t('learn.women'));

  /* ── Image conditionnelle ── */
  const covers = document.querySelectorAll('[data-cover]');
  covers.forEach(img => {
    img.src = t('cover_url');
    img.alt = t('cover_alt');
  });

  /* ── Liens CTA conditionnels ── */
  const payUrl = t('payment_url');
  document.querySelectorAll('[data-cta-link]').forEach(a => {
    a.href = payUrl;
  });

  /* ── CTA textes ── */
  document.querySelectorAll('[data-i18n-cta]').forEach(el => {
    el.textContent = t(el.dataset.i18nCta || 'hero.cta');
  });

  /* ── Animation fade-in sur changement ── */
  document.querySelectorAll('.section-fade').forEach(s => {
    s.classList.remove('visible');
    requestAnimationFrame(() => s.classList.add('visible'));
  });
}

/* ── Helper : rend une liste <ul> ── */
function renderList(id, items) {
  const ul = document.getElementById(id);
  if (!ul || !Array.isArray(items)) return;
  ul.innerHTML = items.map(item =>
    `<li class="check-item"><span class="check-icon">✓</span>${item}</li>`
  ).join('');
}

/* ── Helper : rend des cards ── */
function renderCards(id, items) {
  const container = document.getElementById(id);
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items.map((item, i) =>
    `<div class="feature-card animate-delay-${i}">
       <div class="feature-number">${String(i + 1).padStart(2, '0')}</div>
       <h4 class="feature-title">${item.title}</h4>
       <p class="feature-desc">${item.desc}</p>
     </div>`
  ).join('');
}

/* ── Intersection Observer pour scroll-reveal ── */
window.addEventListener('load', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
