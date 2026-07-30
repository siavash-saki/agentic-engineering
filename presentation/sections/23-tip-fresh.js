/* Tip 4 — Kontext frisch halten
   Visualization: a context bar fills with colored topic chunks until
   it becomes muddied with confusion markers. A "New session" reset
   reveals a clean empty bar below. */

import { getLang } from '../core/i18n.js';

const TAG = 's23-tip-fresh';

const CONTENT = {
  en: {
    h1: 'Confused? <b>Fresh session</b>',
    lede: `A confused agent stays confused. Once the context is poisoned,
          every new prompt makes it worse — not better.`,
    chunks: [
      { l: 26, c: '#2563eb', t: 'Auth bug' },
      { l: 14, c: '#7c3aed', t: 'Search' },
      { l: 18, c: '#0891b2', t: 'CSS' },
      { l: 10, c: '#16a34a', t: 'Tests' },
      { l: 22, c: '#ca8a04', t: 'Refactor' },
    ],
    oldLabel: 'Session — 90 min old',
    oldMeta: '5 topics, a pile of corrections, hallucinations',
    warn: 'tangled',
    reset: 'New session',
    freshLabel: 'Session — fresh',
    freshMeta: 'one task, a clean start',
    freshBar: 'empty · a clear head',
  },
  de: {
    h1: 'Verwirrt? <b>Neue Session</b>',
    lede: `Ein verwirrter Agent bleibt verwirrt. Kontext, der einmal vergiftet ist,
          wird mit jedem Prompt schlimmer — nicht besser.`,
    chunks: [
      { l: 26, c: '#2563eb', t: 'Auth-Bug' },
      { l: 14, c: '#7c3aed', t: 'Search' },
      { l: 18, c: '#0891b2', t: 'CSS' },
      { l: 10, c: '#16a34a', t: 'Tests' },
      { l: 22, c: '#ca8a04', t: 'Refactor' },
    ],
    oldLabel: 'Session — 90 min alt',
    oldMeta: '5 Themen, mehrere Korrekturen, Halluzinationen',
    warn: 'vermischt',
    reset: 'Neue Session',
    freshLabel: 'Session — frisch',
    freshMeta: 'eine Aufgabe, klarer Anfang',
    freshBar: 'leer · klarer Kopf',
  },
};

class SectionTip04 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--ae-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
        }
        ${TAG} h1 b { color: var(--ae-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--ae-fs-lead);
          line-height: var(--ae-lh-lead);
          color: var(--ae-text);
          max-width: 820px;
          margin: 0 0 var(--ae-space-5);
        }

        /* Shape deliberately retained: the poisoned
           bar filling up, the reset, the clean bar — this slide already
           enacts its idea. Converted to the shared choreography; the chunk
           cascade keeps finer-than-beat delays, stated inline. */
        ${TAG} .bar-row {
          margin-bottom: var(--ae-space-4);
        }
        ${TAG} .bar-label {
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ae-text-muted);
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        ${TAG} .bar-label .meta {
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          font-size: var(--ae-fs-small);
          color: var(--ae-text-muted);
        }
        ${TAG} .bar-row.old .bar-label { color: var(--ae-text-muted); }
        ${TAG} .bar-row.fresh .bar-label { color: var(--ae-red); }

        ${TAG} .bar {
          height: 36px;
          border-radius: 6px;
          background: var(--ae-cool-gray-100);
          display: flex;
          overflow: hidden;
          position: relative;
        }
        ${TAG} .bar.old {
          box-shadow: inset 0 0 0 2px var(--ae-red);
        }
        ${TAG} .bar .chunk {
          height: 100%;
          position: relative;
          animation: fg-appear 250ms var(--ae-ease) both;
        }
        ${TAG} .bar .chunk::after {
          content: attr(data-t);
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
        }
        ${TAG} .bar.old .chunk:nth-child(1) { animation-delay: 440ms; }
        ${TAG} .bar.old .chunk:nth-child(2) { animation-delay: 530ms; }
        ${TAG} .bar.old .chunk:nth-child(3) { animation-delay: 620ms; }
        ${TAG} .bar.old .chunk:nth-child(4) { animation-delay: 710ms; }
        ${TAG} .bar.old .chunk:nth-child(5) { animation-delay: 800ms; }

        ${TAG} .bar.old .noise {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent 0 8px,
            rgba(180, 85, 44, 0.22) 8px 12px
          );
          animation: fg-appear 350ms var(--ae-ease) 880ms both;
        }
        ${TAG} .bar.old .warn {
          position: absolute;
          top: -10px;
          right: 8px;
          background: var(--fg-clay);
          color: #fff;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 8px;
          border-radius: 3px;
          animation: fg-appear 350ms var(--ae-ease) 950ms both;
        }

        ${TAG} .reset-row {
          display: flex;
          justify-content: center;
          margin: var(--ae-space-3) 0 var(--ae-space-2);
        }
        ${TAG} .reset {
          /* a button label is prose */
          font-family: var(--ae-font);
          background: var(--ae-red);
          color: #fff;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: var(--ae-fs-small);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        ${TAG} .reset::before {
          content: "↻";
          font-size: 16px;
        }

        ${TAG} .bar.fresh {
          box-shadow: inset 0 0 0 2px var(--fg-green);
          background: var(--fg-mint);
        }
        ${TAG} .bar.fresh::after {
          content: "${t.freshBar}";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ae-fs-small);
          color: var(--fg-green-d);
          font-weight: 700;
          letter-spacing: 0.04em;
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">4</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="bar-row old fg-in" style="--fg-at: 3">
          <div class="bar-label">
            <span>${t.oldLabel}</span>
            <span class="meta">${t.oldMeta}</span>
          </div>
          <div class="bar old">
            ${t.chunks.map(ch => `
              <div class="chunk" data-t="${ch.t}" style="background: ${ch.c}; width: ${ch.l}%;"></div>
            `).join('')}
            <div class="noise"></div>
            <div class="warn">${t.warn}</div>
          </div>
        </div>

        <div class="reset-row fg-in" style="--fg-at: 10">
          <span class="reset">${t.reset}</span>
        </div>

        <div class="bar-row fresh fg-in" style="--fg-at: 11">
          <div class="bar-label">
            <span>${t.freshLabel}</span>
            <span class="meta">${t.freshMeta}</span>
          </div>
          <div class="bar fresh"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip04);
