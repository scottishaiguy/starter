const validNamePattern = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

export function slugifyProjectName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

export function validateProjectName(value: string): true | string {
  const slug = slugifyProjectName(value);

  if (!slug) {
    return "Enter a project name.";
  }

  if (slug.length > 214) {
    return "Project name must be 214 characters or fewer.";
  }

  if (!validNamePattern.test(slug)) {
    return "Use lowercase letters, numbers, dots, hyphens, underscores, and optional npm scope.";
  }

  if (slug.startsWith(".") || slug.startsWith("_")) {
    return "Project name cannot start with a dot or underscore.";
  }

  return true;
}
