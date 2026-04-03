---
title: "stripe"
description: "5 skills in the stripe pack."
sidebar:
  label: "Overview"
  order: 0
---
> Pack path: `stripe/`

## Skills

- [Stripe Checkout And Pricing Model Defaults](/packs/stripe/stripe-checkout-and-pricing-model-defaults/) — Use when modeling products and prices or implementing Stripe Checkout with sane defaults. Covers products, prices, lookup keys, Checkout Sessions, hosted checkout as the default path, and the boundary between checkout UX and webhook-based fulfillment.
- [Stripe Customer Portal Defaults](/packs/stripe/stripe-customer-portal-defaults/) — Use when implementing Stripe's customer portal as the default self-serve billing surface. Covers portal configuration, product-catalog boundaries for upgrades and downgrades, portal session creation, deep links, and webhook-driven sync after customers manage their own billing.
- [Stripe Integration Defaults And Routing](/packs/stripe/stripe-integration-defaults-and-routing/) — Choose the right Stripe implementation path without competing with Stripe's own MCP or agent tooling. Use when tasks mention first-time Stripe integration, billing architecture, hosted checkout vs custom flows, webhook ownership, customer portal, sandboxes, Stripe CLI, or deciding which Stripe follow-up skill should own the work.
- [Stripe Subscriptions Lifecycle And Entitlements](/packs/stripe/stripe-subscriptions-lifecycle-and-entitlements/) — Use when implementing Stripe subscriptions beyond the initial checkout shape. Covers subscription statuses, `payment_behavior`, invoices, retries, upgrades and downgrades, cancellation timing, and using Stripe entitlements as the default feature-mapping model when plan access is non-trivial.
- [Stripe Webhook First Billing State](/packs/stripe/stripe-webhook-first-billing-state/) — Use when implementing Stripe webhooks, billing-state synchronization, or post-payment fulfillment. Covers signature verification, idempotent event handling, durable projections of Stripe state, and the rule that redirects and client events are not the source of truth.
