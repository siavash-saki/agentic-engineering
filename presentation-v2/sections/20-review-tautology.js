/* Section 21 — The test that cannot fail.

   The exhibit of the chapter. A regression test, written by an agent, for
   a bug that had already reached production once. Both sides of its
   comparison come from the same measurement, so the assertion is true for
   every possible value — including the ones the bug produces. The code is
   an illustration of a class of defect, not a quotation.

   TIER C: THE EXHIBIT IS THE HERO AND NOTHING REPLACES IT. Slide 2 is the
   deck's other exhibit slide; three diagram variations were built for it
   and all three were rejected, because on an exhibit slide the code IS
   the content and a picture drawn beside it competes rather than serves.
   Two things are redrawn instead.

   1. ATTACHMENT. Each half of the diagnosis is physically joined to the
      line it is about, instead of sitting in a column beside the listing
      and leaving the reader to work out which sentence names which line.

      THE ROWS ARE THE ATTACHMENT. Block, chip, wire and annotation are
      four items in ONE grid row, so every connector lands on its own
      annotation by construction — not by a percentage that drifts the
      moment the German wraps to an extra line. The panel is a single grid
      item spanning all three rows behind them, so the exhibit still reads
      as one continuous listing rather than three cards. Ported from slide
      9, which solved the same problem.

      THE BLOCKS ARE CENTRED, NOT STRETCHED. A row is as tall as the
      taller of its two occupants, and rows 3 and 4 are set by the
      ANNOTATION, not by the one line of code beside it. Left stretched,
      the code line sits at the top of its row while the chip sits in the
      middle, and the wire then points well below the line it names.

   2. THE CHAIN. "What it got past" is a SEQUENCE — a thing that travelled
      through four stages and was waved through at every one — and it used
      to be four bullets. A bulleted list destroys the exact property that
      makes it damning: that it kept going. It is drawn as one horizontal
      run with the nodes on a line.

      THE FOUR STAGES ARE NOT FOUR PEERS, AND THAT IS THE SHARPEST THING
      ON THE SLIDE. Three are machines and the fourth is a person, and the
      deck already has forms for both: a machine step is a hollow ring ON
      the line, a human decision is a filled ink bar ACROSS it (slide 7).
      Drawn that way the slide says the sharper thing — the human stop was
      there, and it stamped the test through too. If a future edit makes
      the four stages look alike, it has deleted the argument.

      THE NODE IS THE GRID ITEM ITSELF, not a wrapper around it. Wrapped,
      the wrapper inherited the grid's align-items: start and the 38px
      ring hung at the top of a row the 56px bar defines — so the rail,
      which is centred in that row, crossed every ring 9px below its
      middle.

   THE PANEL'S TYPE IS CAPPED BY WIDTH, NOT ONLY BY HEIGHT. Every type
   token in this deck is vh-derived and .fg-wrap is capped at 1240px, so
   on a tall projector the mono face grows while the column it sits in
   does not, and the longest authored line (50 characters) soft-wraps —
   which stops the exhibit looking like a file. Hence the min(): the vh
   token, a vw term, and an absolute ceiling for when .fg-wrap is pinned
   at its maximum. The deck's 14px floor outranks all three.

   COLOUR. Review chapter, so plum is the chapter hue and it stays on the
   frame: the labels, and nothing else. Two state hues in the content,
   which is the whole budget:

     GREEN, with a checkmark — the verdict each stage recorded.
     OCHRE, with an open circle — claimed but not evidenced, which is what
       those four passes actually establish. It also marks the two halves
       of the tautology inside the listing: that expression is the claim
       with no evidence under it.

   THE TWO HALVES GET THE SAME BOX, because their being the same
   expression is the entire defect — an identical shape twice says it
   before any prose does, and survives greyscale, where the hue does not.

   CLAY IS ABSENT FROM THE CONTENT, and the old slide spent it twice: a
   clay wash on the marked expression and a clay checkmark on every chain
   bullet. Both are wrong under the deck's vocabulary. A clay checkmark is
   a verdict glyph in the failure hue, which says two contradictory things
   at once; and the test is not the deck's "wrong" case, it is the deck's
   "not verified" case, which is precisely why this slide is where ochre
   is most earned.

   THE TAKEAWAY IS CLAY, AND IT IS THE ONLY CLAY ON THE SLIDE. Mint is
   wrong for the reason slides 19 and 20 give — mint means pass, and this
   note's first three words are "A green test", arguing that green proves
   nothing. Ochre is wrong too: ochre is the verdict the drawing already
   carries, and the note is not a verdict on the exhibit. It is a warning
   about what a green run does not establish, which is clay's job in this
   palette — the failure mode, the thing that goes wrong silently. It
   lives on the takeaway layer only. Nothing in the drawing may take it.

   GREYSCALE. Every distinction has a form cue: checkmark versus open
   circle, hollow ring versus filled bar, solid rail versus dotted leader,
   and the two tie-boxes are boxes. Desaturated, all of it still reads.

   (No backticks anywhere in these comments or in the CSS: this block sits
   inside a JS template literal, and a backtick ends the string. It has
   happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's20-review-tautology';

/* The listing is carried as its three blocks — the same six lines, split
   where the blank lines already split them, so an annotation can be
   attached to one of them.

   Three strings beyond the slide's own words, all declared:

   1. "notes" is the reveal paragraph split in two, one per line of the
      listing it is about. Its middle sentence opens "The second one —",
      which refers back to "both sides of the comparison" in the sentence
      before it; standing alone beside the measurement it annotates, that
      reference has nothing to point at, so it reads "The second
      measurement —". One word, and only in the split copy.
   2. "chainLabel" and the four chain items are unchanged.
   3. "verdictWord" — the deck's own third verdict, already in the
      takeaway on slide 20. It labels the pill at the end of the chain.

   Nothing is deleted. */
const CONTENT = {
  en: {
    h1: 'The test that cannot fail',
    lede: `A regression test, written by an agent, for a bug that had reached
           production once already. It ran green in every pipeline for weeks.`,
    codeLabel: 'The test',
    blocks: [
      ['// the overlay must be gone after the toggle',
       "await page.click('[data-testid=\"overlay-toggle\"]')"],
      ['const hidden = await countPixels(page)'],
      ['expect(hidden.red).toBeLessThan(hidden.red + 60)'],
    ],
    revealLabel: 'What is wrong with it',
    notes: [
      'The second measurement — the overlay while visible — was never taken.',
      `Both sides of the comparison come from the same measurement. The assertion
       is true for every possible value, including the ones the bug produces.`,
    ],
    chainLabel: 'What it got past',
    chain: [
      'The model that wrote it',
      'A green pipeline, every run',
      'The model that reviewed it',
      'A human who saw a passing suite',
    ],
    verdictWord: 'not verified',
    note: `A green test proves that the test ran. <b>It does not prove that it
           could have failed.</b> The only way to know is to break the code on
           purpose and watch the test go red first.`,
  },
  de: {
    h1: 'Der Test, der nicht scheitern kann',
    lede: `Ein Regressionstest, geschrieben von einem Agenten, für einen Fehler,
           der es schon einmal in Produktion geschafft hatte. Er lief wochenlang
           in jeder Pipeline grün.`,
    codeLabel: 'Der Test',
    blocks: [
      ['// das Overlay muss nach dem Umschalten weg sein',
       "await page.click('[data-testid=\"overlay-toggle\"]')"],
      ['const hidden = await countPixels(page)'],
      ['expect(hidden.red).toBeLessThan(hidden.red + 60)'],
    ],
    revealLabel: 'Was daran falsch ist',
    notes: [
      'Die zweite Messung — das Overlay im sichtbaren Zustand — wurde nie erhoben.',
      `Beide Seiten des Vergleichs stammen aus derselben Messung. Die Zusicherung
       ist für jeden möglichen Wert wahr, auch für die, die der Fehler erzeugt.`,
    ],
    chainLabel: 'Woran er vorbeikam',
    chain: [
      'Am Modell, das ihn geschrieben hat',
      'An einer grünen Pipeline, in jedem Lauf',
      'Am Modell, das ihn reviewt hat',
      'An einem Menschen, der eine bestandene Suite sah',
    ],
    verdictWord: 'nicht geprüft',
    note: `Ein grüner Test beweist, dass der Test gelaufen ist. <b>Er beweist
           nicht, dass er hätte scheitern können.</b> Sicherheit gibt es nur,
           indem man den Code absichtlich kaputt macht und den Test zuerst rot
           werden sieht.`,
  },
};

/* The stage that is a person, not a machine. Index into t.chain. */
const HUMAN = 3;

/* One span per authored line, with a hanging indent: the listing's line
   breaks are the author's, a soft wrap is the layout's, and if one ever
   does wrap it must hang under its own line rather than impersonate a
   line somebody wrote. The comment takes the neutral grey; the assertion
   gets both halves of the comparison boxed, and they are boxed
   IDENTICALLY because being the same expression is the defect. The
   replacement is keyed off toBeLessThan so it can only ever fire on the
   assertion line. */
function renderLine(l) {
  if (!l) return '<span class="ln">&nbsp;</span>';
  if (l.slice(0, 2) === '//') return '<span class="ln cm">' + l + '</span>';
  if (l.indexOf('toBeLessThan') > -1) {
    return '<span class="ln">'
      + l.split('hidden.red').join('<span class="tie">hidden.red</span>')
      + '</span>';
  }
  return '<span class="ln">' + l + '</span>';
}
function lines(b) { return b.map(renderLine).join(''); }

/* The node carries its own grid placement and its own entrance, because
   it IS the grid item — see the alignment note in the header. */
function nodeFor(i, style, at) {
  const isH = i === HUMAN;
  return '<span class="node ' + (isH ? 'node--h' : 'node--m') + ' fg-in" style="'
    + style + ' --fg-at: ' + at + '"><span class="tick">✓</span></span>';
}

class Section20 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;

    let exhibit = `
      <div class="grid">
        <p class="fg-label lbl lbl-a fg-in" style="--fg-at: 3">${t.codeLabel}</p>
        <p class="fg-label lbl lbl-b fg-in" style="--fg-at: 3">${t.revealLabel}</p>
        <div class="panel fg-in" style="--fg-at: 3"></div>`;
    t.blocks.forEach((b, i) => {
      const row = `grid-row: ${2 + i};`;
      exhibit += `
        <div class="blk blk--${i + 1} fg-in" style="${row} --fg-at: ${4 + i}">
          <p class="src">${lines(b)}</p>
        </div>`;
      if (i === 0) return;   /* the click has no annotation of its own */
      exhibit += `
        <div class="att fg-in" aria-hidden="true" style="${row} --fg-at: ${5 + i}">
          <span class="chip">${i}</span><i class="wire"></i>
        </div>
        <p class="ann fg-in" style="${row} --fg-at: ${5 + i}">${t.notes[i - 1]}</p>`;
    });
    exhibit += '</div>';

    let chain = `
      <div class="chainband">
        <p class="fg-label lbl fg-in" style="--fg-at: 8">${t.chainLabel}</p>
        <div class="chain"><i class="rail" aria-hidden="true"></i>`;
    t.chain.forEach((c, i) => {
      const col = `grid-column: ${i + 1};`;
      const at = 9 + Math.floor(i / 2);
      chain += nodeFor(i, col, at)
        + `<p class="cap fg-in" style="${col} --fg-at: ${at}">${c}</p>`;
    });
    chain += `
          <div class="term fg-in" style="--fg-at: 11">
            <i class="dot" aria-hidden="true"></i>
            <span class="verdict"><span class="vg">◦</span>${t.verdictWord}</span>
          </div>
        </div>
      </div>`;

    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
          /* The exhibit's type, capped by width as well as height — see
             the header note. */
          --ex-fs: max(14px, min(calc(var(--ae-fs-small) * 0.98), 1.24vw, 18px));
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1": the body must grow into spare space — that
           is what centres the exhibit — but it must never SHRINK below its
           content, or a long German string gets squeezed and painted
           through the takeaway. "safe center" covers the other half: when
           the content does exceed the frame, centring falls back to
           flex-start so the top stays reachable. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-3); }
        /* The kit sets a bottom margin on every p, and .fg-note is one.
           Everywhere else the body absorbs it because the body may shrink;
           here it may not (see above), so it was 11px of blank paid for out
           of the exhibit's budget. */
        ${TAG} .foot .fg-note { margin-bottom: 0; }

        /* h2, not h1. The prototype set this heading at display-adjacent
           size, and it was measured in a harness that subtracts only a
           header; the deck subtracts a header AND a nav bar, so the stage
           it lands in is 110px shorter and the slide ran 100% of its
           content box in both languages — over in German. The heading is
           where that budget comes back: on a Tier C slide the artifact is
           the hero, not the title, and slides 19 and 20 of this same
           chapter are set at h2. */
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0 0 var(--ae-space-3); max-width: 68ch; }

        /* A label is metadata about the frame, not body text, so it is the
           one place the chapter hue is allowed to live. */
        ${TAG} .lbl { color: var(--fg-review); margin: 0 0 var(--ae-space-3); }

        /* The takeaway is clay — see the header note. It is the only clay
           on the slide, and it never enters the drawing. */
        ${TAG} .fg-note { background: var(--fg-fail-tint); color: var(--fg-fail-d); }
        ${TAG} .fg-note::before { color: var(--fg-fail); }

        /* ── the exhibit ──
           Near-black, because the deck sets file source and terminals on a
           near-black panel. On that ground the accent switches to its light
           variant: --fg-wait measures 2.0:1 there, --fg-wait-light 8.2:1. */
        ${TAG} .src {
          margin: 0;
          font-family: var(--ae-font-mono);
          color: #E6EDE8;
          font-size: var(--ex-fs);
          line-height: 1.68;
        }
        ${TAG} .src .ln { display: block; padding-left: 1.6em; text-indent: -1.6em; }
        /* The comment is neutral grey, not the deck's usual green-light. On
           this slide green is a verdict, and a green comment would be the
           pass hue spent on syntax. #B6C1B2 measures 9.0:1 on #16211C. */
        ${TAG} .src .cm { color: var(--ae-cool-gray-300); }
        /* The tautology, marked. Both occurrences get the SAME box. */
        ${TAG} .tie {
          color: #fff; font-weight: 600;
          border: 1.5px solid var(--fg-wait-light);
          background: rgba(212, 179, 97, .18);
          border-radius: 4px;
          padding: 1px 4px;
          -webkit-box-decoration-break: clone; box-decoration-break: clone;
        }

        ${TAG} .grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.08fr) clamp(32px, 4.2vw, 68px) minmax(0, 0.92fr);
          align-items: stretch;
        }
        ${TAG} .lbl-a { grid-column: 1; grid-row: 1; }
        ${TAG} .lbl-b { grid-column: 3; grid-row: 1; }
        ${TAG} .panel {
          grid-column: 1; grid-row: 2 / span 3;
          background: #16211C;
          border-radius: var(--ae-radius-lg);
          box-shadow: var(--fg-d2);
        }
        /* The blocks sit in the same cells as the panel and later in the
           DOM, so they paint on top of it, and their padding is the
           panel's padding. Centred, not stretched — see the header note. */
        ${TAG} .blk {
          grid-column: 1; position: relative; z-index: 1;
          display: flex; align-items: center;
          padding: var(--ae-space-3) var(--ae-space-6);
        }
        ${TAG} .blk--1 { padding-top: var(--ae-space-4); }
        ${TAG} .blk--3 { padding-bottom: var(--ae-space-5); }
        ${TAG} .blk .src { flex: 1; min-width: 0; }

        /* The chip hangs half over the panel's edge — it is ON the exhibit,
           not next to it. Negative margin rather than absolute positioning,
           so it cannot drift out of its row. The paper halo is what makes
           one ink disc legible against BOTH grounds it straddles:
           near-black panel on its left, paper on its right. */
        ${TAG} .att {
          grid-column: 2; align-self: center;
          display: flex; align-items: center; margin-left: -15px;
        }
        ${TAG} .chip {
          display: inline-flex; align-items: center; justify-content: center; flex: none;
          width: 27px; height: 27px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          box-shadow: 0 0 0 3px var(--fg-paper);
          font-family: var(--ae-font); font-size: 14px; font-weight: 700;
          line-height: 1; font-variant-numeric: tabular-nums;
        }
        ${TAG} .att .wire {
          flex: 1; height: 0; margin-left: 4px;
          border-top: 2px dotted var(--ae-cool-gray-400);
        }
        /* The vertical padding is what separates one annotation from the
           next: the rows are packed to zero gap — they have to be, or the
           panel behind them would show paper stripes — so without it the
           two run together. */
        ${TAG} .ann {
          grid-column: 3; align-self: center;
          padding: var(--ae-space-3) 0 var(--ae-space-3) var(--ae-space-3);
          margin: 0;
          font-size: var(--ae-fs-small); line-height: 1.42; color: var(--fg-body);
        }

        /* ── the chain ── */
        ${TAG} .chainband { margin-top: var(--ae-space-5); }
        ${TAG} .chain {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
          align-items: start;
        }
        /* The rail spans from the left edge of column 1, so it enters the
           frame before the first stage: nothing started it and nothing
           stopped it. */
        ${TAG} .rail {
          grid-row: 1; grid-column: 1 / 5; align-self: center;
          height: 3px; border-radius: 2px; background: var(--fg-hair);
          transform-origin: left center;
          animation: s20-rail 800ms var(--ae-ease) both;
          animation-delay: calc(60ms + 8 * var(--fg-beat));
        }
        @keyframes s20-rail { from { transform: scaleX(0); } }
        /* Print shows resting states. The kit's guard covers its own
           devices only, so a slide with a rail of its own has to say so —
           the same line slides 5, 7, 23, 28 and 33 carry. */
        @media print { ${TAG} .rail { animation: none !important; } }

        /* A machine stage is a hollow ring; the human is a filled ink bar.
           Both carry the checkmark they recorded, so the colour never
           travels without its glyph — and on the ink bar the glyph
           switches to the light green, the only value that clears
           contrast on that ground. */
        ${TAG} .node {
          display: flex; align-items: center; justify-content: center; flex: none;
        }
        ${TAG} .node--m {
          width: 38px; height: 38px; border-radius: 999px;
          background: var(--fg-card); border: 2.5px solid var(--ae-cool-gray-300);
        }
        ${TAG} .node--m .tick { color: var(--fg-green); }
        ${TAG} .node--h {
          width: 34px; height: 56px; border-radius: 9px;
          background: var(--fg-ink); box-shadow: var(--fg-d2);
        }
        ${TAG} .node--h .tick { color: var(--fg-green-light); }
        ${TAG} .tick { font-size: 19px; font-weight: 700; line-height: 1; }
        /* THE NODE IS THE GRID ITEM ITSELF — see the header note. */
        ${TAG} .chain .node {
          grid-row: 1; align-self: center; justify-self: center; z-index: 1;
        }
        ${TAG} .cap {
          grid-row: 2; margin: var(--ae-space-3) var(--ae-space-3) 0;
          text-align: center;
          font-size: var(--ae-fs-small); line-height: 1.35; color: var(--fg-ink);
        }

        /* The verdict at the end of the run. A PILL, not a node: it is not
           a fifth stage, it is what the four of them actually established.
           Dashed edge and an open circle so the distinction is not carried
           by ochre alone. */
        ${TAG} .term {
          grid-row: 1; grid-column: 5; align-self: center;
          display: flex; align-items: center;
        }
        ${TAG} .term .dot {
          flex: none; width: clamp(20px, 2.6vw, 44px); height: 0;
          border-top: 2px dotted var(--ae-cool-gray-400);
        }
        ${TAG} .verdict {
          display: inline-flex; align-items: baseline; gap: 8px; flex: none;
          padding: 6px 14px; border-radius: 999px;
          border: 1.5px dashed var(--fg-wait);
          background: var(--fg-wait-tint);
          color: var(--fg-wait-d);
          font-family: var(--ae-font); font-weight: 600;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          white-space: nowrap;
        }
        /* THE OPEN CIRCLE HAS TO READ AS OPEN. U+25E6 is drawn at about a
           third of its em box, so set at the size of the words beside it
           the ring collapses to a dot and reads as a list bullet — which
           deletes the form half of the not-verified cue, the half that has
           to survive greyscale. Scaled here, with a collapsed line box so
           the larger glyph does not open the line. Same treatment as the
           pill on slide 19. Do not "tidy" it back. */
        ${TAG} .verdict .vg {
          font-size: 2.1em; line-height: 0.45; font-weight: 700;
          position: relative; top: 0.1em;
        }

        /* ── narrow ──
           THE BREAKPOINT IS SET BY THE LISTING, NOT BY A ROUND NUMBER.
           Below about 1100px of viewport width the longest authored line —
           50 mono characters — no longer fits a half-width column at the
           deck's 14px floor, and the floor outranks the fit. So the
           two-column shape stacks there, where a full-width exhibit still
           holds every line unwrapped.

           THE EXHIBIT SURVIVES THE STACK. Only the wires go; each
           annotation keeps its numbered chip, so the mapping onto the
           listing is not lost with them. */
        @media (max-width: 1100px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
          ${TAG} .lbl-a { grid-column: 1; grid-row: 1; }
          ${TAG} .panel { grid-column: 1; grid-row: 2 / span 3; }
          ${TAG} .blk { grid-column: 1; }
          /* The blocks are pinned to rows 2-4 by inline style and the panel
             still spans them; everything else auto-places after row 4, in
             DOM order. Hence the !important — it is overriding an inline
             grid-row. */
          ${TAG} .att, ${TAG} .ann { grid-column: 1; grid-row: auto !important; }
          ${TAG} .lbl-b { grid-column: 1; grid-row: 5; margin-top: var(--ae-space-5); }
          ${TAG} .att { margin-left: 0; align-self: end; margin-top: var(--ae-space-4); }
          ${TAG} .att .wire { display: none; }
          ${TAG} .ann { align-self: start; padding: var(--ae-space-2) 0 0; }
          /* THE CHAIN KEEPS ITS FOUR COLUMNS AND ITS RAIL. An earlier
             version restated the template as two columns, which did
             nothing: every node carries an inline grid-column, so columns 3
             and 4 were simply recreated implicitly and the only thing the
             rule achieved was deleting the rail — leaving four rings and no
             run, which is the shape this redraw exists to replace. Only the
             verdict moves: it drops to its own row, and column 5 collapses
             to zero once nothing occupies it. */
          ${TAG} .term .dot { display: none; }
          ${TAG} .term {
            grid-row: 3; grid-column: 1 / -1;
            justify-content: center; margin-top: var(--ae-space-5);
          }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">${exhibit}${chain}</div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 12"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section20);
