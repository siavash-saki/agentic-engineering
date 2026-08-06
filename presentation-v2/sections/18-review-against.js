/* Section 19 — Walk the criteria, one row at a time.

   A real verification table, with one row deliberately not passing. The
   pending row IS the content: a record that says "not verified" truthfully
   is worth more than one that says "pass" convincingly.

   DESIGN.md's verdict on this slide is "agrees — genuinely tabular", with
   one instruction: MAKE THE PENDING ROW THE CLIMAX. So the table's shape
   is kept and only its weighting changes. The three passes are set as a
   quiet run at small size with grey evidence; the fourth row breaks the
   run — a full-bleed wash to the card's edges, its criterion bumped to
   body size, its evidence at lead size in the deep hue rather than grey,
   a rule above it heavier than the hairlines between the passes, and a
   ringed pill. The eye lands on the bottom row, which is where the
   content is.

   ── The two bugs this fixes, both live in the shipping slide ─────────

   1. THE PENDING BADGE WAS CLAY. It was drawn with --ae-error, the deck's
      failure colour. The talk's whole point one slide later is that "not
      verified" is NOT failure — it is a precise statement about missing
      evidence. Rendering it in the failure hue said the opposite of the
      argument, in the one place the argument was on screen. It is ochre
      now, which is the hue the palette added for exactly this.

   2. THE PENDING ROW WAS GREY. --ae-cool-gray-100 is the colour of a
      switched-off thing, so the row the takeaway calls "the useful
      output" was the one row rendered as background. Grey de-emphasises;
      this row is the climax.

   THE OPEN-CIRCLE GLYPH IS SCALED, AND HAS TO BE. U+25E6 is drawn at
   about a third of its em box, so beside a checkmark at the same
   font-size it reads as a middot — a separator, not a verdict. That
   silently deletes the form half of the not-verified cue, which is the
   half that has to survive greyscale. It is set at 2.1em with a
   collapsed line box, so the circle carries the checkmark's optical
   weight without opening the line it sits in. Do not "tidy" it back to
   1em.

   THE TINT BLEEDS TO THE CARD'S EDGES because the card's horizontal
   padding lives on the cells, not on the card, and the card has no
   bottom padding — the climax row supplies it. A padded card inset the
   climax row and made it look like a footnote rather than the end of the
   ledger.

   COLOUR BUDGET, stated deliberately. Plum is the chapter and lives on
   ONE device: the rule under the column heads. The content carries
   exactly two state hues, green and ochre, because this slide has
   exactly two verdicts on it. CLAY IS ABSENT ON PURPOSE — no row here is
   wrong, so the third verdict is not taught on this slide.

   THE TAKEAWAY IS OCHRE, NOT MINT. .fg-note is mint deck-wide, but on
   this slide mint now means "pass", and the sentence inside the block
   says the gap is the useful output. A mint block would spend the pass
   colour on the not-verified argument. Slide 20 makes the same change
   for the same reason, so the chapter stays consistent. One rule, two
   lines to revert.

   (No backticks anywhere in these comments or in the CSS: this block
   sits inside a JS template literal, and a backtick ends the string.
   It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's18-review-against';

/* The third column used to be an empty string. It is named now — the
   word the lede already uses — because the moment that column became the
   thing the slide argues about it stopped being a decoration hanging off
   the end of the row. Every criterion, every evidence string, both
   verdict labels and the takeaway are unchanged in both languages. */
const CONTENT = {
  en: {
    h1: 'Walk the criteria, one row at a time',
    lede: `The acceptance criteria from the plan, each with what was actually
           done to check it. The evidence column is the slide — a verdict with
           nothing next to it is an opinion.`,
    cols: ['Acceptance criterion', 'Evidence', 'Verdict'],
    rows: [
      { c: 'Requests over the limit return 429 with Retry-After',
        e: 'Integration test: 101st request in the window; asserts status and header value',
        v: 'pass' },
      { c: 'The limit is per API key, not per IP',
        e: 'Test: two keys from one IP, both served; one key from two IPs, second rejected',
        v: 'pass' },
      { c: 'Internal service calls are exempt',
        e: 'Test drives the internal path with the header present and absent',
        v: 'pass' },
      { c: 'Counters survive a process restart',
        e: 'Not tested. Restart behaviour depends on the shared cache; no test drives it',
        v: 'pending' },
    ],
    verdicts: { pass: 'Pass', pending: 'Not verified' },
    note: `Four rows, three passes, one honest gap. <b>The gap is the useful
           output.</b> Nobody would have found it by asking whether the feature
           works.`,
  },
  de: {
    h1: 'Die Kriterien durchgehen, Zeile für Zeile',
    lede: `Die Akzeptanzkriterien aus dem Plan, je mit dem, was tatsächlich zur
           Prüfung getan wurde. Die Belegspalte ist der Inhalt dieser Folie —
           ein Urteil ohne Beleg ist eine Meinung.`,
    cols: ['Akzeptanzkriterium', 'Beleg', 'Urteil'],
    rows: [
      { c: 'Requests über dem Limit liefern 429 mit Retry-After',
        e: 'Integrationstest: 101. Request im Fenster; prüft Status und Header-Wert',
        v: 'pass' },
      { c: 'Das Limit gilt pro API-Key, nicht pro IP',
        e: 'Test: zwei Keys von einer IP, beide bedient; ein Key von zwei IPs, zweiter abgelehnt',
        v: 'pass' },
      { c: 'Interne Service-Aufrufe sind ausgenommen',
        e: 'Test fährt den internen Pfad mit und ohne den Header',
        v: 'pass' },
      { c: 'Zähler überstehen einen Prozess-Neustart',
        e: 'Nicht getestet. Das Neustartverhalten hängt am gemeinsamen Cache; kein Test fährt es',
        v: 'pending' },
    ],
    verdicts: { pass: 'Bestanden', pending: 'Nicht geprüft' },
    note: `Vier Zeilen, drei bestanden, eine ehrliche Lücke. <b>Die Lücke ist das
           nützliche Ergebnis.</b> Über die Frage, ob das Feature funktioniert,
           hätte sie niemand gefunden.`,
  },
};

/* A verdict is a hue AND a glyph, never a hue alone. Only two of the
   deck's three appear here. */
const GLYPH  = { pass: '✓', pending: '◦' };
const VCLASS = { pass: 'v-pass', pending: 'v-wait' };

/* The pending row's evidence opens on a two-word sentence that is the
   whole verdict — "Not tested." / "Nicht getestet." Everything after it
   is the reason. Splitting on the first sentence end sets the verdict in
   bold and leaves the reason at normal weight, in both languages,
   without either string being rewritten. */
function leadSplit(s) {
  const i = s.indexOf('. ');
  if (i < 0) return s;
  return '<span class="lead">' + s.slice(0, i + 1) + '</span> ' + s.slice(i + 2);
}

class Section18 extends HTMLElement {
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
        }
        ${TAG} .head { flex: none; }
        /* "1 0 auto", not "1": the body must grow into spare space — that
           is what centres the ledger — but it must never SHRINK below its
           content. With a zero basis it takes exactly the leftover space
           and any excess paints straight through the takeaway instead of
           scrolling: a silent spill, which is worse than a scrollbar
           because nothing reports it. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0 0 var(--ae-space-5); max-width: 72ch; }

        /* Ochre, not mint — see the header note. */
        ${TAG} .fg-note { background: var(--fg-wait-tint); color: var(--fg-wait-d); }
        ${TAG} .fg-note::before { color: var(--fg-wait); }

        /* ── the verdict vocabulary ──
           One scoped triple per verdict, so a row states its verdict once
           and every mark inside it recolours. */
        ${TAG} .v-pass { --vd: var(--fg-build); --vd-d: var(--fg-build-d); --vd-tint: var(--fg-build-tint); }
        ${TAG} .v-wait { --vd: var(--fg-wait);  --vd-d: var(--fg-wait-d);  --vd-tint: var(--fg-wait-tint); }

        /* The glyph never carries italics — it is a mark, not emphasis. */
        ${TAG} i { font-style: normal; }
        /* Scaled so the open circle reads as open. See the header note. */
        ${TAG} .v-wait i {
          font-size: 2.1em; line-height: 0.45;
          position: relative; top: 0.1em;
        }

        /* ── the ledger ──
           No bottom padding on the card: the climax is the last row, and a
           strip of white under its wash made the tint stop short of the
           card edge and read as a footnote rather than as the end of the
           ledger. The row supplies the card's bottom padding itself, so
           the ochre runs into the corner. */
        ${TAG} .tbl { padding: var(--ae-space-5) 0 0; overflow: hidden; }
        ${TAG} table { width: 100%; border-collapse: collapse; }
        ${TAG} th {
          text-align: left; font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 600; letter-spacing: 0.02em; color: var(--fg-muted);
          padding: 0 var(--ae-space-4) var(--ae-space-3) 0;
          border-bottom: 2px solid var(--fg-review);
        }
        ${TAG} td {
          padding: var(--ae-space-4) var(--ae-space-4) var(--ae-space-4) 0;
          border-bottom: 1px solid var(--fg-hair);
          vertical-align: top;
          font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
        }
        ${TAG} th.c, ${TAG} td.c { padding-left: var(--ae-space-6); }
        ${TAG} th.v, ${TAG} td.v {
          padding-right: var(--ae-space-6); text-align: right; white-space: nowrap;
        }
        ${TAG} td.c { width: 31%; color: var(--fg-ink); font-weight: 600; }
        ${TAG} td.e { color: var(--fg-muted); }
        ${TAG} tbody tr:last-child td { border-bottom: 0; }

        /* The climax. Four cues, three of which survive desaturation: the
           wash, the size step, the heavier rule above it, and the ringed
           pill. */
        ${TAG} tr.is-climax td {
          background: var(--vd-tint);
          border-top: 1.5px solid var(--vd);
          padding-top: var(--ae-space-5); padding-bottom: var(--ae-space-5);
          font-size: var(--ae-fs-body); line-height: 1.42;
        }
        ${TAG} tr.is-climax td.e {
          color: var(--vd-d);
          font-size: var(--ae-fs-lead); line-height: 1.34;
        }
        ${TAG} tr.is-climax td.e .lead { font-weight: 700; }

        ${TAG} .pill {
          display: inline-flex; align-items: baseline; gap: 7px;
          padding: 4px 13px; border-radius: 999px;
          border: 1.5px solid transparent;
          background: var(--vd-tint); color: var(--vd-d);
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 700;
        }
        ${TAG} .pill i { font-weight: 700; }
        /* Hollow, not filled: the form half of the not-verified cue. */
        ${TAG} .v-wait .pill { background: var(--fg-card); border-color: var(--vd); }
        ${TAG} .is-climax .pill {
          font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          padding: 5px 15px;
        }

        @media (max-width: 900px) {
          ${TAG} td.c { width: auto; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="tbl fg-card fg-in" style="--fg-at: 3">
          <table>
            <thead>
              <tr>
                <th class="c">${t.cols[0]}</th>
                <th class="e">${t.cols[1]}</th>
                <th class="v">${t.cols[2]}</th>
              </tr>
            </thead>
            <tbody>
              ${t.rows.map((r, i) => {
                const climax = r.v === 'pending';
                return `
                <tr class="${VCLASS[r.v]}${climax ? ' is-climax' : ''} fg-in" style="--fg-at: ${4 + i}">
                  <td class="c">${r.c}</td>
                  <td class="e">${climax ? leadSplit(r.e) : r.e}</td>
                  <td class="v"><span class="pill"><i>${GLYPH[r.v]}</i>${t.verdicts[r.v]}</span></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 9"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section18);
