---
name: stripe-customer-portal-defaults
description: Use when implementing Stripe's customer portal as the default self-serve billing surface. Covers portal configuration, product-catalog boundaries for upgrades and downgrades, portal session creation, deep links, and webhook-driven sync after customers manage their own billing.
---

# Stripe Customer Portal Defaults

Use this skill when the task is about self-serve billing management after the initial purchase.

## Scope

- when to default to the customer portal
- portal configuration in sandbox and live mode
- product-catalog boundaries for plan changes
- portal session creation and return URLs
- webhook expectations after portal-driven changes

## Routing cues

- billing portal, customer portal, manage billing, change plan, update payment method, cancel at period end, invoice history, portal session, deep links, or self-serve billing UX -> use this skill
- initial checkout and pricing model work -> use `stripe-checkout-and-pricing-model-defaults`
- webhook mechanics, signature verification, and idempotent event handling -> use `stripe-webhook-first-billing-state`
- lifecycle semantics for what a subscription change means -> use `stripe-subscriptions-lifecycle-and-entitlements`

## Default path

1. Use the customer portal as the default self-serve billing surface.
2. Configure portal features first in the Stripe Dashboard for sandbox and live mode separately.
3. If customers can switch plans, make sure the product catalog and allowed prices are configured intentionally.
4. Create portal sessions server-side for authenticated customers only.
5. Provide a stable `return_url` back into the account or billing area.
6. Listen to subscription, payment-method, customer, and invoice-related webhook events to sync internal state after portal actions.

## When to deviate

- Build a custom billing-management UI only when the product needs workflows the portal cannot support.
- Use multiple portal configurations only when customer segments or platform requirements genuinely differ.
- Use portal deep links when a specific self-serve action should be the landing point from your app.

## Guardrails

- Authenticate the user in your app before creating a portal session.
- Treat the portal as a billing-management surface, not as an identity surface.
- Keep portal configuration separate between sandbox and live mode.
- Let Stripe own plan-change billing mechanics where possible.
- Sync app state from webhooks after portal actions.

## Avoid

- creating portal sessions for unauthenticated users
- treating the customer's billing email as an app login credential
- assuming sandbox portal settings automatically match live mode
- rebuilding a plan-switch UI before testing whether the portal already covers it
- skipping webhooks after portal-driven updates

## Verification checklist

- portal configuration exists in the correct mode and exposes only intended actions
- portal sessions are created server-side for authenticated customers
- `return_url` sends users back to the right billing area
- plan-change options match the intended product catalog
- webhook handling is ready for portal-driven subscription and payment-method changes

## Quick example

```ts
const session = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: `${appUrl}/settings/billing`,
});
```

## Current snapshot

- Checked against official docs on 2026-04-03
- Current npm line verified live on 2026-04-03: `stripe@22.0.0`
- Customer portal docs verified live on 2026-04-03

## Official references

- https://docs.stripe.com/customer-management/integrate-customer-portal
- https://docs.stripe.com/api/customer_portal/sessions/create
- https://docs.stripe.com/customer-management/portal-deep-links
- https://docs.stripe.com/webhooks

## References

- [Self-serve portal defaults](./references/self-serve-portal-defaults.md)
