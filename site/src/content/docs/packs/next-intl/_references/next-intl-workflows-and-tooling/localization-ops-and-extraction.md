---
title: "Localization Operations and Extraction"
description: "Supporting reference for Next Intl Workflows and Tooling."
slug: "packs/next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction"
sidebar:
  hidden: true
---
> Pack: [`next-intl`](/packs/next-intl/)
> Parent skill: [Next Intl Workflows and Tooling](/packs/next-intl/next-intl-workflows-and-tooling/)
> Source: [`next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction.md`](https://github.com/andrewsrigom/agent-skills/blob/main/next-intl/next-intl-workflows-and-tooling/references/localization-ops-and-extraction.md)
## Read this when

- validating translation catalogs
- setting up translator workflows
- choosing Crowdin or another localization-management flow
- evaluating `useExtracted`

## Validation baseline

- Use `@lingual/i18n-check` to detect:
  - missing translations
  - inconsistent ICU arguments across locales
  - unused messages when `--unused` is enabled

## Localization management

- `next-intl` is format-agnostic, but the docs recommend Crowdin.
- Useful Crowdin integration modes include:
  - GitHub PR sync
  - CLI-based sync
  - JS SDK or webhook-driven flows
- Prefer workflows that keep translators out of application code while preserving reviewability.
- A minimal GitHub sync baseline is:

```yml
files:
  - source: /messages/en.json
    translation: /messages/%locale%.json
```

## `useExtracted`

- `useExtracted` extracts inline source strings during `next dev` and `next build`.
- `getExtracted()` is the async variant for Server Components, metadata, and Server Actions.
- `unstable_extractMessages(...)` is available for manual extraction, which is useful for component libraries or package workflows outside a running Next.js app.
- Extraction supports descriptions, explicit IDs, and namespaces in addition to generated keys.
- It can remove manual key management, which can be helpful in AI-heavy or design-system-heavy workflows.
- Keep it behind an explicit workflow choice because it remains experimental.
- Remember that auto-generated keys reduce translator context. Prefer metadata-rich formats like PO when context matters.

## Migration and release notes

- `next-intl` 4.x tightened TypeScript augmentation and locale typing.
- `requestLocale` is the current async request-config input and should be awaited.
- `createMessagesDeclaration` is not required when extraction is the primary workflow.
- `precompile` builds on the same message-loader pipeline and is incompatible with `t.raw`.
- Re-check blog release notes before encoding version-specific advice into long-lived skills.

## Source map

- `https://next-intl.dev/docs/workflows`
- `https://next-intl.dev/docs/workflows/messages`
- `https://next-intl.dev/docs/workflows/localization-management`
- `https://next-intl.dev/docs/usage/extraction`
- `https://next-intl.dev/blog/next-intl-4-0`
- `https://next-intl.dev/blog/use-extracted`
