# agent-skills

Opinionated skill packs for coding agents, libraries, and engineering workflows.

Maintained by [@andrewsrigom](https://github.com/andrewsrigom).

This repo publishes reusable, installable skills grouped by pack.

The goal is not to mirror vendor docs. The goal is to keep agents on a sane implementation path with explicit defaults, guardrails, anti-patterns, and verification steps.

<!-- catalog-summary:start -->
Current catalog: 63 skills across library packs and workflow packs.
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

## Catalog

Full catalog site: `https://andrewsrigom.github.io/agent-skills/`

## Library Packs

<!-- library-packs:start -->
- `better-auth` (5 skills)
- `documentation` (1 skill)
- `drizzle-orm` (6 skills)
- `fastify` (2 skills)
- `lucide-react` (3 skills)
- `next-intl` (4 skills)
- `nextjs` (6 skills)
- `nodejs` (2 skills)
- `performance` (3 skills)
- `playwright` (5 skills)
- `react` (1 skill)
- `security` (4 skills)
- `shadcn` (5 skills)
- `stripe` (5 skills)
- `typescript` (1 skill)
<!-- library-packs:end -->

## Workflow Packs

<!-- workflow-packs:start -->
- `engineering` (9 skills)
- `skilling` (1 skill)
<!-- workflow-packs:end -->

For the current installable list, use `npx skills add . --list`, browse the pack folders directly, or use the public site.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution rules, workflow, and validation commands.

## Project Docs

- [Contributing guide](./CONTRIBUTING.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)
- [License](./LICENSE)
