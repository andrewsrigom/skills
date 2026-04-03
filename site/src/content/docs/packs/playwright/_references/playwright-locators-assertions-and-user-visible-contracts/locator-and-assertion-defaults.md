---
title: "Locator And Assertion Defaults"
description: "Supporting reference for Playwright Locators Assertions And User Visible Contracts."
slug: "packs/playwright/playwright-locators-assertions-and-user-visible-contracts/references/locator-and-assertion-defaults"
sidebar:
  hidden: true
---
> Pack: [`playwright`](/packs/playwright/)
> Parent skill: [Playwright Locators Assertions And User Visible Contracts](/packs/playwright/playwright-locators-assertions-and-user-visible-contracts/)
> Source: [`playwright/playwright-locators-assertions-and-user-visible-contracts/references/locator-and-assertion-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/playwright/playwright-locators-assertions-and-user-visible-contracts/references/locator-and-assertion-defaults.md)
Default locator order:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. `getByTestId` only when semantics are weak or intentionally absent

Default assertion posture:

- assert user-visible outcomes
- use `expect(locator)` rather than manual polling
- wait on the state that matters, not on time passing

Good reasons for test IDs:

- non-semantic drag handles
- repeated controls with identical accessible names
- UI with intentionally unstable copy

Bad reasons for test IDs:

- habit
- avoiding accessible markup work
- trying to bypass unstable synchronization
