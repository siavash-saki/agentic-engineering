---
feature: 0003-bad-effort
artifact: spec
version: 1
status: draft
updated: 2026-07-28
authoring_tool: claude-code
model: Opus 5 (1M context)
incomplete: fixture — exercises the provenance rule only
---

# Effort field missing

`reasoning_effort` is free text: the agent fills it with whatever it actually ran
at, and no list of allowed words is enforced. Free text is not optional text.
Leaving the field out means the artifact cannot say what wrote it, which is the
one question the three provenance fields exist to answer.

This fixture used to hold a value outside a closed enum. The enum is gone —
effort ladders are vendor vocabulary, and a convention meant to be copied into
other repos should not pin one vendor's as of one date. What still holds, and
what this fixture now exercises, is presence.

Expected: `[provenance] missing "reasoning_effort" (use "unknown" rather than a guess)`.
