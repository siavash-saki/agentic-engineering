/* Each section self-registers a custom element via customElements.define(). */
import '../sections/01-context.js';
import '../sections/02-trust.js';
import '../sections/03-start-small.js';
import '../sections/04-vibe-vs-agentic.js';
import '../sections/05-landscape.js';
import '../sections/06-primitives-1.js';
import '../sections/07-primitives-2.js';
import '../sections/08-context-loading.js';
import '../sections/09-workflow.js';
import '../sections/10-sdd-callout.js';
import '../sections/11-sdd-artifacts.js';
import '../sections/12-sdd-spec.js';
import '../sections/13-sdd-plan.js';
import '../sections/14-sdd-tasks.js';
import '../sections/15-sdd-workflow.js';
import '../sections/16-sdd-antipatterns.js';
import '../sections/17-tips-intro.js';
import '../sections/18-tip-interrogate.js';
import '../sections/19-tip-parallel.js';
import '../sections/20-tip-review.js';
import '../sections/21-tip-skills.js';
import '../sections/22-tip-interview.js';
import '../sections/23-tip-commits.js';
import '../sections/24-tip-context.js';
import '../sections/25-tip-model.js';
import '../sections/26-tip-multimodel.js';
import '../sections/27-tip-rules.js';
import '../sections/28-copilot.js';

import { getLang, setLang, onLangChange, pick } from './i18n.js';

const sections = [
  { tag: 's01-context',          title: { en: 'Context & Goal',                      de: 'Kontext & Ziel' } },
  { tag: 's02-trust',            title: { en: 'Trust Is Good, Control Is Everything', de: 'Vertrauen ist gut, Kontrolle ist alles' } },
  { tag: 's03-start-small',      title: { en: 'Start Small',                          de: 'Klein anfangen' } },
  { tag: 's04-vibe-vs-agentic',  title: { en: 'Vibe Coding vs. Agentic Engineering',  de: 'Vibe Coding vs. Agentic Engineering' } },
  { tag: 's05-landscape',        title: { en: "What's What",                          de: 'Was ist was' } },
  { tag: 's06-primitives-1',     title: { en: 'Primitives — Memory, Skills, MCP',     de: 'Primitives — Memory, Skills, MCP' } },
  { tag: 's07-primitives-2',     title: { en: 'Primitives — Hooks, Subagents, Scope', de: 'Primitives — Hooks, Subagents, Scope' } },
  { tag: 's08-context-loading',  title: { en: 'What Loads Into Context, When',        de: 'Wann lädt was in den Kontext' } },
  { tag: 's09-workflow',         title: { en: 'Recommended Workflow',                 de: 'Empfohlener Workflow' } },
  { tag: 's10-sdd-callout',      title: { en: 'SDD · Spec, Plan, Tasks',              de: 'SDD · Spec, Plan, Tasks' } },
  { tag: 's11-sdd-artifacts',    title: { en: 'SDD · Three Artifacts',                de: 'SDD · Drei Artefakte' } },
  { tag: 's12-sdd-spec',         title: { en: 'SDD · Spec (Rate Limiting)',           de: 'SDD · Spec (Rate-Limiting)' } },
  { tag: 's13-sdd-plan',         title: { en: 'SDD · Plan (Rate Limiting)',           de: 'SDD · Plan (Rate-Limiting)' } },
  { tag: 's14-sdd-tasks',        title: { en: 'SDD · Tasks (Rate Limiting)',          de: 'SDD · Tasks (Rate-Limiting)' } },
  { tag: 's15-sdd-workflow',     title: { en: 'SDD in the Workflow · Gates',          de: 'SDD im Workflow · Gates' } },
  { tag: 's16-sdd-antipatterns', title: { en: 'SDD · Anti-Patterns',                  de: 'SDD · Anti-Patterns' } },
  { tag: 's17-tips-intro',       title: { en: 'Best Practices · Ten Disciplines',     de: 'Best Practices · Zehn Disziplinen' } },
  { tag: 's18-tip-interrogate',  title: { en: 'Tip 1 · Interrogate the Agent',        de: 'Tip 1 · Den Agenten befragen' } },
  { tag: 's19-tip-parallel',     title: { en: 'Tip 2 · Parallel Sessions',            de: 'Tip 2 · Parallele Sessions' } },
  { tag: 's20-tip-review',       title: { en: 'Tip 3 · Review Every Diff',            de: 'Tip 3 · Jeden Diff reviewen' } },
  { tag: 's21-tip-skills',       title: { en: 'Tip 4 · Custom Skills',                de: 'Tip 4 · Custom Skills' } },
  { tag: 's22-tip-interview',    title: { en: 'Tip 5 · Let the Agent Interview You',  de: 'Tip 5 · Agent interviewt dich' } },
  { tag: 's23-tip-commits',      title: { en: 'Tip 6 · Commit Small',                 de: 'Tip 6 · Klein committen' } },
  { tag: 's24-tip-context',      title: { en: 'Tip 7 · Keep Context Fresh',           de: 'Tip 7 · Kontext frisch halten' } },
  { tag: 's25-tip-model',        title: { en: 'Tip 8 · The Right Tier',               de: 'Tip 8 · Richtiges Tier' } },
  { tag: 's26-tip-multimodel',   title: { en: 'Tip 9 · Multiple Providers',           de: 'Tip 9 · Mehrere Anbieter' } },
  { tag: 's27-tip-rules',        title: { en: 'Tip 10 · Project Rules',               de: 'Tip 10 · Projekt-Regeln' } },
  { tag: 's28-copilot',          title: { en: 'In Practice',                          de: 'In der Praxis' } },
];

const CHAPTERS = [
  { label: { en: 'Start',      de: 'Start' },      index: 0,  key: null },
  { label: { en: 'Primitives', de: 'Primitives' }, index: 5,  key: 'p'  },
  { label: { en: 'SDD',        de: 'SDD' },         index: 8,  key: 's'  },
  { label: { en: 'Tips',       de: 'Tips' },        index: 16, key: 't'  },
  { label: { en: 'Practice',   de: 'Praxis' },      index: 27, key: 'r'  },
];

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
  let active = null;
  for (const ch of CHAPTERS) if (ch.index <= index) active = ch;
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
  if (e.target.closest('input,textarea,select')) return;
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
