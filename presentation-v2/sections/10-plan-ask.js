/* Section 10 — Make it ask.

   The questions are the content of this slide, not the instruction that
   produces them. Four real questions about a small feature, each one a
   decision that would otherwise have been made silently.

   ── What the redesign changed, and why ──────────────────────────────

   SLIDE 10 IS AN EXCHANGE: you say one thing, it asks back. The old
   layout was a card, a list and a card — nothing in it alternated,
   which is the one thing the slide is about. This drawing states the
   direction: your sentence is a single ink-edged bar across the top,
   and under it stand the four questions, each on a connector that
   points UP into the bar. The arrows run against the reading direction
   on purpose. The slide's verb is "asks back", and nothing else on the
   slide says so.

   THE PROSE STAYS THE CONTENT. Slide 2 had three diagram variations
   rejected because the prompt text WAS the content and a picture
   competed with it. The same trap is live here: the four questions are
   the exhibit. So the drawing never illustrates them — it only draws
   the STRUCTURE around them, which is whose turn it is.

   THE TWO SIDES, AND THE ASYMMETRY:
     the human's turn  — a 1.5px INK edge and a filled ink disc. Hard,
       definite, uncoloured, exactly as slide 7 draws a gate.
     the machine's turn — a blue tint wash and a hollow blue ring. Soft
       plumbing, given real area because the questions are where the
       requirements turn out to be hiding, but never given the ink.

   The wash is a wash and never a coloured edge bar: the 0002 spec
   forbids the bar and the slide kit says so.

   ARROWHEADS ARE CSS BORDERS, NOT SVG MARKERS. A stretched viewBox
   turns a rounded corner into an ellipse and an arrowhead into a smear;
   a border triangle cannot distort at any width.

   THE ARROWHEAD JOIN IS DERIVED, NOT EYEBALLED. The head is 9px tall
   and the tie block is dropped 8px (--ae-space-2, one of the two fixed
   spacing steps) below the ink box, so the apex lands 1px INSIDE the
   1.5px ink edge and the return arrives AT the box rather than stopping
   short of it. Change either number and the arrows stop touching:
   --ae-space-2 must stay a fixed 8px for this to hold, which it is.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's10-plan-ask';

/* you / turnYou / turnBack are the speaker names the exchange needs in
   order to be drawn as an exchange at all. Everything else is the text
   the slide already carried, word for word. */
const CONTENT = {
  en: {
    h1: 'Make it ask',
    lede: `A model that does not ask will guess, and a guess comes back looking
           exactly like an answer. So require the questions.`,
    you: 'You',
    turnYou: 'Your turn',
    turnBack: 'It asks back',
    instrLabel: 'The instruction',
    instr: 'We need rate limiting on the public API. Do not write anything yet. Ask me every question you need answered to write the plan without guessing.',
    qLabel: 'What comes back',
    questions: [
      'Per API key, per IP address, or per authenticated user?',
      'A fixed window or a sliding one? The existing cache supports both.',
      'What should a rejected request return — 429 with a Retry-After, or a queued response?',
      'Do internal service calls count against the same limit?',
    ],
    answerLabel: 'Why this matters',
    answer: `Four questions, four decisions. Without them the agent picks one
             answer for each — per IP, fixed window, plain 429, internal calls
             included — and all four are defensible, and none of them are yours.`,
    note: `The questions are where the requirements actually are.
           <b>You do not know what you left out until something asks.</b>`,
  },
  de: {
    h1: 'Fragen lassen',
    lede: `Ein Modell, das nicht fragt, rät — und ein geratener Wert kommt
           zurück und sieht aus wie eine Antwort. Also verlang die Fragen.`,
    you: 'Du',
    turnYou: 'Dein Zug',
    turnBack: 'Er fragt zurück',
    instrLabel: 'Die Anweisung',
    instr: 'Wir brauchen Rate-Limiting auf der öffentlichen API. Schreib noch nichts. Stell mir jede Frage, die du beantwortet brauchst, um den Plan ohne Raten zu schreiben.',
    qLabel: 'Was zurückkommt',
    questions: [
      'Pro API-Key, pro IP-Adresse oder pro authentifiziertem Nutzer?',
      'Festes Zeitfenster oder gleitendes? Der bestehende Cache kann beides.',
      'Was gibt ein abgelehnter Request zurück — 429 mit Retry-After oder eine Queue-Antwort?',
      'Zählen interne Service-Aufrufe gegen dasselbe Limit?',
    ],
    answerLabel: 'Warum das zählt',
    answer: `Vier Fragen, vier Entscheidungen. Ohne sie wählt der Agent je eine
             Antwort — pro IP, festes Fenster, schlichtes 429, interne Aufrufe
             inbegriffen — und alle vier sind vertretbar, und keine davon ist deine.`,
    note: `In den Fragen stecken die Anforderungen.
           <b>Was fehlt, merkt man erst, wenn etwas nachfragt.</b>`,
  },
};

class Section10 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        /* space-5, not space-6: this is a tier C slide carrying a real
           artifact, and it takes the tighter frame padding the other
           exhibit slides use. */
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-4);
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1". With the default shrink factor an over-tall
           body silently SHRINKS ITS OWN BOX and paints outside it: the
           section still reports scrollHeight === clientHeight, so it does
           not even offer to scroll, and the closing line lands on top of
           the takeaway. Measured in German at 1024x640. Refusing to shrink
           turns that into an honest scroll, and at the sizes this is
           actually shown at the body has spare room, so nothing moves. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 64ch; line-height: 1.4; }

        /* ── the two markers ──
           Filled ink disc = a person. Hollow hued ring = the machine. The
           pair is already taught on slide 7 and it survives greyscale,
           which is the whole reason the deck owns it. */
        ${TAG} .mk { flex: none; width: 16px; height: 16px; border-radius: 999px; }
        ${TAG} .mk--you   { background: var(--fg-ink); }
        ${TAG} .mk--agent { background: var(--fg-paper); border: 4px solid var(--fg-plan); }

        /* A speaker line: who is talking, then what this block is. */
        ${TAG} .spk { display: flex; align-items: center; gap: var(--ae-space-3); }
        ${TAG} .spk .who {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700;
          letter-spacing: 0.04em; color: var(--fg-ink);
        }
        ${TAG} .spk .bar { width: 1px; height: 13px; background: var(--fg-hair); }
        ${TAG} .spk .lb {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600;
          letter-spacing: 0.02em; color: var(--fg-muted);
        }

        /* Capped measure. Unbounded, the instruction ran to 130 monospace
           characters and left one word alone on the second line — a long
           line of mono is also the hardest thing on the slide to read from
           the back of a room. */
        ${TAG} .prompt {
          margin: var(--ae-space-3) 0 0; max-width: 100ch;
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-small) * 0.94);
          line-height: 1.5; color: var(--fg-ink);
        }

        /* The human's box: white, ink-edged. The same object as the doc and
           the gate panels on slide 7, so every hard-edged thing in the deck
           is one family. */
        ${TAG} .inkbox {
          border-radius: var(--ae-radius-lg);
          background: var(--fg-card);
          border: 1.5px solid var(--fg-ink);
          box-shadow: var(--fg-d1);
          padding: var(--ae-space-3) var(--ae-space-5);
        }

        /* ═══════════ the return ═══════════
           space-2 is one of the deck's two FIXED spacing steps. The
           arrowhead geometry below is derived from it, so it must stay 8px. */
        ${TAG} .back { margin-top: var(--ae-space-2); }
        ${TAG} .ties {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: var(--ae-space-4);
          height: clamp(22px, 3.4vh, 34px);
        }
        ${TAG} .tie {
          position: relative; justify-self: center;
          width: 2px; height: 100%; background: var(--ae-cool-gray-300);
          animation: s10-tie 420ms var(--ae-ease) both;
          transform-origin: bottom center;
        }
        @keyframes s10-tie { from { transform: scaleY(0); } }
        /* The head's apex lands one pixel inside the ink edge, so the return
           arrives at the box rather than stopping just short of it. */
        ${TAG} .tie::before {
          content: ''; position: absolute; left: -4px; top: -9px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 9px solid var(--ae-cool-gray-300);
        }

        ${TAG} .backlbl {
          display: flex; align-items: center; gap: var(--ae-space-3);
          margin: var(--ae-space-3) 0 var(--ae-space-3);
        }
        ${TAG} .backlbl .who {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 700;
          letter-spacing: 0.04em; color: var(--fg-plan-d);
        }
        ${TAG} .backlbl .rule { flex: 1; height: 1px; background: var(--fg-hair); }
        ${TAG} .backlbl .lb {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600; color: var(--fg-muted);
        }

        ${TAG} .cols {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: var(--ae-space-4); align-items: stretch;
        }
        ${TAG} .col {
          display: flex; flex-direction: column; gap: var(--ae-space-3);
          padding: var(--ae-space-4);
          border-radius: var(--ae-radius);
          background: var(--fg-plan-tint);
          border: 1px solid var(--fg-hair);
        }
        ${TAG} .ring {
          flex: none; width: 24px; height: 24px; border-radius: 999px;
          border: 2px solid var(--fg-plan); color: var(--fg-plan);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          font-weight: 700; line-height: 1;
        }
        ${TAG} .col p {
          margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          color: var(--fg-ink);
        }

        /* The closing line: not a footnote in grey. Same device as the price
           line on slide 6 — a tag word, then the sentence at reading size. */
        ${TAG} .whyline {
          display: flex; gap: var(--ae-space-4); align-items: baseline;
          margin: var(--ae-space-5) 0 0;
          font-size: var(--ae-fs-body); line-height: 1.4; color: var(--fg-body);
        }
        ${TAG} .whyline .tagword {
          flex: none;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--fg-faint);
        }

        @media print { ${TAG} .tie { animation: none !important; } }

        @media (max-width: 1000px) {
          ${TAG} .ties { display: none; }
          ${TAG} .cols { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="inkbox said fg-in" style="--fg-at: 3">
          <div class="spk">
            <span class="mk mk--you"></span>
            <span class="who">${t.you}</span>
            <i class="bar"></i>
            <span class="lb">${t.turnYou} &middot; ${t.instrLabel}</span>
          </div>
          <p class="prompt">${t.instr}</p>
        </div>
        <div class="back">
          <div class="ties" aria-hidden="true">
            ${t.questions.map((q, i) => `
              <i class="tie" style="animation-delay: calc(60ms + ${5 + i} * var(--fg-beat))"></i>
            `).join('')}
          </div>
          <div class="backlbl fg-in" style="--fg-at: 5">
            <span class="mk mk--agent"></span>
            <span class="who">${t.turnBack}</span>
            <span class="lb">${t.qLabel}</span>
            <i class="rule"></i>
          </div>
          <div class="cols">
            ${t.questions.map((q, i) => `
              <div class="col fg-in" style="--fg-at: ${6 + i}">
                <span class="ring" aria-hidden="true">?</span>
                <p>${q}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <p class="whyline fg-in" style="--fg-at: 10">
          <span class="tagword">${t.answerLabel}</span>
          <span>${t.answer}</span>
        </p>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 11"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section10);
