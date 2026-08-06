# Slide variations — the alternatives that were not picked

Working prototypes from the redesign that took the deck from 33 slides to 29.
Each file is a standalone page carrying two to six versions of one slide, with
a harness for comparing them: number keys switch variation, `EN`/`DE` switches
language, **Greyscale** strips the hue so you can check that every distinction
still reads without it, and **Replay** re-runs the entrance.

Open [`index.html`](index.html) for the map, or serve the repo root and browse
to a file directly:

```
python3 -m http.server 8000
```

They are kept for three reasons. They are the record of what was considered and
rejected, and why. They hold the **strings for the versions that were not
picked** — the landed sections carry only the strings their own version
renders, so the unpicked copy exists nowhere else. And they are the only place
several devices are shown side by side, which is the fastest way to see why one
of them won.

## The filenames use the OLD slide numbers

These were built before slide 16 was cut and before the four SDD artifact
slides were merged into one, so **the numbers do not match the deck any more**.
From slide 16 onward, subtract one; the four artifact files became a single
slide.

| Deck slide today | Prototype file |
|---|---|
| 16 · Drift | `slide-17-variations.html` |
| 17 · Review opener | `slide-18-variations.html` |
| 18 · Walk the criteria | `slide-19-variations.html` |
| 19 · What a pass may claim | `slide-20-variations.html` |
| 20 · The test that cannot fail | `slide-21-variations.html` |
| 21 · Who reviews | `slide-22-variations.html` |
| 22 · Four things the author cannot see | `slide-23-variations.html` |
| 23 · Five things you give it | `slide-24-variations.html` |
| 24 · What loads into context | `slide-25-variations.html` |
| 25 · How much of this | `slide-26-variations.html` |
| 26 · The smallest version | `slide-27-variations.html` |
| 27 · SDD, the full process | `slide-28-variations.html` |
| 28 · SDD, the four artifacts | `slide-29-32-variations.html` |
| 29 · Close | `slide-33-variations.html` |

Slides 1–15 kept their numbers. `slide-16-variations.html` is for **a slide
that no longer exists** — "Tool output is data", cut at review. Its boundary
object survives in slides 23 and 24, and the load-bearing half of its claim
moved into slide 15.

The files were not renamed because their internal comments reference the old
numbers too, and renaming the file alone would make the mismatch harder to
spot rather than easier.

## Two caveats before you trust a number in one of these

**The harness stage is 55px taller than the deck's.** These pages have a
header; the real deck has a header *and* a nav bar, so the real stage is
`viewport − 110px`. Fill percentages measured here read optimistic.

**Some fixes exist only in the landed slide.** Several defects were found
while porting a variation into the deck and were fixed there, not here — the
narrow-width fallback on slide 17's prototype, for instance, collapses its
columns on top of each other, which the landed slide corrects.

What was actually built, what the plan got wrong, and the bugs this turned up
in the shipping deck are recorded in
[`presentation-v2/DESIGN.md`](../../presentation-v2/DESIGN.md).
