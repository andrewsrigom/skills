# Plugin, Types, and Message Loading

## Read this when

- setting up `next-intl` in a new app
- moving `i18n/request.ts`
- adding strict typing for locales, messages, or formats
- deciding how messages should be loaded

## Plugin baseline

```ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
export default withNextIntl({});
```

- Keep the plugin enabled for App Router setups.
- By default, request config is discovered from `src/i18n/request.ts` or `i18n/request.ts` with standard JS or TS extensions.
- Override the request-config path only when the default discovery path is not correct.
- Reach for plugin flags like `createMessagesDeclaration`, `extract`, or `precompile` only when the workflow truly needs them.

## TypeScript augmentation

Use `AppConfig` augmentation for strict locale, message, and format typing.

```ts
import {routing} from '@/i18n/routing';
import {formats} from '@/i18n/request';
import en from '@/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
    Formats: typeof formats;
  }
}
```

- `createMessagesDeclaration` pairs with this setup and usually points at the same representative locale file used for `Messages`.
- The generated declaration commonly uses a `*.d.json.ts` filename, so TypeScript needs `allowArbitraryExtensions`.

## Message loading strategies

- default: repo-local message files loaded from `getRequestConfig(...)`
- valid alternative: async loading from a CMS or backend when operationally justified
- keep the loading strategy explicit and centralized

## Experimental loader options

- `createMessagesDeclaration`: generate strict message-key and argument types from a sample locale file
- `extract`: enable `useExtracted` and `getExtracted`
- `messages`: declare message path, locales, and file format for extraction and precompilation
- `srcPath`: define where extracted messages are discovered, including multiple paths when needed
- `precompile`: precompile imported catalogs for smaller bundles and faster runtime formatting

If `precompile` is enabled, avoid `t.raw(...)`.

## Custom formats

- JSON is the default editing format.
- PO is often a better fit when translator comments, file references, and richer context matter.
- Custom codecs can be implemented with `defineCodec(...)` from `next-intl/extractor`.

## Missing-message policy

- Use `onError` for reporting.
- Use `getMessageFallback` for a deliberate fallback policy.
- Avoid silent failures that hide content drift.

## Source map

- `https://next-intl.dev/docs/usage/plugin`
- `https://next-intl.dev/docs/usage/configuration`
- `https://next-intl.dev/docs/workflows/typescript`
- `https://next-intl.dev/blog/next-intl-4-0`
