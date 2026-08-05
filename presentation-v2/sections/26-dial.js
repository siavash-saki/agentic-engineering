/* Section 25 — The dial.
   The slide that stops the method being heard as "four files per
   feature". One rule, three settings, and the rule generates the
   settings rather than the other way round. */

import { getLang } from '../core/i18n.js';

const TAG = 's26-dial';

const CONTENT = {
  en: {
    h1: 'Spend where being wrong is <span class="fg-mark fg-mark--sweep">expensive and hard to see</span>',
    lede: `The loop does not change. How much of it you write down does. Two
           factors decide it, and neither of them is how important the project
           feels.`,
    factorsLabel: 'The two factors',
    factors: [
      { t: 'What does being wrong cost?', d: 'A wrong colour is a shrug. A wrong tax calculation is a letter from a regulator.' },
      { t: 'How long until you notice?', d: 'A crash announces itself. A silently wrong number does not, and it is still wrong a year later.' },
    ],
    settingsLabel: 'Three settings',
    settings: [
      { t: 'A paragraph', d: 'Prototypes, throwaway scripts, personal tools, anything you would delete without regret.', w: 'A few sentences in the prompt. No file. Read the diff.' },
      { t: 'A file', d: 'Features in a shared codebase. Anything another person will have to maintain or extend.', w: 'One markdown file, agreed before Build. A second model reads the diff.' },
      { t: 'Several files', d: 'Published contracts, data correctness, money, access control, anything with a compliance shape.', w: 'What the plan holds, split up. Criteria checked one at a time, with evidence recorded.' },
    ],
    note: `Applying the last setting to the first kind of work is how this method
           gets a reputation for being slow. <b>It is a dial, and the default
           position is the middle one.</b>`,
  },
  de: {
    h1: 'Aufwand dort, wo Irrtum <span class="fg-mark fg-mark--sweep">teuer und schlecht sichtbar</span> ist',
    lede: `Der Loop bleibt gleich. Wie viel davon aufgeschrieben wird, nicht.
           Zwei Faktoren entscheiden das, und keiner davon ist, wie wichtig sich
           das Projekt anfühlt.`,
    factorsLabel: 'Die zwei Faktoren',
    factors: [
      { t: 'Was kostet ein Irrtum?', d: 'Eine falsche Farbe ist ein Achselzucken. Eine falsche Steuerberechnung ist ein Brief von der Aufsicht.' },
      { t: 'Wie lange bis es auffällt?', d: 'Ein Absturz meldet sich. Eine still falsche Zahl nicht, und sie ist ein Jahr später immer noch falsch.' },
    ],
    settingsLabel: 'Drei Stufen',
    settings: [
      { t: 'Ein Absatz', d: 'Prototypen, Wegwerf-Skripte, eigene Werkzeuge, alles, was man ohne Bedauern löscht.', w: 'Ein paar Sätze im Prompt. Keine Datei. Den Diff lesen.' },
      { t: 'Eine Datei', d: 'Features in einer gemeinsamen Codebasis. Alles, was ein anderer Mensch pflegen oder erweitern muss.', w: 'Eine Markdown-Datei, freigegeben vor Build. Ein zweites Modell liest den Diff.' },
      { t: 'Mehrere Dateien', d: 'Veröffentlichte Schnittstellen, Datenkorrektheit, Geld, Zugriffsrechte, alles mit Compliance-Charakter.', w: 'Der Inhalt des Plans, aufgeteilt. Kriterien einzeln geprüft, Belege festgehalten.' },
    ],
    note: `Die letzte Stufe auf die erste Art Arbeit anzuwenden ist der Grund,
           warum diese Methode als langsam gilt. <b>Es ist ein Regler, und die
           Standardstellung ist die mittlere.</b>`,
  },
};

class Section25 extends HTMLElement {
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
        ${TAG} .lbl { margin-bottom: var(--ae-space-3); }

        ${TAG} .factors {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-6);
        }
        ${TAG} .factors h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-green-d);
        }
        ${TAG} .factors p { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }

        ${TAG} .settings {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-4);
          position: relative;
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .settings .thread { position: absolute; left: 0; right: 0; top: 42%; height: 2px; }
        ${TAG} .s { position: relative; display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .s h3 { margin: 0; font-size: var(--ae-fs-h4); line-height: var(--ae-lh-h4); color: var(--fg-ink); }
        ${TAG} .s .d { margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small); color: var(--fg-body); }
        ${TAG} .s .w {
          margin: auto 0 0;
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-green-d);
          font-weight: 500;
        }

        @media (max-width: 1000px) {
          ${TAG} .factors, ${TAG} .settings { grid-template-columns: 1fr; }
          ${TAG} .settings .thread { display: none; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <p class="fg-label lbl fg-in" style="--fg-at: 3">${t.factorsLabel}</p>
        <div class="factors">
          ${t.factors.map((f, i) => `
            <div class="fg-in" style="--fg-at: ${3 + i}">
              <h3>${f.t}</h3>
              <p>${f.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-label lbl fg-in" style="--fg-at: 5">${t.settingsLabel}</p>
        <div class="settings">
          <svg class="thread fg-wire" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 1 L 100 1" style="--fg-at: 5; --fg-dur-draw: 1100ms"/>
          </svg>
          ${t.settings.map((s, i) => `
            <div class="s fg-card ${i === 1 ? 'fg-card--answer' : ''} fg-hover fg-in" style="--fg-at: ${6 + i}">
              <h3 class="${i === 1 ? '' : 'fg-hover-title'}">${s.t}</h3>
              <p class="d">${s.d}</p>
              <p class="w">${s.w}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section25);
