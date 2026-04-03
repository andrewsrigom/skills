---
title: "Default Type Selection Matrix"
description: "Supporting reference for Write Intentional Commit Message."
slug: "packs/engineering/write-intentional-commit-message/references/default-type-selection-matrix"
sidebar:
  hidden: true
---
> Pack: [`engineering`](/packs/engineering/)
> Parent skill: [Write Intentional Commit Message](/packs/engineering/write-intentional-commit-message/)
> Source: [`engineering/write-intentional-commit-message/references/default-type-selection-matrix.md`](https://github.com/andrewsrigom/agent-skills/blob/main/engineering/write-intentional-commit-message/references/default-type-selection-matrix.md)
Choose type by effect, not by file type.

Default mapping:

- `feat`: adds a new capability
- `fix`: corrects broken behavior
- `refactor`: changes structure or direction without adding a net-new capability
- `docs`: documentation-only change
- `chore`: tooling, maintenance, CI, automation, or housekeeping
- `test`: adds or changes tests without changing product behavior

Common mistakes:

- using `docs` because README changed, even though the real change is architectural
- using `chore` because the diff is big
- using `feat` for a refactor that only reorganizes existing behavior

Commit splitting rule:

- one commit should tell one coherent story
- if the message needs `and`, the commit may be too broad

Amend rule:

- amend when the new changes still serve the same original intent
- make a new commit when the intent changed
