---
title: "Composition Defaults And Wrapper Boundaries"
description: "Supporting reference for shadcn Composition And Trigger Patterns."
slug: "packs/shadcn/shadcn-composition-and-trigger-patterns/references/composition-defaults-and-wrapper-boundaries"
sidebar:
  hidden: true
---
> Pack: [`shadcn`](/packs/shadcn/)
> Parent skill: [shadcn Composition And Trigger Patterns](/packs/shadcn/shadcn-composition-and-trigger-patterns/)
> Source: [`shadcn/shadcn-composition-and-trigger-patterns/references/composition-defaults-and-wrapper-boundaries.md`](https://github.com/andrewsrigom/agent-skills/blob/main/shadcn/shadcn-composition-and-trigger-patterns/references/composition-defaults-and-wrapper-boundaries.md)
Default composition posture:

- use copied primitives directly first
- compose locally
- extract wrappers only after the pattern repeats

Good reasons for a wrapper:

- repeated semantic contract
- repeated interaction wiring
- repeated analytics or telemetry hooks
- repeated accessibility glue that should not be duplicated

Bad reasons for a wrapper:

- “we might need flexibility later”
- hiding a simple primitive behind a prop-heavy façade
- copying an example into a generic abstraction before the usage pattern is stable

`asChild` default:

- use it when you need to preserve the child element contract
- do not use it mechanically everywhere
- verify semantics, focus behavior, and click target behavior afterward
