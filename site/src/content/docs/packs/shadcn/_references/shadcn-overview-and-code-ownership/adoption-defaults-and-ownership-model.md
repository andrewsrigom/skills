---
title: "Adoption Defaults And Ownership Model"
description: "Supporting reference for shadcn Overview And Code Ownership."
slug: "packs/shadcn/shadcn-overview-and-code-ownership/references/adoption-defaults-and-ownership-model"
sidebar:
  hidden: true
---
> Pack: [`shadcn`](/packs/shadcn/)
> Parent skill: [shadcn Overview And Code Ownership](/packs/shadcn/shadcn-overview-and-code-ownership/)
> Source: [`shadcn/shadcn-overview-and-code-ownership/references/adoption-defaults-and-ownership-model.md`](https://github.com/andrewsrigom/agent-skills/blob/main/shadcn/shadcn-overview-and-code-ownership/references/adoption-defaults-and-ownership-model.md)
Default shadcn posture:

- use the CLI to add code into the app
- own that code locally
- customize where needed
- extract shared wrappers only after patterns stabilize

Good fit:

- product teams that want direct control over UI code
- apps that need steady customization
- teams already comfortable editing React and Tailwind code

Bad fit:

- teams that want a sealed dependency with minimal local ownership
- codebases that do not want component source files checked in

Default rollout:

1. initialize once
2. set theme tokens and dark-mode strategy
3. add a few core primitives
4. customize locally
5. extract app-specific wrappers only when repetition is obvious
