import { getLang } from '../core/i18n.js';

/* Section 2 — Vertrauen / Carwash
   Konkretes Beispiel: zwei AIs scheitern an derselben Frage.
   Take-away: jeden Output reviewen. */

const TAG = 's02-trust';

const CONTENT = {
  en: {
    eyebrow: 'Trust is good, control is everything',
    h1: `Blindly trusting AI today simply <b>doesn't work</b>`,
    question: `"I want to drive to a car wash to clean my car. It's only
          <b>50 meters away</b>. Should I take the car or walk?"`,
    labelChatgpt: 'ChatGPT',
    labelClaude: 'Claude',
    altChatgpt: 'ChatGPT recommends walking',
    altClaude: 'Claude recommends walking',
    punch: `Both tell you to <b>walk</b>. Both missed that a car wash washes
          <b>cars</b> — leave the car at home and there's nothing to wash. Looks
          plausible, sounds convincing, dead <b>wrong</b>.`,
    takeaway: `Today we <b>can't trust AI blindly</b>. Tomorrow, who knows —
          but today the rule is simple: <b>review every output</b>.`,
  },
  de: {
    eyebrow: 'Vertrauen ist gut, Kontrolle ist alles',
    h1: `AI heute blind vertrauen funktioniert <b>nicht</b>`,
    question: `„Ich möchte zu einer Waschanlage, um mein Auto zu waschen. Sie ist nur
          <b>50 Meter entfernt</b>. Soll ich mit dem Auto fahren oder zu Fuß gehen?"`,
    labelChatgpt: 'ChatGPT',
    labelClaude: 'Claude',
    altChatgpt: 'ChatGPT empfiehlt zu Fuß zu gehen',
    altClaude: 'Claude empfiehlt zu Fuß zu gehen',
    punch: `Beide empfehlen, <b>zu Fuß</b> zu gehen. Beide haben übersehen, dass eine
          Waschanlage <b>Autos</b> wäscht — wer den Wagen zu Hause lässt, hat am
          Carwash nichts zu waschen. Sieht plausibel aus, klingt überzeugend, ist <b>falsch</b>.`,
    takeaway: `Heute können wir KI <b>nicht blind vertrauen</b>. Was morgen ist, wissen wir nicht —
          aber heute heißt es: <b>jeden Output reviewen</b>.`,
  },
};

class Section02 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
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
          animation: s02-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s02-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        ${TAG} .question {
          background: var(--db-cool-gray-100);
          border-left: 4px solid var(--db-red);
          padding: var(--db-space-3) var(--db-space-4);
          margin: 0 0 var(--db-space-5);
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          font-style: italic;
          color: var(--db-text-strong);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
          opacity: 0;
          animation: s02-fade 600ms var(--db-ease) 340ms forwards;
        }
        ${TAG} .question b { color: var(--db-red); font-style: normal; font-weight: 700; }

        ${TAG} .shots {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--db-space-4);
          margin: 0 0 var(--db-space-5);
        }
        ${TAG} .shot {
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(12px);
          animation: s02-rise 600ms var(--db-ease) forwards;
        }
        ${TAG} .shot:nth-child(1) { animation-delay: 500ms; }
        ${TAG} .shot:nth-child(2) { animation-delay: 650ms; }
        ${TAG} .shot .label {
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          margin-bottom: 6px;
        }
        ${TAG} .shot img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--db-radius);
          box-shadow: var(--db-shadow-md);
        }

        ${TAG} .punch {
          background: var(--db-cool-gray-100);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-3) var(--db-space-4);
          margin: 0 0 var(--db-space-4);
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          opacity: 0;
          animation: s02-fade 600ms var(--db-ease) 850ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        ${TAG} .takeaway {
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          font-weight: 700;
          color: var(--db-text-strong);
          margin: 0;
          text-align: center;
          opacity: 0;
          animation: s02-fade 600ms var(--db-ease) 1050ms forwards;
        }
        ${TAG} .takeaway b { color: var(--db-red); }

        @keyframes s02-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s02-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          ${TAG} .shots { grid-template-columns: 1fr; }
          ${TAG} h1 { font-size: var(--db-fs-h3); line-height: var(--db-lh-h3); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>

        <p class="question">
          ${t.question}
        </p>

        <div class="shots">
          <div class="shot">
            <div class="label">${t.labelChatgpt}</div>
            <img src="assets/carwash-chatgpt.png" alt="${t.altChatgpt}">
          </div>
          <div class="shot">
            <div class="label">${t.labelClaude}</div>
            <img src="assets/carwash-claude.png" alt="${t.altClaude}">
          </div>
        </div>

        <p class="punch">
          ${t.punch}
        </p>

        <p class="takeaway">
          ${t.takeaway}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section02);
