# Contributing

Thanks for contributing.

This repo is intentionally optimized for reusable, installable skill packs. Good contributions improve routing quality, factual accuracy, and installation reliability.

## What to contribute

- new library packs grounded in official docs
- refreshes for existing packs when docs or releases change
- better routing boundaries between overlapping skills
- tighter references, examples, or install guidance
- README updates when public pack inventory or install flow changes

## Before you start

1. Check the current pack topology in `README.md`.
2. Read `AGENTS.md` for repo rules.
3. Prefer official documentation only for research.
4. Keep the pack small and strongly separated by decision surface.

## Pack design rules

- Group skills by technology at the repo root.
- Each skill must live in its own folder and contain a `SKILL.md`.
- Keep `SKILL.md` lean and move detail into `references/`.
- Use `scripts/` only when deterministic automation is truly useful.
- Avoid overlapping skills unless the split materially improves routing.
- Keep folder names and `name:` frontmatter exactly aligned.
- Prefer opinionated implementation guidance over neutral docs summaries.
- Do not add skills whose advice is mostly obvious setup the model would likely infer correctly anyway.
- Prefer skills that prevent common implementation drift, bad defaults, or integration mistakes.

## Expected shape

A good pack usually has:

- one overview-and-routing skill
- a few domain skills split by decision surface
- references grounded in official docs
- a clear docs snapshot or release snapshot in each maintained skill

A good maintained skill usually has:

- a clear `Default path`
- a short `When to deviate`
- explicit `Guardrails`
- an `Avoid` section for common AI mistakes
- a `Verification checklist`

## Validation

Run from repo root:

```bash
python3 scripts/sync_readme_catalog.py --check
python3 scripts/validate_skills_repo.py
git diff --check
npx skills add . --list
```

If you changed packs or skill counts, run:

```bash
python3 scripts/sync_readme_catalog.py
```

## README responsibilities

Update `README.md` whenever any of these change:

- available packs or skill names
- repo structure
- install instructions
- contribution expectations that affect users

## Pull requests

Please keep PRs focused.

This repo uses Conventional Commits. Prefer:

- `feat` for new packs or new skills
- `refactor` for catalog reshaping, removals, or scope realignment
- `docs` for README, site, or contribution docs only
- `chore` for tooling, CI, or maintenance work

A good PR description should include:

- what pack or skills changed
- docs snapshot date
- what routing decisions changed, if any
- validation commands you ran

## What not to add

- generic prompt dumps with weak routing value
- obvious setup-only skills with little opinionated value
- large copied chunks of upstream docs
- extra skill-local docs like `README.md` or `CHANGELOG.md`
- broad pack expansions without a clear ownership split

## Good first contributions

- `stripe`
- `clerk`
- `playwright`
- `resend`
- `neon-postgres`
