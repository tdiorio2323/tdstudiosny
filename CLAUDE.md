# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

```bash
# Development
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build
pnpm start            # Start production server

# Quality & Testing
pnpm ci:verify        # Run lint + typecheck + test (use before commits)
pnpm lint             # ESLint check
pnpm typecheck        # TypeScript check
pnpm test             # Unit tests (Vitest)
pnpm e2e              # E2E tests (Playwright)
pnpm format           # Format all files with Prettier

# Auditing
pnpm audit:fast       # Quick performance audit (recommended)
pnpm audit:site       # Full audit (Lighthouse, a11y, secrets)
```

## Project Overview

TD Studios' luxury marketing website built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Supabase. Features glassmorphism design aesthetic, comprehensive analytics, JWT-based client portals, and AI-powered support chat via OpenAI ChatKit.

**Live Domain**: https://tdstudiosdigital.com
**Vercel Project**: `td-studios-website` (td-studioss-projects team)
**v0.app Project**: [MgSVoHLfRb7](https://v0.app/chat/projects/MgSVoHLfRb7)
**Package Manager**: pnpm (v10.15.1 required)

## Architecture

### Tech Stack

**Framework**: Next.js 15.5.4 with App Router
**Language**: TypeScript (strict mode, ES2017)
**Database**: Supabase (PostgreSQL)
**Styling**: Tailwind CSS 3.4.17 + PostCSS
**UI Components**: Radix UI primitives + shadcn/ui (New York style, RSC)
**Fonts**: Geist Sans and Geist Mono
**Icons**: Lucide React
**Analytics**: Vercel Analytics
**Testing**: Vitest (unit), Playwright (E2E)

### Directory Structure

```
app/                    # Next.js App Router pages
├── api/                # API routes
│   ├── contact/        # Contact form (Resend email)
│   ├── chatkit/        # ChatKit session management (OpenAI)
│   └── intake/         # Lead intake (Supabase)
├── work/               # Portfolio showcase
├── web/                # Web Experience service
├── dev/                # Development service
├── social/             # Social Media Marketing service
├── design/             # Brand & Visual Design service
├── process/            # C.L.O.S.E. Method
├── faq/                # General FAQ
├── book/               # Calendly booking
├── contact/            # Contact page
├── support/            # ChatKit live chat
├── resources/          # Resource hub
├── legal/              # Terms & Privacy
├── clients/[client]/   # Client portals (protected)
└── [client]/signin/    # Client sign-in pages

components/             # Reusable React components
├── sticky-header.tsx   # Main navigation
├── footer.tsx          # Site footer
├── glass-card.tsx      # Glassmorphism cards
├── frosted-button.tsx  # Polymorphic button with analytics
├── page-title.tsx      # Standardized page titles
├── json-ld.tsx         # SEO structured data
└── ui/                 # shadcn/ui components

lib/                    # Utilities and business logic
├── utils.ts            # cn() className utility
├── analytics.ts        # Event tracking functions
└── ab-testing.ts       # A/B test configuration

__tests__/              # Vitest unit tests
tests/e2e/              # Playwright E2E tests
public/                 # Static assets
supabase/               # Schema and local workflow docs
```

### Component Architecture

- **Server Components by Default**: All `app/` components are RSC unless marked with `"use client"`
- **Client Component Markers**: Required for browser APIs, hooks, event handlers, or client-only libraries
- **Glassmorphism System**: Reusable glass cards with backdrop blur effects
- **Polymorphic Buttons**: FrostedButton renders as Link or button with built-in analytics
- **Analytics Provider**: Context-based event tracking throughout app
- **Mobile Viewport Fixes**: Inline script in layout.tsx handles iOS Safari viewport issues

## Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
# Email (Resend)
RESEND_API_KEY=
CONTACT_TO_EMAIL=tyler@tdstudiosdigital.com

# SEO
NEXT_PUBLIC_SITE_URL=https://tdstudiosdigital.com

# AI (OpenAI)
OPENAI_API_KEY=sk-proj-...

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Auth (JWT)
JWT_SECRET=                                    # Min 32 characters
CLIENT_{CLIENTSLUG}_PASSCODE=                   # e.g., CLIENT_THEBODYBOUTIQUE_PASSCODE
```

## Development Workflow

### Commands

```bash
# Development
pnpm dev                    # Dev server (port 3000)
pnpm build                  # Production build
pnpm start                  # Start built app
pnpm serve                  # Alias for start

# Code Quality
pnpm lint                   # ESLint (max-warnings=0)
pnpm lint:fix               # Auto-fix ESLint issues
pnpm typecheck              # TypeScript check (no emit)
pnpm format                 # Format with Prettier
pnpm format:check           # Check Prettier compliance
pnpm ci:verify              # Lint + typecheck + test (for CI)

# Testing
pnpm test                   # Vitest (single run)
pnpm test:watch             # Vitest watch mode
pnpm test:ci                # Vitest with --runInBand
pnpm e2e                    # Playwright E2E tests
pnpm e2e:ci                 # Playwright (chromium only, line reporter)

# Security & Auditing
pnpm scan:secrets           # Scan all files for secrets (secretlint)
pnpm scan:secrets:staged    # Scan staged files only (pre-commit hook)
pnpm audit:site             # Full audit (Lighthouse, a11y, secrets)
pnpm audit:fast             # Quick audit (skip install/build, limited routes)
pnpm audit:quick            # A11Y + LHCI only
pnpm audit:headers          # Security headers only
pnpm audit:perf-only        # Performance-only Lighthouse

# Utilities
pnpm lh:routes              # Lighthouse audits on routes
pnpm report:types           # Type error report
pnpm analyze                # Next.js bundle analysis
pnpm img:opt                # Optimize images script
pnpm db:migrate             # Supabase migrations
pnpm db:seed                # Seed database
pnpm kill-3000              # Kill process on port 3000
```

### Linting & Formatting

**ESLint** (`.eslintrc.json`):

- Extends: `next/core-web-vitals`, `@typescript-eslint/recommended`, `plugin:jsx-a11y/recommended`
- Enforces: Import order (alphabetized), unused import removal, console warnings
- Rules: `import/order`, `unused-imports/no-unused-imports`

**Prettier** (`prettier.config.cjs`):

- No semicolons, double quotes, 100 char width, 2-space tabs
- `trailingComma: "es5"`, `bracketSpacing: true`

**lint-staged**: Auto-formats and lints staged files on commit

```json
{
  "*.{ts,tsx,js,jsx}": ["eslint --max-warnings=0 --fix"],
  "*.{ts,tsx,js,jsx,json,md,css,scss}": ["prettier --write"]
}
```

### Git Workflow & Hooks

**Husky Hooks** (installed via `postinstall`):

- **Pre-commit**: Scans staged files for secrets with secretlint

  ```bash
  git diff --cached --name-only --diff-filter=ACM | xargs -I{} -r secretlint "{}"
  ```

- **Pre-push**: Blocks direct pushes to main, runs full secret scan
  ```bash
  branch="$(git rev-parse --abbrev-ref HEAD)"
  [ "$branch" = "main" ] && exit 1  # Must use feature branch + PR
  pnpm -s scan:secrets || exit 1
  ```

**Branch Protection**: All changes to main must go through PRs. Use feature branches.

## Testing

### Unit Tests (Vitest)

- **Location**: `__tests__/*.spec.ts?(x)`
- **Setup**: `tests/setup.ts`
- **Config**: `vitest.config.ts` with jsdom environment
- **Features**:
  - Globals enabled for test utilities
  - Path alias support (`@/` → project root)
  - Excludes Playwright tests (`**/mobile-layout.spec.ts`, `**/playwright/**`)
  - `passWithNoTests: false` ensures tests exist

**Run Tests**:

```bash
pnpm test              # Single run
pnpm test:watch        # Watch mode
pnpm test:ci           # CI mode (runInBand)
```

### E2E Tests (Playwright)

- **Location**: `tests/e2e/*.spec.ts`
- **Focus**: Mobile layout, responsive design, accessibility
- **Key Areas**: Hero text centering, background parallax, touch targets, viewport handling
- **Screenshots**: Captured in `tests/screenshots/`

**Run Tests**:

```bash
pnpm e2e               # All browsers
pnpm e2e:ci            # Chromium only (for CI)
npx playwright test --ui               # UI mode
npx playwright test tests/e2e/mobile-layout.spec.ts  # Specific file
```

## Configuration

### Next.js (`next.config.mjs`)

- ESLint and TypeScript errors ignored during builds (for v0.app compatibility)
- **Image Domains**: `i.imgur.com`, `via.placeholder.com`, `cdn.platform.openai.com`, `tdstudiosdigital.com`
- **Image Formats**: AVIF and WebP with responsive device sizes
- **Redirects**: www.tdstudiosdigital.com → tdstudiosdigital.com (301)
- **Security Headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

### TypeScript (`tsconfig.json`)

- **Strict Mode**: Enabled with ES2017 target
- **Additional Checks**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- **Path Mapping**: `@/*` → project root
- **Next.js Plugin**: Enabled for App Router support

### Styling

- **Tailwind CSS**: Custom design system with OKLCH color space
- **Global Styles**: `app/globals.css` with mobile optimizations
- **Design Tokens**: CSS variables for colors, typography, spacing
- **Theme**: Dark mode primary with light mode support
- **shadcn/ui**: New York style, neutral base color, RSC enabled

### Security Headers

Configured in `next.config.mjs`:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Important**: Update when adding new third-party domains or browser permissions.

## Design System

### Colors & Theme

- **Primary**: Dark mode with `oklch(0.145 0 0)` background, white text
- **Glassmorphism**: Neutral-900 70% opacity with backdrop blur
- **CSS Variables**: OKLCH color tokens for precise control
- **Accent Colors**: Neutral palette with chart-specific colors

### Typography

- **Fonts**: Geist Sans (body), Geist Mono (code)
- **Spacing**: Consistent Tailwind utilities
- **Radius**: 0.625rem default with sm/md/lg/xl variants

### Component Patterns

- **Glass Cards**: Backdrop blur with border styling
- **Interactive States**: Hover, focus, transitions for accessibility
- **Button Variants**: Primary, secondary, ghost with proper contrast
- **Icon System**: Lucide React with consistent sizing

## Analytics & Optimization

### Analytics (`lib/analytics.ts`)

- Page view tracking with custom parameters
- Button click tracking with location context
- Form submission tracking (success/error)
- Lead magnet downloads
- Consultation booking conversions
- Scroll depth measurement
- Time on page tracking
- CTA performance with position data

### A/B Testing (`lib/ab-testing.ts`)

- Structured test definitions with variant control
- Percentage-based traffic splitting
- Active test management (enable/disable)
- Analytics integration for conversions

## API Routes

### POST /api/contact

- **Purpose**: Contact form submission
- **Integration**: Resend email service
- **Payload**: `{ name, email, message }`
- **Response**: Success/error status

### POST /api/chatkit/session

- **Purpose**: ChatKit session management
- **Integration**: OpenAI ChatKit agent
- **Payload**: Session creation/continuation data
- **Response**: Session token and config

### POST /api/intake

- **Purpose**: Lead intake and qualification
- **Integration**: Supabase database
- **Payload**: Lead information and qualification data
- **Response**: Lead ID and status

## Authentication System

JWT-based authentication for client portals using `jose` library:

- **Passcode System**: Each client has unique `CLIENT_{CLIENTSLUG}_PASSCODE` env var
- **Session Management**: JWT tokens signed with `JWT_SECRET` (min 32 chars)
- **Sign-in Routes**: `/[client]/signin` - Client-specific auth pages
- **Portal Routes**: `/clients/[client]` - Protected dashboards (require valid JWT)
- **Security**: Token-based sessions prevent unauthorized access

## Error Handling

- **Global Error Boundary**: `app/error.tsx` catches unhandled errors
- **404 Page**: `app/not-found.tsx` with branded styling
- **Route-Level**: Additional error boundaries as needed
- **Logging**: User-friendly UI messages, detailed logs to analytics (avoid exposing sensitive details)

## Deployment & Integration

### v0.app Integration

- **Auto-Sync**: Repository synced with v0.app deployments
- **Flow**: v0.app → GitHub → Vercel
- **Primary Development**: Use v0.app interface for major changes
- **Manual Edits**: Consider sync implications

### CI/CD

- **Verification**: `pnpm ci:verify` runs lint + typecheck + test
- **Secret Scanning**: Pre-commit and pre-push hooks prevent secret leaks
- **Performance**: Lighthouse CI integration for budget enforcement

## Best Practices

### TypeScript

- Comprehensive interface definitions for all components
- Use `@/*` path aliases for clean imports
- Mark client components with `"use client"` only when needed
- Type-safe polymorphic patterns (e.g., `as` prop for FrostedButton)

### Components

- PascalCase or kebab-case for component files (be consistent)
- Dedicated props interfaces
- Built-in analytics tracking for interactions
- ARIA labels, semantic HTML, keyboard navigation
- Lazy loading, code splitting, optimized re-renders

### Styling

- Utility-first Tailwind CSS
- Class Variance Authority (CVA) for variants
- Mobile-first responsive strategy
- CSS custom properties for theming
- Consistent glass effects (backdrop blur + transparency)

### File Naming

- **Components**: `GlassCard.tsx` or `glass-card.tsx`
- **Hooks**: `useAnalytics.ts` (camelCase with `use` prefix)
- **Utilities**: `formatDate.ts`, `utils.ts` (camelCase)
- **API Routes**: `api/contact/route.ts` (kebab-case)
- **Tests**: `*.test.ts` or `*.spec.ts` co-located
- **Avoid**: Mixing default and named exports (prefer named for tree-shaking)

## Route Structure

See [ROUTES.md](./ROUTES.md) for complete documentation.

### Primary Routes

- `/` - Landing page
- `/work` - Portfolio showcase
- `/web` - Web Experience service
- `/dev` - Development service
- `/social` - Social Media Marketing service
- `/design` - Brand & Visual Design service
- `/process` - C.L.O.S.E. Method
- `/resources` - Content hub
- `/faq` - General FAQ
- `/contact` - Contact form
- `/book` - Calendly booking
- `/support` - ChatKit live chat
- `/legal` - Terms & Privacy

### Dynamic Routes

- `/[client]/signin` - Client sign-in
- `/clients/[client]` - Client portals

### Navigation

- **Primary Nav**: WORK · WEB · DEV · SOCIAL · DESIGN · PROCESS · RESOURCES · FAQ · CONTACT
- **Footer**: Support · Legal · Book
- **SEO**: All pages include canonical URLs, OpenGraph, Twitter Cards, JSON-LD structured data

## Documentation Assets

### Architecture Map (`docs/architecture-map.json`)

Comprehensive reverse-engineered architecture with:

- Tech stack mapping (Vercel, Cloudflare, Supabase, OpenAI, Resend)
- DNS/TLS/HTTP configuration
- Integration points and deployment workflows
- Critical action items (GA4/GTM, error monitoring, security)
- Enhancement suggestions (payments, visual regression, feature flags)

**Last Updated**: 2025-10-10

### Phase Tracker (`PHASE3_TRACKER.md`)

Task tracking for current development phase:

- UX improvements (spacing, typography, touch targets, glassmorphism)
- SEO enhancements (canonical URLs, meta descriptions, sitemap)
- Performance optimization (video, lazy loading, images, Lighthouse CI)
- Accessibility (contrast, ARIA, keyboard nav, screen readers)
- Animation & interactions
- Responsive design QA

**Check tracker for current priorities and progress.**
