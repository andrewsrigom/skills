---
title: "Environment API Matrix"
description: "Supporting reference for Next Intl Server Runtime."
slug: "packs/next-intl/next-intl-server-runtime/references/environment-api-matrix"
sidebar:
  hidden: true
---
> Pack: [`next-intl`](/packs/next-intl/)
> Parent skill: [Next Intl Server Runtime](/packs/next-intl/next-intl-server-runtime/)
> Source: [`next-intl/next-intl-server-runtime/references/environment-api-matrix.md`](https://github.com/andrewsrigom/agent-skills/blob/main/next-intl/next-intl-server-runtime/references/environment-api-matrix.md)
## Read this when

- deciding between hooks and awaitable APIs
- wiring `i18n/request.ts`
- debugging missing locale, missing provider, or wrong-environment usage

## Request config baseline

Keep `i18n/request.ts` as the server runtime source of truth.

```ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from '@/i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

## `requestLocale` semantics

- `requestLocale` usually corresponds to the `[locale]` segment matched by the middleware.
- It can be invalid when the dynamic segment catches an unknown path like `/unknown.txt`.
- It can be `undefined` when code renders outside the `[locale]` segment.
- It is bypassed when you pass an explicit `locale` to awaitables like `getTranslations({locale: 'en'})`.

## Which API belongs where

- non-async shared or Server Components:
  - `useTranslations`
  - `useFormatter`
  - `useLocale`
  - `useNow`
  - `useTimeZone`
  - `useMessages`
- async Server Components:
  - `getTranslations`
  - `getFormatter`
  - `getLocale`
  - `getMessages`
  - `getNow`
  - `getTimeZone`
- Server Actions, Metadata API, Route Handlers:
  - use `next-intl/server` awaitables
- Client Components:
  - rely on `NextIntlClientProvider`

## Shared component rule

- A non-async component using `useTranslations` can render as a Server Component by default.
- The same component can also run on the client if imported by a Client Component.
- Keep assumptions compatible with both environments.

## Provider inheritance

- `NextIntlClientProvider` bridges `locale`, `messages`, `formats`, `timeZone`, and `now` into client code.
- Nested providers inherit these props from ancestors, but props are atomic and do not deep-merge automatically.
- Use `messages={null}` when client components should not receive message catalogs.
- `onError` and `getMessageFallback` are not inherited because they are not serializable. Add them in a client wrapper provider.

## High-signal footguns

- Do not call hook APIs in `async` components.
- Do not trust `requestLocale` blindly.
- Do not forget that explicit `locale` arguments override `requestLocale`.
- Do not scatter config across layouts and helpers when `getRequestConfig(...)` can own it centrally.
- Do not leave `now` and `timeZone` implicit when deterministic formatting matters.

## Source map

- `https://next-intl.dev/docs/usage/configuration`
- `https://next-intl.dev/docs/environments/server-client-components`
- `https://next-intl.dev/docs/getting-started/app-router`
- `https://next-intl.dev/blog/next-intl-3-22`
- `https://next-intl.dev/blog/date-formatting-nextjs`
