# The visual redesign — the plan

The deck's problem, measured: a median of **154 words per slide**, **17 of 33**
slides built from the identical skeleton (title · lede · card row · mint strip),
**6 of 33** containing any drawing, and a third of the frame empty on the slides
that carry the most text. Slide 4 — the one everybody will remember — is 6 words
and a picture.

The fix is not more decoration. It is that the deck currently authors every idea
as *a list of items with descriptions*, so every idea renders as a list of items
with descriptions. Six passes, below, each with a checkable output.

## The constraint that shapes everything

The deck is two artifacts at once: a talk, and a thing a reader clicks through
alone to learn from. So **no text is deleted**. Instead text stops being on
screen all at once.

Every slide gets **build layers**:

| Layer | Holds | Words on screen |
|---|---|---|
| **L0** | The title and the drawing, with its own labels. The claim, readable in 3 seconds. | ≤ 40 |
| **L1** | The reasoning — what is now card prose, revealed anchored to the part of the drawing it explains. | the rest |
| **L2** | The takeaway (`.fg-note`). | one line |

Advance with the same key that advances slides: a slide with layers consumes
`→`/`Space` until it is complete, then moves on. A reader alone advances the
same way. `↓` reveals all layers at once; print and reduced-motion always show
all layers.

**Total word count does not drop. Simultaneous word count drops by ~4×.** That is
the whole reconciliation between "keep the text" and "stop being a wall of text".

---

## Pass 1 — every slide classified by the shape of its idea

A slide is mis-rendered when its shape and its layout disagree. This is an audit
with a right answer, and it is also what says where *not* to spend.

| # | Slide | Shape of the idea | Verdict |
|---|---|---|---|
| 1 | Title | sequence on a path | **agrees** — leave |
| 2 | Two prompts | **fork** — one input, two paths, two outcomes | redraw |
| 3 | Vibe vs. Agentic | comparison matrix on a shared spine | **agrees** — layers only |
| 4 | The same thing, drawn | two parallel sequences, chaos vs order | **rebuild as SVG** |
| 5 | Plan → Build → Review | **cycle** | redraw — the deck's thesis is not drawn as a loop |
| 6 | Why written down | one cause, three consequences | redraw |
| 7 | Two agreements | sequence with gates as points on a line | diagram is right — **the cards below duplicate it** |
| 8 | Plan (opener) | sequence of four moves | **tier** — an opener carrying 130 words |
| 9 | Read first | exhibit + annotation | redraw — rules should point *at* the prompt |
| 10 | Make it ask | **exchange** — you say, it asks back | redraw |
| 11 | What goes in the file | inclusion/exclusion + a paired contrast | two shapes on one slide — split |
| 12 | Four ways a plan fails | unordered set of four | **agrees** — leave the cards |
| 13 | Build (opener) | set of three + a foundation under them | **tier** |
| 14 | One memory file | **convergence** — four tools, one file | redraw — a hub drawn as a table |
| 15 | Skills and MCP | parallel pair | light — cast objects |
| 16 | Tool output is data | **confluence + a breached boundary** | redraw — the most drawable idea in the deck, currently a list |
| 17 | Drift | fork with divergent outcomes (same shape as 2) | redraw — reuse the fork device |
| 18 | Review (opener) | pair, split by who answers | **tier** |
| 19 | Walk the criteria | genuinely tabular | **agrees** — make the PENDING row the climax |
| 20 | What a pass may claim | set of three rules | light |
| 21 | The test that cannot fail | exhibit + annotation + a chain it passed | light — the chain is a sequence, drawn as bullets |
| 22 | Who reviews | **ladder** — ordered, monotonic | redraw — rung 4 currently looks like rung 1 |
| 23 | Four things the author cannot see | set of four + two | light — densest slide (215 words), split candidate |
| 24 | Five things you give it | taxonomy across a portability line | redraw — **and it overflows: 98% fill, footer clipped** |
| 25 | What loads into context | **containment** | redraw — the boundary is implied by card edges, not drawn |
| 26 | How much of this | **spectrum driven by two axes** | redraw — a dial drawn as three peers |
| 27 | The smallest version | sequence of six | redraw — a sequence in a 3×2 grid is not a sequence |
| 28 | SDD full process | sequence with artifacts and gates | diagram is right — **the ship block dilutes it** |
| 29–32 | spec / plan / tasks / verification | exhibit — a real file | **agree** — leave, fill more frame |
| 33 | Close | summary + resources | light — 43% fill, should land harder |

**8 slides need nothing. 4 need only layering. 21 get real work, of which 13 are
true shape mismatches.**

## Pass 2 — the layering mechanism

New in `core/presentation.js`:

- A slide declares `static layers = N`. The shell tracks `(slide, layer)`.
- `→`/`Space` advances the layer, then the slide. `←` reverses symmetrically.
- The current layer is set as `data-layer` on the section element; CSS reveals
  `[data-show="1"]`, `[data-show="2"]` … as the number rises.
- `↓` jumps to the last layer. The URL carries `#12.2` so a reader can link a
  state.
- Print and `prefers-reduced-motion` force the last layer.
- The existing entrance contract is unchanged: base style **is** the resting
  state, keyframes describe only the departure.

Consequence for layout: **L0 must fill the frame**, because it is mostly a
drawing. The drawing settles (does not shrink out of existence) as layers land.

## Pass 3 — the cast

The same nine entities recur through all 33 slides. Given a fixed form once,
every later slide can be *drawn by arranging them* instead of described in
prose. Two of the nine already exist and are reused on slides 7 and 28 — this
pass promotes them out of those files into `core/cast.js` and adds the rest.

| Object | Form | Already exists on |
|---|---|---|
| **Step node** | a ring on the line | 1, 7, 28 |
| **Gate** | a filled numbered disc on the line | 7, 28 |
| **Document** | a small card hanging off the line, kind + filename | 7, 28 |
| **Person** | — | to draw |
| **Agent** | — | to draw |
| **Second reader** | agent form, distinct | to draw |
| **Code / diff** | — | to draw |
| **Boundary** | a drawn enclosure with a labelled edge | to draw (16, 25 need it) |
| **Verdict** | pass · not verified | 19, 32 |

All inline SVG, no raster, no dependency, bilingual by construction (labels are
passed in). Nine primitives, not 33 illustrations — and each new slide gets
faster to build, which matters because this deck gets edited in two languages
the night before a talk.

## Pass 4 — colour: five hues, two systems

Green currently means: the answer, the accent, code, the takeaway, the ordinal,
success, and links. Seven jobs, so it signals nothing — and one accent across 33
slides is also *why the deck reads as monotone*. The fix is not a brighter green;
it is more hues, each with exactly one job.

### The two systems, separated by where they live

A rule a viewer learns once and can then read the deck with:

> **Colour on the frame tells you where you are. Colour in the content tells you
> what it means.**

**Structure — the chapter hues.** Plan, Build and Review are the deck's spine and
appear on slides 1, 3, 5, 7, 27, 28 and 33 as well as owning their own chapters.
Giving each a hue makes that spine visible everywhere, and turns the nav chip row
into a legend for the whole talk. Chapter hue lives on the opener, the chip, the
step node, a spine hairline — **never on body text**.

**Content — the state colours.** Verdicts, failing paths, unevidenced claims.
These live in the content — **never on structure**.

### The palette

Every value verified against paper `#F5F7F3` and card `#FFFFFF`. `base` is for
strokes and labels, `deep` for text on the tint, `tint` for washes behind text,
`light` for the near-black terminal and tree mock-ups.

| Role | base | on paper | deep | tint | light |
|---|---|---|---|---|---|
| **Plan** · blue | `#1D5A8C` | 6.73:1 | `#123A5C` | `#E2EDF5` | `#7FB3D9` |
| **Build** · green *(existing)* | `#0E7734` | 5.26:1 | `#094B21` | `#E7F2E2` | `#6FBE89` |
| **Review** · plum | `#7A3B6B` | 7.31:1 | `#4F2545` | `#F2E6EF` | `#C08FB4` |
| **Failure** · clay *(existing)* | `#B4552C` | 4.56:1 | `#7C3819` | `#F7E9E1` | `#E09B74` |
| **Unverified** · ochre | `#8A6410` | 4.98:1 | `#5C4209` | `#F5EEDC` | `#D4B361` |

All ten text values clear AA (4.5:1) on both grounds; the tightest is clay, which
already ships. Ink on every tint measures 13.7–14.4:1, and every `light` clears
6.1:1 on `#16211C`.

### The human is the one thing that is not coloured

| Variable | Means | Never |
|---|---|---|
| **Ink** `#16211C` | **the human, and every human decision** — gates, approvals, acceptance | decoration |
| **Chapter hue** | which step of the loop this belongs to | body text |
| **Clay** | the failure mode — the thing that goes wrong, usually silently | emphasis |
| **Ochre** | claimed but not evidenced — *pending*, which the deck insists is not failure | failure |
| **Grey / hairline** | the machine's plumbing — connectors, pipelines, agent activity | the human |
| **Tint wash** | a block belonging to one hue; the takeaway layer | anything else |
| Mono | code, paths, commands, file source *(unchanged)* | prose |
| Depth | the three elevations *(unchanged)* | hover |

Everything the machine does is coloured and soft. **A human decision is a hard
black stop on the line.** That resolves the collision where green would otherwise
have meant both "Build" and "a person agreed", it is the strongest mark available
in the palette for the talk's most important act, and it survives greyscale
perfectly — ink sits at grey 1 against the hues' 8–16.

The deck also gains a third verdict it currently cannot express. Its own argument
distinguishes **pass**, **not verified** and **wrong** — and it insists a truthful
PENDING beats a convincing PASS. Today those render identically. Now: green, ochre,
clay.

### Harmony is bought with a constraint

The five hues sit in a **6-point greyscale band** (blue 9, plum 8, green 14, ochre
15, clay 16) — near-identical in lightness. That is *why* they harmonise: one value
band, moderate chroma, all on the same warm-green paper. It is also why they are
indistinguishable in greyscale, on a washed-out projector, and to the ~8% of the
audience with a colour vision deficiency.

So the rule is absolute, not a caveat:

> **Colour is never the only carrier of a distinction.**

- Chapter hue always travels with the chapter's **name**.
- A failing path is **clay *and* a broken/dashed line**; the accepted path is solid.
- A verdict is a colour **and** a glyph: ✓ pass · ◦ not verified · ✕ wrong.
- The human's gate is ink **and** a filled disc; a machine step is a hollow ring.

Strip the colour and every distinction in the deck still reads. That is the test.

## Pass 5 — tiers, for rhythm

The deck currently has exactly one tier. Four:

| Tier | What it is | Slides |
|---|---|---|
| **A · Statement** | near-wordless, fills the frame | 5, 8, 13, 18, 33 |
| **B · Diagram** | a drawing is the primary element | 2, 4, 6, 7, 14, 16, 17, 22, 24, 25, 26, 27, 28 |
| **C · Exhibit** | a real artifact fills the frame | 9, 10, 21, 29–32 |
| **D · Matrix** | genuinely tabular | 3, 11, 12, 19, 20, 23 |

Rule: **never more than three B/C/D slides in a row without an A.** There are
currently zero Tier A slides in the deck, which is why 33 slides read as one long
slide.

Chapter openers (8, 13, 18) become Tier A: the headline plus the cast drawing of
where that step sits in the loop. Their current prose moves to L1, or to the
slide after.

## Pass 6 — motion sequenced to the argument

Pass 2 delivers most of this. Beyond it:

- A connector draws **when the relationship is asserted**, not on slide entry.
- The choreography scale (`--fg-at`, 12 slots, one beat apart) is unchanged and
  now spans layers rather than only the entrance.
- `.fg-cue` stays as-is: at most one per slide.

## Verification

Measurable in the browser, the same way the numbers at the top were measured.

| # | Check | Target |
|---|---|---|
| 1 | Words visible at L0 | ≤ 40 (currently 154 median, always) |
| 2 | Total words per slide, all layers | **no decrease** vs. today |
| 3 | Frame fill at final layer | 70–92%; nothing over 95% |
| 4 | Smallest rendered type | ≥ 14px (existing floor) |
| 5 | **Greyscale** — screenshot every slide desaturated | every distinction still readable **without hue** |
| 6 | Contrast of every new colour on both grounds | ≥ 4.5:1, re-run `palette.mjs` |
| 7 | Time to final layer | < 3s of animation |
| 8 | Raster assets | zero |
| 9 | **DE renders at every layer without overflow** | the one that will bite — German runs longer |
| 10 | Hues per slide | ≤ 2 chapter/state hues in the content, plus ink and greys |

---

## Order of work

Foundation lands with slide 2, because slide 2 needs all three: the layer
mechanism, the first cast objects (person, agent, document, fork), and the
palette with its two systems.

The palette is the one piece that is cheap to try and cheap to reverse — it is
custom properties in `theme-field-guide.css`. If it is wrong, it is wrong on
slide 2 and costs one edit, not a rebuild.

Then in deck order, skipping the eight that need nothing. Three groups are
better done together than in sequence, and will be flagged when reached:

- **7 + 28** share the pipeline device.
- **8 + 13 + 18** are the same tier change.
- **29–32** share `core/artifact-slide.js`.

Slide 4 — the PNG rebuilt as SVG — is the largest single piece in the plan and
the cast's hardest exercise. It comes third in deck order; it may be worth
deferring until the cast has been proven on a few simpler slides.

---

# What actually happened

The plan above is kept as written, because it is the record of what was
predicted. This section records where reality disagreed with it. Everything
below was measured in the running deck, not inferred.

## The deck is 29 slides, not 33

Two structural decisions taken at review:

- **Slide 16, "Tool output is data", was cut.** With it goes the deck's only
  treatment of prompt injection. Slide 15 now carries the load-bearing half in
  one clay strip: *a server is somebody else's code running inside your session,
  and what it hands back is text nobody on your team wrote.*
- **Slides 29–32 became one slide.** The four artifacts share a rail whose cards
  are real buttons; clicking one swaps the document. It is the only section in
  the deck with event listeners and a `disconnectedCallback`.

Everything from old 17 shifted down one; old 33 shifted down four.
`core/artifact-slide.js` was deleted — the merge made it dead code.

## Pass 1 was mostly right, and wrong twice

Two slides the audit called mis-shaped turned out to be correctly shaped:

- **Slide 12** ("Four ways a plan fails") — the audit said *agrees*, and building
  two alternatives confirmed it. An unordered set of four is what a card row is
  for. What was actually wrong was that four failure modes had no failure colour.
- **Slide 23** ("Four things the author cannot see") — filed as the densest slide
  and a split candidate. Measured, its one-page versions fill 74–87% *with the
  title at full size and the prose larger than it shipped*. Density was a shape
  problem, not a space problem: the four and the two are not peers, and drawing
  that seam fixed it without removing a word.

## Check 3 measures the wrong thing

> ~~Frame fill at final layer — 70–92%; nothing over 95%~~

Measured this way, the landed and approved slides 5, 6, 7 and 8 sit at
**91.7–94.1%** — above the stated ceiling. The number is dominated by the frame
padding, not by the drawing, so it cannot tell a full frame from an empty one.
Three separate agents reached this independently.

**Use drawing-region occupancy instead** — how much of the body band the figure
fills. On slide 27's three variations that metric read 56% / 70% / 100% where
frame fill read 93.8% for all three.

## Check 1 does not apply

> ~~Words visible at L0 — ≤ 40~~

The build-layer mechanism in pass 2 was never built. Every slide was chosen at
full reveal, so there is no L0. The reconciliation between "keep the text" and
"stop being a wall of text" was achieved by **shape** instead: the same words,
arranged so the drawing carries the argument.

## The real stage is viewport − 110px

55px header **and** 55px nav bar. Below ~1150px the nav wraps to two rows and
takes another 26px; at 980px the stage is viewport − 136. A prototype harness
with only a header measures 55px too generous, and every `clamp(px, vh, px)`
token then resolves against a viewport the deck never runs at.

## Four ways content escapes without any check noticing

This is the most useful thing the redesign turned up. `scrollHeight ===
clientHeight` passes in **all four** cases:

| Cause | What happens |
|---|---|
| `.body { flex: 1 }` | the body shrinks below its content and paints through the foot — and the slide will not even offer to scroll |
| `.body { min-height: 0 }` | same, by a different route: it removes the automatic minimum |
| `overflow: hidden` on a panel | content is clipped and simply absent |
| a stretched grid row | the row paints into its sibling; nothing overflows and nothing clips |

The fix for the first two is `flex: 1 0 auto`. The last two need a probe: compare
the deepest descendant's `getBoundingClientRect().bottom` against its container's,
and check for occlusion by an opaque later sibling.

**Verification is therefore: overflow, spill, clip, occlusion — settled.** Every
measurement must be taken after the entrance completes; `fg-rise` is a
`translateY(12px)`, so anything measured mid-flight reports a phantom 12px.

## Three kit-level bugs found while building on it

- **`.fg-in` clobbers `transform`.** Its keyframe animates
  `transform: translateY(12px)`, which *replaces* a resting `translateY(-50%)`.
  Anything pinned to a line enters 12px off and snaps into place at the end —
  invisible in a screenshot, because the resting state is correct.
- **`◦` (U+25E6) renders at about a third of its em box**, so beside a `✓` at the
  same size it reads as a middot and the hollow-vs-filled cue silently dies.
  Needs ~2.1em with a collapsed line box.
- **`✓` (U+2713) renders as `√` in Plex Mono** but correctly in Inter. A verdict
  glyph must take the body face.

## Bugs this found in the shipping deck

Each was verified live, not inferred:

| Slide | Bug |
|---|---|
| 32 | "not verified" drawn in clay — the *failure* hue — with no glyph at all. The deck's loudest claim rendered as its own opposite. |
| 29–32 | the artifact device multiplied already-clamped tokens by 0.88/0.92 and rendered at **12.9–13.2px**, under the deck's own 14px floor |
| 24 | **139% of the stage at 980×800** — 250px of content off the frame |
| 19 | the pending badge in `--ae-error`, and the pending row's ground in the "switched off" grey |
| 15 | `<name>` eaten by `innerHTML`, rendering `.claude/skills//SKILL.md` |

## Still open

- **Slide 2 overflows by 21px at 1280×720**, with 6px past the section edge. It
  is the one slide deliberately left as it was, so this was not touched.
- **Slide 7's narrow fallback does not stack** — its inline `grid-column` values
  are not overridden below 1000px, so the three columns survive into a width that
  cannot hold them.
- **The 1240px `.fg-wrap` cap against a vh-derived type scale.** On a taller
  screen the type grows ~35% while the column does not, so prose-dense slides
  gain lines exactly where the stage has least slack. The deck is squeezed from
  both ends: this at the top, the type floors at the bottom.
- **Slide 4 is still a PNG**, against the no-raster rule.
