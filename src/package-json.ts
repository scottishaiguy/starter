import path from "node:path";
import fs from "fs-extra";
import type { FeatureFlags } from "./types.js";

type PackageJson = {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
};

const baseDependencies: Record<string, string> = {
  "@tailwindcss/postcss": "^4.1.11",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.468.0",
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^2.6.0",
  "tailwindcss": "^4.1.11"
};

const baseDevDependencies: Record<string, string> = {
  "@eslint/eslintrc": "^3.3.1",
  "@types/node": "^24.0.13",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "eslint": "^9.31.0",
  "eslint-config-next": "^16.0.0",
  "typescript": "^5.8.3"
};

export async function updatePackageJson(projectDir: string, flags: FeatureFlags): Promise<void> {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = (await fs.readJson(packageJsonPath)) as PackageJson;

  packageJson.scripts = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint .",
    typecheck: "tsc --noEmit",
    ...(flags.useConvex ? { "convex:dev": "convex dev" } : {})
  };

  packageJson.dependencies = sortDependencies({
    ...baseDependencies,
    ...(flags.useConvex ? { convex: "^1.25.4" } : {}),
    ...(flags.useClerk ? { "@clerk/nextjs": "^6.24.0" } : {}),
    ...(flags.useStripe ? { stripe: "^17.7.0" } : {}),
    ...(flags.useMdx ? { "@next/mdx": "^16.0.0", "@mdx-js/loader": "^3.1.0", "@mdx-js/react": "^3.1.0" } : {})
  });

  packageJson.devDependencies = sortDependencies(baseDevDependencies);

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

function sortDependencies(dependencies: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b)));
}
