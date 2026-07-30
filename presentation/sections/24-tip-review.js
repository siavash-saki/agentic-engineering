/* Tip 5 — Jeden Diff reviewen
   Visualization: a code diff with an "Auto-Accept" toggle crossed out.
   A line with a subtle bug glows red — the kind of thing that slips
   through if you just hit Accept. */

import { getLang } from '../core/i18n.js';

const TAG = 's24-tip-review';

const CONTENT = {
  en: {
    h1: 'Review <b>every diff</b>',
    lede: `Auto-accept is the trap: skip the diff and you ship code nobody
          understood — not even the agent that wrote it.`,
    toggleOff: 'Auto-Accept',
    toggleOn: 'Review by hand',
    bugLabel: 'subtle bug',
    note: `<code>=</code> instead of <code>===</code> — assigns <code>true</code> and returns it. Everyone is an admin.`,
  },
  de: {
    h1: '<b>Jeden Diff</b> reviewen',
    lede: `Auto-Accept ist die Falle: Wer den Diff nicht liest, übernimmt Code,
          den niemand verstanden hat — auch nicht der Agent, der ihn
          geschrieben hat.`,
    toggleOff: 'Auto-Accept',
    toggleOn: 'Manuell reviewen',
    bugLabel: 'subtiler Bug',
    note: `<code>=</code> statt <code>===</code> — weist <code>true</code> zu und gibt es zurück. Jeder ist Admin.`,
  },
};

class SectionTip05 extends HTMLElement {
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
          max-width: 860px;
          margin: 0 0 var(--ae-space-5);
        }

        ${TAG} .toggle-row {
          display: flex;
          gap: var(--ae-space-3);
          margin-bottom: var(--ae-space-4);
          align-items: center;
        }
        ${TAG} .toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--ae-cool-gray-100);
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-text-muted);
        }
        ${TAG} .toggle .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--ae-cool-gray-400);
        }
        ${TAG} .toggle.off { position: relative; }
        ${TAG} .toggle.off::after {
          content: "";
          position: absolute;
          left: 8px; right: 8px;
          top: 50%;
          height: 2px;
          background: var(--ae-red);
          transform: rotate(-6deg);
          transform-origin: center;
          opacity: 0;
          animation: tip05-strike 350ms var(--ae-ease) 560ms forwards;
        }
        ${TAG} .toggle.on {
          background: var(--ae-red);
          color: #fff;
          animation: fg-appear 350ms var(--ae-ease) calc(60ms + 6 * var(--fg-beat)) both;
        }
        ${TAG} .toggle.on .dot { background: #fff; }
        ${TAG} .arrow {
          color: var(--ae-text-muted);
          font-weight: 700;
          animation: fg-appear 350ms var(--ae-ease) calc(60ms + 5 * var(--fg-beat)) both;
        }

        ${TAG} .diff {
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          line-height: 1.7;
          background: #1c1f24;
          color: #e6e8eb;
          border-radius: var(--ae-radius);
          padding: var(--ae-space-3) 0;
          overflow: hidden;
          box-shadow: var(--fg-d2);
        }
        ${TAG} .diff .line {
          display: grid;
          grid-template-columns: 36px 1fr;
          padding: 0 14px;
        }
        ${TAG} .diff .gutter {
          color: #6b7280;
          font-size: var(--ae-fs-caption);
          padding-top: 2px;
        }
        ${TAG} .diff .code { white-space: pre; }
        ${TAG} .diff .add  { background: rgba(38, 162, 105, 0.18); }
        ${TAG} .diff .add  .gutter { color: #4ade80; }
        ${TAG} .diff .bug {
          position: relative;
          background: rgba(236, 0, 22, 0.32);
          animation: tip05-glow 1600ms ease-in-out 1000ms infinite;
        }
        ${TAG} .diff .bug::after {
          content: "${t.bugLabel}";
          position: absolute;
          right: 14px;
          /* a label is prose — the diff's mono face stops here */
          font-family: var(--ae-font);
          background: var(--ae-red);
          color: #fff;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 2px 8px;
          border-radius: 3px;
          animation: fg-appear 350ms var(--ae-ease) 1000ms both;
        }
        ${TAG} .note {
          margin: var(--ae-space-3) 0 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--ae-text-muted);
          text-align: center;
        }
        ${TAG} .note code {
          font-family: var(--ae-font-mono);
          background: var(--ae-cool-gray-100);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--ae-text-strong);
          font-weight: 700;
        }

        @keyframes tip05-strike {
          from { opacity: 0; transform: rotate(-6deg) scaleX(0); }
          to   { opacity: 1; transform: rotate(-6deg) scaleX(1); }
        }
        @keyframes tip05-glow {
          0%, 100% { box-shadow: inset 0 0 0 0 rgba(236, 0, 22, 0); }
          50%      { box-shadow: inset 0 0 0 2px rgba(236, 0, 22, 0.6); }
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1"><span class="fg-ord">5</span>${t.h1}</h1>
        <p class="lede fg-in" style="--fg-at: 2">
          ${t.lede}
        </p>

        <div class="toggle-row fg-in" style="--fg-at: 3">
          <span class="toggle off"><span class="dot"></span>${t.toggleOff}</span>
          <span class="arrow">→</span>
          <span class="toggle on"><span class="dot"></span>${t.toggleOn}</span>
        </div>

        <div class="diff fg-source fg-in" style="--fg-at: 7">
          <div class="line add"><span class="gutter">+ 42</span><span class="code">function checkAccess(user, role) {</span></div>
          <div class="line add"><span class="gutter">+ 43</span><span class="code">  if (user.role === role) return true;</span></div>
          <div class="line add bug"><span class="gutter">+ 44</span><span class="code">  if (user.isAdmin = true) return true;</span></div>
          <div class="line add"><span class="gutter">+ 45</span><span class="code">  return false;</span></div>
          <div class="line add"><span class="gutter">+ 46</span><span class="code">}</span></div>
        </div>

        <p class="note fg-in" style="--fg-at: 11">
          ${t.note}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip05);
