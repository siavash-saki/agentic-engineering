/* Section 23 — What the second reader is for.

   THE DEFECT THIS REPLACES. The slide carried a set of four and a set
   of two, drawn as two grids of "items with descriptions", and it read
   as a wall. The four and the two are not peers: the four are classes
   of defect a second MODEL finds, and their whole value is that they
   are named so they can be asked for; the two are what the HUMAN does
   around that pass. The old layout made the viewer work out which kind
   of thing each row was.

   SO THE SLIDE IS DRAWN AS WHAT ACTUALLY HAPPENS. A three-station rail:
   you, the diff, a second model, findings, you. Both ends are ink,
   because both rules are about what the human does — and that is
   precisely why they were never peers of the four. The four hang off
   the middle station on a dotted stem, because it is the only station
   that finds anything.

   THE LABEL "And two rules around it" IS GONE, deliberately. Five words
   restating what the drawing already says: the two rules are the things
   sitting at the two ink ends of the line. The same removal slide 7
   made with its two cards.

   THE RAIL IS BOUNDED BY THE INK MARKS, NOT BY THE FRAME. The three
   marker columns are auto — each exactly as wide as its mark — and the
   outer two are pushed to the grid's edges. The rail then spans 1 / -1
   and its ends disappear UNDER the ink squares by construction, so it
   can never overhang. Do not replace those auto columns with 1fr and
   inset the rail by a percentage: the percentage drifts the moment the
   German rewraps, which is the bug the auto columns exist to prevent.

   THE MARKERS ARE <i> ELEMENTS AND THEY NEED display: block. Without
   it the ink squares vanish entirely and the plum ring collapses to a
   5px bar — its border with no box. This is the trap in this slide.

   COLOUR. Plum is the Review chapter and it stays on the frame: the
   second-model ring and the fan's rule. Clay is the state colour and it
   is spent on the four, because each is a defect that shipped silently;
   it always travels with a ✕. Ink is the human and nothing else.
   Desaturate and the distinction survives on form alone — ✕ against a
   filled square, dashed against solid, hollow ring against solid block.

   CSS-BORDER GEOMETRY, NOT SVG, for the rail, the arrowheads and the
   stem: a stretched viewBox turns an arrowhead into a smear.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's22-review-diff';

/* Every sentence of the four classes and the two rules is the slide's
   own text. The lede is split into the two sentences it was already
   written as, so the first can head the slide and the second can label
   the fan; no word of it is dropped. New strings, all in both
   languages: the two station names, and what travels along the wire
   between them. */
const CONTENT = {
  en: {
    h1: 'Four things the author cannot see',
    ledeA: 'A second model reading the diff is cheap and takes minutes.',
    ledeB: `These are the classes it finds that the writing model does not,
            because checking them means doubting your own work.`,
    you: 'you',
    reader: 'a second model',
    w1: 'the diff',
    w2: 'findings',
    classes: [
      { t: 'A check that cannot fail',
        d: 'Both sides of a comparison from the same source. An absence asserted against a payload that never held the value. Anything called a regression test with no named defect it was seen to catch.' },
      { t: 'A claim the evidence does not support',
        d: 'A criterion marked done in terms its own evidence does not entail. Look hardest at criteria with an "and" in them.' },
      { t: 'A citation that resolves to nothing',
        d: 'A referenced file, test, commit or command that does not exist. Agents cite fluently and are not embarrassed by a dead path.' },
      { t: 'A defect in the measurement',
        d: 'The benchmark, the harness, the counting window. A harness is code too, and a wrong number is presented with exactly the same confidence as a right one.' },
    ],
    practice: [
      { t: 'Read the diff yourself',
        d: 'Every one, including your own agent\'s. Especially your own agent\'s — that is the one you are inclined to skim.' },
      { t: 'Findings are input, not orders',
        d: 'Adopt what stands up, decline the rest and say why. Cap it at two rounds, then decide.' },
    ],
  },
  de: {
    h1: 'Vier Dinge, die der Autor nicht sehen kann',
    ledeA: 'Ein zweites Modell, das den Diff liest, kostet wenig und dauert Minuten.',
    ledeB: `Das sind die Klassen, die es findet und das schreibende Modell nicht —
            weil ihre Prüfung bedeutet, an der eigenen Arbeit zu zweifeln.`,
    you: 'du',
    reader: 'ein zweites Modell',
    w1: 'der Diff',
    w2: 'Befunde',
    classes: [
      { t: 'Eine Prüfung, die nicht scheitern kann',
        d: 'Beide Seiten eines Vergleichs aus derselben Quelle. Eine Abwesenheit geprüft an einer Antwort, die den Wert nie enthielt. Alles, was Regressionstest heißt, ohne benannten Defekt, an dem es rot wurde.' },
      { t: 'Eine Aussage, die ihr Beleg nicht trägt',
        d: 'Ein Kriterium als erledigt markiert in Worten, die sein eigener Beleg nicht hergibt. Am genauesten dort hinsehen, wo ein „und" im Kriterium steht.' },
      { t: 'Ein Verweis, der ins Leere geht',
        d: 'Eine referenzierte Datei, ein Test, ein Commit, ein Kommando, das es nicht gibt. Agenten zitieren flüssig und stören sich nicht an einem toten Pfad.' },
      { t: 'Ein Defekt in der Messung',
        d: 'Der Benchmark, das Harness, das Zählfenster. Ein Harness ist auch Code, und eine falsche Zahl wird mit genau derselben Sicherheit präsentiert wie eine richtige.' },
    ],
    practice: [
      { t: 'Den Diff selbst lesen',
        d: 'Jeden, auch den des eigenen Agenten. Gerade den des eigenen Agenten — das ist der, den man überfliegt.' },
      { t: 'Befunde sind Input, keine Befehle',
        d: 'Übernehmen, was standhält, den Rest begründet ablehnen. Nach zwei Runden entscheiden.' },
    ],
  },
};

class Section22 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    const cls = (c, i) => `
      <div class="cls fg-in" style="--fg-at: ${9 + i}">
        <h3><i class="x">✕</i><span>${c.t}</span></h3>
        <p>${c.d}</p>
      </div>`;

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
        /* "safe center", not plain "center": the real stage is the
           viewport minus 110px — a 55px header and a 55px nav bar — and
           this is the deck's densest slide. Plain centring overflows in
           BOTH directions and hides the rail under the lede. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 78ch; }

        /* A class of defect: a clay ✕. Shape first, colour second. */
        ${TAG} .x { flex: none; font-style: normal; font-weight: 700; color: var(--fg-fail); }

        /* ═══════════ the pass ═══════════
           row 1 wire labels · row 2 marks and rail · row 3 captions ·
           row 4 the two rules · row 5 the drop to the fan */
        ${TAG} .pass {
          --mk: clamp(38px, 5vh, 54px);     /* the ink square: the marker ruler */
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
          align-items: start;
        }
        ${TAG} .wl {
          grid-row: 1; align-self: end; text-align: center; padding-bottom: 6px;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); color: var(--fg-faint);
        }
        ${TAG} .rail {
          grid-row: 2; grid-column: 1 / -1; align-self: center;
          height: 2px; background: var(--ae-cool-gray-300); z-index: 0;
          transform-origin: left center;
          animation: s22-rail 760ms var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
        }
        @keyframes s22-rail { from { transform: scaleX(0); } }
        ${TAG} .head-r {
          grid-row: 2; align-self: center; justify-self: end;
          width: 0; height: 0; z-index: 2;
          border-left: 11px solid var(--ae-cool-gray-300);
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
        }

        ${TAG} .mkcell { grid-row: 2; align-self: center; z-index: 3; }
        ${TAG} .mkcell--l { grid-column: 1; justify-self: start; }
        ${TAG} .mkcell--m { grid-column: 3; justify-self: center; }
        ${TAG} .mkcell--r { grid-column: 5; justify-self: end; }
        /* display: block is load-bearing on both marks. Without it an
           empty inline <i> has no box: the ink squares disappear and
           the ring renders as a 5px bar. */
        ${TAG} .mk--you {
          display: block;
          width: var(--mk); height: var(--mk); border-radius: 8px;
          background: var(--fg-ink); box-shadow: var(--fg-d2);
        }
        /* The second model: hollow and hued, the cast's machine form. A
           ring, not a disc — the filled mark is reserved for the human. */
        ${TAG} .mk--reader {
          display: block;
          width: calc(var(--mk) * 1.5); height: calc(var(--mk) * 1.5);
          border-radius: 999px;
          background: var(--fg-card); border: 5px solid var(--fg-review);
          box-shadow: var(--fg-d1);
        }

        ${TAG} .cap {
          grid-row: 3; padding-top: var(--ae-space-3);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap;
        }
        ${TAG} .cap--you { color: var(--fg-ink); }
        /* Zero width on purpose: a caption wide enough to name the
           station would otherwise widen its auto column and the ring
           would stop touching the arrowheads. A zero-width FLEX box
           centres its child on the ring and lets it overflow into the
           empty wire columns either side — text-align alone does not do
           this, it left-aligns against the zero-width line box. */
        ${TAG} .cap--reader {
          grid-column: 3; justify-self: center; width: 0;
          display: flex; justify-content: center; color: var(--fg-review);
        }

        ${TAG} .rl { grid-row: 4; padding-top: var(--ae-space-4); }
        ${TAG} .rl--l { grid-column: 1 / 3; }
        ${TAG} .rl--r { grid-column: 4 / 6; text-align: right; }
        ${TAG} .rl h3 {
          margin: 0 0 4px; font-size: var(--ae-fs-h4); line-height: 1.2; color: var(--fg-ink);
        }
        ${TAG} .rl p {
          margin: 0; max-width: 40ch;
          font-size: var(--ae-fs-small); line-height: 1.45; color: var(--fg-body);
        }
        ${TAG} .rl--r p { margin-left: auto; }

        /* The stem: the four come OUT of the middle station. It runs
           from under the reader's caption to the fan's rule in one
           piece — the drop lives in a grid row of its own rather than
           as a margin on the fan, because a margin would end the line
           short of the thing it connects to. */
        ${TAG} .drop { grid-row: 5; grid-column: 1; height: var(--ae-space-6); }
        ${TAG} .stem {
          grid-row: 4 / 6; grid-column: 3; justify-self: center; align-self: stretch;
          width: 0; border-left: 2px dotted var(--ae-cool-gray-400);
        }

        /* ═══════════ the fan ═══════════ */
        ${TAG} .fan { margin-top: 0; border-top: 1.5px solid var(--fg-review); }
        ${TAG} .fan__lab {
          margin: var(--ae-space-3) 0 var(--ae-space-4);
          font-size: var(--ae-fs-body); line-height: 1.42;
        }
        ${TAG} .four {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: var(--ae-space-4);
        }
        ${TAG} .cls h3 {
          display: flex; gap: 8px; align-items: baseline;
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h5); line-height: 1.22; color: var(--fg-ink);
        }
        ${TAG} .cls p {
          margin: 0; font-size: var(--ae-fs-small); line-height: 1.45; color: var(--fg-body);
        }

        @media print { ${TAG} .rail { animation: none !important; } }

        @media (max-width: 1000px) {
          ${TAG} .four { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: var(--ae-space-4); }
          ${TAG} .pass { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .rail, ${TAG} .head-r, ${TAG} .stem, ${TAG} .wl, ${TAG} .drop { display: none; }
          ${TAG} .mkcell, ${TAG} .cap, ${TAG} .rl { grid-row: auto; grid-column: 1; }
          ${TAG} .cap--reader { width: auto; justify-content: flex-start; }
          ${TAG} .rl--r, ${TAG} .rl--r p { text-align: left; margin-left: 0; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.ledeA}</p>
      </div>
      <div class="fg-wrap body">
        <div class="pass">
          <i class="rail" aria-hidden="true"></i>
          <span class="wl fg-in" style="grid-column: 2; --fg-at: 4">${t.w1}</span>
          <span class="wl fg-in" style="grid-column: 4; --fg-at: 6">${t.w2}</span>
          <i class="head-r fg-in" aria-hidden="true" style="grid-column: 2; --fg-at: 4"></i>
          <i class="head-r fg-in" aria-hidden="true" style="grid-column: 4; --fg-at: 6"></i>

          <div class="mkcell mkcell--l fg-in" style="--fg-at: 3"><i class="mk--you"></i></div>
          <span class="cap cap--you fg-in" style="grid-column: 1; justify-self: start; --fg-at: 3">${t.you}</span>
          <div class="rl rl--l fg-in" style="--fg-at: 3">
            <h3>${t.practice[0].t}</h3><p>${t.practice[0].d}</p>
          </div>

          <div class="mkcell mkcell--m fg-in" style="--fg-at: 5"><i class="mk--reader"></i></div>
          <span class="cap cap--reader fg-in" style="--fg-at: 5"><b>${t.reader}</b></span>

          <div class="mkcell mkcell--r fg-in" style="--fg-at: 7"><i class="mk--you"></i></div>
          <span class="cap cap--you fg-in" style="grid-column: 5; justify-self: end; --fg-at: 7">${t.you}</span>
          <div class="rl rl--r fg-in" style="--fg-at: 7">
            <h3>${t.practice[1].t}</h3><p>${t.practice[1].d}</p>
          </div>

          <i class="drop" aria-hidden="true"></i>
          <i class="stem fg-in" aria-hidden="true" style="--fg-at: 8"></i>
        </div>
        <div class="fan fg-in" style="--fg-at: 8">
          <p class="fg-lede fan__lab">${t.ledeB}</p>
          <div class="four">${t.classes.map(cls).join('')}</div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section22);
