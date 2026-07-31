/* Section 13 — Four failures.
   Each one produces a document that looks like a plan and does not work
   as one. Named so they can be recognised in a review, which is the only
   place they show up. */

import { getLang } from '../core/i18n.js';

const TAG = 's12-plan-traps';

const CONTENT = {
  en: {
    h1: 'Four ways a plan fails',
    lede: `All four produce a file that looks correct. Three of them are found
           only at review, and the fourth is never found at all.`,
    traps: [
      { n: '1', t: 'Written afterwards',
        d: 'The code came first, the plan was written to match it.',
        why: 'That is documentation. The agent built with no constraint, and the file now certifies whatever it did.' },
      { n: '2', t: 'Written as pseudo-code',
        d: 'The plan names functions, files and data structures.',
        why: 'It has locked in decisions the model would have made better, and there is nothing left to check the result against.' },
      { n: '3', t: 'No acceptance criteria',
        d: 'The plan describes the feature but nothing that can be checked.',
        why: 'It reads as complete and tests nothing. Review has no rows to walk.' },
      { n: '4', t: 'Orphaned',
        d: 'Written once, then never referenced again while building.',
        why: 'The file and the code drift apart silently. This is the common one, and it leaves no trace.' },
    ],
    note: `The fix for all four is the same: <b>the plan is written first, kept
           short, and stays in the prompt.</b>`,
  },
  de: {
    h1: 'Vier Fehlformen des Plans',
    lede: `Alle vier erzeugen eine Datei, die korrekt aussieht. Drei davon fallen
           erst im Review auf, die vierte gar nicht.`,
    traps: [
      { n: '1', t: 'Nachträglich geschrieben',
        d: 'Der Code kam zuerst, der Plan wurde passend dazu verfasst.',
        why: 'Das ist Dokumentation. Der Agent hat ohne Vorgabe gebaut, und die Datei bescheinigt jetzt genau das.' },
      { n: '2', t: 'Als Pseudo-Code geschrieben',
        d: 'Der Plan nennt Funktionen, Dateien und Datenstrukturen.',
        why: 'Er hat Entscheidungen festgelegt, die das Modell besser getroffen hätte, und es bleibt nichts, woran man das Ergebnis prüfen könnte.' },
      { n: '3', t: 'Ohne Akzeptanzkriterien',
        d: 'Der Plan beschreibt das Feature, aber nichts Prüfbares.',
        why: 'Er liest sich vollständig und testet nichts. Dem Review fehlen die Zeilen zum Durchgehen.' },
      { n: '4', t: 'Verwaist',
        d: 'Einmal geschrieben und beim Bauen nie wieder herangezogen.',
        why: 'Datei und Code laufen still auseinander. Das ist der häufigste Fall, und er hinterlässt keine Spur.' },
    ],
    note: `Die Abhilfe ist bei allen vieren dieselbe: <b>Der Plan entsteht zuerst,
           bleibt kurz und bleibt im Prompt.</b>`,
  },
};

class Section13 extends HTMLElement {
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

        ${TAG} .traps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .tr { display: flex; flex-direction: column; gap: var(--ae-space-2); }
        ${TAG} .tr .head { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .tr h3 {
          margin: 0;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .tr .d {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .tr .why {
          margin: 0;
          padding-top: var(--ae-space-2);
          border-top: 1px solid var(--fg-hair);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }
        ${TAG} .tr .badge-x {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          width: 1.9em; height: 1.9em;
          border-radius: var(--ae-radius-sm);
          background: var(--ae-cool-gray-100);
          color: var(--fg-faint);
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }

        @media (max-width: 1100px) {
          ${TAG} .traps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          ${TAG} .traps { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="traps">
          ${t.traps.map((tr, i) => `
            <div class="tr fg-card fg-hover fg-in" style="--fg-at: ${3 + i}">
              <div class="head">
                <span class="badge-x">${tr.n}</span>
                <h3 class="fg-hover-title">${tr.t}</h3>
              </div>
              <p class="d">${tr.d}</p>
              <p class="why">${tr.why}</p>
            </div>
          `).join('')}
        </div>

        <p class="fg-note fg-in" style="--fg-at: 8"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section13);
