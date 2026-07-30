/* Section 15 — SDD: Wo SDD im Workflow sitzt
   The 5-phase flow from slide 9 reappears — now with full artifact
   symmetry: Discuss writes the Spec, Plan writes Plan + Tasks, Code checks
   the tasks off, Review writes the Verification. Human gates between.

   Redesigned under 0003 v2: an actual pipeline. The phases sit on a drawn
   line; the artifacts hang below it as the documents they are; the gates
   stand on the line with room for their labels (the v1 layout clipped
   them); the drift loop is drawn as a return arc. Words unchanged — the
   artifact kind/file moved from the phase cell into the document card. */

import { getLang } from '../core/i18n.js';

const TAG = 's15-sdd-workflow';

const CONTENT = {
  en: {
    h1: 'Every phase <b>leaves an artifact</b>',
    lede: `Discuss writes the Spec. Plan writes the Plan and the Tasks.
          Code checks the tasks off. Review writes the Proof.
          Between them: human gates.`,
    phases: [
      { name: 'Explore',  body: 'Agent reads the code, the patterns, the tests.', artifact: null },
      { name: 'Discuss',  body: 'Settle the open questions.',                     artifact: { kind: 'writes', file: 'spec.md' } },
      { name: 'Plan',     body: 'Plan mode reads the approved spec.',             artifact: { kind: 'writes', file: 'plan.md · tasks.md' } },
      { name: 'Code',     body: 'Work the tasks in order. Spec stays in the prompt.', artifact: { kind: 'checks off', file: 'tasks.md' } },
      { name: 'Review',   body: 'Every diff checked against the spec — and the evidence written down.', artifact: { kind: 'writes', file: 'verification.md' } },
    ],
    gate1Label: 'Gate',
    gate1Desc: 'Approve the spec',
    gate2Label: 'Gate',
    gate2Desc: 'Approve the plan',
    loopArrow: 'Code &nbsp;↺&nbsp; Discuss',
    loopText: '<b>When reality drifts</b>, loop back to the discussion — the spec gets updated, not ignored.',
  },
  de: {
    h1: 'Jede Phase <b>hinterlässt ein Artefakt</b>',
    lede: `Discuss schreibt die Spec. Plan schreibt Plan und Tasks.
          Code hakt die Tasks ab. Review schreibt den Beweis.
          Dazwischen: menschliche Gates.`,
    phases: [
      { name: 'Explore',  body: 'Agent liest Code, Muster, Tests.',   artifact: null },
      { name: 'Discuss',  body: 'Offene Fragen klären.',              artifact: { kind: 'schreibt', file: 'spec.md' } },
      { name: 'Plan',     body: 'Plan-Mode liest die freigegebene Spec.', artifact: { kind: 'schreibt', file: 'plan.md · tasks.md' } },
      { name: 'Code',     body: 'Tasks der Reihe nach. Spec bleibt im Prompt.', artifact: { kind: 'hakt ab', file: 'tasks.md' } },
      { name: 'Review',   body: 'Jeden Diff gegen die Spec — und die Evidenz festhalten.', artifact: { kind: 'schreibt', file: 'verification.md' } },
    ],
    gate1Label: 'Gate',
    gate1Desc: 'Spec freigeben',
    gate2Label: 'Gate',
    gate2Desc: 'Plan freigeben',
    loopArrow: 'Code &nbsp;↺&nbsp; Discuss',
    loopText: '<b>Bei Abweichung</b> zurück zur Diskussion — die Spec wird angepasst, nicht ignoriert.',
  },
};

/* Grid geography: phases live in the odd 1fr columns, gates in their own
   fixed columns — a gate label can never collide with a neighbour again,
   because the grid reserves its room. Rows: phases / the line / documents. */
const PHASE_COLS = [1, 3, 5, 7, 9];

class Section15SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const PHASES = t.phases;
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
          max-width: 1200px;
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
          max-width: 940px;
          margin: 0 0 var(--ae-space-6);
        }

        ${TAG} .pipe {
          display: grid;
          grid-template-columns: 1fr 14px 1fr 104px 1fr 104px 1fr 14px 1fr;
          grid-template-rows: auto 30px auto;
          margin-bottom: var(--ae-space-5);
        }

        /* Row 1 — the phases, standing on the line via a small tick. */
        ${TAG} .phase {
          grid-row: 1;
          position: relative;
          padding: 0 var(--ae-space-2) 18px;
          align-self: end;
          text-align: center;
        }
        ${TAG} .phase::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          height: 15px;
          border-left: 1.5px solid var(--fg-hair);
        }
        ${TAG} .phase h3 {
          margin: 0 0 var(--ae-space-1, 4px);
          font-size: var(--ae-fs-h5, var(--ae-fs-h4));
          line-height: 1.2;
          color: var(--ae-text-strong);
          font-family: var(--ae-font-head);
        }
        ${TAG} .phase p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
        }

        /* Row 2 — the line itself, its stops, and the gates standing on it. */
        ${TAG} .track {
          grid-row: 2;
          grid-column: 1 / -1;
          width: 100%;
          height: 100%;
        }
        ${TAG} .nd {
          grid-row: 2;
          align-self: center;
          justify-self: center;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: var(--fg-green);
          border: 2.5px solid var(--fg-paper);
          box-shadow: 0 0 0 1.5px var(--fg-green);
        }
        ${TAG} .gate {
          grid-row: 2;
          align-self: center;
          justify-self: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--ae-red);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ae-fs-small);
          font-weight: 900;
        }
        ${TAG} .gdesc {
          grid-row: 3;
          padding-top: 10px;
          text-align: center;
          align-self: start;
        }
        ${TAG} .gdesc .label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--ae-red);
          line-height: 1.2;
        }
        ${TAG} .gdesc .desc {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--ae-text-muted);
        }

        /* Row 3 — the artifacts: documents hanging from the line. The cards
           are the artifacts, so they carry the card depth — and the hover. */
        ${TAG} .doc {
          grid-row: 3;
          position: relative;
          z-index: 1;
          justify-self: center;
          margin-top: 24px;
          width: min(100%, 30ch);
        }
        ${TAG} .doc::before {
          content: '';
          position: absolute;
          top: -24px;
          left: 50%;
          height: 24px;
          border-left: 1.5px dashed var(--fg-green);
          opacity: 0.6;
        }
        ${TAG} .doc .card {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          border-radius: var(--ae-radius-md);
          box-shadow: var(--fg-d1);
          padding: var(--ae-space-3) var(--ae-space-4);
          text-align: center;
        }
        ${TAG} .doc .kind {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
          color: var(--fg-green);
        }
        /* A filename never breaks mid-word: it wraps at the separators or
           not at all, and the size is chosen so the longest one fits. */
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.94);
          line-height: var(--ae-lh-caption);
          color: var(--ae-text-strong);
          font-weight: 700;
        }

        /* The drift loop, drawn: Code returns to Discuss under the line. */
        ${TAG} .arc {
          grid-row: 3;
          grid-column: 1 / -1;
          z-index: 0;
          width: 100%;
          height: clamp(110px, 17vh, 150px);
          align-self: start;
        }
        ${TAG} .arc path { opacity: 0.8; stroke-width: 2; }

        ${TAG} .loop {
          padding: var(--ae-space-3) var(--ae-space-5);
          background: var(--ae-cool-gray-100);
          border-radius: var(--ae-radius-md);
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
        }
        ${TAG} .loop .arrow {
          /* a loop glyph is not code */
          font-family: var(--ae-font);
          color: var(--ae-cool-gray-400);
          font-weight: 700;
          font-size: var(--ae-fs-small);
          white-space: nowrap;
        }
        ${TAG} .loop b { color: var(--ae-text-strong); }

        @media (max-width: 1100px) {
          ${TAG} .pipe {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
            grid-auto-rows: auto;
            gap: var(--ae-space-3);
          }
          ${TAG} .pipe > * { grid-row: auto !important; grid-column: auto !important; }
          ${TAG} .track, ${TAG} .nd, ${TAG} .arc { display: none; }
          ${TAG} .phase { text-align: left; padding-bottom: 0; align-self: start; }
          ${TAG} .phase::after { display: none; }
          ${TAG} .doc { margin-top: 0; justify-self: start; }
          ${TAG} .doc::before { display: none; }
          ${TAG} .gate { display: none; }
          ${TAG} .gdesc { text-align: left; padding-top: 0; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="pipe">
          ${PHASES.map((p, i) => `
            <div class="phase fg-in" style="grid-column: ${PHASE_COLS[i]}; --fg-at: ${3 + i}">
              <h3>${p.name}</h3>
              <p>${p.body}</p>
            </div>
          `).join('')}

          <svg class="track fg-wire" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 15 L 100 15" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>

          ${PHASES.map((p, i) => `
            <span class="nd" style="grid-column: ${PHASE_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))" aria-hidden="true"></span>
          `).join('')}

          <div class="gate fg-in" style="grid-column: 4; --fg-at: 10">1</div>
          <div class="gdesc fg-in" style="grid-column: 4; --fg-at: 10">
            <div class="label">${t.gate1Label}</div>
            <div class="desc">${t.gate1Desc}</div>
          </div>
          <div class="gate fg-in" style="grid-column: 6; --fg-at: 11">2</div>
          <div class="gdesc fg-in" style="grid-column: 6; --fg-at: 11">
            <div class="label">${t.gate2Label}</div>
            <div class="desc">${t.gate2Desc}</div>
          </div>

          ${PHASES.map((p, i) => p.artifact ? `
            <div class="doc fg-in" style="grid-column: ${PHASE_COLS[i]}; --fg-at: ${5 + i}">
              <div class="card">
                <div class="kind">${p.artifact.kind}</div>
                <div class="file">${p.artifact.file}</div>
              </div>
            </div>
          ` : '').join('')}

          <svg class="arc fg-wire" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 894 8 C 860 128, 344 128, 310 22" style="--fg-at: 12; --fg-dur-draw: 900ms"/>
            <polygon points="303,30 310,10 318,29" fill="var(--fg-green)" opacity="0.8"
              style="animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + 12 * var(--fg-beat) + 800ms)"/>
          </svg>
        </div>

        <div class="loop fg-in" style="--fg-at: 12">
          <span class="arrow">${t.loopArrow}</span>
          <span>${t.loopText}</span>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section15SDD);
