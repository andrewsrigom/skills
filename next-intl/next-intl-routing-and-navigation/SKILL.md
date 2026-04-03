---
name: next-intl-routing-and-navigation
description: Set up and maintain next-intl locale routing and navigation in Next.js App Router. Use when tasks mention defineRouting, createMiddleware or proxy.ts, createNavigation, locale prefixes, localized pathnames, domains, locale switchers, alternate links, locale cookies, or CMS-driven localized URLs.
---

# Next Intl Routing and Navigation

Use this skill when the task is primarily about URL structure, locale negotiation, or locale-aware navigation.

## Scope

- App Router locale routing setup
- `defineRouting`, `createMiddleware`, `createNavigation`
- `localePrefix`, `localeDetection`, `localeCookie`, `alternateLinks`
- localized pathnames, domains, `getPathname`, and base-path-aware URL generation
- locale switchers and CMS-driven localized URLs

## Routing cues

- `defineRouting`, `createNavigation`, `Link`, `useRouter`, `usePathname`, `getPathname`, locale switcher, domain routing, pathnames, `proxy.ts`, `middleware.ts`, `NEXT_LOCALE`, `hreflang` -> use this skill
- ICU messages, `useTranslations`, `useFormatter`, rich text, message validation -> use `next-intl-messages-and-formatting`
- `getRequestConfig`, `setRequestLocale`, `getTranslations`, metadata, Server Actions, testing -> use `next-intl-server-runtime`
- plugin setup, TypeScript augmentation, Crowdin, `useExtracted`, message loading strategy -> use `next-intl-workflows-and-tooling`

## Default path

1. Read [references/routing-architecture.md](./references/routing-architecture.md) first.
2. If the task touches locale switchers, cookies, alternate links, or `getPathname`, read [references/locale-switchers-and-alternate-links.md](./references/locale-switchers-and-alternate-links.md).
3. If the task touches localized slugs, domains, or SEO-facing URLs, read [references/pathnames-domains-and-cms.md](./references/pathnames-domains-and-cms.md).
4. Keep `routing.ts`, `proxy.ts` or `middleware.ts`, navigation helpers, and locale-switcher behavior derived from one shared routing object.
5. Validate any incoming locale with `hasLocale(...)` before treating it as trusted.

## When to deviate

- Disable or customize automatic alternate links when URLs vary outside the routing config or locale coverage differs.
- Use domain routing or CMS-driven slugs only when the app actually needs them.
- Move to server-runtime when the issue is request config or metadata rather than URL structure.

## Guardrails

- Keep `src/i18n/routing.ts` as the single routing source of truth.
- Keep middleware matcher coverage broad enough for localized pages, but exclude `api`, `trpc`, `_next`, `_vercel`, and static files.
- Do not duplicate locale lists, prefix rules, or pathname maps across files.
- Treat `localePrefix: 'as-needed'` and `localePrefix: 'never'` as behavioral changes, not cosmetic ones. They affect redirects, cookies, alternate links, and locale persistence.
- Prefer `useRouter().replace({pathname, params}, {locale})` for in-place locale switchers. `Link locale=...` always prefixes and disables prefetch.
- `getPathname(...)` is the canonical localized pathname builder, but it returns the bare pathname without `basePath`.
- Translate only static route segments with `pathnames`. Keep dynamic slugs sourced from the CMS or app data model.
- Disable or customize automatic alternate links when URLs vary outside the routing config, availability differs by locale, or CMS-driven slugs are involved.

## Avoid

- duplicating locale lists or pathname maps across files
- trusting incoming locale values without validation
- translating dynamic slugs in `pathnames`
- using locale switcher APIs with behavior you have not matched to `localePrefix`

## Verification checklist

- one shared routing object owns the routing contract
- incoming locales are validated
- locale switchers match the locale-prefix behavior
- pathnames and domains are handled in the correct surface
- alternate-link behavior matches the actual URL model

## Canonical APIs

- `defineRouting`
- `createMiddleware`
- `createNavigation`
- `hasLocale`
- `getPathname`

## Maintenance

- Snapshot date: 2026-03-10
- Package snapshot: `next-intl@4.8.3` published 2026-02-16

## References

- [references/routing-architecture.md](./references/routing-architecture.md)
- [references/locale-switchers-and-alternate-links.md](./references/locale-switchers-and-alternate-links.md)
- [references/pathnames-domains-and-cms.md](./references/pathnames-domains-and-cms.md)
