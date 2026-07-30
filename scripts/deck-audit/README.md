# Deck audit

Three browser-side checks for the mechanical half of the deck's design rules —
the type floor, overflow, where monospace is allowed, and what may sit above a
heading. Each is a self-contained expression that audits **the slide currently
mounted** and returns JSON. They live here because a design system is easy to
regress by hand, and these are the only parts of it a machine can settle.

| File | Criteria |
|---|---|
| `criteria.js` | 2 (edge bars), 4 and 5 (monospace), 6 (no nav furniture), 7 (14px floor), 10 (overflow) |
| `contrast.js` | 8 — WCAG AA against the real composited background |
| `overlap.js`  | 10 — the half a scroll test cannot see: colliding or clipped text |

## Running them

Serve the deck, drive a browser, evaluate a file against each slide:

```bash
agent-browser set viewport 1920 1080
agent-browser set media light reduced-motion      # settle every reveal
agent-browser batch "open http://127.0.0.1:8000/index.html?x=3#3" "wait 600"
agent-browser eval --stdin < scripts/deck-audit/criteria.js
```

Two settings are not optional, and both produced false results while this was
being written:

- **The viewport must be 1920×1080.** Criterion 10 is scoped to it, and the
  slide scale is viewport-relative, so a short window legitimately overflows.
- **Reduced motion must be on.** Slides reveal their content with per-element
  delays; `contrast.js` folds element opacity into the foreground, so a slide
  measured mid-reveal reports its own animation as a contrast failure.

`python3 -m http.server` sends no `Cache-Control`, so Chrome will serve edited
slide modules from cache without revalidating — a cache-buster on `index.html`
does not reach its ES-module imports. Serve with `no-store` when auditing.

## What they cannot decide

Whether monospace content is *really* code. `criteria.js` trusts `.fg-source`,
`<code>`, `<kbd>` and `<samp>` — which is reading the markup, not excusing it,
but it means a wrongly-marked panel passes. Marking one too broadly silences the
check inside it: that is exactly how a monospace all-caps table header survived
a green sweep during this feature. Keep the marker on the source itself, never
on a container that also holds labels.
