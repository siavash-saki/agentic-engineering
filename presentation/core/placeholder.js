/* Helper used by sections that haven't been built out yet.
 * Renders into light DOM so DB base styles cascade in. */

export function definePlaceholder(tag, num, title, description) {
  if (customElements.get(tag)) return;
  customElements.define(tag, class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <style>
          ${tag} {
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding: var(--db-space-8) var(--db-gutter);
            background: var(--db-bg);
          }
          ${tag} .wrap { max-width: 720px; text-align: center; }
          ${tag} .num {
            display: inline-block;
            font-size: var(--db-fs-caption);
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--db-text-muted);
            margin-bottom: var(--db-space-4);
          }
          ${tag} h1 { margin: 0 0 var(--db-space-5); }
          ${tag} .desc {
            font-size: var(--db-fs-lead);
            line-height: var(--db-lh-lead);
            color: var(--db-text);
            margin: 0;
          }
          ${tag} .badge {
            display: inline-block;
            margin-top: var(--db-space-6);
            padding: 6px 14px;
            border: 1px dashed var(--db-border-strong);
            background: var(--db-cool-gray-100);
            font-size: var(--db-fs-caption);
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--db-text-muted);
          }
        </style>
        <div class="wrap">
          <div class="num">Abschnitt ${String(num).padStart(2, '0')}</div>
          <h1>${title}</h1>
          <p class="desc">${description}</p>
          <div class="badge">Platzhalter — Inhalt folgt</div>
        </div>
      `;
    }
  });
}
