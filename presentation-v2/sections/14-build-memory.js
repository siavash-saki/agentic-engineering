/* Section 14 — One memory file, read by every tool.

   The idea is a CONVERGENCE — four tools, one file — and the slide used
   to render it as a two-column table of tool and path. A table lists
   peers side by side, which is the one relation this idea does not have:
   the point is that four separate lookups arrive at the SAME BYTES.

   So the file is drawn as ITSELF. A real source panel whose four
   sections are the four things that belong in it, which finally gives
   the frame to the half of the content the table starved — what goes IN
   the file. The tool mapping drops to marginalia on the right, which is
   what a dated lookup table is. The convergence is still drawn, just
   small: four ticks gather on one collector and one arrow points back
   at the panel.

   COLOUR. Two marks only, plus greys.
     · INK is the file. It is the human's artifact, the thing you wrote,
       and the human's mark is this deck's hard black stop. The panel
       carries a 1.5px ink edge and the middle elevation; nothing else
       on the slide gets either.
     · GREEN is the Build chapter hue and it is spent on exactly one
       thing: the command. The symlink is what makes the convergence
       literal rather than metaphorical.
     · GREY is the machine's plumbing — every stub, the collector, the
       arrowhead, and every path string except the one name they share.

   The shared name is inked inside the grey path strings, so AGENTS.md is
   visibly the same token in four different lookups before any line is
   followed. That distinction is weight plus lightness, not hue, so it
   survives a tired projector.

   ── Three things a future editor would otherwise undo ───────────────

   THE ARROWHEAD IS DERIVED FROM --gap, not picked. The trunk is the
   board's own column gap minus the head, so the head lands ON the
   panel's edge at every viewport. A clamp chosen by eye leaves a stray
   triangle floating short of the box the moment the viewport changes.

   THE TRUNK FADES RATHER THAN RISES. It is positioned with a translate
   of its own, and .fg-in would fight that transform and land the
   arrowhead off the line for the length of the entrance.

   THE MARGIN LABEL IS INDENTED BY THE STUB COLUMN so it sits over the
   rows it names rather than over the connectors — and the rule is a
   DIRECT-CHILD selector, because the command chip's label carries .lbl
   too and an unscoped rule indented that instead.

   THE DATE STAMP STAYS. Tool mappings are dated claims (CLAUDE.md) and
   this one will be wrong within months, so the footer carries the month
   it was checked.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string.) */

import { getLang } from '../core/i18n.js';

const TAG = 's14-build-memory';

/* The map is DECOMPOSED rather than rewritten: "pre" and "post" are the
   characters that sat either side of AGENTS.md in the original table
   cell, unchanged, so the one shared name can be drawn once instead of
   being set four times as an ordinary cell value. No new prose. */
const CONTENT = {
  en: {
    h1: 'One memory file, read by every tool',
    lede: `Each tool looks for its own file. Keeping four of them in sync is a
           job nobody does, so keep one file and point the others at it.`,
    cmdLabel: 'In the repository root',
    cmd: 'ln -s AGENTS.md CLAUDE.md',
    holdsLabel: 'What belongs in it',
    holds: [
      { t: 'The stack, and why', d: 'What is agreed, so it is not re-litigated every session.' },
      { t: 'Conventions', d: 'How commits are written, where tests live, what the build command is.' },
      { t: 'What is out of scope', d: 'Explicitly, with the reason. An agent will propose a deferred idea every time otherwise.' },
      { t: 'How you work', d: 'The loop itself: plan first, one commit per step, who reviews.' },
    ],
    mapLabel: 'Where each tool looks for it',
    file: 'AGENTS.md',
    map: [
      { tool: 'Claude Code', pre: 'CLAUDE.md → ', post: '' },
      { tool: 'Codex',       pre: '',            post: '' },
      { tool: 'Copilot',     pre: '',            post: ' · .github/copilot-instructions.md' },
      { tool: 'Cursor',      pre: '',            post: ' · .cursor/rules/' },
    ],
    foot: 'Tool paths verified July 2026 — re-check before relying on them.',
  },
  de: {
    h1: 'Eine Memory-Datei, gelesen von jedem Tool',
    lede: `Jedes Tool sucht seine eigene Datei. Vier davon synchron zu halten ist
           eine Aufgabe, die niemand erledigt — also eine Datei pflegen und die
           anderen darauf zeigen lassen.`,
    cmdLabel: 'Im Repository-Root',
    cmd: 'ln -s AGENTS.md CLAUDE.md',
    holdsLabel: 'Was hineingehört',
    holds: [
      { t: 'Der Stack, und warum', d: 'Was entschieden ist, damit es nicht jede Session neu verhandelt wird.' },
      { t: 'Konventionen', d: 'Wie Commits geschrieben werden, wo Tests liegen, wie gebaut wird.' },
      { t: 'Was nicht dazugehört', d: 'Ausdrücklich, mit Begründung. Sonst schlägt ein Agent jede zurückgestellte Idee erneut vor.' },
      { t: 'Wie gearbeitet wird', d: 'Der Loop selbst: erst planen, ein Commit pro Schritt, wer reviewt.' },
    ],
    mapLabel: 'Wo jedes Tool danach sucht',
    file: 'AGENTS.md',
    map: [
      { tool: 'Claude Code', pre: 'CLAUDE.md → ', post: '' },
      { tool: 'Codex',       pre: '',            post: '' },
      { tool: 'Copilot',     pre: '',            post: ' · .github/copilot-instructions.md' },
      { tool: 'Cursor',      pre: '',            post: ' · .cursor/rules/' },
    ],
    foot: 'Tool-Pfade geprüft Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section14 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: safe center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .head { flex: none; }
        ${TAG} .body {
          flex: none; display: flex; flex-direction: column;
          justify-content: safe center; min-height: 0;
        }
        ${TAG} .foot { flex: none; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 68ch; }
        ${TAG} .fg-foot { margin-top: var(--ae-space-4); }

        /* ═══════════ the board ═══════════
           --gap is declared here because two things are derived from it:
           the column gap itself, and the trunk that has to cross it. */
        ${TAG} .board {
          --gap: clamp(48px, 4.8vw, 78px);
          display: grid;
          grid-template-columns: minmax(0, 1.42fr) minmax(0, 1fr);
          column-gap: var(--gap);
          align-items: center;
        }

        /* ═══════════ the file, drawn as itself ═══════════ */
        ${TAG} .file {
          background: var(--fg-card);
          border: 1.5px solid var(--fg-ink);
          border-radius: var(--ae-radius-lg);
          box-shadow: var(--fg-d2);
          overflow: hidden;
        }
        ${TAG} .file__bar {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: var(--ae-space-4); flex-wrap: wrap;
          padding: var(--ae-space-3) var(--ae-space-5);
          border-bottom: 1.5px solid var(--fg-ink);
        }
        ${TAG} .file__name {
          font-family: var(--ae-font-mono); font-weight: 600;
          font-size: var(--ae-fs-h4); line-height: 1.2; color: var(--fg-ink);
        }
        /* Real file source, so the code face is correct throughout —
           including the prose, because prose inside a markdown file is
           still that file's source (slide kit, .fg-source). It is the
           hero here, so it is set a step up from the deck's small size
           rather than down. */
        ${TAG} .src {
          font-size: min(calc(var(--ae-fs-small) * 1.06), 18px);
          line-height: 1.6;
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        ${TAG} .sec + .sec { margin-top: var(--ae-space-3); }
        ${TAG} .sec .h { display: block; color: var(--fg-ink); font-weight: 600; }
        ${TAG} .sec .h i { font-style: normal; color: var(--fg-faint); }
        ${TAG} .sec .t { display: block; color: var(--fg-body); }

        /* ═══════════ the marginalia ═══════════ */
        ${TAG} .margin { --stub: clamp(24px, 2.6vw, 44px); }
        /* Direct child only. The command chip's label carries .lbl too,
           and an unscoped rule indented that instead of aligning the
           heading over the rows it names. */
        ${TAG} .margin > .lbl { margin: 0 0 0 calc(var(--stub) + var(--ae-space-3)); }
        ${TAG} .rows {
          position: relative;
          --rowh: clamp(52px, 7.4vh, 92px);
          display: grid;
          grid-template-columns: var(--stub) minmax(0, 1fr);
          grid-auto-rows: var(--rowh);
          align-items: center;
          column-gap: var(--ae-space-3);
          margin: var(--ae-space-2) 0;
        }
        ${TAG} .row { display: contents; }
        ${TAG} .stub { height: 2px; background: var(--ae-cool-gray-300); }
        ${TAG} .who {
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h5); line-height: 1.2; color: var(--fg-ink);
        }
        /* Path strings are plumbing: grey mono, with the one shared name
           inked so the repetition reads before the lines are followed.
           The size is capped as well as clamped — the type scale is tied
           to viewport HEIGHT while the frame is capped at 1240px, so on a
           1080p stage a mono row grows 20% while the box it sits in does
           not, which is how a long path ends up under the arrow. */
        ${TAG} .path {
          font-family: var(--ae-font-mono);
          font-size: min(calc(var(--ae-fs-small) * 0.94), 16px);
          line-height: 1.35; color: var(--fg-faint);
          overflow-wrap: anywhere;
        }
        ${TAG} .path b { color: var(--fg-ink); font-weight: 600; }

        /* Grey geometry, not the hairline value: a hairline is a
           separator, and these are lines the eye is meant to travel
           along. Both ends of the collector are derived from the row
           height, so it spans row 1's centre to row 4's centre exactly. */
        ${TAG} .collector {
          position: absolute; left: 0;
          top: calc(var(--rowh) / 2); bottom: calc(var(--rowh) / 2);
          width: 0; border-left: 2px solid var(--ae-cool-gray-300);
          transform-origin: top center;
          animation: s14-grow-y 620ms var(--ae-ease) both;
          animation-delay: calc(60ms + 7 * var(--fg-beat));
        }
        @keyframes s14-grow-y { from { transform: scaleY(0); } }

        /* The trunk fades rather than rises: it is positioned with a
           translate of its own, and fg-rise would fight that transform
           and land the arrowhead off the line for the whole entrance. */
        ${TAG} .trunk {
          position: absolute; right: 100%; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center;
          animation: fg-appear 340ms var(--ae-ease) both;
          animation-delay: calc(60ms + 9 * var(--fg-beat));
        }
        /* The trunk is the column gap minus the arrowhead, so the head
           lands ON the panel's edge at every viewport instead of
           floating short of it. Derived, never picked. */
        ${TAG} .trunk .bar {
          flex: none; width: calc(var(--gap) - 12px); height: 3px;
          background: var(--ae-cool-gray-300);
        }
        ${TAG} .trunk .head {
          flex: none; width: 0; height: 0;
          border-right: 12px solid var(--ae-cool-gray-300);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }

        /* ═══════════ the command: the one green thing ═══════════
           Stacked, not inline: the margin column is ~450px and the label
           plus the command do not share a line there — inline, both
           halves wrapped mid-phrase and the chip read as a broken
           paragraph. */
        ${TAG} .cmd {
          display: inline-flex; flex-direction: column; align-items: flex-start;
          gap: var(--ae-space-1);
          margin-top: var(--ae-space-3);
          background: var(--fg-mint); border-radius: var(--ae-radius);
          padding: var(--ae-space-3) var(--ae-space-4);
        }
        ${TAG} .cmd .lbl { color: var(--fg-green-d); }
        ${TAG} .cmd code {
          font-family: var(--ae-font-mono); font-size: var(--ae-fs-small);
          line-height: 1.2; color: var(--fg-green-d); font-weight: 500;
          white-space: nowrap;
        }

        /* The deck stacks below 980px rather than shrinking the drawing;
           the connectors are the first thing to go, because a lane that
           no longer runs anywhere is worse than no lane. */
        @media (max-width: 980px) {
          ${TAG} .board { grid-template-columns: 1fr; row-gap: var(--ae-space-5); }
          ${TAG} .trunk, ${TAG} .collector, ${TAG} .stub { display: none; }
          ${TAG} .rows { grid-template-columns: minmax(0, 1fr); }
          ${TAG} .margin > .lbl { margin-left: 0; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="board">
          <div class="file fg-in" style="--fg-at: 3">
            <div class="file__bar">
              <span class="file__name">${t.file}</span>
              <span class="fg-label">${t.holdsLabel}</span>
            </div>
            <div class="src fg-source">
              ${t.holds.map((h, i) => `
                <div class="sec fg-in" style="--fg-at: ${4 + i}">
                  <span class="h"><i>## </i>${h.t}</span>
                  <span class="t">${h.d}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="margin">
            <p class="fg-label lbl fg-in" style="--fg-at: 4">${t.mapLabel}</p>
            <div class="rows">
              ${t.map.map((m, i) => `
                <div class="row">
                  <i class="stub fg-in" style="--fg-at: ${5 + i}"></i>
                  <div class="fg-in" style="--fg-at: ${5 + i}">
                    <span class="who">${m.tool}</span>
                    <span class="path" style="display: block">${m.pre}<b>${t.file}</b>${m.post}</span>
                  </div>
                </div>
              `).join('')}
              <i class="collector" aria-hidden="true"></i>
              <span class="trunk" aria-hidden="true"><i class="head"></i><i class="bar"></i></span>
            </div>
            <div class="fg-in" style="--fg-at: 10">
              <span class="cmd">
                <span class="fg-label lbl">${t.cmdLabel}</span>
                <code>${t.cmd}</code>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="fg-wrap foot">
        <div class="fg-foot fg-in" style="--fg-at: 11"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section14);
