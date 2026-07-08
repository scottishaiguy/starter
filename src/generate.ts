import path from "node:path";
import fs from "fs-extra";
import { execa } from "execa";
import ora from "ora";
import pc from "picocolors";
import { writeEnvExample } from "./env.js";
import { updatePackageJson } from "./package-json.js";
import { copyTemplates } from "./template.js";
import type { Answers } from "./types.js";

export async function generateProject(answers: Answers): Promise<void> {
  const projectDir = path.resolve(process.cwd(), answers.projectSlug);

  if (answers.overwrite) {
    await fs.emptyDir(projectDir);
  } else {
    await fs.ensureDir(projectDir);
  }

  const spinner = ora("Creating project files").start();
  await copyTemplates(projectDir, answers);
  await updatePackageJson(projectDir, answers);
  await writeEnvExample(projectDir, answers);
  spinner.succeed("Created project files");

  if (answers.installDependencies) {
    await runCommand("Installing dependencies", "pnpm", ["install"], projectDir);
  }

  if (answers.initGit) {
    await runCommand("Initialising Git", "git", ["init"], projectDir);
  }

  printNextSteps(answers);
}

async function runCommand(label: string, command: string, args: string[], cwd: string): Promise<void> {
  const spinner = ora(label).start();

  try {
    await execa(command, args, { cwd, stdio: "ignore" });
    spinner.succeed(label);
  } catch (error) {
    spinner.fail(label);
    const message = error instanceof Error ? error.message : String(error);
    console.log(pc.yellow(`Continuing after command failure: ${message}`));
  }
}

function printNextSteps(answers: Answers): void {
  console.log(pc.bold("\nDone. Next steps:"));
  console.log(`  cd ${answers.projectSlug}`);

  if (!answers.installDependencies) {
    console.log("  pnpm install");
  }

  console.log("  pnpm dev");

  if (answers.useConvex) {
    console.log("  pnpm convex:dev");
  }

  if (answers.useClerk) {
    console.log("  Add Clerk keys to .env.local");
  }

  if (answers.useStripe) {
    console.log("  Add Stripe keys and configure the webhook route");
  }

  console.log("  Deploy to Vercel when ready");
}
