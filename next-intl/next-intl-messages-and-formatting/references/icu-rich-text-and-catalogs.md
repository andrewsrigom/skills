# ICU, Rich Text, and Catalog Structure

## Read this when

- designing or refactoring message catalogs
- deciding how to structure namespaces
- writing plurals, selects, ordinal rules, or rich text

## Catalog structure

- Keep message files as nested objects, not flat dotted keys.
- Use namespaces that match the smallest stable component or feature boundary.
- Keep message keys descriptive and stable.
- Reserve `.` for nesting only.
- Prefer stable object keys over positional message arrays when translators or code need durable references.

```json
{
  "Auth": {
    "SignUp": {
      "title": "Sign up",
      "cta": "Create account"
    }
  }
}
```

## Translation consumption

```tsx
import {useTranslations} from 'next-intl';

export function SignUpCard() {
  const t = useTranslations('Auth.SignUp');
  return <h1>{t('title')}</h1>;
}
```

- Omit the namespace only when a component genuinely needs many cross-namespace lookups.
- Prefer `t.has(...)` for locale-specific optional content instead of unsafe assumptions.

## ICU authoring rules

- interpolation: `{name}`
- plural: `{count, plural, =0 {...} one {...} other {...}}`
- ordinal plural: `{rank, selectordinal, one {...} two {...} few {...} other {...}}`
- select: `{status, select, draft {...} published {...} other {...}}`

- Keep argument names alphanumeric or underscore-only.
- Push grammar and branching into ICU messages instead of app code.

## Rich text and markup

Use `t.rich(...)` when translators need control over tag placement.

```tsx
const body = t.rich('body', {
  strong: (chunks) => <strong>{chunks}</strong>,
  link: (chunks) => <Link href="/pricing">{chunks}</Link>
});
```

- Prefer `t.rich(...)` over hardcoded JSX fragments around translated text.
- Use `t.markup(...)` when the output should stay a string and tags are transformed programmatically.
- Treat `t.raw(...)` as an escape hatch, not the default rendering path.
- `t.raw(...)` does not fit extraction or precompilation workflows well, so avoid it when those workflows are planned.

## Source map

- `https://next-intl.dev/docs/usage/translations`
- `https://next-intl.dev/docs/usage/messages`
- `https://next-intl.dev/docs/environments/server-client-components`
