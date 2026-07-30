/* Tip 1 — Make the agent ask
   Merges the old "interrogate before coding" and "let it interview you"
   tips: same discipline, two directions. Chat visualization shows the
   understood/open split; the flip box shows the reversed direction. */

import { getLang } from '../core/i18n.js';

const TAG = 's20-tip-ask';

const CONTENT = {
  en: {
    h1: 'Make the agent <b>ask</b>',
    lede: `"What did you understand? What's still open?" — hallucinations
          surface in the answer, not later in the diff.`,
    userMsg: 'Implement the login API.',
    agentLabel: 'Before I start …',
    goodTitle: 'Understood',
    goodItems: [
      'JWT tokens for authentication',
      'Endpoint <code>/api/login</code>',
      'Existing user table',
    ],
    openTitle: 'Open',
    openItems: [
      'SSO or local passwords?',
      'Refresh-token strategy?',
      'Rate limiting needed?',
    ],
    flipLabel: 'Or flip it entirely',
    flipText: `"Interview me until the spec is complete." You know what you
          want — the agent knows what's missing.`,
  },
  de: {
    h1: 'Lass den Agenten <b>fragen</b>',
    lede: `„Was hast du verstanden? Was ist noch offen?" — Halluzinationen
          zeigen sich in der Antwort, nicht erst im Diff.`,
    userMsg: 'Implementiere die Login-API.',
    agentLabel: 'Bevor ich loslege …',
    goodTitle: 'Verstanden',
    goodItems: [
      'JWT-Token für Authentifizierung',
      'Endpoint <code>/api/login</code>',
      'Bestehende User-Tabelle',
    ],
    openTitle: 'Offen',
    openItems: [
      'SSO oder lokale Passwörter?',
      'Refresh-Token-Strategie?',
      'Rate Limiting nötig?',
    ],
    flipLabel: 'Oder dreh es ganz um',
    flipText: `„Interviewe mich, bis die Spec vollständig ist." Du weißt, was du
          willst — der Agent weiß, was noch fehlt.`,
  },
};

class SectionTip01 extends HTMLElement {
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

        ${TAG} .chat {
          display: grid;
          gap: var(--ae-space-3);
          margin-bottom: var(--ae-space-4);
        }
        ${TAG} .msg {
          padding: var(--ae-space-3) var(--ae-space-4);
          border-radius: 14px;
          max-width: 520px;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
        }
        ${TAG} .msg.user {
          justify-self: end;
          background: var(--ae-red);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        ${TAG} .agentslot {
          position: relative;
          justify-self: start;
        }
        ${TAG} .msg.agent {
          background: var(--ae-cool-gray-100);
          color: var(--ae-text-strong);
          border-bottom-left-radius: 4px;
          max-width: 760px;
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        /* The agent thinks before it answers: three dots pulse where the
           reply will land, then hand over to it. Base state is gone-and-
           silent, so print and reduced motion never show a thinking bubble.
           It sits OUTSIDE the (still hidden) reply, or the reply's own
           entrance would hide the thinking too. */
        ${TAG} .typing {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          gap: 5px;
          padding: var(--ae-space-3) var(--ae-space-4);
          background: var(--ae-cool-gray-100);
          border-radius: 14px 14px 14px 4px;
          opacity: 0;
          animation: ${TAG}-think 1000ms var(--ae-ease) calc(60ms + 4 * var(--fg-beat)) both;
        }
        ${TAG} .typing i {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--ae-cool-gray-400);
          animation: ${TAG}-dot 900ms ease-in-out infinite;
        }
        ${TAG} .typing i:nth-child(2) { animation-delay: 150ms; }
        ${TAG} .typing i:nth-child(3) { animation-delay: 300ms; }
        @keyframes ${TAG}-think {
          0%, 10% { opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes ${TAG}-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        ${TAG} .agent-label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
          margin-bottom: var(--ae-space-2);
        }
        ${TAG} .agent-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ae-space-4);
        }
        ${TAG} .col-title {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 0 0 var(--ae-space-2);
        }
        ${TAG} .col-title.good { color: #137333; }
        ${TAG} .col-title.open { color: var(--ae-red); }
        ${TAG} .col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 6px;
        }
        ${TAG} .col li {
          position: relative;
          padding-left: 22px;
          font-size: var(--ae-fs-small);
          line-height: 1.45;
          color: var(--ae-text);
        }
        ${TAG} .col.good li::before {
          content: "✓";
          position: absolute;
          left: 0; top: 0;
          color: #137333;
          font-weight: 700;
        }
        ${TAG} .col.open li::before {
          content: "?";
          position: absolute;
          left: 4px; top: 0;
          color: var(--ae-red);
          font-weight: 900;
        }

        ${TAG} .flip {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--ae-space-4);
          align-items: baseline;
          padding: var(--ae-space-3) var(--ae-space-4);
          border: 1.5px dashed var(--ae-cool-gray-400);
          border-radius: var(--ae-radius);
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
        }
        ${TAG} .flip .label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-red);
          white-space: nowrap;
        }

        @media (max-width: 860px) {
          ${TAG} .agent-cols { grid-template-columns: 1fr; }
          ${TAG} .flip { grid-template-columns: 1fr; gap: 6px; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">1</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="chat">
          <div class="msg user fg-in" style="--fg-at: 3">${t.userMsg}</div>
          <div class="agentslot">
            <span class="typing" aria-hidden="true"><i></i><i></i><i></i></span>
            <div class="msg agent fg-in" style="--fg-at: 12">
            <div class="agent-label">${t.agentLabel}</div>
            <div class="agent-cols">
              <div class="col good">
                <div class="col-title good">${t.goodTitle}</div>
                <ul>
                  ${t.goodItems.map((it, i) => `<li class="fg-in" style="--fg-at: ${7 + i}">${it}</li>`).join('')}
                </ul>
              </div>
              <div class="col open">
                <div class="col-title open">${t.openTitle}</div>
                <ul>
                  ${t.openItems.map((it, i) => `<li class="fg-in" style="--fg-at: ${8 + i}">${it}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div class="flip fg-in" style="--fg-at: 12">
          <span class="label">${t.flipLabel}</span>
          <span>${t.flipText}</span>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip01);
