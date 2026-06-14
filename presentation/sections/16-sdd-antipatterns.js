/* Section 16 — SDD: Anti-Patterns
   Five patterns that look like SDD but deliver none of it. Closes the
   chapter with the "spectrum" sign-off — replacing the longer
   "Wie viel davon brauche ich" prose from the source. */

import { getLang } from '../core/i18n.js';

const TAG = 's16-sdd-antipatterns';

const CONTENT = {
  en: {
    eyebrow: 'Anti-Patterns',
    h1: 'Where it <b>falls apart</b>',
    lede: `Five patterns that look like SDD — and deliver none of it.`,
    patterns: [
      {
        name: 'Spec-after',
        body: 'Code first, spec later.',
        why:  "That's documentation. The agent coded with no guardrails.",
      },
      {
        name: 'Pseudo-code spec',
        body: 'The spec dictates the <i>how</i>, not the <i>what</i>.',
        why:  'You lock in decisions the model would make better.',
      },
      {
        name: 'Spec with no acceptance criteria',
        body: 'Prose that sounds complete — but tests nothing.',
        why:  'Useless in review, useless for generating code.',
      },
      {
        name: 'Spec = plan',
        body: 'Behavior and implementation in one document.',
        why:  'Review loses its yardstick.',
      },
      {
        name: 'Orphaned spec',
        body: 'Written once, then ignored while you code.',
        why:  "Unanchored in the prompt, the code drifts off the spec.",
      },
    ],
    punch: 'SDD is a spectrum. <b>The costlier the mistake, the more spec.</b>',
  },
  de: {
    eyebrow: 'Anti-Patterns',
    h1: 'Was <b>schiefgeht</b>',
    lede: `Fünf Muster, die wie SDD aussehen — aber nichts davon liefern.`,
    patterns: [
      {
        name: 'Spec-after',
        body: 'Erst Code, dann Spec.',
        why:  'Das ist Dokumentation. Der Agent hatte beim Codieren keine Leitplanken.',
      },
      {
        name: 'Pseudo-Code-Spec',
        body: 'Spec beschreibt das <i>Wie</i> statt das <i>Was</i>.',
        why:  'Verriegelt Entscheidungen, die das Modell besser trifft.',
      },
      {
        name: 'Spec ohne Akzeptanzkriterien',
        body: 'Fließtext, der vollständig klingt — aber nichts testet.',
        why:  'Hilft weder im Review noch beim Code-Generieren.',
      },
      {
        name: 'Spec = Plan',
        body: 'Verhalten und Implementierung im selben Dokument.',
        why:  'Review verliert seinen Maßstab.',
      },
      {
        name: 'Verwaiste Spec',
        body: 'Einmal geschrieben, dann beim Coden ignoriert.',
        why:  'Ohne Verankerung im Prompt driftet der Code von der Spec weg.',
      },
    ],
    punch: 'SDD ist ein Spektrum. <b>Je teurer ein Fehler, desto mehr Spec.</b>',
  },
};

class Section16SDD extends HTMLElement {
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
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: sdd16-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd16-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 900px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: sdd16-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} ul.patterns {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--db-space-3);
        }
        ${TAG} ul.patterns li {
          display: grid;
          grid-template-columns: minmax(220px, auto) 1fr;
          gap: var(--db-space-4);
          align-items: baseline;
          padding: var(--db-space-3) var(--db-space-4);
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          opacity: 0;
          transform: translateX(-12px);
        }
        ${TAG} ul.patterns li:nth-child(1) { animation: sdd16-slide 450ms var(--db-ease) 500ms forwards; }
        ${TAG} ul.patterns li:nth-child(2) { animation: sdd16-slide 450ms var(--db-ease) 620ms forwards; }
        ${TAG} ul.patterns li:nth-child(3) { animation: sdd16-slide 450ms var(--db-ease) 740ms forwards; }
        ${TAG} ul.patterns li:nth-child(4) { animation: sdd16-slide 450ms var(--db-ease) 860ms forwards; }
        ${TAG} ul.patterns li:nth-child(5) { animation: sdd16-slide 450ms var(--db-ease) 980ms forwards; }

        ${TAG} .name {
          font-weight: 700;
          color: var(--db-red);
          font-size: var(--db-fs-body);
          line-height: 1.3;
        }
        ${TAG} .body {
          font-size: var(--db-fs-body);
          line-height: 1.4;
          color: var(--db-text-strong);
        }
        ${TAG} .body i { font-style: italic; }
        ${TAG} .why {
          display: block;
          font-size: var(--db-fs-small);
          color: var(--db-text-muted);
          margin-top: 2px;
        }

        ${TAG} .punch {
          margin: var(--db-space-6) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: sdd16-fade 600ms var(--db-ease) 1200ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes sdd16-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdd16-slide {
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 760px) {
          ${TAG} ul.patterns li { grid-template-columns: 1fr; gap: 4px; }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>
        <p class="lede">
          ${t.lede}
        </p>

        <ul class="patterns">
          ${t.patterns.map(p => `
            <li>
              <span class="name">${p.name}</span>
              <span class="body">
                ${p.body}
                <span class="why">${p.why}</span>
              </span>
            </li>
          `).join('')}
        </ul>

        <p class="punch">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section16SDD);
