---
feature: 0001-well-formed
artifact: plan
version: 1
status: approved
updated: 2026-07-28
authoring_tool: claude-code
model: Opus 5 (1M context)
reasoning_effort: High
---

# Plan — Well-formed fixture

## Approach

Hold every rule the lint enforces, so a regression in the lint shows up as a
false failure here rather than as silence.

## Sequence

1. Write the four artifacts.

## Risks

- **The fixture drifts from the rules** — it stops proving anything. Mitigation:
  it is run in the same command as the broken fixtures.

## Areas touched

`fixtures/clean/`.
