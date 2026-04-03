# Create Skills From Library Docs

A reusable prompt for creating or refreshing a skill pack for any library based on its current official documentation.

Use this when you want an LLM agent to:

- research a library deeply
- split work across many parallel agents
- decide whether skills should be merged, split, renamed, or newly created
- produce a high-quality skill pack with good routing and strong references

## How to use it

1. Replace the placeholders like `<LIBRARY_NAME>` and `<TARGET_REPO_OR_FOLDER>`.
2. If you already know the official docs URL, add it directly.
3. Give the agent the current repo path where the skills should be written.
4. Ask it to validate all changed skills at the end.

## Prompt

```text
[$skill-creator](ABSOLUTE_PATH_TO_SKILL_CREATOR_SKILL)

You are updating or creating a reusable skill pack for <LIBRARY_NAME> in <TARGET_REPO_OR_FOLDER>.

Goal:
Create the highest-quality skill pack possible for <LIBRARY_NAME> based on the current official docs. Cover all major topics from the docs. Use maximum parallel agents for research and implementation. Improve the topology if needed: merge weak or overlapping skills, split overloaded skills, rename vague skills, and create new ones when that improves routing and usability.

Hard requirements:
- Use the skill-creator workflow and best practices.
- Prefer official docs only. Use Context7 and Exa for documentation and research.
- Use maximum parallel agents immediately.
- Split research by doc domain, not randomly.
- Keep SKILL.md files lean. Put detailed material in targeted references.
- Avoid duplicate coverage between skills.
- Optimize for skill routing quality: clear triggers, scope boundaries, guardrails, and references.
- If a current split is already strong, keep it. Do not churn topology without a clear benefit.
- Add maintenance snapshots with exact checked date and current library version.
- Validate every changed skill at the end.

Workflow:
1. Inspect the existing skill pack and map current skills, references, overlaps, and gaps.
2. Discover the current official docs structure and latest stable version for <LIBRARY_NAME>.
3. Spawn maximum parallel agents.
4. Assign each agent one clear doc slice, for example:
   - overview / getting started / release notes
   - core architecture and concepts
   - major component or API families
   - advanced patterns / server runtime / routing / plugin tooling
   - TypeScript / validation / testing
   - migration / workflows / operations
5. Require every agent to:
   - use official docs only
   - report current recommended topology
   - list missing coverage and stale guidance
   - identify merge, split, and rename opportunities
   - cite exact doc pages used
6. Synthesize the findings and decide the final skill topology.
7. Update the skills:
   - concise frontmatter name and description
   - clean routing cues
   - clear scope ownership
   - workflow section
   - guardrails and footguns
   - canonical APIs or concepts
   - maintenance snapshot
   - targeted references only where needed
8. Update repo-level docs if the pack structure changed.
9. Validate every skill with the skill validator.
10. Run a diff hygiene check.
11. Return a final overview with:
   - research summary
   - final topology
   - what changed and why
   - current library version and docs snapshot date
   - validation results
   - remaining risks or drift-prone areas

Quality bar:
- Prefer a small number of strong, well-separated skills over many fuzzy ones.
- Split when one skill owns too many unrelated decisions.
- Merge when two skills are too small or too coupled to route cleanly.
- Make the pack feel like an expert operator guide, not copied docs.
- Keep the result maintainable for future refreshes.
```

## Notes

- This prompt works best when the target repo already has some skill structure to improve.
- For large libraries, encourage the agent to keep `SKILL.md` concise and move detailed material into `references/`.
- For fast-moving libraries, tell the agent to record the exact date and version snapshot it verified.
