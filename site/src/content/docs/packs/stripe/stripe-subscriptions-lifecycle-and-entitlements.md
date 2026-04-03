---
title: "Stripe Subscriptions Lifecycle And Entitlements"
description: "Use when implementing Stripe subscriptions beyond the initial checkout shape. Covers subscription statuses, `payment_behavior`, invoices, retries, upgrades and downgrades, cancellation timing, and using Stripe entitlements as the default feature-mapping model when plan access is non-trivial."
---
> Pack: [`stripe`](/packs/stripe/)
> Source: [`stripe/stripe-subscriptions-lifecycle-and-entitlements/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-subscriptions-lifecycle-and-entitlements/SKILL.md)
Use this skill when the task is mainly about what a subscription state means and how product access should follow it.

## Scope

- subscription lifecycle semantics
- `payment_behavior` choices for API-created subscriptions
- invoices and payment outcomes
- upgrades, downgrades, cancellations, and retries
- entitlements as the default feature-access model for non-trivial plan gating

## Routing cues

- subscription statuses, `default_incomplete`, first invoice behavior, `past_due`, `unpaid`, `incomplete_expired`, trial behavior, proration, upgrade and downgrade flows, cancellation timing, or entitlements -> use this skill
- initial checkout setup and pricing-model choices -> use `stripe-checkout-and-pricing-model-defaults`
- webhook verification and event-processing mechanics -> use `stripe-webhook-first-billing-state`
- self-serve portal configuration for subscription changes -> use `stripe-customer-portal-defaults`

## Default path

1. Treat the Stripe subscription lifecycle as the billing truth, not a simplified custom status enum invented first.
2. When creating subscriptions through the API, default to `payment_behavior=default_incomplete`.
3. Use the first invoice and its outcome to decide whether access should activate.
4. Grant access when the subscription is clearly active or trialing, and revoke or restrict based on explicit failed-payment and cancellation states.
5. For non-trivial feature gating, use Stripe Entitlements as the default mapping layer between products and app features.
6. Keep upgrades, downgrades, and cancellations as modifications of the existing subscription whenever possible.

## When to deviate

- Use a simpler internal access model only when the product tiers are extremely small and static.
- Avoid entitlements if the app only needs one coarse-grained “paid vs not paid” check and nothing else.
- Use a different `payment_behavior` only when the integration has a deliberate reason and the tradeoff is understood.

## Guardrails

- Treat `active`, `trialing`, `incomplete`, `past_due`, `unpaid`, and `canceled` as materially different states.
- Do not assume the success page means the subscription is fully active.
- Use webhooks to observe lifecycle changes.
- Keep access-control logic aligned with invoice and subscription reality.
- Persist entitlement or plan information in a way the app can resolve quickly.

## Avoid

- collapsing all subscription states into a generic boolean too early
- using `error_if_incomplete` by habit and making 3DS or retry flows harder
- creating a new subscription for every routine upgrade or downgrade
- treating unpaid historical invoices as irrelevant when they still affect lifecycle decisions
- hand-rolling feature-plan mapping when Stripe Entitlements already fits the need

## Verification checklist

- lifecycle handling distinguishes the important Stripe subscription states
- API-created subscriptions use `default_incomplete` unless a real deviation is justified
- access changes are based on invoice and subscription outcomes, not only local assumptions
- upgrades, downgrades, and cancellations follow Stripe lifecycle rules
- entitlements are considered when feature gating is more complex than a single paid flag

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm line verified live on 2026-04-03: `stripe@22.0.0`
- Subscription lifecycle and entitlements docs verified live on 2026-04-03

## Official references

- https://docs.stripe.com/billing/subscriptions/overview
- https://docs.stripe.com/billing/subscriptions/webhooks
- https://docs.stripe.com/billing/entitlements
- https://docs.stripe.com/products-prices/pricing-models

## References

- [Subscription lifecycle defaults](/packs/stripe/stripe-subscriptions-lifecycle-and-entitlements/references/subscription-lifecycle-defaults/)
## References

- [Subscription Lifecycle Defaults](/packs/stripe/stripe-subscriptions-lifecycle-and-entitlements/references/subscription-lifecycle-defaults/)
