/* Section 15 — SDD: Wo SDD im Workflow sitzt
   The 5-phase flow from slide 9 reappears, with the artifacts produced
   under Discuss/Plan and the two human gates between phases.
   Resolves the common misconception that Discuss and Plan are one step. */

import { getLang } from '../core/i18n.js';

const TAG = 's15-sdd-workflow';

const CONTENT = {
  en: {
    eyebrow: 'Where SDD lives in your workflow',
    h1: 'Discuss writes the <b>Spec</b>. Plan writes the <b>Plan</b>.',
    lede: `Two steps, two artifacts — not one artifact straddling both.
          A human gate sits between the phases.`,
    phases: [
      { name: 'Explore',  body: 'Agent reads the code, the patterns, the tests.', artifact: null },
      { name: 'Discuss',  body: 'Nail down the open questions.',                  artifact: { file: 'specs/&lt;feature&gt;.md', kind: 'Spec' } },
      { name: 'Plan',     body: 'Plan-Mode reads the spec.',                      artifact: { file: 'plan.md',                  kind: 'Plan' } },
      { name: 'Code',     body: 'Work the tasks. Spec stays in the prompt.',      artifact: null },
      { name: 'Review',   body: 'Every diff, checked against the spec.',          artifact: null },
    ],
    writesPrefix: 'writes · ',
    gate1Label: 'Gate',
    gate1Desc: 'Approve the spec',
    gate2Label: 'Gate',
    gate2Desc: 'Approve the plan',
    loopArrow: 'Code &nbsp;↺&nbsp; Discuss',
    loopText: '<b>When reality drifts</b>, loop back to the discussion — the spec gets updated, not ignored.',
    punch: `Discuss settles the open questions. Plan reads the spec. Code references it.
          Review checks <b>against</b> it.`,
  },
  de: {
    eyebrow: 'Wo SDD im Workflow sitzt',
    h1: 'Discuss schreibt die <b>Spec</b>. Plan schreibt den <b>Plan</b>.',
    lede: `Zwei Schritte, zwei Artefakte — nicht ein Artefakt, das beide überspannt.
          Zwischen den Phasen sitzen menschliche Freigaben.`,
    phases: [
      { name: 'Explore',  body: 'Agent liest Code, Muster, Tests.', artifact: null },
      { name: 'Discuss',  body: 'Offene Fragen klären.',             artifact: { file: 'specs/&lt;feature&gt;.md', kind: 'Spec' } },
      { name: 'Plan',     body: 'Plan-Mode liest die Spec.',          artifact: { file: 'plan.md',                  kind: 'Plan' } },
      { name: 'Code',     body: 'Tasks abarbeiten. Spec im Prompt.',  artifact: null },
      { name: 'Review',   body: 'Jeden Diff gegen die Spec.',         artifact: null },
    ],
    writesPrefix: 'schreibt · ',
    gate1Label: 'Gate',
    gate1Desc: 'Spec freigeben',
    gate2Label: 'Gate',
    gate2Desc: 'Plan freigeben',
    loopArrow: 'Code &nbsp;↺&nbsp; Discuss',
    loopText: '<b>Bei Abweichung</b> zurück zur Diskussion — die Spec wird angepasst, nicht ignoriert.',
    punch: `Discuss klärt offene Fragen. Plan liest die Spec. Code referenziert sie.
          Review prüft <b>gegen</b> sie.`,
  },
};

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
          padding: var(--db-space-5) var(--db-gutter);
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
          animation: sdd15-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: sdd15-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 940px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: sdd15-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .flow {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
          align-items: stretch;
          gap: 0;
        }

        ${TAG} .phase {
          background: var(--db-cool-gray-100);
          border-top: 4px solid var(--db-red);
          padding: var(--db-space-4) var(--db-space-3);
          display: flex;
          flex-direction: column;
          gap: var(--db-space-2);
          opacity: 0;
          transform: translateY(10px);
          animation: sdd15-rise 500ms var(--db-ease) forwards;
          /* animation-delay set inline per phase — :nth-of-type would miss
             because the surrounding .gate/.sep siblings are also <div>. */
        }
        ${TAG} .phase h3 {
          margin: 0;
          font-size: var(--db-fs-h5, var(--db-fs-h4));
          line-height: 1.2;
          color: var(--db-text-strong);
        }
        ${TAG} .phase p {
          margin: 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
        }
        ${TAG} .phase .artifact {
          margin-top: auto;
          padding-top: var(--db-space-2);
          border-top: 1px dashed var(--db-cool-gray-200);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        ${TAG} .phase .artifact .kind {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-red);
        }
        ${TAG} .phase .artifact .file {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          color: var(--db-text-strong);
          font-weight: 700;
          word-break: break-all;
        }

        ${TAG} .sep {
          width: 14px;
          min-height: 100%;
        }
        ${TAG} .gate {
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 6px;
          opacity: 0;
          animation: sdd15-fade 400ms var(--db-ease) 1250ms forwards;
        }
        ${TAG} .gate .label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-red);
          text-align: center;
          line-height: 1.2;
        }
        ${TAG} .gate .icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--db-red);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 900;
        }
        ${TAG} .gate .desc {
          font-size: 9px;
          color: var(--db-text-muted);
          text-align: center;
          line-height: 1.2;
        }
        ${TAG} .gate.g2 { animation-delay: 1400ms; }

        ${TAG} .loop {
          margin-top: var(--db-space-5);
          padding: var(--db-space-3) var(--db-space-5);
          background: var(--db-cool-gray-100);
          border-left: 4px dashed var(--db-cool-gray-400);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
          color: var(--db-text);
          display: flex;
          align-items: center;
          gap: var(--db-space-3);
          opacity: 0;
          animation: sdd15-fade 500ms var(--db-ease) 1600ms forwards;
        }
        ${TAG} .loop .arrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          color: var(--db-cool-gray-400);
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
        }
        ${TAG} .loop b { color: var(--db-text-strong); }

        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: sdd15-fade 600ms var(--db-ease) 1850ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes sdd15-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdd15-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1100px) {
          ${TAG} .flow {
            grid-template-columns: 1fr 1fr;
            gap: var(--db-space-3);
          }
          ${TAG} .gate { width: auto; flex-direction: row; padding: var(--db-space-2); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>
        <p class="lede">
          ${t.lede}
        </p>

        <div class="flow">
          ${PHASES.map((p, i) => {
            const delay = 520 + i * 120;
            const phase = `
              <div class="phase" style="animation-delay: ${delay}ms">
                <h3>${p.name}</h3>
                <p>${p.body}</p>
                ${p.artifact ? `
                  <div class="artifact">
                    <span class="kind">${t.writesPrefix}${p.artifact.kind}</span>
                    <span class="file">${p.artifact.file}</span>
                  </div>
                ` : ''}
              </div>
            `;
            let gate = '';
            if (i === 1) {
              gate = `
                <div class="gate g1">
                  <div class="icon">1</div>
                  <div class="label">${t.gate1Label}</div>
                  <div class="desc">${t.gate1Desc}</div>
                </div>
              `;
            } else if (i === 2) {
              gate = `
                <div class="gate g2">
                  <div class="icon">2</div>
                  <div class="label">${t.gate2Label}</div>
                  <div class="desc">${t.gate2Desc}</div>
                </div>
              `;
            } else if (i < PHASES.length - 1) {
              gate = `<div class="sep"></div>`;
            }
            return phase + gate;
          }).join('')}
        </div>

        <div class="loop">
          <span class="arrow">${t.loopArrow}</span>
          <span>${t.loopText}</span>
        </div>

        <p class="punch">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section15SDD);
