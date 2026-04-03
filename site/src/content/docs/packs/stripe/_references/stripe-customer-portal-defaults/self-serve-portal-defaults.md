---
title: "Self-Serve Portal Defaults"
description: "Supporting reference for Stripe Customer Portal Defaults."
slug: "packs/stripe/stripe-customer-portal-defaults/references/self-serve-portal-defaults"
sidebar:
  hidden: true
---
> Pack: [`stripe`](/packs/stripe/)
> Parent skill: [Stripe Customer Portal Defaults](/packs/stripe/stripe-customer-portal-defaults/)
> Source: [`stripe/stripe-customer-portal-defaults/references/self-serve-portal-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-customer-portal-defaults/references/self-serve-portal-defaults.md)
Default customer-portal stance:

- use the portal first
- configure capabilities in Stripe
- launch sessions from your app
- reconcile results with webhooks

Good default capabilities:

- update payment methods
- view invoices and billing history
- upgrade or downgrade within an approved catalog
- cancel or schedule cancellation

Session creation default:

1. authenticate the user in your app
2. resolve the correct Stripe customer ID
3. create the portal session on the server
4. redirect to the returned short-lived URL
5. handle resulting changes through webhooks

Good reasons to customize beyond the default:

- the app needs workflows the portal cannot express
- different customer segments need materially different configurations
- the product needs deep links into specific portal actions
