---
name: typescript-advanced-types-and-error-diagnosis
description: Use when debugging TypeScript type errors or designing stronger types. Covers generic constraints, inference failures, narrowing, utility types, mapped and conditional types, and replacing weak typing with precise contracts.
---

# TypeScript Advanced Types And Error Diagnosis

Use this skill when the problem is type-system design or compiler diagnostics, not general app architecture.

## Scope

- diagnosing `tsc` errors
- generic constraints and inference issues
- narrowing `unknown` safely
- replacing `any` with precise types
- mapped, conditional, and template literal types
- utility types and reusable type helpers

## Default path

1. Run or inspect `tsc --noEmit` output first.
2. Find the real type boundary where inference breaks down.
3. Decide whether the problem is:
   - missing constraint
   - weak input type
   - bad generic design
   - incorrect narrowing
   - mismatched runtime shape
4. Fix the contract at the narrowest stable boundary.
5. Re-run type checking after the change.

## When to deviate

- Simplify the runtime or API shape when the type problem is a symptom of an overly complex interface.
- Use assertions only when the runtime boundary has already validated the shape and the type system cannot see it.
- Move to framework or app-architecture skills when the issue is not really type-system design.

## Guardrails

- Do not patch errors with `as any`.
- Prefer better input and return types over layered assertions.
- Use `unknown` plus narrowing when the runtime shape is not trusted.
- Keep generics readable; clever types are not automatically better types.
- If a simpler interface removes the complex type problem, prefer the simpler interface.

## Avoid

- patching errors with `as any`
- stacking assertions instead of fixing the contract
- using unreadable generic tricks when a simpler type would work
- trusting unvalidated runtime shapes

## Verification checklist

- the real failing type boundary is identified
- the chosen fix improves the contract rather than silencing the error
- narrowing is used where runtime shape is uncertain
- generics stay readable
- type checking passes after the change

## Output Shape

When answering with this skill, prefer:

- root cause of the type error
- safer target type shape
- the exact generic or narrowing fix
- tradeoff between strictness and usability

## Good Triggers

- TypeScript error, generics, inference, conditional types, mapped types, utility types, remove any, type guard
