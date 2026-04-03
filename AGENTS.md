# AGENTS.md

## Purpose

This repo stores reusable OSS skill packs. Keep it optimized for:

- clear skill routing
- easy sharing
- easy installation through `skills.sh`
- repeatable refreshes from current official docs

When andrewsrigom asks to "enforce" something in this repo, default to codifying it here in `AGENTS.md`, not by adding scripts, CI, or automation, unless explicitly requested.

## Repo shape

- Group skills by technology at the repo root, for example `next-intl/` or `stripe/`.
- Each actual skill lives in its own folder and must contain a `SKILL.md`.
- Supporting files inside a skill should usually be limited to:
  - `references/`
  - `scripts/`
  - `assets/`
- Do not add extra docs inside skill folders such as `README.md`, `CHANGELOG.md`, or `QUICK_REFERENCE.md`.
- Reusable repo-level prompt templates belong in `.internal/prompts/`.

## Skill quality bar

- Use `skill-creator` guidance when creating or updating skills.
- Optimize for routing quality first. Split by decision-making surface, not by arbitrary file count.
- Merge overlapping or weakly differentiated skills when one stronger skill would route more cleanly.
- Split overloaded skills when they own too many unrelated decisions.
- Keep `SKILL.md` lean. Move detailed material into targeted `references/`.
- For code-facing skills, include at least one simple usage example directly in `SKILL.md`.
- Avoid duplicate coverage across skills.
- Keep references one level deep from `SKILL.md`. Do not build deep reference chains.
- The folder name and the `name:` in `SKILL.md` frontmatter must match.
- Every maintained skill should include a clear maintenance snapshot with:
  - docs verification date
  - current package or release snapshot when relevant
- Prefer an opinionated execution shape over a docs-summary shape.
- Do not add skills for advice a competent model would already produce reliably without repo-specific guidance.
- New skills should earn their place by reducing common AI failure modes, not by restating obvious setup steps.
- For implementation-facing skills, explicitly state:
  - the default path
  - when to deviate
  - what to avoid
  - how to verify the result

## Preferred skill shape

For new or heavily refreshed skills, prefer this section order in `SKILL.md`:

- `## Scope`
- `## Routing cues`
- `## Default path`
- `## When to deviate`
- `## Guardrails`
- `## Avoid`
- `## Verification checklist`
- optional: `## Quick example`
- `## Current snapshot` or `## Maintenance`
- `## References` or `## Official References`

Notes:

- overview skills can stay lighter, but they should still provide a default path and a verification checklist
- references should support the opinionated guidance, not replace it
- if a skill mainly routes to follow-up skills, make the routing cues and escalation points explicit

## Research rules

- For library refreshes, prefer official docs only.
- Use Context7 and Exa first for documentation and research.
- For non-trivial refreshes, use maximum practical parallel agents and split work by doc domain.
- A good parallel split is usually:
  - overview and releases
  - core concepts and architecture
  - component or API families
  - advanced patterns
  - TypeScript, validation, testing, and tooling
- The coordinator owns the final topology decision, final edits, and final validation after integrating agent work.

## Writing rules

- Write all repo docs in English.
- Keep AGENTS policy concise but operational.
- Keep README user-facing and OSS-friendly.
- Keep `README.md` plain and easy to scan. Do not add decorative flourishes.
- Do not copy large chunks of library docs verbatim. Distill them into routing cues, guardrails, workflows, and references.
- Prefer practical guidance over generic explanation.
- Prefer explicit defaults and anti-patterns over broad option lists.
- Prefer differentiated guardrails over commodity how-to content.
- Avoid “install component X” skills unless the real value is in non-obvious ownership, migration, or integration decisions.

## README responsibilities

`README.md` is the public entrypoint for this repo. Keep it current when any of these change:

- available packs or skill names
- repo structure
- install instructions
- `skills.sh` usage
- major pack scope

The README should stay concrete about this repo:

- GitHub repo: `andrewsrigom/agent-skills` after publishing
- install examples should use the real repo path when possible

## `skills.sh` rules

- Treat `skills.sh` compatibility as a first-class repo concern.
- If repo layout or install docs change, verify local discovery with:

```bash
npx skills add . --list
```

- Keep public install examples aligned with the official CLI shape:

```bash
npx skills add andrewsrigom/agent-skills --all
```

## Validation

Validate every changed skill before calling the work done.

Per-skill validation:

```bash
python3 scripts/validate_skills_repo.py
```

Pack-wide validation from repo root:

```bash
python3 scripts/sync_readme_catalog.py --check
python3 scripts/validate_skills_repo.py
```

Always run:

```bash
git diff --check
```

If you changed only docs or prompts, targeted doc verification is enough:

- `git diff --check`
- targeted readback of changed files
- `npx skills add . --list` if install/discovery guidance changed
- `python3 scripts/sync_readme_catalog.py --check` if README catalog could be affected

## Git safety

- Never commit or push without explicit user approval.
- Do not revert unrelated staged or unstaged changes.
- Do not rename or delete skill folders casually; pack topology changes should be deliberate and reflected in the README.
- Prefer Conventional Commits for this repo.
- Choose commit type by the effect of the change, not by the file extension that changed.
- Use:
  - `feat` for new packs or new skills
  - `refactor` for catalog reshaping, removals, or scope realignment without adding a new capability
  - `docs` for README, site, contribution docs, and other public documentation-only changes
  - `chore` for tooling, CI, automation, or repo maintenance work

## Change patterns

### Adding a new library pack

1. Inspect the official docs topology.
2. Research in parallel by doc domain.
3. Design the smallest strong skill topology that covers the major surfaces.
4. Create skill folders under a root technology folder.
5. Add or refine references.
6. Update `README.md`.
7. Validate all new skills.

### Refreshing an existing pack

1. Check current skill boundaries and stale areas.
2. Verify the latest stable package or release snapshot.
3. Research current docs in parallel.
4. Merge, split, rename, or add skills only when routing improves.
5. Update maintenance snapshots and references.
6. Validate all touched skills.

### Policy-only repo requests

If the user asks for repo management rules, contribution rules, or enforcement wording:

- update `AGENTS.md` first
- update `README.md` too if the policy affects public repo usage or contributor expectations
- avoid adding automation unless the user explicitly asks for it
