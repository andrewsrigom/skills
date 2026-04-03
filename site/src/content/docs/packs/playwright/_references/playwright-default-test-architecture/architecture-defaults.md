---
title: "Architecture Defaults"
description: "Supporting reference for Playwright Default Test Architecture."
slug: "packs/playwright/playwright-default-test-architecture/references/architecture-defaults"
sidebar:
  hidden: true
---
> Pack: [`playwright`](/packs/playwright/)
> Parent skill: [Playwright Default Test Architecture](/packs/playwright/playwright-default-test-architecture/)
> Source: [`playwright/playwright-default-test-architecture/references/architecture-defaults.md`](https://github.com/andrewsrigom/agent-skills/blob/main/playwright/playwright-default-test-architecture/references/architecture-defaults.md)
Default suite posture:

1. one config file
2. a small number of projects
3. tests grouped by feature or journey
4. shared setup in fixtures
5. retries used sparingly

Good fixture responsibilities:

- authenticated session bootstrap
- test data bootstrap
- page-object-like helpers only when they remove real repetition

Bad fixture responsibilities:

- hiding the entire test story
- branching heavily by feature
- owning business logic assertions

Default CI stance:

- retries can exist
- traces on retry or failure
- deterministic environment first
- parallelism tuned to infra stability, not maximized blindly
