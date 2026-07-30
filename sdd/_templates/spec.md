---
feature: NNNN-<feature-slug>
artifact: spec
version: 1
status: draft
updated: YYYY-MM-DD
authoring_tool: <tool>
model: <model>
reasoning_effort: <as the agent reports it, or unknown>
---

# <Feature name>

## Context

Why this exists. What is happening today that shouldn't be, or what is missing.
Enough for a reader who has never seen the codebase to understand the problem —
and no mechanism. If a sentence names a file, a function or a library, it
belongs in the plan.

## What

The behavior, described so that someone could recognise it working without
being told how it was built. Prefer the user's vocabulary over the system's.

## Acceptance criteria

Numbered, each one independently checkable. These are the yardstick for review
and the rows of the verification table — write them so that evidence is
obviously possible.

1. Given <situation>, when <action>, then <observable outcome>.
2. …

## Success criteria

The qualities that make it good rather than merely present — latency budgets,
error rates, "no false positives in the sample". Distinct from acceptance
criteria: these can be measured, but rarely by one test.

## Out of scope

What this feature deliberately does not do. The most valuable section in the
document, and the one most often skipped: it is what stops an agent from
helpfully building three adjacent things you did not ask for.

## Decisions

Choices settled in Discuss, with the reason in one line each. Written down so
the next reader does not re-open them.

## Open questions

What is still undecided, and what it blocks. "None blocking" is a valid and
common answer — write it explicitly rather than deleting the section.
