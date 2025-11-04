# Deletion Proposal - Refactor Cleanup Sweep

**Status**: 🟡 AWAITING CONFIRMATION
**Estimated LOC Reduction**: ~500-700 lines
**Estimated Size Reduction**: ~5-10MB (assets)

---

## 1. UNUSED DEPENDENCIES (40 packages)

### Production Dependencies to Remove

```json
{
  "@hookform/resolvers": "Unused form validation resolver",
  "@radix-ui/react-accordion": "Unused UI primitive",
  "@radix-ui/react-alert-dialog": "Unused UI primitive",
  "@radix-ui/react-aspect-ratio": "Unused UI primitive",
  "@radix-ui/react-avatar": "Unused UI primitive",
  "@radix-ui/react-checkbox": "Unused UI primitive",
  "@radix-ui/react-collapsible": "Unused UI primitive",
  "@radix-ui/react-context-menu": "Unused UI primitive",
  "@radix-ui/react-dialog": "Unused UI primitive",
  "@radix-ui/react-dropdown-menu": "Unused UI primitive",
  "@radix-ui/react-hover-card": "Unused UI primitive",
  "@radix-ui/react-menubar": "Unused UI primitive",
  "@radix-ui/react-navigation-menu": "Unused UI primitive",
  "@radix-ui/react-popover": "Unused UI primitive",
  "@radix-ui/react-progress": "Unused UI primitive",
  "@radix-ui/react-radio-group": "Unused UI primitive",
  "@radix-ui/react-scroll-area": "Unused UI primitive",
  "@radix-ui/react-select": "Unused UI primitive",
  "@radix-ui/react-separator": "Unused UI primitive",
  "@radix-ui/react-slider": "Unused UI primitive",
  "@radix-ui/react-slot": "Unused (but may be used by shadcn - VERIFY)",
  "@radix-ui/react-switch": "Unused UI primitive",
  "@radix-ui/react-tabs": "Unused UI primitive",
  "@radix-ui/react-toast": "Unused UI primitive",
  "@radix-ui/react-toggle": "Unused UI primitive",
  "@radix-ui/react-toggle-group": "Unused UI primitive",
  "@radix-ui/react-tooltip": "Unused UI primitive",
  "cmdk": "Command palette - unused",
  "date-fns": "Date utility - unused",
  "embla-carousel-react": "Used in DesignCarousel (which is unused)",
  "geist": "Font package - VERIFY if auto-loaded by Next.js",
  "input-otp": "OTP input - unused",
  "next-themes": "Used in ThemeProvider (which is unused)",
  "openai": "Direct OpenAI SDK - VERIFY not used in api/chatkit",
  "react-day-picker": "Date picker - unused",
  "react-hook-form": "Form library - unused",
  "react-resizable-panels": "Resizable panels - unused",
  "recharts": "Charts library - unused",
  "sonner": "Toast library - unused",
  "tailwindcss-animate": "Animation utilities - unused",
  "vaul": "Drawer component - unused"
}
```

### Dev Dependencies to Remove

```json
{
  "@secretlint/secretlint-rule-preset-recommend": "Used by secretlint - KEEP",
  "@testing-library/user-event": "Testing utility - unused",
  "depcheck": "Analysis tool - can remove after refactor",
  "dotenv": "Env loader - unused (Next.js handles this)",
  "eslint-config-prettier": "ESLint integration - unused",
  "eslint-plugin-prettier": "ESLint integration - unused",
  "lighthouse": "Used in scripts - VERIFY",
  "start-server-and-test": "Test utility - unused",
  "ts-prune": "Analysis tool - can remove after refactor",
  "tw-animate-css": "Tailwind animation - unused",
  "wait-on": "Test utility - unused"
}
```

### Dependencies to ADD (Missing)

```bash
pnpm add eslint-import-resolver-typescript -D
pnpm add embla-carousel  # peer dependency
pnpm add playwright -D   # used in scripts
pnpm add postcss-load-config -D  # postcss dependency
pnpm add jsdom -D  # vitest dependency
```

**⚠️ CRITICAL: Verify Before Removal**

- `@radix-ui/react-slot` - May be used by shadcn's Slot component
- `geist` - Verify font loading mechanism
- `openai` - Check api/chatkit/session usage
- `lighthouse` - Used in scripts/lh-run.cjs
- `@secretlint/*` - KEEP (used in pre-commit hooks)

---

## 2. UNUSED FILES (7 files, ~300-400 LOC)

| File                                               | LOC  | Reason                       | Risk                      |
| -------------------------------------------------- | ---- | ---------------------------- | ------------------------- |
| `features/layout/providers/ThemeProvider.tsx`      | ~40  | Dark mode provider not used  | LOW - No imports found    |
| `features/marketing/components/DesignCarousel.tsx` | ~120 | Carousel component unused    | LOW - Knip confirms       |
| `lib/lighthouse/lhci.config.js`                    | ~50  | Old LHCI config              | LOW - Not referenced      |
| `scripts/a11y-codemod.mjs`                         | ~50  | One-time migration script    | LOW - Historical          |
| `scripts/build-with-timestamp.mjs`                 | ~30  | Unused build script          | LOW - Not in package.json |
| `styles/globals.css`                               | ~20  | Duplicate of app/globals.css | MEDIUM - Verify imports   |
| `supabase-cli.mjs`                                 | ~40  | CLI helper script            | LOW - Not executed        |

**Total Estimated Removal**: ~350 LOC

---

## 3. UNUSED EXPORTS & DEAD CODE

### Unused Exports (Remove or Mark as Internal)

```typescript
// features/clients/components/CaseStudyDetailContent.tsx
export const SocialLinkButton // Not imported anywhere

// features/clients/lib/auth.ts
export function encrypt() // Used internally only - remove export
export function decrypt() // Used internally only - remove export
export function verifySession() // UNUSED - safe to delete
export function deleteSession() // UNUSED - safe to delete
export function updateSession() // UNUSED - safe to delete

// lib/supabaseAdmin.ts
export const supabase // Not imported anywhere - VERIFY not dynamic

// lib/utils.ts
export function createMetadata() // Unused helper - safe to delete
```

### Unused Types (Remove)

```typescript
// features/clients/lib/auth.ts
export type SessionPayload  // Used internally - keep

// features/clients/lib/client-access.ts
export type ClientAccessProfile  // UNUSED - safe to delete

// features/contact/lib/contact-schema.ts
export type ContactFormData  // UNUSED - safe to delete
```

**Estimated Removal**: ~80-100 LOC

---

## 4. ORPHANED ASSETS

### Definitely Unused

```
public/glass-chrome.jpg  # 0 references - NEW FILE, never used
public/global-background.jpg  # Deleted in git status but referenced?
```

### Duplicate Image Formats (Keep AVIF + WebP, Remove JPG)

Strategy: Modern browsers support WebP (95%+) and AVIF (85%+). Keep both for progressive enhancement, remove original JPG files.

```
public/*.jpg files where .webp and .avif exist:
- black-and-white-luxury-creative-workspace.jpg  (~80KB → save)
- brand-identity-kit-design.jpg  (~88KB → save)
- contact-hero-image.jpg  (~404KB → save)
- design-hero.jpg  (~346KB → save)
- design-portfolio-1.jpg  (~73KB → save)
- design-portfolio-2.jpg  (~66KB → save)
- design-portfolio-3.jpg  (~96KB → save)
- design-portfolio-4.jpg  (~80KB → save)
... (continue pattern for all with triple formats)

Estimated Savings: ~3-5MB
```

### .original-images/ Directory

```
public/.original-images/  # Backup directory - can be removed
Estimated Savings: ~10-20MB (varies)
```

**Total Asset Reduction**: ~5-10MB

---

## 5. TODO COMMENTS (Clean or Track)

### Low Priority (Accessibility Review Needed)

```typescript
// app/contact/page.tsx - 8 instances
// TODO: Restore aria-invalid after accessibility review
```

**Action**: Create GitHub issue, remove from code

### Medium Priority

```typescript
// app/resources/premade-designs/page.tsx
// TODO: Integrate Stripe/checkout for direct purchase
```

**Action**: Create GitHub issue or add to roadmap, remove from code

### Technical Debt

```typescript
// app/api/chatkit/session/route.ts
// TODO: Implement full OpenAI ChatKit session creation when SDK supports it
```

**Action**: Keep for now (waiting on external SDK)

---

## 6. MISSING DEPENDENCIES (Add These)

```bash
pnpm add eslint-import-resolver-typescript -D
pnpm add embla-carousel
pnpm add playwright -D
pnpm add postcss-load-config -D
pnpm add jsdom -D
```

---

## SUMMARY

| Category                 | Count        | Est. Reduction     |
| ------------------------ | ------------ | ------------------ |
| Unused Dependencies      | 40 packages  | ~50MB node_modules |
| Unused Files             | 7 files      | ~350 LOC           |
| Unused Exports/Functions | 8 items      | ~100 LOC           |
| Unused Types             | 3 types      | ~20 LOC            |
| Orphaned Assets          | 2+ files     | ~500KB             |
| Duplicate Assets         | 15+ files    | ~5MB               |
| TODO Comments            | 10 instances | -                  |
| Missing Dependencies     | 5 packages   | -                  |

**Total Estimated Savings**:

- **~470 LOC removed**
- **~5-10MB assets removed**
- **~50MB node_modules reduction**

---

## NEXT STEPS

1. **⚠️ USER CONFIRMATION REQUIRED**: Review critical dependencies marked for removal
2. Install missing dependencies
3. Remove unused dependencies (after confirmation)
4. Delete unused files
5. Remove unused exports and dead code
6. Clean up assets (after verification)
7. Run pnpm ci:verify to ensure green
8. Create logical commits per category
9. Generate final reports

---

## RISKS & MITIGATIONS

| Risk                                | Mitigation                                        |
| ----------------------------------- | ------------------------------------------------- |
| Dynamic imports of removed packages | Grep for require(), import(), and string literals |
| Font loading broken (geist)         | Test font rendering on all pages                  |
| shadcn dependencies                 | Verify @radix-ui/react-slot is safe to remove     |
| Asset 404s                          | Run visual regression tests                       |
| Auth functions used elsewhere       | Grep for encrypt/decrypt usage                    |

**Recommendation**: ✅ Proceed with confirmation for critical dependencies
