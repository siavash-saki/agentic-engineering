/* Section 4 — Vibe coding vs. agentic engineering.
   One spine of dimensions down the middle, the two answers hanging off
   it. The question is asked once; the eye does not have to pair up
   answers across a gutter. The workflow row is a sequence and is set as
   one — two beads against four is the argument the slide is making. */

import { getLang } from '../core/i18n.js';

const TAG = 's03-compare';

const CONTENT = {
  en: {
    vibeTitle: 'Vibe coding',
    vibeTag: 'Describe the outcome, take what comes back',
    agenticTitle: 'Agentic engineering',
    agenticTag: 'Decide first, then direct the agent',
    rows: [
      { dim: 'Workflow',
        vibeSteps: ['Idea', 'Build'],
        agenticSteps: ['Idea', 'Plan', 'Build', 'Review'] },
      { dim: 'Who decides',
        vibe: 'The model, wherever you did not say',
        agentic: 'You, before any code exists' },
      { dim: 'What the agent reads',
        vibe: 'Whatever it happens to reach on its own',
        agentic: 'A written plan, plus the files you named' },
      { dim: 'Quality check',
        vibe: 'It runs, so it works',
        agentic: 'Checked against the plan, then read by a second model' },
      { dim: 'Correct use',
        vibe: 'Prototypes, throwaway scripts, personal tools',
        agentic: 'Anything that other people will run or maintain' },
    ],
  },
  de: {
    vibeTitle: 'Vibe Coding',
    vibeTag: 'Ergebnis beschreiben, Output übernehmen',
    agenticTitle: 'Agentic Engineering',
    agenticTag: 'Erst entscheiden, dann den Agenten steuern',
    rows: [
      { dim: 'Ablauf',
        vibeSteps: ['Idee', 'Build'],
        agenticSteps: ['Idee', 'Plan', 'Build', 'Review'] },
      { dim: 'Wer entscheidet',
        vibe: 'Das Modell, überall dort, wo nichts gesagt wurde',
        agentic: 'Der Mensch, bevor Code existiert' },
      { dim: 'Was der Agent liest',
        vibe: 'Worauf er zufällig zugreift',
        agentic: 'Einen schriftlichen Plan und die genannten Dateien' },
      { dim: 'Qualitätsprüfung',
        vibe: 'Es läuft, also funktioniert es',
        agentic: 'Gegen den Plan geprüft, dann von einem zweiten Modell gelesen' },
      { dim: 'Richtige Anwendung',
        vibe: 'Prototypen, Wegwerf-Skripte, eigene Werkzeuge',
        agentic: 'Alles, was andere ausführen oder pflegen' },
    ],
  },
};

/* A value is prose, except the workflow — which is a sequence and reads as
   one. Each arrow travels with the step it points at, so a run that wraps
   breaks before an arrow rather than stranding one at the end of a line. */
const cell = (row, side) => {
  const steps = side === 'vibe' ? row.vibeSteps : row.agenticSteps;
  if (!steps) return row[side];
  const mod = side === 'agentic' ? ' steps--a' : '';
  return `<span class="steps${mod}">${steps
    .map((s, i) => i === 0
      ? `<span class="st">${s}</span>`
      : `<span class="lk"><span class="ar">→</span><span class="st">${s}</span></span>`)
    .join('')}</span>`;
};

class Section04 extends HTMLElement {
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
          --spine: clamp(140px, 15vw, 220px);
        }

        /* No slide title: the two column names are the title. The deck's
           own chrome still carries the heading from the registry. */
        ${TAG} .head,
        ${TAG} .row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) var(--spine) minmax(0, 1fr);
          column-gap: var(--ae-space-5);
          align-items: start;
        }

        ${TAG} .head { padding-bottom: var(--ae-space-4); }
        ${TAG} .head h2 {
          margin: 0 0 var(--ae-space-1);
          font-size: var(--ae-fs-h3);
          line-height: 1.15;
          color: var(--fg-muted);
        }
        ${TAG} .head .a h2 { color: var(--fg-green-d); }
        ${TAG} .head p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-faint);
        }
        ${TAG} .head .a p { color: var(--fg-muted); }
        ${TAG} .head .v { text-align: right; }

        ${TAG} dl { margin: 0; }
        ${TAG} .row {
          padding: var(--ae-space-4) 0;
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} dt {
          grid-column: 2;
          grid-row: 1;
          text-align: center;
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--fg-faint);
        }
        ${TAG} dd { margin: 0; grid-row: 1; }
        ${TAG} dd.v {
          grid-column: 1;
          text-align: right;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-muted);
        }
        ${TAG} dd.a {
          grid-column: 3;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-ink);
          font-weight: 500;
        }

        /* The workflow row: beads, not a sentence. */
        ${TAG} .steps {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
          justify-content: flex-end;
        }
        ${TAG} .steps--a { justify-content: flex-start; }
        ${TAG} .steps .lk { display: inline-flex; align-items: baseline; }
        ${TAG} .steps .st {
          font-family: var(--ae-font-head);
          font-weight: 700;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--fg-muted);
        }
        ${TAG} .steps--a .st { color: var(--fg-green-d); }
        ${TAG} .steps .ar {
          color: var(--fg-hair);
          font-weight: 700;
          padding: 0 0.4em;
        }
        ${TAG} .steps--a .ar { color: var(--fg-green); opacity: 0.6; }

        @media (max-width: 1000px) {
          ${TAG} { --spine: 0px; }
          ${TAG} .head, ${TAG} .row { grid-template-columns: 1fr; row-gap: var(--ae-space-2); }
          ${TAG} .head .v, ${TAG} dd.v { text-align: left; }
          ${TAG} .steps { justify-content: flex-start; }
          ${TAG} dt, ${TAG} dd.v, ${TAG} dd.a { grid-column: 1; grid-row: auto; }
          ${TAG} dt { text-align: left; }
        }
      </style>
      <div class="fg-wrap">
        <div class="head">
          <div class="v fg-in" style="--fg-at: 1">
            <h2>${t.vibeTitle}</h2>
            <p>${t.vibeTag}</p>
          </div>
          <div></div>
          <div class="a fg-in" style="--fg-at: 2">
            <h2>${t.agenticTitle}</h2>
            <p>${t.agenticTag}</p>
          </div>
        </div>

        <dl>
          ${t.rows.map((r, i) => `
            <div class="row fg-in" style="--fg-at: ${3 + i}">
              <dd class="v">${cell(r, 'vibe')}</dd>
              <dt>${r.dim}</dt>
              <dd class="a">${cell(r, 'agentic')}</dd>
            </div>
          `).join('')}
        </dl>
      </div>
    `;
  }
}

customElements.define(TAG, Section04);
