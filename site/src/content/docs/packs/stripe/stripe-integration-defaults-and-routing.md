---
title: "Stripe Integration Defaults And Routing"
description: "Choose the right Stripe implementation path without competing with Stripe's own MCP or agent tooling. Use when tasks mention first-time Stripe integration, billing architecture, hosted checkout vs custom flows, webhook ownership, customer portal, sandboxes, Stripe CLI, or deciding which Stripe follow-up skill should own the work."
---
> Pack: [`stripe`](/packs/stripe/)
> Source: [`stripe/stripe-integration-defaults-and-routing/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-integration-defaults-and-routing/SKILL.md)
Use this skill when the task is about choosing a sane Stripe integration shape before going deeper.

## Scope

- top-level Stripe integration architecture
- the boundary between this repo and Stripe's official MCP, toolkit, and skills
- choosing hosted flows vs more custom flows
- deciding when work belongs to checkout, webhooks, subscriptions, or customer portal
- default local testing and sandbox posture

## Routing cues

- set up Stripe in an app, decide the integration approach, pick Checkout vs a custom UI, decide how billing state should work, or choose the right Stripe follow-up skill -> use this skill
- products, prices, hosted Checkout Sessions, subscription checkout, or pricing model decisions -> use `stripe-checkout-and-pricing-model-defaults`
- webhook verification, event processing, idempotency keys, fulfillment, or billing state synchronization -> use `stripe-webhook-first-billing-state`
- subscription lifecycle, `payment_behavior`, proration, upgrades, downgrades, retries, or entitlements -> use `stripe-subscriptions-lifecycle-and-entitlements`
- customer self-serve billing, billing portal sessions, return URLs, or portal configuration -> use `stripe-customer-portal-defaults`

## Default path

1. Use Stripe's MCP, docs, and agent tooling for live account operations and up-to-date product knowledge.
2. In the app code, model products and prices first instead of inventing a billing abstraction before the catalog exists.
3. Start with hosted Stripe Checkout for the initial payment or subscription flow unless the product truly needs a custom collection experience.
4. Treat Stripe webhooks as the source of truth for billing state changes in your system.
5. Use the customer portal as the default self-serve path for billing updates, payment method changes, cancellations, and invoice history.
6. Use sandboxes and the Stripe CLI for local iteration before reaching for production-like manual testing.

## When to deviate

- Use a more custom payment surface only when the hosted flow cannot satisfy the UX, embedding, or payment-method requirements.
- Skip the customer portal only when the product has a strong reason to own every billing interaction directly.
- Move away from simple product-price modeling only when you truly need usage-based pricing, seats, entitlements, Connect, or a more complex catalog.
- Use Stripe MCP directly when the job is account inspection or object operations, not implementation guidance.

## Guardrails

- Keep secret keys and webhook secrets server-only.
- Treat success pages and client redirects as UX only, not as the final source of billing truth.
- Keep billing state transitions server-driven and webhook-confirmed.
- Prefer Stripe-hosted surfaces before building custom billing UI.
- Keep Stripe object IDs and internal access-control state separate, even when they map cleanly.

## Avoid

- rebuilding Stripe docs inside the app code or inside this skill
- using MCP as a substitute for application-side billing architecture
- provisioning paid access purely from a client callback or redirect
- modeling plans only in your database while Stripe uses a different catalog
- mixing sandbox and live IDs, webhooks, or dashboard assumptions

## Verification checklist

- the task is routed to the right Stripe follow-up skill once the top-level choice is clear
- products and prices are part of the plan before checkout code is written
- billing state changes are confirmed through webhooks, not only UI redirects
- self-serve billing defaults to the customer portal unless a real exception exists
- local testing includes Stripe sandbox usage and Stripe CLI or webhook-forwarding support

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm lines verified live on 2026-04-03: `stripe@22.0.0`, `@stripe/stripe-js@9.0.1`, `@stripe/react-stripe-js@6.1.0`
- Stripe's official LLM tooling docs verified live on 2026-04-03, including MCP guidance and official Stripe-managed skills

## Official references

- https://docs.stripe.com/building-with-llms
- https://docs.stripe.com/payments/checkout
- https://docs.stripe.com/billing/subscriptions/overview
- https://docs.stripe.com/customer-management/integrate-customer-portal
- https://docs.stripe.com/stripe-cli

## References

- [Default architecture and skill boundaries](/packs/stripe/stripe-integration-defaults-and-routing/references/default-architecture-and-boundaries/)
## References

- [Default Architecture And Skill Boundaries](/packs/stripe/stripe-integration-defaults-and-routing/references/default-architecture-and-boundaries/)
