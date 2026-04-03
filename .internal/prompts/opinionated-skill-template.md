# Opinionated Skill Template

Use this repo-level template when creating or heavily refreshing a skill in this project.

The goal is not to summarize docs. The goal is to give the agent a strong default path with clear boundaries.

## Recommended section order

```md
---
name: <folder-name>
description: <routing-quality description>
---

# <Human Title>

Short statement of when to use this skill.

## Scope

- what this skill owns

## Routing cues

- trigger phrases -> this skill
- adjacent concerns -> route to sibling skill

## Default path

1. preferred implementation path
2. preferred defaults
3. preferred sequencing

## When to deviate

- when the default path is wrong
- what condition justifies the deviation

## Guardrails

- non-negotiable rules

## Avoid

- common AI mistakes
- anti-patterns
- tempting but wrong shortcuts

## Verification checklist

- concrete checks to confirm a good result

## Quick example

Small example only if it materially improves implementation quality.

## Current snapshot

- docs verification date
- package or release snapshot when relevant

## References

- targeted official references
```

## Writing rules

- prefer one strong default over many equivalent options
- say what to avoid, not only what to do
- keep routing cues explicit when sibling skills exist
- use official docs as source material, then compress into decisions
- keep examples short and practical

## Heuristic

If the skill reads like a documentation tour, it is too passive.

If the skill helps the agent choose a good implementation path quickly, it is on the right track.
