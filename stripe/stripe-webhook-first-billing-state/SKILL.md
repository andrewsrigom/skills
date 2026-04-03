---
name: stripe-webhook-first-billing-state
description: Use when implementing Stripe webhooks, billing-state synchronization, or post-payment fulfillment. Covers signature verification, idempotent event handling, durable projections of Stripe state, and the rule that redirects and client events are not the source of truth.
---

# Stripe Webhook First Billing State

Use this skill when the task is about webhook handling, reconciliation, or billing-state ownership.

## Scope

- webhook endpoint design
- Stripe signature verification
- idempotent event processing
- mapping Stripe events into internal billing projections
- fulfillment and access changes after Checkout or subscription events

## Routing cues

- Stripe webhooks, `invoice.paid`, `checkout.session.completed`, subscription events, event replay protection, idempotency, fulfillment, reconcile state, or local webhook forwarding -> use this skill
- top-level Stripe setup or product-path decisions -> use `stripe-integration-defaults-and-routing`
- price modeling or Checkout Session creation -> use `stripe-checkout-and-pricing-model-defaults`
- subscription statuses, retries, proration, or entitlements semantics -> use `stripe-subscriptions-lifecycle-and-entitlements`
- billing portal events and customer self-serve updates -> often pair with `stripe-customer-portal-defaults`

## Default path

1. Expose a server-side webhook endpoint dedicated to Stripe.
2. Verify Stripe signatures before doing any business logic.
3. Persist an event receipt or idempotency marker so replayed events do not duplicate work.
4. Build a small internal billing projection from Stripe events rather than mirroring every Stripe field.
5. Grant or revoke access only after Stripe-confirmed events such as paid invoices, active subscriptions, or entitlement updates.
6. Use the Stripe CLI to forward events locally during development.

## When to deviate

- Process asynchronously if the fulfillment work is heavy or cross-system, but keep verification and receipt recording in the request path.
- Keep a richer Stripe projection only when analytics, support tooling, or entitlement resolution genuinely need it.
- Use additional event types only when the app behavior truly depends on them.

## Guardrails

- Verify webhook signatures on the raw request body.
- Make handlers idempotent.
- Treat redirects, success pages, and optimistic UI as non-authoritative.
- Keep event handlers safe to retry.
- Persist enough Stripe identifiers to reconcile state later.

## Avoid

- parsing the webhook body after middleware has already mutated the raw payload
- granting access before a Stripe-confirmed event arrives
- handling every possible Stripe event without a concrete business reason
- storing an unbounded mirror of Stripe objects when a small internal projection is enough
- coupling entitlement changes to client navigation instead of server events

## Verification checklist

- signature verification uses the raw request body and webhook secret
- handlers are idempotent for duplicate or replayed events
- access changes happen from Stripe-confirmed state transitions
- the internal billing projection is intentionally small and queryable
- local development includes Stripe CLI or equivalent webhook forwarding

## Quick example

```ts
const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

switch (event.type) {
  case "invoice.paid":
    await markAccountPaid(event.data.object);
    break;
  case "customer.subscription.deleted":
    await revokeSubscriptionAccess(event.data.object);
    break;
}
```

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm line verified live on 2026-04-03: `stripe@22.0.0`
- Webhooks, idempotent requests, and Stripe CLI docs verified live on 2026-04-03

## Official references

- https://docs.stripe.com/webhooks
- https://docs.stripe.com/billing/subscriptions/webhooks
- https://docs.stripe.com/api/idempotent_requests
- https://docs.stripe.com/stripe-cli

## References

- [Webhook event handling defaults](./references/webhook-event-handling-defaults.md)
