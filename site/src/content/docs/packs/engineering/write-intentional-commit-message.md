---
title: "Write Intentional Commit Message"
description: "Use when writing or reviewing a commit message and the real challenge is choosing the correct Conventional Commit type, scope, and summary based on change intent. Covers commit splitting, amend vs new commit decisions, and avoiding vague or misleading commit titles."
---
> Pack: [`engineering`](/packs/engineering/)
> Source: [`engineering/write-intentional-commit-message/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/engineering/write-intentional-commit-message/SKILL.md)
Use this skill when the task is to name a commit well, not merely make it parse.

## Scope

- choosing the right Conventional Commit type
- deciding whether the work should be one commit or several
- writing concise summaries with real intent
- deciding when to amend instead of adding another commit
- avoiding vague commit titles that hide the actual change

## Routing cues

- write this commit message, pick the right conventional commit type, rename this commit, split this work into commits, amend or new commit, or review whether a commit title is misleading -> use this skill
- if the task is about installing commit hooks or enforcing commit syntax in a repo -> use `setup-conventional-commits`

## Default path

1. Read the diff or change summary first.
2. Describe the effect of the change in one sentence.
3. Choose the type by the effect:
   - `feat` for a new user-facing or developer-facing capability
   - `fix` for a bug fix
   - `refactor` for structural change without a net-new capability
   - `docs` for documentation-only change
   - `chore` for tooling, CI, or maintenance work
4. Add a scope only if it makes the message clearer.
5. Keep the summary short, specific, and action-oriented.
6. If the diff contains multiple unrelated effects, split the commit instead of forcing one misleading title.

## When to deviate

- Use a broader type only when the repo has an explicit convention that differs from the default mapping.
- Skip scope if it adds noise or duplicates the summary.
- Keep one larger commit only when the subchanges are tightly coupled and separating them would reduce clarity.
- Amend instead of adding a follow-up commit when the new changes are still part of the same original intent.

## Guardrails

- choose the type by what changed in behavior or capability, not by which files were touched
- the summary should name the real change, not the activity used to produce it
- avoid one-word summaries like `cleanup` or `updates`
- if the commit message feels generic, the commit is probably too broad or the summary is too weak

## Avoid

- defaulting to `chore:` for anything hard to classify
- using `docs:` just because the diff includes markdown when the real change is structural or behavioral
- writing a single commit for several unrelated changes
- treating Conventional Commits as a syntax exercise instead of a history-quality tool

## Verification checklist

- the type matches the actual effect of the change
- the summary is specific enough to stand alone in `git log`
- scope, if present, adds clarity
- the commit is not hiding multiple unrelated changes
- amend vs new commit was chosen intentionally

## Quick example

Good:

- `feat: add playwright pack for stable end-to-end defaults`
- `refactor: remove tanstack packs and align catalog with active stack`
- `docs: clarify opinionated scope in README`

Weak:

- `chore: update repo`
- `docs: changes`
- `refactor: stuff`

## Current snapshot

- Checked against official Conventional Commits spec on 2026-04-03
- Spec in scope: Conventional Commits `1.0.0`
- This skill assumes the widely used extended type set common in commitlint and Angular-style conventions

## Official references

- https://www.conventionalcommits.org/en/v1.0.0/
- https://commitlint.js.org/reference/configuration.html

## References

- [Default type selection matrix](/packs/engineering/write-intentional-commit-message/references/default-type-selection-matrix/)
## References

- [Default Type Selection Matrix](/packs/engineering/write-intentional-commit-message/references/default-type-selection-matrix/)
