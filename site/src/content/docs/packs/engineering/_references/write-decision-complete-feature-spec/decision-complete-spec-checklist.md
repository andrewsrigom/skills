---
title: "Decision-Complete Spec Checklist"
description: "Supporting reference for Write Decision Complete Feature Spec."
slug: "packs/engineering/write-decision-complete-feature-spec/references/decision-complete-spec-checklist"
sidebar:
  hidden: true
---
> Pack: [`engineering`](/packs/engineering/)
> Parent skill: [Write Decision Complete Feature Spec](/packs/engineering/write-decision-complete-feature-spec/)
> Source: [`engineering/write-decision-complete-feature-spec/references/decision-complete-spec-checklist.md`](https://github.com/andrewsrigom/agent-skills/blob/main/engineering/write-decision-complete-feature-spec/references/decision-complete-spec-checklist.md)
Use this checklist to decide whether a spec is ready for implementation.

## The spec is not complete if any of these are unclear

- what problem is being solved
- how success will be judged
- who the user is
- the main happy path
- the main failure path
- permissions or trust boundary
- loading, empty, and error states
- what is explicitly out of scope

## Default sections

1. Goal
2. Success criteria
3. User-facing behavior
4. Scope
5. Non-goals
6. Edge cases and failure behavior
7. Acceptance criteria

## Smells

- “implementation details left to the engineer” on core behavior
- too many alternatives still open
- acceptance criteria that just restate the goal
- spec reads like a brainstorm instead of a contract
