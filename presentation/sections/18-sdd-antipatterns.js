/* Section 18 — SDD: Anti-Patterns + the fast path
   Five patterns that look like SDD but deliver none of it — and the rule
   that keeps the method proportionate: the fast path. Closes the chapter
   with the spectrum punch. */

import { getLang } from '../core/i18n.js';

const TAG = 's18-sdd-antipatterns';

const CONTENT = {
  en: {
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
    fastLabel: 'The fast path',
    fastText: `Small change, no new product semantics, bounded surface?
          Skip plan and tasks — <b>spec + verification only</b>.
          The fast path removes artifacts, never the human gate.`,
    punch: 'SDD is a spectrum. <b>The costlier the mistake, the more spec.</b>',
  },
  de: {
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
    fastLabel: 'Der Schnellweg',
    fastText: `Kleine Änderung, keine neuen Produkt-Semantiken, überschaubare
          Fläche? Plan und Tasks überspringen — <b>nur Spec + Verification</b>.
          Der Schnellweg spart Artefakte, nie das menschliche Gate.`,
    punch: 'SDD ist ein Spektrum. <b>Je teurer ein Fehler, desto mehr Spec.</b>',
  },
};

class Section18SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
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
          max-width: 900px;
          margin: 0 0 var(--ae-space-5);
        }

        ${TAG} ul.patterns {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--ae-space-3);
        }
        /* Each anti-pattern is struck through the slide's own grammar: a
           clay ✗ mark in front of it, and a clay wash when you point at it.
           These are the rows that fail — the layout says so. */
        ${TAG} ul.patterns li {
          display: grid;
          grid-template-columns: auto minmax(200px, auto) 1fr;
          gap: var(--ae-space-4);
          align-items: baseline;
          padding: var(--ae-space-3) var(--ae-space-4);
          background: var(--ae-cool-gray-100);
          border-radius: var(--ae-radius);
          transition: background 200ms var(--ae-ease);
        }
        ${TAG} ul.patterns li:hover { background: #F6E3D8; }
        ${TAG} .mark {
          align-self: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.7em;
          height: 1.7em;
          border-radius: 50%;
          background: #F6E3D8;
          color: var(--fg-clay);
          font-weight: 700;
          font-size: var(--ae-fs-small);
          line-height: 1;
          transition: background 200ms var(--ae-ease), color 200ms var(--ae-ease);
        }
        ${TAG} ul.patterns li:hover .mark { background: var(--fg-clay); color: #fff; }
        ${TAG} .name {
          font-weight: 700;
          color: var(--fg-clay);
          font-size: var(--ae-fs-body);
          line-height: 1.3;
        }
        ${TAG} .body {
          font-size: var(--ae-fs-body);
          line-height: 1.4;
          color: var(--ae-text-strong);
        }
        ${TAG} .body i { font-style: italic; }
        ${TAG} .why {
          display: block;
          font-size: var(--ae-fs-small);
          color: var(--ae-text-muted);
          margin-top: 2px;
        }

        ${TAG} .fastpath {
          margin: var(--ae-space-4) 0 0;
          padding: var(--ae-space-3) var(--ae-space-4);
          border: 1.5px dashed var(--ae-cool-gray-400);
          border-radius: var(--ae-radius);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--ae-space-4);
          align-items: baseline;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
        }
        ${TAG} .fastpath .label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-red);
          white-space: nowrap;
        }
        ${TAG} .fastpath b { color: var(--ae-text-strong); }

        ${TAG} .punch {
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @media (max-width: 760px) {
          ${TAG} ul.patterns li { grid-template-columns: 1fr; gap: 4px; }
          ${TAG} .fastpath { grid-template-columns: 1fr; gap: 6px; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <ul class="patterns">
          ${t.patterns.map((p, i) => `
            <li class="fg-in" style="--fg-at: ${4 + i}">
              <span class="mark" aria-hidden="true">✗</span>
              <span class="name">${p.name}</span>
              <span class="body">
                ${p.body}
                <span class="why">${p.why}</span>
              </span>
            </li>
          `).join('')}
        </ul>

        <div class="fastpath fg-in" style="--fg-at: 10">
          <span class="label">${t.fastLabel}</span>
          <span>${t.fastText}</span>
        </div>

        <p class="punch fg-in" style="--fg-at: 12">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section18SDD);
