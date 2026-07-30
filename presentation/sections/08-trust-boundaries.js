/* Section 8 — Trust boundaries
   Closes the primitives chapter: everything before this slide widens what
   the agent can reach; this slide is the safety note that keeps the power
   inside the fence. Tool-agnostic. */

import { getLang } from '../core/i18n.js';

const TAG = 's08-trust-boundaries';

const CONTENT = {
  en: {
    h1: 'Capable agents need <b>trust boundaries</b>',
    lede: `Everything in this chapter widens what the agent can reach.
          Four rules keep that reach inside the fence.`,
    cards: [
      {
        num: '1',
        name: 'MCP servers are dependencies',
        body: `Third-party code with access to your systems. Vet them like any
              package you install — source, maintainer, permissions.`,
      },
      {
        num: '2',
        name: 'Tool results are untrusted input',
        body: `A web page, a ticket, a README can carry instructions aimed at
              your agent. Prompt injection rides in on data.`,
      },
      {
        num: '3',
        name: 'Autonomy has a budget',
        body: `Permission prompts, allowlists, sandboxes. "Approve everything"
              is a decision too — the wrong one as a default.`,
      },
      {
        num: '4',
        name: 'Human gates stay',
        body: `The approvals in your workflow are the last line of defense.
              Speed is not a reason to remove them.`,
      },
    ],
  },
  de: {
    h1: 'Fähige Agenten brauchen <b>Vertrauensgrenzen</b>',
    lede: `Alles in diesem Kapitel erweitert, was der Agent erreichen kann.
          Vier Regeln halten diese Reichweite im Zaum.`,
    cards: [
      {
        num: '1',
        name: 'MCP-Server sind Dependencies',
        body: `Fremdcode mit Zugriff auf eure Systeme. Prüft sie wie jedes
              Paket, das ihr installiert — Quelle, Maintainer, Berechtigungen.`,
      },
      {
        num: '2',
        name: 'Tool-Ergebnisse sind Fremd-Input',
        body: `Eine Webseite, ein Ticket, ein README kann Anweisungen an den
              Agenten enthalten. Prompt Injection kommt mit den Daten.`,
      },
      {
        num: '3',
        name: 'Autonomie hat ein Budget',
        body: `Permission-Prompts, Allowlists, Sandboxes. „Alles erlauben" ist
              auch eine Entscheidung — als Standard die falsche.`,
      },
      {
        num: '4',
        name: 'Menschliche Gates bleiben',
        body: `Die Freigaben im Workflow sind die letzte Verteidigungslinie.
              Tempo ist kein Grund, sie zu streichen.`,
      },
    ],
  },
};

class Section08Trust extends HTMLElement {
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
          max-width: 880px;
          margin: 0 0 var(--ae-space-5);
        }

        /* ── The fence: the four rules are posts on a drawn boundary. The
           slide is about keeping reach inside the fence — so the layout IS
           a fence, enclosing everything the chapter granted. ── */
        ${TAG} .fence {
          position: relative;
          padding: var(--ae-space-5);
        }
        ${TAG} .fence .ring {
          position: absolute;
          inset: 0;
          border: 2px dashed var(--fg-green);
          border-radius: var(--ae-radius-lg);
          opacity: 0.5;
          pointer-events: none;
          animation: fg-appear 600ms var(--ae-ease) both;
          animation-delay: calc(60ms + 3 * var(--fg-beat));
        }
        ${TAG} .fence .post {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          background: var(--fg-green);
          pointer-events: none;
          animation: fg-appear 300ms var(--ae-ease) both;
        }
        ${TAG} .fence .post.tl { top: -6px;    left: -6px;   animation-delay: calc(60ms + 4 * var(--fg-beat)); }
        ${TAG} .fence .post.tr { top: -6px;    right: -6px;  animation-delay: calc(60ms + 5 * var(--fg-beat)); }
        ${TAG} .fence .post.br { bottom: -6px; right: -6px;  animation-delay: calc(60ms + 6 * var(--fg-beat)); }
        ${TAG} .fence .post.bl { bottom: -6px; left: -6px;   animation-delay: calc(60ms + 7 * var(--fg-beat)); }

        ${TAG} .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ae-space-4);
        }
        ${TAG} .card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--ae-space-4);
        }
        ${TAG} .card .fg-badge {
          transition: background 220ms var(--ae-ease), color 220ms var(--ae-ease);
        }
        ${TAG} .card:hover .fg-badge {
          background: var(--fg-green);
          color: #fff;
        }
        ${TAG} .card h3 {
          margin: 0 0 var(--ae-space-2);
          font-family: var(--ae-font-head);
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          font-weight: 600;
          color: var(--fg-ink);
        }
        ${TAG} .card p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }

        @media (max-width: 860px) {
          ${TAG} .cards { grid-template-columns: 1fr; }
          ${TAG} .fence { padding: 0; }
          ${TAG} .fence .ring, ${TAG} .fence .post { display: none; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="fence">
          <span class="ring" aria-hidden="true"></span>
          <span class="post tl" aria-hidden="true"></span>
          <span class="post tr" aria-hidden="true"></span>
          <span class="post br" aria-hidden="true"></span>
          <span class="post bl" aria-hidden="true"></span>
          <div class="cards">
            ${t.cards.map((c, i) => `
              <div class="card fg-card fg-hover fg-in" style="--fg-at: ${5 + i}">
                <span class="fg-badge">${c.num}</span>
                <div>
                  <h3 class="fg-hover-title">${c.name}</h3>
                  <p>${c.body}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section08Trust);
