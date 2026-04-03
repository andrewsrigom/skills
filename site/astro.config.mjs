import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(__dirname, "..");

const repositoryFullName =
  process.env.SITE_REPOSITORY || process.env.GITHUB_REPOSITORY || "andrewsrigom/agent-skills";
const [repositoryOwner, repositoryName] = repositoryFullName.split("/");
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const site = process.env.SITE_URL || `https://${repositoryOwner}.github.io`;
const base =
  process.env.SITE_BASE_PATH ||
  (isGithubPagesBuild && repositoryName ? `/${repositoryName}` : undefined);

const ignoredRootEntries = new Set([
  ".git",
  ".github",
  ".internal",
  ".pytest_cache",
  "__pycache__",
  "dist",
  "node_modules",
  "scripts",
  "site",
]);

const packSlugs = fs
  .readdirSync(repoDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !ignoredRootEntries.has(name) && !name.startsWith("."))
  .filter((name) =>
    fs
      .readdirSync(path.join(repoDir, name), { withFileTypes: true })
      .some((child) => child.isDirectory() && fs.existsSync(path.join(repoDir, name, child.name, "SKILL.md"))),
  )
  .sort((left, right) => left.localeCompare(right));

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "agent-skills",
      description:
        "Opinionated, installable skill packs for coding agents, libraries, and engineering workflows.",
      favicon: "/favicon.svg",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: `https://github.com/${repositoryFullName}`,
        },
      ],
      sidebar: [
        { label: "Home", slug: "index" },
        {
          label: "Project docs",
          items: [
            { label: "About", slug: "project/about" },
            { label: "Contributing", slug: "project/contributing" },
            { label: "Code of conduct", slug: "project/code-of-conduct" },
            { label: "License", slug: "project/license" },
          ],
        },
        {
          label: "Skill packs",
          items: packSlugs.map((packSlug) => ({
            label: packSlug,
            autogenerate: { directory: `packs/${packSlug}` },
          })),
        },
      ],
    }),
  ],
});
