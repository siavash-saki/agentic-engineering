/* Section 13 — SDD: Rate-Limiting · Tasks (3/4 of the quadriptych)
   Same template, third segment active. Items mirror the plan's sequence
   (sliding window — consistent with the decision on the plan slide). */
import { getLang } from '../core/i18n.js';

const TAG = 's13-sdd-tasks';

const CONTENT = {
  en: {
    h1: 'Tasks — the <b>steps</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    feat: '# Tasks: Rate limiting',
    tasks: [
      'Wire up the Redis connection in <code>config/redis.ts</code>',
      'Implement the sliding-window middleware',
      '429 response with a Retry-After header',
      'Fail open on Redis timeout',
      'Integration test: over limit → 429',
      'Integration test: under limit → 200',
    ],
    caption: 'One task ≈ one commit.',
  },
  de: {
    h1: 'Tasks — die <b>Schritte</b>',
    segs: ['Spec', 'Plan', 'Tasks', 'Verification'],
    feat: '# Tasks: Rate-Limiting',
    tasks: [
      'Redis-Verbindung in <code>config/redis.ts</code> aufsetzen',
      'Sliding-Window-Middleware implementieren',
      '429-Antwort mit Retry-After-Header',
      'Fail-open bei Redis-Timeout',
      'Integrationstest: über Limit → 429',
      'Integrationstest: unter Limit → 200',
    ],
    caption: 'Eine Task ≈ ein Commit.',
  },
};

class Section13SDD extends HTMLElement {
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
           edge, one depth; the checklist writes itself in line by line. */
        ${TAG} .doc {
          background: var(--fg-card);
          border: 1px solid var(--fg-hair);
          box-shadow: var(--fg-d1);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-4) var(--ae-space-5);
          font-family: var(--ae-font-mono);
          font-size: var(--ae-fs-small);
          line-height: 1.9;
          color: var(--ae-text-strong);
          position: relative;
        }
        ${TAG} .doc::before {
          content: "sdd/0007-rate-limiting/tasks.md";
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
        ${TAG} .doc .feat {
          font-size: 15px;
          font-weight: 700;
          color: var(--ae-text-strong);
          margin: 0 0 var(--ae-space-3);
        }
        ${TAG} .doc ul {
          margin: 0;
          padding-left: 34px;
          list-style: none;
        }
        ${TAG} .doc li {
          position: relative;
        }
        ${TAG} .doc li::before {
          content: "[ ]";
          position: absolute;
          left: -34px;
          color: var(--ae-red);
          font-weight: 700;
        }

        ${TAG} .caption {
          margin: var(--ae-space-4) 0 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--ae-text);
          text-align: center;
        }
      </style>
      <div class="wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>

        <div class="crumb fg-in" style="--fg-at: 2">
          <span class="seg done">${t.segs[0]}</span>
          <span class="arrow">→</span>
          <span class="seg done">${t.segs[1]}</span>
          <span class="arrow">→</span>
          <span class="seg active">${t.segs[2]}</span>
          <span class="arrow">→</span>
          <span class="seg">${t.segs[3]}</span>
        </div>

        <div class="doc fg-source fg-in" style="--fg-at: 3">
          <p class="feat fg-in" style="--fg-at: 4">${t.feat}</p>
          <ul>
            ${t.tasks.map((task, i) => `<li class="fg-in" style="--fg-at: ${5 + i}">${task}</li>`).join('\n            ')}
          </ul>
        </div>

        <p class="caption fg-in" style="--fg-at: 12">
          ${t.caption}
        </p>
      </div>
    `;
  }
}

customElements.define(TAG, Section13SDD);
