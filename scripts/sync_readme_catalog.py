#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
README_PATH = REPO_ROOT / "README.md"

WORKFLOW_PACKS = {"engineering", "skilling"}
IGNORED_ROOT_DIRS = {
    ".git",
    ".github",
    ".internal",
    ".pytest_cache",
    "__pycache__",
    "dist",
    "scripts",
}

SUMMARY_MARKER_START = "<!-- catalog-summary:start -->"
SUMMARY_MARKER_END = "<!-- catalog-summary:end -->"
LIBRARY_MARKER_START = "<!-- library-packs:start -->"
LIBRARY_MARKER_END = "<!-- library-packs:end -->"
WORKFLOW_MARKER_START = "<!-- workflow-packs:start -->"
WORKFLOW_MARKER_END = "<!-- workflow-packs:end -->"


def find_skill_dirs(pack_dir: Path) -> list[Path]:
    return sorted(
        child for child in pack_dir.iterdir() if child.is_dir() and (child / "SKILL.md").is_file()
    )


def collect_packs() -> tuple[list[tuple[str, int]], list[tuple[str, int]]]:
    library_packs: list[tuple[str, int]] = []
    workflow_packs: list[tuple[str, int]] = []

    for child in sorted(REPO_ROOT.iterdir()):
        if not child.is_dir():
            continue
        if child.name in IGNORED_ROOT_DIRS:
            continue
        if child.name.startswith("."):
            continue

        skill_dirs = find_skill_dirs(child)
        if not skill_dirs:
            continue

        entry = (child.name, len(skill_dirs))
        if child.name in WORKFLOW_PACKS:
            workflow_packs.append(entry)
        else:
            library_packs.append(entry)

    return library_packs, workflow_packs


def format_summary(total_skills: int) -> str:
    return (
        f"{SUMMARY_MARKER_START}\n"
        f"Current catalog: {total_skills} skills across library packs and workflow packs.\n"
        f"{SUMMARY_MARKER_END}"
    )


def format_pack_block(entries: list[tuple[str, int]], start_marker: str, end_marker: str) -> str:
    lines = [start_marker]
    for pack_name, count in entries:
        suffix = "skill" if count == 1 else "skills"
        lines.append(f"- `{pack_name}` ({count} {suffix})")
    lines.append(end_marker)
    return "\n".join(lines)


def replace_block(text: str, start_marker: str, end_marker: str, replacement: str) -> str:
    start = text.find(start_marker)
    end = text.find(end_marker)
    if start == -1 or end == -1 or end < start:
        raise ValueError(f"Missing README markers: {start_marker} .. {end_marker}")
    end += len(end_marker)
    return text[:start] + replacement + text[end:]


def render_updated_readme(original: str) -> str:
    library_packs, workflow_packs = collect_packs()
    total_skills = sum(count for _, count in library_packs + workflow_packs)

    updated = original
    updated = replace_block(
        updated,
        SUMMARY_MARKER_START,
        SUMMARY_MARKER_END,
        format_summary(total_skills),
    )
    updated = replace_block(
        updated,
        LIBRARY_MARKER_START,
        LIBRARY_MARKER_END,
        format_pack_block(library_packs, LIBRARY_MARKER_START, LIBRARY_MARKER_END),
    )
    updated = replace_block(
        updated,
        WORKFLOW_MARKER_START,
        WORKFLOW_MARKER_END,
        format_pack_block(workflow_packs, WORKFLOW_MARKER_START, WORKFLOW_MARKER_END),
    )
    return updated


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    original = README_PATH.read_text()
    updated = render_updated_readme(original)

    if args.check:
        if original != updated:
            print("README catalog is out of sync. Run: python3 scripts/sync_readme_catalog.py")
            return 1
        print("README catalog is in sync.")
        return 0

    README_PATH.write_text(updated)
    print("README catalog updated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
