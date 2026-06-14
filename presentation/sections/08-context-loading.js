/* Section 8 — Wann lädt was in den Kontext?
   Framework-agnostic version: AGENTS.md statt CLAUDE.md.
   Inspired by "When features load into context" — Anthropic.
   Content lives in a { en, de } map, selected at render time via getLang(). */

import { getLang } from '../core/i18n.js';

const TAG = 's08-context-loading';

const CONTENT = {
  en: {
    eyebrow: 'Context economy',
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
    footnote: '*Skills with <code>disableModelInvocation: true</code> load nothing until you call them explicitly.',
  },
  de: {
    eyebrow: 'Kontext-Ökonomie',
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
    footnote: '*Skills mit <code>disableModelInvocation: true</code> laden nichts, bis du sie explizit aufrufst.',
  },
};

class Section08Context extends HTMLElement {
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
          --c-ext-fg:         var(--db-text-strong);

          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-5) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: s08c-fade 500ms var(--db-ease) 60ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-5);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: s08c-fade 600ms var(--db-ease) 180ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }

        /* Column headers row */
        ${TAG} .headers {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: var(--db-space-4);
          margin-bottom: 10px;
          opacity: 0;
          animation: s08c-fade 500ms var(--db-ease) 280ms forwards;
        }
        ${TAG} .headers .left-heads {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--db-space-4);
        }
        ${TAG} .headers .h {
          text-align: center;
          font-size: var(--db-fs-caption);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--db-text-muted);
        }

        /* Main grid */
        ${TAG} .stage {
          display: grid;
          grid-template-columns: 2.4fr 1fr;
          gap: var(--db-space-4);
          margin-bottom: var(--db-space-5);
        }
        ${TAG} .panel {
          position: relative;
          border: 1.5px solid var(--db-cool-gray-200);
          border-radius: var(--db-radius-md);
          padding: var(--db-space-5) var(--db-space-4) var(--db-space-4);
          background: rgba(255,255,255,0.55);
          opacity: 0;
          transform: translateY(8px);
          animation: s08c-rise 600ms var(--db-ease) 340ms forwards;
        }
        ${TAG} .panel-label {
          position: absolute;
          top: -10px;
          left: 18px;
          background: var(--db-bg);
          padding: 0 8px;
          font-size: var(--db-fs-small);
          font-weight: 700;
          color: var(--db-text-muted);
        }

        ${TAG} .ctx-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--db-space-4);
          position: relative;
        }
        ${TAG} .ctx-cols::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -4px;
          bottom: -4px;
          width: 0;
          border-left: 1.5px dashed var(--db-cool-gray-200);
        }
        ${TAG} .col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        ${TAG} .right-stack {
          display: flex;
          flex-direction: column;
          gap: var(--db-space-3);
        }
        ${TAG} .right-stack .panel { animation-delay: 480ms; }
        ${TAG} .right-stack .panel + .panel { animation-delay: 620ms; }

        /* Boxes */
        ${TAG} .box {
          padding: 14px 18px;
          border-radius: var(--db-radius);
          border: 1.5px solid transparent;
          opacity: 0;
          transform: translateY(8px);
          animation: s08c-rise 500ms var(--db-ease) forwards;
        }
        ${TAG} .box .t {
          font-weight: 700;
          font-size: var(--db-fs-body);
          line-height: 1.25;
          margin-bottom: 4px;
        }
        ${TAG} .box .s {
          font-size: var(--db-fs-small);
          line-height: var(--db-lh-small);
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
          border-radius: calc(var(--db-radius) + 2px);
          border: 1.5px solid var(--c-onuse-border);
          pointer-events: none;
          opacity: 0;
          animation: s08c-pulse 2.6s var(--db-ease) infinite;
          animation-delay: 1.2s;
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

        /* Staggered reveal */
        ${TAG} .ctx-cols .col:nth-child(1) .box:nth-of-type(1) { animation-delay: 460ms; }
        ${TAG} .ctx-cols .col:nth-child(1) .box:nth-of-type(2) { animation-delay: 560ms; }
        ${TAG} .ctx-cols .col:nth-child(1) .box:nth-of-type(3) { animation-delay: 660ms; }
        ${TAG} .ctx-cols .col:nth-child(2) .box:nth-of-type(1) { animation-delay: 780ms; }
        ${TAG} .right-stack .panel:nth-child(1) .box { animation-delay: 620ms; }
        ${TAG} .right-stack .panel:nth-child(2) .box { animation-delay: 740ms; }

        ${TAG} .legend {
          display: flex;
          flex-wrap: wrap;
          gap: var(--db-space-5);
          font-size: var(--db-fs-small);
          color: var(--db-text-muted);
          margin: 0 0 var(--db-space-3);
          opacity: 0;
          animation: s08c-fade 500ms var(--db-ease) 920ms forwards;
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
          font-size: var(--db-fs-small);
          color: var(--db-text-muted);
          margin: 0;
          opacity: 0;
          animation: s08c-fade 500ms var(--db-ease) 1040ms forwards;
        }
        ${TAG} .footnote code {
          background: var(--db-cool-gray-100);
          padding: 1px 6px;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.92em;
        }

        @keyframes s08c-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s08c-rise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes s08c-pulse {
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
        <span class="db-eyebrow">${t.eyebrow}</span>
        <h1>${t.h1}</h1>

        <div class="headers">
          <div class="left-heads">
            <div class="h">${t.headSessionStart}</div>
            <div class="h">${t.headOnUse}</div>
          </div>
          <div class="h">${t.headIsolated}</div>
        </div>

        <div class="stage">
          <div class="panel">
            <span class="panel-label">${t.panelContextWindow}</span>
            <div class="ctx-cols">
              <div class="col">
                ${t.sessionStart.map(it => `
                  <div class="box always">
                    <div class="t">${it.title}</div>
                    <div class="s">${it.sub}</div>
                  </div>
                `).join('')}
              </div>
              <div class="col">
                ${t.onUse.map(it => `
                  <div class="box on-use">
                    <div class="t">${it.title}</div>
                    <div class="s">${it.sub}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="right-stack">
            <div class="panel">
              <span class="panel-label">${t.panelSeparate}</span>
              <div class="box separate">
                <div class="t">${t.subagentsTitle}</div>
                <div class="s">${t.subagentsSub}</div>
              </div>
            </div>
            <div class="panel">
              <div class="box external">
                <div class="t">${t.hooksTitle}</div>
                <div class="s">${t.hooksSub}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="legend">
          <span class="item"><span class="swatch"></span> ${t.legendAlways}</span>
          <span class="item"><span class="swatch on-use"></span> ${t.legendOnUse}</span>
          <span class="item"><span class="swatch isolated"></span> ${t.legendIsolated}</span>
        </div>

        <p class="footnote">
          ${t.footnote}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section08Context);
