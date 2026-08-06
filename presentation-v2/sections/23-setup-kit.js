/* Section 24 — Setup, slide 1 of 2: the whole set on one page.

   THE CRATE. One dashed enclosure, and all five primitives inside it. The
   enclosure IS the plugin: its name sits ON the edge, which is what makes it
   a boundary rather than a card with a heading. Inside, a solid grey line
   divides the three that travel from the two that do not — the portability
   split is an internal partition, not the slide's outer structure.

   The claim the shape makes: a plugin is a box, the five are what is in it,
   and the interesting line runs INSIDE the box. The crate's own edge is
   dashed because the box does not travel either, which is the catch the old
   mint note strip used to make in words at the bottom of the slide.

   THE VOCABULARY, settled deck-wide (DESIGN.md pass 4, landed on slide 6):

     DASHED + CLAY  there is no common format for this; it does not travel.
                    It is the mark on the two tool-specific primitives AND
                    on the plugin itself, because the same sentence is true
                    of both — and that shared mark is the point.
     SOLID GREY     a real line, a fact about the ecosystem. The machine's
                    plumbing, not a human decision; ink would claim somebody
                    chose it.
     GREEN          the standard's own name, in the code face.

   Two content hues, plus ink and greys. Nothing rests on hue: the standard
   is always SOLID and NAMED, the absence is always DASHED and says so in
   words. Desaturate and both still read.

   WHAT THIS VERSION DROPPED, and why a future editor should not put it back:

     The three-spellings block — "The same feature, three spellings" and its
     three tool paths. All three rows were HOOKS' paths, so a slide claiming
     two tool-specific primitives evidenced exactly one of them, and the
     audience had to read six file paths to be told a fact the group label
     already states.

     The standards-body citations — "Agentic AI Foundation, Linux
     Foundation" and "Open standard, published spec at agentskills.io". They
     flattened two different kinds of claim into one caption row: who
     governs a spec and where a spec is published are not the same fact, and
     neither is what the slide is about. What remains as evidence for
     "portable" is the standard's own NAME, which is the stronger evidence
     anyway — one name is the claim.

     The mint note strip. It carried the plugin sentence; the plugin is now
     in the drawing, so the strip would repeat the picture beside it.

   WHAT IT ADDED: a chip for the two that have no standard. The three
   portable primitives always carried a name chip and the other two carried
   nothing, which read as an unfinished grid rather than as an argument.
   Both halves now answer the same question in the same box: three name a
   standard, two say there is none.

   THE STAMP dates what is still claimed. It used to date a governance claim;
   no governance claim is made any more, so it dates the tool landscape. The
   stamp stays — the project requires one on any slide making tool claims.

   TRAPS

   SIX TRACKS FOR FIVE COLUMNS. The partition gets a track of its own rather
   than being drawn in a column gap: a line hung in a gap moves when the gap
   changes, and this one has to sit exactly between the third and fourth
   primitive at every stage width.

   PLACEMENT LIVES IN CSS, not in an inline style on each cell. An inline
   grid-column cannot be overridden by a media query without !important, and
   the narrow reflow at 860px needs to move cells 4 and 5 onto a second band.

   THE CHIPS TAKE 0.94 OF --ae-fs-small, NOT --ae-fs-caption. Caption IS the
   deck's 14px floor, so anything scaled down from it renders below the floor
   on a short stage. The 0.94 step is the kit's own (see .fg-rows dd) and
   bottoms out at 14.1px, which is the smallest legal number here.

   THE NARROW BAND BUYS ITS WIDTH BACK FROM THE FRAME. "Model Context
   Protocol" is the widest chip on the slide and the crate is the only shape
   that pays for its own inset out of the five columns. At 980px the chip
   wanted 174px in a 165px track and took two lines. Below 1100px the frame
   gutter, the crate inset, the partition track and the column gaps each give
   back a step; that is where the nine pixels come from, and it is why those
   four values are tuned together rather than one at a time.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string. It did once.) */

import { getLang } from '../core/i18n.js';

const TAG = 's23-setup-kit';

const CONTENT = {
  en: {
    h1: 'Five things you give it — three of them <span class="fg-mark fg-mark--sweep">standard</span>',
    /* The lede carries three subjects, not two: the set, the line, and the
       bundle. The last clause is what earns the crate its place. */
    lede: `You have met four already — the memory file, skills and MCP in Build,
           and the subagent that read the diff in Review. Here is the whole set,
           the line that decides how much of it travels — and the bundle that
           ships all five at once.`,
    portLabel: 'Portable — one spelling, every tool',
    toolLabel: 'Tool-specific — a different spelling in each',
    five: [
      { t: 'Memory', port: true, std: 'AGENTS.md', mono: true,
        d: 'The project’s standing brief: stack, conventions, what is out of scope. Read at every session start.' },
      { t: 'Skills', port: true, std: 'SKILL.md', mono: true,
        d: 'A procedure the model loads only when it becomes relevant. Written once, read by any agent.' },
      { t: 'MCP', port: true, std: 'Model Context Protocol',
        d: 'The systems it may reach: the tracker, the database, the docs.' },
      { t: 'Hooks', port: false, std: 'no standard',
        d: 'Fires on an event, every time, whatever the model decides. Policy it cannot talk its way around.' },
      { t: 'Subagents', port: false, std: 'no standard',
        d: 'A second agent, its own context, a narrower job. You get the result, not its reading.' },
    ],
    plugin: {
      chip: 'Plugin — one install',
      say: 'One install, and a team has the whole setup — all five, versioned together. You ship it instead of describing it in a README.',
      cav: 'No common format for the bundle either: you build one per tool.',
    },
    foot: 'The tool landscape as of July 2026 — re-check before relying on it.',
  },
  de: {
    h1: 'Fünf Dinge, die du ihm gibst — drei davon <span class="fg-mark fg-mark--sweep">Standard</span>',
    lede: `Vier sind dir schon begegnet — Memory-Datei, Skills und MCP in Build,
           und der Subagent, der im Review den Diff gelesen hat. Hier ist der
           ganze Satz, die Linie, die entscheidet, wie viel davon mitreist —
           und das Bündel, das alle fünf auf einmal ausliefert.`,
    portLabel: 'Portabel — eine Schreibweise, jedes Tool',
    toolLabel: 'Tool-spezifisch — in jedem Tool anders geschrieben',
    five: [
      { t: 'Memory', port: true, std: 'AGENTS.md', mono: true,
        d: 'Der ständige Auftrag des Projekts: Stack, Konventionen, was nicht dazugehört. Bei jedem Start gelesen.' },
      { t: 'Skills', port: true, std: 'SKILL.md', mono: true,
        d: 'Ein Ablauf, den das Modell lädt, wenn er relevant wird. Einmal geschrieben, von jedem Agenten lesbar.' },
      { t: 'MCP', port: true, std: 'Model Context Protocol',
        d: 'Die Systeme, die er erreichen darf: Ticket-System, Datenbank, Doku.' },
      { t: 'Hooks', port: false, std: 'kein Standard',
        d: 'Feuert bei einem Ereignis, jedes Mal. Policy, die das Modell nicht aushebeln kann.' },
      { t: 'Subagents', port: false, std: 'kein Standard',
        d: 'Ein zweiter Agent, eigener Kontext, engerer Auftrag. Du bekommst nur das Ergebnis.' },
    ],
    plugin: {
      chip: 'Plugin — eine Installation',
      say: 'Eine Installation, und ein Team hat das ganze Setup — alle fünf, gemeinsam versioniert. Du lieferst es aus, statt es im README zu beschreiben.',
      cav: 'Auch für das Bündel kein gemeinsames Format: du baust eins pro Tool.',
    },
    foot: 'Tool-Landschaft Stand Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section23 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;

    const chip = (p) =>
      `<span class="std${p.port ? (p.mono ? ' std--mono' : '') : ' std--none'}">${p.std}</span>`;

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
        /* NO min-height: 0 HERE, deliberately, and it is not an omission.
           The deck's usual body rule lets this box shrink below its own
           content; the crate then paints straight through the stamp with
           scrollHeight still equal to clientHeight, so every overflow check
           passes while the slide is broken. Measured in German at 860x720.
           Leaving the automatic minimum in place turns that silent overlap
           into an honest scrollbar on a stage too short to hold the slide. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        /* THE MEASURE IS WIDER THAN THE KIT'S 62ch ON PURPOSE. This slide's
           overflow is a HEIGHT problem, and at 62ch the lede takes four lines
           on a short stage where the type scale has already bottomed out.
           Widening it to 84ch buys two lines back without touching a word. */
        ${TAG} .fg-lede { margin: 0; max-width: 84ch; }
        ${TAG} .fg-foot { margin-top: var(--ae-space-3); }

        /* ═══════════ the boundary object ═══════════
           A boundary names itself with a chip ON its edge, paper-coloured so
           it punches a hole in the line. A heading beside the box would make
           the box a card; a label on the edge is what makes it a boundary.
           Dashed and clay wherever it names a boundary that does not hold. */
        ${TAG} .edge {
          display: inline-flex; align-items: center;
          padding: 3px 12px; border-radius: 999px;
          background: var(--fg-paper);
          border: 1.5px solid var(--ae-cool-gray-300);
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600;
          color: var(--fg-muted); white-space: nowrap; z-index: 4;
        }
        ${TAG} .edge--broken {
          border-style: dashed; border-color: var(--fg-fail); color: var(--fg-fail-d);
        }

        /* ═══════════ one primitive ═══════════ */
        ${TAG} .prim__t {
          display: block;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h5); line-height: 1.16; color: var(--fg-ink);
        }
        ${TAG} .prim__d {
          margin: 4px 0 0;
          font-size: var(--ae-fs-small); line-height: 1.38; color: var(--fg-body);
        }

        /* The answer chip. Both kinds sit in the same box, because the two
           are answers to the same question and have to be compared: three
           name a standard, two say there is none. A file name takes the code
           face; a protocol name is prose and does not, however much it wants
           to sit in the same column. "no standard" is prose too — only a real
           file name earns the code face.

           SIZED FROM --ae-fs-small AT 0.94, NOT FROM --ae-fs-caption. Caption
           IS the deck's 14px floor, so anything scaled down from it renders
           below the floor on a short stage. This bottoms out at 14.1px.
           The negative tracking is what keeps "Model Context Protocol" — 22
           characters in a fifth of the measure — on one line at 1080p, where
           the type scale is at its CEILING and the wrap is not. */
        ${TAG} .std {
          display: inline-flex; align-items: center;
          padding: 3px 6px; border-radius: var(--ae-radius-sm);
          border: 1.5px solid var(--ae-cool-gray-300);
          background: var(--fg-card);
          font-family: var(--ae-font);
          font-size: calc(var(--ae-fs-small) * 0.94);
          letter-spacing: -0.008em;
          line-height: 1.3; font-weight: 600; color: var(--fg-ink);
        }
        ${TAG} .std--mono { font-family: var(--ae-font-mono); color: var(--fg-green-d); }
        ${TAG} .std--none {
          border-style: dashed; border-color: var(--fg-fail); color: var(--fg-fail-d);
        }

        /* ═══════════ the crate ═══════════ */
        ${TAG} .crate {
          position: relative;
          border: 2px dashed var(--fg-fail);
          border-radius: var(--ae-radius-lg);
          background: var(--fg-card);
          box-shadow: var(--fg-d1);
          /* Vertical padding is generous, horizontal is one step down. The
             crate is the only shape here that pays for its own inset out of
             the five columns, and at the full step on both axes the longest
             chip no longer fit its track on a 1080p stage. */
          padding: calc(var(--ae-space-6) + 2px) var(--ae-space-5) var(--ae-space-4);
        }
        ${TAG} .crate__name {
          position: absolute; top: 0; left: var(--ae-space-5);
          transform: translateY(-50%);
        }

        /* SIX TRACKS FOR FIVE COLUMNS — see the header note. */
        ${TAG} .board5 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr)) var(--ae-space-4) repeat(2, minmax(0, 1fr));
          column-gap: var(--ae-space-3);
          row-gap: var(--ae-space-3);
          align-items: start;
        }
        ${TAG} .lab-a { grid-column: 1 / 4; grid-row: 1; }
        ${TAG} .lab-b { grid-column: 5 / 7; grid-row: 1; }
        ${TAG} .prim { grid-row: 2; }
        ${TAG} .chip { grid-row: 3; }
        ${TAG} .k1 { grid-column: 1; }
        ${TAG} .k2 { grid-column: 2; }
        ${TAG} .k3 { grid-column: 3; }
        ${TAG} .k4 { grid-column: 5; }
        ${TAG} .k5 { grid-column: 6; }
        ${TAG} .split {
          grid-column: 4; grid-row: 1 / 4;
          justify-self: center; align-self: stretch;
          width: 0; border-left: 2px solid var(--ae-cool-gray-300);
        }

        /* The crate says what it is at its own foot, under a hairline —
           inside the box, because it is the box talking. The catch is the
           last clause of the sentence rather than a second line, so the two
           cannot be read apart: a plugin that only ships in one tool is
           still worth having, and a plugin presented without that clause is
           a lie. */
        ${TAG} .crate__foot {
          margin-top: var(--ae-space-4);
          padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .say {
          margin: 0;
          font-size: var(--ae-fs-small); line-height: 1.42; color: var(--fg-body);
        }
        ${TAG} .cav { color: var(--fg-fail-d); font-weight: 600; }

        /* ═══════════ narrow ═══════════
           Under ~1100px the wrap is narrower than its 1240px measure, so
           every paragraph gains a line at once and the frame padding is the
           only thing left to give.

           The horizontal give is also what buys the widest chip its track:
           gutter, crate inset, partition track and column gaps each drop a
           step, which is the only way to find the nine pixels "Model Context
           Protocol" was short of at 980px. Tuned together; changing one back
           puts the chip on two lines again. */
        @media (max-width: 1100px) {
          ${TAG} { padding: var(--ae-space-3) var(--ae-space-6); }
          ${TAG} .foot { }
          ${TAG} .fg-foot { margin-top: var(--ae-space-2); padding-top: var(--ae-space-2); }
          ${TAG} .crate { padding-left: var(--ae-space-3); padding-right: var(--ae-space-3); }
          ${TAG} .crate__name { left: var(--ae-space-4); }
          ${TAG} .board5 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) var(--ae-space-3) repeat(2, minmax(0, 1fr));
            column-gap: var(--ae-space-2);
          }
          ${TAG} .std { padding: 3px 5px; letter-spacing: -0.014em; }
        }

        /* Three-up, then two-up, on two stacked bands. The partition goes
           with them: a vertical rule cannot divide two groups that are no
           longer side by side, and leaving it in would draw a line through
           the middle of the portable three. */
        @media (max-width: 860px) {
          /* Two stacked bands is the tallest arrangement this content has, so
             the crate gives back its own vertical rhythm here — every step it
             can spare without the box stopping reading as a box. */
          ${TAG} .crate {
            padding-top: calc(var(--ae-space-5) + 2px);
            padding-bottom: var(--ae-space-3);
          }
          ${TAG} .crate__foot {
            margin-top: var(--ae-space-3); padding-top: var(--ae-space-2);
          }
          ${TAG} .board5 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          ${TAG} .lab-a { grid-column: 1 / 4; grid-row: 1; }
          ${TAG} .lab-b { grid-column: 1 / 4; grid-row: 4; }
          ${TAG} .split { display: none; }
          ${TAG} .k4, ${TAG} .k5 { grid-column: auto; }
          ${TAG} .k4 { grid-column: 1; }
          ${TAG} .k5 { grid-column: 2; }
          ${TAG} .prim.k4, ${TAG} .prim.k5 { grid-row: 5; }
          ${TAG} .chip.k4, ${TAG} .chip.k5 { grid-row: 6; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <section class="crate fg-in" style="--fg-at: 3">
          <span class="edge edge--broken crate__name">${t.plugin.chip}</span>
          <div class="board5">
            <span class="fg-label lab-a fg-in" style="--fg-at: 3">${t.portLabel}</span>
            <span class="fg-label lab-b fg-in" style="--fg-at: 3">${t.toolLabel}</span>
            <i class="split" aria-hidden="true"></i>
            ${t.five.map((p, i) => `
              <div class="prim k${i + 1} fg-in" style="--fg-at: ${4 + i}">
                <span class="prim__t">${p.t}</span>
                <p class="prim__d">${p.d}</p>
              </div>
            `).join('')}
            ${t.five.map((p, i) => `
              <div class="chip k${i + 1} fg-in" style="--fg-at: 9">${chip(p)}</div>
            `).join('')}
          </div>
          <div class="crate__foot fg-in" style="--fg-at: 10">
            <p class="say">${t.plugin.say} <b class="cav">${t.plugin.cav}</b></p>
          </div>
        </section>
      </div>
      <div class="fg-wrap foot">
        <div class="fg-foot fg-in" style="--fg-at: 12"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section23);
