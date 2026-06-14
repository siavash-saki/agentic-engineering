# Agentic Engineering

A self-contained, dependency-free web slide deck about **agentic engineering** — using AI coding tools deliberately rather than ad hoc. Company- and tool-agnostic; the content is in German.

The deck lives in [`presentation/`](presentation/) and is plain HTML/CSS/JS — no build step, no `node_modules`.

## Run it locally

The slides load each section as a native **ES module**, so you need to serve the folder over HTTP — opening `index.html` directly via `file://` will not work.

Pick any static server:

```bash
# Python 3 (no install needed)
python3 -m http.server 8000 --directory presentation

# or Node
npx serve presentation

# or any other static file server pointed at ./presentation
```

Then open <http://localhost:8000> (adjust the port to match the server you used).

## Navigation

- **Arrow keys** / **Space** / **Page Up·Down** — previous / next slide
- **Home** / **End** — first / last slide
- **P · S · T · R** — jump to the *Primitives*, *SDD*, *Tips*, and *Praxis* chapters
- **F** — toggle fullscreen (also available as a button in the footer)
- The footer also has clickable chapter chips and Prev/Next buttons
- Deep-link to a slide with the URL hash, e.g. `…:8000/#5`

## Structure

```
presentation/
  index.html            # shell: header, stage, footer
  core/
    presentation.js     # slide registry + navigation/keyboard logic
    styles.css          # presentation shell layout
  sections/             # one self-registering web component per slide
  assets/               # design tokens + images
```

## Deploy

Deploys as a static site. [`vercel.json`](vercel.json) rewrites `/` to `/presentation/index.html`, so the root URL serves the deck.
