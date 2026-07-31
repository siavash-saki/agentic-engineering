/* Section 14 — Build, chapter opener.
   Three rules, all of them about size. The checklist is introduced here
   rather than in Plan, because it is a tracking device and not a thing
   anyone approves. */

import { getLang } from '../core/i18n.js';

const TAG = 's13-build';

const CONTENT = {
  en: {
    kicker: 'Step 2 of 3',
    h1: 'Build',
    lede: `The agent can produce a thousand lines before you finish reading the
           first hundred. Every rule in this step exists to keep the output
           smaller than your attention.`,
    rules: [
      { n: '1', t: 'A checklist first',
        d: 'The agent turns the plan into a flat list of steps and works them in order. Nobody approves this list — it exists so you can see where it is.' },
      { n: '2', t: 'One step, one commit',
        d: 'A commit per item, with a message that names the item. A forty-file diff is not reviewable; six six-file diffs are.' },
      { n: '3', t: 'The plan stays in the prompt',
        d: 'Not read once at the start. Referenced in the message that asks for each step, so the agent is building against it rather than from memory.' },
    ],
    contextLabel: 'And underneath all three',
    context: `What the agent knows before it writes anything: the project\'s memory
              file, the procedures you have written down, and the systems it is
              allowed to reach. That is the next three slides.`,
  },
  de: {
    kicker: 'Schritt 2 von 3',
    h1: 'Build',
    lede: `Der Agent produziert tausend Zeilen, bevor die ersten hundert gelesen
           sind. Jede Regel in diesem Schritt hält den Output kleiner als die
           eigene Aufmerksamkeit.`,
    rules: [
      { n: '1', t: 'Zuerst eine Checkliste',
        d: 'Der Agent macht aus dem Plan eine flache Liste von Schritten und arbeitet sie der Reihe nach ab. Niemand gibt diese Liste frei — sie zeigt nur, wo er gerade steht.' },
      { n: '2', t: 'Ein Schritt, ein Commit',
        d: 'Ein Commit pro Punkt, mit einer Nachricht, die den Punkt benennt. Ein Diff über vierzig Dateien ist nicht prüfbar, sechs Diffs über je sechs schon.' },
      { n: '3', t: 'Der Plan bleibt im Prompt',
        d: 'Nicht einmal am Anfang gelesen. In jeder Nachricht referenziert, die einen Schritt anfordert — damit dagegen gebaut wird und nicht aus dem Gedächtnis.' },
    ],
    contextLabel: 'Und unter allen dreien',
    context: `Was der Agent weiß, bevor er etwas schreibt: die Memory-Datei des
              Projekts, die aufgeschriebenen Abläufe und die Systeme, die er
              erreichen darf. Darum geht es auf den nächsten drei Folien.`,
  },
};

class Section14 extends HTMLElement {
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
        ${TAG} .kicker {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-green);
          margin: 0 0 var(--ae-space-2);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        ${TAG} .rules {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .r { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .r .head { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .r h3 { margin: 0; font-size: var(--ae-fs-h4); line-height: var(--ae-lh-h4); color: var(--fg-ink); }
        ${TAG} .r p { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        ${TAG} .ctx .lbl { margin-bottom: var(--ae-space-2); }
        ${TAG} .ctx p:not(.fg-label) { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        @media (max-width: 1000px) {
          ${TAG} .rules { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="rules">
          ${t.rules.map((r, i) => `
            <div class="r fg-card fg-card--raised fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="fg-badge">${r.n}</span>
                <h3 class="fg-hover-title">${r.t}</h3>
              </div>
              <p>${r.d}</p>
            </div>
          `).join('')}
        </div>

        <div class="ctx fg-in" style="--fg-at: 7">
          <p class="fg-label lbl">${t.contextLabel}</p>
          <p>${t.context}</p>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section14);
