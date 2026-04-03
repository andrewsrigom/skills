---
name: fastify-auth-and-oauth
description: Use when implementing authentication or OAuth flows in Fastify, especially authorization code with PKCE, login callbacks, token validation, refresh handling, session or cookie boundaries, and protected route hooks.
---

# Fastify Auth And OAuth

Use this skill for Fastify services that need local auth boundaries or OAuth-based login and token validation.

## Scope

- authorization code flow with PKCE
- login and callback route design
- session and cookie boundaries for browser-based auth
- access token and refresh token handling
- JWT claim validation and protected routes
- redirect URI, state, scope, and issuer or audience validation
- Fastify hooks and plugins that enforce auth consistently

## Default path

1. Confirm whether the app is a browser-facing OAuth client, an API validating tokens, or both.
2. Prefer authorization code with PKCE for user login flows.
3. Keep the callback route focused on exchanging the code, validating state, and creating the local session boundary.
4. Store only the minimum token material needed for the app flow.
5. Validate token claims at the API boundary:
   - expiration
   - issuer
   - audience
   - subject when relevant
6. Rotate refresh tokens consistently if the provider uses rotation semantics.
7. Protect routes with a shared hook or middleware boundary instead of duplicating token checks per handler.

## When to deviate

- Use API-only token validation flows when the service is not doing browser login.
- Prefer local session boundaries when the app is browser-facing and token secrecy matters.
- Move to general Fastify best practices when the real problem is plugin or lifecycle architecture rather than auth flow design.

## Guardrails

- Do not use implicit flow for new browser-based work.
- Do not skip PKCE for public clients.
- Do not accept arbitrary redirect URIs.
- Do not log raw access tokens or refresh tokens.
- Do not treat signature verification as enough if issuer or audience checks are missing.
- Prefer secure, `HttpOnly` cookie-backed session boundaries over browser storage for sensitive token material.

## Avoid

- using implicit flow for new browser-based work
- skipping PKCE on public clients
- accepting open redirect-uri behavior
- validating JWT signatures without issuer or audience checks
- scattering auth checks across handlers

## Verification checklist

- the app type is clear: browser client, API validator, or both
- authorization code with PKCE is used where appropriate
- callback routes only do the callback job
- token claims are validated beyond signature
- route protection is centralized in a shared Fastify boundary

## Common Routing Cues

- OAuth, PKCE, access token, refresh token, redirect URI, `state`, authorization code, bearer token, JWT validation, login callback, Fastify auth hook, `@fastify/oauth2`

## Output Shape

When answering with this skill, prefer:

- the right flow for the app type
- where session creation belongs
- which claims and callbacks must be validated
- which route or hook should enforce auth
- which secrets must stay server-only

## Official References

- https://datatracker.ietf.org/doc/html/rfc6749
- https://datatracker.ietf.org/doc/html/rfc6750
- https://datatracker.ietf.org/doc/html/rfc7636
- https://datatracker.ietf.org/doc/html/rfc7519
- https://datatracker.ietf.org/doc/html/rfc8252
- https://github.com/fastify/fastify-oauth2
