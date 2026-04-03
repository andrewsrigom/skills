---
name: write-a-skill
description: Use when creating or refining an AI skill. Covers trigger wording, scope boundaries, progressive disclosure, references versus scripts, and keeping `SKILL.md` concise and installable.
---

# Write A Skill

Use this skill when shaping a new skill or improving an existing one.

## Scope

- defining what the skill does and when it should trigger
- writing concise `name` and `description` frontmatter
- splitting core instructions from optional references
- deciding when scripts are worth bundling
- keeping packs coherent instead of overlapping

## Default path

1. Name the capability in terms of one clear job.
2. Write the description so trigger conditions are obvious.
3. Keep `SKILL.md` focused on workflow, routing cues, and guardrails.
4. Move detail into `references/` only when the core file starts bloating.
5. Add `scripts/` only when deterministic automation is genuinely useful.
6. Validate the final skill before publishing it.

## When to deviate

- Split one skill into several only when routing quality clearly improves.
- Keep detail in the main file only when it is essential to the core workflow.
- Add scripts only when they reduce repetitive deterministic work, not just because code is possible.

## Guardrails

- Do not make the description vague.
- Do not turn one skill into a whole framework catalog.
- Do not duplicate the same instruction across multiple packs.
- Prefer one strong workflow over a large pile of examples.
- Keep references one level away from `SKILL.md`.

## Avoid

- vague names and descriptions
- turning one skill into a whole framework catalog
- duplicating coverage across multiple packs
- adding scripts or references with weak justification

## Verification checklist

- the skill has one clear job
- trigger wording is explicit
- core workflow stays in `SKILL.md`
- references and scripts are justified
- the finished skill validates cleanly

## Output Shape

When answering with this skill, prefer:

- skill purpose
- trigger cues
- scope
- workflow
- guardrails
- validation step

## Good Triggers

- write a skill, create a skill, improve this skill, skill description, skill structure
