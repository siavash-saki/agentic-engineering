/* Minimal i18n core — single source of truth for the current language.
 *
 * Content lives in each section/module as a { en, de } map; rendering code
 * reads the active language via getLang() / pick(). Switching language is just
 * a re-render (the controller re-mounts the current slide), which fits the
 * existing mount-on-navigate architecture — no dual DOM, no hidden copies. */

const LANGS = ['en', 'de'];
const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'ae-lang';

function initialLang() {
  // ?lang=de in the URL wins (shareable links), then the stored choice.
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) return q;
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
  return LANGS.includes(stored) ? stored : DEFAULT_LANG;
}

let current = initialLang();
const listeners = new Set();

document.documentElement.lang = current;

export function getLang() { return current; }
export function langs() { return LANGS.slice(); }

export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return;
  current = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  document.documentElement.lang = lang;
  listeners.forEach(fn => fn(lang));
}

/* Subscribe to language changes; returns an unsubscribe function. */
export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* Pick the active language's value from a { en, de } map. */
export function pick(map) {
  if (!map) return '';
  return map[current] ?? map[DEFAULT_LANG] ?? '';
}
