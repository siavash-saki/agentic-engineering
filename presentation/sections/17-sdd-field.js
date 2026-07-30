/* Section 17 — Field report: the sdd/ folder of a real project
   Five seconds of credibility: what the method looks like after 51
   features. One folder expanded to show the four artifacts + archive. */

import { getLang } from '../core/i18n.js';

const TAG = 's17-sdd-field';

const CONTENT = {
  en: {
    h1: 'What it looks like <b>after 51 features</b>',
    lede: `Not slideware — a real repo, four months in. Every feature:
          Spec, Plan, Tasks, Proof.`,
    caption: `Superseded versions go to <code>archive/</code> — never edited in
          place. Feature numbers are never reused. Git carries the rest.`,
  },
  de: {
    h1: 'So sieht das <b>nach 51 Features</b> aus',
    lede: `Keine Folien-Methode, sondern ein echtes Repo nach vier Monaten.
          Jedes Feature: Spec, Plan, Tasks, Beweis.`,
    caption: `Abgelöste Versionen wandern nach <code>archive/</code> — nie in-place
          editiert. Feature-Nummern werden nie wiederverwendet. Den Rest trägt Git.`,
  },
};

/* The tree is language-neutral (file names + status metadata). */
const TREE = [
  { text: 'sdd/',                                          cls: 'root' },
  { text: '├─ 0001-walking-skeleton/',                     cls: '' },
  { text: '├─ 0002-agentic-layer/',                        cls: '' },
  { text: '├─ 0003-builder-core/',                         cls: '' },
  { text: '│&nbsp;&nbsp;&nbsp;⋮',                          cls: 'dots' },
  { text: '├─ 0023-responsive-sliders/',                   cls: 'open' },
  { text: '│&nbsp;&nbsp;├─ spec.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="meta">v1 · approved</span>', cls: 'file' },
  { text: '│&nbsp;&nbsp;├─ plan.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="meta">v2 · approved</span>', cls: 'file' },
  { text: '│&nbsp;&nbsp;├─ tasks.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="meta">v1 · approved</span>', cls: 'file' },
  { text: '│&nbsp;&nbsp;├─ verification.md&nbsp;&nbsp;<span class="meta">v2 · final</span>', cls: 'file' },
  { text: '│&nbsp;&nbsp;└─ archive/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="meta">superseded versions</span>', cls: 'file' },
  { text: '│&nbsp;&nbsp;&nbsp;⋮',                          cls: 'dots' },
  { text: '├─ 0050-proof-system-repair/',                  cls: '' },
  { text: '└─ 0051-ingest-integrity/',                     cls: '' },
];

class Section17Field extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 820px;
          margin: 0 0 var(--ae-space-5);
        }

        /* Shape deliberately retained: the terminal
           listing IS the field evidence. It types itself in line by line —
           per-line delays are finer than the choreography beat, stated
           inline; the entrance still settles well inside the budget. */
        ${TAG} .tree {
          background: #1c1f24;
          color: #e6e8eb;
          border-radius: var(--ae-radius);
          box-shadow: var(--fg-d2);
          padding: var(--ae-space-4) var(--ae-space-5);
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          line-height: 1.75;
        }
        ${TAG} .tree .line.root { color: #94a3b8; font-weight: 700; }
        ${TAG} .tree .line.dots { color: #9AA4B0; }
        ${TAG} .tree .line.open { color: #fff; font-weight: 700; }
        ${TAG} .tree .line.file { color: #c9d1d9; }
        ${TAG} .tree .line .meta { color: var(--fg-green-light); font-size: var(--ae-fs-caption); }
        ${TAG} .tree .line.file .meta { opacity: 0.9; }

        ${TAG} .caption {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
          text-align: center;
        }
        ${TAG} .caption code {
          font-family: var(--ae-font-mono);
          font-size: 0.92em;
          background: var(--ae-cool-gray-100);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--ae-text-strong);
        }

      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="tree fg-source fg-in" style="--fg-at: 3" aria-label="sdd folder listing">
          ${TREE.map((l, i) => `<div class="line ${l.cls}" style="animation: fg-appear 250ms var(--ae-ease) both; animation-delay: calc(60ms + 4 * var(--fg-beat) + ${i * 50}ms)">${l.text}</div>`).join('')}
        </div>

        <p class="caption fg-in" style="--fg-at: 12">${t.caption}</p>
      </div>
    `;
  }
}

customElements.define(TAG, Section17Field);
