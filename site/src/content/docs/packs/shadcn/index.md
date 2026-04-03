---
title: "shadcn"
description: "5 skills in the shadcn pack."
sidebar:
  label: "Overview"
  order: 0
---
> Pack path: `shadcn/`

## Skills

- [shadcn CLI Registry And components.json](/packs/shadcn/shadcn-cli-registry-and-components-json/) — Use when initializing shadcn, managing `components.json`, adding components or blocks through the CLI, or deciding how registries and updates should work without losing local ownership. Covers CLI defaults, registry boundaries, aliases, CSS entrypoints, and safe update posture.
- [shadcn Composition And Trigger Patterns](/packs/shadcn/shadcn-composition-and-trigger-patterns/) — Use when composing shadcn components into real product surfaces instead of treating them like isolated snippets. Covers `asChild`, trigger ownership, dialog and dropdown composition, local wrappers, and the rule that the value is in stable composition patterns, not in blindly stacking primitives.
- [shadcn Forms And Field Primitives](/packs/shadcn/shadcn-forms-and-field-primitives/) — Use when building forms with shadcn in a way that stays opinionated instead of devolving into copied snippets. Covers field primitives, choosing one form-state strategy, integrating validation, and keeping complex stateful form logic out of the visual component layer.
- [shadcn Overview And Code Ownership](/packs/shadcn/shadcn-overview-and-code-ownership/) — Choose whether `shadcn/ui` is the right fit and adopt it with the right ownership model. Use when tasks mention shadcn setup, copying components into the app, owning UI source code, deciding between shadcn and a packaged component library, or routing work to theming, registry, composition, or forms follow-up skills.
- [shadcn Theming Tokens And Dark Mode](/packs/shadcn/shadcn-theming-tokens-and-dark-mode/) — Use when defining shadcn theme defaults that the model should not improvise per component. Covers CSS variables, semantic tokens, OKLCH-based palettes, dark mode, and the rule that visual consistency should come from tokens and composition instead of one-off utility overrides.
