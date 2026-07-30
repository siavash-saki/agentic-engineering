/* Section 2 — What "agentic" means
   One-slide definition before anything else: agent = model + tools + loop,
   and agentic engineering = the discipline of directing that loop. Keeps
   novices on board without slowing experts down.

   Redesigned under 0003 v2: the formula is drawn as the machine it describes —
   model and tools feed a loop that visibly runs. Words unchanged. */

import { getLang } from '../core/i18n.js';

const TAG = 's02-agentic';

const CONTENT = {
  en: {
    h1: 'Agent = <b>Model + Tools + Loop</b>',
    lede: `A chat model answers once. An agent acts: it reads files, runs
          commands, sees the result — and adjusts, until the task is done.`,
    parts: [
      { name: 'Model', body: 'The reasoning engine. Decides the next step.' },
      { name: 'Tools', body: 'Read, write, run — files, shell, browser, your systems.' },
      { name: 'Loop',  body: 'Act → observe → adjust. Repeat until done.' },
    ],
    defLabel: 'Agentic Engineering',
    definition: `Directing that loop <b>deliberately</b> — with context, a
          workflow, and verification. That discipline is this talk.`,
  },
  de: {
    h1: 'Agent = <b>Modell + Tools + Loop</b>',
    lede: `Ein Chat-Modell antwortet einmal. Ein Agent handelt: Er liest Dateien,
          führt Befehle aus, sieht das Ergebnis — und korrigiert, bis die
          Aufgabe erledigt ist.`,
    parts: [
      { name: 'Modell', body: 'Die Denk-Engine. Entscheidet den nächsten Schritt.' },
      { name: 'Tools',  body: 'Lesen, Schreiben, Ausführen — Dateien, Shell, Browser, eure Systeme.' },
      { name: 'Loop',   body: 'Handeln → Beobachten → Anpassen. Wiederholen, bis es fertig ist.' },
    ],
    defLabel: 'Agentic Engineering',
    definition: `Diese Schleife <b>bewusst</b> steuern — mit Kontext, einem
          Workflow und Verifikation. Um diese Disziplin geht es in diesem Vortrag.`,
  },
};

class Section02Agentic extends HTMLElement {
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
        ${TAG} h1 {
          margin: 0 0 var(--ae-space-3);
          font-size: var(--ae-fs-h2);
          line-height: var(--ae-lh-h2);
          color: var(--fg-ink);
        }
        ${TAG} h1 b { color: var(--fg-green); font-weight: inherit; }
        ${TAG} .fg-lede { margin: 0 0 var(--ae-space-6); }

        /* ── The machine: model and tools feed the loop ── */
        ${TAG} .machine {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) clamp(70px, 8vw, 130px) minmax(320px, 1.15fr);
          align-items: center;
          margin-bottom: var(--ae-space-6);
        }
        ${TAG} .inputs {
          display: flex;
          flex-direction: column;
          gap: var(--ae-space-2);
        }
        ${TAG} .part h3 {
          margin: 0 0 var(--ae-space-2);
          font-size: var(--ae-fs-h4);
          line-height: var(--ae-lh-h4);
          color: var(--fg-ink);
          font-family: var(--ae-font-head);
          font-weight: 600;
        }
        ${TAG} .part p {
          margin: 0;
          font-size: var(--ae-fs-small);
          line-height: var(--ae-lh-small);
          color: var(--fg-body);
        }
        ${TAG} .op {
          align-self: center;
          font-size: var(--ae-fs-h3);
          font-weight: 700;
          color: var(--fg-green);
          line-height: 1;
        }

        /* The feed: two lines merging into the loop. */
        ${TAG} .feed { width: 100%; height: clamp(120px, 22vh, 220px); }

        /* The loop, actually running. The ring is drawn; a single dot keeps
           orbiting it — this slide's one recurring cue. */
        ${TAG} .loopside {
          display: flex;
          align-items: center;
          gap: var(--ae-space-5);
        }
        ${TAG} .ringbox {
          --ring: clamp(150px, 24vh, 220px);
          position: relative;
          width: var(--ring);
          height: var(--ring);
          flex: none;
        }
        ${TAG} .ringbox svg { width: 100%; height: 100%; display: block; }
        ${TAG} .orbit {
          position: absolute;
          inset: 0;
          animation: ${TAG}-spin 6s linear infinite;
          animation-delay: 1.6s;
        }
        ${TAG} .orbit::before {
          content: '';
          position: absolute;
          top: calc(0.1 * var(--ring) - 5px);
          left: calc(0.5 * var(--ring) - 5px);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--fg-green);
        }
        /* A playful response: hovering the loop makes it run faster. */
        ${TAG} .loopside:hover .orbit { animation-duration: 2.2s; }
        @keyframes ${TAG}-spin { to { transform: rotate(360deg); } }
        @media print { ${TAG} .orbit { animation: none !important; } }

        /* The takeaway. Mint wash carries it. */
        ${TAG} .definition {
          background: var(--fg-mint);
          border-radius: var(--ae-radius-md);
          padding: var(--ae-space-4) var(--ae-space-5);
        }
        ${TAG} .definition .label { color: var(--fg-green); margin-bottom: 4px; }
        ${TAG} .definition p {
          margin: 0;
          font-size: var(--ae-fs-body);
          line-height: var(--ae-lh-body);
          color: var(--fg-green-d);
        }
        ${TAG} .definition p b { font-weight: 600; }

        @media (max-width: 860px) {
          ${TAG} .machine { grid-template-columns: 1fr; gap: var(--ae-space-4); }
          ${TAG} .feed { display: none; }
          ${TAG} .loopside { flex-direction: column; align-items: flex-start; }
        }
      </style>
      <div class="fg-wrap">
        <h1 class="fg-in" style="--fg-at: 1">${t.h1}</h1>
        <p class="fg-lede fg-in" style="--fg-at: 2">${t.lede}</p>

        <div class="machine">
          <div class="inputs">
            <div class="part fg-card fg-hover fg-in" style="--fg-at: 3">
              <h3 class="fg-hover-title">${t.parts[0].name}</h3>
              <p>${t.parts[0].body}</p>
            </div>
            <span class="op fg-in" style="--fg-at: 4" aria-hidden="true">+</span>
            <div class="part fg-card fg-hover fg-in" style="--fg-at: 4">
              <h3 class="fg-hover-title">${t.parts[1].name}</h3>
              <p>${t.parts[1].body}</p>
            </div>
          </div>

          <svg class="feed fg-wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="100" d="M 0 24 C 45 24, 55 50, 98 50" style="--fg-at: 5"/>
            <path pathLength="100" d="M 0 76 C 45 76, 55 50, 98 50" style="--fg-at: 5"/>
          </svg>

          <div class="loopside">
            <div class="ringbox fg-in" style="--fg-at: 6">
              <svg viewBox="0 0 160 160" aria-hidden="true">
                <circle cx="80" cy="80" r="64" fill="none" stroke="var(--fg-hair)" stroke-width="3"/>
                <circle cx="80" cy="80" r="64" fill="none" stroke="var(--fg-green)" stroke-width="3"
                        stroke-linecap="round" stroke-dasharray="110 24"
                        transform="rotate(-80 80 80)" opacity="0.75"/>
                <polygon points="0,-6 10,0 0,6" fill="var(--fg-green)" transform="translate(80,16)"/>
                <polygon points="0,-6 10,0 0,6" fill="var(--fg-green)" transform="translate(135.4,112) rotate(120)"/>
                <polygon points="0,-6 10,0 0,6" fill="var(--fg-green)" transform="translate(24.6,112) rotate(240)"/>
              </svg>
              <div class="orbit" aria-hidden="true"></div>
            </div>
            <div class="part fg-in" style="--fg-at: 7">
              <h3>${t.parts[2].name} <span aria-hidden="true">↺</span></h3>
              <p>${t.parts[2].body}</p>
            </div>
          </div>
        </div>

        <div class="definition fg-in" style="--fg-at: 9">
          <div class="label fg-label">${t.defLabel}</div>
          <p>${t.definition}</p>
        </div>
      </div>
    `;
  }
}

customElements.define(TAG, Section02Agentic);
