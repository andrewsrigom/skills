---
title: "Default Architecture And Skill Boundaries"
description: "Supporting reference for Stripe Integration Defaults And Routing."
slug: "packs/stripe/stripe-integration-defaults-and-routing/references/default-architecture-and-boundaries"
sidebar:
  hidden: true
---
> Pack: [`stripe`](/packs/stripe/)
> Parent skill: [Stripe Integration Defaults And Routing](/packs/stripe/stripe-integration-defaults-and-routing/)
> Source: [`stripe/stripe-integration-defaults-and-routing/references/default-architecture-and-boundaries.md`](https://github.com/andrewsrigom/agent-skills/blob/main/stripe/stripe-integration-defaults-and-routing/references/default-architecture-and-boundaries.md)
Use this pack as the opinionated implementation layer.

Use Stripe's own MCP and agent tooling for:

- live account inspection
- object creation in a real Stripe account
- product lookup across current docs and support content
- API upgrade assistance tied to the Stripe platform

Use this pack for app-side implementation choices:

- how to model products and prices in the app
- whether to start with hosted Checkout or a more custom flow
- how to structure webhook ownership and billing state
- when to default to the customer portal
- what local test loop to use during development

Default architecture:

1. Stripe owns payment collection, invoicing, and billing object state.
2. Your server owns creation of sessions, subscriptions, portal sessions, and webhook processing.
3. Your app database stores the minimum internal projection needed for authorization, UI, and reporting.
4. Webhooks reconcile Stripe state back into the app.
5. Customer self-serve billing goes through the portal unless there is a strong product reason not to.

Good first path for most SaaS apps:

- dashboard-managed products and prices
- hosted Checkout for signup or upgrade
- server-created Checkout Sessions
- webhook-driven entitlement or access sync
- customer portal for plan changes and billing management
- Stripe CLI for local webhook forwarding
