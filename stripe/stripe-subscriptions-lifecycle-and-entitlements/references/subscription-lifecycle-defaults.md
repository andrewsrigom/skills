# Subscription Lifecycle Defaults

Default activation model:

- `trialing` = okay to provision trial access
- `active` = okay to provision paid access
- `incomplete` = payment still unresolved, do not treat as fully active
- `incomplete_expired` = failed activation, do not provision
- `past_due` = access policy depends on the product, but do not ignore it
- `unpaid` = normally revoke or restrict access
- `canceled` = terminal state

Default API creation posture:

- prefer `payment_behavior=default_incomplete`
- expect the first invoice to determine activation
- use webhook-confirmed changes for access control

Entitlements default:

1. create features in Stripe
2. attach features to products
3. listen for entitlement summary updates
4. persist the internal access projection for fast authorization checks

Use a simpler model only when plan gating is truly coarse-grained.
