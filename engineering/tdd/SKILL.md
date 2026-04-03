---
name: tdd
description: Use when building a feature or fixing a bug with test-driven development. Covers red-green-refactor, vertical slices, public-interface tests, and sequencing implementation around one behavior at a time.
---

# TDD

Use this skill when the user wants test-first delivery instead of implementation-first iteration.

## Scope

- feature work driven by behavior tests
- bug fixes captured by regression tests
- red-green-refactor sequencing
- public-interface testing instead of implementation-coupled testing
- vertical slices instead of bulk test writing

## Default path

1. Confirm the behavior to protect or add.
2. Pick the thinnest public interface that exposes that behavior.
3. Write one failing test for one behavior.
4. Implement the minimum code to make that test pass.
5. Repeat one slice at a time.
6. Refactor only after the suite is green.

## When to deviate

- Add a characterization or regression test first when the current behavior is unclear but must be preserved.
- Drop to a smaller integration or unit boundary when the end-to-end surface is too slow or noisy to drive tight loops.
- Pause TDD if the contract itself is unresolved and clarify the expected behavior first.

## Guardrails

- Do not write all tests first and all code later.
- Prefer behavior tests over private-method or mock-heavy tests.
- Keep each cycle small enough that the next change is obvious.
- Do not refactor while the suite is red.
- If a behavior is unclear, resolve the contract before adding more tests.

## Avoid

- batching a whole test suite before any implementation
- testing private methods or internals by default
- letting cycles grow until the next step is no longer obvious
- refactoring with a failing suite

## Verification checklist

- one behavior is under test at a time
- the test exercises a public or meaningful interface
- implementation only covers the current failing behavior
- the suite is green before refactoring
- the next slice is obvious from the current state

## Output Shape

When answering with this skill, prefer:

- the next behavior to test
- the public interface under test
- the minimum implementation step
- the follow-up refactor point once green

## Good Triggers

- TDD, red-green-refactor, regression test, test-first, write the failing test first
