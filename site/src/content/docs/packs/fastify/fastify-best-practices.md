---
title: "Fastify Best Practices"
description: "Use when building, organizing, or debugging Fastify applications. Covers plugins, routes, schemas, hooks, errors, auth boundaries, logging, testing, and deployment decisions for Fastify backends."
---
> Pack: [`fastify`](/packs/fastify/)
> Source: [`fastify/fastify-best-practices/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/fastify/fastify-best-practices/SKILL.md)
Use this skill for Fastify-specific architecture and implementation choices.

## Scope

- app bootstrapping and plugin boundaries
- route organization and schema-first handlers
- request lifecycle hooks and decorators
- auth, cookies, sessions, CORS, and security headers
- testing with `inject()`
- logging, performance, and deployment decisions

## Default path

1. Confirm whether the task is about app structure, a single route, a plugin, or runtime behavior.
2. Keep the app split by plugin boundary, not by random file size.
3. Define request and response schemas before handler logic when validation matters.
4. Prefer decorators and plugins for shared behavior instead of utility imports passed everywhere.
5. Use hooks intentionally:
   - `onRequest` for auth and cheap request guards
   - `preHandler` for work that depends on parsed input
   - `onSend` only when the response must be shaped late
6. Keep handlers thin and move business logic behind a service boundary when the route starts doing orchestration.
7. Test route behavior with `fastify.inject()` before introducing network-level tests.

## When to deviate

- Keep a route local and simple only when it truly has no reusable boundary.
- Use heavier lifecycle hooks only when cheaper ones cannot express the requirement.
- Move to auth skill when the main challenge becomes OAuth or token/session design.

## Guardrails

- Prefer Fastify plugins and encapsulation over global mutable state.
- Treat schemas as part of the contract, not optional documentation.
- Do not scatter auth logic across handlers if the same rule can live in a hook or plugin.
- Keep logger usage structured. Do not rely on string-only logs for important events.
- Register plugins in a deterministic order when one plugin depends on another.
- Avoid doing expensive work in decorators or plugin registration if it can happen lazily at request time.

## Avoid

- using global mutable state instead of plugin encapsulation
- pushing orchestration into handlers that should stay thin
- scattering schemas away from the route contract
- choosing hooks by habit instead of request-lifecycle cost

## Verification checklist

- plugin boundaries are intentional
- schemas are part of the route contract
- hook choice matches the lifecycle need
- handlers stay thin
- route behavior can be tested with `inject()`

## Common Routing Cues

- routes, handlers, `fastify.register`, plugin encapsulation, decorators, hooks, schemas, serializer, `inject()`, Pino, auth hooks, `@fastify/*`

## Output Shape

When answering with this skill, prefer:

- the recommended plugin or route shape
- the right lifecycle hook for the job
- where schemas belong
- what should be tested
- what should stay out of handlers

## Official Docs

- https://fastify.dev/docs/latest/
- https://fastify.dev/docs/latest/Reference/Plugins/
- https://fastify.dev/docs/latest/Reference/Routes/
- https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- https://fastify.dev/docs/latest/Guides/Testing/