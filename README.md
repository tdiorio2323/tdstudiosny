# TD Studios Website

Premium marketing site for TD Studios built with Next.js App Router, Tailwind CSS, and Supabase. The project emphasises strict TypeScript, reusable UI primitives, and automated quality gates so that contributions stay predictable.

## Quick Start

- Install dependencies: `pnpm install`
- Run the dev server: `pnpm dev`
- Create a production build: `pnpm build`
- Start the bundled app: `pnpm start`

## Project Structure

- `app/` – App Router routes, layouts, and server actions
- `components/` – Shared UI primitives (e.g. `GlassCard`, `FrostedButton`, shadcn inputs)
- `features/` – Domain-specific modules grouped by feature (layout, contact, clients, marketing, seo, resources)
- `hooks/` – Cross-domain React hooks (`useParallax`)
- `lib/` – Pure utilities and analytics helpers
- `public/` – Optimised static assets
- `styles/` – Tailwind helpers and global styles
- `supabase/` – Schema, CLI helpers, and [local workflow docs](supabase/README.md)
- `__tests__/` – Vitest suites
- `tests/e2e/` – Playwright smoke tests and snapshots

See the full contributor guide in [AGENTS.md](AGENTS.md).

## Quality Gates

- Lint: `pnpm lint`
- Type check: `pnpm typecheck`
- Unit tests: `pnpm test`
- E2E smoke tests: `pnpm e2e`
- Format code: `pnpm format`

CI should call `pnpm ci:verify` to run lint, typecheck, and tests together.

## Tooling

- **TypeScript** – `strict`, `exactOptionalPropertyTypes`, and curated path aliases (`@/features/*`, `@/components/*`, etc.)
- **ESLint** – `next/core-web-vitals`, TypeScript, import order, and unused imports enforcement
- **Prettier** – project formatting via `prettier.config.cjs`
- **Husky + lint-staged** – run formatting and linting on staged files before commit, plus secret scanning

## Environment

Create a `.env.local` file based on [`.env.example`](.env.example). Supabase and Resend credentials are required for dashboard access and contact notifications.

## Deployment

The app targets Vercel by default. Run `pnpm build` locally before pushing to ensure configuration and environment variables are complete.
