/* Section 12 — Four ways a plan fails.

   The note has always claimed that the fix for all four is the same one.
   Four separate cards cannot say that; they say "here are four unrelated
   problems". So this is not four panels — it is ONE BOARD WITH ONE RULE
   ACROSS IT. Above the rule, in clay, the four ways it goes wrong. Below
   it, in ink, the move that removes each. One continuous line separates
   all four failures from all four corrections, which makes the note's
   claim true of the picture and not only of a sentence.

   The rule is slide 6's labelled divider at slide scale: height 0 with a
   border rather than a filled bar, because a bar has to be positioned
   and a border sits exactly on the grid line the blocks above it end on.
   The trap blocks stretch to a common height by grid default, so all
   four meet the rule by construction rather than by four heights that
   happen to agree in English.

   INK BELOW THE LINE, NOT GREEN OR BLUE. A correction is something a
   person decides, and the human is the one thing this deck does not
   colour. Clay above, ink below, and the ✕ / → pair carries the same
   distinction with no hue at all — which is what survives the projector.

   THE FOUR CORRECTIONS ARE NOT NEW CLAIMS. Each is the note's aggregate
   fix spelled out for one trap; 2 and 3 restate that trap's own "why" in
   the imperative.

   ── Two traps a future editor would otherwise fall into ─────────────

   THE RULE IS AN <i>, so its label inherits italic unless the pill is
   told font-style: normal. It looked like a font bug and was not one.

   THE PILL STRADDLES THE LINE, so half of it sits inside the row above,
   where the trap blocks are LATER SIBLINGS and painted straight over it.
   The rule carries a stacking context (position + z-index) for that
   reason; remove it and the label reads as clipped, which looks like a
   padding bug and is not one either.

   THE EMISSION ORDER IS TRAP-THEN-CORRECTION, PAIRED. Wide, the explicit
   grid row and column put them in two bands. Narrow, the explicit
   placement is dropped and the DOM order is what stacks — trap,
   correction, trap, correction. Emitting all four traps and then all
   four corrections renders identically when wide and wrongly when narrow.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string. It did once.) */

import { getLang } from '../core/i18n.js';

const TAG = 's12-plan-traps';

const CONTENT = {
  en: {
    h1: 'Four ways a plan fails',
    lede: `All four produce a file that looks correct. Three of them are found
           only at review, and the fourth is never found at all.`,
    ruleLabel: 'the fix',
    traps: [
      { n: '1', t: 'Written afterwards',
        d: 'The code came first, the plan was written to match it.',
        why: 'That is documentation. The agent built with no constraint, and the file now certifies whatever it did.',
        fix: 'Write it before the first line of code.' },
      { n: '2', t: 'Written as pseudo-code',
        d: 'The plan names functions, files and data structures.',
        why: 'It has locked in decisions the model would have made better, and there is nothing left to check the result against.',
        fix: 'Say what it must do. Leave the how to the model.' },
      { n: '3', t: 'No acceptance criteria',
        d: 'The plan describes the feature but nothing that can be checked.',
        why: 'It reads as complete and tests nothing. Review has no rows to walk.',
        fix: 'Write down what review will walk through.' },
      { n: '4', t: 'Orphaned',
        d: 'Written once, then never referenced again while building.',
        why: 'The file and the code drift apart silently. This is the common one, and it leaves no trace.',
        fix: 'Keep the file in the prompt while building.' },
    ],
    note: `The fix for all four is the same: <b>the plan is written first, kept
           short, and stays in the prompt.</b>`,
  },
  de: {
    h1: 'Vier Fehlformen des Plans',
    lede: `Alle vier erzeugen eine Datei, die korrekt aussieht. Drei davon fallen
           erst im Review auf, die vierte gar nicht.`,
    ruleLabel: 'die Abhilfe',
    traps: [
      { n: '1', t: 'Nachträglich geschrieben',
        d: 'Der Code kam zuerst, der Plan wurde passend dazu verfasst.',
        why: 'Das ist Dokumentation. Der Agent hat ohne Vorgabe gebaut, und die Datei bescheinigt jetzt genau das.',
        fix: 'Vor der ersten Zeile Code schreiben.' },
      { n: '2', t: 'Als Pseudo-Code geschrieben',
        d: 'Der Plan nennt Funktionen, Dateien und Datenstrukturen.',
        why: 'Er hat Entscheidungen festgelegt, die das Modell besser getroffen hätte, und es bleibt nichts, woran man das Ergebnis prüfen könnte.',
        fix: 'Sagen, was es tun soll. Das Wie bleibt beim Modell.' },
      { n: '3', t: 'Ohne Akzeptanzkriterien',
        d: 'Der Plan beschreibt das Feature, aber nichts Prüfbares.',
        why: 'Er liest sich vollständig und testet nichts. Dem Review fehlen die Zeilen zum Durchgehen.',
        fix: 'Aufschreiben, was das Review durchgeht.' },
      { n: '4', t: 'Verwaist',
        d: 'Einmal geschrieben und beim Bauen nie wieder herangezogen.',
        why: 'Datei und Code laufen still auseinander. Das ist der häufigste Fall, und er hinterlässt keine Spur.',
        fix: 'Die Datei beim Bauen im Prompt behalten.' },
    ],
    note: `Die Abhilfe ist bei allen vieren dieselbe: <b>Der Plan entsteht zuerst,
           bleibt kurz und bleibt im Prompt.</b>`,
  },
};

class Section12 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-7);
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "safe center", not plain "center": the deck's stage is 110px
           shorter than a bare viewport once the header and the nav bar
           are subtracted, and German runs longer. Plain centring
           overflows in BOTH directions, which puts the first row of
           traps on top of the lede. "safe" falls back to flex-start. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* h2, not the h1 the prototype used. This slide carries eight
           blocks of prose under its lede; at h1 the heading alone cost
           enough of the deck's shorter stage that the German corrections
           went under the fold. */
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0 0 var(--ae-space-5); max-width: 68ch; }

        /* ═══════════ the board ═══════════ */
        ${TAG} .board {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: var(--ae-space-4);
        }

        /* ── above the line: the failure ── */
        ${TAG} .trap {
          grid-row: 1;
          display: flex; flex-direction: column; gap: var(--ae-space-3);
          padding: var(--ae-space-4) var(--ae-space-5);
          background: var(--fg-fail-tint);
          border-radius: var(--ae-radius-lg) var(--ae-radius-lg) 0 0;
        }
        ${TAG} .head-row { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .mk {
          display: inline-flex; align-items: center; justify-content: center; flex: none;
          width: 1.9em; height: 1.9em; border-radius: var(--ae-radius-sm);
          background: var(--fg-card); color: var(--fg-fail-d);
          border: 1px solid var(--fg-fail);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1;
        }
        ${TAG} .trap h3 {
          margin: 0; font-size: var(--ae-fs-h5); line-height: 1.2; color: var(--fg-ink);
        }
        ${TAG} .trap .d {
          margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        /* The consequence line: slide 7's .pn__not, unchanged — a rule
           above it, clay text, a leading cross. The cross is what
           survives greyscale; the clay is what makes it findable in
           colour. Pinned to the bottom, so the four consequence lines
           share a baseline band however the titles wrap. */
        ${TAG} .why {
          display: flex; gap: var(--ae-space-2); align-items: baseline;
          margin: auto 0 0; padding-top: var(--ae-space-2);
          border-top: 1px solid var(--fg-fail-light);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-fail-d);
        }
        ${TAG} .why::before { content: '\\2715'; flex: none; font-weight: 700; }

        /* ── the line itself: the heaviest mark on the slide, and the
              argument. Height 0 with a border rather than a filled bar,
              so it sits exactly on the grid line the blocks end on. ── */
        ${TAG} .rule {
          grid-row: 2; grid-column: 1 / -1;
          position: relative; height: 0;
          border-top: 2.5px solid var(--fg-ink);
          margin-bottom: var(--ae-space-5);
          /* The pill straddles the line, so half of it sits inside the
             row above. The trap blocks are later siblings and painted
             over it until this stacking context was raised. */
          z-index: 2;
        }
        ${TAG} .rule span {
          position: absolute; left: 50%; top: 0; transform: translate(-50%, -50%);
          padding: 3px 14px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          /* The rule is an <i>, so the label inherits italic unless it
             is told otherwise. */
          font-style: normal;
          font-weight: 600; white-space: nowrap;
        }

        /* ── below the line: the move that removes it ── */
        ${TAG} .fix {
          grid-row: 3; margin: 0;
          display: flex; gap: var(--ae-space-2); align-items: baseline;
          font-size: var(--ae-fs-small); line-height: 1.4;
          font-weight: 600; color: var(--fg-ink);
        }
        ${TAG} .fix::before { content: '\\2192'; flex: none; font-weight: 700; }

        @media (max-width: 1100px) {
          ${TAG} .board { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .trap, ${TAG} .fix { grid-row: auto !important; grid-column: auto !important; }
          ${TAG} .trap { border-radius: var(--ae-radius-lg); }
          ${TAG} .rule { display: none; }
          ${TAG} .fix {
            margin-top: calc(-1 * var(--ae-space-4)); padding-top: var(--ae-space-3);
            border-top: 2.5px solid var(--fg-ink);
          }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="board">
          <i class="rule fg-in" style="--fg-at: 7"><span>${t.ruleLabel}</span></i>
          ${t.traps.map((tr, i) => `
            <div class="trap fg-in" style="grid-row: 1; grid-column: ${i + 1}; --fg-at: ${3 + i}">
              <div class="head-row">
                <span class="mk">${tr.n}</span>
                <h3>${tr.t}</h3>
              </div>
              <p class="d">${tr.d}</p>
              <p class="why">${tr.why}</p>
            </div>
            <p class="fix fg-in" style="grid-row: 3; grid-column: ${i + 1}; --fg-at: 8">${tr.fix}</p>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section12);
