/* Tip 7 — Custom Skills
   Visualization: a slash command types itself at the top, then expands
   into a skill definition with structured steps below. */

import { getLang } from '../core/i18n.js';

const TAG = 's26-tip-skills';

const CONTENT = {
  en: {
    h1: 'Do it twice? Make it a <b>Skill</b>',
    lede: `Capture recurring workflows as a Custom Skill. One command,
          same standard every single time.`,
    cmd: '/pr-review',
    skillLabel: 'Skill<br>definition',
    steps: [
      'Read the <b>git diff</b> of the current branch',
      'Check it against <b>team code style</b> and internal conventions',
      'Flag <b>security</b> and logging red flags',
      'Drop structured <b>review notes</b> as a PR comment',
    ],
  },
  de: {
    h1: 'Zweimal getan? Mach einen <b>Skill</b> draus',
    lede: `Wiederkehrende Workflows als Custom Skill speichern. Ein Befehl,
          jedes Mal derselbe Standard.`,
    cmd: '/pr-review',
    skillLabel: 'Skill-<br>Definition',
    steps: [
      'Lies den <b>Git-Diff</b> der aktuellen Branch',
      'Prüfe gegen <b>Team-Codestyle</b> und interne Conventions',
      'Markiere <b>Sicherheits-</b> und Logging-Auffälligkeiten',
      'Schreibe strukturierte <b>Review-Notes</b> als PR-Kommentar',
    ],
  },
};

class SectionTip07 extends HTMLElement {
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
          max-width: 820px;
          margin: 0 0 var(--ae-space-5);
        }

        ${TAG} .terminal {
          font-family: var(--ae-font-mono);
          background: #1c1f24;
          color: #e6e8eb;
          border-radius: var(--ae-radius);
          padding: var(--ae-space-3) var(--ae-space-4);
          font-size: 15px;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--fg-d2);
        }
        ${TAG} .terminal .prompt { color: #9AA4B0; }
        ${TAG} .terminal .cmd {
          /* the accent on a near-black terminal, not the on-paper accent */
          color: var(--fg-green-light);
          font-weight: 700;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          animation: tip07-type 600ms steps(10, end) 500ms forwards;
        }
        ${TAG} .terminal .caret {
          display: inline-block;
          width: 9px;
          height: 18px;
          background: #e6e8eb;
          animation: tip07-blink 800ms steps(2, end) infinite;
          margin-left: 2px;
        }

        ${TAG} .expand {
          margin-top: var(--ae-space-4);
          background: var(--ae-cool-gray-100);
          border-radius: 0 var(--ae-radius) var(--ae-radius) 0;
          padding: var(--ae-space-4) var(--ae-space-5);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--ae-space-3) var(--ae-space-5);
          opacity: 0;
          transform: translateY(-8px);
          animation: tip07-unfold 450ms var(--ae-ease) 1050ms forwards;
        }
        ${TAG} .expand .skill-label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
          padding-top: 4px;
        }
        ${TAG} .expand ol {
          margin: 0;
          padding: 0;
          list-style: none;
          counter-reset: step;
          display: grid;
          gap: 8px;
        }
        ${TAG} .expand li {
          counter-increment: step;
          padding-left: 32px;
          position: relative;
          font-size: var(--ae-fs-body);
          line-height: 1.45;
          color: var(--ae-text);
          opacity: 0;
        }
        ${TAG} .expand li::before {
          content: counter(step);
          position: absolute;
          left: 0; top: 1px;
          width: 22px; height: 22px;
          background: var(--ae-red);
          color: #fff;
          border-radius: 50%;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ${TAG} .expand li:nth-child(1) { animation: tip07-pop 350ms var(--ae-ease) 1200ms forwards; }
        ${TAG} .expand li:nth-child(2) { animation: tip07-pop 350ms var(--ae-ease) 1300ms forwards; }
        ${TAG} .expand li:nth-child(3) { animation: tip07-pop 350ms var(--ae-ease) 1400ms forwards; }
        ${TAG} .expand li:nth-child(4) { animation: tip07-pop 350ms var(--ae-ease) 1500ms forwards; }
        ${TAG} .expand li b { color: var(--ae-red); font-weight: 700; }

        @keyframes tip07-type {
          to { width: 10ch; }
        }
        @keyframes tip07-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes tip07-unfold {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip07-pop {
          to { opacity: 1; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">7</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="terminal fg-source fg-in" style="--fg-at: 3">
          <span class="prompt">›</span>
          <span class="cmd">${t.cmd}</span>
          <span class="caret"></span>
        </div>

        <div class="expand">
          <div class="skill-label">${t.skillLabel}</div>
          <ol>
            ${t.steps.map(step => `<li>${step}</li>`).join('\n            ')}
          </ol>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip07);
