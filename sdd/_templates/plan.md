---
feature: NNNN-<feature-slug>
artifact: plan
version: 1
status: draft
updated: YYYY-MM-DD
authoring_tool: <tool>
model: <model>
reasoning_effort: <as the agent reports it, or unknown>
---

# Plan — <Feature name>

## Approach

How this gets built, and — more importantly — *why this way*. Name the design
decision that carries the most weight and the alternative it beat. This is where
the spec's open questions get their answers.

Still no code and no function names. "A sliding-window counter per token, held
in the cache layer, in front of the router" is the right altitude.

## Sequence

The order of construction and the reason for it — usually dependency, sometimes
risk-first (build the part most likely to be wrong before the parts that assume
it).

1. …
2. …

## Risks

What could make this go badly, and the mitigation for each. One line per risk;
a risk without a mitigation is an open question that belongs back in the spec.

- **<Risk>** — <consequence>. Mitigation: <what makes it survivable>.

## Areas touched

The files, modules or surfaces this will change. A rough list is fine; its job
is to make the blast radius visible before anyone starts, and to let review
notice when the change went somewhere unplanned.
