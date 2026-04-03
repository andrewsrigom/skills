---
title: "Write Decision Complete Feature Spec"
description: "Use when a feature needs a real implementation spec before coding starts. Covers goal and success criteria, user-facing behavior, boundaries, non-goals, edge cases, acceptance checks, and the rule that the spec should remove implementation guesswork instead of just sounding thorough."
---
> Pack: [`engineering`](/packs/engineering/)
> Source: [`engineering/write-decision-complete-feature-spec/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/engineering/write-decision-complete-feature-spec/SKILL.md)
Use this skill when the team needs a spec that closes decisions before implementation, not a polished document full of unresolved choices.

## Scope

- feature specs before implementation
- reducing ambiguity before coding starts
- locking scope, success criteria, and boundaries
- identifying missing decisions that would otherwise be invented during implementation
- turning vague requests into implementation-ready specs

## Default path

1. State the feature goal in plain language.
2. Name the success criteria and who will judge them.
3. Define the user-facing behavior and the main flow first.
4. Lock scope, non-goals, and ownership boundaries.
5. Identify high-risk ambiguities:
   - data shape
   - permissions
   - failure behavior
   - loading and empty states
   - rollout or migration impact
6. Resolve those ambiguities in the spec instead of leaving them to implementation.
7. End with concrete acceptance criteria and verification steps.

## When to deviate

- Keep the spec lightweight when the feature is tiny and the boundary is already obvious.
- Split the work into multiple specs if one document is trying to cover unrelated surfaces.
- Route to `request-refactor-plan` instead when the work is primarily structural rather than behavioral.
- Route to `tdd` once the contract is already stable and the next problem is implementation sequencing.

## Guardrails

- Do not call a spec complete if the implementer still has to choose core behavior.
- Prefer decisions over option lists once enough context exists.
- Keep the spec behavior-first; do not start with file layout or implementation trivia.
- Separate in-scope decisions from future ideas and nice-to-haves.
- Make non-goals explicit so the spec cannot silently expand during delivery.

## Avoid

- specs that mostly restate the prompt without making decisions
- “TBD” in core behavior, permissions, or error handling
- mixing rollout notes, architecture notes, and product behavior into one vague blob
- turning the spec into a task list before the contract is actually stable
- using broad phrases like “handle edge cases” without naming the actual cases

## Verification checklist

- the feature goal is explicit
- success criteria are measurable enough to judge completion
- main user-facing behavior is specified
- scope and non-goals are clear
- core edge cases and failure behavior are named
- acceptance criteria are concrete enough to implement against

## Output Shape

When answering with this skill, prefer:

- feature goal
- success criteria
- target user or audience
- main flow
- scope and non-goals
- decisions that are now locked
- acceptance criteria

## Good Triggers

- write a feature spec, make this decision complete, spec this before coding, tighten this product brief, implementation-ready spec

## References

- [Decision-complete spec checklist](/packs/engineering/write-decision-complete-feature-spec/references/decision-complete-spec-checklist/)