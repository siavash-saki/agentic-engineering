# Agentic Engineering

A self-contained, dependency-free web slide deck about **agentic engineering** — using AI coding tools deliberately rather than ad hoc. Company- and tool-agnostic, and fully **bilingual (English / German)** — toggle `EN / DE` in the header.

The deck lives in [`presentation/`](presentation/) and is plain HTML/CSS/JS — no build step, no `node_modules`. **30 slides** in five chapters: Start → Primitives → SDD → Best Practices → Practice.

## Adopting the method

The deck teaches a method; [`adoption-kit/`](adoption-kit/) is that method
packaged to drop into a repo — memory file, `sdd/` convention, four artifact
templates, four phase commands, and a dependency-free artifact check.

```bash
./adoption-kit/install.sh /path/to/your-repo --dry-run
```

What ships here is the convention itself, ready to use rather than described:
[`sdd/`](sdd/) carries the layout, the frontmatter contract and a template per
artifact, and `node scripts/lint-artifacts.mjs` enforces the half of it a machine
can decide. Feature folders arrive as work happens. To see the check earn its keep
before you have any, run it against
[`adoption-kit/fixtures/`](adoption-kit/fixtures/) — one tree where every rule
fails, one where every rule passes.

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
- Respects `prefers-reduced-motion`: slide animations collapse to instant reveals

## Languages

The deck ships in **English (default)** and **German**. Switch with the `EN / DE` toggle in the header; the choice is remembered (`localStorage`) and reflected on `<html lang>`. You can also pin a language via the URL, e.g. `…:8000/?lang=de#5`.

Content lives in a `{ en, de }` map inside each section component and in [`core/i18n.js`](presentation/core/i18n.js); switching language re-mounts the current slide.

## Content notes

- The SDD chapter teaches **four artifacts** — Spec (Contract), Plan (Build Plan), Tasks (Checklist), Verification (Proof) — with a running rate-limiting example and real YAML frontmatter (versioning + provenance).
- The per-tool mapping tables (slides 5–6: Claude Code, Copilot, Codex, Kiro, Cursor) were verified against official docs in **July 2026** and carry a date stamp on the slide. Re-verify them before presenting much later than that.

## Structure

```
presentation/
  index.html            # shell: header, stage, footer
  core/
    presentation.js     # slide registry + navigation/keyboard logic
    i18n.js             # language state, persistence, EN/DE switching
    styles.css          # presentation shell layout + reduced-motion support
  sections/             # one self-registering web component per slide ({ en, de } content)
  assets/               # design tokens + images
```

## Typefaces

Three families, all self-hosted in [`presentation/assets/fonts/`](presentation/assets/fonts/) and all licensed under the **SIL Open Font License 1.1**. Each family's full licence text sits next to the binaries, verbatim from its publisher — self-hosting a font is redistribution, and the OFL requires the copyright notice and licence to travel with every copy.

| Family | Used for | Source | Licence |
|---|---|---|---|
| **Bricolage Grotesque** | display, headings, slide titles | [ateliertriay/bricolage](https://github.com/ateliertriay/bricolage) | [`OFL-Bricolage-Grotesque.txt`](presentation/assets/fonts/OFL-Bricolage-Grotesque.txt) |
| **Inter** | body, labels, captions | [rsms/inter](https://github.com/rsms/inter) | [`OFL-Inter.txt`](presentation/assets/fonts/OFL-Inter.txt) |
| **IBM Plex Mono** | code, file paths, hex values | [IBM/plex](https://github.com/IBM/plex) | [`OFL-IBM-Plex-Mono.txt`](presentation/assets/fonts/OFL-IBM-Plex-Mono.txt) |

Bricolage and Inter ship as `latin` + `latin-ext` subsets, because the deck is EN/DE. **IBM Plex Mono ships complete and unmodified**, byte-identical to IBM's release, because it carries a Reserved Font Name: under the OFL a Modified Version may not use a reserved name, and removing glyphs to make a webfont is modification. The two subset families reserve no name, so their subsets are permitted.

Regenerate all of it — binaries, licences and the `@font-face` declarations — with:

```bash
node scripts/fetch-fonts.mjs
```

No font is fetched at load time and there is no CDN link: the deck has to render in a conference room whose wifi is not a dependency worth having.

## Licence

Licensed under the **Apache License, Version 2.0** — see [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE). You may use, adapt and present this material, including commercially and inside a company, provided you keep the attribution in `NOTICE` with it.

Three things that licence deliberately does not cover:

- **The typefaces** in [`presentation/assets/fonts/`](presentation/assets/fonts/) are under the SIL Open Font License 1.1, not Apache-2.0. Each ships with its own licence text — see [Typefaces](#typefaces) above.
- **My name and the talk's title.** Apache-2.0 §6 grants no trademark licence. Present the material, adapt it, put your own name on your version — but not mine.
- **Tool and company names** in the deck (Claude Code, GitHub Copilot, OpenAI Codex, Amazon Kiro, Cursor) are their owners' trademarks, used here only to identify the tools being compared. No affiliation or endorsement is implied.

## Deploy

Deploys as a static site, auto-deployed by Vercel's Git integration on every push to `main`. [`vercel.json`](vercel.json) rewrites `/` to `/presentation/index.html` and maps all other paths into `/presentation/`, so the deck and its relative assets resolve correctly from the root URL.
