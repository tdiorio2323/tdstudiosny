# Baseline Report - refactor/cleanup-sweep-01

**Date**: 2025-11-04
**Branch**: refactor/cleanup-sweep-01
**Commit**: Initial baseline

## Test Status

```
✅ pnpm ci:verify PASSED
  - ESLint: PASS (0 warnings)
  - TypeScript: PASS (no errors)
  - Vitest: PASS (6/6 tests, 4 files)
```

## Codebase Metrics

| Metric             | Value                       |
| ------------------ | --------------------------- |
| Source Files       | 87 files                    |
| Total LOC          | 7,571 lines                 |
| Public Assets      | 75MB                        |
| Test Files         | 4 (Vitest) + 1 (Playwright) |
| Console Statements | 0 (clean)                   |
| TODO Comments      | 10 instances                |

## File Structure

```
app/              # Next.js App Router
components/       # UI components
features/         # Feature modules
lib/              # Utilities
hooks/            # React hooks
__tests__/        # Unit tests
tests/e2e/        # E2E tests
public/           # Static assets
scripts/          # Build scripts
```

## Known Issues (Pre-Refactor)

### Dependencies

- 40 unused dependencies detected by depcheck
- 30+ unused Radix UI components in package.json
- Missing: eslint-import-resolver-typescript, playwright, embla-carousel

### Files

- 7 unused files (ThemeProvider, DesignCarousel, lhci.config, etc.)
- Orphaned assets in public/
- Duplicate image formats (.jpg + .webp + .avif)

### Code

- 4 unused exports
- 3 unused exported types
- 10 TODO comments (mostly aria-invalid related)
- Unused auth functions: encrypt, decrypt, verifySession, deleteSession, updateSession

### Configuration

- Missing ESLint import resolver
- Knip reports unlisted dependencies: postcss-load-config, playwright, jsdom
- Unlisted binaries: supabase, lsof

## Performance Baseline

_To be measured with pnpm audit:fast after cleanup_

## Risk Assessment

**Low Risk Areas**:

- Removing unused dependencies
- Deleting unused files
- Removing unused exports

**Medium Risk Areas**:

- Auth functions (may be used in dynamic imports)
- ThemeProvider (might be for future dark mode)
- Image deduplication (verify all formats)

**High Risk Areas**:

- None identified (all changes are deletions)
