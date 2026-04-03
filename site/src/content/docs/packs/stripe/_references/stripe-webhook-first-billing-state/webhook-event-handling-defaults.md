---
title: "Webhook Event Handling Defaults"
description: "Supporting reference for Stripe Webhook First Billing State."
slug: "packs/stripe/stripe-webhook-first-billing-state/references/webhook-event-handling-defaults"
sidebar:
  hidden: true
---
> Pack: [`stripe`](/packs/stripe/)
> Parent skill: [Stripe Webhook First Billing State](/packs/stripe/stripe-webhook-first-billing-state/)
> Source: [`stripe/stripe-webhook-first-billing-state/references/webhook-event-handling-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-webhook-first-billing-state/references/webhook-event-handling-defaults.md)
Default responsibilities:

1. verify signature
2. parse event
3. record receipt or dedupe key
4. map event to the internal billing projection
5. trigger access or follow-up work

Default event set for a normal SaaS subscription flow:

- `checkout.session.completed`
- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Use more events only when the product needs them.

State ownership rule:

- Stripe owns billing object truth
- your app owns the minimum projection needed for authorization and UI

Idempotency rule:

- request-side writes to Stripe should use idempotency keys when retries are possible
- webhook-side processing should be safe to run more than once

Local loop:

1. run the app locally
2. use Stripe CLI to forward events to the webhook endpoint
3. trigger sandbox payments or subscription changes
4. verify the internal projection updates exactly once
