/* Section 2 — The hook.
   The whole talk in one example. Same model, same data, same afternoon;
   the difference is what happened before the code was written. No
   vocabulary is introduced here on purpose — the words come later. */

import { getLang } from '../core/i18n.js';

const TAG = 's02-hook';

const CONTENT = {
  en: {
    h1: 'Two prompts',
    lede: `Same model. Same data. Same afternoon. One of these produces a
           dashboard you throw away.`,
    left: {
      label: 'Prompt A',
      prompt: 'Here is the data. Build me a dashboard.',
      outLabel: 'What happens',
      out: 'The agent picks the charts, the metrics and the colours. All of it is a guess, and all of it looks finished.',
      verdict: 'Vibe coding',
    },
    right: {
      label: 'Prompt B',
      prompt: 'Here is the data. Before you build anything: what should be in this dashboard? What makes sense to show? What should the colours be? Ask me until you know.',
      outLabel: 'What happens',
      steps: [
        'It asks. You answer.',
        'The answers go in a markdown file.',
        'It builds from the file.',
        'You check it against the file.',
      ],
      verdict: 'Agentic engineering',
    },
    note: `The second one is not more work because it is more formal. It is more
           work because <b>the decisions were made by a person</b> instead of by a model
           filling in a blank.`,
  },
  de: {
    h1: 'Zwei Prompts',
    lede: `Gleiches Modell. Gleiche Daten. Gleicher Nachmittag. Einer davon
           produziert ein Dashboard, das man wegwirft.`,
    left: {
      label: 'Prompt A',
      prompt: 'Hier sind die Daten. Bau mir ein Dashboard.',
      outLabel: 'Was passiert',
      out: 'Der Agent wählt Diagramme, Kennzahlen und Farben. Alles davon ist geraten, und alles davon sieht fertig aus.',
      verdict: 'Vibe Coding',
    },
    right: {
      label: 'Prompt B',
      prompt: 'Hier sind die Daten. Bevor du etwas baust: Was gehört in dieses Dashboard? Was ist sinnvoll darzustellen? Welche Farben? Frag mich, bis du es weißt.',
      outLabel: 'Was passiert',
      steps: [
        'Er fragt. Du antwortest.',
        'Die Antworten kommen in eine Markdown-Datei.',
        'Er baut aus der Datei.',
        'Du prüfst gegen die Datei.',
      ],
      verdict: 'Agentic Engineering',
    },
    note: `Der zweite Weg ist nicht aufwendiger, weil er formeller ist. Er ist
           aufwendiger, weil <b>die Entscheidungen von einem Menschen kommen</b> und nicht
           von einem Modell, das eine Lücke füllt.`,
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

        ${TAG} .pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          align-items: stretch;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .col {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-4);
        }
        ${TAG} .prompt {
          font-size: calc(var(--ae-fs-small) * 0.96);
          line-height: 1.45;
          color: var(--fg-ink);
          background: var(--ae-cool-gray-100);
          border-radius: var(--ae-radius);
          padding: var(--ae-space-3) var(--ae-space-4);
        }
        ${TAG} .fg-card--answer .prompt {
          background: var(--fg-mint);
          color: var(--fg-green-d);
        }
        ${TAG} .out {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
          margin: 0;
        }
        ${TAG} ol.steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-2);
        }
        ${TAG} ol.steps li {
          display: flex;
          gap: var(--ae-space-3);
          align-items: baseline;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} ol.steps .fg-badge { font-size: 0.8em; }

        ${TAG} .verdict {
          margin-top: auto;
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h5);
          line-height: 1.2;
          font-weight: 600;
          color: var(--fg-muted);
        }
        ${TAG} .fg-card--answer .verdict { color: var(--fg-green-d); font-weight: 700; }

        @media (max-width: 960px) {
          ${TAG} .pair { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="pair">
          <div class="fg-card fg-hover col fg-in" style="--fg-at: 3">
            <p class="fg-label">${t.left.label}</p>
            <p class="prompt fg-source">${t.left.prompt}</p>
            <p class="fg-label">${t.left.outLabel}</p>
            <p class="out">${t.left.out}</p>
            <p class="verdict">${t.left.verdict}</p>
          </div>

          <div class="fg-card fg-card--answer fg-hover col fg-in" style="--fg-at: 5">
            <p class="fg-label">${t.right.label}</p>
            <p class="prompt fg-source">${t.right.prompt}</p>
            <p class="fg-label">${t.right.outLabel}</p>
            <ol class="steps">
              ${t.right.steps.map((s, i) => `
                <li><span class="fg-badge">${i + 1}</span><span>${s}</span></li>
              `).join('')}
            </ol>
            <p class="verdict">${t.right.verdict}</p>
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section02);
