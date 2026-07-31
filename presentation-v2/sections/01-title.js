/* Section 1 — Title.
   States the subject and the loop, nothing else. The agenda is the six
   chapters, in order, so the audience knows the shape before it starts. */

import { getLang } from '../core/i18n.js';

const TAG = 's01-title';

const CONTENT = {
  en: {
    kicker: 'Building software with coding agents',
    h1: 'Agentic <span class="fg-mark fg-mark--sweep">Engineering</span>',
    lede: `One loop, three steps. It applies whether the agent writes a
           migration script or a payment service. What changes is how much
           of it you write down.`,
    loop: ['Plan', 'Build', 'Review'],
    author: 'Dr. Siavash Saki',
    year: '2026',
    agendaLabel: 'What follows',
    agenda: [
      { n: '1', t: 'Start',    d: 'Two prompts, and the difference between them.' },
      { n: '2', t: 'The Loop', d: 'The three steps, and the two agreements.' },
      { n: '3', t: 'Plan',     d: 'Read, ask, converge, write it down.' },
      { n: '4', t: 'Build',    d: 'Small steps, and what the agent knows.' },
      { n: '5', t: 'Review',   d: 'Two questions, and why one model is not enough.' },
      { n: '6', t: 'Practice', d: 'How much of this, for which work.' },
      { n: '7', t: 'SDD',      d: 'The same loop at full weight, with every artifact.' },
    ],
  },
  de: {
    kicker: 'Software bauen mit Coding-Agenten',
    h1: 'Agentic <span class="fg-mark fg-mark--sweep">Engineering</span>',
    lede: `Ein Loop, drei Schritte. Er gilt für ein Migrationsskript genauso
           wie für einen Zahlungsdienst. Unterschiedlich ist nur, wie viel
           davon schriftlich festgehalten wird.`,
    loop: ['Plan', 'Build', 'Review'],
    author: 'Dr. Siavash Saki',
    year: '2026',
    agendaLabel: 'Ablauf',
    agenda: [
      { n: '1', t: 'Start',    d: 'Zwei Prompts, und der Unterschied dazwischen.' },
      { n: '2', t: 'Der Loop', d: 'Die drei Schritte und die zwei Freigaben.' },
      { n: '3', t: 'Plan',     d: 'Lesen, fragen, klären, aufschreiben.' },
      { n: '4', t: 'Build',    d: 'Kleine Schritte, und was der Agent weiß.' },
      { n: '5', t: 'Review',   d: 'Zwei Fragen, und warum ein Modell nicht reicht.' },
      { n: '6', t: 'Praxis',   d: 'Wie viel davon, für welche Arbeit.' },
      { n: '7', t: 'SDD',      d: 'Derselbe Loop mit vollem Gewicht, mit allen Artefakten.' },
    ],
  },
};

class Section01 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: var(--ae-space-8);
          align-items: center;
        }
        ${TAG} .kicker {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fg-muted);
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-5);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        /* The loop, stated once on the title slide so the deck's spine is
           visible before a single argument is made. */
        ${TAG} .loop {
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
          flex-wrap: wrap;
        }
        ${TAG} .loop .step {
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.022em;
          color: var(--fg-ink);
        }
        ${TAG} .loop .arrow {
          color: var(--fg-green);
          font-weight: 700;
          font-size: var(--ae-fs-h4);
        }

        /* The byline sits under the loop, on its own hairline: it is
           attribution, not part of the argument, so it takes the muted
           weight rather than competing with the three steps above it. */
        ${TAG} .byline {
          display: flex;
          align-items: baseline;
          gap: var(--ae-space-3);
          margin: var(--ae-space-6) 0 0;
          padding-top: var(--ae-space-4);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .byline .name {
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h5);
          line-height: 1.2;
          font-weight: 600;
          color: var(--fg-ink);
        }
        ${TAG} .byline .year {
          font-size: var(--ae-fs-small);
          line-height: 1.2;
          color: var(--fg-faint);
          font-variant-numeric: tabular-nums;
        }

        ${TAG} .agenda { margin: 0; }
        ${TAG} .agenda .label { margin-bottom: var(--ae-space-3); }
        ${TAG} .agenda ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        ${TAG} .agenda li {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .agenda li:last-child { border-bottom: 0; }
        ${TAG} .agenda .t {
          font-family: var(--ae-font-head);
          font-weight: 600;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .agenda .d {
          display: block;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-muted);
          margin-top: 2px;
        }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; gap: var(--ae-space-6); }
        }
      </style>
      <div class="fg-wrap grid">
        <div>
          <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
          <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
          <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
          <div class="loop">
            ${t.loop.map((s, i) => `
              ${i ? `<span class="arrow fg-in" style="--fg-at: ${3 + i * 2 - 1}" aria-hidden="true">→</span>` : ''}
              <span class="step fg-in" style="--fg-at: ${3 + i * 2}">${s}</span>
            `).join('')}
          </div>
          <p class="byline fg-in" style="--fg-at: 9">
            <span class="name">${t.author}</span>
            <span class="year">${t.year}</span>
          </p>
        </div>

        <div class="agenda fg-in" style="--fg-at: 4">
          <p class="fg-label label">${t.agendaLabel}</p>
          <ol>
            ${t.agenda.map((a, i) => `
              <li class="fg-in" style="--fg-at: ${5 + i}">
                <span class="fg-badge">${a.n}</span>
                <span>
                  <span class="t">${a.t}</span>
                  <span class="d">${a.d}</span>
                </span>
              </li>
            `).join('')}
          </ol>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section01);
