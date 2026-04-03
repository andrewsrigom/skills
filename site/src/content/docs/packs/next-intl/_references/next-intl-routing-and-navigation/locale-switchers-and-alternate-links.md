---
title: "Locale Switchers, Cookies, and Alternate Links"
description: "Supporting reference for Next Intl Routing and Navigation."
slug: "packs/next-intl/next-intl-routing-and-navigation/references/locale-switchers-and-alternate-links"
sidebar:
  hidden: true
---
> Pack: [`next-intl`](/packs/next-intl/)
> Parent skill: [Next Intl Routing and Navigation](/packs/next-intl/next-intl-routing-and-navigation/)
> Source: [`next-intl/next-intl-routing-and-navigation/references/locale-switchers-and-alternate-links.md`](https://github.com/andrewsrigom/agent-skills/blob/main/next-intl/next-intl-routing-and-navigation/references/locale-switchers-and-alternate-links.md)
## Read this when

- implementing a locale switcher that should stay on the current page
- debugging redirects, cookie persistence, or `Link locale=...` behavior
- generating alternate URLs, canonicals, or sitemap entries from routing config
- using `basePath` together with next-intl navigation helpers

## Locale switcher baseline

Use navigation helpers from your shared `i18n/navigation.ts` module.

```tsx
'use client';

import {useParams} from 'next/navigation';
import {usePathname, useRouter} from '@/i18n/navigation';

export function LocaleSwitcherSelect() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  function onSelect(locale: string) {
    router.replace({pathname, params}, {locale});
  }

  // ...
}
```

- This keeps the current route and dynamic params instead of rebuilding URLs by hand.
- Validate or constrain locale choices before calling the router if they can come from user input.

## `Link locale=...` behavior

- `Link` can switch locales directly, but it always prefixes the locale in the rendered URL, even with `localePrefix: 'as-needed'`.
- Prefetch is disabled when `locale` is set on `Link` so the locale cookie can update before hydration.
- Use `Link locale=...` for straightforward menus. Use `router.replace({pathname, params}, {locale})` when preserving the exact current route matters.

## Locale detection and cookie behavior

- By default, next-intl persists the last matched locale in a `NEXT_LOCALE` session cookie.
- `localeCookie` can customize the cookie name and attributes, extend `maxAge`, or disable the cookie entirely.
- `localeDetection: false` disables detection from both `accept-language` and the locale cookie.
- With `localePrefix: 'as-needed'`, the cookie affects redirects for unprefixed URLs like `/`.

## Automatic alternate links

- The middleware can emit a `link` response header with localized alternates and an `x-default` entry.
- Automatic alternate links already account for your routing config, including `domains`, `pathnames`, and `basePath`.
- Turn `alternateLinks` off when URLs come from a CMS, when only some locales expose a page, or when you need custom `hreflang` behavior.
- For small tweaks, compose custom middleware logic after `createMiddleware(routing)` runs.

## `getPathname` and `basePath`

- `getPathname(...)` is the canonical builder for localized pathnames used in sitemap and canonical generation.
- It does not include `basePath`, so prepend that manually when constructing final URLs.
- When `basePath` is enabled, keep the middleware matcher relative to the base path and include `'/'` explicitly.

## Source map

- `https://next-intl.dev/docs/routing/configuration`
- `https://next-intl.dev/docs/routing/setup`
- `https://next-intl.dev/docs/environments/actions-metadata-route-handlers`
