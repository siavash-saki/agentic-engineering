/* Section 15 — Skills and MCP.

   Two ways to give an agent something it does not have: a procedure it
   can load, and a system it can reach. The slide used to render them as
   two identical cards, which is exactly what this pair is not. They are
   siblings, but they are not symmetric:

     a SKILL is a procedure you own, a file sitting in your own repo;
     an MCP SERVER is somebody else's code, running inside your session,
     handing back text nobody on your team wrote.

   THE SLIDE IS BUILT ON THE TWO TEST SENTENCES, which used to be buried
   at the bottom of a card and are the sharpest lines here. They are the
   entry point now, because they are how a reader actually meets these
   two: you notice yourself typing the same thing twice, or copying out
   of another window. Each lane then resolves left to right — symptom,
   then mechanism, then where it lives.

   THE ASYMMETRY IS STRUCTURAL, NOT DECORATIVE. Lane two has a third
   beat that lane one does not have, hanging off it on a dotted lead.
   One lane is simply longer, which reads in greyscale, in print and
   from the back of the room. That third beat is the ownership claim,
   and it is the strongest thing the slide says about MCP: a server is
   somebody else's code in your session, and what it hands back is text
   nobody on your team wrote. It carries clay AND a dashed edge AND a
   tag word — three carriers, so desaturating loses none of it.

   COLOUR. Build chapter, so green, spent where the deck already spends
   it: the subtitle, the takeaway, the file paths. Clay is the only
   other hue and it is spent once, on the asymmetry. Two hues in the
   content is the ceiling.

   ── Four things a future editor would otherwise undo ────────────────

   THE PATHS ARE HTML-ESCAPED. The Claude Code skills path contains
   &lt;name&gt;, and a bare <name> in this template is parsed by innerHTML as
   an element — the brackets are eaten and the path renders as
   ".claude/skills//SKILL.md".

   THE LAST COLUMN IS SIZED FROM THE LONGEST PATH, not from an even
   split. At 0.95fr it could not hold that path beside its tool name,
   and .fg-rows__r's minmax(0, 1fr) key column obligingly collapsed to
   zero width and let the path print straight through "Claude Code".

   THE WRAP IS WIDER THAN THE DECK'S 1240px. The type scale is tied to
   viewport HEIGHT while .fg-wrap is a fixed cap, so on 1920x1080 the
   type grows ~35% and the column does not — every paragraph gains lines
   exactly where the stage has least room. Widening the wrap is the fix
   that costs no prose. Applied to head, body and foot together so every
   edge still aligns; the lede keeps its own 72ch cap so the reading
   measure does not move with it. Below a 1440px viewport it is a no-op.

   .fg-map's ground is --fg-paper, which is right inside a white card
   (slide 14) and invisible when the well sits directly ON the paper, as
   it does here. Inverted rather than recoloured: the well keeps the
   kit's padding and row rhythm and takes the deck's other existing
   surface. No new value.

   (No backticks anywhere in these comments: this block sits inside a JS
   template literal, and a backtick ends the string.) */

import { getLang } from '../core/i18n.js';

const TAG = 's15-build-skills';

const CONTENT = {
  en: {
    h1: 'Procedures it can load, systems it can reach',
    lede: `Two mechanisms, one purpose: stop re-explaining the same thing in
           every session, and stop copy-pasting from other systems into the
           prompt.`,
    testLabel: 'The test',
    mapLabel: 'Where each tool looks',
    warnTag: 'Not symmetric',
    warn: `A skill is your file, in your repo. A server is somebody else’s code
           running inside your session, and what it hands back is text nobody on
           your team wrote.`,
    pair: [
      {
        k: 'skill',
        t: 'Skills',
        sub: 'A procedure, on demand',
        d: 'Anything you have now explained twice — the release steps, the review checklist, how a new endpoint gets wired up — belongs in a file the model loads when it is relevant, not in a chat you are about to close.',
        test: 'You have typed it twice. Write it down the second time.',
        map: [
          ['Claude Code', '.claude/skills/&lt;name&gt;/SKILL.md'],
          ['Codex',       '.agents/skills/'],
          ['Copilot',     '.github/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        k: 'mcp',
        t: 'MCP',
        sub: 'A system, connected',
        d: 'Servers let the agent reach the issue tracker, the database, the docs, the design tool. The agent stops guessing at things it could look up, and you stop pasting.',
        test: 'You are copying from another window into the prompt.',
        map: [
          ['Claude Code', '.mcp.json'],
          ['Codex',       '.codex/config.toml'],
          ['Copilot',     '.vscode/mcp.json'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    foot: 'Tool paths verified July 2026 — re-check before relying on them.',
  },
  de: {
    h1: 'Abläufe zum Laden, Systeme zum Erreichen',
    lede: `Zwei Mechanismen, ein Zweck: nicht in jeder Session dasselbe erneut
           erklären, und nicht aus anderen Systemen in den Prompt kopieren.`,
    testLabel: 'Die Probe',
    mapLabel: 'Wo jedes Tool sucht',
    warnTag: 'Nicht symmetrisch',
    warn: `Ein Skill ist deine Datei, in deinem Repo. Ein Server ist fremder Code,
           der in deiner Session läuft, und was er zurückgibt, ist Text, den
           niemand aus deinem Team geschrieben hat.`,
    pair: [
      {
        k: 'skill',
        t: 'Skills',
        sub: 'Ein Ablauf, bei Bedarf',
        d: 'Alles, was zum zweiten Mal erklärt wurde — die Release-Schritte, die Review-Checkliste, wie ein neuer Endpunkt angeschlossen wird — gehört in eine Datei, die das Modell bei Bedarf lädt, und nicht in einen Chat, den du gleich schließt.',
        test: 'Du hast es zweimal getippt. Beim zweiten Mal aufschreiben.',
        map: [
          ['Claude Code', '.claude/skills/&lt;name&gt;/SKILL.md'],
          ['Codex',       '.agents/skills/'],
          ['Copilot',     '.github/skills/'],
          ['Cursor',      '.cursor/skills/'],
        ],
      },
      {
        k: 'mcp',
        t: 'MCP',
        sub: 'Ein System, angebunden',
        d: 'Server geben dem Agenten Zugriff auf Issue-Tracker, Datenbank, Doku, Design-Tool. Der Agent rät nicht mehr bei Dingen, die er nachschlagen könnte, und du kopierst nicht mehr.',
        test: 'Du kopierst aus einem anderen Fenster in den Prompt.',
        map: [
          ['Claude Code', '.mcp.json'],
          ['Codex',       '.codex/config.toml'],
          ['Copilot',     '.vscode/mcp.json'],
          ['Cursor',      '.cursor/mcp.json'],
        ],
      },
    ],
    foot: 'Tool-Pfade geprüft Juli 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section15 extends HTMLElement {
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
        ${TAG} .foot { flex: none; margin-top: var(--ae-space-3); }

        /* See the header comment: the wrap is wider here because the type
           scale grows with viewport height and this cap does not. */
        ${TAG} .fg-wrap { max-width: 1460px; }

        ${TAG} h1 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h2); line-height: var(--ae-lh-h2); color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin: 0; max-width: 72ch; }
        ${TAG} .fg-foot { margin-top: var(--ae-space-3); }

        /* ═══════════ the pair's typography, identical for both halves ═══ */
        ${TAG} .nm {
          margin: 0; font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h3); line-height: 1.1; color: var(--fg-ink);
        }
        ${TAG} .sub {
          margin: 3px 0 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          font-weight: 600; color: var(--fg-build-d);
        }
        ${TAG} .dsc {
          margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        /* ═══════════ the two lanes ═══════════ */
        ${TAG} .lanes { display: grid; row-gap: var(--ae-space-6); }
        /* The last column has to hold ".claude/skills/<name>/SKILL.md"
           beside its tool name; it is sized from that path, not from an
           even split. See the header comment for what happens otherwise. */
        ${TAG} .lane {
          display: grid;
          grid-template-columns:
            minmax(0, 0.85fr) auto minmax(0, 1.2fr) auto minmax(0, 1.35fr);
          grid-template-rows: auto auto auto;
          align-items: center;
          padding-top: var(--ae-space-5);
          border-top: 1px solid var(--fg-hair);
        }
        ${TAG} .c1 { grid-row: 1; grid-column: 1; }
        ${TAG} .c3 { grid-row: 1; grid-column: 3; }
        ${TAG} .c5 { grid-row: 1; grid-column: 5; }

        /* Rails and arrowheads in CSS borders: a stretched viewBox turns
           an arrowhead into a smear, a border triangle cannot distort. */
        ${TAG} .arw { grid-row: 1; display: flex; align-items: center; padding: 0 var(--ae-space-3); }
        ${TAG} .arw--a { grid-column: 2; }
        ${TAG} .arw--b { grid-column: 4; }
        ${TAG} .arw .tail {
          flex: none; width: clamp(14px, 1.9vw, 34px);
          height: 3px; background: var(--ae-cool-gray-300);
        }
        ${TAG} .arw .hd-r {
          flex: none; width: 0; height: 0;
          border-left: 12px solid var(--ae-cool-gray-300);
          border-top: 8px solid transparent; border-bottom: 8px solid transparent;
        }

        ${TAG} .sym {
          margin: 6px 0 0;
          font-family: var(--ae-font-head); font-weight: 700;
          font-size: var(--ae-fs-h4); line-height: 1.22; color: var(--fg-ink);
        }
        ${TAG} .hd2 { display: flex; align-items: baseline; gap: var(--ae-space-3); flex-wrap: wrap; }
        ${TAG} .hd2 .sub { margin: 0; }
        ${TAG} .c3 .dsc { margin-top: var(--ae-space-2); }
        ${TAG} .c5 .fg-label { margin-bottom: 6px; }

        /* See the header comment: paper on paper is invisible. */
        ${TAG} .fg-map { background: var(--fg-card); border: 1px solid var(--fg-hair); }

        /* ═══════════ the third beat, hanging off lane two ═══════════ */
        ${TAG} .lead {
          grid-row: 2; grid-column: 3; justify-self: start;
          margin-left: 26px; width: 0; height: var(--ae-space-4);
          border-left: 2px dotted var(--fg-fail);
        }
        ${TAG} .warn {
          grid-row: 3; grid-column: 3 / 6;
          display: flex; gap: var(--ae-space-4); align-items: baseline;
          padding: var(--ae-space-3) var(--ae-space-5);
          border-radius: var(--ae-radius-md);
          background: var(--fg-fail-tint); border: 1.5px dashed var(--fg-fail);
        }
        ${TAG} .warn .tag {
          flex: none; font-family: var(--ae-font);
          font-size: var(--ae-fs-caption); line-height: var(--ae-lh-caption);
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--fg-fail-d);
        }
        ${TAG} .warn p {
          margin: 0; font-size: var(--ae-fs-small); line-height: var(--ae-lh-small);
          color: var(--fg-fail-d);
        }

        /* THE 720p FLOOR. Below ~780px of viewport height the type scale
           is pinned at its pixel floors and stops shrinking while the
           stage keeps shrinking. These three rules buy back the last
           ~15px out of padding and leading only — no prose is dropped. */
        @media (max-height: 780px) {
          ${TAG} { padding-top: var(--ae-space-3); padding-bottom: var(--ae-space-3); }
          ${TAG} .fg-lede { line-height: 1.38; }
          ${TAG} .foot { margin-top: var(--ae-space-3); }
        }

        /* THE NAV-WRAP BAND. Between the narrow stack and 1280px the
           deck's OWN nav bar wraps to two rows and the stage loses a
           further 26px, while the five-column lane is at its tightest
           and every prose column is gaining a line. Body content painted
           over the footer there — silently, because .body { flex: 1 }
           lets an over-tall child shrink its own box and paint outside
           it, so the section still reported scrollHeight === clientHeight.
           The ~30px comes back out of the row rhythm only; no prose is
           dropped, and the presentation target is untouched because the
           nav does not wrap at 1280px or above. */
        @media (max-height: 780px) and (max-width: 1279px) {
          ${TAG} .lanes { row-gap: var(--ae-space-4); }
          ${TAG} .lane { padding-top: var(--ae-space-4); }
          ${TAG} .sym { margin-top: 2px; }
          ${TAG} .c3 .dsc { margin-top: var(--ae-space-1); }
          ${TAG} .c5 .fg-label { margin-bottom: 2px; }
          ${TAG} .dsc, ${TAG} .warn p { line-height: 1.38; }
        }

        @media (max-width: 1000px) {
          ${TAG} .lane { grid-template-columns: 1fr; row-gap: var(--ae-space-4); }
          ${TAG} .c1, ${TAG} .c3, ${TAG} .c5 { grid-column: 1; grid-row: auto; }
          ${TAG} .arw, ${TAG} .lead { display: none; }
          ${TAG} .warn { grid-column: 1; grid-row: auto; }
        }
      </style>
      <div class="fg-wrap head">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>
      </div>
      <div class="fg-wrap body">
        <div class="lanes">
          ${t.pair.map((c, i) => {
            const at = 3 + i * 3;
            return `
            <div class="lane">
              <div class="c1 fg-in" style="--fg-at: ${at}">
                <p class="fg-label">${t.testLabel}</p>
                <p class="sym">${c.test}</p>
              </div>
              <div class="arw arw--a fg-in" style="--fg-at: ${at + 1}" aria-hidden="true">
                <i class="tail"></i><i class="hd-r"></i>
              </div>
              <div class="c3 fg-in" style="--fg-at: ${at + 1}">
                <div class="hd2"><h3 class="nm">${c.t}</h3><p class="sub">${c.sub}</p></div>
                <p class="dsc">${c.d}</p>
              </div>
              <div class="arw arw--b fg-in" style="--fg-at: ${at + 2}" aria-hidden="true">
                <i class="tail"></i><i class="hd-r"></i>
              </div>
              <div class="c5 fg-in" style="--fg-at: ${at + 2}">
                <p class="fg-label">${t.mapLabel}</p>
                <div class="fg-map">
                  <dl class="fg-rows">
                    ${c.map.map(([k, v]) => `
                      <div class="fg-rows__r"><dt>${k}</dt><dd>${v}</dd></div>
                    `).join('')}
                  </dl>
                </div>
              </div>
              ${c.k === 'mcp' ? `
                <i class="lead fg-in" style="--fg-at: 9" aria-hidden="true"></i>
                <div class="warn fg-in" style="--fg-at: 9">
                  <span class="tag">${t.warnTag}</span>
                  <p>${t.warn}</p>
                </div>
              ` : ''}
            </div>
            `;
          }).join('')}
        </div>
      </div>
      <div class="fg-wrap foot">
        <div class="fg-foot fg-in" style="--fg-at: 10"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section15);
