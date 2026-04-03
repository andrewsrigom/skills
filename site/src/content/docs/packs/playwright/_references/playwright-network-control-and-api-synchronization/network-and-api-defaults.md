---
title: "Network And API Defaults"
description: "Supporting reference for Playwright Network Control And API Synchronization."
slug: "packs/playwright/playwright-network-control-and-api-synchronization/references/network-and-api-defaults"
sidebar:
  hidden: true
---
> Pack: [`playwright`](/packs/playwright/)
> Parent skill: [Playwright Network Control And API Synchronization](/packs/playwright/playwright-network-control-and-api-synchronization/)
> Source: [`playwright/playwright-network-control-and-api-synchronization/references/network-and-api-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/playwright/playwright-network-control-and-api-synchronization/references/network-and-api-defaults.md)
Default synchronization order:

1. visible UI outcome
2. targeted network contract
3. route interception or API setup only when needed

Good reasons to mock:

- third-party volatility
- rare edge case coverage
- expensive or slow dependency paths

Bad reasons to mock:

- avoiding understanding the real flow
- hiding a flaky app contract
- bypassing broken locators

API setup is good when:

- it creates state faster
- it is not the product surface under test
- it keeps the UI test focused
