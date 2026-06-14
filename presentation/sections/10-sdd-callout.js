/* Section 10 — SDD Chapter opener
   Three metaphor cards anchor the Spec/Plan/Tasks trio before the formal
   table follows. Lead with the memorable image — the reader will quote
   "Contract · Build Plan · Checklist" long after the talk. */

import { getLang } from '../core/i18n.js';

const TAG = 's10-sdd-callout';

const CONTENT = {
  en: {
    eyebrow: 'Spec-Driven Development',
    h1: 'Spec, Plan, Tasks — <b>three layers</b>',
    lede: `When the agent builds the wrong thing, it's rarely the model's fault.
          It's the briefing. SDD splits three layers we usually mash together.`,
    cards: [
      {
        artifact: 'Spec',
        metaphor: 'Contract',
        file:     'specs/&lt;feature&gt;.md',
        answers:  'What should the system do?',
        body:     'Behavior, acceptance criteria, out of scope. No implementation.',
      },
      {
        artifact: 'Plan',
        metaphor: 'Build Plan',
        file:     'plan.md',
        answers:  'How do we build it?',
        body:     'Approach, architecture, sequencing, risks, files touched.',
      },
      {
        artifact: 'Tasks',
        metaphor: 'Checklist',
        file:     'tasks.md',
        answers:  'In what order, concretely?',
        body:     'A flat, checkable list. One task, one commit.',
      },
    ],
    punch: 'Spec = <b>Contract</b>. Plan = <b>Build Plan</b>. Tasks = <b>Checklist</b>.',
  },
  de: {
    eyebrow: 'Spec-Driven Development',
    h1: 'Spec, Plan, Tasks — <b>drei Ebenen</b>',
    lede: `Wenn der Agent das Falsche baut, lag's selten am Modell. Es lag am
          Briefing. SDD trennt drei Ebenen, die wir sonst durcheinanderwerfen.`,
    cards: [
      {
        artifact: 'Spec',
        metaphor: 'Vertrag',
        file:     'specs/&lt;feature&gt;.md',
        answers:  'Was soll das System tun?',
        body:     'Verhalten, Akzeptanzkriterien, Out of Scope. Keine Implementierung.',
      },
      {
        artifact: 'Plan',
        metaphor: 'Bauanleitung',
        file:     'plan.md',
        answers:  'Wie bauen wir das?',
        body:     'Ansatz, Architektur, Reihenfolge, Risiken, betroffene Dateien.',
      },
      {
        artifact: 'Tasks',
        metaphor: 'Checkliste',
        file:     'tasks.md',
        answers:  'In welcher Reihenfolge, konkret?',
        body:     'Flache, abhakbare Liste. Eine Task, ein Commit.',
      },
    ],
    punch: 'Spec = <b>Vertrag</b>. Plan = <b>Bauanleitung</b>. Tasks = <b>Checkliste</b>.',
  },
};

class Section10SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-6) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: sdd10-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd10-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-6);
          opacity: 0;
          animation: sdd10-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--db-space-4);
        }
        ${TAG} .card {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5);
          display: flex;
          flex-direction: column;
          gap: var(--db-space-3);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          animation: sdd10-rise 600ms var(--db-ease) forwards;
        }
        ${TAG} .card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--db-red);
        }
        ${TAG} .card:nth-child(1) { animation-delay: 520ms; }
        ${TAG} .card:nth-child(2) { animation-delay: 680ms; }
        ${TAG} .card:nth-child(3) { animation-delay: 840ms; }

        ${TAG} .artifact {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--db-red);
        }
        ${TAG} .metaphor {
          margin: 0;
          font-size: var(--db-fs-h1);
          line-height: 1;
          font-weight: 900;
          color: var(--db-text-strong);
        }
        ${TAG} .file {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          color: var(--db-text-muted);
          background: var(--db-bg);
          padding: 4px 8px;
          border-radius: 4px;
          align-self: flex-start;
        }
        ${TAG} .answers {
          margin: 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          font-style: italic;
          color: var(--db-text);
          padding-bottom: var(--db-space-3);
          border-bottom: 1px solid var(--db-cool-gray-200);
        }
        ${TAG} .body {
          margin: 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
        }

        ${TAG} .punch {
          margin: var(--db-space-6) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: sdd10-fade 600ms var(--db-ease) 1100ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes sdd10-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdd10-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>
        <p class="lede">
          ${t.lede}
        </p>

        <div class="cards">
          ${t.cards.map(c => `
            <div class="card">
              <div class="artifact">${c.artifact}</div>
              <h2 class="metaphor">${c.metaphor}</h2>
              <code class="file">${c.file}</code>
              <p class="answers">${c.answers}</p>
              <p class="body">${c.body}</p>
            </div>
          `).join('')}
        </div>

        <p class="punch">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section10SDD);
