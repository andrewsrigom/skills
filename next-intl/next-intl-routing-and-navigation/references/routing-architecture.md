# Routing Architecture

## Read this when

- setting up locale routing for the first time
- refactoring `routing.ts`, `proxy.ts`, or navigation helpers
- debugging locale negotiation, redirects, rewrites, or locale-aware links

## Canonical mental model

- Keep `src/i18n/routing.ts` as the single source of truth.
- Use `defineRouting(...)` to declare `locales`, `defaultLocale`, and any routing behavior like `localePrefix`, `pathnames`, `domains`, `localeDetection`, `localeCookie`, or `alternateLinks`.
- Use `createMiddleware(routing)` at the edge negotiation layer.
- Use `createNavigation(routing)` for locale-aware `Link`, `redirect`, `useRouter`, `usePathname`, and `getPathname`.
- Use `i18n/request.ts` to validate `requestLocale` and expose the resolved locale to the render tree.
- If locales are dynamic at runtime, provide routing to the middleware per request and keep any custom navigation config in sync.

## Stable App Router shape

```ts
// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en'
});
```

```ts
// src/proxy.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

```ts
// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from '@/i18n/routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

## Locale validation rules

- Validate `requestLocale` with `hasLocale(routing.locales, requested)`.
- Expect `requestLocale` to be:
  - overridden when an explicit locale is passed to awaitable APIs
  - `undefined` outside the `[locale]` segment
  - invalid when unknown leading segments hit `[locale]`
- Fall back to `routing.defaultLocale` inside request config when recovery is acceptable.
- Use `notFound()` in routed pages and layouts when the URL locale is invalid.

## Negotiation and persistence

- `localeDetection: false` disables `accept-language` and cookie-based locale detection. Only the URL or matching domain decides the locale.
- `localeCookie` controls the `NEXT_LOCALE` preference cookie. Customize it when persistence duration or cookie naming matters, or disable it explicitly.
- `localePrefix: 'as-needed'` and `localePrefix: 'never'` require matcher coverage for unprefixed URLs.
- `localePrefix: 'never'` rewrites internally to `[locale]` routes and disables automatic alternate links.

## Navigation rules

- Import navigation helpers from one shared module, not directly from `next/navigation`.
- Keep locale-switcher behavior aligned with the routing config and current pathname.
- Generate localized URLs from `getPathname` or localized `Link`, not manual string concatenation.
- Treat `getPathname(...)` as the canonical URL builder for sitemap and alternate-link work, but prepend `basePath` manually when needed.

## Matcher footguns

- Exclude framework internals and dot-files or locale negotiation will interfere with assets.
- Revisit the matcher when you add custom locale prefixes, `basePath`, or non-standard app shells.
- When `basePath` is enabled, include `'/'` in the matcher because the matcher is evaluated relative to the base path.
- Remember that Next.js 16 renamed `middleware.ts` to `proxy.ts`; older code may still use the prior filename.

## Source map

- `https://next-intl.dev/docs/routing/setup`
- `https://next-intl.dev/docs/routing/configuration`
- `https://next-intl.dev/docs/usage/configuration`
- `https://next-intl.dev/docs/environments/actions-metadata-route-handlers`
