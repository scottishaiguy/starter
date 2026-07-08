import path from "node:path";
import fs from "fs-extra";
import { getProjectTypeLabel } from "./project-types.js";
import { getTemplatesDir } from "./paths.js";
import type { Answers, TemplateContext } from "./types.js";

const textExtensions = new Set([
  ".css",
  ".env",
  ".example",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml"
]);

export async function copyTemplates(projectDir: string, answers: Answers): Promise<void> {
  const templatesDir = getTemplatesDir();
  const overlays = [
    "base",
    answers.projectType,
    answers.useConvex ? "features/convex" : undefined,
    answers.useClerk ? "features/clerk" : undefined,
    answers.useStripe ? "features/stripe" : undefined,
    answers.useMdx ? "features/mdx" : undefined,
    answers.includeAssistant ? "features/deterministic-assistant" : undefined,
    answers.includeBlog ? "features/blog-insights" : undefined
  ].filter((value): value is string => Boolean(value));

  for (const overlay of overlays) {
    await copyTemplate(path.join(templatesDir, overlay), projectDir, createTemplateContext(answers));
  }
}

function createTemplateContext(answers: Answers): TemplateContext {
  return {
    projectName: answers.projectName,
    projectSlug: answers.projectSlug,
    projectType: getProjectTypeLabel(answers.projectType),
    year: String(new Date().getFullYear())
  };
}

async function copyTemplate(sourceDir: string, targetDir: string, context: TemplateContext): Promise<void> {
  if (!(await fs.pathExists(sourceDir))) {
    return;
  }

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetName = mapTemplateName(entry.name);
    const targetPath = path.join(targetDir, targetName);

    if (entry.isDirectory()) {
      await fs.ensureDir(targetPath);
      await copyTemplate(sourcePath, targetPath, context);
      continue;
    }

    await fs.ensureDir(path.dirname(targetPath));

    if (isTextFile(sourcePath)) {
      const contents = await fs.readFile(sourcePath, "utf8");
      await fs.writeFile(targetPath, replacePlaceholders(contents, context));
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

function mapTemplateName(name: string): string {
  if (name === "_gitignore") {
    return ".gitignore";
  }

  if (name === "_env.example") {
    return ".env.example";
  }

  return name;
}

function replacePlaceholders(contents: string, context: TemplateContext): string {
  return contents
    .replaceAll("{{PROJECT_NAME}}", context.projectName)
    .replaceAll("{{PROJECT_SLUG}}", context.projectSlug)
    .replaceAll("{{PROJECT_TYPE}}", context.projectType)
    .replaceAll("{{YEAR}}", context.year);
}

function isTextFile(filePath: string): boolean {
  const extension = path.extname(filePath);
  return textExtensions.has(extension) || filePath.endsWith("_env.example") || filePath.endsWith("_gitignore");
}
