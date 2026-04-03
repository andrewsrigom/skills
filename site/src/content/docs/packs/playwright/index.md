---
title: "playwright"
description: "5 skills in the playwright pack."
sidebar:
  label: "Overview"
  order: 0
---
> Pack path: `playwright/`

## Skills

- [Playwright Auth Projects And Isolation](/packs/playwright/playwright-auth-projects-and-isolation/) — Use when reusing authenticated state or modeling multiple user roles in Playwright without leaking state between tests. Covers storage state, setup projects, browser contexts, role-based projects, and the rule that isolation should stay intact even when login is optimized away.
- [Playwright Debugging Traces And Flake Reduction](/packs/playwright/playwright-debugging-traces-and-flake-reduction/) — Use when a Playwright test is flaky, failing only in CI, or needs investigation rather than another retry. Covers traces, inspector, UI mode, codegen cleanup, and turning intermittent failures into concrete synchronization or contract fixes.
- [Playwright Default Test Architecture](/packs/playwright/playwright-default-test-architecture/) — Choose a stable Playwright test architecture before writing more tests. Use when tasks mention Playwright adoption, test folder layout, fixture boundaries, `playwright.config.ts`, projects, retries, parallelism, CI posture, browser coverage, or deciding which Playwright follow-up skill should own the work.
- [Playwright Locators Assertions And User Visible Contracts](/packs/playwright/playwright-locators-assertions-and-user-visible-contracts/) — Use when writing or fixing Playwright tests that should stay stable against UI refactors. Covers locators, actionability, web-first assertions, accessible roles, text and label contracts, and the rule that tests should bind to user-visible semantics before DOM structure.
- [Playwright Network Control And API Synchronization](/packs/playwright/playwright-network-control-and-api-synchronization/) — Use when Playwright tests need stable synchronization with backend behavior or deliberate network control. Covers request waiting, route interception, mocking boundaries, API request contexts, and the rule that tests should not over-mock what they actually need to verify.
