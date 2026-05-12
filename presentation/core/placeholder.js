/* Helper used by sections that haven't been built out yet. */

const tpl = (num, title, description) => `
  <style>
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
    }
    .wrap {
      max-width: 760px;
      text-align: center;
    }
    .num {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-subtle);
      margin-bottom: 18px;
    }
    h1 {
      font-size: 44px;
      font-weight: 700;
      color: var(--text);
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin-bottom: 24px;
    }
    .desc {
      font-size: 19px;
      line-height: 1.6;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
    }
    .badge {
      display: inline-block;
      margin-top: 36px;
      padding: 7px 14px;
      border: 1px dashed var(--border);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-subtle);
    }
  </style>
  <div class="wrap">
    <div class="num">Section ${String(num).padStart(2, '0')}</div>
    <h1>${title}</h1>
    <p class="desc">${description}</p>
    <div class="badge">Placeholder — content coming</div>
  </div>
`;

export function definePlaceholder(tag, num, title, description) {
  if (customElements.get(tag)) return;
  customElements.define(tag, class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = tpl(num, title, description);
    }
  });
}
