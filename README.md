# create-scottish-ai-guy-app

Interactive starter generator for the Scottish AI Guy stack.

It creates a practical Next.js starter with TypeScript, Tailwind CSS, App Router folders, Scottish AI Guy standards, and optional overlays for Convex, Clerk, Stripe, MDX, a deterministic assistant, and blog/insights content.

## Quick Start

Create a new app with `npx`:

```bash
npx create-scottish-ai-guy-app my-newsletter
```

Then follow the prompts, move into the project, and start development:

```bash
cd my-newsletter
pnpm install
pnpm dev
```

You can also run it without an initial project name:

```bash
npx create-scottish-ai-guy-app
```

## Interactive Flow

The CLI asks for:

- Project name
- Project type
- Whether to use Convex
- Whether to use Clerk
- Whether to use Stripe
- Whether to use MDX
- Whether to include the deterministic assistant
- Whether to include blog/insights pages
- Whether to initialise Git
- Whether to install dependencies

If the target folder already exists and is not empty, the CLI asks before overwriting it.

## Project Types

Available project types:

- Business Website
- SaaS
- Newsletter SaaS
- Course Platform
- AI Assistant App

The selected type is copied over the base template, so each type can add or replace files without changing the core generator.

## Optional Features

Feature overlays are copied after the base and project-type templates.

- Convex: schema, users table helpers, example query, example mutation, dependency, and env variables
- Clerk: middleware, provider wrapper, sign-in/sign-up routes, protected dashboard example, dependency, and env variables
- Stripe: Stripe client, webhook route placeholder, pricing page, dependency, and env variables
- MDX: MDX config, content examples, components file, and example renderer
- Deterministic assistant: bottom-right launcher, mobile-friendly drawer, knowledge file, and rules file
- Blog/insights: `/insights`, `/insights/[slug]`, example article data, example MDX article, and metadata

## Generated App

Each generated app includes:

- Next.js 16+
- TypeScript
- Tailwind CSS
- shadcn/ui-ready structure
- App Router under `src/app`
- `src/components`
- `src/lib`
- `src/data`
- `src/content`
- `convex`
- `AGENTS.md`
- `.scottish-ai-guy/` standards
- `.env.example`
- `README.md`

The generated `.env.example` only includes variables required by the selected features.

## Template Architecture

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

To add a new project type, create a new folder under `templates/`, add it to `src/project-types.ts`, and keep feature-specific files in `templates/features/` where possible.

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
pnpm typecheck
pnpm lint
```

Test the built binary locally:

```bash
pnpm build
node dist/index.js my-project
```

You can also link it globally for local testing:

```bash
pnpm link --global
create-scottish-ai-guy-app my-project
```

## Publishing

Before publishing:

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm build
npm pack --dry-run
```

Publish to npm:

```bash
npm publish --access public
```

The package publishes only the built CLI, templates, README, changelog, and license.
