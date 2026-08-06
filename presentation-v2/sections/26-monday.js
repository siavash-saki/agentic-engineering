/* Section 27 — The smallest version that works.

   The most USABLE slide in the deck: six things a person does on Monday
   morning, with no folder to create, no naming convention and no new
   tool. The old layout set them as a 3x2 grid of cards, and that is the
   defect a grid asks the reader to wrap — and wrapping destroys the one
   property that matters here, which is that step 4 comes after step 3.

   SO IT IS DRAWN AS ONE RUN. Six discs on a single grey rail, left to
   right, in reading order, with no break to negotiate.

   THE BRACKETS ARE THE ARGUMENT. The slide names all three loop steps in
   its own recap line, so blue, green and plum arrive here as STRUCTURE
   rather than as decoration: steps 1-4 are Plan, step 5 is Build, step 6
   is Review. The three brackets above the rail are therefore of UNEQUAL
   WIDTH by construction — Plan spans four columns, Build one, Review one
   — and that inequality is the claim: four of the six moves happen
   before any code exists. Drawing it turns the recap from a restatement
   into part of the figure, and it makes the note's point visible instead
   of merely stated.

   COLOUR IS NEVER THE ONLY CARRIER. Each bracket is labelled in words
   directly above the bar it names, so the grouping survives greyscale
   with nothing lost but which of two mid-tones is which.

   STEP 4 CARRIES AN INK RING. The note says step 4 is the one people
   skip and the one that makes 5 and 6 possible; ink is this deck's mark
   for a human decision, and writing the file is the human's act. It is
   the emphasis the old slide spent on a card ring, moved on to the
   drawing where it can be seen from the back of the room. The ring is
   offset by a paper-coloured gap so it reads as a ring and not as a
   thicker disc.

   THE DISCS RUN LARGER THAN SLIDE 8's, deliberately. Six across is a
   WIDE, SHORT figure, and at slide 8's disc size the drawing floated in
   the middle of the frame with a third of the body empty above and below
   it. The height has to come from somewhere, and a bigger numeral is the
   part of the drawing worth reading from the back of the room.

   THE RAIL IS AT CONNECTOR STRENGTH, cool gray 300, never the hairline
   value: a hairline is this deck's SEPARATOR, and a line the eye is
   meant to travel along is not a separator.

   TRAP: THIS IS THE TIGHTEST MEASURE IN THE DECK. Six columns of roughly
   190px in the content column, and the German step names run to five
   lines in the worst case. Anything that widens a string, or any extra
   padding on the run, is paid for out of the prose under the discs.
   Check German before calling a change to this slide done.

   (No backticks anywhere in these comments: this block and the style
   block below sit inside a JS template literal, and one backtick ends
   the string and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's26-monday';

const CONTENT = {
  en: {
    h1: 'The <span class="fg-mark fg-mark--sweep">smallest</span> version that works',
    lede: `Nothing here needs a folder structure, a naming convention or a new
           tool. Take the next thing you were going to build and do this
           instead.`,
    steps: [
      { n: '1', t: 'Do not ask for code yet',   d: 'Ask the agent to read the files that matter and summarise what it found.' },
      { n: '2', t: 'Make it ask',               d: '"Ask me every question you need answered to build this without guessing."' },
      { n: '3', t: 'Answer, and decide',        d: 'The questions are the requirements. The answers are yours to give, not its to assume.' },
      { n: '4', t: 'Put it in a markdown file', d: 'What it should do, what is out of scope, and how you will know it worked.' },
      { n: '5', t: 'Then build',                d: 'In steps. One commit each. The file stays in the prompt the whole time.' },
      { n: '6', t: 'Check, then have it read',  d: 'Walk your own criteria first. Then have a different model read the diff.' },
    ],
    recapLabel: 'And that is the whole thing',
    recap: ['Plan', 'Build', 'Review'],
    note: `Step 4 is the one people skip, and it is the one that makes steps 5
           and 6 possible. <b>Everything else in this talk is turning the
           dial.</b>`,
  },
  de: {
    h1: 'Die <span class="fg-mark fg-mark--sweep">kleinste</span> Fassung, die funktioniert',
    lede: `Nichts davon braucht eine Ordnerstruktur, eine Namenskonvention oder
           ein neues Werkzeug. Nimm die nächste Aufgabe und mach es
           so.`,
    steps: [
      { n: '1', t: 'Noch keinen Code verlangen', d: 'Den Agenten die relevanten Dateien lesen und zusammenfassen lassen.' },
      { n: '2', t: 'Fragen lassen',              d: '„Stell mir jede Frage, die du beantwortet brauchst, um das ohne Raten zu bauen."' },
      { n: '3', t: 'Antworten und entscheiden',  d: 'Die Fragen sind die Anforderungen. Die Antworten gibst du, nicht das Modell.' },
      { n: '4', t: 'In eine Markdown-Datei',     d: 'Was es tun soll, was nicht dazugehört, und woran du erkennst, dass es klappt.' },
      { n: '5', t: 'Dann bauen',                 d: 'In Schritten. Ein Commit je Schritt. Die Datei bleibt die ganze Zeit im Prompt.' },
      { n: '6', t: 'Prüfen, dann lesen lassen',  d: 'Erst die eigenen Kriterien durchgehen. Dann ein anderes Modell den Diff lesen lassen.' },
    ],
    recapLabel: 'Und das ist alles',
    recap: ['Plan', 'Build', 'Review'],
    note: `Schritt 4 ist der, den man auslässt, und der, der die Schritte 5 und 6
           erst möglich macht. <b>Alles andere in diesem Vortrag ist der
           Regler.</b>`,
  },
};

/* Which loop step each of the six belongs to — the slide's own recap,
   drawn instead of restated — and the three bracket spans that follow
   from it. Plan owns four of the six columns; that is the argument. */
const PHASE = [0, 0, 0, 0, 1, 2];
const HUE = ['s-plan', 's-build', 's-review'];
const BAND = ['1 / 5', '5 / 6', '6 / 7'];

class Section26 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "safe center", not plain "center": the real stage is the
           viewport minus a header and a nav bar, and German runs longer.
           Plain centring overflows in BOTH directions; "safe" falls back
           to flex-start rather than pushing content off the top. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-4); }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 68ch; }
        ${TAG} .cap { margin: 0 0 var(--ae-space-3); }

        /* the three chapter hues, named once */
        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }

        /* A phase name, always set next to the coloured bar it names, so
           the grouping reads with the hue stripped out. */
        ${TAG} .phase-name {
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--hue-d);
        }

        ${TAG} .run {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          column-gap: var(--ae-space-4);
          align-items: start;
          padding-right: 20px;          /* room for the rail's head */
        }

        /* Row 1 — the phase brackets. Three separate bars of unequal
           width: the widths ARE the claim, four of six before any code. */
        ${TAG} .band { grid-row: 1; padding-bottom: var(--ae-space-5); }
        ${TAG} .band i {
          display: block; height: 6px; border-radius: 3px;
          margin-top: 5px; background: var(--hue);
          transform-origin: left center;
          animation: s26-extend 620ms var(--ae-ease) both;
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }
        @keyframes s26-extend { from { transform: scaleX(0); } }

        /* Row 2 — the rail, at connector strength (cool gray 300), never
           the hairline value: a line the eye travels along is not a
           separator. Its head is CSS borders, not SVG. */
        ${TAG} .rail {
          grid-row: 2; grid-column: 1 / -1; align-self: center; position: relative;
          height: 3px; border-radius: 2px 0 0 2px; background: var(--ae-cool-gray-300);
          transform-origin: left center;
          animation: s26-extend 820ms var(--ae-ease) both;
          animation-delay: calc(60ms + 4 * var(--fg-beat));
        }
        ${TAG} .rail::after {
          content: ''; position: absolute; right: -13px; top: -7.5px;
          width: 0; height: 0;
          border-left: 13px solid var(--ae-cool-gray-300);
          border-top: 9px solid transparent;
          border-bottom: 9px solid transparent;
        }

        /* One disc device: filled with the phase hue, white numeral,
           middle elevation, sitting ON the rail. */
        ${TAG} .disc {
          grid-row: 2; margin: 0 auto;
          display: flex; align-items: center; justify-content: center;
          width: clamp(48px, 6.4vh, 74px); height: clamp(48px, 6.4vh, 74px);
          border-radius: 999px;
          background: var(--hue); color: #fff;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h2); line-height: 1;
          font-variant-numeric: tabular-nums;
          box-shadow: var(--fg-d2);
          position: relative; z-index: 1;
        }
        /* The pivot. Ink ring, offset by a paper-coloured gap so it reads
           as a ring rather than as a thicker disc — and ink against three
           mid-tone hues is the widest contrast the deck has, so it
           survives greyscale. */
        ${TAG} .disc--key {
          box-shadow: var(--fg-d2), 0 0 0 3px var(--fg-paper), 0 0 0 5.5px var(--fg-ink);
        }

        ${TAG} .nm {
          grid-row: 3; display: block; margin-top: var(--ae-space-5); text-align: center;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h4); line-height: 1.16; color: var(--fg-ink);
        }
        ${TAG} .ds {
          grid-row: 4; margin: var(--ae-space-3) 0 0; text-align: center;
          font-size: var(--ae-fs-small); line-height: 1.4; color: var(--fg-body);
        }

        @media print {
          ${TAG} .rail, ${TAG} .band i { animation: none !important; }
        }

        /* Below this width six columns stop being a run and start being
           six slivers, so the drawing gives up and the steps stack. */
        @media (max-width: 1000px) {
          ${TAG} .run { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: var(--ae-space-5); }
          ${TAG} .rail, ${TAG} .band { display: none; }
          ${TAG} .disc { grid-row: auto; }
          ${TAG} .nm, ${TAG} .ds { grid-row: auto; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <p class="fg-label cap fg-in" style="--fg-at: 3">${t.recapLabel}</p>
        <div class="run">
          ${t.recap.map((name, p) => `
            <div class="band ${HUE[p]} fg-in" style="grid-column: ${BAND[p]}; --fg-at: ${3 + p}">
              <span class="phase-name">${name}</span><i></i>
            </div>
          `).join('')}
          <i class="rail" aria-hidden="true"></i>
          ${t.steps.map((s, i) => `
            <span class="disc ${HUE[PHASE[i]]}${s.n === '4' ? ' disc--key' : ''} fg-in" style="grid-column: ${i + 1}; --fg-at: ${5 + i}">${s.n}</span>
            <span class="nm fg-in" style="grid-column: ${i + 1}; --fg-at: ${5 + i}">${s.t}</span>
            <p class="ds fg-in" style="grid-column: ${i + 1}; --fg-at: ${5 + i}">${s.d}</p>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section26);
