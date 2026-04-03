---
name: triage-issue
description: Use when investigating a bug before fixing it. Covers fast diagnosis, root-cause tracing, narrowing repro paths, checking adjacent code and tests, and producing a concrete fix plan instead of guessing.
---

# Triage Issue

Use this skill when the task is to understand a bug clearly before implementation starts.

## Scope

- bug reports without a confirmed cause
- regressions with unclear entry points
- flaky or intermittent failures
- codebase exploration before opening a fix branch
- turning a vague symptom into a concrete repair plan

## Default path

1. Restate the user-visible failure in one sentence.
2. Identify the entry point: UI, API, job, CLI, or background process.
3. Trace the code path until the symptom turns into a concrete failure point.
4. Compare expected behavior, actual behavior, and missing guardrails.
5. Check existing tests and adjacent implementations for the intended pattern.
6. Produce the smallest credible fix plan.

## When to deviate

- Go deeper into instrumentation or logs when the issue is intermittent and the normal code path is not enough.
- Reclassify the issue as a feature gap if the “bug” is really missing behavior rather than broken behavior.
- Move to implementation only after the failing contract and repair scope are clear.

## Guardrails

- Do not jump into random edits before locating the failing contract.
- Do not stop at the symptom if the root cause is deeper in the flow.
- Prefer a reproducible path over speculation.
- Separate diagnosis from implementation so the repair scope stays clear.
- If the issue is really a missing feature, say so explicitly.

## Avoid

- editing code before the failing contract is clear
- stopping at the visible symptom when the deeper cause is reachable
- speculating without a reproducible path
- blurring diagnosis with implementation planning

## Verification checklist

- the failure is restated clearly
- the entry point is identified
- the root cause is distinguished from the symptom
- an appropriate test to lock the fix is named
- the smallest credible implementation path is described

## Output Shape

When answering with this skill, prefer:

- problem summary
- root cause
- affected boundary
- recommended test to add
- smallest implementation path

## Good Triggers

- triage this bug, investigate this issue, root cause, why is this failing, diagnose before fixing
