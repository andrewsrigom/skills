# Catalog And Checkout Defaults

Catalog default:

- Product = what the customer is buying
- Price = how much and how often Stripe charges
- lookup key = stable app-facing handle when you need indirection

Default pricing path:

1. Start with flat-rate or per-seat pricing if either can express the business cleanly.
2. Add usage-based pricing only when the business model really depends on measured usage.
3. Keep the first catalog small.

Checkout default:

1. Use hosted Checkout Sessions.
2. Create sessions on the server.
3. Pass existing price IDs.
4. Use metadata and client reference IDs only for reconciliation, not authorization.
5. Use webhooks for fulfillment.

Good reasons to stay hosted:

- lower implementation complexity
- built-in payment method support
- easier tax and promotion support
- less UI maintenance

Good reasons to deviate:

- your product needs a deeply embedded custom flow
- the UI constraints are not acceptable
- the business logic truly requires a custom payment collection experience
