/* Section 18 — Drift.
   The loop back, and the reason it exists: a stale plan silently disarms
   Review, which is the step that was supposed to catch this. */

import { getLang } from '../core/i18n.js';

const TAG = 's17-build-drift';

const CONTENT = {
  en: {
    h1: 'When reality contradicts the plan, the plan changes',
    lede: `Halfway through Build, something turns out to be untrue. The existing
           cache cannot do sliding windows. The endpoint has a second caller
           nobody remembered. This is normal. What happens next decides whether
           the rest of the loop still works.`,
    pathsLabel: 'Two responses',
    wrong: {
      tag: 'What usually happens',
      steps: ['The agent works around it.', 'The code diverges from the plan.', 'Nobody updates the file.'],
      cost: 'Review now measures the code against a document that describes a different feature. It will pass, and it will mean nothing.',
    },
    right: {
      tag: 'What should happen',
      steps: ['Build stops.', 'The plan is corrected, and re-agreed.', 'Build continues from the corrected plan.'],
      cost: 'Cost: one short conversation. The plan is still the yardstick, so Review still works.',
    },
    note: `A plan that is allowed to go stale does not fail loudly.
           <b>It quietly turns Review into a formality.</b>`,
  },
  de: {
    h1: 'Widerspricht die Realität dem Plan, ändert sich der Plan',
    lede: `Mitten im Build stellt sich etwas als unzutreffend heraus. Der
           bestehende Cache kann keine gleitenden Fenster. Der Endpunkt hat
           einen zweiten Aufrufer, an den niemand gedacht hat. Das ist normal.
           Was danach passiert, entscheidet, ob der Rest des Loops noch trägt.`,
    pathsLabel: 'Zwei Reaktionen',
    wrong: {
      tag: 'Was meistens passiert',
      steps: ['Der Agent baut drumherum.', 'Der Code weicht vom Plan ab.', 'Niemand aktualisiert die Datei.'],
      cost: 'Das Review misst den Code jetzt an einem Dokument, das ein anderes Feature beschreibt. Es wird bestehen, und es wird nichts bedeuten.',
    },
    right: {
      tag: 'Was passieren sollte',
      steps: ['Build hält an.', 'Der Plan wird korrigiert und erneut freigegeben.', 'Build läuft mit dem korrigierten Plan weiter.'],
      cost: 'Kosten: ein kurzes Gespräch. Der Plan bleibt der Maßstab, also funktioniert das Review weiter.',
    },
    note: `Ein Plan, den man veralten lässt, scheitert nicht laut.
           <b>Er macht das Review still zur Formsache.</b>`,
  },
};

class Section18 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const path = (p, kind) => `
      <div class="p p--${kind} fg-card fg-hover fg-in" style="--fg-at: ${kind === 'right' ? 5 : 3}">
        <p class="tag">${p.tag}</p>
        <ol>
          ${p.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        <p class="cost">${p.cost}</p>
      </div>`;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); }
        ${TAG} .lbl { margin-bottom: var(--ae-space-3); }

        ${TAG} .paths {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .p { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .p .tag {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 600;
          color: var(--fg-muted);
        }
        ${TAG} .p--right .tag { color: var(--fg-green-d); }
        ${TAG} .p ol {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-2);
        }
        ${TAG} .p li {
          position: relative;
          padding-left: var(--ae-space-5);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-ink);
        }
        ${TAG} .p li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 12px;
          height: 1.5px;
          background: var(--ae-cool-gray-300);
        }
        ${TAG} .p--right li::before { background: var(--fg-green); }
        ${TAG} .p .cost {
          margin: auto 0 0;
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .p--right .cost { color: var(--fg-green-d); font-weight: 500; }

        @media (max-width: 960px) {
          ${TAG} .paths { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <p class="fg-label lbl fg-in" style="--fg-at: 3">${t.pathsLabel}</p>
        <div class="paths">
          ${path(t.wrong, 'wrong')}
          ${path(t.right, 'right')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section18);
