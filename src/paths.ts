import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceFile = fileURLToPath(import.meta.url);
const sourceDir = path.dirname(sourceFile);

export function getPackageRoot(): string {
  return path.resolve(sourceDir, "..");
}

export function getTemplatesDir(): string {
  return path.join(getPackageRoot(), "templates");
}
