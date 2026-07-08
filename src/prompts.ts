import path from "node:path";
import fs from "fs-extra";
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import pc from "picocolors";
import { getProjectTypeLabel, projectTypes, shouldDefaultStripe } from "./project-types.js";
import type { Answers, ProjectType } from "./types.js";
import { slugifyProjectName, validateProjectName } from "./validate.js";

type PartialAnswers = Omit<Answers, "overwrite">;

export async function collectAnswers(projectNameArg?: string): Promise<Answers> {
  const projectName = await getProjectName(projectNameArg);
  const projectSlug = slugifyProjectName(projectName);
  const projectType = await select<ProjectType>({
    message: "What are you building?",
    choices: projectTypes
  });

  const featureChoices = await checkbox<string>({
    message: "Choose your stack options",
    required: false,
    choices: [
      { name: "Use Convex", value: "convex", checked: true },
      { name: "Use Clerk", value: "clerk", checked: true },
      { name: "Use Stripe", value: "stripe", checked: shouldDefaultStripe(projectType) },
      { name: "Use MDX", value: "mdx", checked: true },
      { name: "Include deterministic assistant", value: "assistant", checked: true },
      { name: "Include blog/insights", value: "blog", checked: true }
    ]
  });

  const initGit = await confirm({ message: "Initialise Git?", default: true });
  const installDependencies = await confirm({ message: "Install dependencies?", default: true });

  const answers: PartialAnswers = {
    projectName,
    projectSlug,
    projectType,
    useConvex: featureChoices.includes("convex"),
    useClerk: featureChoices.includes("clerk"),
    useStripe: featureChoices.includes("stripe"),
    useMdx: featureChoices.includes("mdx"),
    includeAssistant: featureChoices.includes("assistant"),
    includeBlog: featureChoices.includes("blog"),
    initGit,
    installDependencies
  };

  const targetDir = path.resolve(process.cwd(), projectSlug);
  const overwrite = await shouldOverwrite(targetDir);

  printSummary({ ...answers, overwrite });
  const confirmed = await confirm({ message: "Create this project?", default: true });

  if (!confirmed) {
    throw new Error("Project creation cancelled.");
  }

  return { ...answers, overwrite };
}

async function getProjectName(projectNameArg?: string): Promise<string> {
  if (projectNameArg) {
    const validation = validateProjectName(projectNameArg);

    if (validation !== true) {
      throw new Error(validation);
    }

    return slugifyProjectName(projectNameArg);
  }

  const value = await input({
    message: "Project name",
    default: "my-scottish-ai-guy-app",
    validate: validateProjectName
  });

  return slugifyProjectName(value);
}

async function shouldOverwrite(targetDir: string): Promise<boolean> {
  if (!(await fs.pathExists(targetDir))) {
    return false;
  }

  const entries = await fs.readdir(targetDir);

  if (entries.length === 0) {
    return false;
  }

  console.log(pc.yellow(`\n${targetDir} already exists and is not empty.`));
  return confirm({ message: "Overwrite existing files in this folder?", default: false });
}

function printSummary(answers: Answers): void {
  const enabled = [
    answers.useConvex ? "Convex" : undefined,
    answers.useClerk ? "Clerk" : undefined,
    answers.useStripe ? "Stripe" : undefined,
    answers.useMdx ? "MDX" : undefined,
    answers.includeAssistant ? "Deterministic assistant" : undefined,
    answers.includeBlog ? "Blog/insights" : undefined
  ].filter(Boolean);

  console.log(pc.bold("\nProject summary"));
  console.log(`Name: ${answers.projectName}`);
  console.log(`Slug: ${answers.projectSlug}`);
  console.log(`Type: ${getProjectTypeLabel(answers.projectType)}`);
  console.log(`Features: ${enabled.length ? enabled.join(", ") : "None"}`);
  console.log(`Git: ${answers.initGit ? "yes" : "no"}`);
  console.log(`Install dependencies: ${answers.installDependencies ? "yes" : "no"}`);
  console.log(`Overwrite: ${answers.overwrite ? "yes" : "no"}`);
}
