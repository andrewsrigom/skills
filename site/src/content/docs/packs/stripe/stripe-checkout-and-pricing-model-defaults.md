---
title: "Stripe Checkout And Pricing Model Defaults"
description: "Use when modeling products and prices or implementing Stripe Checkout with sane defaults. Covers products, prices, lookup keys, Checkout Sessions, hosted checkout as the default path, and the boundary between checkout UX and webhook-based fulfillment."
---
> Pack: [`stripe`](/packs/stripe/)
> Source: [`stripe/stripe-checkout-and-pricing-model-defaults/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-checkout-and-pricing-model-defaults/SKILL.md)
Use this skill when the task is about pricing-model setup or Checkout implementation choices.

## Scope

- products and prices as the billing catalog
- recurring pricing model selection
- Checkout Sessions as the default integration API
- hosted checkout as the default first implementation
- checkout success and cancel flow boundaries

## Routing cues

- create products or prices, pick flat-rate vs per-seat vs usage-based pricing, set up Checkout, create checkout sessions, enable promo codes, collect tax, or decide between hosted checkout and more custom payment UI -> use this skill
- once the task becomes mostly about webhook processing, event verification, or post-checkout state sync -> use `stripe-webhook-first-billing-state`
- once the task becomes mostly about subscription lifecycle semantics, retries, proration, or entitlements -> use `stripe-subscriptions-lifecycle-and-entitlements`
- once the task is really about self-serve plan management after checkout -> use `stripe-customer-portal-defaults`

## Default path

1. Model the catalog with Products and Prices first.
2. Give durable prices stable lookup keys and keep price IDs server-controlled.
3. Prefer hosted Checkout Sessions for the first production implementation.
4. Create Checkout Sessions on the server using existing price IDs rather than trusting client-supplied amounts.
5. Use success and cancel URLs for navigation only.
6. Handle provisioning, subscription activation, and internal billing-state updates in webhook handlers.

## When to deviate

- Use a more custom payment UI only when hosted checkout is a proven product mismatch.
- Create dynamic prices only when the business model truly requires per-quote or highly variable pricing.
- Reach for usage-based pricing only when usage measurement is part of the actual business model, not because it sounds flexible.
- Keep one-time and recurring purchases separate unless a combined cart is a real requirement.

## Guardrails

- Treat Prices as the amount source of truth.
- Keep session creation server-side.
- Keep client code unaware of secret keys and final billing decisions.
- Prefer a small, explicit catalog before adding many optional prices or feature flags.
- Use Checkout to collect payment data; do not build a parallel card-collection layer “just in case.”

## Avoid

- sending raw amounts from the client and treating them as authoritative
- provisioning access from the success page alone
- generating a new Stripe Price for every routine signup when a reusable catalog price already exists
- treating product tiers, price IDs, and internal role names as the same concept
- defaulting to Elements or a full custom flow before hosted Checkout is ruled out

## Verification checklist

- products and prices exist before checkout code is finalized
- checkout sessions are created on the server with trusted price IDs
- success and cancel URLs are used for UX only
- pricing model choice is deliberate and matches the business model
- webhook-based fulfillment or state sync is part of the plan

## Quick example

```ts
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: process.env.STRIPE_PRICE_PRO!, quantity: 1 }],
  success_url: `${appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${appUrl}/billing/cancel`,
});
```

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm lines verified live on 2026-04-03: `stripe@22.0.0`, `@stripe/stripe-js@9.0.1`, `@stripe/react-stripe-js@6.1.0`
- Checkout and pricing-model docs verified live on 2026-04-03

## Official references

- https://docs.stripe.com/payments/checkout
- https://docs.stripe.com/api/checkout/sessions/create
- https://docs.stripe.com/products-prices/how-products-and-prices-work
- https://docs.stripe.com/products-prices/pricing-models

## References

- [Catalog and Checkout defaults](/packs/stripe/stripe-checkout-and-pricing-model-defaults/references/catalog-and-checkout-defaults/)
## References

- [Catalog And Checkout Defaults](/packs/stripe/stripe-checkout-and-pricing-model-defaults/references/catalog-and-checkout-defaults/)
