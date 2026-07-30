/* Section 10 — SDD chapter opener: the four artifacts
   Merges the old metaphor cards and the artifact table into one slide.
   Lead with the memorable image — Contract · Build Plan · Checklist · Proof. */

import { getLang } from '../core/i18n.js';

const TAG = 's10-sdd-artifacts';

const CONTENT = {
  en: {
    h1: 'Spec, Plan, Tasks, Verification — <b>four layers</b>',
    lede: `When the agent builds the wrong thing, it's rarely the model — it's
          the briefing. The mature SDD toolchains all converged on the same
          four-layer split.`,
    cards: [
      {
        artifact: 'Spec',
        metaphor: 'Contract',
        file:     'sdd/&lt;feature&gt;/spec.md',
        answers:  'What should the system do?',
        body:     'Behavior, acceptance criteria, out of scope. No implementation.',
      },
      {
        artifact: 'Plan',
        metaphor: 'Build Plan',
        file:     'plan.md',
        answers:  'How do we build it?',
        body:     'Approach, architecture, sequence, risks.',
      },
      {
        artifact: 'Tasks',
        metaphor: 'Checklist',
        file:     'tasks.md',
        answers:  'In what order, concretely?',
        body:     'Flat, checkable. One task ≈ one commit.',
      },
      {
        artifact: 'Verification',
        metaphor: 'Proof',
        file:     'verification.md',
        answers:  'Did it meet the contract?',
        body:     'Evidence per acceptance criterion — written at the end, never skipped.',
      },
    ],
    punch: 'Spec = <b>Contract</b> · Plan = <b>Build Plan</b> · Tasks = <b>Checklist</b> · Verification = <b>Proof</b>',
  },
  de: {
    h1: 'Spec, Plan, Tasks, Verification — <b>vier Ebenen</b>',
    lede: `Baut der Agent das Falsche, liegt es selten am Modell — sondern am
          Briefing. Die reifen SDD-Toolchains sind alle bei derselben Trennung
          in vier Ebenen gelandet.`,
    cards: [
      {
        artifact: 'Spec',
        metaphor: 'Vertrag',
        file:     'sdd/&lt;feature&gt;/spec.md',
        answers:  'Was soll das System tun?',
        body:     'Verhalten, Akzeptanzkriterien, Out of Scope. Keine Implementierung.',
      },
      {
        artifact: 'Plan',
        metaphor: 'Bauplan',
        file:     'plan.md',
        answers:  'Wie bauen wir es?',
        body:     'Ansatz, Architektur, Reihenfolge, Risiken.',
      },
      {
        artifact: 'Tasks',
        metaphor: 'Checkliste',
        file:     'tasks.md',
        answers:  'In welcher Reihenfolge, konkret?',
        body:     'Flach, abhakbar. Eine Task ≈ ein Commit.',
      },
      {
        artifact: 'Verification',
        metaphor: 'Beweis',
        file:     'verification.md',
        answers:  'Erfüllt es den Vertrag?',
        body:     'Evidenz pro Akzeptanzkriterium — am Ende geschrieben, nie übersprungen.',
      },
    ],
    punch: 'Spec = <b>Vertrag</b> · Plan = <b>Bauplan</b> · Tasks = <b>Checkliste</b> · Verification = <b>Beweis</b>',
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
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1240px;
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
          margin: 0 0 var(--ae-space-5);
        }

        /* ── The four LAYERS, drawn as layers: a stepped stack joined by a
           spine on the left. Each layer sits under and inside the one above
           it, which is the whole idea of the split. The old 4px accent bar
           on top of each card is gone — 0002 forbade it and it slipped
           through that sweep. ── */
        ${TAG} .stack { position: relative; }
        ${TAG} .stack .spine {
          position: absolute;
          left: 10px;
          top: 8px;
          bottom: 8px;
          height: auto;
          width: 2px;
        }
        ${TAG} .stack .spine .bar {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--ae-red);
          opacity: 0.4;
          transform-origin: top center;
          animation: fg-extend var(--fg-dur-draw) var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
          transform: scaleY(1);
        }
        @keyframes ${TAG}-spine { from { transform: scaleY(0); } }
        ${TAG} .stack .spine .bar { animation-name: ${TAG}-spine; }

        ${TAG} .layer {
          display: grid;
          grid-template-columns: minmax(230px, auto) 1fr auto;
          gap: var(--ae-space-5);
          align-items: center;
          padding: var(--ae-space-3) var(--ae-space-5);
          margin-bottom: var(--ae-space-2);
        }
        ${TAG} .layer:nth-child(2) { margin-left: 34px; }
        ${TAG} .layer:nth-child(3) { margin-left: 68px; }
        ${TAG} .layer:nth-child(4) { margin-left: 102px; }
        ${TAG} .layer:nth-child(5) { margin-left: 136px; }

        ${TAG} .artifact {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--ae-red);
        }
        ${TAG} .metaphor {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: 1.05;
          font-weight: 700;
          color: var(--ae-text-strong);
        }
        ${TAG} .file {
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.94);
          color: var(--ae-text-muted);
          background: var(--ae-bg);
          padding: 4px 10px;
          border-radius: 4px;
          justify-self: end;
          white-space: nowrap;
        }
        ${TAG} .answers {
          margin: 0 0 2px;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          font-style: italic;
          color: var(--ae-text);
        }
        ${TAG} .body {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text);
        }

        ${TAG} .punch {
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--ae-text-strong);
          text-align: center;
        }
        ${TAG} .punch b { color: var(--ae-red); }

        @media (max-width: 1100px) {
          ${TAG} .layer { margin-left: 0 !important; grid-template-columns: 1fr; gap: var(--ae-space-2); }
          ${TAG} .file { justify-self: start; }
          ${TAG} .stack .spine { display: none; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="stack">
          <span class="spine" aria-hidden="true"><span class="bar"></span></span>
          ${t.cards.map((c, i) => `
            <div class="layer fg-card fg-hover fg-in" style="--fg-at: ${4 + i * 2}">
              <div>
                <div class="artifact">${c.artifact}</div>
                <h2 class="metaphor fg-hover-title">${c.metaphor}</h2>
              </div>
              <div>
                <p class="answers">${c.answers}</p>
                <p class="body">${c.body}</p>
              </div>
              <code class="file">${c.file}</code>
            </div>
          `).join('')}
        </div>

        <p class="punch fg-in" style="--fg-at: 12">
          ${t.punch}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section10SDD);
