# Repository Guidelines

## Project Structure & Module Organization

Use the Next.js App Router under `app/`; keep server-only loaders beside their page components to prevent double fetches. Shared UI primitives live in `components/`, with typed props exported from the same file. Pure utilities and hooks belong in `lib/`, while side effects stay in route loaders or server actions. Tailwind helpers sit in `styles/`, and optimized static assets go in `public/`. Unit specs reside in `__tests__/`; Playwright suites and baselines sit in `tests/` and `tests/screenshots/`. Track Supabase schema and CLI config in `supabase/`, updating docs whenever migrations ship.

## Build, Test, and Development Commands

Run `npm ci` for lockfile-pinned installs; use `pnpm install` only when refreshing the lockfile. `npm run dev` starts the app at `http://localhost:3000`. `npm run build` validates production readiness and fails on missing env vars. Serve the compiled bundle with `npm start`. Keep CI healthy with `npm run lint`, `npm run typecheck`, and `npm test`. Debug UI workflows via `npx playwright test --headed`.

## Coding Style & Naming Conventions

Write strict TypeScript, avoid `any`, and colocate types with their usage. Indent with two spaces. Order JSX props as structure → modifiers → handlers, alphabetizing within each group when practical. Components use PascalCase filenames (e.g., `HeroBanner.tsx`), utilities use camelCase (e.g., `formatDate.ts`), and default export names mirror their files. Let ESLint and Prettier fixes flow through `npm run lint` before committing.

## Testing Guidelines

Vitest drives unit coverage; name files `*.spec.ts` and colocate when context matters, otherwise place them in `__tests__/`. Playwright covers end-to-end flows; choose action-first test titles such as `navigates to contact`. Inspect snapshot diffs before running `npx playwright test --update-snapshots`, and never commit `test-results/`. Address failing specs or flag them before merge.

## Commit & Pull Request Guidelines

Adhere to Conventional Commits like `feat(app): add cart summary` or `fix(lib): guard null params`, keeping subjects ≤72 characters. Pull requests should describe the problem, solution, UI impact, linked issues, and confirm lint/build/test runs. Attach screenshots or recordings for UI changes, and call out new env vars or migrations. Request early reviews when touching shared components or Supabase schema.

## Security & Configuration Tips

Store secrets in `.env.local` and keep `.env.example` synchronized with required keys. Run `npm run build` before pushing to catch configuration drift. Use `npm run scan:secrets` to ensure history stays clean. Compress imagery before placing it in `public/`, and document schema-sensitive updates alongside SQL changes in `supabase/`.
