#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import re
import subprocess
import sys

import yaml


REPO_ROOT = Path(__file__).resolve().parent.parent
SKILL_PATTERN = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
IGNORED_ROOT_DIRS = {
    ".git",
    ".github",
    ".internal",
    ".pytest_cache",
    "__pycache__",
    "dist",
    "scripts",
}


def iter_skill_dirs() -> list[Path]:
    skill_dirs: list[Path] = []
    for pack_dir in sorted(REPO_ROOT.iterdir()):
        if not pack_dir.is_dir():
            continue
        if pack_dir.name in IGNORED_ROOT_DIRS:
            continue
        if pack_dir.name.startswith("."):
            continue
        for child in sorted(pack_dir.iterdir()):
            if child.is_dir() and (child / "SKILL.md").is_file():
                skill_dirs.append(child)
    return skill_dirs


def parse_frontmatter(skill_path: Path) -> dict[str, object]:
    text = skill_path.read_text()
    match = SKILL_PATTERN.match(text)
    if not match:
        raise ValueError(f"{skill_path}: missing YAML frontmatter")
    data = yaml.safe_load(match.group(1)) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{skill_path}: invalid frontmatter shape")
    return data


def validate_skill(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_path = skill_dir / "SKILL.md"

    try:
        frontmatter = parse_frontmatter(skill_path)
    except Exception as exc:
        return [str(exc)]

    name = frontmatter.get("name")
    description = frontmatter.get("description")

    if not isinstance(name, str) or not name.strip():
        errors.append(f"{skill_path}: missing non-empty 'name'")
    elif name != skill_dir.name:
        errors.append(f"{skill_path}: frontmatter name '{name}' does not match folder '{skill_dir.name}'")

    if not isinstance(description, str) or not description.strip():
        errors.append(f"{skill_path}: missing non-empty 'description'")

    return errors


def run_git_diff_check() -> list[str]:
    result = subprocess.run(
        ["git", "-C", str(REPO_ROOT), "diff", "--check"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        return [result.stdout.strip() or result.stderr.strip() or "git diff --check failed"]
    return []


def run_readme_check() -> list[str]:
    result = subprocess.run(
        [sys.executable, str(REPO_ROOT / "scripts" / "sync_readme_catalog.py"), "--check"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        return [result.stdout.strip() or result.stderr.strip() or "README catalog check failed"]
    return []


def main() -> int:
    errors: list[str] = []
    skill_dirs = iter_skill_dirs()

    if not skill_dirs:
        errors.append("No installable skills found.")

    for skill_dir in skill_dirs:
        errors.extend(validate_skill(skill_dir))

    errors.extend(run_readme_check())
    errors.extend(run_git_diff_check())

    if errors:
        for error in errors:
            print(error)
        return 1

    print(f"Validated {len(skill_dirs)} skills.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
