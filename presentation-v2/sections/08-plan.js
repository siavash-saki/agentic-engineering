/* Section 8 — Plan, chapter opener.

   A chapter opener, and the deck's first Tier A slide. It used to carry
   130 words at 56% frame fill, which is not opening anything — it was a
   content slide wearing a title. Now the chapter name sits at display
   size, blue owns the slide, and the argument is drawn.

   The slide reads top to bottom as three statements:

     the two questions      — what you are deciding, and in what order
     the failure            — what happens if you take them the other way
     the four moves         — how you decide, ending in the file

   THE ORDER IS THE ARGUMENT, so it is drawn as an arrow between the two
   questions rather than stated as prose. The lede that used to say this
   in words is gone: the boxes and the clay strip say it, and saying it
   twice made the slide read as a wall again.

   THE LOCATOR — the loop with this step lit. The deck removed its
   position indicator at the pilot gate, which was right for every
   content slide; a chapter opener is exactly where "you are here" is the
   content rather than furniture. Slides 13 and 18 carry the same device
   in their own hue.

   THE RUN IS DRAWN AT CONNECTOR STRENGTH, not hairline. Cool gray 200 is
   this deck's hairline value — correct for a separator, far too faint
   for a line the eye is meant to travel along, which is why an earlier
   version's arrowhead read as a stray mark. The rail, its tail and its
   head are all cool gray 300 and form one continuous stroke into the
   document.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string. It did once.) */

import { getLang } from '../core/i18n.js';

const TAG = 's08-plan';

const CONTENT = {
  en: {
    kicker: 'Step 1 of 3',
    h1: 'Plan',
    loop: ['Plan', 'Build', 'Review'],
    q1: { n: 'First', t: 'What should it do?' },
    q2: { n: 'Then',  t: 'How should it be built?' },
    wrong: 'Answering the second one first is the most common way this goes wrong.',
    moves: [
      { n: '1', t: 'Read',     d: 'The agent reads the code, the patterns and the tests before it proposes anything.' },
      { n: '2', t: 'Ask',      d: 'It asks until it can write the plan without guessing. The questions are where the requirements are.' },
      { n: '3', t: 'Converge', d: 'Options and trade-offs, decided by a person. This is a conversation, not a hand-off.' },
      { n: '4', t: 'Write',    d: 'The agreed answers go in a file. That file is what Build reads and what Review measures against.' },
    ],
    docKind: 'produces', docName: 'PLAN.md',
    note: `In this step you are <b>a participant</b>. In the next two you are a
           judge. That difference is the whole reason this step takes the
           longest.`,
  },
  de: {
    kicker: 'Schritt 1 von 3',
    h1: 'Plan',
    loop: ['Plan', 'Build', 'Review'],
    q1: { n: 'Zuerst', t: 'Was soll es tun?' },
    q2: { n: 'Dann',   t: 'Wie soll es gebaut werden?' },
    wrong: 'Die zweite zuerst zu beantworten ist der häufigste Fehler.',
    moves: [
      { n: '1', t: 'Lesen',     d: 'Der Agent liest Code, Muster und Tests, bevor er irgendetwas vorschlägt.' },
      { n: '2', t: 'Fragen',    d: 'Er fragt, bis er den Plan ohne Raten schreiben kann. In den Fragen stecken die Anforderungen.' },
      { n: '3', t: 'Klären',    d: 'Optionen und Abwägungen, entschieden von einem Menschen. Das ist ein Gespräch, keine Übergabe.' },
      { n: '4', t: 'Schreiben', d: 'Die geklärten Antworten kommen in eine Datei. Diese Datei liest Build, und gegen sie misst Review.' },
    ],
    docKind: 'erzeugt', docName: 'PLAN.md',
    note: `In diesem Schritt bist du <b>Beteiligter</b>. In den beiden folgenden
           bist du Prüfer. Genau deshalb dauert dieser Schritt am längsten.`,
  },
};

class Section08 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        ${TAG} .body {
          flex: 1; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-4); }

        ${TAG} .title {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: var(--ae-space-6); flex-wrap: wrap;
        }
        ${TAG} .kicker {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg-plan); margin: 0 0 var(--ae-space-2);
        }
        ${TAG} h1 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-display); line-height: 1; letter-spacing: -0.035em;
          color: var(--fg-plan-d);
        }

        /* ── the locator: the loop, with this step lit ── */
        ${TAG} .loc { display: flex; align-items: center; gap: var(--ae-space-2); }
        ${TAG} .loc .dot {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 600; color: var(--ae-text-disabled);
        }
        ${TAG} .loc .dot::before {
          content: ''; width: 10px; height: 10px; border-radius: 999px;
          background: var(--ae-cool-gray-200);
        }
        ${TAG} .loc .dot.on { color: var(--fg-plan-d); font-weight: 700; }
        ${TAG} .loc .dot.on::before {
          background: var(--fg-plan); box-shadow: 0 0 0 4px var(--fg-plan-tint);
        }
        ${TAG} .loc .sep { width: 18px; height: 2px; background: var(--fg-hair); }

        /* ── the two questions ── */
        ${TAG} .qs {
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: stretch; column-gap: var(--ae-space-5);
        }
        ${TAG} .q {
          padding: var(--ae-space-4) var(--ae-space-6);
          border-radius: var(--ae-radius-lg);
          background: var(--fg-card); border: 1.5px solid var(--fg-plan);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .q .n {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--fg-plan);
        }
        ${TAG} .q .t {
          display: block; margin-top: 3px;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h2); line-height: 1.1; color: var(--fg-ink);
        }
        ${TAG} .then {
          align-self: center; font-size: var(--ae-fs-h2);
          color: var(--fg-plan); font-weight: 700;
        }

        /* Clay AND dashed AND a cross: three carriers, so the failure
           still reads with the hue stripped out. */
        ${TAG} .wrong {
          display: flex; align-items: baseline; gap: var(--ae-space-3);
          margin: var(--ae-space-3) 0 0;
          padding: var(--ae-space-3) var(--ae-space-5);
          border-radius: var(--ae-radius);
          background: var(--fg-fail-tint); border: 1px dashed var(--fg-fail);
          font-size: var(--ae-fs-small); line-height: 1.4; color: var(--fg-fail-d);
        }
        ${TAG} .wrong::before { content: '\\2715'; flex: none; font-weight: 700; }

        /* ── the four moves, ending in the file ── */
        ${TAG} .run {
          display: grid;
          padding-right: var(--ae-space-3);
          grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
          grid-template-rows: auto auto auto;
          align-items: start; column-gap: var(--ae-space-4);
          margin-top: var(--ae-space-7);
        }
        ${TAG} .rail {
          grid-row: 1; grid-column: 1 / 5; align-self: center;
          height: 3px; border-radius: 2px 0 0 2px;
          background: var(--ae-cool-gray-300);
          transform-origin: left center;
          animation: s08-rail 760ms var(--ae-ease) both;
          animation-delay: calc(60ms + 5 * var(--fg-beat));
        }
        @keyframes s08-rail { from { transform: scaleX(0); } }

        /* display: contents lets each move place its three parts into the
           three shared rows, so names and prose align across columns. */
        ${TAG} .mv { display: contents; }
        ${TAG} .mv > * { text-align: center; }
        ${TAG} .mv__n {
          grid-row: 1;
          width: clamp(42px, 5.6vh, 58px); height: clamp(42px, 5.6vh, 58px);
          margin: 0 auto; border-radius: 999px;
          background: var(--fg-plan); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font-head); font-size: var(--ae-fs-h3); font-weight: 700;
          box-shadow: var(--fg-d2); position: relative; z-index: 1;
        }
        ${TAG} .mv__t {
          grid-row: 2; display: block; margin-top: var(--ae-space-3);
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1.1; color: var(--fg-plan-d);
        }
        ${TAG} .mv__d {
          grid-row: 3; margin: 5px auto 0; max-width: 25ch;
          font-size: var(--ae-fs-small); line-height: 1.4; color: var(--fg-body);
        }

        /* The tail bridges the column gap so the rail and its head are one
           continuous line rather than two marks with air between them. */
        ${TAG} .out {
          grid-row: 1; grid-column: 5; align-self: center;
          display: flex; align-items: center;
          margin-left: calc(-1 * var(--ae-space-4));
        }
        ${TAG} .out .tail {
          flex: none; width: clamp(16px, 2.2vw, 38px); height: 3px;
          background: var(--ae-cool-gray-300);
        }
        ${TAG} .out .head {
          flex: none; width: 0; height: 0;
          border-left: 13px solid var(--ae-cool-gray-300);
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
          margin-right: var(--ae-space-4);
        }
        /* Ink, not blue: the file is the thing a person agreed to. */
        ${TAG} .doc {
          display: inline-flex; flex-direction: column; align-items: center; gap: 3px;
          padding: var(--ae-space-4) var(--ae-space-5); border-radius: var(--ae-radius);
          background: var(--fg-card); border: 1.5px solid var(--fg-ink);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .doc .kind {
          font-size: var(--ae-fs-caption); line-height: 1.2; color: var(--fg-muted);
        }
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono); font-size: var(--ae-fs-small);
          line-height: 1.2; font-weight: 600; color: var(--fg-ink);
        }

        @media (max-width: 900px) {
          ${TAG} .qs { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .run { grid-template-columns: 1fr; row-gap: var(--ae-space-5); }
          ${TAG} .rail, ${TAG} .out .tail, ${TAG} .out .head { display: none; }
        }
      </style>
      <div class="fg-wrap head">
        <div class="title">
          <div>
            <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
            <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
          </div>
          <div class="loc fg-in" style="--fg-at: 2">
            ${t.loop.map((s, i) => `
              ${i ? '<i class="sep"></i>' : ''}
              <span class="dot${i === 0 ? ' on' : ''}">${s}</span>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="fg-wrap body">
        <div class="qs">
          <div class="q fg-in" style="--fg-at: 3">
            <span class="n">${t.q1.n}</span><span class="t">${t.q1.t}</span>
          </div>
          <span class="then fg-in" style="--fg-at: 4">&rarr;</span>
          <div class="q fg-in" style="--fg-at: 4">
            <span class="n">${t.q2.n}</span><span class="t">${t.q2.t}</span>
          </div>
        </div>
        <p class="wrong fg-in" style="--fg-at: 5">${t.wrong}</p>
        <div class="run">
          <i class="rail"></i>
          ${t.moves.map((m, i) => `
            <div class="mv">
              <span class="mv__n fg-in" style="grid-column: ${i + 1}; --fg-at: ${6 + i}">${m.n}</span>
              <span class="mv__t fg-in" style="grid-column: ${i + 1}; --fg-at: ${6 + i}">${m.t}</span>
              <p class="mv__d fg-in" style="grid-column: ${i + 1}; --fg-at: ${6 + i}">${m.d}</p>
            </div>
          `).join('')}
          <div class="out fg-in" style="--fg-at: 10">
            <i class="tail"></i><i class="head"></i>
            <span class="doc">
              <span class="kind">${t.docKind}</span>
              <span class="file">${t.docName}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section08);
