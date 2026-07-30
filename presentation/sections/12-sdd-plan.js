/* Section 12 — SDD: Rate-Limiting · Plan (2/4 of the quadriptych)
   Same template as the spec slide with the crumb's second segment active.
   The approach resolves the spec's open questions (per token, sliding
   window) — plan and tasks must stay consistent with that decision. */

import { getLang } from '../core/i18n.js';

const TAG = 's12-sdd-plan';

const CONTENT = {
  en: {
    h1: 'Plan — the <b>How</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    feat: '# Plan: Rate limiting',
    approachTitle: '## Approach',
    approach: `Sliding-window counter per token, held in Redis. Runs as
          middleware in front of the router.<br>
          <span class="note">(Decided in Discuss: per token, sliding window.)</span>`,
    orderTitle: '## Sequence',
    order: [
      'Redis connection + config.',
      'Sliding-window middleware.',
      '429 response with Retry-After.',
      'Fail-open behavior on Redis timeout.',
      'Integration tests.',
    ],
    risksTitle: '## Risks',
    risks: [
      `Redis is a single point of failure → fail open on timeout
                (let traffic through rather than lock everyone out).`,
    ],
    filesTitle: '## Affected files',
    files: [
      'middleware/rateLimit.ts',
      'config/redis.ts',
      'tests/rateLimit.integration.test.ts',
    ],
    caption: `The spec's open questions got settled in Discuss. This is where the
          <b>technical decision</b> lives.`,
  },
  de: {
    h1: 'Plan — das <b>Wie</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    feat: '# Plan: Rate-Limiting',
    approachTitle: '## Ansatz',
    approach: `Sliding-Window-Zähler pro Token, gehalten in Redis. Als
          Middleware vor dem Router.<br>
          <span class="note">(Entscheidung aus Discuss: pro Token, Sliding Window.)</span>`,
    orderTitle: '## Reihenfolge',
    order: [
      'Redis-Verbindung + Config.',
      'Sliding-Window-Middleware.',
      '429-Antwort inkl. Retry-After.',
      'Fail-open-Verhalten bei Redis-Timeout.',
      'Integrationstests.',
    ],
    risksTitle: '## Risiken',
    risks: [
      `Redis als Single Point of Failure → bei Timeout fail-open
                (lieber durchlassen als alle aussperren).`,
    ],
    filesTitle: '## Betroffene Dateien',
    files: [
      'middleware/rateLimit.ts',
      'config/redis.ts',
      'tests/rateLimit.integration.test.ts',
    ],
    caption: `Die offenen Fragen der Spec sind in Discuss geklärt. Hier ist der Ort
          für die <b>technische Entscheidung</b>.`,
  },
};

class Section12SDD extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-5) var(--ae-gutter);
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

        ${TAG} .crumb {
          display: flex;
          align-items: center;
          gap: var(--ae-space-2);
          margin: 0 0 var(--ae-space-4);
        }
        ${TAG} .crumb .seg {
          font-size: var(--ae-fs-small);
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1.5px solid var(--ae-cool-gray-200);
          color: var(--ae-text-muted);
          background: var(--ae-bg);
        }
        ${TAG} .crumb .seg.active {
          background: var(--ae-red);
          border-color: var(--ae-red);
          color: #fff;
        }
        ${TAG} .crumb .seg.done {
          color: var(--ae-text-strong);
          background: var(--ae-bg);
          border-color: var(--ae-cool-gray-300, #c8cdd2);
        }
        ${TAG} .crumb .arrow {
          color: var(--ae-cool-gray-400);
          font-weight: 700;
        }

        /* The artifact as the paper document it is — white card, hairline
           edge, one depth; it writes itself in section by section. */
        ${TAG} .doc {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-4) var(--ae-space-5);
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          line-height: 1.65;
          color: var(--ae-text-strong);
          position: relative;
        }
        ${TAG} .doc::before {
          content: "sdd/0007-rate-limiting/plan.md";
          position: absolute;
          top: -10px;
          left: 16px;
          background: var(--ae-red);
          color: #fff;
          font-size: var(--ae-fs-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 3px;
        }
        ${TAG} .doc h2 {
          margin: var(--ae-space-3) 0 4px;
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-red);
          font-family: inherit;
        }
        ${TAG} .doc h2:first-of-type { margin-top: 0; }
        ${TAG} .doc .feat {
          font-size: var(--ae-fs-small);
          font-weight: 700;
          color: var(--ae-text-strong);
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} .doc p, ${TAG} .doc ul, ${TAG} .doc ol {
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} .doc ul, ${TAG} .doc ol {
          padding-left: 18px;
          list-style: none;
          counter-reset: step;
        }
        ${TAG} .doc li {
          position: relative;
        }
        ${TAG} .doc ul li::before {
          content: "-";
          position: absolute;
          left: -14px;
          color: var(--ae-red);
          font-weight: 700;
        }
        ${TAG} .doc ol li {
          counter-increment: step;
        }
        ${TAG} .doc ol li::before {
          content: counter(step) ".";
          position: absolute;
          left: -22px;
          color: var(--ae-red);
          font-weight: 700;
        }
        ${TAG} .doc .note {
          color: var(--ae-text-muted);
          font-style: italic;
        }

        ${TAG} .caption {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
          text-align: center;
        }
        ${TAG} .caption b { color: var(--ae-red); }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="crumb fg-in" style="--fg-at: 2">
          <span class="seg done">${t.segs[0]}</span>
          <span class="arrow">→</span>
          <span class="seg active">${t.segs[1]}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.segs[2]}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.segs[3]}</span>
        </div>

        <div class="doc fg-source fg-in" style="--fg-at: 3">
          <p class="feat fg-in" style="--fg-at: 4">${t.feat}</p>

          <div class="fg-in" style="--fg-at: 5">
            <h2>${t.approachTitle}</h2>
            <p>${t.approach}</p>
          </div>

          <div class="fg-in" style="--fg-at: 6">
            <h2>${t.orderTitle}</h2>
            <ol>
              ${t.order.map(o => `<li>${o}</li>`).join('')}
            </ol>
          </div>

          <div class="fg-in" style="--fg-at: 7">
            <h2>${t.risksTitle}</h2>
            <ul>
              ${t.risks.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>

          <div class="fg-in" style="--fg-at: 8">
            <h2>${t.filesTitle}</h2>
            <ul>
              ${t.files.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>

        <p class="caption fg-in" style="--fg-at: 10">
          ${t.caption}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section12SDD);
