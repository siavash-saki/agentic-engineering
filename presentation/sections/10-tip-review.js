/* Tip 3 — Jeden Diff reviewen
   Visualization: a code diff with an "Auto-Accept" toggle crossed out.
   A line with a subtle bug glows red — the kind of thing that slips
   through if you just hit Accept. */

const TAG = 's10-tip-review';

class SectionTip03 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--db-space-6) var(--db-gutter);
          background: var(--db-bg);
          overflow: auto;
        }
        ${TAG} .wrap {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        ${TAG} .db-eyebrow {
          color: var(--db-red);
          margin-bottom: var(--db-space-3);
          opacity: 0;
          animation: tip03-fade 500ms var(--db-ease) 80ms forwards;
        }
        ${TAG} h1 {
          margin: 0 0 var(--db-space-3);
          font-size: var(--db-fs-h2);
          line-height: var(--db-lh-h2);
          opacity: 0;
          animation: tip03-fade 600ms var(--db-ease) 200ms forwards;
        }
        ${TAG} h1 b { color: var(--db-red); font-weight: inherit; }
        ${TAG} .lede {
          font-size: var(--db-fs-lead);
          line-height: var(--db-lh-lead);
          color: var(--db-text);
          max-width: 820px;
          margin: 0 0 var(--db-space-5);
          opacity: 0;
          animation: tip03-fade 600ms var(--db-ease) 340ms forwards;
        }

        ${TAG} .toggle-row {
          display: flex;
          gap: var(--db-space-3);
          margin-bottom: var(--db-space-4);
          align-items: center;
          opacity: 0;
          animation: tip03-fade 500ms var(--db-ease) 500ms forwards;
        }
        ${TAG} .toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--db-cool-gray-100);
          font-size: var(--db-fs-small);
          font-weight: 700;
          color: var(--db-text-muted);
        }
        ${TAG} .toggle .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--db-cool-gray-400);
        }
        ${TAG} .toggle.off { position: relative; }
        ${TAG} .toggle.off::after {
          content: "";
          position: absolute;
          left: 8px; right: 8px;
          top: 50%;
          height: 2px;
          background: var(--db-red);
          transform: rotate(-6deg);
          transform-origin: center;
          opacity: 0;
          animation: tip03-strike 400ms var(--db-ease) 900ms forwards;
        }
        ${TAG} .toggle.on {
          background: var(--db-red);
          color: #fff;
          opacity: 0;
          animation: tip03-fade 400ms var(--db-ease) 1100ms forwards;
        }
        ${TAG} .toggle.on .dot { background: #fff; }
        ${TAG} .arrow {
          color: var(--db-text-muted);
          font-weight: 700;
          opacity: 0;
          animation: tip03-fade 400ms var(--db-ease) 1000ms forwards;
        }

        ${TAG} .diff {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 14px;
          line-height: 1.7;
          background: #1c1f24;
          color: #e6e8eb;
          border-radius: var(--db-radius);
          padding: var(--db-space-3) 0;
          overflow: hidden;
          opacity: 0;
          animation: tip03-fade 500ms var(--db-ease) 1300ms forwards;
        }
        ${TAG} .diff .line {
          display: grid;
          grid-template-columns: 36px 1fr;
          padding: 0 14px;
        }
        ${TAG} .diff .gutter {
          color: #6b7280;
          font-size: 12px;
          padding-top: 2px;
        }
        ${TAG} .diff .code { white-space: pre; }
        ${TAG} .diff .add  { background: rgba(38, 162, 105, 0.18); }
        ${TAG} .diff .add  .gutter { color: #4ade80; }
        ${TAG} .diff .del  { background: rgba(236, 0, 22, 0.18); }
        ${TAG} .diff .del  .gutter { color: #f87171; }
        ${TAG} .diff .bug {
          position: relative;
          background: rgba(236, 0, 22, 0.32);
          animation: tip03-glow 1600ms ease-in-out 2000ms infinite;
        }
        ${TAG} .diff .bug::after {
          content: "subtiler Bug";
          position: absolute;
          right: 14px;
          background: var(--db-red);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 3px;
          opacity: 0;
          animation: tip03-fade 400ms var(--db-ease) 2200ms forwards;
        }
        ${TAG} .punch {
          margin: var(--db-space-5) 0 0;
          font-size: var(--db-fs-h4);
          line-height: var(--db-lh-h4);
          color: var(--db-text-strong);
          text-align: center;
          opacity: 0;
          animation: tip03-fade 600ms var(--db-ease) 2500ms forwards;
        }
        ${TAG} .punch b { color: var(--db-red); }

        @keyframes tip03-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tip03-strike {
          from { opacity: 0; transform: rotate(-6deg) scaleX(0); }
          to   { opacity: 1; transform: rotate(-6deg) scaleX(1); }
        }
        @keyframes tip03-glow {
          0%, 100% { box-shadow: inset 0 0 0 0 rgba(236, 0, 22, 0); }
          50%      { box-shadow: inset 0 0 0 2px rgba(236, 0, 22, 0.6); }
        }
      </style>
      <div class="wrap">
        <span class="db-eyebrow">Tip 3 · Disziplin</span>
        <h1>Auto-Accept ist die <b>Falle</b></h1>
        <p class="lede">
          Wer den Diff nicht liest, übernimmt Code, den niemand verstanden hat
          — auch nicht der Agent, der ihn geschrieben hat.
        </p>

        <div class="toggle-row">
          <span class="toggle off"><span class="dot"></span>Auto-Accept</span>
          <span class="arrow">→</span>
          <span class="toggle on"><span class="dot"></span>Manuell reviewen</span>
        </div>

        <div class="diff">
          <div class="line add"><span class="gutter">+ 42</span><span class="code">function checkAccess(user, role) {</span></div>
          <div class="line add"><span class="gutter">+ 43</span><span class="code">  if (user.role === role) return true;</span></div>
          <div class="line add bug"><span class="gutter">+ 44</span><span class="code">  if (user.isAdmin = true) return true;</span></div>
          <div class="line add"><span class="gutter">+ 45</span><span class="code">  return false;</span></div>
          <div class="line add"><span class="gutter">+ 46</span><span class="code">}</span></div>
        </div>

        <p class="punch">
          Ein Diff, eine Minute. Spart <b>einen Production-Incident</b>.
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, SectionTip03);
