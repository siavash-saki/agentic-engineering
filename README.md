# Agentic Engineering

A self-contained, dependency-free web slide deck about **agentic engineering** — using AI coding tools deliberately rather than ad hoc. Company- and tool-agnostic, and fully **bilingual (English / German)** — toggle `EN / DE` in the header.

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

## Languages

The deck ships in **English (default)** and **German**. Switch with the `EN / DE` toggle in the header; the choice is remembered (`localStorage`) and reflected on `<html lang>`. You can also pin a language via the URL, e.g. `…:8000/?lang=de#5`.

Content lives in a `{ en, de }` map inside each section component and in [`core/i18n.js`](presentation/core/i18n.js); switching language re-mounts the current slide. The pre-bilingual German-only version is preserved at the git tag `v1-de`.

## Structure

```
presentation/
  index.html            # shell: header, stage, footer
  core/
    presentation.js     # slide registry + navigation/keyboard logic
    i18n.js             # language state, persistence, EN/DE switching
    styles.css          # presentation shell layout
  sections/             # one self-registering web component per slide ({ en, de } content)
  assets/               # design tokens + images
```

## Deploy

Deploys as a static site, auto-deployed by Vercel's Git integration on every push to `main`. [`vercel.json`](vercel.json) rewrites `/` to `/presentation/index.html` and maps all other paths into `/presentation/`, so the deck and its relative assets resolve correctly from the root URL.
