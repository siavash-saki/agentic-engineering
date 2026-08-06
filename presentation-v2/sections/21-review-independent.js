/* Section 22 — Who reviews.

   THE DEFECT THIS REPLACES. The idea is a LADDER — ordered, and the
   order is the whole claim — and the slide rendered it as four table
   rows. Four rows are four peers, and rung 4 looked exactly like rung 1
   with different words in it. Now the geometry carries the order:
   four platforms standing on one drawn floor, rising left to right.

   THE RISERS ARE UNEVEN, AND THAT IS THE ARGUMENT. The heights are
   0 · 0.8 · 2.6 · 3.9 riser units off a common floor. Rungs 1 and 2 are
   the same model reading its own output twice — the note under the
   slide says so — so drawing them a step apart would contradict the
   note. The 2 → 3 jump is 1.8 units, more than twice any other, because
   that is the only step that changes what CAN be found. Each riser is
   captioned with what it buys, so the unevenness is measured rather
   than merely seen.

   THE FLOOR IS DRAWN. Without a common baseline, four heights are four
   sizes rather than four measurements.

   RUNG 4 IS INK. Plum is the Review chapter and it sits on the three
   machine rungs; the human is filled ink and is the heaviest mark on
   the slide. A hard black stop above three soft coloured ones is what
   makes the top of the ladder look like the top, and it is the deck's
   own rule rather than a local flourish (DESIGN.md, pass 4). Height,
   fill and form all carry the order, so desaturating loses nothing.

   THE TRAP A FUTURE EDITOR WILL HIT. The rung classes are COMPOUND on
   the titles — the markup is a single element carrying both "t" and
   "r3" — and DESCENDANT on the bars, where "r3" is on the column and
   "bar" is its child. Writing ".r3 .t" instead of ".t.r3" matches
   nothing and silently kills every rung-3 and rung-4 title style. The
   prototype shipped exactly that bug. The selectors below are written
   with the element qualified (".col.r3 .bar", "h3.t.r3") so the two
   cases cannot be confused again.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's21-review-independent';

/* The rung titles, descriptions, the lede and the note are the slide's
   own text. The drawing adds two kinds of label the table never needed:
     axis   — what the geometry measures, said out loud once
     gains  — what each riser buys. Each is a compression of the
              description of the rung above it, not a new claim. */
const CONTENT = {
  en: {
    h1: 'The session that wrote the code cannot review it',
    lede: `It re-reads its own reasoning and finds it correct, because it is the
           same reasoning. Independence is not a mood; it is a property of who
           is asked.`,
    axis: 'Independence',
    rungs: [
      { n: '1', t: 'The same session',
        d: 'Typos, and nothing else. It inherits every assumption of the code it just wrote, including the wrong ones.' },
      { n: '2', t: 'A fresh session, same model',
        d: 'The conversational bias is gone. The model family’s blind spots are not — it will make the same class of mistake reading as it made writing.' },
      { n: '3', t: 'A different model family',
        d: 'Independent failure modes. One model builds, another reads. This is the rung that catches the test that cannot fail.' },
      { n: '4', t: 'A person',
        d: 'The final say on what counts as done — which is a question about intent, and no model has access to yours.' },
    ],
    gains: ['+ no conversational bias', '+ different blind spots', '+ access to your intent'],
    note: `A second pass from the same model is a <b>separate session</b>, not an
           independent review. Both are worth doing. Only one of them is
           independence.`,
  },
  de: {
    h1: 'Die Session, die den Code geschrieben hat, kann ihn nicht reviewen',
    lede: `Sie liest ihre eigene Argumentation nach und findet sie richtig, weil
           es dieselbe Argumentation ist. Unabhängigkeit ist keine Haltung,
           sondern eine Eigenschaft dessen, wer gefragt wird.`,
    axis: 'Unabhängigkeit',
    rungs: [
      { n: '1', t: 'Dieselbe Session',
        d: 'Tippfehler, sonst nichts. Sie erbt jede Annahme des Codes, den sie gerade geschrieben hat — auch die falschen.' },
      { n: '2', t: 'Neue Session, gleiches Modell',
        d: 'Die Gesprächsverzerrung ist weg. Die blinden Flecken der Modellfamilie nicht — sie macht beim Lesen denselben Fehlertyp wie beim Schreiben.' },
      { n: '3', t: 'Eine andere Modellfamilie',
        d: 'Unabhängige Fehlermodi. Ein Modell baut, ein anderes liest. Diese Stufe findet den Test, der nicht scheitern kann.' },
      { n: '4', t: 'Ein Mensch',
        d: 'Das letzte Wort darüber, was als fertig gilt — eine Frage nach der Absicht, und auf deine hat kein Modell Zugriff.' },
    ],
    gains: ['+ keine Gesprächsverzerrung', '+ andere blinde Flecken', '+ Zugang zu deiner Absicht'],
    note: `Ein zweiter Durchgang desselben Modells ist eine <b>separate Session</b>,
           kein unabhängiges Review. Beides lohnt sich. Unabhängigkeit ist nur
           eines davon.`,
  },
};

/* Platform heights in riser units off the common floor. The 1.8-unit gap
   between rungs 2 and 3 is more than twice any other, which is the
   argument; changing these numbers changes what the slide claims. */
const RISERS = [0, 0.8, 2.6, 3.9];

class Section21 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-4);
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "safe center", not plain "center": the real stage is the
           viewport minus 110px — a 55px header and a 55px nav bar — and
           German runs longer. Plain centring overflows in BOTH
           directions and hides the top of the drawing under the lede. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 74ch; }

        /* ── the axis label ──
           Written along the arrow rather than above it: the arrow is the
           claim and the words are its caption. writing-mode plus a
           rotate, not SVG — a stretched viewBox smears an arrowhead and
           this one has to stay sharp. */
        ${TAG} .axis {
          grid-row: 1; grid-column: 1; padding-bottom: 2px;
          display: flex; flex-direction: column; align-items: center;
          gap: var(--ae-space-2);
        }
        ${TAG} .axis .arw {
          position: relative; flex: 1; width: 0; min-height: 34px;
          border-left: 1.5px solid var(--ae-cool-gray-300);
        }
        ${TAG} .axis .arw::before {
          content: ''; position: absolute; top: -7px; left: -4.5px;
          border-left: 4.5px solid transparent;
          border-right: 4.5px solid transparent;
          border-bottom: 7px solid var(--ae-cool-gray-300);
        }
        ${TAG} .axis .lab {
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1; font-weight: 600; letter-spacing: 0.04em;
          color: var(--fg-faint); white-space: nowrap;
        }

        /* ── the climb ──
           Row 1 holds the axis, the floor and the four platforms; rows 2
           and 3 hold the titles and the prose, so every rung's words
           align across columns by construction. */
        ${TAG} .climb {
          --pl: clamp(84px, 12.4vh, 146px);  /* the shortest platform */
          --r:  clamp(20px, 3.5vh, 46px);    /* one riser unit */
          display: grid;
          grid-template-columns: auto repeat(4, minmax(0, 1fr));
          grid-template-rows: auto auto auto;
          column-gap: var(--ae-space-3);
        }
        ${TAG} .floor {
          grid-row: 1; grid-column: 1 / -1; align-self: end;
          height: 0; border-top: 2px solid var(--ae-cool-gray-400);
          transform-origin: left center;
          animation: s21-extend 760ms var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
        }
        @keyframes s21-extend { from { transform: scaleX(0); } }

        ${TAG} .col {
          grid-row: 1;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        ${TAG} .gain {
          margin-bottom: 7px; text-align: center;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.25; font-weight: 600; color: var(--fg-faint);
        }
        ${TAG} .bar {
          height: var(--h);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: var(--ae-space-3);
          border-radius: var(--ae-radius) var(--ae-radius) 0 0;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h2); line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        /* Four fills, four different FORMS: an empty dashed outline, a
           tinted solid outline, a filled plum block, a filled ink block.
           The step from 3 to 4 is the step from coloured to ink, and it
           is not decoration. Qualified with .col so these can never be
           confused with the .t rung classes below. */
        ${TAG} .col.r1 .bar {
          background: transparent; color: var(--fg-review);
          border: 1.5px dashed var(--fg-review); border-bottom: 0;
        }
        ${TAG} .col.r2 .bar {
          background: var(--fg-review-tint); color: var(--fg-review-d);
          border: 1.5px solid var(--fg-review); border-bottom: 0;
        }
        ${TAG} .col.r3 .bar { background: var(--fg-review); color: #fff; box-shadow: var(--fg-d1); }
        ${TAG} .col.r4 .bar { background: var(--fg-ink); color: #fff; box-shadow: var(--fg-d2); }

        /* COMPOUND, not descendant: the title element itself carries
           both classes. ".r3 .t" would match nothing. */
        ${TAG} h3.t {
          grid-row: 2; margin: var(--ae-space-4) 0 0;
          font-family: var(--ae-font-head); font-weight: 600;
          font-size: var(--ae-fs-h4); line-height: 1.16; color: var(--fg-muted);
        }
        ${TAG} h3.t.r3 { color: var(--fg-review-d); }
        ${TAG} h3.t.r4 { color: var(--fg-ink); font-weight: 700; }
        ${TAG} .d {
          grid-row: 3; margin: var(--ae-space-2) 0 0;
          font-size: var(--ae-fs-small); line-height: 1.42; color: var(--fg-body);
        }

        @media print { ${TAG} .floor { animation: none !important; } }

        @media (max-width: 900px) {
          ${TAG} .climb { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .axis, ${TAG} .floor { display: none; }
          ${TAG} .col, ${TAG} h3.t, ${TAG} .d { grid-row: auto; grid-column: 1 !important; }
          ${TAG} .bar { height: auto; padding: var(--ae-space-3); border-radius: var(--ae-radius); }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="climb">
          <div class="axis fg-in" style="--fg-at: 3">
            <i class="arw" aria-hidden="true"></i>
            <span class="lab">${t.axis}</span>
          </div>
          <i class="floor" aria-hidden="true"></i>
          ${t.rungs.map((r, i) => `
            <div class="col r${i + 1}" style="grid-column: ${i + 2}">
              ${i ? `<span class="gain fg-in" style="--fg-at: ${4 + i}">${t.gains[i - 1]}</span>` : ''}
              <div class="bar fg-in" style="--fg-at: ${4 + i}; --h: calc(var(--pl) + ${RISERS[i]} * var(--r))">${r.n}</div>
            </div>
            <h3 class="t r${i + 1} fg-in" style="grid-column: ${i + 2}; --fg-at: ${4 + i}">${r.t}</h3>
            <p class="d fg-in" style="grid-column: ${i + 2}; --fg-at: ${4 + i}">${r.d}</p>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 9"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section21);
