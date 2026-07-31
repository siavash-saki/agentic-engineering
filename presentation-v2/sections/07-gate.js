/* Section 7 — The gates.
   Two of them, both required: one before code exists, one before the work
   is called done. Drawn as a pipeline so the positions are unambiguous —
   a gate is a point on the line, not a card next to it.

   The plan is shown as the file it is. Gate 1 is an approval of
   something; leaving that something abstract is what lets an audience
   hear "process" instead of "one short markdown file". */

import { getLang } from '../core/i18n.js';

const TAG = 's07-gate';

const CONTENT = {
  en: {
    h1: 'Two agreements',
    lede: `A gate is a point where the work stops and a person decides. There are
           two, and both of them are yours.`,
    steps: ['Plan', 'Build', 'Review'],
    gates: [
      { n: '1', label: 'Before the code',   desc: 'A person agrees the plan' },
      { n: '2', label: 'Before it is done', desc: 'A person accepts the result' },
    ],
    docLabel: 'What gate 1 approves — the whole file',
    docName: 'PLAN.md',
    doc: [
      { h: '# Rate limiting for the public API' },
      { h: '## What it should do' },
      { p: 'Requests over 100 per minute for one API key are' },
      { p: 'rejected with 429 and a Retry-After header.' },
      { p: 'Internal service calls are exempt.' },
      { h: '## Done when' },
      { li: 'A client under the limit is served normally' },
      { li: 'A client over it gets 429 and a Retry-After' },
      { li: 'Internal calls pass regardless' },
      { h: '## Not now' },
      { p: 'Per-endpoint limits. Billing.' },
    ],
    cards: [
      { t: 'Gate 1 — before Build',
        d: 'The agent may not cross it alone, however obvious the next step looks.' },
      { t: 'Gate 2 — after Review',
        d: 'An agent reporting its own success is not this gate.' },
    ],
    note: `Eleven lines, committed next to the code. <b>That is the whole
           minimum</b> — everything beyond it is a choice about how much the work
           is worth.`,
  },
  de: {
    h1: 'Zwei Freigaben',
    lede: `Ein Gate ist ein Punkt, an dem die Arbeit stoppt und ein Mensch
           entscheidet. Es gibt zwei, und beide gehören dir.`,
    steps: ['Plan', 'Build', 'Review'],
    gates: [
      { n: '1', label: 'Vor dem Code',   desc: 'Ein Mensch gibt den Plan frei' },
      { n: '2', label: 'Vor dem Fertig', desc: 'Ein Mensch nimmt das Ergebnis ab' },
    ],
    docLabel: 'Was Gate 1 freigibt — die ganze Datei',
    docName: 'PLAN.md',
    doc: [
      { h: '# Rate-Limiting für die öffentliche API' },
      { h: '## Was es tun soll' },
      { p: 'Requests über 100 pro Minute je API-Key werden mit' },
      { p: '429 und Retry-After-Header abgelehnt.' },
      { p: 'Interne Service-Aufrufe sind ausgenommen.' },
      { h: '## Fertig, wenn' },
      { li: 'Ein Client unter dem Limit normal bedient wird' },
      { li: 'Ein Client darüber 429 und Retry-After bekommt' },
      { li: 'Interne Aufrufe in jedem Fall durchgehen' },
      { h: '## Jetzt nicht' },
      { p: 'Limits je Endpoint. Abrechnung.' },
    ],
    cards: [
      { t: 'Gate 1 — vor Build',
        d: 'Der Agent darf es nicht allein überschreiten, so naheliegend der nächste Schritt auch aussieht.' },
      { t: 'Gate 2 — nach Review',
        d: 'Ein Agent, der seinen eigenen Erfolg meldet, ist nicht dieses Gate.' },
    ],
    note: `Elf Zeilen, neben dem Code eingecheckt. <b>Das ist das ganze
           Minimum</b> — alles darüber hinaus ist eine Entscheidung darüber, was
           die Arbeit wert ist.`,
  },
};

/* Steps in columns 1/3/5, gates in their own fixed columns, so a gate
   label can never collide with a neighbour. */
const STEP_COLS = [1, 3, 5];
const GATE_COLS = [2, 6];

class Section07 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const line = row => row.h ? `<div class="h">${row.h}</div>`
      : row.li ? `<div class="li">- ${row.li}</div>`
      : `<div class="p">${row.p}</div>`;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-4) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-4); font-size: var(--ae-fs-body); }

        ${TAG} .pipe {
          display: grid;
          grid-template-columns: 1fr 128px 1fr 40px 1fr 128px;
          grid-template-rows: auto 30px auto;
          margin-bottom: var(--ae-space-4);
        }
        ${TAG} .st {
          grid-row: 1;
          position: relative;
          align-self: end;
          text-align: center;
          padding-bottom: 18px;
        }
        ${TAG} .st::after {
          content: '';
          position: absolute;
          left: 50%; bottom: 0;
          height: 15px;
          border-left: 1.5px solid var(--fg-hair);
        }
        ${TAG} .st h3 {
          margin: 0;
          font-size: var(--ae-fs-h4);
          line-height: 1.15;
          color: var(--fg-ink);
        }
        ${TAG} .track { grid-row: 2; grid-column: 1 / -1; width: 100%; height: 100%; }
        ${TAG} .nd {
          grid-row: 2;
          align-self: center; justify-self: center;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--fg-green);
          border: 2.5px solid var(--fg-paper);
          box-shadow: 0 0 0 1.5px var(--fg-green);
        }
        ${TAG} .gate {
          grid-row: 2;
          align-self: center; justify-self: center;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: var(--fg-green);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: var(--ae-fs-small);
          font-weight: 900;
        }
        ${TAG} .gd {
          grid-row: 3;
          padding-top: 10px;
          text-align: center;
        }
        ${TAG} .gd .l {
          font-size: var(--ae-fs-caption);
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--fg-green);
        }
        ${TAG} .gd .d {
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }

        /* ── the plan, as the file it is ── */
        ${TAG} .lower {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
          gap: var(--ae-space-5);
          align-items: start;
          margin-bottom: var(--ae-space-3);
        }
        ${TAG} .doc { padding: 0; overflow: hidden; }
        ${TAG} .doc .bar {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--ae-space-3);
          padding: var(--ae-space-2) var(--ae-space-4);
          background: var(--ae-cool-gray-100);
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .doc .name {
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.96);
          font-weight: 700;
          color: var(--fg-green-d);
        }
        ${TAG} .doc .body {
          padding: var(--ae-space-3) var(--ae-space-4);
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-caption) * 0.94);
          line-height: 1.45;
        }
        ${TAG} .doc .h  { color: var(--fg-green-d); font-weight: 700; margin-top: 6px; }
        ${TAG} .doc .h:first-child { margin-top: 0; }
        ${TAG} .doc .p  { color: var(--fg-body); }
        ${TAG} .doc .li { color: var(--fg-ink); padding-left: var(--ae-space-3); }

        ${TAG} .cards { display: flex; flex-direction: column; gap: var(--ae-space-3); }
        ${TAG} .cards h3 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-h5);
          line-height: 1.25;
          color: var(--fg-ink);
        }
        ${TAG} .cards p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 1100px) {
          ${TAG} .pipe {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            grid-auto-rows: auto;
            gap: var(--ae-space-3);
          }
          ${TAG} .pipe > * { grid-row: auto !important; grid-column: auto !important; }
          ${TAG} .track, ${TAG} .nd { display: none; }
          ${TAG} .st { text-align: left; padding-bottom: 0; align-self: start; }
          ${TAG} .st::after { display: none; }
          ${TAG} .gate { justify-self: start; }
          ${TAG} .gd { text-align: left; padding-top: 0; }
          ${TAG} .lower { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="pipe">
          ${t.steps.map((s, i) => `
            <div class="st fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${3 + i}">
              <h3>${s}</h3>
            </div>
          `).join('')}

          <svg class="track fg-wire" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 15 L 100 15" style="--fg-at: 3; --fg-dur-draw: 1100ms"/>
          </svg>

          ${t.steps.map((s, i) => `
            <span class="nd" style="grid-column: ${STEP_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))" aria-hidden="true"></span>
          `).join('')}

          ${t.gates.map((g, i) => `
            <div class="gate fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${6 + i}">${g.n}</div>
            <div class="gd fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${6 + i}">
              <div class="l">${g.label}</div>
              <div class="d">${g.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="lower">
          <div class="doc fg-card fg-in" style="--fg-at: 8">
            <div class="bar">
              <span class="name">${t.docName}</span>
              <span class="fg-label">${t.docLabel}</span>
            </div>
            <div class="body">${t.doc.map(line).join('')}</div>
          </div>

          <div class="cards fg-in" style="--fg-at: 9">
            ${t.cards.map(c => `
              <div>
                <h3>${c.t}</h3>
                <p>${c.d}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section07);
