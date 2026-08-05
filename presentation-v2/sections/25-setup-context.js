/* Section 25 — Setup, slide 2 of 2: what having them costs.
   The device is the boundary: a drawn context window with what sits inside
   it, and beside it what deliberately does not. This is the slide that makes
   the previous one an engineering decision rather than a feature list — the
   first column is re-sent with every request, and that is the whole argument
   against connecting everything.

   The shape is carried over from "When features load into context"
   (Anthropic), which the first version of this talk adapted. */

import { getLang } from '../core/i18n.js';

const TAG = 's25-setup-context';

const CONTENT = {
  en: {
    h1: 'What loads into context, and <span class="fg-mark fg-mark--sweep">when</span>',
    lede: `Two of the five are re-sent with every request you make, whether that
           request needs them or not. That is the bill for a setup, and it is
           why “connect everything” is the wrong instruction.`,
    windowLabel: 'The context window',
    cols: [
      {
        head: 'At session start',
        cost: 'Charged on every request',
        items: [
          { t: 'AGENTS.md', mono: true, d: 'The full file. Not a summary, not the relevant part — all of it, every time.' },
          { t: 'MCP servers', d: 'The tool definitions of every connected server, whether this request touches them or not.' },
        ],
      },
      {
        head: 'On use',
        items: [
          { t: 'Skills', d: 'The full procedure, only once it matches the task. Until then only its name and one-line description are in context.' },
        ],
      },
    ],
    outsideLabel: 'Outside it',
    outside: [
      { t: 'Subagents', d: 'Their own context window. What they read never enters yours — you get back what they return.' },
      { t: 'Hooks', d: 'Run outside the model entirely. Zero tokens, however often they fire.' },
    ],
    note: `Two of the five are charged on every request. <b>The other three are
           how a large setup stays cheap.</b>`,
    foot: 'Loading behaviour checked August 2026 — re-check before relying on it.',
  },
  de: {
    h1: 'Was wann in den <span class="fg-mark fg-mark--sweep">Kontext</span> lädt',
    lede: `Zwei der fünf werden mit jeder Anfrage erneut mitgeschickt, ob diese
           Anfrage sie braucht oder nicht. Das ist die Rechnung für ein Setup —
           und der Grund, warum „alles anbinden“ die falsche Anweisung ist.`,
    windowLabel: 'Das Kontextfenster',
    cols: [
      {
        head: 'Bei Session-Start',
        cost: 'Kostet bei jeder Anfrage',
        items: [
          { t: 'AGENTS.md', mono: true, d: 'Die ganze Datei. Keine Zusammenfassung, nicht der passende Teil — alles, jedes Mal.' },
          { t: 'MCP-Server', d: 'Die Tool-Definitionen jedes angebundenen Servers, ob diese Anfrage sie berührt oder nicht.' },
        ],
      },
      {
        head: 'Bei Aufruf',
        items: [
          { t: 'Skills', d: 'Der volle Ablauf, erst wenn er zur Aufgabe passt. Bis dahin stehen nur Name und ein Satz Beschreibung im Kontext.' },
        ],
      },
    ],
    outsideLabel: 'Außerhalb',
    outside: [
      { t: 'Subagents', d: 'Eigenes Kontextfenster. Was sie lesen, landet nie in deinem — du bekommst zurück, was sie liefern.' },
      { t: 'Hooks', d: 'Laufen komplett außerhalb des Modells. Null Tokens, so oft sie auch feuern.' },
    ],
    note: `Zwei der fünf kosten bei jeder Anfrage. <b>Die anderen drei sind der
           Grund, warum ein großes Setup trotzdem günstig bleibt.</b>`,
    foot: 'Ladeverhalten geprüft August 2026 — vor Gebrauch erneut prüfen.',
  },
};

class Section25 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} .fg-lede { margin-bottom: var(--ae-space-5); }

        ${TAG} .board {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.85fr);
          gap: var(--ae-space-4);
          align-items: start;
        }

        /* The window is a solid raised card; what sits outside it stays on the
           paper behind a dashed edge. The boundary is the slide's whole
           argument, so it is drawn rather than asserted in a heading — and it
           survives greyscale, which a colour difference would not. */
        ${TAG} .window { padding-bottom: var(--ae-space-4); }
        ${TAG} .outside {
          border: 1px dashed var(--fg-hair);
          border-radius: var(--ae-radius-lg);
          padding: var(--ae-space-5);
          background: transparent;
          box-shadow: none;
        }

        ${TAG} .panel-label { display: block; margin-bottom: var(--ae-space-4); }

        ${TAG} .split {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: var(--ae-space-4);
        }
        ${TAG} .split > div + div {
          padding-left: var(--ae-space-4);
          border-left: 1px solid var(--fg-hair);
        }

        ${TAG} .head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--ae-space-2);
          margin-bottom: var(--ae-space-3);
        }
        ${TAG} .head h3 {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h5);
          line-height: 1.2;
          font-weight: 600;
          color: var(--fg-ink);
        }
        /* The price tag. Mint, because it is the one thing on this slide the
           audience is meant to carry out of the room. */
        ${TAG} .cost {
          display: inline-block;
          padding: 2px 8px;
          border-radius: var(--ae-radius-sm);
          background: var(--fg-mint);
          color: var(--fg-green-d);
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          font-weight: 600;
        }

        ${TAG} ul { margin: 0; padding: 0; list-style: none; }
        ${TAG} li { padding: var(--ae-space-3) 0; border-bottom: 1px solid var(--fg-hair); }
        ${TAG} li:first-child { padding-top: 0; }
        ${TAG} li:last-child { border-bottom: 0; padding-bottom: 0; }
        ${TAG} li h4 {
          margin: 0 0 2px;
          font-size: var(--ae-fs-small);
          line-height: 1.3;
          font-weight: 600;
          color: var(--fg-ink);
        }
        /* File names take the code face; "Subagents" and "Hooks" are prose. */
        ${TAG} li h4.mono { font-family: var(--ae-font-mono); font-size: calc(var(--ae-fs-small) * 0.94); color: var(--fg-green-d); }
        ${TAG} li p {
          margin: 0;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-body);
        }

        ${TAG} .fg-note { margin-top: var(--ae-space-5); }

        @media (max-width: 1040px) {
          ${TAG} .board { grid-template-columns: 1fr; }
          ${TAG} .split > div + div { padding-left: 0; border-left: 0; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="board">
          <section class="window fg-card fg-card--raised fg-in" style="--fg-at: 3">
            <span class="fg-label fg-label--accent panel-label">${t.windowLabel}</span>
            <div class="split">
              ${t.cols.map((c, ci) => `
                <div>
                  <div class="head">
                    <h3>${c.head}</h3>
                    ${c.cost ? `<span class="cost">${c.cost}</span>` : ''}
                  </div>
                  <ul>
                    ${c.items.map((it, ii) => `
                      <li class="fg-in" style="--fg-at: ${5 + ci * 2 + ii}">
                        <h4${it.mono ? ' class="mono"' : ''}>${it.t}</h4>
                        <p>${it.d}</p>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </section>

          <section class="outside fg-in" style="--fg-at: 4">
            <span class="fg-label panel-label">${t.outsideLabel}</span>
            <ul>
              ${t.outside.map((it, ii) => `
                <li class="fg-in" style="--fg-at: ${8 + ii}">
                  <h4>${it.t}</h4>
                  <p>${it.d}</p>
                </li>
              `).join('')}
            </ul>
          </section>
        </div>

        <p class="fg-note fg-in" style="--fg-at: 10">${t.note}</p>
        <div class="fg-foot fg-in" style="--fg-at: 11"><span>${t.foot}</span></div>
      </div>
    `;
  }
}

customElements.define(TAG, Section25);
