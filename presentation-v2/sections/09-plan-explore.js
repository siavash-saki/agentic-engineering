/* Section 10 — Read first.
   The cheapest step and the one most often skipped. Shown as a real
   prompt rather than described, because the instruction is the content:
   name the files, ask for a summary, forbid changes. */

import { getLang } from '../core/i18n.js';

const TAG = 's09-plan-explore';

const CONTENT = {
  en: {
    h1: 'Read before writing',
    lede: `An agent that has not read your code will invent a convention for it.
           Reading is a few seconds. A wrong assumption is the rest of the
           afternoon.`,
    promptLabel: 'A first prompt, before any feature is mentioned',
    prompt: [
      'Read src/api/ and the tests under tests/api/.',
      '',
      'Summarise: how are requests authenticated today, where is',
      'shared middleware registered, and what do the existing tests',
      'assume about request shape?',
      '',
      'Change nothing. I want to agree the picture before we plan.',
    ],
    rulesLabel: 'Three things that make it work',
    rules: [
      { t: 'Name the files', d: 'Do not rely on a search finding the right ones. If you know where it lives, say so.' },
      { t: 'Ask for a summary', d: 'A summary you disagree with is the cheapest correction available.' },
      { t: 'Forbid changes', d: 'Without it the agent will start editing. Reading and writing are separate turns.' },
    ],
    note: `If the summary is wrong, you have found a misunderstanding for the
           price of one message. <b>That is the whole point of the step.</b>`,
  },
  de: {
    h1: 'Erst lesen, dann schreiben',
    lede: `Ein Agent, der deinen Code nicht gelesen hat, erfindet eine Konvention
           dafür. Lesen kostet Sekunden. Eine falsche Annahme kostet den Rest
           des Nachmittags.`,
    promptLabel: 'Ein erster Prompt, bevor ein Feature überhaupt erwähnt wird',
    prompt: [
      'Lies src/api/ und die Tests unter tests/api/.',
      '',
      'Fasse zusammen: Wie werden Requests heute authentifiziert, wo',
      'wird gemeinsame Middleware registriert, und was nehmen die',
      'bestehenden Tests über die Request-Struktur an?',
      '',
      'Ändere nichts. Ich will das Bild klären, bevor wir planen.',
    ],
    rulesLabel: 'Drei Dinge, die es funktionieren lassen',
    rules: [
      { t: 'Dateien benennen', d: 'Nicht darauf verlassen, dass eine Suche die richtigen findet. Wenn du den Ort kennst, nenn ihn.' },
      { t: 'Zusammenfassung verlangen', d: 'Eine Zusammenfassung, der du widersprichst, ist die billigste Korrektur, die es gibt.' },
      { t: 'Änderungen verbieten', d: 'Ohne das fängt der Agent an zu editieren. Lesen und Schreiben sind getrennte Züge.' },
    ],
    note: `Ist die Zusammenfassung falsch, hast du ein Missverständnis für den
           Preis einer Nachricht gefunden. <b>Genau dafür ist der Schritt da.</b>`,
  },
};

class Section10 extends HTMLElement {
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

        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: var(--ae-space-5);
          align-items: start;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .panel { padding: var(--ae-space-4) var(--ae-space-5); }
        ${TAG} .panel .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} pre {
          margin: 0;
          white-space: pre-wrap;
          font-size: calc(var(--ae-fs-small) * 0.94);
          line-height: 1.55;
          color: var(--fg-ink);
        }

        ${TAG} .rules { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .rules .lbl { margin-bottom: 0; }
        ${TAG} .rules .r { display: flex; flex-direction: column; gap: 2px; }
        ${TAG} .rules h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .rules p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="grid">
          <div class="panel fg-card fg-in" style="--fg-at: 3">
            <p class="fg-label lbl">${t.promptLabel}</p>
            <pre class="fg-source">${t.prompt.join('\n')}</pre>
          </div>

          <div class="rules fg-in" style="--fg-at: 4">
            <p class="fg-label lbl">${t.rulesLabel}</p>
            ${t.rules.map((r, i) => `
              <div class="r fg-in" style="--fg-at: ${5 + i}">
                <h3>${r.t}</h3>
                <p>${r.d}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 9"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section10);
