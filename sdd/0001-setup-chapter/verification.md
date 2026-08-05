---
feature: 0001-setup-chapter
artifact: verification
version: 1
status: draft
updated: 2026-08-05
authoring_tool: claude-code
model: Opus 5 (1M context)
reasoning_effort: xhigh
---

# Verification — Setup chapter

**Status: draft, and it will stay draft until a human has clicked through the
deck.** Eight of the eleven criteria are structural and are evidenced below
from the source and from repeatable checks. Three need a browser and a pair of
eyes, and one of those three was explicitly handed back to the author of this
repository at the spec gate. None of them is marked passed here.

The author's instruction after approving the spec was "you don't need to
verify, leave it to me". This record is written so that what remains is a short
list rather than a re-reading of the whole feature.

## Automated checks

| Check | Command | Result |
|---|---|---|
| Artifact lint | `node scripts/lint-artifacts.mjs` | PASS — no violations |
| ES module parse, both new slides and the edited registry | `node --check` on each | PASS — 3 files, no syntax errors |
| Slide order equals file order | parse of the section registry against `sections/` | PASS — 33 entries, identical sequence |
| Every section tag equals its filename | per-file comparison of `TAG` to basename | PASS — 33 files, no mismatch |
| Chapter chips resolve to the intended slides | parse of the chapter table against the registry | PASS — 9 chapters, each lands on the slide named below |
| Chapter shortcut keys unique | parse of the chapter table | PASS — `l p b r u x s e`, no duplicate, none colliding with the deck's other bindings |
| EN and DE content maps structurally identical | key and shape comparison of both language maps | PASS — same keys, same nesting, same item counts, both slides |

Chapter chips after the change: Start → 1, The Loop → 5, Plan → 8, Build → 13,
Review → 18, **Setup → 24**, Practice → 26, SDD → 28, End → 33.

## Acceptance criteria

| # | Criterion | Evidence | Result |
|---|---|---|---|
| 1 | Two-slide chapter between the last Review slide and the dial | Registry order: `s23-review-diff`, `s24-setup-kit`, `s25-setup-context`, `s26-dial`. Confirmed by the order check above. | PASS |
| 2 | Chapter chip and shortcut mount the first slide; no key collision | Chip resolves to `s24-setup-kit` and key `u` is unique — both machine-checked. Whether the chip mounts the slide in a browser was not exercised. | PENDING |
| 3 | All six items present, split portable / tool-specific, each portable one names who keeps it | Slide 1 carries Memory, Skills, MCP under "Portable" with `AGENTS.md` → Agentic AI Foundation (Linux Foundation), `SKILL.md` → open standard, published spec at agentskills.io, `Model Context Protocol` → Agentic AI Foundation (Linux Foundation); Hooks and Subagents under "Tool-specific"; plugins in the closing note. Six items, two groups. | PASS |
| 4 | At least three items tied back to where the talk already used them | The lede names four: the memory file, skills and MCP as Build slides, and the second model that read the diff in Review as a subagent. | PASS |
| 5 | One concept spelled differently across three tools, each already named in the deck, each path checked the day the slide lands | The hooks mapping shows Claude Code, Codex and Cursor — all three are already named on the Build slides. **The paths were not re-checked; they carry forward the July 2026 check and the slide's stamp says so.** Handed to the author. | PENDING |
| 6 | Each of the five loadable items appears once under when it enters context, and the always-resident ones are marked | Slide 2: `AGENTS.md` and MCP servers under "At session start" carrying the "Charged on every request" tag; Skills under "On use"; Subagents and Hooks in the "Outside it" panel. Five items, five placements, no repeats. | PASS |
| 7 | Every item named in slide 3's "Context and tools" row is explained somewhere | The row names Memory, Skills, MCP, subagents, hooks. Memory, Skills and MCP have Build slides; subagents and hooks are now carried by both Setup slides. All five covered. | PASS |
| 8 | Both new slides in German, same content, nothing left in English | Structural parity machine-checked (same keys, same shapes). A scan for characteristic English strings in the German map returned nothing. Translation *quality* is a human judgment and is not claimed here. | PASS |
| 9 | Click-through of the whole deck in both languages: counter, chapter highlight, deep links, clean console | No browser run was performed. | PENDING |
| 10 | Every claim that could rot carries the date it was checked | Slide 1 footer: "Governance checked August 2026 · tool paths July 2026 — re-check before relying on them." Slide 2 footer: "Loading behaviour checked August 2026 — re-check before relying on it." Both present in both languages. | PASS |
| 11 | Artifact lint passes | `node scripts/lint-artifacts.mjs` → PASS, no violations. | PASS |

## Success criteria

| Criterion | Evidence | Result |
|---|---|---|
| Both slides hold at 1280×720 and 1920×1080 with no internal scrollbar | Not measured — needs a browser at both sizes. Both slides are built from the shared kit's devices and set no type below the deck's existing sizes, which is an argument, not a measurement. | PENDING |
| Slide 1 carries no more than the six items and their evidence | Two groups, six items, one three-row mapping well, one note. No third column. | PASS |
| The two slides are speakable in about two minutes | Not timed. | PENDING |

## What is left for the author

1. **Re-check the three hooks paths** against Claude Code, Codex and Cursor
   documentation, then either confirm the July 2026 stamp or move it to August.
   This is criterion 5 and it is the only content claim on either slide that is
   carried forward rather than checked.
2. **Click through slides 23 → 26 in both languages**, plus the Setup chip from
   somewhere far away in the deck, watching the counter, the chapter highlight
   and the console. This closes criteria 2 and 9.
3. **Look at both slides at projector size.** Slide 1 is the denser of the two
   and is the one likely to want a cut if anything does.

When those are done, the three PENDING rows become results and this record goes
to `final`.

## Note on the July stamps elsewhere

The Build slides carry a July 2026 stamp on their own tool paths. This chapter
adds an August 2026 stamp for governance and loading behaviour. Two dates in
one deck is correct — they were checked on different days — and the spec
records bringing them level as a deferred follow-up rather than part of this
feature.
