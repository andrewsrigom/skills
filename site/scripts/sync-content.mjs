import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import kleur from "kleur";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(__dirname, "..");
const repoDir = path.resolve(siteDir, "..");
const docsDir = path.join(siteDir, "src", "content", "docs");
const projectDocsDir = path.join(docsDir, "project");
const packsDocsDir = path.join(docsDir, "packs");

const repositoryFullName =
  process.env.SITE_REPOSITORY || process.env.GITHUB_REPOSITORY || "andrewsrigom/agent-skills";
const [repositoryOwner] = repositoryFullName.split("/");
const repositoryBranch = process.env.GITHUB_REF_NAME || process.env.SITE_BRANCH || "main";
const repositoryUrl = `https://github.com/${repositoryFullName}`;

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

const projectDocs = [
  {
    sourcePath: "README.md",
    outputPath: "project/about.md",
    title: "About the project",
    description: "Public overview, install flow, and catalog context for this repo.",
    sidebarLabel: "About",
  },
  {
    sourcePath: "CONTRIBUTING.md",
    outputPath: "project/contributing.md",
    title: "Contributing",
    description: "Contribution workflow, validation commands, and pack design rules.",
    sidebarLabel: "Contributing",
  },
  {
    sourcePath: "CODE_OF_CONDUCT.md",
    outputPath: "project/code-of-conduct.md",
    title: "Code of conduct",
    description: "Expected community behavior for issues, discussions, and pull requests.",
    sidebarLabel: "Code of conduct",
  },
  {
    sourcePath: "LICENSE",
    outputPath: "project/license.md",
    title: "License",
    description: "Repository license terms.",
    sidebarLabel: "License",
  },
];

async function main() {
  const catalog = await collectCatalog();
  const routeMap = buildRouteMap(catalog);

  await fs.rm(projectDocsDir, { recursive: true, force: true });
  await fs.rm(packsDocsDir, { recursive: true, force: true });
  await ensureDir(projectDocsDir);
  await ensureDir(packsDocsDir);

  await writeHomePage(catalog);
  await writeProjectDocs(catalog.projectDocs, routeMap);
  await writePackPages(catalog.packs, routeMap);

  console.log(
    kleur.green(
      `Synced ${catalog.packCount} packs, ${catalog.skillCount} skills, and ${catalog.referenceCount} references into Starlight docs.`,
    ),
  );
}

async function collectCatalog() {
  const packDirs = await fs.readdir(repoDir, { withFileTypes: true });
  const packs = [];
  let skillCount = 0;
  let referenceCount = 0;

  for (const packEntry of packDirs) {
    if (!packEntry.isDirectory()) continue;
    if (ignoredRootEntries.has(packEntry.name) || packEntry.name.startsWith(".")) continue;

    const packPath = path.join(repoDir, packEntry.name);
    const skillEntries = await fs.readdir(packPath, { withFileTypes: true });
    const skills = [];

    for (const skillEntry of skillEntries) {
      if (!skillEntry.isDirectory()) continue;

      const skillFilePath = path.join(packPath, skillEntry.name, "SKILL.md");
      if (!(await exists(skillFilePath))) continue;

      const raw = await fs.readFile(skillFilePath, "utf8");
      const parsed = matter(raw);
      const skillTitle = stripInlineCode(extractHeading(parsed.content) || skillEntry.name);
      const referencesDir = path.join(packPath, skillEntry.name, "references");
      const references = [];

      if (await exists(referencesDir)) {
        const referenceFiles = await collectMarkdownFiles(referencesDir);

        for (const referenceFile of referenceFiles) {
          const referenceRaw = await fs.readFile(referenceFile, "utf8");
          const referenceParsed = matter(referenceRaw);
          const referenceTitle = stripInlineCode(
            extractHeading(referenceParsed.content) ||
              path.basename(referenceFile, path.extname(referenceFile)),
          );
          const referenceSlug = slugifyPath(
            path.relative(referencesDir, referenceFile).replace(/\.(md|mdx)$/i, ""),
          );
          const referenceRepoPath = toRepoPath(referenceFile);

          references.push({
            title: referenceTitle,
            description: `Supporting reference for ${skillTitle}.`,
            sourceRepoPath: referenceRepoPath,
            routePath: `/packs/${packEntry.name}/${skillEntry.name}/references/${referenceSlug}/`,
            body: referenceParsed.content,
            slug: `packs/${packEntry.name}/${skillEntry.name}/references/${referenceSlug}`,
          });
        }
      }

      skills.push({
        slug: skillEntry.name,
        title: skillTitle,
        description:
          parsed.data.description ||
          `Browsable skill for ${skillEntry.name} inside the ${packEntry.name} pack.`,
        sourceRepoPath: toRepoPath(skillFilePath),
        routePath: `/packs/${packEntry.name}/${skillEntry.name}/`,
        body: parsed.content,
        references: references.sort((left, right) => left.title.localeCompare(right.title)),
      });
      skillCount += 1;
      referenceCount += references.length;
    }

    if (skills.length === 0) continue;

    packs.push({
      slug: packEntry.name,
      title: packEntry.name,
      routePath: `/packs/${packEntry.name}/`,
      skills: skills.sort((left, right) => left.title.localeCompare(right.title)),
    });
  }

  const projectDocEntries = await Promise.all(
    projectDocs.map(async (doc) => {
      const sourceFilePath = path.join(repoDir, doc.sourcePath);
      const raw = await fs.readFile(sourceFilePath, "utf8");
      return {
        ...doc,
        routePath: `/${doc.outputPath.replace(/\.md$/, "/")}`,
        body: raw,
      };
    }),
  );

  return {
    packs: packs.sort((left, right) => left.slug.localeCompare(right.slug)),
    projectDocs: projectDocEntries,
    packCount: packs.length,
    skillCount,
    referenceCount,
  };
}

function buildRouteMap(catalog) {
  const routeMap = new Map();

  for (const doc of catalog.projectDocs) {
    routeMap.set(doc.sourcePath, doc.routePath);
  }

  for (const pack of catalog.packs) {
    for (const skill of pack.skills) {
      routeMap.set(skill.sourceRepoPath, skill.routePath);

      for (const reference of skill.references) {
        routeMap.set(reference.sourceRepoPath, reference.routePath);
      }
    }
  }

  return routeMap;
}

async function writeHomePage(catalog) {
  const packLines = catalog.packs
    .map(
      (pack) =>
        `- [\`${pack.slug}\`](${pack.routePath}) — ${pack.skills.length} ${
          pack.skills.length === 1 ? "skill" : "skills"
        }`,
    )
    .join("\n");

  const projectLines = catalog.projectDocs
    .map((doc) => `- [${doc.title}](${doc.routePath})`)
    .join("\n");

  const contents = `---
title: agent-skills
description: Opinionated, installable skill packs for coding agents, libraries, and engineering workflows.
template: splash
hero:
  title: agent-skills
  tagline: Opinionated, installable skill packs with clear defaults, guardrails, and routing boundaries.
  actions:
    - text: Browse project docs
      link: /project/about/
      icon: right-arrow
    - text: View on GitHub
      link: ${repositoryUrl}
      icon: external
      variant: minimal
---

## Catalog snapshot

- ${catalog.packCount} packs
- ${catalog.skillCount} skills
- ${catalog.referenceCount} supporting references

## Project docs

${projectLines}

## Skill packs

${packLines}
`;

  await writeText(path.join(docsDir, "index.md"), contents);
}

async function writeProjectDocs(docs, routeMap) {
  for (const doc of docs) {
    const body = rewriteMarkdownLinks(stripLeadingHeading(doc.body, doc.title), doc.sourcePath, routeMap);
    const frontmatter = [
      "---",
      `title: ${yamlString(doc.title)}`,
      `description: ${yamlString(doc.description)}`,
      "sidebar:",
      `  label: ${yamlString(doc.sidebarLabel)}`,
      "---",
      "",
    ].join("\n");
    const sourceBlock = `> Source: [\`${doc.sourcePath}\`](${githubBlobUrl(doc.sourcePath)})\n\n`;

    await writeText(
      path.join(docsDir, doc.outputPath),
      `${frontmatter}${sourceBlock}${body.trim()}\n`,
    );
  }
}

async function writePackPages(packs, routeMap) {
  for (const pack of packs) {
    const packDir = path.join(packsDocsDir, pack.slug);
    const hiddenReferencesDir = path.join(packDir, "_references");
    await ensureDir(hiddenReferencesDir);

    const packFrontmatter = [
      "---",
      `title: ${yamlString(pack.title)}`,
      `description: ${yamlString(
        `${pack.skills.length} ${pack.skills.length === 1 ? "skill" : "skills"} in the ${pack.slug} pack.`,
      )}`,
      "sidebar:",
      '  label: "Overview"',
      "  order: 0",
      "---",
      "",
    ].join("\n");

    const packSkillLines = pack.skills
      .map((skill) => `- [${skill.title}](${skill.routePath}) — ${skill.description}`)
      .join("\n");

    await writeText(
      path.join(packDir, "index.md"),
      `${packFrontmatter}> Pack path: \`${pack.slug}/\`\n\n## Skills\n\n${packSkillLines}\n`,
    );

    for (const skill of pack.skills) {
      const skillBody = rewriteMarkdownLinks(
        stripLeadingHeading(skill.body, skill.title),
        skill.sourceRepoPath,
        routeMap,
      );
      const skillFrontmatter = [
        "---",
        `title: ${yamlString(skill.title)}`,
        `description: ${yamlString(skill.description)}`,
        "---",
        "",
      ].join("\n");
      const referenceLines = skill.references.length
        ? `\n## References\n\n${skill.references
            .map((reference) => `- [${reference.title}](${reference.routePath})`)
            .join("\n")}\n`
        : "";
      const metaBlock = [
        `> Pack: [\`${pack.slug}\`](${pack.routePath})`,
        `> Source: [\`${skill.sourceRepoPath}\`](${githubBlobUrl(skill.sourceRepoPath)})`,
        "",
      ].join("\n");

      await writeText(
        path.join(packDir, `${skill.slug}.md`),
        `${skillFrontmatter}${metaBlock}${skillBody.trim()}${referenceLines}`,
      );

      for (const reference of skill.references) {
        const referenceBody = rewriteMarkdownLinks(
          stripLeadingHeading(reference.body, reference.title),
          reference.sourceRepoPath,
          routeMap,
        );
        const referenceFrontmatter = [
          "---",
          `title: ${yamlString(reference.title)}`,
          `description: ${yamlString(reference.description)}`,
          `slug: ${yamlString(reference.slug)}`,
          "sidebar:",
          "  hidden: true",
          "---",
          "",
        ].join("\n");
        const referenceMetaBlock = [
          `> Pack: [\`${pack.slug}\`](${pack.routePath})`,
          `> Parent skill: [${skill.title}](${skill.routePath})`,
          `> Source: [\`${reference.sourceRepoPath}\`](${githubBlobUrl(reference.sourceRepoPath)})`,
          "",
        ].join("\n");

        await writeText(
          path.join(hiddenReferencesDir, skill.slug, `${path.basename(reference.slug)}.md`),
          `${referenceFrontmatter}${referenceMetaBlock}${referenceBody.trim()}\n`,
        );
      }
    }
  }
}

function rewriteMarkdownLinks(markdown, currentRepoPath, routeMap) {
  return markdown.replace(/(!?\[[^\]]*]\()([^)]+)(\))/g, (fullMatch, prefix, rawTarget, suffix) => {
    if (prefix.startsWith("!")) return fullMatch;
    if (rawTarget.startsWith("#")) return fullMatch;
    if (/^(https?:|mailto:|tel:)/.test(rawTarget)) return fullMatch;

    const [targetPath, hash = ""] = rawTarget.split("#");
    const resolvedRepoPath = path.posix.normalize(
      path.posix.join(path.posix.dirname(currentRepoPath), targetPath),
    );
    const mappedRoute = routeMap.get(resolvedRepoPath);

    if (mappedRoute) {
      return `${prefix}${mappedRoute}${hash ? `#${hash}` : ""}${suffix}`;
    }

    return `${prefix}${githubBlobUrl(resolvedRepoPath)}${hash ? `#${hash}` : ""}${suffix}`;
  });
}

function stripLeadingHeading(content, title) {
  const normalized = content.trimStart();
  const escapedTitle = escapeRegExp(title.trim());
  const regex = new RegExp(`^#\\s+${escapedTitle}\\s*\\n+`, "i");
  return normalized.replace(regex, "").trim();
}

function extractHeading(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function stripInlineCode(value) {
  return value.replace(/`/g, "").trim();
}

function slugifyPath(value) {
  return value
    .split(/[\\/]+/)
    .map((segment) =>
      segment
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
    )
    .filter(Boolean)
    .join("/");
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function githubBlobUrl(repoPath) {
  return `${repositoryUrl}/blob/${repositoryBranch}/${repoPath}`;
}

function toRepoPath(filePath) {
  return path.relative(repoDir, filePath).split(path.sep).join("/");
}

async function collectMarkdownFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

async function writeText(filePath, contents) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, contents, "utf8");
}

async function ensureDir(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
