#!/usr/bin/env node
import pc from "picocolors";
import { generateProject } from "./generate.js";
import { collectAnswers } from "./prompts.js";

async function main(): Promise<void> {
  const projectNameArg = process.argv[2];

  console.log(pc.bold("\nScottish AI Guy starter"));
  console.log("Build a practical Next.js starter with the stack already wired.\n");

  const answers = await collectAnswers(projectNameArg);
  await generateProject(answers);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(pc.red(`\n${message}`));
  process.exitCode = 1;
});
