---
name: setup-conventional-commits
description: Use when configuring a repo to enforce Conventional Commits locally without making commit flow annoying. Covers `commitlint`, Husky `commit-msg` hooks, minimal config choices, and the rule that semantic commits should improve history quality, not add ceremony.
---

# Setup Conventional Commits

Use this skill when the task is to enforce Conventional Commits in a repo with minimal friction.

## Scope

- `commitlint` setup
- Husky `commit-msg` hook setup
- local `commit-msg` enforcement
- choosing a minimal config
- keeping commit flow lightweight

## Routing cues

- enforce semantic commits, add commitlint, set up conventional commits, validate commit messages, or add a `commit-msg` hook -> use this skill
- if the task is about naming one specific commit well -> use `write-intentional-commit-message`
- if the task is mainly about broader pre-commit automation -> use `setup-pre-commit`

## Default path

1. Use Conventional Commits as the history format.
2. Use `@commitlint/cli` with `@commitlint/config-conventional`.
3. Prefer one small config file such as `commitlint.config.cjs`.
4. Add a `commit-msg` hook through Husky when the repo accepts local hook tooling.
5. Keep enforcement syntax-focused in tooling and intent-focused in docs or agent guidance.

## When to deviate

- Extend the default type rules only when the repo has a real semantic need, not just personal preference.
- Skip Husky if the repo deliberately avoids local Git hook tooling.
- Add prompts or commit generators only when the team explicitly wants them; do not make them the default.

## Guardrails

- keep the config minimal
- syntax enforcement should not pretend to solve poor commit intent by itself
- do not add `commitizen` or other interactive tooling unless the repo actually wants that ceremony
- `commit-msg` validation is the right hook for commit format; do not overload `pre-commit`

## Avoid

- introducing a large commit workflow stack for a small repo
- forcing interactive commit tooling when plain Git is enough
- adding extra enforcement layers when the local hook already solves the problem
- treating enforcement as complete when contributors still have no guidance on type selection

## Verification checklist

- the repo has one clear Conventional Commit policy
- commitlint config is minimal and readable
- `commit-msg` is used for message validation if local hooks are enabled
- contributors still have guidance on choosing the right type, not only passing syntax

## Quick example

```bash
npm install -D @commitlint/cli @commitlint/config-conventional husky
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.cjs
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm lines verified live on 2026-04-03: `@commitlint/cli@20.5.0`, `@commitlint/config-conventional@20.5.0`, `husky@9.1.7`
- Docs in scope: commitlint getting started, commitlint configuration, Husky get started, and Conventional Commits `1.0.0`

## Official references

- https://www.conventionalcommits.org/en/v1.0.0/
- https://commitlint.js.org/guides/getting-started.html
- https://commitlint.js.org/reference/configuration.html
- https://typicode.github.io/husky/get-started.html

## References

- [Opinionated enforcement defaults](./references/opinionated-enforcement-defaults.md)
