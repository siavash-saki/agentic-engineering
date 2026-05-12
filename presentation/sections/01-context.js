/* Section 1 — Context & Goal
   Fully scaffolded as the working pattern for other sections to follow.
   Each section file is self-contained: template + styles + behavior. */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 60px 40px;
      overflow: auto;
    }
    .wrap {
      max-width: 880px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .eyebrow {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 18px;
      opacity: 0;
      animation: fade-up 600ms ease 100ms forwards;
    }
    h1 {
      font-size: 56px;
      font-weight: 700;
      color: var(--text);
      letter-spacing: -0.025em;
      line-height: 1.1;
      margin-bottom: 28px;
      opacity: 0;
      animation: fade-up 700ms ease 250ms forwards;
    }
    h1 em {
      font-style: normal;
      color: var(--accent);
    }
    .lede {
      font-size: 22px;
      line-height: 1.55;
      color: var(--text-muted);
      max-width: 760px;
      margin-bottom: 48px;
      opacity: 0;
      animation: fade-up 700ms ease 450ms forwards;
    }
    .goals-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-subtle);
      margin-bottom: 18px;
      opacity: 0;
      animation: fade-up 600ms ease 700ms forwards;
    }
    ul.goals {
      list-style: none;
      display: grid;
      gap: 12px;
    }
    ul.goals li {
      font-size: 18px;
      line-height: 1.5;
      color: var(--text);
      padding: 14px 20px;
      border-left: 3px solid var(--accent);
      background: var(--surface);
      opacity: 0;
      transform: translateX(-12px);
      animation: slide-in 600ms ease forwards;
    }
    ul.goals li em {
      font-style: normal;
      font-weight: 700;
      color: var(--accent);
    }
    ul.goals li:nth-child(1) { animation-delay: 880ms; }
    ul.goals li:nth-child(2) { animation-delay: 1020ms; }
    ul.goals li:nth-child(3) { animation-delay: 1160ms; }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in {
      to { opacity: 1; transform: translateX(0); }
    }
    @media (max-width: 720px) {
      h1 { font-size: 38px; }
      .lede { font-size: 18px; margin-bottom: 32px; }
      ul.goals li { font-size: 16px; }
    }
  </style>
  <div class="wrap">
    <div class="eyebrow">Agentic Engineering — DB Internal</div>
    <h1>Using AI tools <em>deliberately</em></h1>
    <p class="lede">
      Most of us use AI coding tools every day. Few of us use them deliberately.
      This talk is about the gap between those two — and the engineering
      practice that closes it.
    </p>
    <div class="goals-title">What you'll leave with</div>
    <ul class="goals">
      <li>Shared vocabulary — what a <em>model</em>, a <em>product</em>, and an <em>API</em> actually are, and which is which</li>
      <li>A mental model for the framework-agnostic concepts behind every AI coding tool</li>
      <li>A workflow you can apply on Monday morning — inside Copilot, inside DB</li>
    </ul>
  </div>
`;

customElements.define('s01-context', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
});
