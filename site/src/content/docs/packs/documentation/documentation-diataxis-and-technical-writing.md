---
title: "Documentation Diataxis And Technical Writing"
description: "Use when creating, restructuring, or reviewing technical documentation. Covers Diataxis-style doc types, deciding between tutorial, how-to, reference, and explanation, and keeping docs aligned to audience and intent."
---
> Pack: [`documentation`](/packs/documentation/)
> Source: [`documentation/documentation-diataxis-and-technical-writing/SKILL.md`](https://github.com/andrewsrigom/agent-skills/blob/main/documentation/documentation-diataxis-and-technical-writing/SKILL.md)
Use this skill when the task is about writing better docs, not just writing more docs.

## Scope

- deciding whether content is tutorial, how-to, reference, or explanation
- restructuring mixed or confusing docs
- improving developer docs, API docs, and product docs
- separating learning content from lookup content
- tightening doc tone, headings, and expected reader assumptions

## Default path

1. Identify the audience and what they need right now.
2. Pick one primary doc type:
   - tutorial for learning by doing
   - how-to for solving one concrete task
   - reference for factual lookup
   - explanation for conceptual understanding
3. Remove content that belongs to a different doc type.
4. Keep titles, headings, and examples consistent with the chosen doc type.
5. Cross-link to adjacent docs instead of cramming every need into one page.

## When to deviate

- Blend doc types only when the page has a very narrow reason to do so and the structure makes the boundary explicit.
- Use a tutorial only when the reader should learn by doing, not just complete one task.
- Route to reference style when factual lookup is the dominant user need.

## Guardrails

- Do not mix tutorial steps with long conceptual digressions.
- Do not hide reference facts inside narrative prose.
- Do not assume a beginner audience unless the doc is explicitly a tutorial.
- Keep examples short and directly tied to the page goal.
- Prefer one clear doc purpose over a document that tries to do everything.

## Avoid

- mixing tutorial steps with long explanation sections
- burying lookup facts in narrative prose
- writing for beginners by default when the audience is unclear
- trying to make one page serve every doc type

## Verification checklist

- one primary doc type is chosen
- the audience is explicit
- content from other doc types is cut or moved
- headings and examples support the chosen purpose
- adjacent needs are handled through links instead of stuffing more into the page

## Output Shape

When answering with this skill, prefer:

- recommended doc type
- target audience
- proposed structure
- what to cut, move, or rewrite
- one short example of the improved direction

## Good Triggers

- documentation, docs structure, tutorial vs how-to, reference docs, explanation page, Diataxis, technical writing