/**
 * i18n.js — Initialisation i18next + chargement des traductions
 */

const I18N = (() => {

  let translations = {};
  let currentLang = 'fr';
  const SUPPORTED = ['fr', 'es'];
  const FALLBACK  = 'fr';

  /* ── Détecte la langue du navigateur ── */
  function detectLang() {
    const nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : FALLBACK;
  }

  /* ── Charge le JSON de la langue ── */
  async function loadTranslation(lang) {
    if (translations[lang]) return;
    const resp = await fetch(`locales/${lang}.json`);
    if (!resp.ok) throw new Error(`Cannot load locales/${lang}.json`);
    translations[lang] = await resp.json();
  }

  /* ── Résolution de clé dot-notation ── */
  function resolve(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  /* ── Traduit une clé ── */
  function t(key, lang) {
    const l = lang || currentLang;
    const val = resolve(translations[l], key);
    if (val !== null) return val;
    // fallback
    if (l !== FALLBACK && translations[FALLBACK]) {
      return resolve(translations[FALLBACK], key) ?? key;
    }
    return key;
  }

  /* ── Initialisation ── */
  async function init() {
    currentLang = localStorage.getItem('lang') || detectLang();
    await loadTranslation(FALLBACK);
    if (currentLang !== FALLBACK) await loadTranslation(currentLang);
    return currentLang;
  }

  /* ── Change de langue ── */
  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    await loadTranslation(lang);
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  function getLang() { return currentLang; }

  return { init, setLang, getLang, t, SUPPORTED };
})();
