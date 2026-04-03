---
name: next-intl-server-runtime
description: Configure next-intl request runtime and server-side integration in Next.js App Router. Use when tasks mention i18n/request.ts, getRequestConfig, requestLocale, setRequestLocale, getTranslations, NextIntlClientProvider inheritance, Server Components, Server Actions, metadata, route handlers, sitemap, manifest, OG images, error files, or testing translated components.
---

# Next Intl Server Runtime

Use this skill when the task is about request-scoped config, server-side API selection, or rendering correctness across server and client boundaries.

## Scope

- `i18n/request.ts`, `getRequestConfig`, and `requestLocale`
- component environment rules for hooks vs awaitable APIs
- `NextIntlClientProvider` inheritance, opt-out, and client wrappers
- `setRequestLocale` and static rendering
- metadata, Server Actions, Route Handlers, sitemap, manifest, and OG images
- error files and testing translated components

## Routing cues

- `getRequestConfig`, `requestLocale`, `NextIntlClientProvider`, `setRequestLocale`, metadata, Server Actions, Route Handlers, sitemap, manifest, OG images, error files, tests -> use this skill
- locale routing, domains, pathnames, locale switchers -> use `next-intl-routing-and-navigation`
- ICU authoring, `t.rich`, `useFormatter`, message validation -> use `next-intl-messages-and-formatting`
- plugin flags, augmentation, Crowdin, `useExtracted` -> use `next-intl-workflows-and-tooling`

## Default path

1. Read [references/environment-api-matrix.md](./references/environment-api-matrix.md) first.
2. If the task touches static rendering, error files, or tests, read [references/static-rendering-errors-and-tests.md](./references/static-rendering-errors-and-tests.md).
3. Centralize request-scoped config in `i18n/request.ts`.
4. Choose hook APIs only for non-async components. Choose awaitable server APIs everywhere else.

## When to deviate

- Pass `locale` explicitly when the server surface does not infer it from the current segment.
- Use client wrappers only when client-only provider props like `onError` or `getMessageFallback` are needed.
- Move to routing skill when locale negotiation and URL structure dominate the task.

## Guardrails

- Use hooks like `useTranslations` only in non-async shared or client components.
- Use `next-intl/server` awaitables in `async` components, metadata, Server Actions, and Route Handlers.
- Await `requestLocale` and handle invalid, `undefined`, and explicit-override cases deliberately.
- Return the resolved `locale` from `getRequestConfig(...)` explicitly.
- Validate incoming locales before using them.
- Call `setRequestLocale(locale)` before any next-intl API in every locale page or layout that must stay static.
- Pass `locale` explicitly to awaitable APIs in metadata, manifest, sitemap, OG-image, and other non-component server surfaces when the locale is not inferred from the segment.
- `NextIntlClientProvider` inherits `locale`, `messages`, `formats`, `timeZone`, and `now`. Use `messages={null}` to opt out, and a client wrapper for `onError` or `getMessageFallback`.
- Provide `NextIntlClientProvider` in tests and in client-only error surfaces.

## Avoid

- calling translation hooks inside async components
- assuming `requestLocale` is already valid and defined
- forgetting `setRequestLocale` on static locale pages that need it
- treating provider inheritance as magical when you actually need explicit client wrappers

## Verification checklist

- request config is centralized
- hook vs awaitable API choice matches the component/runtime boundary
- incoming locale handling is explicit
- static rendering uses `setRequestLocale` when required
- tests and client-only error surfaces receive provider context

## Canonical APIs

- `requestLocale`
- `getRequestConfig`
- `NextIntlClientProvider`
- `setRequestLocale`
- `getTranslations`
- `getFormatter`
- `getLocale`
- `getMessages`
- `getNow`
- `getTimeZone`

## Maintenance

- Snapshot date: 2026-03-10
- Package snapshot: `next-intl@4.8.3` published 2026-02-16

## References

- [references/environment-api-matrix.md](./references/environment-api-matrix.md)
- [references/static-rendering-errors-and-tests.md](./references/static-rendering-errors-and-tests.md)
