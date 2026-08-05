/* Each section self-registers a custom element via customElements.define(). */
import '../sections/01-title.js';
import '../sections/02-hook.js';
import '../sections/03-compare.js';
import '../sections/04-drawn.js';
import '../sections/05-loop.js';
import '../sections/06-changed.js';
import '../sections/07-gate.js';
import '../sections/08-plan.js';
import '../sections/09-plan-explore.js';
import '../sections/10-plan-ask.js';
import '../sections/11-plan-write.js';
import '../sections/12-plan-traps.js';
import '../sections/13-build.js';
import '../sections/14-build-memory.js';
import '../sections/15-build-skills.js';
import '../sections/16-build-trust.js';
import '../sections/17-build-drift.js';
import '../sections/18-review.js';
import '../sections/19-review-against.js';
import '../sections/20-review-evidence.js';
import '../sections/21-review-tautology.js';
import '../sections/22-review-independent.js';
import '../sections/23-review-diff.js';
import '../sections/24-setup-kit.js';
import '../sections/25-setup-context.js';
import '../sections/26-dial.js';
import '../sections/27-monday.js';
import '../sections/28-sdd-process.js';
import '../sections/29-sdd-spec.js';
import '../sections/30-sdd-plan.js';
import '../sections/31-sdd-tasks.js';
import '../sections/32-sdd-verification.js';
import '../sections/33-close.js';

import { getLang, setLang, onLangChange, pick } from './i18n.js';

const sections = [
  { tag: 's01-title',              title: { en: 'Agentic Engineering',                 de: 'Agentic Engineering' } },
  { tag: 's02-hook',               title: { en: 'Two Prompts',                         de: 'Zwei Prompts' } },
  { tag: 's03-compare',            title: { en: 'Vibe Coding vs. Agentic Engineering', de: 'Vibe Coding vs. Agentic Engineering' } },
  { tag: 's04-drawn',              title: { en: 'The Same Thing, Drawn',               de: 'Dasselbe, gezeichnet' } },
  { tag: 's05-loop',               title: { en: 'Plan → Build → Review',               de: 'Plan → Build → Review' } },
  { tag: 's06-changed',            title: { en: 'Why It Is Written Down',              de: 'Warum es aufgeschrieben wird' } },
  { tag: 's07-gate',               title: { en: 'Two Agreements',                      de: 'Zwei Freigaben' } },
  { tag: 's08-plan',               title: { en: 'Plan',                                de: 'Plan' } },
  { tag: 's09-plan-explore',       title: { en: 'Plan · Read First',                   de: 'Plan · Erst lesen' } },
  { tag: 's10-plan-ask',           title: { en: 'Plan · Make It Ask',                  de: 'Plan · Fragen lassen' } },
  { tag: 's11-plan-write',         title: { en: 'Plan · What It Holds',                de: 'Plan · Was drinsteht' } },
  { tag: 's12-plan-traps',         title: { en: 'Plan · Four Failures',                de: 'Plan · Vier Fehlformen' } },
  { tag: 's13-build',              title: { en: 'Build',                               de: 'Build' } },
  { tag: 's14-build-memory',       title: { en: 'Build · One Memory File',             de: 'Build · Eine Memory-Datei' } },
  { tag: 's15-build-skills',       title: { en: 'Build · Skills and MCP',              de: 'Build · Skills und MCP' } },
  { tag: 's16-build-trust',        title: { en: 'Build · Trust Boundaries',            de: 'Build · Vertrauensgrenzen' } },
  { tag: 's17-build-drift',        title: { en: 'Build · Drift',                       de: 'Build · Abweichung' } },
  { tag: 's18-review',             title: { en: 'Review',                              de: 'Review' } },
  { tag: 's19-review-against',     title: { en: 'Review · Against the Plan',           de: 'Review · Gegen den Plan' } },
  { tag: 's20-review-evidence',    title: { en: 'Review · What a Pass May Claim',      de: 'Review · Was ein Pass behaupten darf' } },
  { tag: 's21-review-tautology',   title: { en: 'Review · The Test That Cannot Fail',  de: 'Review · Der Test, der nicht scheitern kann' } },
  { tag: 's22-review-independent', title: { en: 'Review · Who Reviews',                de: 'Review · Wer reviewt' } },
  { tag: 's23-review-diff',        title: { en: 'Review · Read Every Diff',            de: 'Review · Jeden Diff lesen' } },
  { tag: 's24-setup-kit',          title: { en: 'Setup · What You Give It',            de: 'Setup · Was du ihm gibst' } },
  { tag: 's25-setup-context',      title: { en: 'Setup · What It Costs',               de: 'Setup · Was es kostet' } },
  { tag: 's26-dial',               title: { en: 'How Much Of This',                    de: 'Wie viel davon' } },
  { tag: 's27-monday',             title: { en: 'The Smallest Version',                de: 'Die kleinste Fassung' } },
  { tag: 's28-sdd-process',        title: { en: 'SDD · The Full Process',              de: 'SDD · Der vollständige Prozess' } },
  { tag: 's29-sdd-spec',           title: { en: 'SDD · spec.md',                       de: 'SDD · spec.md' } },
  { tag: 's30-sdd-plan',           title: { en: 'SDD · plan.md',                       de: 'SDD · plan.md' } },
  { tag: 's31-sdd-tasks',          title: { en: 'SDD · tasks.md',                      de: 'SDD · tasks.md' } },
  { tag: 's32-sdd-verification',   title: { en: 'SDD · verification.md',               de: 'SDD · verification.md' } },
  { tag: 's33-close',              title: { en: 'Thank You',                           de: 'Danke' } },
];

const CHAPTERS = [
  { label: { en: 'Start',    de: 'Start' },    index: 0,  key: null },
  { label: { en: 'The Loop', de: 'Der Loop' }, index: 4,  key: 'l'  },
  { label: { en: 'Plan',     de: 'Plan' },     index: 7,  key: 'p'  },
  { label: { en: 'Build',    de: 'Build' },    index: 12, key: 'b'  },
  { label: { en: 'Review',   de: 'Review' },   index: 17, key: 'r'  },
  /* Setup sits after the loop rather than before it: the set of things the
     agent is given reads as the underside of Plan, Build and Review, and an
     audience that has just walked all three knows where the seams are. */
  { label: { en: 'Setup',    de: 'Setup' },    index: 23, key: 'u'  },
  { label: { en: 'Practice', de: 'Praxis' },   index: 25, key: 'x'  },
  { label: { en: 'SDD',      de: 'SDD' },      index: 27, key: 's'  },
  /* The close is its own stop rather than the tail of SDD: it is where
     the links live, and it is the one slide a viewer wants to reach
     directly from anywhere in the deck. */
  { label: { en: 'End',      de: 'Ende' },     index: 32, key: 'e'  },
];

/* The chapter a slide belongs to: the last one that starts at or before it.
 * null before the first mount, when there is no current slide. */
function chapterFor(index) {
  let found = null;
  for (const ch of CHAPTERS) if (ch.index <= index) found = ch;
  return found;
}

/* UI chrome strings (everything rendered outside the section components). */
const UI = {
  prev:    { en: '← Back',              de: '← Zurück' },
  next:    { en: 'Next →',              de: 'Weiter →' },
  jumpTo:  { en: 'Jump to',             de: 'Sprung zu' },
  key:     { en: 'key',                 de: 'Taste' },
  fsEnter: { en: 'Fullscreen (F)',      de: 'Vollbild (F)' },
  fsExit:  { en: 'Exit fullscreen (F)', de: 'Vollbild verlassen (F)' },
};

const stage      = document.getElementById('stage');
const counter    = document.getElementById('counter');
const prevBtn    = document.getElementById('btn-prev');
const nextBtn    = document.getElementById('btn-next');
const chaptersEl = document.getElementById('chapters');
const pageTitle  = document.querySelector('.page-title');

/* ───── Chapter chips ───── */
CHAPTERS.forEach(ch => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.addEventListener('click', () => mount(ch.index));
  ch.btn = btn;
  chaptersEl.appendChild(btn);
});

function renderChapterLabels() {
  CHAPTERS.forEach(ch => {
    const label = pick(ch.label);
    ch.btn.innerHTML = ch.key
      ? `${label}<span class="key">${ch.key.toUpperCase()}</span>`
      : label;
    ch.btn.title = ch.key
      ? `${pick(UI.jumpTo)} "${label}" (${pick(UI.key)} ${ch.key.toUpperCase()})`
      : `${pick(UI.jumpTo)} "${label}"`;
  });
}

function updateChapterHighlight(index) {
  const active = chapterFor(index);
  CHAPTERS.forEach(ch => ch.btn.classList.toggle('current', ch === active));
}

/* ───── Slide navigation ───── */
let current = -1;
let transitioning = false;

function mount(index) {
  if (transitioning) return;
  if (index < 0 || index >= sections.length) return;
  if (index === current) return;

  transitioning = true;
  const old  = stage.firstElementChild;
  const next = document.createElement(sections[index].tag);
  next.classList.add('entering');
  stage.appendChild(next);

  if (old) {
    old.classList.add('exiting');
    setTimeout(() => old.remove(), 400);
  }

  requestAnimationFrame(() => requestAnimationFrame(() => {
    next.classList.remove('entering');
  }));
  setTimeout(() => { transitioning = false; }, 420);

  current = index;
  counter.textContent = `${index + 1} / ${sections.length}`;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === sections.length - 1;
  pageTitle.textContent = pick(sections[index].title);
  updateChapterHighlight(index);
  history.replaceState(null, '', `#${index + 1}`);
}

const go = delta => mount(current + delta);

prevBtn.addEventListener('click', () => go(-1));
nextBtn.addEventListener('click', () => go(1));

function renderChrome() {
  prevBtn.innerHTML = pick(UI.prev);
  nextBtn.innerHTML = pick(UI.next);
}

/* ───── Fullscreen toggle ───── */
const fsBtn = document.getElementById('btn-fullscreen');
const FS_ICON_ENTER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/></svg>`;
const FS_ICON_EXIT  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M16 21v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;

function updateFsIcon() {
  const isFs = !!document.fullscreenElement;
  fsBtn.innerHTML = isFs ? FS_ICON_EXIT : FS_ICON_ENTER;
  fsBtn.title = pick(isFs ? UI.fsExit : UI.fsEnter);
  fsBtn.setAttribute('aria-label', fsBtn.title);
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}

fsBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFsIcon);

/* ───── Language toggle ───── */
const langToggle = document.querySelector('.lang-toggle');

function updateLangToggle() {
  langToggle?.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === getLang());
  });
}

langToggle?.querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

/* Re-render the currently mounted slide in the active language. Sections
 * rebuild their DOM on mount and tear down in disconnectedCallback, so a
 * straight element swap is clean — no leaks, no stale listeners. */
function remountCurrent() {
  if (current < 0) return;
  stage.replaceChildren(document.createElement(sections[current].tag));
  pageTitle.textContent = pick(sections[current].title);
}

onLangChange(() => {
  renderChapterLabels();
  updateChapterHighlight(current);
  renderChrome();
  updateFsIcon();
  updateLangToggle();
  remountCurrent();
});

/* ───── Keyboard ───── */
document.addEventListener('keydown', e => {
  if (e.target.closest?.('input,textarea,select')) return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
    e.preventDefault(); go(1);
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault(); go(-1);
  } else if (e.key === 'Home') {
    mount(0);
  } else if (e.key === 'End') {
    mount(sections.length - 1);
  } else if (e.key === 'f' || e.key === 'F') {
    e.preventDefault(); toggleFullscreen();
  } else {
    const ch = CHAPTERS.find(c => c.key && c.key === e.key.toLowerCase());
    if (ch) { e.preventDefault(); mount(ch.index); }
  }
});

/* ───── Initial render ───── */
renderChapterLabels();
renderChrome();
updateFsIcon();
updateLangToggle();

const initial = parseInt(location.hash.slice(1), 10);
const startIndex = (initial >= 1 && initial <= sections.length) ? initial - 1 : 0;
mount(startIndex);
