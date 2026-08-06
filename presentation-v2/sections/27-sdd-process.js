/* Section 28 — Spec-Driven Development, the full process.

   The same three steps at the top of the dial, with every artifact, gate
   and reviewer drawn in. This is one working tuning, not a proposal: it
   is what the method looks like when being wrong is expensive and hard
   to see.

   ── WHAT WAS MEASURED, AND WHAT IT SAID ─────────────────────────────

   The version this replaces was measured in the real deck at 1280x720
   (stage 610px): the diagram took 159px and 43 words; the ship block
   took 89px and 71 words. So the ship block carried 44% of the slide's
   words in 15% of its height — 0.80 words per vertical pixel against
   the diagram's 0.27 — sitting directly under the artifact cards with
   the same left edge and no separating rule, so the eye read seven
   columns of text, four of which were the diagram's labels. The densest
   thing on a slide whose subject is a drawing was the part that is not
   the drawing.

   It also answers a different question. The diagram answers "what is
   the process". The ship block answers "how does the work reach main
   and who reads it", and two of its three claims are already made
   elsewhere in the deck — slide 22 is a whole slide on a different
   model family reviewing, and slide 27 step 6 says it again.

   SO THE BLOCK STAYS AND IS DEMOTED. Not to a smaller card row: to
   marginalia. A hairline rule, the label pushed into a left margin
   column the way a footnote marker is, and the three claims set as
   run-in headings in one band. Every word survives. What it loses is
   the right to look like a second subject.

   ── THE DIAGRAM IS SLIDE 7's DEVICE ─────────────────────────────────

   Slides 7 and 28 share the pipeline, and this is 7's geometry:

     - a step is a HOLLOW HUED RING sitting ON the rail;
     - a gate is a SOLID INK BAR sitting ACROSS it, and the bar's
       height is the ruler the whole rail row is built from;
     - documents hang below on dotted hairline connectors, in
       ink-edged boxes;
     - the connector under a ring closes exactly the gap the ring
       leaves in a row the BAR defines: (gh - nd) / 2, derived, never
       eyeballed;
     - everything lives in one grid, so a connector lands on its own
       object by construction rather than by a percentage that drifts
       when the German wraps differently.

   Four departures, each forced by four steps and three gates instead
   of three and two:

   1. THE GATE LABEL REPLACES THE GATE PANEL. Three gates and four
      documents leave no room for three prose panels, and the labels
      here are three words rather than three sentences. The label sits
      directly under the bar with no gap — the bar's own caption — so
      it is still attached by construction. Gate columns are a FIXED
      width and the label is allowed to overflow them symmetrically;
      with "auto" the label would set the column width and shove the
      whole rail sideways. The LAST gate column is the exception and is
      auto on purpose: what gate 1 and 2 overflow into is a gap, but
      gate 3 overflows the right edge of the slide and came within a
      few pixels of a horizontal scrollbar.

   2. THE LOOP BAND. Four steps, three hues: Spec and Plan are BOTH the
      loop's Plan step, which is the lede's actual claim. Two blue
      rings next to each other only read as that claim if something
      says so, so a labelled bracket runs above the rail naming the
      three phases and showing where each starts and stops. It also
      makes the unequal spans visible: Plan owns half the rail, which
      is what this tuning actually costs.

   3. A STEP CARRIES ONE LINE OF PROSE, because this is where the four
      artifacts get introduced. Slide 7's steps are bare names.

   4. THE KICKER IS NO LONGER GREEN. It said "Spec-Driven Development"
      in the old single-accent green, which is now the Build hue and is
      spent on the Build ring three columns away. It is a metadata
      label, so it takes the deck's label device: grey.

   ── WHERE tasks.md HANGS ────────────────────────────────────────────

   tasks.md hangs from BUILD, not from Plan. It used to ride along on
   Plan's card as "plan.md · tasks.md" while Build merely ticked it off.
   Moving it is not a relabelling: a document hangs off the rail on a
   dotted connector in ITS STEP's column, so the file moved two columns
   right and its connector moved with it. Plan's card is now plan.md
   alone. Build both writes the list and works it, so its card carries
   both verbs.

   ── THE HUE BUDGET ──────────────────────────────────────────────────

   Three chapter hues appear, and all three are STRUCTURE — the loop
   band and the step rings — which is a separate system from the
   at-most-two-hues rule that governs content. Content hues here: zero.
   Every sentence on the slide is ink, body or muted grey. Ink is every
   human decision: the three gate bars, the gate labels, the artifact
   boxes' edges. Grey is the rail and every connector.

   GREYSCALE. Nothing rests on hue. Step against gate is hollow ring
   against filled bar — different shape, different value, different
   relationship to the line. Which phase a step belongs to is carried by
   the loop band's NAME above it, not by the ring's colour. Desaturate
   and the only thing lost is which of two blues is which, and the band
   says that in words.

   (No backticks anywhere in these comments: this block and the style
   block below sit inside a JS template literal, and one backtick ends
   the string and blanks the whole deck. It has happened.) */

import { getLang } from '../core/i18n.js';

const TAG = 's27-sdd-process';

const CONTENT = {
  en: {
    kicker: 'Spec-Driven Development',
    h1: 'The full process',
    lede: `Still Plan, Build, Review. Now every step leaves an artifact, and the
           gates are written down instead of remembered.`,
    loop: ['Plan', 'Build', 'Review'],
    steps: [
      { name: 'Spec',   body: 'What it should do.',      doc: 'spec.md',         kind: 'writes' },
      { name: 'Plan',   body: 'How it will be built.',   doc: 'plan.md',         kind: 'writes' },
      { name: 'Build',  body: 'One task, one commit.',   doc: 'tasks.md',        kind: 'writes · ticks off' },
      { name: 'Review', body: 'Evidence per criterion.', doc: 'verification.md', kind: 'writes' },
    ],
    gates: [
      { n: '1', desc: 'Approve the spec' },
      { n: '2', desc: 'Approve the plan' },
      { n: '3', desc: 'Accept the evidence' },
    ],
    shipLabel: 'And it ships like this',
    ship: [
      { t: 'One spec, one branch, one PR', d: 'The branch is a review boundary, not parallelism. One at a time, cut from main, short-lived.' },
      { t: 'A different model reviews the PR', d: 'Not the family that wrote the code. Automatic on open, or summoned by comment.' },
      { t: 'Findings are input, not orders', d: 'Adopt what stands up, decline the rest with a reason on the PR. Two rounds, then a person decides.' },
    ],
    note: `The artifacts commit next to the code, in the same branch —
           <b>so the diff carries the reasoning and the change together.</b>`,
  },
  de: {
    kicker: 'Spec-Driven Development',
    h1: 'Der vollständige Prozess',
    lede: `Immer noch Plan, Build, Review. Nur hinterlässt jetzt jeder Schritt ein
           Artefakt, und die Gates stehen geschrieben statt im Gedächtnis.`,
    loop: ['Plan', 'Build', 'Review'],
    steps: [
      { name: 'Spec',   body: 'Was es tun soll.',       doc: 'spec.md',         kind: 'schreibt' },
      { name: 'Plan',   body: 'Wie es gebaut wird.',    doc: 'plan.md',         kind: 'schreibt' },
      { name: 'Build',  body: 'Ein Task, ein Commit.',  doc: 'tasks.md',        kind: 'schreibt · hakt ab' },
      { name: 'Review', body: 'Belege je Kriterium.',   doc: 'verification.md', kind: 'schreibt' },
    ],
    gates: [
      { n: '1', desc: 'Spec freigeben' },
      { n: '2', desc: 'Plan freigeben' },
      { n: '3', desc: 'Belege abnehmen' },
    ],
    shipLabel: 'Und so geht es raus',
    ship: [
      { t: 'Eine Spec, ein Branch, ein PR', d: 'Der Branch ist eine Review-Grenze, keine Parallelität. Einer nach dem anderen, von main, kurzlebig.' },
      { t: 'Ein anderes Modell reviewt den PR', d: 'Nicht die Familie, die den Code geschrieben hat. Automatisch beim Öffnen oder per Kommentar gerufen.' },
      { t: 'Befunde sind Input, keine Befehle', d: 'Übernehmen, was standhält, den Rest mit Begründung im PR ablehnen. Zwei Runden, dann entscheidet ein Mensch.' },
    ],
    note: `Die Artefakte werden neben dem Code committet, im selben Branch —
           <b>so trägt der Diff die Begründung und die Änderung zusammen.</b>`,
  },
};

/* Steps in columns 1/3/5/7, gates in 2/4/8. Spec and Plan share the Plan
   hue because they are both the loop's Plan step — the lede's claim,
   drawn. Column 6 is a real gap, the way slide 7's column 4 is: it is
   what separates Build from Review, and it is why Build has no gate. */
const STEP_COLS = [1, 3, 5, 7];
const GATE_COLS = [2, 4, 8];
const HUE = ['s-plan', 's-plan', 's-build', 's-review'];

/* The loop band's three spans, over the SAME columns the rail uses:
   Plan owns Spec, gate 1, Plan and gate 2; Build owns its own column;
   Review owns Review and gate 3. Column 6 is left uncovered on purpose
   — it is the gap between two phases. */
const BAND = [
  { c: '1 / 5',  h: 's-plan' },
  { c: '5 / 6',  h: 's-build' },
  { c: '7 / -1', h: 's-review' },
];

class Section27 extends HTMLElement {
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
           viewport minus a header and a nav bar, and German runs longer.
           Plain centring overflows in BOTH directions; "safe" falls back
           to flex-start rather than pushing the drawing off the top. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        /* Grey, not green: this is a metadata label, and green is now the
           Build hue and is spent on the Build ring. */
        ${TAG} .kicker {
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--fg-muted); margin: 0 0 var(--ae-space-1);
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h1); line-height: var(--ae-lh-h1); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 68ch; }

        ${TAG} .s-plan   { --hue: var(--fg-plan);   --hue-d: var(--fg-plan-d); }
        ${TAG} .s-build  { --hue: var(--fg-build);  --hue-d: var(--fg-build-d); }
        ${TAG} .s-review { --hue: var(--fg-review); --hue-d: var(--fg-review-d); }

        /* ═══════════ the pipeline ═══════════
           1 Spec · 2 gate1 · 3 Plan · 4 gate2 · 5 Build · 6 gap ·
           7 Review · 8 gate3. The first two gate columns are a FIXED
           width, not "auto": their labels are wider than the bar and
           must overflow the column rather than define it. The LAST one
           is auto, because what it would overflow into is the edge of
           the slide rather than a gap. */
        ${TAG} .pipe {
          --gh: clamp(46px, 6.2vh, 72px);   /* gate bar height — the row's ruler */
          --nd: 22px;                       /* step ring diameter */
          --gw: clamp(30px, 3.4vh, 38px);   /* gate bar width */
          --sfs: clamp(22px, 3.4vh, 42px);  /* step name */
          --bfs: var(--ae-fs-caption);      /* the step's one line of prose */
          display: grid;
          grid-template-columns:
            minmax(0, 1fr) var(--gw) minmax(0, 1fr) var(--gw)
            minmax(0, 1fr) clamp(18px, 2.4vw, 40px) minmax(0, 1fr) auto;
          align-items: start;
        }

        /* ── row 1: the loop band ── */
        ${TAG} .bd {
          grid-row: 1; display: flex; align-items: center; gap: var(--ae-space-2);
          margin: 0 6px var(--ae-space-3);
        }
        ${TAG} .bd i { flex: 1; height: 3px; border-radius: 2px; background: var(--hue); opacity: 0.5; }
        ${TAG} .bd span {
          flex: none; font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1; font-weight: 700; letter-spacing: 0.06em; color: var(--hue-d);
        }

        /* ── row 2: step name and its line ── */
        ${TAG} .st { grid-row: 2; text-align: center; padding: 0 var(--ae-space-2) var(--ae-space-3); }
        ${TAG} .st h3 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--sfs); line-height: 1.05;
          letter-spacing: -0.03em; color: var(--hue-d);
        }
        ${TAG} .st p {
          margin: 3px 0 0; font-size: var(--bfs); line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }

        /* ── row 3: the rail, the rings, the bars ── */
        ${TAG} .rail {
          grid-row: 3; grid-column: 1 / -1; align-self: center; z-index: 1;
          height: 3px; border-radius: 2px; background: var(--fg-hair);
          transform-origin: left center;
          animation: s27-rail 820ms var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
        }
        @keyframes s27-rail { from { transform: scaleX(0); } }

        /* A step: hollow, hued, ON the line. */
        ${TAG} .nd {
          grid-row: 3; justify-self: center; align-self: center; z-index: 2;
          width: var(--nd); height: var(--nd); border-radius: 999px;
          background: var(--fg-card); border: 4px solid var(--hue);
        }
        /* A gate: solid ink, ACROSS the line. */
        ${TAG} .gate {
          grid-row: 3; justify-self: center; align-self: center; z-index: 3;
          display: flex; align-items: center; justify-content: center;
          width: var(--gw); height: var(--gh);
          border-radius: 10px; background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1;
          font-variant-numeric: tabular-nums; box-shadow: var(--fg-d2);
        }

        /* ── row 4: the gate's caption, and the drop to the documents ──
           Width in em, not ch and not max-content: it has to hold two
           words on a line at every size the vh scale produces, and it has
           to be the same shape in German. "min(max-content, 14ch)"
           measured the width of the longest WORD and broke every label
           onto three lines. */
        ${TAG} .gl {
          grid-row: 4; justify-self: center; z-index: 2;
          width: 9.5em; padding-top: var(--ae-space-2);
          text-align: center;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600; color: var(--fg-ink);
        }

        /* One attachment device for every hanging thing: dotted hairline,
           an attachment rather than a flow. */
        ${TAG} .lead { justify-self: center; width: 0; border-left: 2px dotted var(--ae-cool-gray-400); z-index: 1; }
        /* Segment A closes the gap the ring leaves inside the bar-height
           row: the ring's underside sits at (gh + nd) / 2, the row ends
           at gh, so the difference is exactly (gh - nd) / 2. */
        ${TAG} .lead--a { grid-row: 3; align-self: end; height: calc((var(--gh) - var(--nd)) / 2); }
        /* Segment B stretches, so however tall the gate labels make row
           4, the connector still ends exactly on the document's edge. A
           fixed height here would leave the line short of the box the
           moment German wrapped. */
        ${TAG} .lead--b { grid-row: 4; align-self: stretch; min-height: var(--ae-space-5); }

        /* ── row 5: the documents ── */
        ${TAG} .doc {
          grid-row: 5; justify-self: center; z-index: 2;
          display: inline-flex; flex-direction: column; align-items: center; gap: 2px;
          max-width: 100%;
          padding: var(--ae-space-3) var(--ae-space-4);
          border-radius: var(--ae-radius);
          background: var(--fg-card); border: 1.5px solid var(--fg-ink);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .doc .kind {
          font-size: var(--ae-fs-caption); line-height: 1.2;
          color: var(--fg-muted); text-align: center;
        }
        ${TAG} .doc .file {
          font-family: var(--ae-font-mono); font-size: calc(var(--ae-fs-caption) * 1.02);
          line-height: 1.25; font-weight: 600; color: var(--fg-ink); white-space: nowrap;
        }

        /* ═══════════ the fine print ═══════════
           The ship block, demoted. A hairline rule above it, the label
           pushed into its own left margin column the way a footnote
           marker is, and the three claims as run-in headings in one
           band. Every word is still here; none of it is a heading any
           more. */
        ${TAG} .fine {
          display: grid; grid-template-columns: minmax(0, 13ch) minmax(0, 1fr);
          column-gap: var(--ae-space-4);
          margin-top: var(--ae-space-5); padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .fine .lbl { margin: 0; }
        ${TAG} .fine .row {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: var(--ae-space-4);
        }
        ${TAG} .fine p {
          margin: 0; font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-body);
        }
        ${TAG} .fine p b { font-weight: 700; color: var(--fg-ink); }

        @media print { ${TAG} .rail { animation: none !important; } }

        @media (max-width: 1000px) {
          ${TAG} .pipe { grid-template-columns: 1fr; row-gap: var(--ae-space-3); }
          ${TAG} .pipe > * { grid-row: auto !important; grid-column: 1 !important; }
          ${TAG} .rail, ${TAG} .lead { display: none; }
          ${TAG} .bd { margin: 0; }
          ${TAG} .st, ${TAG} .gl, ${TAG} .doc { text-align: left; justify-self: start; }
          ${TAG} .gl { width: auto; }
          ${TAG} .fine, ${TAG} .fine .row { grid-template-columns: 1fr; row-gap: var(--ae-space-3); }
        }
      </style>
      <div class="fg-wrap head">
        <p class="kicker fg-in" style="--fg-at: 1">${t.kicker}</p>
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="pipe">
          ${t.loop.map((name, i) => `
            <div class="bd ${BAND[i].h} fg-in" style="grid-column: ${BAND[i].c}; --fg-at: 2">
              <i></i><span>${name}</span><i></i>
            </div>
          `).join('')}
          <i class="rail" aria-hidden="true"></i>
          ${t.steps.map((s, i) => `
            <div class="st ${HUE[i]} fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${4 + i}">
              <h3>${s.name}</h3><p>${s.body}</p>
            </div>
            <i class="nd ${HUE[i]}" aria-hidden="true" style="grid-column: ${STEP_COLS[i]}; animation: fg-appear 300ms var(--ae-ease) both; animation-delay: calc(60ms + ${4 + i} * var(--fg-beat))"></i>
            <i class="lead lead--a fg-in" aria-hidden="true" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${5 + i}"></i>
            <i class="lead lead--b fg-in" aria-hidden="true" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${5 + i}"></i>
            <span class="doc fg-in" style="grid-column: ${STEP_COLS[i]}; --fg-at: ${5 + i}">
              <span class="kind">${s.kind}</span>
              <span class="file">${s.doc}</span>
            </span>
          `).join('')}
          ${t.gates.map((g, i) => `
            <div class="gate fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${8 + i}">${g.n}</div>
            <div class="gl fg-in" style="grid-column: ${GATE_COLS[i]}; --fg-at: ${8 + i}">${g.desc}</div>
          `).join('')}
        </div>
        <div class="fine fg-in" style="--fg-at: 11">
          <p class="fg-label lbl">${t.shipLabel}</p>
          <div class="row">
            ${t.ship.map(s => `<p><b>${s.t}</b> — ${s.d}</p>`).join('')}
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <p class="fg-note fg-in" style="--fg-at: 12"><span>${t.note}</span></p>
      </div>
    `;
  }
}

customElements.define(TAG, Section27);
