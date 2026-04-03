---
name: next-intl-messages-and-formatting
description: Author and consume next-intl messages with ICU, rich text, typed arguments, validation, and Intl formatting across Next.js components. Use when tasks mention useTranslations, useFormatter, message catalogs, t.rich, t.markup, numbers, dates, lists, relative time, message validation, or extracted messages.
---

# Next Intl Messages and Formatting

Use this skill when the task is about message authoring, translation consumption, or locale-aware formatting behavior.

## Scope

- message catalog structure and namespace strategy
- ICU authoring patterns
- `useTranslations`, `t.rich`, `t.markup`, `t.raw`, `t.has`
- `useFormatter` and named formats
- typed ICU arguments and message validation
- `useExtracted` as an optional workflow

## Routing cues

- message JSON structure, namespace design, ICU, rich text, formatting, validation -> use this skill
- `defineRouting`, locale switchers, domains, pathnames -> use `next-intl-routing-and-navigation`
- `getTranslations` in metadata, `setRequestLocale`, testing, error files -> use `next-intl-server-runtime`
- plugin flags, TypeScript augmentation, Crowdin, loading strategy -> use `next-intl-workflows-and-tooling`

## Default path

1. Read [references/icu-rich-text-and-catalogs.md](./references/icu-rich-text-and-catalogs.md) first.
2. If the task touches formats, validation, or extracted messages, read [references/formatting-validation-and-types.md](./references/formatting-validation-and-types.md).
3. Keep namespaces close to the component boundary and choose the lowest stable common branch.
4. Move language logic into ICU messages instead of branching in application code.

## When to deviate

- Use server-side translation APIs only for the documented server exceptions.
- Reach for `t.markup` only when the output must stay string-based rather than React-node based.
- Treat `useExtracted` as opt-in workflow tooling, not the baseline message authoring model.

## Guardrails

- Keep catalogs as nested objects. Do not use `.` inside message keys.
- Prefer consuming translations from components. Use server awaitables only for the official server-side exceptions.
- Do not call `useTranslations` or `useFormatter` in `async` components.
- Use `t.rich(...)` for translatable markup. Avoid surrounding sentence fragments with hardcoded JSX.
- Use `t.markup(...)` when tags should compile to strings, not React nodes.
- Use `format.list(...)` for locale-aware lists instead of joining strings manually.
- Treat `useExtracted` as experimental, not as the default baseline.

## Avoid

- putting `.` inside message keys
- calling translation hooks inside `async` components
- branching language logic in app code when ICU can own it
- treating experimental extraction as the default message path

## Verification checklist

- namespaces are stable and close to the component boundary
- ICU handles language branching where appropriate
- the chosen formatting API matches the output type needed
- server exceptions are handled with the correct server-side APIs
- message authoring stays compatible with validation and typing strategy

## Canonical APIs

- `useTranslations`
- `useFormatter`
- `t.rich`
- `t.markup`
- `t.raw`
- `t.has`

## Maintenance

- Snapshot date: 2026-03-10
- Package snapshot: `next-intl@4.8.3` published 2026-02-16

## References

- [references/icu-rich-text-and-catalogs.md](./references/icu-rich-text-and-catalogs.md)
- [references/formatting-validation-and-types.md](./references/formatting-validation-and-types.md)
