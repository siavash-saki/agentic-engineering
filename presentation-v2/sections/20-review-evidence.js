/* Section 21 — What a pass may claim.
   Three rules, each written from a false pass. They are the difference
   between a verification that records something and one that certifies
   whatever happened. */

import { getLang } from '../core/i18n.js';

const TAG = 's20-review-evidence';

const CONTENT = {
  en: {
    h1: 'Three rules for what a pass may claim',
    lede: `An agent asked to produce a verification will produce one. Whether it
           says anything depends on rules it cannot talk itself out of.`,
    rules: [
      {
        n: '1',
        t: 'A criterion with two halves needs evidence for both',
        d: 'If the criterion says "an X and a Y each …", a row that evidences only X is not a pass. This is the most common false pass, because the row reads as complete.',
      },
      {
        n: '2',
        t: 'A hedged row is not a pass',
        d: '"Covered by code review." "Correct by construction." "No live test was performed." These are precise statements about the absence of evidence. They are not verdicts.',
      },
      {
        n: '3',
        t: 'An untested branch is not verified',
        d: 'However convincing the tested branch looks, and however carefully the code was read. The error path is where the defects are, and it is the path nobody drives.',
      },
    ],
    note: `A record that says <b>not verified</b> truthfully is worth more than
           one that says <b>pass</b> convincingly. The first tells you where to
           look; the second tells you nothing and feels better.`,
  },
  de: {
    h1: 'Drei Regeln dafür, was ein Pass behaupten darf',
    lede: `Ein Agent, der eine Verifikation erstellen soll, erstellt eine. Ob sie
           etwas aussagt, hängt an Regeln, um die er sich nicht herumreden kann.`,
    rules: [
      {
        n: '1',
        t: 'Ein zweiteiliges Kriterium braucht Belege für beide Teile',
        d: 'Heißt das Kriterium „ein X und ein Y jeweils …", ist eine Zeile mit Beleg nur für X kein Pass. Das ist der häufigste falsche Pass, weil die Zeile vollständig aussieht.',
      },
      {
        n: '2',
        t: 'Eine relativierte Zeile ist kein Pass',
        d: '„Durch Code-Review abgedeckt." „Konstruktionsbedingt korrekt." „Kein Live-Test durchgeführt." Das sind präzise Aussagen über fehlende Belege. Urteile sind es nicht.',
      },
      {
        n: '3',
        t: 'Ein ungetesteter Zweig ist nicht geprüft',
        d: 'Egal wie überzeugend der getestete Zweig aussieht und wie sorgfältig der Code gelesen wurde. Im Fehlerpfad sitzen die Defekte, und er ist der Pfad, den niemand fährt.',
      },
    ],
    note: `Ein Protokoll, das wahrheitsgemäß <b>nicht geprüft</b> sagt, ist mehr
           wert als eines, das überzeugend <b>bestanden</b> sagt. Das erste sagt,
           wo man nachsehen muss; das zweite sagt nichts und fühlt sich besser an.`,
  },
};

class Section21 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-6); }

        ${TAG} .rules {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ae-space-5);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .r { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .r .head { display: flex; align-items: flex-start; gap: var(--ae-space-3); }
        ${TAG} .r h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .r p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        @media (max-width: 1000px) {
          ${TAG} .rules { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="rules">
          ${t.rules.map((r, i) => `
            <div class="r fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="fg-badge">${r.n}</span>
                <h3 class="fg-hover-title">${r.t}</h3>
              </div>
              <p>${r.d}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 7"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section21);
