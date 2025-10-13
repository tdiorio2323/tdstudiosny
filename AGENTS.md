# Repository Guidelines

## Project Structure & Module Organization
- `app/` Next.js App Router routes and layouts; keep server-only loaders adjacent to their page components to avoid double fetching.
- `components/` Shared UI building blocks; prefer composition and typed props exported from the same file.
- `lib/` Pure utilities and hooks only; side effects belong in route loaders or server actions.
- `styles/` Tailwind configuration helpers and reusable class patterns; import tokens instead of duplicating class strings.
- `public/` Optimized static assets; compress imagery before committing and keep filenames descriptive.
- `__tests__/` Unit-level specs and fixtures; `tests/` Playwright suites with `tests/screenshots/` baselines.
- `supabase/` SQL schema and CLI config; document environment-sensitive changes alongside updates.

## Build, Test, and Development Commands
- `npm ci` installs lockfile-pinned dependencies (use `pnpm install` only when you must refresh the lockfile).
- `npm run dev` starts the Next.js dev server at `http://localhost:3000`.
- `npm run build` validates production readiness and confirms required env vars are present.
- `npm start` serves the production bundle for smoke testing.
- `npm run lint`, `npm run typecheck`, and `npm test` (Vitest) guard CI; run `npx playwright test --headed` for UI verification.

## Coding Style & Naming Conventions
- TypeScript strict: avoid `any`, colocate types with usage, and export explicit interfaces.
- Two-space indentation; in JSX order props as structure → modifiers → handlers, alphabetizing within each group when practical.
- Components use PascalCase filenames (`HeroBanner.tsx`); utilities use camelCase (`formatDate.ts`); default export names mirror the file.

## Testing Guidelines
- Use Vitest for unit coverage in `__tests__/` and co-located suites; name files `*.spec.ts`.
- E2E specs live in `tests/` with action-first titles (e.g., `navigates to contact`).
- Run `npx playwright test --update-snapshots` only after reviewing diffs, and never commit `test-results/`.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat(app): add cart summary`, `fix(lib): guard null params`) with ≤72 character subjects.
- PR descriptions cover problem, solution, UI impact, linked issues, and confirmation that lint/build/tests pass.
- Attach screenshots or recordings for UI changes and call out new env vars or migrations.

## Security & Configuration Tips
- Store secrets in `.env.local`; keep `.env.example` synced whenever new keys are required.
- Run `npm run build` before pushing to catch missing configuration, and use `npm run scan:secrets` to validate history.
