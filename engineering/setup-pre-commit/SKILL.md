---
name: setup-pre-commit
description: Use when setting up pre-commit automation in a JavaScript or TypeScript repo. Covers Husky, lint-staged, formatter setup, package-manager-aware hook commands, and keeping commit-time checks realistic.
---

# Setup Pre-Commit

Use this skill when the user wants commit-time checks without overloading the hook.

## Scope

- Husky setup
- lint-staged configuration
- Prettier or existing formatter integration
- package-manager-aware hook commands
- choosing what belongs in pre-commit versus CI

## Default path

1. Detect the package manager and current scripts.
2. Install the minimum hook dependencies.
3. Initialize Husky if the repo does not already use it.
4. Configure `lint-staged` for staged-file formatting or linting.
5. Keep the pre-commit hook fast:
   - staged formatting or linting first
   - lightweight checks second
   - heavy suites in CI unless the repo explicitly wants them locally
6. Verify the hook against the current scripts instead of inventing missing commands.

## When to deviate

- Keep the hook even smaller when the repo already struggles with slow local tooling.
- Add more checks only if the repo already runs them reliably and the team explicitly wants them before commit.
- Skip formatter or lint changes if the repo already has a working hook stack that only needs a small fix.

## Guardrails

- Do not add `typecheck` or `test` to the hook if the repo does not already support them cleanly.
- Prefer staged-file checks over whole-repo checks in pre-commit.
- Keep the hook deterministic and package-manager-aware.
- Do not introduce a formatter config if the repo already has one.

## Avoid

- turning pre-commit into a slow mini-CI pipeline
- inventing scripts the repo does not actually have
- running whole-repo checks when staged-file checks are enough
- overwriting an existing formatter setup without reason

## Verification checklist

- the package manager and current scripts were detected first
- hook commands are fast enough for normal commit flow
- checks operate on staged files where possible
- CI-only work stays out of pre-commit unless explicitly desired
- the hook matches the repo's real tooling, not imagined tooling

## Output Shape

When answering with this skill, prefer:

- packages to install
- files to create or update
- exact hook content
- what should stay in CI instead

## Good Triggers

- pre-commit, Husky, lint-staged, commit hooks, run formatter on commit
