/* Section 11 — What the plan holds.

   The densest slide in the Plan chapter, and it carries two shapes at
   once: an inclusion / exclusion rule, and a paired contrast that
   applies it. One worked line shows the same requirement written as
   behaviour and as mechanism. The second version is the one that makes
   review impossible, which is why it is on the slide.

   ── What the redesign changed, and why ──────────────────────────────

   THE TWO SHAPES ARE THE SAME DISTINCTION AT TWO ZOOM LEVELS. The
   lists say what belongs in the file and what does not; the pair is one
   requirement sorted by that same rule. So the device that carries both
   is A BOUNDARY WHOSE TWO SIDES ARE THEMSELVES A CONTRAST: the card IS
   PLAN.md, what it holds and the behaviour version live inside it, its
   bottom edge is the rule, and the four forbidden kinds plus the
   mechanism version sit below on the bare paper. One line, both jobs.
   The old layout said the same thing with four unrelated boxes.

   THE TWO ROWS SHARE ONE COLUMN TEMPLATE, so the lists align down the
   left and the pair aligns down the right ACROSS the boundary. That
   alignment is what makes the second shape readable at all: the two
   versions of the requirement sit one above the other, separated by
   exactly the line the lists describe. Break the shared template and
   the slide loses its argument, not just its tidiness.

   THE TRANSPARENT BORDER IS LOAD-BEARING. The outside row and the
   header row each carry a 1.5px TRANSPARENT border, matching the
   weight of the card's real one, so the row outside the file has the
   identical box model to the row inside it. Without it the card's edge
   shifted every column one pixel between the two rows, and alignment
   across the boundary is the whole device. Do not delete it as dead
   styling.

   THE DOCUMENT IS INK-EDGED, NOT BLUE. That is the cast's document
   form — slide 7 draws PLAN.md the same way — kept so the file here is
   recognisably the file gate 1 approved. Blue is spent on the marks
   inside it. Clay is what is excluded and what goes wrong. Every
   coloured distinction also carries a form cue, because all five hues
   collapse to one grey: solid rule vs dashed rule, tick vs cross,
   raised white card vs flat paper.

   THE TAB RIDES THE TOP EDGE and is not floated above it: a gap would
   turn it into a caption instead of a filename.

   THIS IS THE TIGHTEST-FITTING SLIDE OF ITS SET. Nine list rows, two
   quoted sentences and two tags inside one frame. If anything is added
   here, something has to leave.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and one backtick ends the string
   and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's11-plan-write';

const CONTENT = {
  en: {
    h1: 'What goes in the file',
    lede: `A plan describes behaviour. The moment it describes mechanism, it has
           made the decisions the model would have made better — and review has
           lost the yardstick it was supposed to hold.`,
    file: 'PLAN.md',
    holdsLabel: 'It holds',
    holds: [
      'The context: what exists today, and what is changing',
      'What the system should do, in the user\'s terms',
      'Acceptance criteria — checkable, one line each',
      'What is explicitly out of scope',
      'Open questions, if any are still open',
    ],
    neverLabel: 'It never holds',
    never: [
      'Function names or signatures',
      'Code, or pseudo-code',
      'Which file a change goes in, line by line',
      'The data structure the model should pick',
    ],
    exLabel: 'The same requirement, twice',
    good: 'Requests over the limit are rejected with 429 and a Retry-After header giving the seconds until the window resets.',
    goodTag: 'Behaviour — checkable, and the how stays open',
    bad: 'Add a checkLimit() call at the top of handleRequest() that reads the counter from Redis and throws RateLimitError.',
    badTag: 'Mechanism — three decisions made, none of them checkable',
    note: `If the file is getting long, it has started describing the
           implementation. <b>Length is the symptom, not the problem.</b>`,
  },
  de: {
    h1: 'Was in die Datei gehört',
    lede: `Ein Plan beschreibt Verhalten. Sobald er Mechanik beschreibt, hat er
           Entscheidungen getroffen, die das Modell besser getroffen hätte — und
           dem Review fehlt der Maßstab, den es halten sollte.`,
    file: 'PLAN.md',
    holdsLabel: 'Er enthält',
    holds: [
      'Den Kontext: was heute existiert und was sich ändert',
      'Was das System tun soll, in der Sprache der Nutzung',
      'Akzeptanzkriterien — prüfbar, je eine Zeile',
      'Was ausdrücklich nicht dazugehört',
      'Offene Fragen, falls noch welche offen sind',
    ],
    neverLabel: 'Er enthält nie',
    never: [
      'Funktionsnamen oder Signaturen',
      'Code oder Pseudo-Code',
      'In welche Datei eine Änderung gehört, Zeile für Zeile',
      'Die Datenstruktur, die das Modell wählen soll',
    ],
    exLabel: 'Dieselbe Anforderung, zweimal',
    good: 'Requests über dem Limit werden mit 429 abgelehnt, mit einem Retry-After-Header, der die Sekunden bis zum Fensterwechsel angibt.',
    goodTag: 'Verhalten — prüfbar, und das Wie bleibt offen',
    bad: 'Füge oben in handleRequest() einen checkLimit()-Aufruf ein, der den Zähler aus Redis liest und RateLimitError wirft.',
    badTag: 'Mechanik — drei Entscheidungen getroffen, keine davon prüfbar',
    note: `Wird die Datei lang, beschreibt sie inzwischen die Implementierung.
           <b>Die Länge ist das Symptom, nicht das Problem.</b>`,
  },
};

const list = (items, kind) =>
  `<ul class="lst lst--${kind}">${items.map(s => `<li><span>${s}</span></li>`).join('')}</ul>`;

class Section11 extends HTMLElement {
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
        /* "1 0 auto", not "1". This is the tightest-fitting slide in the
           chapter, and with the default shrink factor an over-tall body
           silently SHRINKS ITS OWN BOX and paints outside it: the section
           still reports scrollHeight === clientHeight, so it does not even
           offer to scroll, and the last forbidden kind is painted over by
           the takeaway. Measured in German at a 640px viewport. Refusing to
           shrink turns that into an honest scroll. At the sizes this is
           actually shown at the body has spare room, so nothing moves. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* h2, not h1: the frame is already carrying nine list rows and two
           quoted sentences, and the title is the one thing that can give
           room back without losing a distinction. */
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede {
          margin: 0; max-width: 84ch;
          font-size: var(--ae-fs-body); line-height: 1.42;
        }

        /* ── the filename tab that sits on the file's top edge ── */
        ${TAG} .tab {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 12px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-caption); line-height: 1.3;
          font-weight: 600; white-space: nowrap;
        }

        /* ── the two lists. Solid blue rule vs dashed clay rule is the
              greyscale-safe half of the in/out distinction; the tick and
              the cross are the other half. ── */
        ${TAG} .lst { margin: var(--ae-space-3) 0 0; padding: 0 0 0 var(--ae-space-4); list-style: none; }
        ${TAG} .lst li {
          display: grid; grid-template-columns: auto minmax(0, 1fr);
          column-gap: var(--ae-space-3); align-items: baseline;
          padding: 3px 0;
          font-size: var(--ae-fs-small); line-height: 1.4;
        }
        ${TAG} .lst li::before { font-weight: 700; }
        ${TAG} .lst--in  { border-left: 2px solid var(--fg-plan); }
        ${TAG} .lst--in  li { color: var(--fg-body); }
        ${TAG} .lst--in  li::before { content: "\\2713"; color: var(--fg-plan); }
        ${TAG} .lst--out { border-left: 2px dashed var(--fg-fail); }
        ${TAG} .lst--out li { color: var(--fg-fail-d); }
        ${TAG} .lst--out li::before { content: "\\2715"; color: var(--fg-fail); }

        /* ── the worked pair ── */
        ${TAG} .ex { border-radius: var(--ae-radius); padding: var(--ae-space-4) var(--ae-space-5); }
        ${TAG} .ex--good { background: var(--fg-plan-tint); border: 1.5px solid var(--fg-plan); }
        ${TAG} .ex--bad  { background: var(--fg-fail-tint); border: 1.5px dashed var(--fg-fail); }
        ${TAG} .ex .src {
          margin: 0;
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-small) * 0.95); line-height: 1.55;
          color: var(--fg-ink);
        }
        ${TAG} .ex .tag {
          display: flex; gap: var(--ae-space-2); align-items: baseline;
          margin: var(--ae-space-3) 0 0;
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 600;
        }
        ${TAG} .ex--good .tag { color: var(--fg-plan-d); }
        ${TAG} .ex--good .tag::before { content: "\\2713"; flex: none; font-weight: 700; }
        ${TAG} .ex--bad .tag { color: var(--fg-fail-d); }
        ${TAG} .ex--bad .tag::before { content: "\\2715"; flex: none; font-weight: 700; }

        /* ═══════════ the boundary ═══════════ */
        ${TAG} .zones { display: grid; row-gap: var(--ae-space-4); }
        ${TAG} .row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr);
          column-gap: var(--ae-space-6);
          align-items: start;
        }
        ${TAG} .hdr { align-items: end; padding: 0 var(--ae-space-6); border: 1.5px solid transparent; }
        ${TAG} .hdr .fg-label { margin: 0; }
        ${TAG} .infile {
          position: relative;
          background: var(--fg-card);
          border: 1.5px solid var(--fg-ink);
          border-radius: var(--ae-radius-lg);
          box-shadow: var(--fg-d2);
          padding: var(--ae-space-5) var(--ae-space-6);
        }
        /* The tab rides the top edge, so the card reads as a named file
           rather than as one more panel. Placed on the edge itself and not
           above it: a gap would make it a caption. */
        ${TAG} .tab { position: absolute; top: 0; left: var(--ae-space-6); transform: translateY(-52%); }
        ${TAG} .infile .fg-label { margin: var(--ae-space-2) 0 0; }
        /* A transparent border of the card's own weight, so the row outside
           the file has the identical box model to the row inside it. Without
           it the card's 1.5px edge shifted every column one pixel between the
           two rows, and the alignment ACROSS the boundary is the whole
           device. */
        ${TAG} .outfile { padding: 0 var(--ae-space-6); border: 1.5px solid transparent; }
        ${TAG} .outfile .fg-label { margin: 0; color: var(--fg-fail-d); }
        ${TAG} .stub { min-width: 0; }

        @media (max-width: 1000px) {
          ${TAG} .row { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .hdr .stub { display: none; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="zones">
          <div class="row hdr fg-in" style="--fg-at: 3">
            <span class="stub"></span>
            <p class="fg-label">${t.exLabel}</p>
          </div>
          <div class="row infile fg-in" style="--fg-at: 3">
            <span class="tab">${t.file}</span>
            <div>
              <p class="fg-label">${t.holdsLabel}</p>
              ${list(t.holds, 'in')}
            </div>
            <div class="ex ex--good fg-in" style="--fg-at: 5">
              <p class="src">${t.good}</p>
              <p class="tag">${t.goodTag}</p>
            </div>
          </div>
          <div class="row outfile fg-in" style="--fg-at: 6">
            <div>
              <p class="fg-label">${t.neverLabel}</p>
              ${list(t.never, 'out')}
            </div>
            <div class="ex ex--bad fg-in" style="--fg-at: 7">
              <p class="src">${t.bad}</p>
              <p class="tag">${t.badTag}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 9"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section11);
