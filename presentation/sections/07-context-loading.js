/* Section 7 — Wann lädt was in den Kontext?
   Framework-agnostic version: AGENTS.md statt CLAUDE.md.
   Inspired by "When features load into context" — Anthropic. */

import { getLang } from '../core/i18n.js';

const TAG = 's07-context-loading';

const CONTENT = {
  en: {
    h1: 'What loads into <b>context</b> — and when?',
    headSessionStart: 'Session start',
    headOnUse: 'On use',
    headIsolated: 'Isolated',
    panelContextWindow: 'Context window',
    panelSeparate: 'Separate context',
    sessionStart: [
      { title: 'AGENTS.md',  sub: 'Full content, every request' },
      { title: 'MCP servers', sub: 'Tool definitions, every request' },
      { title: 'Skills <sup>*</sup>',     sub: 'Descriptions only (default)' },
    ],
    onUse: [
      { title: 'Skills',     sub: 'Full content when invoked' },
    ],
    subagentsTitle: 'Subagents',
    subagentsSub: 'Fresh, own context',
    hooksTitle: 'Hooks',
    hooksSub: 'External, zero tokens',
    legendAlways: 'Always in context',
    legendOnUse: 'Loads on use',
    legendIsolated: 'Outside the main context',
    footnote: '*Some tools let a skill stay fully unloaded until you invoke it explicitly.',
  },
  de: {
    h1: 'Wann lädt was in den <b>Kontext</b>?',
    headSessionStart: 'Session-Start',
    headOnUse: 'Bei Aufruf',
    headIsolated: 'Isoliert',
    panelContextWindow: 'Kontextfenster',
    panelSeparate: 'Separater Kontext',
    sessionStart: [
      { title: 'AGENTS.md',  sub: 'Voller Inhalt, jede Anfrage' },
      { title: 'MCP-Server', sub: 'Tool-Definitionen, jede Anfrage' },
      { title: 'Skills <sup>*</sup>',     sub: 'Nur Beschreibungen (Standard)' },
    ],
    onUse: [
      { title: 'Skills',     sub: 'Voller Inhalt bei Aufruf' },
    ],
    subagentsTitle: 'Subagents',
    subagentsSub: 'Frisch, eigener Kontext',
    hooksTitle: 'Hooks',
    hooksSub: 'Extern, kein Token-Verbrauch',
    legendAlways: 'Immer im Kontext',
    legendOnUse: 'Lädt bei Aufruf',
    legendIsolated: 'Außerhalb Hauptkontext',
    footnote: '*Manche Tools laden ein Skill erst dann, wenn du es explizit aufrufst.',
  },
};

class Section07Context extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          --c-always-bg:      #EFEFEC;
          --c-always-fg:      #2A2A28;
          --c-always-border:  #D9D9D5;
          --c-onuse-bg:       #DDF1E3;
          --c-onuse-border:   #6FBE89;
          --c-onuse-fg:       #1A5C2F;
          --c-sep-bg:         #FCE4D6;
          --c-sep-border:     #E6A887;
          --c-sep-fg:         #7E3A14;
          --c-ext-bg:         #FFFFFF;
          --c-ext-border:     #C9C9C2;
          --c-ext-fg:         var(--ae-text-strong);

          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-5);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }

        /* Column headers row */
        ${TAG} .headers {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: var(--ae-space-4);
          margin-bottom: 10px;
        }
        ${TAG} .headers .left-heads {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ae-space-4);
        }
        ${TAG} .headers .h {
          text-align: center;
          font-size: var(--ae-fs-caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--ae-text-muted);
        }

        /* Main grid */
        ${TAG} .stage {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: var(--ae-space-4);
          margin-bottom: var(--ae-space-5);
        }
        ${TAG} .panel {
          position: relative;
          border: 1.5px solid var(--ae-cool-gray-200);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-5) var(--ae-space-4) var(--ae-space-4);
          background: rgba(255,255,255,0.55);
        }
        ${TAG} .panel-label {
          position: absolute;
          top: -10px;
          left: 18px;
          background: var(--ae-bg);
          padding: 0 8px;
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-text-muted);
        }

        ${TAG} .ctx-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ae-space-4);
          position: relative;
        }
        ${TAG} .ctx-cols::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -4px;
          bottom: -4px;
          width: 0;
          border-left: 1.5px dashed var(--ae-cool-gray-200);
        }
        ${TAG} .col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        ${TAG} .right-stack {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-3);
        }

        /* Boxes */
        /* The choreography IS the diagram: the
           session-start items land TOGETHER — one slot, one thud — because
           that is what session start means. The on-use item arrives alone
           and later, and keeps a gentle cue that it loads on demand. The
           isolated items arrive last, outside the window. */
        ${TAG} .box {
          padding: 14px 18px;
          border-radius: var(--ae-radius);
          border: 1.5px solid transparent;
        }
        ${TAG} .box .t {
          font-weight: 700;
          font-size: var(--ae-fs-body);
          line-height: 1.25;
          margin-bottom: 4px;
        }
        ${TAG} .box .s {
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          opacity: 0.88;
        }
        ${TAG} .box sup { font-size: 0.7em; vertical-align: top; }

        ${TAG} .box.always {
          background: var(--c-always-bg);
          color: var(--c-always-fg);
          border-color: var(--c-always-border);
        }
        ${TAG} .box.on-use {
          background: var(--c-onuse-bg);
          color: var(--c-onuse-fg);
          border: 1.5px dashed var(--c-onuse-border);
          position: relative;
        }
        ${TAG} .box.on-use::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: calc(var(--ae-radius) + 2px);
          border: 1.5px solid var(--c-onuse-border);
          pointer-events: none;
          opacity: 0;
          animation: s07c-pulse 2.8s var(--ae-ease) infinite;
          animation-delay: 2.1s;
        }
        ${TAG} .box.separate {
          background: var(--c-sep-bg);
          color: var(--c-sep-fg);
          border-color: var(--c-sep-border);
        }
        ${TAG} .box.external {
          background: var(--c-ext-bg);
          color: var(--c-ext-fg);
          border-color: var(--c-ext-border);
        }


        ${TAG} .legend {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ae-space-5);
          font-size: var(--ae-fs-small);
          color: var(--ae-text-muted);
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} .legend .item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        ${TAG} .swatch {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          background: var(--c-always-bg);
          border: 1.5px solid var(--c-always-border);
        }
        ${TAG} .swatch.on-use {
          background: var(--c-onuse-bg);
          border: 1.5px dashed var(--c-onuse-border);
        }
        ${TAG} .swatch.isolated {
          background: var(--c-ext-bg);
          border: 1.5px solid var(--c-ext-border);
        }

        ${TAG} .footnote {
          font-size: var(--ae-fs-small);
          color: var(--ae-text-muted);
          margin: 0;
        }

        @keyframes s07c-pulse {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.05); opacity: 0;   }
          100% { transform: scale(1.05); opacity: 0;   }
        }

        @media (max-width: 980px) {
          ${TAG} .headers,
          ${TAG} .stage { grid-template-columns: 1fr; }
          ${TAG} .ctx-cols { grid-template-columns: 1fr; }
          ${TAG} .ctx-cols::before { display: none; }
          ${TAG} .headers .left-heads { grid-template-columns: 1fr 1fr; }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="headers fg-in" style="--fg-at: 2">
          <div class="left-heads">
            <div class="h">${t.headSessionStart}</div>
            <div class="h">${t.headOnUse}</div>
          </div>
          <div class="h">${t.headIsolated}</div>
        </div>

        <div class="stage">
          <div class="panel fg-in" style="--fg-at: 3">
            <span class="panel-label">${t.panelContextWindow}</span>
            <div class="ctx-cols">
              <div class="col">
                ${t.sessionStart.map(it => `
                  <div class="box always fg-in" style="--fg-at: 5">
                    <div class="t">${it.title}</div>
                    <div class="s">${it.sub}</div>
                  </div>
                `).join('')}
              </div>
              <div class="col">
                ${t.onUse.map(it => `
                  <div class="box on-use fg-in" style="--fg-at: 8">
                    <div class="t">${it.title}</div>
                    <div class="s">${it.sub}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="right-stack">
            <div class="panel fg-in" style="--fg-at: 10">
              <span class="panel-label">${t.panelSeparate}</span>
              <div class="box separate">
                <div class="t">${t.subagentsTitle}</div>
                <div class="s">${t.subagentsSub}</div>
              </div>
            </div>
            <div class="panel fg-in" style="--fg-at: 11">
              <div class="box external">
                <div class="t">${t.hooksTitle}</div>
                <div class="s">${t.hooksSub}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="legend fg-in" style="--fg-at: 12">
          <span class="item"><span class="swatch"></span> ${t.legendAlways}</span>
          <span class="item"><span class="swatch on-use"></span> ${t.legendOnUse}</span>
          <span class="item"><span class="swatch isolated"></span> ${t.legendIsolated}</span>
        </div>

        <p class="footnote fg-in" style="--fg-at: 12">
          ${t.footnote}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section07Context);
