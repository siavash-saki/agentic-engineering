/* Each section self-registers a custom element via customElements.define(). */
import '../sections/01-context.js';
import '../sections/02-landscape.js';
import '../sections/03-gap.js';
import '../sections/04-trust.js';
import '../sections/05-vibe-vs-agentic.js';
import '../sections/06-primitives-1.js';
import '../sections/07-primitives-2.js';
import '../sections/08-workflow.js';
import '../sections/09-tip-interrogate.js';
import '../sections/10-tip-parallel.js';
import '../sections/11-tip-review.js';
import '../sections/12-tip-skills.js';
import '../sections/13-tip-interview.js';
import '../sections/14-tip-commits.js';
import '../sections/15-tip-context.js';
import '../sections/16-tip-model.js';
import '../sections/17-tip-rules.js';
import '../sections/18-copilot.js';

const sections = [
  { tag: 's01-context',          title: 'Kontext & Ziel' },
  { tag: 's02-landscape',        title: 'Was ist was' },
  { tag: 's03-gap',              title: 'Die Fähigkeitslücke' },
  { tag: 's04-trust',            title: 'Vertrauen ist gut, Kontrolle ist alles' },
  { tag: 's05-vibe-vs-agentic',  title: 'Vibe Coding vs. Agentic Engineering' },
  { tag: 's06-primitives-1',     title: 'Primitives — Memory, Skills, MCP' },
  { tag: 's07-primitives-2',     title: 'Primitives — Hooks, Subagents, Scope' },
  { tag: 's08-workflow',         title: 'Empfohlener Workflow' },
  { tag: 's09-tip-interrogate',  title: 'Tip 1 · Den Agenten befragen' },
  { tag: 's10-tip-parallel',     title: 'Tip 2 · Parallele Sessions' },
  { tag: 's11-tip-review',       title: 'Tip 3 · Jeden Diff reviewen' },
  { tag: 's12-tip-skills',       title: 'Tip 4 · Custom Skills' },
  { tag: 's13-tip-interview',    title: 'Tip 5 · Agent interviewt dich' },
  { tag: 's14-tip-commits',      title: 'Tip 6 · Klein committen' },
  { tag: 's15-tip-context',      title: 'Tip 7 · Kontext frisch halten' },
  { tag: 's16-tip-model',        title: 'Tip 8 · Richtiges Modell' },
  { tag: 's17-tip-rules',        title: 'Tip 9 · Projekt-Regeln' },
  { tag: 's18-copilot',          title: 'Copilot in der Praxis' },
];

const stage     = document.getElementById('stage');
const counter   = document.getElementById('counter');
const prevBtn   = document.getElementById('btn-prev');
const nextBtn   = document.getElementById('btn-next');
const pageTitle = document.querySelector('.page-title');

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
  }
});

/* Initial mount — respect hash like #3 */
const initial = parseInt(location.hash.slice(1), 10);
const startIndex = (initial >= 1 && initial <= sections.length) ? initial - 1 : 0;
mount(startIndex);
