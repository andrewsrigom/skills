---
title: "Opinionated Enforcement Defaults"
description: "Supporting reference for Setup Conventional Commits."
slug: "packs/engineering/setup-conventional-commits/references/opinionated-enforcement-defaults"
sidebar:
  hidden: true
---
> Pack: [`engineering`](/packs/engineering/)
> Parent skill: [Setup Conventional Commits](/packs/engineering/setup-conventional-commits/)
> Source: [`engineering/setup-conventional-commits/references/opinionated-enforcement-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/engineering/setup-conventional-commits/references/opinionated-enforcement-defaults.md)
Default stack:

- Conventional Commits
- `commitlint`
- Husky `commit-msg` hook only if the repo wants local hooks

Not default:

- `commitizen`
- large interactive commit flows
- heavy pre-commit enforcement for commit syntax

Minimal config:

1. install `@commitlint/cli`
2. install `@commitlint/config-conventional`
3. add `commitlint.config.cjs`
4. add a `commit-msg` hook

Why this default:

- low maintenance
- low friction
- widely understood
- easy to port to new repos

What tooling does not solve:

- choosing the right type
- splitting broad commits
- writing a summary with real intent

That part still needs repo policy or workflow guidance.
