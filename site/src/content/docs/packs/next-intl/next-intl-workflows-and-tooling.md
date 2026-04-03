---
title: "Next Intl Workflows and Tooling"
description: "Set up next-intl tooling and durable localization workflows for Next.js. Use when tasks mention createNextIntlPlugin, TypeScript augmentation, createMessagesDeclaration, useExtracted, getExtracted, precompile, message loading strategies, missing-message handling, Crowdin, or next-intl migration and upgrade decisions."
---
> Pack: [`next-intl`](/packs/next-intl/)
> Source: [`next-intl/next-intl-workflows-and-tooling/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/next-intl/next-intl-workflows-and-tooling/SKILL.md)
Use this skill when the task is about durable setup, typing, validation, translation operations, or experimental tooling.

## Scope

- `createNextIntlPlugin` and request-config discovery
- TypeScript augmentation
- plugin experimental options like `createMessagesDeclaration`, `extract`, `messages`, `srcPath`, and `precompile`
- message loading strategy decisions
- missing-message handling
- validation and localization operations
- `useExtracted`, `getExtracted`, and extraction-related tradeoffs

## Routing cues

- plugin setup, `AppConfig`, typed locales/messages/formats, Crowdin, extraction, validation -> use this skill
- routing rules, pathnames, domains, locale switchers -> use `next-intl-routing-and-navigation`
- message authoring, ICU, rich text, formatter APIs -> use `next-intl-messages-and-formatting`
- `getRequestConfig`, metadata, error files, tests -> use `next-intl-server-runtime`

## Default path

1. Read [references/plugin-types-and-loading.md](/packs/next-intl/next-intl-workflows-and-tooling/references/plugin-types-and-loading/) first.
2. If the task touches translation operations or extraction, read [references/localization-ops-and-extraction.md](/packs/next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction/).
3. Treat plugin setup and `AppConfig` augmentation as baseline correctness work, not optional polish.
4. Choose the simplest message-loading model that preserves type safety and operational clarity.

## When to deviate

- Use extraction tooling only when the repo’s translation workflow genuinely benefits from it.
- Enable `precompile` only when the performance gain is worth the tradeoffs.
- Keep repo-local message files unless an external translation system is clearly justified.

## Guardrails

- Keep `createNextIntlPlugin()` in sync with the real `requestConfig` path.
- Prefer typed `Locale`, `Messages`, and `Formats` augmentation.
- `createMessagesDeclaration` needs a representative messages file and TypeScript support for arbitrary extensions.
- Keep repo-local message files as the default message source unless an external system is clearly justified.
- Use `onError` and `getMessageFallback` deliberately instead of tolerating silent missing-message behavior.
- Configure `extract` together with `messages` and `srcPath`, not in isolation.
- Treat `precompile` as a performance optimization with tradeoffs. It is incompatible with `t.raw`.
- Do not assume `createMessagesDeclaration` is needed when `useExtracted` is the chosen workflow.
- Treat `useExtracted` as experimental and note its translator-context tradeoffs.

## Avoid

- letting plugin config drift from the real request-config path
- treating extraction or precompile as default choices
- tolerating silent missing-message behavior by accident
- mixing repo-local and external message sources without an operational model

## Verification checklist

- plugin setup matches the real request config
- AppConfig augmentation is explicit and useful
- message-loading strategy is the simplest one that still preserves typing
- extraction or precompile are opt-in and justified
- missing-message behavior is handled deliberately

## Canonical APIs and tools

- `createNextIntlPlugin`
- `createMessagesDeclaration`
- `useExtracted`
- `getExtracted`
- `unstable_extractMessages`
- `defineCodec`
- `@lingual/i18n-check`

## Maintenance

- Snapshot date: 2026-03-10
- Package snapshot: `next-intl@4.8.3` published 2026-02-16

## References

- [references/plugin-types-and-loading.md](/packs/next-intl/next-intl-workflows-and-tooling/references/plugin-types-and-loading/)
- [references/localization-ops-and-extraction.md](/packs/next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction/)
## References

- [Localization Operations and Extraction](/packs/next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction/)
- [Plugin, Types, and Message Loading](/packs/next-intl/next-intl-workflows-and-tooling/references/plugin-types-and-loading/)
