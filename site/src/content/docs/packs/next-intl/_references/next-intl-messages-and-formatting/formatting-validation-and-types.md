---
title: "Formatting, Validation, and Types"
description: "Supporting reference for Next Intl Messages and Formatting."
slug: "packs/next-intl/next-intl-messages-and-formatting/references/formatting-validation-and-types"
sidebar:
  hidden: true
---
> Pack: [`next-intl`](/packs/next-intl/)
> Parent skill: [Next Intl Messages and Formatting](/packs/next-intl/next-intl-messages-and-formatting/)
> Source: [`next-intl/next-intl-messages-and-formatting/references/formatting-validation-and-types.md`](https://github.com/andrewsrigom/agent-skills/blob/main/next-intl/next-intl-messages-and-formatting/references/formatting-validation-and-types.md)
## Read this when

- formatting numbers, dates, ranges, lists, or relative time
- defining reusable named formats
- adding typed message arguments or validating locale catalogs
- evaluating `useExtracted`

## Formatter surface

Use `useFormatter()` for values that are not naturally embedded in a sentence.

- `format.dateTime(...)`
- `format.dateTimeRange(...)`
- `format.relativeTime(...)`
- `format.number(...)`
- `format.list(...)`

## Shared formats

- Define named formats in request config or `NextIntlClientProvider`.
- Reuse the same named formats in formatter calls and ICU messages.
- Centralize `timeZone` and `now` when formatting must be deterministic across server and client.
- Keep formatter names stable because they become part of the typed contract when `Formats` is augmented.

## Typed arguments

- Prefer TypeScript augmentation plus `createMessagesDeclaration` for strict message-key and ICU-argument typing.
- Typed ICU args are especially valuable for `t.rich(...)` callbacks and formatter names.
- If the project uses `useExtracted`, prefer that workflow's built-in typing and avoid duplicating a messages declaration pipeline.

## Validation workflow

- Use `@lingual/i18n-check` to catch missing translations and inconsistent ICU arguments.
- Add `--unused` when you want unused-message detection too.
- Treat validation failures as content-contract failures, not translator-only issues.

## `useExtracted`

- `useExtracted` can extract inline strings into catalogs during `next dev` and `next build`.
- `getExtracted()` is the async counterpart for Server Components and similar server-only surfaces.
- Treat it as experimental.
- Avoid teaching it as the only workflow for a project.
- Prefer PO or similarly metadata-rich formats if translator context matters.

## Source map

- `https://next-intl.dev/docs/usage/dates-times`
- `https://next-intl.dev/docs/usage/lists`
- `https://next-intl.dev/docs/usage/configuration`
- `https://next-intl.dev/docs/usage/plugin`
- `https://next-intl.dev/docs/usage/extraction`
- `https://next-intl.dev/docs/workflows/messages`
- `https://next-intl.dev/blog/next-intl-4-0`
