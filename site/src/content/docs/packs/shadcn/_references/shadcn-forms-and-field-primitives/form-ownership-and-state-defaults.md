---
title: "Form Ownership And State Defaults"
description: "Supporting reference for shadcn Forms And Field Primitives."
slug: "packs/shadcn/shadcn-forms-and-field-primitives/references/form-ownership-and-state-defaults"
sidebar:
  hidden: true
---
> Pack: [`shadcn`](/packs/shadcn/)
> Parent skill: [shadcn Forms And Field Primitives](/packs/shadcn/shadcn-forms-and-field-primitives/)
> Source: [`shadcn/shadcn-forms-and-field-primitives/references/form-ownership-and-state-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/shadcn/shadcn-forms-and-field-primitives/references/form-ownership-and-state-defaults.md)
Default form posture:

1. choose one form-state strategy
2. keep field presentation separate from validation rules
3. keep submission logic outside the field component layer
4. extract wrappers only when repeated field structure is obvious

Good default split:

- form-state library owns value, touched state, validation lifecycle, and submission orchestration
- shadcn field layer owns labels, descriptions, layout, and visual error presentation

Escalate to a richer form-state layer when:

- state orchestration is the hard part
- async reactivity is central
- the feature has large dynamic field behavior
