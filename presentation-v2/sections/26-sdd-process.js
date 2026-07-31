/* Section 26 — The full process, at the top of the dial.
   The same three steps, with every artifact, gate and reviewer drawn in.
   This is one working tuning, not a proposal: it is what the method looks
   like when being wrong is expensive and hard to see. */

import { getLang } from '../core/i18n.js';

const TAG = 's26-sdd-process';

const CONTENT = {
  en: {
    kicker: 'Spec-Driven Development',
    h1: 'The full process',
    lede: `Still Plan, Build, Review. Now every step leaves an artifact, and the
           gates are written down instead of remembered.`,
    steps: [
      { name: 'Spec',    body: 'What it should do.',        doc: 'spec.md',         kind: 'writes' },
      { name: 'Plan',    body: 'How it will be built.',     doc: 'plan.md · tasks.md', kind: 'writes' },
      { name: 'Build',   body: 'One task, one commit.',     doc: 'tasks.md',        kind: 'ticks off' },
      { name: 'Review',  body: 'Evidence per criterion.',   doc: 'verification.md', kind: 'writes' },
    ],
    gates: [
      { n: '1', desc: 'Approve the spec' },
      { n: '2', desc: 'Approve the plan' },
      { n: '3', desc: 'Accept the evidence' },
    ],
    shipLabel: 'And it ships like this',
    ship: [
      { t: 'One spec, one branch, one PR', d: 'The branch is a review boundary, not parallelism. One at a time, cut from main, short-lived.' },
      { t: 'A different model reviews the PR', d: 'Not the family that wrote the code. Automatic on open, or summoned by comment.' },
      { t: 'Findings are input, not orders', d: 'Adopt what stands up, decline the rest with a reason on the PR. Two rounds, then a person decides.' },
    ],
    note: `The artifacts commit next to the code, in the same branch —
           <b>so the diff carries the reasoning and the change together.</b>`,
  },
  de: {
    kicker: 'Spec-Driven Development',
    h1: 'Der vollständige Prozess',
    lede: `Immer noch Plan, Build, Review. Nur hinterlässt jetzt jeder Schritt ein
           Artefakt, und die Gates stehen geschrieben statt im Gedächtnis.`,
    steps: [
      { name: 'Spec',   body: 'Was es tun soll.',            doc: 'spec.md',            kind: 'schreibt' },
      { name: 'Plan',   body: 'Wie es gebaut wird.',         doc: 'plan.md · tasks.md', kind: 'schreibt' },
      { name: 'Build',  body: 'Ein Task, ein Commit.',       doc: 'tasks.md',           kind: 'hakt ab' },
      { name: 'Review', body: 'Belege je Kriterium.',        doc: 'verification.md',    kind: 'schreibt' },
    ],
    gates: [
      { n: '1', desc: 'Spec freigeben' },
      { n: '2', desc: 'Plan freigeben' },
      { n: '3', desc: 'Belege abnehmen' },
    ],
    shipLabel: 'Und so geht es raus',
    ship: [
      { t: 'Eine Spec, ein Branch, ein PR', d: 'Der Branch ist eine Review-Grenze, keine Parallelität. Einer nach dem anderen, von main, kurzlebig.' },
      { t: 'Ein anderes Modell reviewt den PR', d: 'Nicht die Familie, die den Code geschrieben hat. Automatisch beim Öffnen oder per Kommentar gerufen.' },
      { t: 'Befunde sind Input, keine Befehle', d: 'Übernehmen, was standhält, den Rest mit Begründung im PR ablehnen. Zwei Runden, dann entscheidet ein Mensch.' },
    ],
    note: `Die Artefakte werden neben dem Code committet, im selben Branch —
           <b>so trägt der Diff die Begründung und die Änderung zusammen.</b>`,
  },
};

/* Steps and gates each own their columns, so a gate label can never
   collide with a neighbour. The gates fall after Spec, after Plan and
   after Review — Build has no gate, which is why column 6 is a narrow
   spacer rather than a gate slot. */
const STEP_COLS = [1, 3, 5, 7];
const GATE_COLS = [2, 4, 8];

class Section26 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-4) var(--ae-gutter);
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
          margin: 0 0 var(--ae-space-1);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); font-size: var(--ae-fs-body); }

        ${TAG} .pipe {
          display: grid;
          grid-template-columns: 1fr 96px 1fr 96px 1fr 34px 1fr 96px;
          grid-template-rows: auto 28px auto;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .st {
          grid-row: 1;
          position: relative;
          align-self: end;
          text-align: center;
          padding: 0 var(--ae-space-2) 16px;
        }
        ${TAG} .st::after {
          content: '';
          position: absolute;
          left: 50%; bottom: 0;
          height: 13px;
          border-left: 1.5px solid var(--fg-hair);
        }
        ${TAG} .st h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h4);
          line-height: 1.2;
          color: var(--fg-ink);
        }
        ${TAG} .st p {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }

        ${TAG} .track { grid-row: 2; grid-column: 1 / -1; width: 100%; height: 100%; }
        ${TAG} .nd {
          grid-row: 2;
          align-self: center; justify-self: center;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--fg-green);
          border: 2.5px solid var(--fg-paper);
          box-shadow: 0 0 0 1.5px var(--fg-green);
        }
        ${TAG} .gate {
          grid-row: 2;
          align-self: center; justify-self: center;
          width: 27px; height: 27px;
          border-radius: 50%;
          background: var(--fg-green);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: var(--ae-fs-caption);
          font-weight: 900;
        }
        ${TAG} .gd {
          grid-row: 3;
          padding-top: 9px;
          text-align: center;
          align-self: start;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          color: var(--fg-green);
        }

        ${TAG} .doc {
          grid-row: 3;
          position: relative;
          justify-self: center;
          margin-top: 22px;
          width: min(100%, 26ch);
        }
        ${TAG} .doc::before {
          content: '';
          position: absolute;
          top: -22px; left: 50%;
          height: 22px;
          border-left: 1.5px dashed var(--fg-green);
          opacity: 0.6;
        }
        ${TAG} .doc .card {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          border-radius: var(--ae-radius-md);
          box-shadow: var(--fg-d1);
          padding: var(--ae-space-2) var(--ae-space-3);
          text-align: center;
        }
        ${TAG} .doc .kind {
          font-size: calc(var(--ae-fs-caption) * 0.92);
          line-height: 1.3;
          font-weight: 600;
          color: var(--fg-green);
        }
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.9);
          line-height: 1.3;
          color: var(--fg-ink);
          font-weight: 700;
        }

        ${TAG} .ship .lbl { margin-bottom: var(--ae-space-2); }
        ${TAG} .ship .row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-4);
        }
        ${TAG} .ship h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .ship p {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-body);
        }

        @media (max-width: 1150px) {
          ${TAG} .pipe {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            grid-auto-rows: auto;
            gap: var(--ae-space-3);
          }
          ${TAG} .pipe > * { grid-row: auto !important; grid-column: auto !important; }
          ${TAG} .track, ${TAG} .nd { display: none; }
          ${TAG} .st { text-align: left; padding-bottom: 0; align-self: start; }
          ${TAG} .st::after { display: none; }
          ${TAG} .gate, ${TAG} .gd { justify-self: start; text-align: left; padding-top: 0; }
          ${TAG} .doc { margin-top: 0; justify-self: start; }
          ${TAG} .doc::before { display: none; }
          ${TAG} .ship .row { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="pipe">
          ${t.steps.map((s, i) => `
            <div class="st fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${3 + i}">
              <h3>${s.name}</h3>
              <p>${s.body}</p>
            </div>
          `).join('')}

          <svg class="track fg-wire" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 14 L 100 14" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>

          ${t.steps.map((s, i) => `
            <span class="nd" style="grid-column: ${STEP_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))" aria-hidden="true"></span>
          `).join('')}

          ${t.gates.map((g, i) => `
            <div class="gate fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${7 + i}">${g.n}</div>
            <div class="gd fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${7 + i}">${g.desc}</div>
          `).join('')}

          ${t.steps.map((s, i) => `
            <div class="doc fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${5 + i}">
              <div class="card">
                <div class="kind">${s.kind}</div>
                <div class="file">${s.doc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="ship fg-in" style="--fg-at: 10">
          <p class="fg-label lbl">${t.shipLabel}</p>
          <div class="row">
            ${t.ship.map((s, i) => `
              <div class="fg-in" style="--fg-at: ${10 + i}">
                <h3>${s.t}</h3>
                <p>${s.d}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 12"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section26);
