/* Section 2 — Was ist was
   Three-column landscape (Modelle / APIs / Produkte) with vendor brand colors
   and a DB-laptop filter that only highlights Copilot + Kiro. */

const TAG = 's02-landscape';

const MODELS = [
  { id: 'm-gpt',     name: 'GPT',    maker: 'OpenAI',    color: 'c-openai',    top: '22%' },
  { id: 'm-claude',  name: 'Claude', maker: 'Anthropic', color: 'c-anthropic', top: '50%' },
  { id: 'm-gemini',  name: 'Gemini', maker: 'Google',    color: 'c-google',    top: '78%' },
];

const APIS = [
  { id: 'a-openai',    name: 'OpenAI API',    color: 'c-openai',     top: '20%' },
  { id: 'a-anthropic', name: 'Anthropic API', color: 'c-anthropic',  top: '40%' },
  { id: 'a-google',    name: 'Google API',    color: 'c-google',     top: '60%' },
  { id: 'a-router',    name: 'OpenRouter',    color: 'c-router',     top: '80%' },
];

const PRODUCTS = [
  { id: 'p-claude-app', name: 'Claude App',    maker: 'Anthropic',    color: 'c-anthropic', top: '12%' },
  { id: 'p-codex',      name: 'Codex',         maker: 'OpenAI',       color: 'c-openai',    top: '28%' },
  { id: 'p-gemini-app', name: 'Gemini App',    maker: 'Google',       color: 'c-google',    top: '44%' },
  { id: 'p-copilot',    name: 'GitHub Copilot', maker: 'GitHub',      color: null,          top: '64%' },
  { id: 'p-kiro',       name: 'Kiro',          maker: 'Amazon',       color: 'c-aws',       top: '80%' },
];

/* [from, to, color-token] — lines are drawn right-to-left visually (product → api → model). */
const CONNS_STD = [
  ['a-openai',    'm-gpt',    'c-openai'],
  ['a-anthropic', 'm-claude', 'c-anthropic'],
  ['a-google',    'm-gemini', 'c-google'],
  ['a-router',    'm-gpt',    'c-router'],
  ['a-router',    'm-claude', 'c-router'],
  ['a-router',    'm-gemini', 'c-router'],
  ['p-claude-app','a-anthropic','c-anthropic'],
  ['p-codex',     'a-openai',   'c-openai'],
  ['p-gemini-app','a-google',   'c-google'],
  ['p-copilot',   'a-openai',   'c-openai'],
  ['p-copilot',   'a-anthropic','c-anthropic'],
  ['p-copilot',   'a-google',   'c-google'],
  ['p-copilot',   'a-router',   'c-router'],
  ['p-kiro',      'a-anthropic','c-anthropic'],
  ['p-kiro',      'a-openai',   'c-openai'],
];

const DB_ALLOWED = ['p-copilot', 'p-kiro', 'a-openai', 'a-anthropic', 'a-google', 'm-gpt', 'm-claude', 'm-gemini'];
const DB_BLOCKED = ['p-claude-app', 'p-codex', 'p-gemini-app', 'a-router'];

const CAPTIONS = {
  all: 'Ein Modell kann viele Produkte antreiben. Ein Produkt kann viele Modelle nutzen. Es ist <b>many-to-many</b>.',
  db:  'Auf dem DB-Laptop sind <b>zwei</b> Coding-Agenten erlaubt: <b>GitHub Copilot</b> (GitHub-Subscription) und <b>Kiro</b> (AWS-Subscription). Direkte API-Zugriffe und Standalone-Apps wie Claude oder ChatGPT sind gesperrt — nicht technisch, sondern <b>vertraglich</b>.',
};

class Section02 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        ${TAG} {
          --c-openai:    #10A37F;
          --c-anthropic: #D97757;
          --c-google:    #4285F4;
          --c-router:    #7C3AED;
          --c-aws:       #FF9900;

          display: flex !important;
          flex-direction: column;
          padding: var(--db-space-5) var(--db-gutter) var(--db-space-4);
          background: var(--db-bg);
          overflow: hidden;
        }
        ${TAG} .top {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--db-space-4);
          max-width: 1200px;
          width: 100%;
          margin: 0 auto var(--db-space-4);
          opacity: 0;
          animation: s02-fade 500ms var(--db-ease) 50ms forwards;
        }
        ${TAG} .top h2 {
          margin: 0;
          font-size: var(--db-fs-h3);
          line-height: var(--db-lh-h3);
          color: var(--db-text-strong);
        }
        ${TAG} .toggle {
          display: inline-flex;
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          overflow: hidden;
          background: var(--db-bg);
        }
        ${TAG} .toggle button {
          font: inherit;
          font-size: var(--db-fs-small);
          font-weight: 700;
          padding: 8px 16px;
          border: 0;
          background: transparent;
          color: var(--db-text-muted);
          cursor: pointer;
          transition: background 160ms var(--db-ease), color 160ms var(--db-ease);
        }
        ${TAG} .toggle button + button { border-left: 1px solid var(--db-border); }
        ${TAG} .toggle button:hover { color: var(--db-text); background: var(--db-cool-gray-100); }
        ${TAG} .toggle button.active {
          background: var(--db-red);
          color: #fff;
        }

        ${TAG} .stage {
          flex: 1;
          position: relative;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          min-height: 0;
          opacity: 0;
          animation: s02-fade 600ms var(--db-ease) 200ms forwards;
        }

        ${TAG} .conn {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        ${TAG} .cline {
          fill: none;
          stroke-width: 2;
          opacity: 0.32;
          transition: opacity 280ms var(--db-ease), stroke-width 220ms var(--db-ease);
        }
        ${TAG} .cline.hl  { opacity: 1; stroke-width: 2.5; }
        ${TAG} .cline.dim { opacity: 0.06; }

        ${TAG} .col-lbl {
          position: absolute;
          top: -4px;
          transform: translateX(-50%);
          font-size: var(--db-fs-caption);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          z-index: 3;
        }

        ${TAG} .node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 2;
          background: var(--db-bg);
          padding: 10px 16px;
          min-width: 132px;
          font-size: var(--db-fs-small);
          line-height: 1.2;
          transition:
            opacity 240ms var(--db-ease),
            box-shadow 220ms var(--db-ease),
            filter 220ms var(--db-ease);
        }
        ${TAG} .node .nn { font-weight: 700; color: var(--db-text-strong); }
        ${TAG} .node .nm { font-size: 11px; color: var(--db-text-muted); margin-top: 2px; }

        ${TAG} .node.model {
          border-left: 4px solid var(--node-color, var(--db-cool-gray-300));
          border-top: 1px solid var(--db-border);
          border-right: 1px solid var(--db-border);
          border-bottom: 1px solid var(--db-border);
          border-radius: 0 var(--db-radius) var(--db-radius) 0;
        }
        ${TAG} .node.api {
          border: 2px solid var(--node-color, var(--db-cool-gray-300));
          border-radius: var(--db-radius);
          text-align: center;
        }
        ${TAG} .node.product {
          border: 1px solid var(--db-border);
          border-right: 4px solid var(--maker-color, var(--db-cool-gray-300));
          border-radius: var(--db-radius) 0 0 var(--db-radius);
          text-align: right;
        }

        ${TAG} .node.dim {
          opacity: 0.25;
          filter: grayscale(0.6);
        }
        ${TAG} .node.hl {
          box-shadow: 0 0 0 2px var(--node-color, var(--maker-color, var(--db-red))),
                      0 4px 14px rgba(0,0,0,0.08);
        }
        ${TAG} .node.locked::after {
          content: "";
          position: absolute;
          top: -8px; right: -8px;
          width: 20px; height: 20px;
          background: var(--db-red);
          border-radius: 50%;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'><rect x='5' y='11' width='14' height='10' rx='1'/><path d='M8 11V7a4 4 0 018 0v4' fill='none' stroke='%23fff' stroke-width='2'/></svg>");
          background-size: 13px 13px;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 4;
        }

        ${TAG} .caption {
          flex-shrink: 0;
          max-width: 880px;
          margin: var(--db-space-3) auto 0;
          font-size: var(--db-fs-body);
          line-height: var(--db-lh-body);
          color: var(--db-text);
          text-align: center;
          opacity: 0;
          animation: s02-fade 500ms var(--db-ease) 450ms forwards;
        }
        ${TAG} .caption b { color: var(--db-red); font-weight: 700; }

        @keyframes s02-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="top">
        <h2>Modell · API · Produkt</h2>
        <div class="toggle" role="tablist">
          <button type="button" data-view="all" class="active">Alle verfügbar</button>
          <button type="button" data-view="db">Auf dem DB-Laptop</button>
        </div>
      </div>

      <div class="stage">
        <svg class="conn" xmlns="http://www.w3.org/2000/svg"></svg>

        <div class="col-lbl" style="left:10%">Modell</div>
        <div class="col-lbl" style="left:50%">API</div>
        <div class="col-lbl" style="left:90%">Produkt</div>

        ${MODELS.map(m => `
          <div class="node model" data-id="${m.id}"
               style="left:10%;top:${m.top};--node-color:var(--${m.color})">
            <div class="nn">${m.name}</div>
            <div class="nm">${m.maker}</div>
          </div>`).join('')}

        ${APIS.map(a => `
          <div class="node api" data-id="${a.id}"
               style="left:50%;top:${a.top};--node-color:var(--${a.color})">
            <div class="nn">${a.name}</div>
            ${a.sub ? `<div class="nm">${a.sub}</div>` : ''}
          </div>`).join('')}

        ${PRODUCTS.map(p => `
          <div class="node product" data-id="${p.id}"
               style="left:90%;top:${p.top};${p.color ? `--maker-color:var(--${p.color})` : ''}">
            <div class="nn">${p.name}</div>
            <div class="nm">${p.maker}</div>
          </div>`).join('')}
      </div>

      <p class="caption"></p>
    `;

    this.stage    = this.querySelector('.stage');
    this.svg      = this.querySelector('.conn');
    this.caption  = this.querySelector('.caption');
    this.nodes    = new Map(
      Array.from(this.querySelectorAll('.node')).map(n => [n.dataset.id, n])
    );
    this.paths    = new Map();

    this.view = 'all';
    this.hovered = null;

    this.querySelectorAll('.toggle button').forEach(btn => {
      btn.addEventListener('click', () => this.setView(btn.dataset.view));
    });
    this.nodes.forEach(n => {
      n.addEventListener('mouseenter', () => this.setHover(n.dataset.id));
      n.addEventListener('mouseleave', () => this.setHover(null));
    });

    this.ro = new ResizeObserver(() => this.drawConnections());
    this.ro.observe(this.stage);

    this.render();

    /* Re-draw after section's entry transition + after fonts load,
       since node sizes shift slightly when Fira Sans takes over. */
    setTimeout(() => this.drawConnections(), 60);
    setTimeout(() => this.drawConnections(), 450);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.drawConnections());
    }
  }

  disconnectedCallback() {
    this.ro?.disconnect();
  }

  setView(v) {
    if (v === this.view) return;
    this.view = v;
    this.querySelectorAll('.toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.view === v);
    });
    this.render();
  }

  setHover(id) {
    this.hovered = id;
    this.render();
  }

  render() {
    const view = this.view;
    const hovered = this.hovered;

    /* Node visibility / state */
    this.nodes.forEach((n, id) => {
      n.classList.remove('hl', 'dim', 'locked');

      if (view === 'db') {
        if (DB_BLOCKED.includes(id)) n.classList.add('dim', 'locked');
        else if (DB_ALLOWED.includes(id)) n.classList.add('hl');
      } else if (hovered) {
        const set = this.hoverSet(hovered);
        if (set.has(id)) n.classList.add('hl');
        else n.classList.add('dim');
      }
    });

    this.caption.innerHTML = CAPTIONS[view];
    this.drawConnections();
  }

  hoverSet(id) {
    const set = new Set([id]);
    /* Add direct neighbours, then second hop through APIs. */
    const direct = CONNS_STD.filter(([f, t]) => f === id || t === id);
    direct.forEach(([f, t]) => { set.add(f); set.add(t); });
    /* Second hop: if hovering a product or model, include the API's other side. */
    const second = CONNS_STD.filter(([f, t]) => set.has(f) || set.has(t));
    second.forEach(([f, t]) => { set.add(f); set.add(t); });
    return set;
  }

  drawConnections() {
    if (!this.stage.isConnected) return;
    const stageRect = this.stage.getBoundingClientRect();
    if (stageRect.width === 0) return;

    const used = new Set();

    const draw = (from, to, colorVar, opts = {}) => {
      const key = `${from}|${to}`;
      used.add(key);
      let p = this.paths.get(key);
      if (!p) {
        p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.classList.add('cline');
        this.svg.appendChild(p);
        this.paths.set(key, p);
      }
      const fEl = this.nodes.get(from);
      const tEl = this.nodes.get(to);
      if (!fEl || !tEl) return;
      p.setAttribute('d', this.calcPath(fEl, tEl, stageRect));
      p.style.stroke = `var(--${colorVar})`;
      p.classList.remove('hl', 'dim');

      if (this.view === 'db') {
        if (opts.dim) p.classList.add('dim');
        else p.classList.add('hl');
      } else if (this.hovered) {
        const set = this.hoverSet(this.hovered);
        const match = set.has(from) && set.has(to);
        if (match) p.classList.add('hl');
        else p.classList.add('dim');
      }
    };

    if (this.view === 'db') {
      CONNS_STD.forEach(([f, t, c]) => {
        const allowed = DB_ALLOWED.includes(f) && DB_ALLOWED.includes(t);
        draw(f, t, c, { dim: !allowed });
      });
    } else {
      CONNS_STD.forEach(([f, t, c]) => draw(f, t, c));
    }

    /* Remove paths that no longer apply. */
    this.paths.forEach((p, key) => {
      if (!used.has(key)) { p.remove(); this.paths.delete(key); }
    });
  }

  calcPath(fromEl, toEl, stageRect) {
    const fr = fromEl.getBoundingClientRect();
    const tr = toEl.getBoundingClientRect();
    const fcx = fr.left + fr.width / 2;
    const tcx = tr.left + tr.width / 2;
    let x1, y1, x2, y2;
    if (fcx < tcx) {
      x1 = fr.right - stageRect.left; y1 = fr.top + fr.height / 2 - stageRect.top;
      x2 = tr.left  - stageRect.left; y2 = tr.top + tr.height / 2 - stageRect.top;
    } else {
      x1 = fr.left  - stageRect.left; y1 = fr.top + fr.height / 2 - stageRect.top;
      x2 = tr.right - stageRect.left; y2 = tr.top + tr.height / 2 - stageRect.top;
    }
    const dx = Math.abs(x2 - x1) * 0.38;
    const sx = x1 < x2 ? 1 : -1;
    return `M${x1},${y1} C${x1 + dx * sx},${y1} ${x2 - dx * sx},${y2} ${x2},${y2}`;
  }
}

customElements.define(TAG, Section02);
