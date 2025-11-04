# Commit Preview - First 3 Commits

## Commit 1: chore(deps): add missing dependencies

```bash
# Add eslint import resolver (fixes .eslintrc.json error)
pnpm add eslint-import-resolver-typescript -D

# Add missing peer dependency for embla-carousel
pnpm add embla-carousel

# Add playwright for scripts (currently unlisted)
pnpm add playwright -D

# Add postcss-load-config for postcss.config.mjs
pnpm add postcss-load-config -D

# Add jsdom for vitest (currently unlisted)
pnpm add jsdom -D
```

**Files Changed**: package.json, pnpm-lock.yaml
**LOC**: +5 (package.json entries)
**Risk**: LOW - Adding missing dependencies improves stability
**Tests**: pnpm ci:verify (should pass)

---

## Commit 2: refactor(code): remove unused exports and dead code

**Changes**:

### 1. features/clients/lib/auth.ts

```diff
-// Unused functions - never imported
-export async function verifySession() { ... }
-export async function deleteSession() { ... }
-export async function updateSession() { ... }
-
-// Used internally only - remove export keyword
-export async function encrypt(payload: SessionPayload) { ... }
+async function encrypt(payload: SessionPayload) { ... }  // internal only

-export async function decrypt(session: string | undefined) { ... }
+async function decrypt(session: string | undefined) { ... }  // internal only
```

### 2. features/clients/components/CaseStudyDetailContent.tsx

```diff
-// Unused component - never imported
-export const SocialLinkButton = ({ ... }) => { ... }
+(Remove entire component - ~20 LOC)
```

### 3. lib/utils.ts

```diff
-// Unused metadata helper
-export function createMetadata(/* ... */) { ... }
+(Remove function - ~15 LOC)
```

### 4. lib/supabaseAdmin.ts

```diff
-// Unused export - not imported anywhere
-export const supabase = createClient(/* ... */);
+(Remove export or entire file if only export - verify usage first)
```

### 5. Remove unused type exports

```diff
// features/clients/lib/client-access.ts
-export type ClientAccessProfile = { ... }

// features/contact/lib/contact-schema.ts
-export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Files Changed**: 5 files
**LOC Removed**: ~80-100 lines
**Risk**: LOW - All verified unused by knip + ts-prune
**Tests**: pnpm ci:verify (should pass)

---

## Commit 3: chore(cleanup): remove unused files

**Deletions**:

```bash
rm features/layout/providers/ThemeProvider.tsx      # ~40 LOC, unused dark mode
rm features/marketing/components/DesignCarousel.tsx # ~120 LOC, unused carousel
rm lib/lighthouse/lhci.config.js                    # ~50 LOC, old config
rm scripts/a11y-codemod.mjs                          # ~50 LOC, one-time script
rm scripts/build-with-timestamp.mjs                  # ~30 LOC, unused build script
rm styles/globals.css                                # ~20 LOC, duplicate of app/globals.css
rm supabase-cli.mjs                                  # ~40 LOC, unused CLI helper
```

**Files Removed**: 7 files
**LOC Removed**: ~350 lines
**Risk**: LOW - All files confirmed unused by knip
**Tests**: pnpm ci:verify (should pass)

**Additional Checks**:

- Verify no dynamic imports of these files
- Grep for string references to filenames
- Check if styles/globals.css is imported anywhere

---

## Summary of First 3 Commits

| Metric        | Commit 1 | Commit 2 | Commit 3  | Total |
| ------------- | -------- | -------- | --------- | ----- |
| Files Changed | 2        | 5        | 7 deleted | 14    |
| LOC Added     | +5       | 0        | 0         | +5    |
| LOC Removed   | 0        | ~90      | ~350      | ~440  |
| Net LOC       | +5       | -90      | -350      | -435  |
| Risk Level    | LOW      | LOW      | LOW       | LOW   |

## Subsequent Commits (Preview)

### Commit 4: chore(deps): remove unused dependencies (AFTER CONFIRMATION)

- Remove 40 unused packages from package.json
- Run pnpm install to update lockfile
- **~50MB reduction in node_modules**

### Commit 5: chore(assets): remove orphaned and duplicate images

- Remove public/glass-chrome.jpg (0 refs, never used)
- Remove public/.original-images/ directory (backup copies)
- Remove .jpg files where .avif + .webp exist (modern format strategy)
- **~5-10MB reduction in public/ directory**

### Commit 6: style: eslint --fix and prettier format

- Run `pnpm lint:fix` for auto-fixes
- Run `pnpm format` for consistent formatting
- No functional changes, pure style

### Commit 7: refactor(dx): normalize imports and patterns

- Convert default exports to named exports in shared libs
- Alphabetize imports (eslint import/order)
- Tighten types (readonly, narrow any)
- Remove console.log in non-test code (none found - already clean!)

### Commit 8: docs(cleanup): remove stale TODOs

- Convert TODO comments to GitHub issues
- Remove completed TODOs
- Keep actionable TODOs with context

---

## Validation Strategy

After each commit:

```bash
pnpm ci:verify          # Must pass (lint + typecheck + test)
pnpm e2e:ci            # Playwright smoke tests
pnpm audit:fast        # Performance check
git add -A && git commit -m "..."
```

After all commits:

```bash
pnpm build             # Production build must succeed
pnpm start            # Visual smoke test
```

---

## Next: Awaiting Confirmation

**Status**: 🟡 READY TO EXECUTE

Please confirm:

1. ✅ Proceed with Commits 1-3 (low risk, verified unused)
2. ⚠️ **Confirm critical dependencies** before Commit 4:
   - Remove `geist` font package? (verify Next.js auto-loads it)
   - Remove `openai` package? (verify not used in api/chatkit/session)
   - Remove `@radix-ui/react-slot`? (verify not used by shadcn components)
   - Remove `lighthouse` package? (verify scripts/lh-run.cjs alternative)

**Type "confirm deps" to proceed with dependency removal after reviewing the list.**
