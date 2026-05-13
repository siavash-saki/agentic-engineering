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
import '../sections/10-tip-interrogate.js';
import '../sections/11-tip-parallel.js';
import '../sections/12-tip-review.js';
import '../sections/13-tip-skills.js';
import '../sections/14-tip-interview.js';
import '../sections/15-tip-commits.js';
import '../sections/16-tip-context.js';
import '../sections/17-tip-model.js';
import '../sections/18-tip-rules.js';
import '../sections/19-copilot.js';

const sections = [
  { tag: 's01-context',          title: 'Kontext & Ziel' },
  { tag: 's02-trust',            title: 'Vertrauen ist gut, Kontrolle ist alles' },
  { tag: 's03-start-small',      title: 'Klein anfangen' },
  { tag: 's04-vibe-vs-agentic',  title: 'Vibe Coding vs. Agentic Engineering' },
  { tag: 's05-landscape',        title: 'Was ist was' },
  { tag: 's06-primitives-1',     title: 'Primitives — Memory, Skills, MCP' },
  { tag: 's07-primitives-2',     title: 'Primitives — Hooks, Subagents, Scope' },
  { tag: 's08-context-loading',  title: 'Wann lädt was in den Kontext' },
  { tag: 's09-workflow',         title: 'Empfohlener Workflow' },
  { tag: 's10-tip-interrogate',  title: 'Tip 1 · Den Agenten befragen' },
  { tag: 's11-tip-parallel',     title: 'Tip 2 · Parallele Sessions' },
  { tag: 's12-tip-review',       title: 'Tip 3 · Jeden Diff reviewen' },
  { tag: 's13-tip-skills',       title: 'Tip 4 · Custom Skills' },
  { tag: 's14-tip-interview',    title: 'Tip 5 · Agent interviewt dich' },
  { tag: 's15-tip-commits',      title: 'Tip 6 · Klein committen' },
  { tag: 's16-tip-context',      title: 'Tip 7 · Kontext frisch halten' },
  { tag: 's17-tip-model',        title: 'Tip 8 · Richtiges Modell' },
  { tag: 's18-tip-rules',        title: 'Tip 9 · Projekt-Regeln' },
  { tag: 's19-copilot',          title: 'Copilot in der Praxis' },
];

const CHAPTERS = [
  { label: 'Start',      index: 0,  key: null },
  { label: 'Primitives', index: 5,  key: 'p'  },
  { label: 'Tips',       index: 9,  key: 't'  },
  { label: 'Copilot',    index: 18, key: 'c'  },
];

const stage      = document.getElementById('stage');
const counter    = document.getElementById('counter');
const prevBtn    = document.getElementById('btn-prev');
const nextBtn    = document.getElementById('btn-next');
const chaptersEl = document.getElementById('chapters');
const pageTitle  = document.querySelector('.page-title');

CHAPTERS.forEach(ch => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = ch.key
    ? `${ch.label}<span class="key">${ch.key.toUpperCase()}</span>`
    : ch.label;
  btn.title = ch.key
    ? `Sprung zu „${ch.label}" (Taste ${ch.key.toUpperCase()})`
    : `Sprung zu „${ch.label}"`;
  btn.addEventListener('click', () => mount(ch.index));
  ch.btn = btn;
  chaptersEl.appendChild(btn);
});

function updateChapterHighlight(index) {
  let active = null;
  for (const ch of CHAPTERS) if (ch.index <= index) active = ch;
  CHAPTERS.forEach(ch => ch.btn.classList.toggle('current', ch === active));
}

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
  pageTitle.textContent = sections[index].title;
  updateChapterHighlight(index);
  history.replaceState(null, '', `#${index + 1}`);
}

const go = delta => mount(current + delta);

prevBtn.addEventListener('click', () => go(-1));
nextBtn.addEventListener('click', () => go(1));

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
  } else {
    const ch = CHAPTERS.find(c => c.key && c.key === e.key.toLowerCase());
    if (ch) { e.preventDefault(); mount(ch.index); }
  }
});

/* Initial mount — respect hash like #3 */
const initial = parseInt(location.hash.slice(1), 10);
const startIndex = (initial >= 1 && initial <= sections.length) ? initial - 1 : 0;
mount(startIndex);
