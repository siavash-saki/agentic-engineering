/* Each section self-registers a custom element via customElements.define(). */
import '../sections/01-context.js';
import '../sections/02-landscape.js';
import '../sections/03-gap.js';
import '../sections/04-vibe-vs-agentic.js';
import '../sections/05-primitives-1.js';
import '../sections/06-primitives-2.js';
import '../sections/07-workflow.js';
import '../sections/08-copilot.js';

const sections = [
  { tag: 's01-context',         title: 'Context & Goal' },
  { tag: 's02-landscape',       title: 'What is What' },
  { tag: 's03-gap',             title: 'The Capability Gap' },
  { tag: 's04-vibe-vs-agentic', title: 'Vibe Coding vs Agentic Engineering' },
  { tag: 's05-primitives-1',    title: 'Primitives — Memory, Skills, MCP' },
  { tag: 's06-primitives-2',    title: 'Primitives — Hooks, Subagents, Scope' },
  { tag: 's07-workflow',        title: 'Workflow & Best Practices' },
  { tag: 's08-copilot',         title: 'Copilot in Practice' },
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

/* Theme toggle */
const themeToggle = document.getElementById('theme-toggle');
const iconSun  = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  html.classList.toggle('dark',  !isDark);
  html.classList.toggle('light',  isDark);
  iconSun.style.display  = isDark ? 'block' : 'none';
  iconMoon.style.display = isDark ? 'none'  : 'block';
});

/* Initial mount — respect hash like #3 */
const initial = parseInt(location.hash.slice(1), 10);
const startIndex = (initial >= 1 && initial <= sections.length) ? initial - 1 : 0;
mount(startIndex);
