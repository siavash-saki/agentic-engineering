/* Section 31 — the close.
   The loop is stated one last time, large, because it is the only thing
   worth leaving the room with. Everything else on the slide is how to
   find the material afterwards. */

import { getLang } from '../core/i18n.js';

const TAG = 's31-close';

const CONTENT = {
  en: {
    thanks: 'Thank you',
    loop: ['Plan', 'Build', 'Review'],
    tagline: 'Write the plan down. Agree it. Build in small steps. Have something else read the diff.',
    who: 'Siavash Saki',
    linksLabel: 'Everything from this talk',
    links: [
      { t: 'The deck and the adoption kit',
        u: 'github.com/siavash-saki/agentic-engineering',
        href: 'https://github.com/siavash-saki/agentic-engineering' },
    ],
    takeLabel: 'In the repository',
    take: [
      'These slides, in English and German',
      'AGENTS.md with the method, ready to copy into a repo',
      'Templates for the four artifacts, plus a linter that checks them',
    ],
    questions: 'Questions?',
  },
  de: {
    thanks: 'Danke',
    loop: ['Plan', 'Build', 'Review'],
    tagline: 'Plan aufschreiben. Freigeben. In kleinen Schritten bauen. Den Diff von etwas anderem lesen lassen.',
    who: 'Siavash Saki',
    linksLabel: 'Alles aus diesem Vortrag',
    links: [
      { t: 'Die Folien und das Adoption-Kit',
        u: 'github.com/siavash-saki/agentic-engineering',
        href: 'https://github.com/siavash-saki/agentic-engineering' },
    ],
    takeLabel: 'Im Repository',
    take: [
      'Diese Folien, auf Englisch und Deutsch',
      'AGENTS.md mit der Methode, fertig zum Kopieren',
      'Vorlagen für die vier Artefakte, plus ein Linter, der sie prüft',
    ],
    questions: 'Fragen?',
  },
};

class Section31 extends HTMLElement {
  connectedCallback() {
    const t = CONTENT[getLang()] ?? CONTENT.en;
    this.innerHTML = `
      <style>
        ${TAG} {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          padding: var(--ae-space-6) var(--ae-gutter);
          background: var(--fg-paper);
          overflow: auto;
        }
        ${TAG} .grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: var(--ae-space-8);
          align-items: center;
        }

        ${TAG} .thanks {
          margin: 0 0 var(--ae-space-4);
          font-size: var(--ae-fs-h1);
          line-height: var(--ae-lh-h1);
          color: var(--fg-ink);
        }
        ${TAG} .loop {
          display: flex;
          align-items: center;
          gap: var(--ae-space-3);
          flex-wrap: wrap;
          margin-bottom: var(--ae-space-4);
        }
        ${TAG} .loop .st {
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h2);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--fg-green-d);
        }
        ${TAG} .loop .ar { color: var(--fg-green); font-weight: 700; font-size: var(--ae-fs-h4); }
        ${TAG} .tagline {
          margin: 0 0 var(--ae-space-6);
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-body);
          max-width: 46ch;
        }
        ${TAG} .who {
          margin: 0;
          padding-top: var(--ae-space-4);
          border-top: 1px solid var(--fg-hair);
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h4);
          line-height: 1.2;
          font-weight: 600;
          color: var(--fg-ink);
        }

        ${TAG} .panel { display: flex; flex-direction: column; gap: var(--ae-space-5); }
        ${TAG} .lbl { margin-bottom: var(--ae-space-3); }
        ${TAG} .links { margin: 0; padding: 0; list-style: none; }
        ${TAG} .links li {
          padding: var(--ae-space-3) 0;
          border-bottom: 1px solid var(--fg-hair);
        }
        ${TAG} .links li:last-child { border-bottom: 0; }
        ${TAG} .links .t {
          display: block;
          font-size: var(--ae-fs-caption);
          line-height: var(--ae-lh-caption);
          color: var(--fg-muted);
        }
        /* The one clickable thing in the deck, so it has to look clickable
           from the back of the room: underlined at rest, and it lifts to
           the accent on hover. */
        ${TAG} .links .u {
          display: inline-block;
          font-family: var(--ae-font-mono);
          font-size: calc(var(--ae-fs-small) * 0.96);
          line-height: 1.35;
          font-weight: 600;
          color: var(--fg-green-d);
          word-break: break-all;
          text-decoration: underline;
          text-decoration-color: var(--ae-cool-gray-300);
          text-underline-offset: 3px;
          transition: color var(--ae-dur-fast) var(--ae-ease),
                      text-decoration-color var(--ae-dur-fast) var(--ae-ease);
        }
        ${TAG} .links .u:hover,
        ${TAG} .links .u:focus-visible {
          color: var(--fg-green);
          text-decoration-color: var(--fg-green);
        }

        ${TAG} .take ul { margin: 0; padding: 0; list-style: none; }
        ${TAG} .take li {
          display: flex;
          gap: var(--ae-space-3);
          align-items: baseline;
          padding: 3px 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .take li::before {
          content: '';
          flex: none;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--fg-green);
          transform: translateY(-2px);
        }

        ${TAG} .questions {
          margin: 0;
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h3);
          line-height: 1.15;
          font-weight: 700;
          color: var(--fg-green);
        }

        @media (max-width: 1000px) {
          ${TAG} .grid { grid-template-columns: 1fr; gap: var(--ae-space-6); }
          ${TAG} .thanks { font-size: var(--ae-fs-h2); }
        }
      </style>
      <div class="fg-wrap grid">
        <div>
          <h1 class="thanks fg-in" style="--fg-at: 1">${t.thanks}</h1>
          <div class="loop">
            ${t.loop.map((s, i) => `
              ${i ? `<span class="ar fg-in" style="--fg-at: ${2 + i * 2 - 1}" aria-hidden="true">→</span>` : ''}
              <span class="st fg-in" style="--fg-at: ${2 + i * 2}">${s}</span>
            `).join('')}
          </div>
          <p class="tagline fg-in" style="--fg-at: 7">${t.tagline}</p>
          <p class="who fg-in" style="--fg-at: 8">${t.who}</p>
        </div>

        <div class="panel">
          <div class="fg-in" style="--fg-at: 6">
            <p class="fg-label lbl">${t.linksLabel}</p>
            <ul class="links">
              ${t.links.map(l => `
                <li>
                  <span class="t">${l.t}</span>
                  <a class="u" href="${l.href}" target="_blank" rel="noreferrer noopener">${l.u}</a>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="take fg-in" style="--fg-at: 8">
            <p class="fg-label lbl">${t.takeLabel}</p>
            <ul>${t.take.map(x => `<li><span>${x}</span></li>`).join('')}</ul>
          </div>

          <p class="questions fg-in" style="--fg-at: 10">${t.questions}</p>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section31);
