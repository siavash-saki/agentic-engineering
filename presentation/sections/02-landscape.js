/* Section 2 — Was ist was
   Three logical sections: Modell · (API & Subscription) · Produkt.
   The middle section visually contains two sub-columns (APIs left, Subs right)
   under one combined header. A DB-laptop filter shows the exact subscription
   paths that DB actually uses. */

const TAG = 's02-landscape';

const MODELS = [
  { id: 'm-gpt',    name: 'GPT',    maker: 'OpenAI',    color: 'c-openai',    top: '22%' },
  { id: 'm-claude', name: 'Claude', maker: 'Anthropic', color: 'c-anthropic', top: '50%' },
  { id: 'm-gemini', name: 'Gemini', maker: 'Google',    color: 'c-google',    top: '78%' },
];

const APIS = [
  { id: 'a-openai',    name: 'OpenAI API',    color: 'c-openai',    top: '20%' },
  { id: 'a-anthropic', name: 'Anthropic API', color: 'c-anthropic', top: '44%' },
  { id: 'a-google',    name: 'Google API',    color: 'c-google',    top: '68%' },
  { id: 'a-router',    name: 'OpenRouter',    color: 'c-router',    top: '88%' },
];

const SUBS = [
  { id: 's-openai',    vendor: 'OpenAI',    color: 'c-openai',    top: '14%' },
  { id: 's-anthropic', vendor: 'Anthropic', color: 'c-anthropic', top: '38%' },
  { id: 's-github',    vendor: 'GitHub',    color: 'c-github',    top: '62%' },
  { id: 's-amazon',    vendor: 'Amazon',    color: 'c-aws',       top: '86%' },
];

const PRODUCTS = [
  { id: 'p-codex',      name: 'Codex',          maker: 'OpenAI',    color: 'c-openai',    top: '14%' },
  { id: 'p-claude-app', name: 'Claude App',     maker: 'Anthropic', color: 'c-anthropic', top: '38%' },
  { id: 'p-gemini-app', name: 'Gemini App',     maker: 'Google',    color: 'c-google',    top: '50%' },
  { id: 'p-copilot',    name: 'GitHub Copilot', maker: 'GitHub',    color: 'c-github',    top: '62%' },
  { id: 'p-kiro',       name: 'Kiro',           maker: 'Amazon',    color: 'c-aws',       top: '86%' },
];

/* Each route is the chain of nodes from product to model.
   Used for connection rendering AND for hover highlight. */
const ROUTES = [
  ['p-codex',      's-openai',    'a-openai',    'm-gpt'],
  ['p-claude-app', 's-anthropic', 'a-anthropic', 'm-claude'],
  ['p-gemini-app', 'a-google',    'm-gemini'],
  ['p-copilot',    's-github',    'a-openai',    'm-gpt'],
  ['p-copilot',    's-github',    'a-anthropic', 'm-claude'],
  ['p-copilot',    's-github',    'a-google',    'm-gemini'],
  ['p-kiro',       's-amazon',    'a-anthropic', 'm-claude'],
];

const EDGE_COLOR = {
  'p-codex|s-openai':           'c-openai',
  'p-claude-app|s-anthropic':   'c-anthropic',
  'p-gemini-app|a-google':      'c-google',
  'p-copilot|s-github':         'c-github',
  'p-kiro|s-amazon':            'c-aws',
  's-openai|a-openai':          'c-openai',
  's-anthropic|a-anthropic':    'c-anthropic',
  's-github|a-openai':          'c-openai',
  's-github|a-anthropic':       'c-anthropic',
  's-github|a-google':          'c-google',
  's-amazon|a-anthropic':       'c-anthropic',
  'a-openai|m-gpt':             'c-openai',
  'a-anthropic|m-claude':       'c-anthropic',
  'a-google|m-gemini':          'c-google',
};

/* Build unique segment list from ROUTES. */
const SEGMENTS = (() => {
  const seen = new Set();
  const out = [];
  ROUTES.forEach(route => {
    for (let i = 0; i < route.length - 1; i++) {
      const key = `${route[i]}|${route[i + 1]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([route[i], route[i + 1], EDGE_COLOR[key]]);
    }
  });
  return out;
})();

/* OpenRouter sits in the middle for completeness (it's a universal API), but
   no product in the diagram routes through it. Show passive edges to all
   three models so viewers see what it does. */
const ROUTER_EDGES = [
  ['a-router', 'm-gpt',    'c-router'],
  ['a-router', 'm-claude', 'c-router'],
  ['a-router', 'm-gemini', 'c-router'],
];

const DB_ALLOWED = ['p-copilot', 'p-kiro', 's-github', 's-amazon', 'a-openai', 'a-anthropic', 'm-gpt', 'm-claude'];
const DB_BLOCKED = ['p-codex', 'p-claude-app', 'p-gemini-app', 's-openai', 's-anthropic', 'a-google', 'a-router', 'm-gemini'];

const CAPTIONS = {
  all: 'Jeder Coding-Agent läuft über eine kommerzielle <b>Subscription</b>. Sie entscheidet, welche APIs — und damit welche Modelle — erreichbar sind.',
  db:  'Bei der DB sind <b>zwei</b> Subscriptions aktiv: <b>GitHub</b> (für Copilot — Zugriff auf GPT und Claude) und <b>Amazon</b> (für Kiro — nur Claude). Andere Subscriptions sind nicht vorgesehen.',
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
          --c-github:    #24292F;

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

        /* The middle band visually groups APIs + Subs into a single section. */
        ${TAG} .mid-band {
          position: absolute;
          top: 22px;
          bottom: 0;
          left: 25%;
          right: 25%;
          background: var(--db-bg-subtle);
          border-radius: var(--db-radius-md);
          z-index: 0;
          opacity: 0.55;
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
        ${TAG} .cline.passive { opacity: 0.18; stroke-dasharray: 3 4; }

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
          white-space: nowrap;
        }
        ${TAG} .col-sublbl {
          position: absolute;
          top: 18px;
          transform: translateX(-50%);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--db-text-subtle);
          opacity: 0.7;
          z-index: 3;
        }

        ${TAG} .node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 2;
          background: var(--db-bg);
          padding: 10px 14px;
          min-width: 124px;
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
        ${TAG} .node.sub {
          border: 2px dashed var(--node-color, var(--db-cool-gray-300));
          border-radius: 999px;
          text-align: center;
          padding: 8px 16px;
        }
        ${TAG} .node.sub .nn { color: var(--node-color); }
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
          max-width: 920px;
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
        <h2>Modell · API &amp; Subscription · Produkt</h2>
        <div class="toggle" role="tablist">
          <button type="button" data-view="all" class="active">Alle verfügbar</button>
          <button type="button" data-view="db">Auf dem DB-Laptop</button>
        </div>
      </div>

      <div class="stage">
        <div class="mid-band"></div>
        <svg class="conn" xmlns="http://www.w3.org/2000/svg"></svg>

        <div class="col-lbl" style="left:8%">Modell</div>
        <div class="col-lbl" style="left:50%">API &amp; Subscription</div>
        <div class="col-lbl" style="left:92%">Produkt</div>

        <div class="col-sublbl" style="left:35%">api</div>
        <div class="col-sublbl" style="left:64%">subscription</div>

        ${MODELS.map(m => `
          <div class="node model" data-id="${m.id}"
               style="left:8%;top:${m.top};--node-color:var(--${m.color})">
            <div class="nn">${m.name}</div>
            <div class="nm">${m.maker}</div>
          </div>`).join('')}

        ${APIS.map(a => `
          <div class="node api" data-id="${a.id}"
               style="left:35%;top:${a.top};--node-color:var(--${a.color})">
            <div class="nn">${a.name}</div>
          </div>`).join('')}

        ${SUBS.map(s => `
          <div class="node sub" data-id="${s.id}"
               style="left:64%;top:${s.top};--node-color:var(--${s.color})">
            <div class="nn">${s.vendor}</div>
            <div class="nm">Subscription</div>
          </div>`).join('')}

        ${PRODUCTS.map(p => `
          <div class="node product" data-id="${p.id}"
               style="left:92%;top:${p.top};--maker-color:var(--${p.color})">
            <div class="nn">${p.name}</div>
            <div class="nm">${p.maker}</div>
          </div>`).join('')}
      </div>

      <p class="caption"></p>
    `;

    this.stage   = this.querySelector('.stage');
    this.svg     = this.querySelector('.conn');
    this.caption = this.querySelector('.caption');
    this.nodes   = new Map(
      Array.from(this.querySelectorAll('.node')).map(n => [n.dataset.id, n])
    );
    this.paths   = new Map();

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

  /* The set of nodes on a route containing `id`. */
  hoverSet(id) {
    const set = new Set();
    ROUTES.forEach(route => {
      if (route.includes(id)) route.forEach(n => set.add(n));
    });
    /* OpenRouter is not on any route — handle its hover specially: include
       all three models. */
    if (id === 'a-router') {
      set.add('a-router'); set.add('m-gpt'); set.add('m-claude'); set.add('m-gemini');
    }
    return set;
  }

  render() {
    const view = this.view;
    const hovered = this.hovered;

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

  drawConnections() {
    if (!this.stage.isConnected) return;
    const stageRect = this.stage.getBoundingClientRect();
    if (stageRect.width === 0) return;

    const used = new Set();
    const hoverSet = this.hovered ? this.hoverSet(this.hovered) : null;

    const drawSegment = ([from, to, colorVar], passive = false) => {
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
      p.classList.remove('hl', 'dim', 'passive');

      if (this.view === 'db') {
        const allowed = DB_ALLOWED.includes(from) && DB_ALLOWED.includes(to);
        p.classList.add(allowed ? 'hl' : 'dim');
      } else if (hoverSet) {
        const match = hoverSet.has(from) && hoverSet.has(to);
        p.classList.add(match ? 'hl' : 'dim');
      } else if (passive) {
        p.classList.add('passive');
      }
    };

    SEGMENTS.forEach(seg => drawSegment(seg, false));
    ROUTER_EDGES.forEach(seg => drawSegment(seg, true));

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
