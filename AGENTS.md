# Repository Guidelines

## Project Structure & Module Organization

Source routes live in `app/` using the Next.js App Router; keep server-only loaders beside their page components to avoid duplicate fetches. Shared UI primitives sit in `components/`, while reusable hooks and utilities belong in `lib/`. Tailwind helpers stay under `styles/`, optimized assets in `public/`, and Supabase schema plus CLI config in `supabase/`. Unit specs go in `__tests__/`, with Playwright suites under `tests/` and baselines in `tests/screenshots/`. Keep related types and props defined in the same file as the component that consumes them.

## Build, Test, and Development Commands

- `npm ci` installs dependencies from the lockfile; use this before any build.
- `npm run dev` launches the Next.js dev server at `http://localhost:3000`.
- `npm run build` compiles the production bundle and validates required env vars.
- `npm start` serves the built bundle for smoke testing.
- `npm run lint`, `npm run typecheck`, and `npm test` keep CI healthy; run them locally before pushing.
- `npx playwright test --headed` helps debug E2E flows visually.

## Coding Style & Naming Conventions

Write strict TypeScript and avoid `any`. Indent with two spaces and order JSX props as structure → modifiers → handlers, alphabetizing within each group when practical. Components use PascalCase filenames that mirror their default exports (e.g., `HeroBanner.tsx`); utilities use camelCase (e.g., `formatDate.ts`). Run `npm run lint` before commits to apply ESLint and Prettier fixes.

## Testing Guidelines

Vitest drives unit coverage; name specs `*.spec.ts` and colocate them when context matters. Execute `npm test` or `npm run test -- --watch` while iterating. Playwright covers end-to-end scenarios; prefer action-first titles like `navigates to contact`. Inspect any snapshot diffs before running `npx playwright test --update-snapshots`, and never commit `test-results/`.

## Commit & Pull Request Guidelines

Follow Conventional Commits such as `feat(app): add cart summary` with subjects ≤72 characters. PRs should describe the problem, solution, UI impact, and link relevant issues. Attach screenshots or recordings for UI changes and confirm lint/build/test runs in the description. Request early reviews when touching shared components or Supabase schema.

## Security & Configuration Tips

Store secrets in `.env.local`, mirror required keys in `.env.example`, and run `npm run build` before pushing to catch env drift. Use `npm run scan:secrets` to prevent committing sensitive data. Compress assets before placing them in `public/`, and document Supabase migrations alongside SQL updates in `supabase/`.
