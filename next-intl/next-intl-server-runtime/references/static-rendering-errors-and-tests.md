# Static Rendering, Error Files, and Tests

## Read this when

- preserving static rendering with locale routing
- localizing metadata, Server Actions, or Route Handlers
- implementing localized `not-found` or `error` handling
- writing tests for translated UI

## Static rendering flow

- use `[locale]` routing
- export `generateStaticParams()` when prebuilding locale paths
- validate `params.locale`
- call `setRequestLocale(locale)` before using `next-intl` APIs in the relevant layout or page
- repeat that call in every page or layout that must remain statically renderable
- pass explicit `locale` to awaitable APIs in metadata and similar server surfaces when static eligibility matters
- remember that `setRequestLocale` is a request-scoped cache handshake, not a general routing primitive

## Metadata and server handlers

```ts
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {title: t('title')};
}
```

- Use the same explicit-locale pattern in Server Actions and Route Handlers when translated output is returned to the user.
- Manifest files live at the app root, so choose an explicit representative locale there.
- Sitemap generation pairs naturally with `getPathname(...)` from your navigation helpers to build localized alternates.
- Localized OG image routes can use `getTranslations({locale, ...})`, but custom prefix rewrites may require matcher exceptions for `opengraph-image`.

## Error files

- `app/[locale]/not-found.tsx` can use `useTranslations`.
- Unknown localized routes still need a catch-all route that calls `notFound()`.
- Root `app/not-found.tsx` is still needed for non-localized misses.
- Root `app/not-found.tsx` still depends on having a root layout at the app root.
- `error.tsx` is a Client Component, so translated error UI needs `NextIntlClientProvider`.

## Testing

- Wrap tested components with `NextIntlClientProvider`.
- Pass `locale` and `messages` at minimum.
- Add `timeZone` and `now` when testing relative or date-based formatting.
- If Vitest or Jest stumbles on ESM package loading, follow the official test-environment setup instead of patching around missing transforms ad hoc.

## High-signal footguns

- Forgetting `setRequestLocale(locale)` can push locale-routed pages into dynamic rendering.
- Forgetting the provider is the most common testing failure.
- Returning translated messages from Server Actions without considering locale switching can create inconsistent UI if the app does not encode locale in the route.

## Source map

- `https://next-intl.dev/docs/routing/setup`
- `https://next-intl.dev/docs/environments/actions-metadata-route-handlers`
- `https://next-intl.dev/docs/environments/error-files`
- `https://next-intl.dev/docs/environments/testing`
