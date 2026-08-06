/* Section 25 — Setup, slide 2 of 2: where a thing sits, and what that costs.

   THREE PLACES. The axis is WHERE. There are not two states but three: a
   thing is in YOUR window; or it is in a window OF ITS OWN and only its
   answer comes back; or it has no window at all, because it never reaches a
   model. So the drawing is a row of three places in which the third has NO
   WALL — three names on one line, two walls under them, and the missing one
   is the reading. The single grey arrow is the only legitimate crossing on
   the slide: what a subagent returns, which does land in your window, and is
   the only thing that does.

   THE CONTENT IS RESTORED FROM THE v1 DECK (presentation/sections/
   07-context-loading.js), and the restoration is the point. The v2 rewrite
   had dropped four things this slide cannot argue without:

     the three-state legend — it is a KEY, not a repetition. The band heads
     name the MOMENT a thing loads; the legend names the STATE that moment
     leaves it in. Those are not the same sentence.

     the footnote about tool variance — some tools keep a skill fully
     unloaded until it is invoked explicitly. Without it the slide states a
     behaviour as universal that is not.

     "Isolated" as a real third category, rather than a leftover column.

     SKILLS APPEARING TWICE — descriptions at session start, full content on
     use. That split IS the mechanism, and a slide that names Skills once
     cannot show it.

   ONE CLAUSE IS NEW, and it closes a gap v1 left open: "and in every request
   after". v1 was silent on what happens once a skill matches; v2 implied,
   via a cost badge on the first column only, that it is a one-off. Neither
   is right. Once a skill has matched, its body is in the conversation and is
   re-sent like everything else. The distinction is not recurring versus
   one-off — it is WHEN THE METER STARTS.

   v2's lede is deliberately not carried over. This is a diagram slide; the
   lede restated in prose what the drawing says, and it is what pushed the
   drawing into a third of the frame.

   THE FORM RAMP — three states, three stroke styles:

     solid  + clay   inside the wall    always in context
     dashed + grey   inside the wall    loads on use
     dotted + grey   OUTSIDE the wall   outside the main context

   Colour appears on exactly one of the three, and clay is the deck's failure
   hue: a per-request re-send of every connected server is not broken, it is
   just billed, forever, whether the request touched it or not. That is the
   slide's argument, so the always-loaded class is the only coloured thing on
   it. Strip the hue and the ramp survives: solid, dashed, dotted.

   THE HUMAN IS INK. Everything the machine does is grey and soft; a human
   decision is a hard black stop, and deciding what is admitted at all is the
   one human act on this slide.

   TRAPS

   .pin-in EXISTS BECAUSE .fg-in CANNOT BE USED ON A PINNED CHIP. The kit's
   entrance animates transform: translateY(12px), which REPLACES the resting
   translateY(-50%) that pins a chip to a line — the chip then enters below
   where it belongs and snaps onto the line when the animation ends. The
   resting state is right, so this survives a screenshot and is only caught
   by measuring during the entrance. .pin-in fades and leaves the transform
   alone. Do not "simplify" it back to .fg-in.

   THE NARROW BREAKPOINT IS 980px, NOT 1080. Stacking is a fallback and the
   stacked layout is 20-25% taller than the frame: at 1080 a 1024-wide
   projector fell into it and overflowed by a fifth. The wide layout is
   cramped at 1024 and still fits, which is the better failure.

   THE HUMAN'S MARK IS ON THE BOTTOM EDGE of the window, not the top. On the
   top edge it clears the window's name at 1440 and collides with it at 1920:
   both pills grow with the type scale, the wrap does not grow past 1240px,
   and this column is barely half of that.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string. It did once.) */

import { getLang } from '../core/i18n.js';

const TAG = 's24-setup-context';

const CONTENT = {
  en: {
    h1: 'What loads into <span class="fg-mark fg-mark--sweep">context</span> — and when?',
    windowLabel: 'Context window',
    admit: 'You choose what goes in',
    cost: 'Every request',
    bands: [
      {
        head: 'Session start',
        items: [
          { t: 'AGENTS.md', mono: true, d: 'Full content, every request' },
          { t: 'MCP servers', d: 'Tool definitions, every request' },
          { t: 'Skills <sup>*</sup>', d: 'Descriptions only (default)' },
        ],
      },
      {
        head: 'On use',
        items: [
          { t: 'Skills', d: 'Full content when invoked — and in every request after' },
        ],
      },
      {
        head: 'Isolated',
        items: [
          { t: 'Subagents', d: 'Fresh, own context' },
          { t: 'Hooks', d: 'External, zero tokens' },
        ],
      },
    ],
    legend: ['Always in context', 'Loads on use', 'Outside the main context'],
    note: 'Everything at session start is charged again on every request. <b>That is the bill for a setup, and why “connect everything” is the wrong instruction.</b>',
    footnote: '*Some tools let a skill stay fully unloaded until you invoke it explicitly.',
    stamp: 'Loading behaviour checked August 2026 — re-check before relying on it.',
    separate: 'Separate context',
    nowindow: 'No context window at all',
    returns: 'what it returns',
  },
  de: {
    h1: 'Wann lädt was in den <span class="fg-mark fg-mark--sweep">Kontext</span>?',
    windowLabel: 'Kontextfenster',
    admit: 'Du wählst, was hineinkommt',
    cost: 'Jede Anfrage',
    bands: [
      {
        head: 'Session-Start',
        items: [
          { t: 'AGENTS.md', mono: true, d: 'Voller Inhalt, jede Anfrage' },
          { t: 'MCP-Server', d: 'Tool-Definitionen, jede Anfrage' },
          { t: 'Skills <sup>*</sup>', d: 'Nur Beschreibungen (Standard)' },
        ],
      },
      {
        head: 'Bei Aufruf',
        items: [
          { t: 'Skills', d: 'Voller Inhalt bei Aufruf — und in jeder Anfrage danach' },
        ],
      },
      {
        head: 'Isoliert',
        items: [
          { t: 'Subagents', d: 'Frisch, eigener Kontext' },
          { t: 'Hooks', d: 'Extern, kein Token-Verbrauch' },
        ],
      },
    ],
    legend: ['Immer im Kontext', 'Lädt bei Aufruf', 'Außerhalb Hauptkontext'],
    note: 'Alles vom Session-Start kostet bei jeder Anfrage erneut. <b>Das ist die Rechnung für ein Setup — und warum „alles anbinden“ die falsche Anweisung ist.</b>',
    footnote: '*Manche Tools laden ein Skill erst dann, wenn du es explizit aufrufst.',
    stamp: 'Ladeverhalten geprüft August 2026 — vor Gebrauch erneut prüfen.',
    separate: 'Separater Kontext',
    nowindow: 'Gar kein Kontextfenster',
    returns: 'was er zurückgibt',
  },
};

const KIND = ['always', 'onuse', 'out'];

class Section24 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;

    const item = (it, cls, at) => `
      <div class="it it--${cls} fg-in" style="--fg-at: ${at}">
        <h4${it.mono ? ' class="mono"' : ''}>${it.t}</h4>
        <p>${it.d}</p>
      </div>`;

    const out = t.bands[2].items;

    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          gap: var(--ae-space-7);
          padding: var(--ae-space-4) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        /* NO min-height: 0 HERE, deliberately. The deck's usual body rule
           lets this box shrink below its own content, and the drawing then
           paints straight through the footnote with scrollHeight still equal
           to clientHeight — every overflow check passes while the slide is
           broken. Leaving the automatic minimum in place turns that silent
           overlap into an honest scrollbar. */
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-foot { margin-top: var(--ae-space-2); padding-top: var(--ae-space-2); }

        /* ═══════════ the boundary object ═══════════
           A context window is a real container, so its edge is a real line;
           it is the machine's plumbing, so the line is grey and never a
           chapter hue. The name is a pill straddling the border, paper-
           coloured so it punches a hole in the line — always ON the line,
           never inside as a heading, because a heading inside turns the box
           back into a card. */
        ${TAG} .bd {
          position: relative;
          border-radius: var(--ae-radius-lg);
          border: 1.5px solid var(--ae-cool-gray-300);
          background: var(--fg-card);
          box-shadow: var(--fg-d1);
        }
        ${TAG} .bd__name {
          position: absolute; top: 0; left: var(--ae-space-6);
          transform: translateY(-50%);
          display: inline-flex; align-items: center;
          padding: 3px 12px; border-radius: 999px;
          background: var(--fg-paper);
          border: 1.5px solid var(--ae-cool-gray-300);
          font-family: var(--ae-font); font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-caption); font-weight: 600;
          color: var(--fg-muted); white-space: nowrap; z-index: 4;
        }
        /* The human's mark on the edge. Filled ink pill, on the line. */
        ${TAG} .you {
          position: absolute; top: 0; right: var(--ae-space-6);
          transform: translateY(-50%);
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 14px; border-radius: 999px;
          background: var(--fg-ink); color: #fff;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption); font-weight: 600;
          white-space: nowrap; z-index: 5; box-shadow: var(--fg-d2);
        }
        ${TAG} .you::before { content: "\\2193"; font-weight: 700; opacity: 0.75; }

        /* Entrance for anything PINNED TO A LINE by a transform — see the
           header note. Fades, and leaves the transform alone. Same delay
           scale as .fg-in. Namespaced, or it collides with another slide. */
        ${TAG} .pin-in {
          animation: s24-pin-fade var(--fg-dur-rise) var(--ae-ease) both;
          animation-delay: calc(60ms + var(--fg-at, 0) * var(--fg-beat));
        }
        @keyframes s24-pin-fade { from { opacity: 0; } }
        @media print { ${TAG} .pin-in { animation: none !important; } }

        /* ═══════════ one item, and the form ramp ═══════════ */
        ${TAG} .it {
          padding-left: var(--ae-space-3);
          border-left: 3px solid transparent;
        }
        ${TAG} .it--always { border-left: 3px solid  var(--fg-fail); }
        ${TAG} .it--onuse  { border-left: 3px dashed var(--ae-cool-gray-300); }
        ${TAG} .it--out    { border-left: 3px dotted var(--ae-cool-gray-300); }
        ${TAG} .it h4 {
          margin: 0;
          font-family: var(--ae-font); font-weight: 700;
          font-size: var(--ae-fs-body); line-height: 1.3; color: var(--fg-ink);
        }
        /* File names take the code face. Ink, not the deck's code green:
           green is the Build chapter's hue and this slide is in no chapter.
           0.94 matches .fg-rows dd in the kit; at 0.92 the mono name
           measured under the deck's 14px floor. */
        ${TAG} .it h4.mono {
          font-family: var(--ae-font-mono); font-weight: 600;
          font-size: calc(var(--ae-fs-body) * 0.94); letter-spacing: 0;
        }
        /* The footnote marker takes the caption size rather than a fraction
           of an em: at 0.66em it rendered at 9.9px, well under the floor.
           --ae-fs-caption IS the floor, so the smallest glyph on the slide
           is a legal size. */
        ${TAG} .it h4 sup { font-size: var(--ae-fs-caption); vertical-align: top; line-height: 1; }
        ${TAG} .it p {
          margin: 0;
          font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        /* The band head: the MOMENT something loads. The legend below names
           the STATE that moment leaves it in. */
        ${TAG} .bandhead {
          display: flex; flex-wrap: wrap; align-items: baseline;
          gap: 2px var(--ae-space-3);
          margin-bottom: var(--ae-space-3);
        }
        ${TAG} .bandhead h3 {
          margin: 0; font-family: var(--ae-font-head); font-weight: 600;
          font-size: var(--ae-fs-h4); line-height: 1.16; color: var(--fg-ink);
        }
        /* The price tag. Radius is small, not a pill: the German runs long
           and a wrapped 999px pill looks like a mistake. */
        ${TAG} .cost {
          display: inline-flex; align-items: baseline; gap: 6px;
          padding: 2px 9px; border-radius: var(--ae-radius-sm);
          font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 700;
          background: var(--fg-fail-tint); color: var(--fg-fail-d);
          border: 1.5px solid var(--fg-fail);
        }
        ${TAG} .cost::before { content: "\\21BB"; font-weight: 700; }

        /* ═══════════ the legend ═══════════
           Kept, because it is a KEY and not a repetition: it maps the three
           stroke styles onto the three states. */
        ${TAG} .legend {
          display: flex; flex-wrap: wrap;
          gap: var(--ae-space-3) var(--ae-space-6);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }
        ${TAG} .legend .lg { display: inline-flex; align-items: center; gap: 9px; }
        ${TAG} .sw {
          flex: none; width: 18px; height: 18px; border-radius: 4px;
          background: transparent; border: 1.5px solid transparent;
        }
        ${TAG} .sw--always { background: var(--fg-fail-tint); border: 1.5px solid  var(--fg-fail); }
        ${TAG} .sw--onuse  { border: 1.5px dashed var(--ae-cool-gray-300); }
        ${TAG} .sw--out    { border: 1.5px dotted var(--ae-cool-gray-300); }

        ${TAG} .note-row { margin-top: var(--ae-space-4); }

        /* ═══════════ three places ═══════════ */
        ${TAG} .places {
          --retgap: clamp(60px, 6.4vw, 92px);
          display: grid;
          /* The first place is 2.3 of 4.3, not 1.9 of 3.84. Its two item
             columns were ~230px at the type floor, which is under the German
             "Tool-Definitionen, jede Anfrage" and put a ragged second line on
             three of the four rows. */
          grid-template-columns: minmax(0, 2.3fr) minmax(0, 1fr) minmax(0, 1fr);
          grid-template-rows: auto auto;
          column-gap: var(--retgap);
          /* The name chips in row 2 straddle their walls' top edges and rise
             half their height into row 1. Without this gap they sat on top of
             the "Isolated" head — 14px of measured overlap. */
          row-gap: var(--ae-space-3);
          align-items: start;
        }
        /* "Isolated" is the third column head and it has nowhere else to go:
           the two places under it carry their own names on their own edges,
           and the group they form needs saying once. */
        ${TAG} .isohead {
          grid-column: 2 / -1; grid-row: 1;
          align-self: end; padding-bottom: var(--ae-fs-small);
        }
        ${TAG} .mine   { grid-column: 1; grid-row: 2; }
        ${TAG} .theirs { grid-column: 2; grid-row: 2; }
        ${TAG} .none   { grid-column: 3; grid-row: 2; }
        ${TAG} .bd { padding: var(--ae-space-6) var(--ae-space-5) var(--ae-space-4); }
        ${TAG} .mine .band + .band {
          margin-top: var(--ae-space-3); padding-top: var(--ae-space-3);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .mine .items {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: var(--ae-space-3) var(--ae-space-5);
        }
        ${TAG} .mine .band--onuse .items { grid-template-columns: minmax(0, 1fr); }
        /* The human's mark goes on the BOTTOM edge here — see the header
           note. Reserved padding, not a margin: the ink pill hangs half its
           height into it, written in terms of the type size because the pill
           grows with --ae-fs-caption while a constant reserve would stop
           clearing it. */
        ${TAG} .mine .you {
          top: auto; bottom: 0; left: var(--ae-space-5); right: auto;
          transform: translateY(50%);
        }
        ${TAG} .mine { padding-bottom: calc(var(--ae-space-3) + var(--ae-fs-caption)); }
        /* The other half of the pill hangs BELOW the wall, into the gap above
           the legend. At the shared margin the pill's underside and the first
           legend swatch were three pixels apart at the type floor. */
        ${TAG} .legend { margin-top: calc(var(--ae-space-4) + var(--ae-fs-caption)); }
        ${TAG} .theirs { position: relative; }
        /* The return. Solid, grey and pointed: it is supposed to cross. Drawn
           OVER the wall rather than through a punched hole — a hole is the
           mark for an edge that failed, and nothing here failed. CSS borders,
           not SVG: an SVG arrowhead with preserveAspectRatio="none" smears,
           which has already bitten this deck. */
        ${TAG} .cross {
          position: absolute; top: 50%;
          left: calc(-1 * var(--retgap) - 2px);
          width: calc(var(--retgap) + 4px); height: 0;
          border-top: 2px solid var(--ae-cool-gray-400); z-index: 3;
        }
        ${TAG} .cross::after {
          content: ''; position: absolute; left: -1px; top: -6px;
          border-top: 6px solid transparent; border-bottom: 6px solid transparent;
          border-right: 8px solid var(--ae-cool-gray-400);
        }
        /* The label goes UNDER the arrow, not over it. Over it, its top ran
           into the "Isolated" head that sits above this column. */
        ${TAG} .crosslab {
          position: absolute; top: calc(50% + 9px);
          left: calc(-1 * var(--retgap) - 2px); width: calc(var(--retgap) + 4px);
          text-align: center; z-index: 3;
          font-family: var(--ae-font); font-size: var(--ae-fs-caption);
          line-height: 1.2; font-weight: 600; color: var(--fg-faint);
        }
        /* No container. Not a ghost outline, not a dashed box — nothing. This
           place gets a NAME on the same line as the other two names and then
           no wall under it. The chip is dotted, which is where the form ramp
           ends. padding-top matches .bd's so the item under the missing wall
           sits at the same height as the items under the two real ones. */
        ${TAG} .none { position: relative; padding-top: var(--ae-space-6); }
        ${TAG} .none__lab {
          position: absolute; top: 0; left: 0; transform: translateY(-50%);
          display: inline-flex; align-items: center;
          padding: 3px 12px; border-radius: 999px;
          background: var(--fg-paper);
          border: 1.5px dotted var(--ae-cool-gray-300);
          font-family: var(--ae-font); font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-caption); font-weight: 600;
          color: var(--fg-faint); white-space: nowrap; z-index: 4;
        }

        /* ═══════════ narrow ═══════════
           980px, not 1080 — see the header note. */
        @media (max-width: 980px) {
          ${TAG} .places {
            grid-template-columns: 1fr; grid-template-rows: auto;
            row-gap: var(--ae-space-6);
          }
          /* The children carry explicit column and row placement, so a
             one-column grid has to release it or all three places stack in
             the same cell. */
          ${TAG} .isohead, ${TAG} .mine, ${TAG} .theirs, ${TAG} .none {
            grid-column: 1; grid-row: auto; align-self: start;
          }
          /* .mine keeps its bottom padding — the ink pill still hangs in. */
          ${TAG} .isohead { padding-bottom: 0; }
          ${TAG} .cross, ${TAG} .crosslab { display: none; }
          ${TAG} .none { padding-top: 0; }
          ${TAG} .mine .items { grid-template-columns: 1fr; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
      </div>
      <div class="fg-wrap body">
        <div class="places">
          <span class="fg-label isohead fg-in" style="--fg-at: 5">${t.bands[2].head}</span>

          <div class="bd mine fg-in" style="--fg-at: 3">
            <span class="bd__name">${t.windowLabel}</span>
            <span class="you pin-in" style="--fg-at: 4">${t.admit}</span>
            <div class="band band--always">
              <div class="bandhead fg-in" style="--fg-at: 4">
                <h3>${t.bands[0].head}</h3>
                <span class="cost">${t.cost}</span>
              </div>
              <div class="items">
                ${t.bands[0].items.map((it, i) => item(it, 'always', 5 + i)).join('')}
              </div>
            </div>
            <div class="band band--onuse">
              <div class="bandhead fg-in" style="--fg-at: 6"><h3>${t.bands[1].head}</h3></div>
              <div class="items">${item(t.bands[1].items[0], 'onuse', 8)}</div>
            </div>
          </div>

          <div class="theirs">
            <div class="bd fg-in" style="--fg-at: 6">
              <span class="bd__name">${t.separate}</span>
              ${item(out[0], 'out', 8)}
            </div>
            <i class="cross fg-in" aria-hidden="true" style="--fg-at: 9"></i>
            <span class="crosslab fg-in" style="--fg-at: 9">${t.returns}</span>
          </div>

          <div class="none">
            <span class="none__lab pin-in" style="--fg-at: 7">${t.nowindow}</span>
            ${item(out[1], 'out', 9)}
          </div>
        </div>

        <div class="legend fg-in" style="--fg-at: 10">
          ${t.legend.map((l, i) => `
            <span class="lg"><i class="sw sw--${KIND[i]}"></i>${l}</span>
          `).join('')}
        </div>

        <p class="fg-note note-row fg-in" style="--fg-at: 11">${t.note}</p>
      </div>
      <div class="fg-wrap foot">
        <div class="fg-foot fg-in" style="--fg-at: 12">
          <span>${t.footnote}</span><span>${t.stamp}</span>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section24);
