# create-scottish-ai-guy-app

Interactive starter generator for the Scottish AI Guy stack.

```bash
npx create-scottish-ai-guy-app my-newsletter
```

The CLI creates a practical Next.js starter with TypeScript, Tailwind CSS, App Router folders, Scottish AI Guy standards, and optional Convex, Clerk, Stripe, MDX, deterministic assistant, and blog/insights overlays.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the CLI locally:

```bash
pnpm dev my-project
```

Build the CLI:

```bash
pnpm build
```

Run checks:

```bash
pnpm lint
pnpm typecheck
```

Test the built binary locally:

```bash
pnpm build
node dist/index.js my-project
```

You can also link it:

```bash
pnpm link --global
create-scottish-ai-guy-app my-project
```

## Templates

Templates live in `templates/`.

Base files are copied first:

```text
templates/base/
```

Then the selected project type is copied over the top:

```text
templates/business-website/
templates/saas/
templates/newsletter-saas/
templates/course-platform/
templates/ai-assistant-app/
```

Optional feature overlays live in:

```text
templates/features/
```

Supported placeholders:

- `{{PROJECT_NAME}}`
- `{{PROJECT_SLUG}}`
- `{{PROJECT_TYPE}}`
- `{{YEAR}}`

To add a new template, create a new folder under `templates/`, add it to `src/project-types.ts`, and keep feature-specific files in `templates/features/` where possible.

## Publishing

Before publishing:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
npm pack --dry-run
```

Then publish:

```bash
npm publish --access public
```

## Generated App

Each generated app includes:

- Next.js 16+
- TypeScript
- Tailwind CSS
- shadcn/ui-ready structure
- `src/app`, `src/components`, `src/lib`, `src/data`, `src/content`
- `convex`
- `AGENTS.md`
- `.scottish-ai-guy/` standards
- `.env.example`
- `README.md`

The CLI can initialise Git and run `pnpm install` for the generated project.
