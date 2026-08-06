/* Section 20 — Three rules for what a pass may claim.

   Three rules, each written from a false pass that actually shipped. They
   are the difference between a verification that records something and
   one that certifies whatever happened.

   DESIGN.md calls this a set of three rules, verdict "light": the shape
   is right and the drawing is missing. So the idea is not re-shaped —
   what changes is that each rule now carries the SHAPE OF THE FAILURE IT
   CATCHES.

   THE THREE COLUMNS LOOK NOTHING ALIKE, AND THAT IS THE ARGUMENT. These
   are not three statements of the same kind; they catch three differently
   shaped failures, and each shape is drawable:

     1  a criterion drawn as two halves, only one of them evidenced,
        joined under a brace that says the two are ONE row — which is why
        marking the row a pass on the strength of the left half reads as
        complete;
     2  a struck verdict with a dotted drop into an evidence cell that is
        named and empty;
     3  a fork whose solid branch was driven and whose dashed branch was
        not.

   Three identical panels would have said the opposite: that the rules
   are interchangeable. If a future edit makes the three diagrams rhyme,
   it has deleted the reason they exist.

   ALL GEOMETRY IS CSS BORDERS, NOT SVG. A stretched SVG viewBox turns a
   rounded corner into an ellipse, and the fork in specimen 3 is nothing
   but rounded corners: an element carrying only its top and left borders
   with the top-left corner rounded draws a branch going up and away;
   bottom and left with the bottom-left corner rounded draws the mirror.
   Nothing here can distort at any width.

   THE ORDINAL LIVES IN THE PLATE'S CORNER, NOT IN THE HEADING. As an
   inline badge it had to be set at 0.72em to sit inside the title, which
   rendered at 11.5px — under the deck's 14px floor. In the corner it
   carries its own caption size, and the heading is left as one clean
   text block that aligns across the three columns. Do not move it back.

   THE THREE EXPLICIT GRID ROWS — plate, title, prose — exist because
   rule 1's title runs to two lines in both languages and the other two
   do not. Without shared rows the three bodies started at three
   different heights and the row read as ragged.

   THE SCAR LINE is the fact the slide did not previously state: each of
   the three rules was written from a false pass that shipped. That is
   what makes the drawing mean anything, and it sits BESIDE the lede
   behind a plum margin bar rather than under it, so the fact costs one
   sentence and no vertical band of its own.

   COLOUR. Plum is the chapter and stays on the frame: the margin bar and
   the ordinal chip. It is never on body text. The content carries
   exactly two state hues:

       pass          green   filled chip     checkmark
       not verified  ochre   hollow, dashed  open circle

   CLAY IS DELIBERATELY ABSENT. These rules do not turn a pass into
   "wrong"; they turn it into "not verified", and the deck insists that
   is a precise statement about evidence rather than a failure. Ochre
   exists so PENDING stops looking like failure, so spending clay here
   would undo the argument the slide is making.

   THE TAKEAWAY IS OCHRE, NOT MINT. .fg-note is mint deck-wide, but on
   this slide mint means "pass", and the sentence inside the block argues
   that "not verified" is worth more than "pass". A mint block would
   spend the pass colour on the not-verified argument. Slide 19 makes the
   same change for the same reason.

   NEIGHBOURS. Slide 19 is the criteria table and slide 21 is the test
   that cannot fail. So this slide states the rules and never re-runs
   their examples: no rate-limit criteria, no test source. The only
   quoted material is the three hedges, which are the rule.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and a backtick ends the string.
   It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's19-review-evidence';

/* The title, the lede, the three rules and the takeaway are the slide's
   own words. New strings, in both languages:

     scar     the fact the slide did not state.
     vPass    the deck's own verdict words, taken from slide 19.
     lab      the specimen labels.

   No example is borrowed from slide 19 or 21. */
const CONTENT = {
  en: {
    h1: 'Three rules for what a pass may claim',
    lede: `An agent asked to produce a verification will produce one. Whether it
           says anything depends on rules it cannot talk itself out of.`,
    scar: 'Each of the three was written from a false pass that shipped.',
    vPass: 'Pass',
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
    lab: {
      x: 'X', y: 'Y', and: 'and',
      evidence: 'Evidence', empty: 'nothing',
      tested: 'tested', untested: 'not driven',
    },
    note: `A record that says <b class="v-wait"><span class="g">◦</span> not
           verified</b> truthfully is worth more than one that says
           <b class="v-pass"><span class="g">✓</span> pass</b> convincingly. The
           first tells you where to look; the second tells you nothing and feels
           better.`,
  },
  de: {
    h1: 'Drei Regeln dafür, was ein Pass behaupten darf',
    lede: `Ein Agent, der eine Verifikation erstellen soll, erstellt eine. Ob sie
           etwas aussagt, hängt an Regeln, um die er sich nicht herumreden kann.`,
    scar: 'Jede der drei stammt aus einem falschen Pass, der ausgeliefert wurde.',
    vPass: 'Bestanden',
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
    lab: {
      x: 'X', y: 'Y', and: 'und',
      evidence: 'Beleg', empty: 'nichts',
      tested: 'getestet', untested: 'nicht gefahren',
    },
    note: `Ein Protokoll, das wahrheitsgemäß
           <b class="v-wait"><span class="g">◦</span> nicht geprüft</b> sagt,
           ist mehr wert als eines, das überzeugend
           <b class="v-pass"><span class="g">✓</span> bestanden</b> sagt. Das
           erste sagt, wo man nachsehen muss; das zweite sagt nichts und fühlt
           sich besser an.`,
  },
};

/* The claimed pass, struck. The strike is INK, not clay: a pass is
   overturned by a person reading the row, and the human is the one thing
   in this deck that is not coloured. It is also the cue that survives
   greyscale — the chip keeps its green, and the bar across it says the
   green was not earned. */
function struckPass(t) {
  return '<span class="vd vd--pass vd--was"><span class="g">✓</span>' + t.vPass + '</span>';
}

function specimen(t, i) {
  if (i === 0) {
    return '<div class="sp1">'
      + '<div class="halves">'
        + '<span class="half half--x"><span class="g">✓</span>' + t.lab.x + '</span>'
        + '<span class="conj">' + t.lab.and + '</span>'
        + '<span class="half half--y"><span class="g">◦</span>' + t.lab.y + '</span>'
      + '</div>'
      + '<i class="brace" aria-hidden="true"></i>'
      + '<i class="stem" aria-hidden="true"></i>'
      + struckPass(t)
    + '</div>';
  }
  if (i === 1) {
    return '<div class="sp2">'
      + struckPass(t)
      + '<i class="drop" aria-hidden="true"></i>'
      + '<span class="field">'
        + '<span class="celllab">' + t.lab.evidence + '</span>'
        + '<span class="cell">' + t.lab.empty + '</span>'
      + '</span>'
    + '</div>';
  }
  return '<div class="sp3">'
    + '<i class="trunk" aria-hidden="true"></i>'
    + '<i class="arm arm--up" aria-hidden="true"></i>'
    + '<i class="arm arm--down" aria-hidden="true"></i>'
    + '<span class="tip tip--up"><span class="g">✓</span>' + t.lab.tested + '</span>'
    + '<span class="tip tip--down"><span class="g">◦</span>' + t.lab.untested + '</span>'
  + '</div>';
}

class Section19 extends HTMLElement {
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
        /* "1 0 auto", not "1": the body must grow into spare space — that
           is what centres the three columns — but it must never SHRINK
           below its content. With a zero basis it takes exactly the
           leftover space, and once the columns stack at the narrow
           breakpoint the excess painted straight through the takeaway
           instead of scrolling: a silent spill, which is worse than a
           scrollbar because nothing reports it. */
        ${TAG} .body {
          flex: 1 0 auto; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-3); }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        /* 74ch rather than the kit's 62ch: at 62 the lede runs to three
           lines in both languages and the head eats the band the drawing
           needs. Two lines is the whole difference between 96% fill and
           90%. */
        ${TAG} .fg-lede { margin: 0; flex: 1 1 46ch; max-width: 74ch; }

        /* The head runs the lede and the scar line side by side, so the
           fact that costs one sentence costs no vertical band of its own. */
        ${TAG} .headrow {
          display: flex; align-items: flex-start; flex-wrap: wrap;
          gap: var(--ae-space-3) var(--ae-space-7);
          margin-bottom: var(--ae-space-3);
        }
        /* Plum on the bar, ink on the words: the chapter is allowed the
           frame and never the body text. */
        ${TAG} .scar {
          flex: 1 1 22ch; max-width: 34ch; margin: 0;
          padding-left: var(--ae-space-4);
          border-left: 3px solid var(--fg-review);
          font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          font-weight: 600; color: var(--fg-ink);
        }

        /* ── the verdict vocabulary ──
           Three cues, not one: hue, glyph, and filled-versus-dashed.
           Desaturate and the distinction is still there. */
        ${TAG} i { font-style: normal; }
        ${TAG} .vd {
          display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
          position: relative;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption); line-height: 1;
          font-weight: 700; padding: 6px 13px; border-radius: 100px;
        }
        /* The open circle has to READ as open. At 1.1em U+25E6 renders as
           a dot the size of a list bullet and the hollow-versus-filled
           cue — the half of the distinction that survives greyscale — is
           gone. */
        ${TAG} .vd .g { font-size: 1.45em; line-height: 1; }
        ${TAG} .vd--pass {
          background: var(--fg-build-tint); color: var(--fg-build-d);
          border: 1.5px solid transparent;
        }
        /* Ink, not clay — see the note on struckPass. */
        ${TAG} .vd--was::after {
          content: ''; position: absolute; left: 5px; right: 5px; top: 50%;
          height: 2px; margin-top: -1px; border-radius: 1px; background: var(--fg-ink);
        }

        ${TAG} .rule-t {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          letter-spacing: -0.022em; color: var(--fg-ink);
          font-size: var(--ae-fs-h5); line-height: 1.22;
        }
        ${TAG} .rule-d {
          margin: var(--ae-space-2) 0 0; color: var(--fg-body);
          font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
        }

        /* Ochre, not mint — see the header note. */
        ${TAG} .fg-note { background: var(--fg-wait-tint); color: var(--fg-wait-d); }
        ${TAG} .fg-note::before { color: var(--fg-wait); }
        ${TAG} .fg-note b.v-pass { color: var(--fg-build-d); }
        ${TAG} .fg-note b.v-wait { color: var(--fg-wait-d); }
        ${TAG} .fg-note .g { font-size: 1.3em; line-height: 1; }

        /* ── the three specimens ──
           Three explicit rows — plate, title, prose — so the prose starts
           at the same height in all three columns. See the header note. */
        ${TAG} .cols {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-rows: auto auto auto;
          column-gap: var(--ae-space-6); align-items: start;
        }
        ${TAG} .plate {
          grid-row: 1; position: relative;
          --dh: clamp(130px, 21.5vh, 212px);
          height: var(--dh);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          margin-bottom: var(--ae-space-4);
          border-radius: var(--ae-radius-md);
          background: var(--fg-card); border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .rule-t { grid-row: 2; }
        ${TAG} .rule-d { grid-row: 3; }
        /* The ordinal lives here, not in the heading — see the header note. */
        ${TAG} .num {
          position: absolute; top: var(--ae-space-3); left: var(--ae-space-3);
          display: inline-flex; align-items: center; justify-content: center;
          width: 1.75em; height: 1.75em;
          border-radius: 999px;
          background: var(--fg-review-tint); color: var(--fg-review-d);
          font-family: var(--ae-font); font-weight: 700;
          font-size: var(--ae-fs-caption); line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        /* ── specimen 1: a criterion with two halves, one of them evidenced ── */
        ${TAG} .sp1 { display: flex; flex-direction: column; align-items: center; gap: 0; }
        ${TAG} .halves { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .half {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: clamp(58px, 6vw, 82px); height: clamp(34px, 4.4vh, 46px);
          border-radius: var(--ae-radius-sm);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 700; line-height: 1;
        }
        ${TAG} .half .g { font-size: 1.15em; line-height: 1; }
        ${TAG} .half--x {
          background: var(--fg-build-tint); border: 1.5px solid var(--fg-build);
          color: var(--fg-build-d);
        }
        ${TAG} .half--y {
          background: transparent; border: 1.5px dashed var(--fg-wait);
          color: var(--fg-wait-d);
        }
        ${TAG} .conj {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 600; color: var(--fg-muted);
        }
        /* The brace says the two halves are ONE row, which is why marking
           the row a pass on the strength of the left half reads as
           complete. */
        ${TAG} .brace {
          width: clamp(150px, 16vw, 210px); height: 11px; margin-top: 7px;
          border: 1.5px solid var(--ae-cool-gray-300); border-top: 0;
          border-radius: 0 0 9px 9px;
        }
        ${TAG} .stem { width: 0; height: 9px; border-left: 1.5px solid var(--ae-cool-gray-300); }

        /* ── specimen 2: a verdict with nothing under it ── */
        ${TAG} .sp2 { display: flex; flex-direction: column; align-items: center; }
        ${TAG} .drop { width: 0; height: 12px; border-left: 2px dotted var(--ae-cool-gray-400); }
        ${TAG} .cell {
          display: flex; align-items: center; justify-content: center;
          width: clamp(140px, 15vw, 200px); height: clamp(30px, 3.8vh, 40px);
          border-radius: var(--ae-radius-sm);
          border: 1.5px dashed var(--fg-wait); background: var(--fg-wait-tint);
          color: var(--fg-wait-d);
          font-size: var(--ae-fs-caption); font-weight: 700; line-height: 1;
        }
        /* The label sits ABOVE the cell, where a field label goes. Under
           it the pair read as a caption on a box rather than as a named
           cell that is empty, which is the whole specimen. */
        ${TAG} .celllab {
          margin-bottom: 4px; align-self: flex-start;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1; color: var(--fg-faint);
        }
        ${TAG} .sp2 .field { display: flex; flex-direction: column; }

        /* ── specimen 3: a fork with one branch driven ──
           Two corners built from borders — see the header note. Nothing
           here can distort at any width. */
        ${TAG} .sp3 {
          position: relative;
          width: clamp(170px, 18vw, 232px); height: clamp(66px, 8.4vh, 92px);
        }
        ${TAG} .sp3 .trunk {
          position: absolute; left: 0; top: 50%; width: 26%; height: 0; margin-top: -1px;
          border-top: 2px solid var(--ae-cool-gray-400);
        }
        ${TAG} .sp3 .arm { position: absolute; left: 26%; width: 30%; }
        ${TAG} .sp3 .arm--up {
          top: 22%; bottom: 50%;
          border-left: 2px solid var(--ae-cool-gray-400);
          border-top: 2px solid var(--ae-cool-gray-400);
          border-radius: 10px 0 0 0;
        }
        ${TAG} .sp3 .arm--down {
          top: 50%; bottom: 22%;
          border-left: 2px dashed var(--fg-wait);
          border-bottom: 2px dashed var(--fg-wait);
          border-radius: 0 0 0 10px;
        }
        ${TAG} .sp3 .tip {
          position: absolute; left: 56%; display: flex; align-items: center; gap: 6px;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 600; line-height: 1; white-space: nowrap;
        }
        ${TAG} .sp3 .tip .g { font-size: 1.2em; line-height: 1; font-weight: 700; }
        ${TAG} .sp3 .tip--up { top: 22%; transform: translateY(-50%); color: var(--fg-build-d); }
        ${TAG} .sp3 .tip--down { bottom: 22%; transform: translateY(50%); color: var(--fg-wait-d); }

        /* THE OPEN CIRCLE HAS TO READ AS OPEN, EVERYWHERE IT APPEARS.
           U+25E6 is drawn at about a third of its em box, so set at the
           size of the text beside it the ring collapses to a dot and reads
           as a list bullet — which deletes the form half of the
           not-verified cue, the half that has to survive greyscale. It is
           scaled wherever it occurs, with a collapsed line box so the
           larger glyph never opens the line it sits in. The checkmark is
           left alone: it already fills its em box. Do not "tidy" these
           back to 1em. */
        ${TAG} .half--y .g,
        ${TAG} .sp3 .tip--down .g,
        ${TAG} .fg-note b.v-wait .g {
          font-size: 2.1em; line-height: 0.4; position: relative;
        }
        /* In the takeaway the glyph is a plain inline and sits on the
           text's own baseline, so it needs almost nothing. */
        ${TAG} .fg-note b.v-wait .g { top: 0.08em; }
        /* Inside the two plates it is a flex item in a centred row: the
           collapsed line box is centred, but the glyph still paints from
           that box's baseline, which sits well below it. Lifted back onto
           the optical centre of the label beside it. */
        ${TAG} .half--y .g,
        ${TAG} .sp3 .tip--down .g { top: -0.17em; }

        @media (max-width: 1000px) {
          ${TAG} .cols { grid-template-columns: 1fr; row-gap: 0; }
          /* Every item carries an inline grid-column, so restating the
             template as one track is not enough on its own: columns 2 and
             3 would simply be recreated as implicit tracks and the three
             specimens would stay side by side. Hence the !important — it
             is overriding an inline style. */
          ${TAG} .plate, ${TAG} .rule-t, ${TAG} .rule-d {
            grid-column: 1 !important; grid-row: auto;
          }
          ${TAG} .rule-d { margin-bottom: var(--ae-space-5); }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <div class="headrow">
          <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
          <p class="scar fg-in" style="--fg-at: 2">${t.scar}</p>
        </div>
      </div>
      <div class="fg-wrap body">
        <div class="cols">
          ${t.rules.map((r, i) => {
            const c = `grid-column: ${i + 1}; --fg-at: ${3 + i};`;
            return `
            <div class="plate fg-in" style="${c}">
              <span class="num">${r.n}</span>${specimen(t, i)}
            </div>
            <h3 class="rule-t fg-in" style="${c}">${r.t}</h3>
            <p class="rule-d fg-in" style="${c}">${r.d}</p>`;
          }).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 10"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section19);
