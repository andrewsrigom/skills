---
title: "Cache and Revalidation Matrix"
description: "Supporting reference for Next.js Data Fetching and Cache."
slug: "packs/nextjs/nextjs-data-fetching-and-cache/references/cache-and-revalidation-matrix"
sidebar:
  hidden: true
---
> Pack: [`nextjs`](/packs/nextjs/)
> Parent skill: [Next.js Data Fetching and Cache](/packs/nextjs/nextjs-data-fetching-and-cache/)
> Source: [`nextjs/nextjs-data-fetching-and-cache/references/cache-and-revalidation-matrix.md`](https://github.com/andrewsrigom/agent-skills/blob/main/nextjs/nextjs-data-fetching-and-cache/references/cache-and-revalidation-matrix.md)
## Choose by data shape

- Public, shared, and slow-changing data:
  - cache it deliberately
  - prefer route or tag invalidation over ad hoc busting
- User-specific or request-authenticated data:
  - default to dynamic or private handling
  - avoid public cache assumptions
- Derived or aggregated data reused across routes:
  - consider `unstable_cache` or tagged fetches

## Primitive selection

- Plain `fetch(...)`:
  - default starting point for most App Router reads
- `fetch(..., { next: { revalidate, tags } })`:
  - use when stale-while-revalidate or tag-based invalidation is enough
- `revalidatePath(path)`:
  - use after a mutation when a concrete route tree should refresh
- `revalidateTag(tag)` or `updateTag(tag)`:
  - use when multiple routes depend on the same data slice
- `unstable_cache(...)`:
  - use for non-`fetch` async work or shared computed reads

## Common mistakes

- Caching tenant or user data as if it were public
- Invalidating a path when the real coupling is data-wide
- Creating many unrelated tags with no ownership model
- Mixing Pages Router guidance into App Router code
