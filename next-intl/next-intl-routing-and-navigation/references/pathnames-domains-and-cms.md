# Pathnames, Domains, and CMS URLs

## Read this when

- localizing public URLs for SEO
- combining locale prefixes with domains
- implementing locale switchers for CMS-backed content
- deciding whether static segments or slugs should be translated

## Localized pathnames

- Use `pathnames` to map one internal route template to many localized external URLs.
- Keep internal route templates stable.
- Translate only static route segments in `pathnames`.
- Plan collisions intentionally. Static routes outrank overlapping dynamic routes.
- Catch-all and optional catch-all segments are supported.

```ts
pathnames: {
  '/about': {
    en: '/about',
    de: '/uber-uns'
  },
  '/news/[slug]': {
    en: '/news/[slug]',
    de: '/neuigkeiten/[slug]'
  }
}
```

## Prefix modes

- `always`: every locale is prefixed
- `as-needed`: default locale loses the prefix, which increases reliance on locale detection and persistence
- `never`: URLs stay unprefixed, but the app still uses `[locale]` routes internally
- custom prefix mappings: useful, but they often require matcher review and more careful testing

## Domains

- Use `domains` for host-based locale partitioning.
- Treat domain config as strict. Each domain needs an explicit locale list.
- Locales must be unique across domains, so regional variants are often the cleanest fit.
- Keep domain rules in the same routing object as prefixes and pathnames to avoid drift.
- Different `localePrefix` behavior per domain is not supported directly. If you need it, build per domain with injected routing config.

## CMS-driven URLs

- Localize the static route shell with `pathnames`.
- Source the dynamic slug from the CMS or content model.
- Keep locale switchers aware of the localized slug per locale.
- Keep alternate links, sitemap entries, and canonical decisions aware of CMS-provided slugs too.

## Revalidation nuance

- With localized pathnames, `revalidatePath(...)` can target either the internal or localized pathname depending on whether the route was generated statically or at runtime.
- If that distinction is unclear, prefer `revalidateTag(...)` over guessing the wrong path.

## SEO guardrails

- Do not hardcode localized URLs in components when the routing config can generate them.
- Do not teach `pathnames` as a full slug-translation system. It is only for static path structure.
- Keep locale switchers and alternate links aligned with the real external URL for each locale.

## Source map

- `https://next-intl.dev/docs/routing/configuration`
- `https://next-intl.dev/docs/routing/setup`
- `https://next-intl.dev/docs/environments/actions-metadata-route-handlers`
