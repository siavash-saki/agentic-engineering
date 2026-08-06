/* Section 9 — Read first.

   The cheapest step in the loop and the one most often skipped. This is
   a TIER C slide: the exhibit is the hero. The prompt is shown rather
   than described, because the instruction is the content — name the
   files, ask for a summary, forbid changes.

   ── What the redesign changed, and why ──────────────────────────────

   WHAT WAS REDRAWN IS ATTACHMENT, NOT THE EXHIBIT. Three diagram
   variations were built for slide 2, the deck's other exhibit slide,
   and all three were rejected: when the prompt text IS the content, a
   picture competes with it instead of serving it. So nothing here
   replaces the prompt with a drawing. The fault that was fixed is that
   the three rules used to sit in a column beside the prompt and the
   reader had to work out which rule was about which line.

   THE MAPPING WAS ALREADY IN THE CONTENT AND WAS NEVER DRAWN. The
   prompt has exactly three paragraphs and there are exactly three
   rules, in the same order. Name the files goes with line 1, ask for a
   summary with the middle block, forbid changes with the last line. So
   each rule is now physically joined to the block it governs.

   THE ROWS ARE THE ATTACHMENT. Block, chip, wire and rule are four
   items in ONE grid row, so every connector lands on its own rule by
   construction — never by a tuned percentage that drifts the moment
   the German wraps to an extra line. Do not reintroduce one. The sheet
   is a single grid item spanning all three rows behind them, so the
   exhibit still reads as one continuous document rather than three
   stacked cards.

   THE ROWS ARE CENTRED, NOT STRETCHED. A row is as tall as the taller
   of its two occupants, and rows 1 and 3 are set by the RULE, not by
   the single line of prompt beside it. Left stretched, the prompt line
   sat at the top of its row while the chip sat in the middle, so the
   wire pointed some 15px below the line it names. Centring both ends
   fixes it at any wrap.

   THE PROMPT'S SIZE IS CAPPED BY WIDTH, NOT ONLY BY HEIGHT. Every type
   token in this deck is vh-derived and .fg-wrap is capped at 1240px, so
   on a 1920x1080 projector the mono face grew with the height while the
   column it sits in did not, and the longest German line (61 mono
   characters) soft-wrapped. Measured, not guessed. Hence the min(): the
   vh token, a vw term for narrow-and-tall, and an absolute ceiling for
   the case where .fg-wrap is pinned at its maximum. The 14px floor is
   the deck's and outranks all three.

   COLOUR. Plan chapter, so blue is the chapter hue and it stays on the
   frame — the labels, and nothing else. INK IS THE HUMAN AND THE
   HUMAN'S AUTHORSHIP: the human wrote this prompt, so the numbered
   chips are ink and filled, which is also the widest contrast the
   palette has and survives greyscale intact.

   THE BREAKPOINT IS SET BY THE PROMPT, NOT BY A ROUND NUMBER. Below
   about 1180px of viewport width the longest authored line no longer
   fits a half-width column at the deck's 14px floor, and the floor
   outranks the fit. The exhibit SURVIVES the stack: an earlier version
   hid the sheet there, which on an exhibit slide deletes the content
   and keeps the commentary. Only the wires go, and each rule keeps its
   numbered chip so the mapping is not lost with them.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's09-plan-explore';

/* The prompt is carried as its three blocks — the same six lines as
   before, split where the blank lines already split them — because a
   rule has to be attachable to one of them. */
const CONTENT = {
  en: {
    h1: 'Read before writing',
    lede: `An agent that has not read your code will invent a convention for it.
           Reading is a few seconds. A wrong assumption is the rest of the
           afternoon.`,
    promptLabel: 'A first prompt, before any feature is mentioned',
    rulesLabel: 'Three things that make it work',
    blocks: [
      ['Read src/api/ and the tests under tests/api/.'],
      ['Summarise: how are requests authenticated today, where is',
       'shared middleware registered, and what do the existing tests',
       'assume about request shape?'],
      ['Change nothing. I want to agree the picture before we plan.'],
    ],
    rules: [
      { t: 'Name the files', d: 'Do not rely on a search finding the right ones. If you know where it lives, say so.' },
      { t: 'Ask for a summary', d: 'A summary you disagree with is the cheapest correction available.' },
      { t: 'Forbid changes', d: 'Without it the agent will start editing. Reading and writing are separate turns.' },
    ],
    note: `If the summary is wrong, you have found a misunderstanding for the
           price of one message. <b>That is the whole point of the step.</b>`,
  },
  de: {
    h1: 'Erst lesen, dann schreiben',
    lede: `Ein Agent, der deinen Code nicht gelesen hat, erfindet eine Konvention
           dafür. Lesen kostet Sekunden. Eine falsche Annahme kostet den Rest
           des Nachmittags.`,
    promptLabel: 'Ein erster Prompt, bevor ein Feature überhaupt erwähnt wird',
    rulesLabel: 'Drei Dinge, die es funktionieren lassen',
    blocks: [
      ['Lies src/api/ und die Tests unter tests/api/.'],
      ['Fasse zusammen: Wie werden Requests heute authentifiziert, wo',
       'wird gemeinsame Middleware registriert, und was nehmen die',
       'bestehenden Tests über die Request-Struktur an?'],
      ['Ändere nichts. Ich will das Bild klären, bevor wir planen.'],
    ],
    rules: [
      { t: 'Dateien benennen', d: 'Nicht darauf verlassen, dass eine Suche die richtigen findet. Wenn du den Ort kennst, nenn ihn.' },
      { t: 'Zusammenfassung verlangen', d: 'Eine Zusammenfassung, der du widersprichst, ist die billigste Korrektur, die es gibt.' },
      { t: 'Änderungen verbieten', d: 'Ohne das fängt der Agent an zu editieren. Lesen und Schreiben sind getrennte Züge.' },
    ],
    note: `Ist die Zusammenfassung falsch, hast du ein Missverständnis für den
           Preis einer Nachricht gefunden. <b>Genau dafür ist der Schritt da.</b>`,
  },
};

/* One span per AUTHORED line. The prompt's line breaks are the author's;
   a soft wrap is the layout's, and the two have to be told apart or the
   exhibit stops looking like a real message. The columns are sized so no
   line wraps at any stage this is shown on, but the deck runs on
   projectors nobody measured — if one ever does wrap it hangs under its
   own line instead of impersonating a new one. */
const lines = b => b.map(l => `<span class="ln">${l || '&nbsp;'}</span>`).join('');

class Section09 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-7);
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
          /* The width-aware cap described in the header comment. Declared
             on the section so it inherits to the exhibit and nowhere else. */
          --pr-fs: max(14px, min(calc(var(--ae-fs-small) * 0.96), 1.24vw, 16.5px));
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1": the body must grow into spare space — that is
           what centres the exhibit in the frame — but it must never SHRINK
           below its content. With the default shrink factor the stacked
           narrow layout was squeezed inside a body shorter than itself and
           the last rule painted straight through the takeaway note instead
           of the slide scrolling. "safe center" covers the other half: when
           content does exceed the frame, centring falls back to flex-start
           so the top stays reachable. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0 0 var(--ae-space-5); max-width: 66ch; }

        /* A label is metadata about the frame, not body text, so it is where
           the chapter hue is allowed to live. */
        ${TAG} .lbl { color: var(--fg-plan); margin: 0 0 var(--ae-space-3); }

        /* The prompt is the literal source of a message, so it takes the
           mono face — the deck's rule, unchanged. */
        ${TAG} .src {
          margin: 0;
          font-family: var(--ae-font-mono);
          white-space: pre-wrap;
          color: var(--fg-ink);
        }
        ${TAG} .src .ln { display: block; padding-left: 1.5em; text-indent: -1.5em; }

        /* The attachment chip. Ink and filled, because the human wrote the
           line it points at. */
        ${TAG} .chip {
          display: inline-flex; align-items: center; justify-content: center; flex: none;
          width: 26px; height: 26px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: 14px; font-weight: 700;
          line-height: 1; font-variant-numeric: tabular-nums;
        }

        /* ═══════════ the margin ═══════════
           The exhibit gets the wider half. It is sized off the LONGEST
           AUTHORED LINE — 61 mono characters, the German second block —
           because the moment that line soft-wraps the panel stops reading
           as a message someone sent. */
        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) clamp(36px, 4.6vw, 78px) minmax(0, 0.82fr);
          align-items: stretch;
        }
        ${TAG} .lbl-a { grid-column: 1; grid-row: 1; }
        ${TAG} .lbl-b { grid-column: 3; grid-row: 1; }
        ${TAG} .sheet {
          grid-column: 1; grid-row: 2 / span 3;
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          border-radius: var(--ae-radius-lg);
          box-shadow: var(--fg-d2);
        }
        /* The blocks sit in the same cells as the sheet and later in the DOM,
           so they paint on top of it. Their padding is the sheet's padding. */
        ${TAG} .blk {
          grid-column: 1; position: relative; z-index: 1;
          display: flex; align-items: center;
          padding: var(--ae-space-5);
        }
        ${TAG} .blk--2, ${TAG} .blk--3 { border-top: 1px solid var(--fg-hair); }
        ${TAG} .blk .src { flex: 1; min-width: 0; font-size: var(--pr-fs); line-height: 1.85; }

        /* The chip hangs half over the sheet's edge — it is ON the exhibit,
           not next to it — and the wire leaves from its far side. Negative
           margin, not absolute positioning, so it cannot drift out of its row. */
        ${TAG} .att {
          grid-column: 2; align-self: center;
          display: flex; align-items: center; margin-left: -13px;
        }
        ${TAG} .att .wire {
          flex: 1; height: 0;
          border-top: 2px dotted var(--ae-cool-gray-400);
        }
        /* The vertical padding is what separates one rule from the next: with
           the rows packed to zero gap — they have to be, or the sheet behind
           them would show paper stripes — rule 1 ended a line above rule 2's
           heading. */
        ${TAG} .rule {
          grid-column: 3; align-self: center;
          padding: var(--ae-space-5) 0 var(--ae-space-5) var(--ae-space-2);
        }
        ${TAG} .rule h3 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1.12; color: var(--fg-ink);
        }
        ${TAG} .rule p {
          margin: 6px 0 0;
          font-size: var(--ae-fs-body); line-height: 1.4; color: var(--fg-body);
        }

        @media (max-width: 1180px) {
          ${TAG} .grid { grid-template-columns: 1fr; }
          ${TAG} .lbl-a { grid-column: 1; grid-row: 1; }
          ${TAG} .sheet { grid-column: 1; grid-row: 2 / span 3; }
          ${TAG} .blk   { grid-column: 1; }
          /* The blocks are pinned to rows 2–4 by inline style and the sheet
             still spans them; everything else is auto-placed after row 4, in
             DOM order: chip, rule, chip, rule. Hence the !important — it is
             overriding an inline grid-row, which nothing else can. */
          ${TAG} .att, ${TAG} .rule { grid-column: 1; grid-row: auto !important; }
          ${TAG} .lbl-b { grid-column: 1; grid-row: 5; margin-top: var(--ae-space-5); }
          ${TAG} .att { margin-left: 0; align-self: end; margin-top: var(--ae-space-4); }
          ${TAG} .att .wire { display: none; }
          ${TAG} .rule { align-self: start; padding: var(--ae-space-2) 0 0; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="grid">
          <p class="fg-label lbl lbl-a fg-in" style="--fg-at: 3">${t.promptLabel}</p>
          <p class="fg-label lbl lbl-b fg-in" style="--fg-at: 3">${t.rulesLabel}</p>
          <div class="sheet fg-in" style="--fg-at: 3"></div>
          ${t.blocks.map((b, i) => `
            <div class="blk blk--${i + 1} fg-in" style="grid-row: ${2 + i}; --fg-at: ${4 + i * 2}">
              <p class="src">${lines(b)}</p>
            </div>
            <div class="att fg-in" aria-hidden="true" style="grid-row: ${2 + i}; --fg-at: ${5 + i * 2}">
              <span class="chip">${i + 1}</span><i class="wire"></i>
            </div>
            <div class="rule fg-in" style="grid-row: ${2 + i}; --fg-at: ${5 + i * 2}">
              <h3>${t.rules[i].t}</h3>
              <p>${t.rules[i].d}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 12"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section09);
