# agent-skills

Opinionated skill packs for coding agents, libraries, and engineering workflows.

This repo publishes reusable, installable skills grouped by pack. The goal is not to mirror vendor docs. The goal is to keep agents on a sane implementation path with explicit defaults, guardrails, anti-patterns, and verification steps.

Every maintained skill is expected to stay focused on decisions that help an agent ship work without drifting:

- a clear default path
- when to deviate from that default
- what to avoid
- how to verify the result

<!-- catalog-summary:start -->
Current catalog: 52 skills across library packs and workflow packs.
<!-- catalog-summary:end -->

## Install

This repo is compatible with [`skills.sh`](https://skills.sh/) and the [`skills` CLI](https://skills.sh/docs/cli).

Browse the catalog:

```bash
npx skills add andrewsrigom/agent-skills --list
```

Install everything from GitHub:

```bash
npx skills add andrewsrigom/agent-skills --all
```

Install a single skill:

```bash
npx skills add https://github.com/andrewsrigom/agent-skills/tree/main/nextjs/nextjs-overview-and-app-router
```

Work from a local clone:

```bash
npx skills add . --list
npx skills add . --all
```

Useful flags:

- `--skill` installs only selected skills
- `-g` installs globally instead of project-local
- `--copy` copies files instead of symlinking

If you do not want to use the CLI, clone the repo and copy or symlink the pack or skill folders into your agent's supported skills directory.

## Public Site

This repo also includes a static catalog in `site/` built with Astro Starlight for GitHub Pages.

- expected Pages URL after publish: `https://andrewsrigom.github.io/agent-skills/`
- source of truth stays in the repo root; the site is generated from `README.md`, `SKILL.md`, and `references/*.md`
- deployment is handled by `.github/workflows/deploy-pages.yml`

Build it locally:

```bash
cd site
npm install
npm run dev
```

## Library Packs

<!-- library-packs:start -->
- `better-auth` (5 skills)
- `documentation` (1 skill)
- `drizzle-orm` (6 skills)
- `fastify` (2 skills)
- `lucide-react` (3 skills)
- `next-intl` (4 skills)
- `nextjs` (5 skills)
- `nodejs` (1 skill)
- `playwright` (5 skills)
- `shadcn` (5 skills)
- `stripe` (5 skills)
- `typescript` (1 skill)
<!-- library-packs:end -->

## Workflow Packs

<!-- workflow-packs:start -->
- `engineering` (8 skills)
- `skilling` (1 skill)
<!-- workflow-packs:end -->

For the current installable list, use `npx skills add . --list` or browse the pack folders directly.

## Layout

Skills are grouped by pack at the repo root.

```text
<pack>/
  <skill>/
    SKILL.md
    references/
    scripts/
    assets/
```

Packs stay split by decision surface instead of bundling everything into one large prompt.

The public catalog renderer lives in `site/`, uses Starlight's standard documentation layout, and does not change the installable skill layout.

## Contributing

Contributions should strengthen routing quality and implementation quality, not just add more text.

- use official docs first
- keep pack boundaries and skill boundaries clear
- keep `SKILL.md` lean and move detail into targeted references
- prefer explicit defaults and anti-patterns over option lists
- validate changed skills before opening a PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow and validation commands.

## Project Docs

- [Contributing guide](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)
- [License](./LICENSE)
