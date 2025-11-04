# Cleanup Summary

## Highlights

- Added missing runtime/dev dependencies (`eslint-import-resolver-typescript`, `embla-carousel`, `playwright`, `postcss-load-config`, `jsdom`) so linting, PostCSS, and Vitest run without manual installs.
- Removed 40 unused packages (Radix UI suite, `openai`, `next-themes`, etc.), trimming ~50 MB from `node_modules`.
- Deleted unreferenced code (session helpers, SocialLinkButton, Supabase client) and seven abandoned files including the unused ThemeProvider and DesignCarousel components.
- Pruned backup/orphaned assets under `public/.original-images/` and unused hero variants, keeping the bundle focused on active media.
- Applied repository-wide formatting, normalized imports, tightened form types, and converted ad-hoc default exports to named exports for easier refactors.
- Authored `AGENTS.md` as an on-ramp for contributors working inside this codebase.

## Follow-Up

- JSON-LD, sitemap, and robots.txt have dedicated owners; remaining SEO TODOs captured in `TODO.md` under "Add comprehensive JSON-LD structured data".
- Homepage award badges, Stripe checkout, and additional E2E coverage still live on the backlog for future passes.

## Validation

- `pnpm ci:verify` (eslint + tsc + vitest) passes after each logical commit.
- No snapshot or asset regressions were detected during this sweep.
