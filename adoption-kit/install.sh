#!/usr/bin/env bash
# Install the SDD adoption kit into a repo.
#
#   ./install.sh <target-repo> [--dry-run]
#
# It never overwrites and never deletes. Every file is written only if absent;
# anything already there is reported and left alone. Running it twice is inert.
# That is deliberate: a tool that rewrites your AGENTS.md the second time you
# run it is a tool nobody runs once.
#
# It also does nothing you could not do by hand — the kit's layout is the layout
# it produces, so `cp -r` works just as well if you would rather look first.
set -euo pipefail

KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-}"
DRY=""
[[ "${2:-}" == "--dry-run" ]] && DRY=1

if [[ -z "$TARGET" ]]; then
  echo "usage: ./install.sh <target-repo> [--dry-run]" >&2
  exit 2
fi
if [[ ! -d "$TARGET" ]]; then
  echo "not a directory: $TARGET" >&2
  exit 2
fi
TARGET="$(cd "$TARGET" && pwd)"

if [[ "$TARGET" == "$KIT" ]]; then
  echo "target is the kit itself — pick the repo you want to adopt it in" >&2
  exit 2
fi

placed=0
skipped=0

place() { # place <source> <relative-destination>
  local src="$1" rel="$2" dst="$TARGET/$2"
  if [[ -e "$dst" || -L "$dst" ]]; then
    echo "  skip   $rel (already exists)"
    skipped=$((skipped + 1))
    return
  fi
  if [[ -z "$DRY" ]]; then
    mkdir -p "$(dirname "$dst")"
    cp "$src" "$dst"
  fi
  echo "  write  $rel"
  placed=$((placed + 1))
}

link() { # link <relative-link-name> <relative-target>
  local rel="$1" to="$2" dst="$TARGET/$1"
  if [[ -e "$dst" || -L "$dst" ]]; then
    echo "  skip   $rel (already exists)"
    skipped=$((skipped + 1))
    return
  fi
  [[ -z "$DRY" ]] && ln -s "$to" "$dst"
  echo "  link   $rel -> $to"
  placed=$((placed + 1))
}

echo "Installing the SDD adoption kit into $TARGET${DRY:+  (dry run)}"
echo

echo "Memory — one file, every tool reads the same bytes:"
place "$KIT/AGENTS.md" "AGENTS.md"
link  "CLAUDE.md" "AGENTS.md"
echo

echo "Artifacts — the convention and the templates:"
place "$KIT/sdd/README.md" "sdd/README.md"
for f in "$KIT"/sdd/_templates/*.md; do
  place "$f" "sdd/_templates/$(basename "$f")"
done
echo

echo "Commands — one per phase (Claude Code reference implementation):"
for f in "$KIT"/.claude/commands/*.md; do
  place "$f" ".claude/commands/$(basename "$f")"
done
echo

echo "Check — dependency-free, run it before every review:"
place "$KIT/scripts/lint-artifacts.mjs" "scripts/lint-artifacts.mjs"
echo

echo "$placed written, $skipped skipped.${DRY:+  Nothing was actually changed.}"
cat <<'NEXT'

Next:
  1. Open AGENTS.md and fill the top three sections — what this project is,
     the build/test commands, the conventions you actually enforce. Everything
     below "How we work" is the method; leave it.
  2. Run  node scripts/lint-artifacts.mjs  — it will report zero features, which
     is correct until you write one.
  3. Start your first feature:  /sdd-spec <what you want to build>

The gates are yours. The kit does not cross them.
NEXT
