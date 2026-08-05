---
feature: 0001-setup-chapter
artifact: spec
version: 1
status: approved
updated: 2026-08-05
authoring_tool: claude-code
model: Opus 5 (1M context)
reasoning_effort: xhigh
fast_path: true
---

# Setup — the chapter that names what the agent is given

## Context

The deck draws its dividing line on the third slide. In the row headed *Context
and tools*, vibe coding gets "whatever the system happens to reach on its own"
and agentic engineering gets "Memory, Skills, MCP, subagents, hooks". Three of
those five are then taught, inside the Build chapter. Subagents and hooks are
named on that slide and never appear again — the only other occurrence of either
word in the whole deck is the German translation of the same row.

So the deck asserts that deliberate tooling is what separates the two ways of
working, and then does not show a listener two of the things it named. A claim
made and not paid off is the one kind of gap this deck cannot afford, because
its argument is that the difference is real and checkable.

There is a second problem underneath the first. These things are not a Build
topic. The independent reviewer the deck recommends is a subagent. The reading
pass that opens Plan is a subagent. Hooks are policy across all three steps.
Filing the set under Build is what left two of them with nowhere to live.

The previous version of this talk had them as their own chapter and the audience
response to that framing is the reason this feature exists. What it should not
inherit is that version's form: six cards each carrying five tool-specific file
paths, thirty paths across two slides, unreadable past the third row and the
fastest-rotting content in the deck.

Since that version was written the ground has moved in a way that supplies a
better organising idea than a path table. Three of these things are now open
standards with neutral governance and one spelling everywhere; the rest are
conventions every tool copied and no two spell alike. That split is the slide,
it is checkable, and it argues the deck's existing thesis — that the method
outlives the tool — better than a mapping ever did.

## What

A chapter of two slides, placed after the last Review slide and before the slide
about how much of the method to apply. It carries a chapter chip and a keyboard
shortcut like every other chapter.

**The first slide** puts the whole set on one page, split by whether it is
portable. Five things the agent is given — a memory file, procedures it loads on
demand, connected systems, deterministic event handlers, and fresh contexts with
narrower jobs — and one way to ship a bundle of them. Three of the five are open
standards, named with who governs them. Two are not, and the slide shows that
divergence rather than asserting it. It also points back to where the talk has
already used them, so the set reads as the underside of the loop the audience
has just walked, not as a new topic.

**The second slide** answers the question the first one raises: what does having
these actually cost. It shows when each thing enters the model's context —
always, on use, or in a context of its own — and marks which of them are paid
for on every single request. This is the slide that makes the set an engineering
decision rather than a feature list.

Nothing else in the deck changes except its slide count, its chapter list, and
whatever wording elsewhere is made false by the addition.

## Acceptance criteria

1. Given the deck at the last Review slide, when the viewer advances, then a
   two-slide chapter appears before the slide about how much of the method to
   apply, and advancing past it reaches that slide.
2. Given any slide in the deck, when the viewer clicks the new chapter's chip or
   presses its keyboard shortcut, then the first of the two slides mounts; and
   the shortcut collides with no existing one.
3. Given the first slide, then all six items are present and visibly separated
   into the portable and the tool-specific, and each of the three portable ones
   names the body that governs it.
4. Given the first slide, then at least three of the items are tied back to a
   place earlier in the talk where the audience already met them.
5. Given the first slide, then the tool-specific claim carries its own evidence:
   one concept shown spelled differently across at least three tools, each of
   those tools already named elsewhere in the deck, and each spelling checked
   against that tool's official documentation on the day the slide lands.
6. Given the second slide, then each of the five loadable items appears exactly
   once under when it enters context — at session start, on use, or separately —
   and the ones charged on every request are marked as such.
7. Given the third slide's *Context and tools* row, then every item it names is
   explained somewhere in the deck.
8. Given the deck in German, then both new slides carry the same content as the
   English, with no English left in them and no untranslated item.
9. Given a click-through of the whole deck in both languages, then the slide
   counter, the chapter highlight and the deep links are correct on every slide,
   and the browser console is clean.
10. Given any claim on either slide that could be false in six months — a
    governance body, an adoption count, a file path — then the slide carries the
    date it was checked.
11. Given the repository, when the artifact lint runs, then it passes.

## Success criteria

- Both slides hold at 1280×720 and 1920×1080 without an internal scrollbar and
  without type below the deck's existing floor. A conference room reads the
  back row or the slide has failed.
- The first slide carries no more than the six items and their evidence. If it
  needs a third column to fit, it is doing the previous version's job again.
- The two slides together are speakable in about two minutes. They are a
  chapter, not a chapter break.

## Out of scope

- **Deep-dive slides for hooks or subagents.** They are named, placed and shown
  in the context picture. They do not each get a slide; that is what turned the
  previous version into reference material.
- **Per-tool path tables for memory, skills and MCP.** Those three already have
  their mappings on the Build slides, and for these three the point is now that
  the spelling is the same everywhere.
- **Re-verifying the July 2026 stamps on the existing Build slides.** They are
  separate claims made on a separate date and stand or fall on their own. Worth
  doing; not this feature.
- **Any change to the Plan or Review chapters**, to the SDD chapter, or to the
  adoption kit.
- **Membership counts for any governing body.** See the decisions below.

## Decisions

- **Six items, grouped as five plus one.** Memory, skills, MCP, hooks and
  subagents are things the agent is given. Plugins are how a team ships a bundle
  of the other five — a distribution mechanism, not a peer. Presenting it as a
  sixth peer would be tidy and slightly false, and it would leave the second
  slide unable to say when a plugin loads, because it does not load.
- **The organising split is portable versus tool-specific**, not a feature list.
  It is the honest state of the ecosystem, it dates well because it carries its
  date, and it is the deck's own thesis restated in a place the audience can
  check.
- **Placed after Review, before the dial.** The audience has walked the loop
  three times by then and has felt where the seams are. Front-loading
  configuration before the need is what makes a talk feel like documentation.
- **Called "Setup".** Reads the same in both languages, and does not claim to be
  a term of art. "Primitives" is contested — one vendor uses it for a different,
  vendor-specific set — and "context engineering" is jargon for a room.
- **Only tools the deck already names appear in the mapping.** The deck settled
  on a small set on the Build slides; a new slide that suddenly names five is
  inconsistent and multiplies what has to be re-verified every time the talk is
  given.
- **No membership or adoption count that has to be counted.** The governing
  bodies and the named platinum members make the point and stay true; a number
  rots between rehearsal and stage, and the one available for the foundation
  could not be confirmed against a primary source.
- **Fast path taken: spec and verification, no plan or tasks.** Granted at the
  spec gate. The surface is named and bounded, and the plan would restate this
  document. It strains one of the three conditions — the work is two or three
  commits rather than one — and that is recorded here rather than smoothed over.

## Open questions

None blocking. One follow-up, deliberately deferred: the Build slides' tool
paths carry a July 2026 stamp and this chapter will carry a fresh one, which
puts two dates in one deck. That is correct — they were checked on different
days — but it is worth a pass to bring them level before the talk is given.
