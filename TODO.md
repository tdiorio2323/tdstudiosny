# TD Studios Production TODO

**Owner:** Tyler
**Last Updated:** 2025-10-07
**Project Status:** 85% Production Ready

---

## 🔴 NOW (Critical - Before Launch)

### Security & Configuration

- [ ] **Fix TypeScript errors in signin page** (2h)
  - File: `app/[client]/signin/page.tsx`
  - Issue: 26 JSX.IntrinsicElements errors
  - Likely cause: Missing React types or "use client" directive issue
  - **Blocker:** Will prevent TypeScript-strict builds

- [ ] **Rotate exposed API keys** (0.5h)
  - `.env.local` contains active OpenAI and Supabase keys
  - **CRITICAL:** These are committed to local repo
  - Actions:
    1. Generate new OpenAI API key at platform.openai.com
    2. Rotate Supabase service role key in dashboard
    3. Update Vercel environment variables
    4. Delete `.env.local` from local machine
    5. Document keys in password manager

- [ ] **Add RESEND_API_KEY to environment** (0.5h)
  - Contact form needs this to send emails
  - Sign up at resend.com
  - Add to Vercel env vars and `.env.local.example`

### Core Functionality

- [ ] **Implement contact form email sending** (1h)
  - File: `app/api/contact/route.ts:41`
  - Currently has `// TODO: send email / persist`
  - Use Resend API to send to `tyler@tdstudiosdigital.com`
  - Add confirmation email to user
  - Log to Supabase for backup

- [ ] **Fix broken service links on homepage** (0.5h)
  - File: `app/page.tsx:14,21,28,35`
  - Links point to `/web`, `/dev`, `/social`, `/design`
  - These routes don't exist (should be `/services`)
  - Update to `/services` or create redirect rules

---

## 🟡 NEXT (High Priority - Week 1)

### Monetization

- [ ] **Implement Stripe checkout for premade designs** (8h)
  - File: `app/resources/premade-designs/page.tsx:61`
  - Currently has TODO comment for Stripe integration
  - Requirements:
    - [ ] Set up Stripe account
    - [ ] Install `@stripe/stripe-js` and `stripe` packages
    - [ ] Create product catalog in Stripe
    - [ ] Build checkout component
    - [ ] Add success/cancel pages
    - [ ] Implement webhook for order fulfillment
    - [ ] Send download links via email
    - [ ] Test with Stripe test mode

### SEO & Metadata

- [ ] **Add comprehensive JSON-LD structured data** (2h)
  - Currently only on pricing page
  - Add to:
    - [ ] Homepage (Organization, WebSite schema)
    - [ ] Work page (CollectionPage, CreativeWork)
    - [ ] Services page (Service, Offer)
    - [ ] Process page (HowTo)
    - [ ] Support page (Organization, ContactPoint)

- [ ] **Generate sitemap.xml** (1h)
  - Create `app/sitemap.ts` using Next.js 15 API
  - Include all static routes
  - Add changefreq and priority
  - Submit to Google Search Console

- [ ] **Create/customize robots.txt** (0.5h)
  - Create `app/robots.ts`
  - Allow all bots except AI scrapers (optional)
  - Reference sitemap location

### Trust & Credibility

- [ ] **Verify or remove industry award claims** (1h)
  - File: `app/page.tsx:158-197`
  - Homepage has "AWWWARDS WINNER", "CSS DESIGN AWARDS", etc.
  - All marked with `data-verify="pending"`
  - Options:
    1. Apply and get verified
    2. Remove claims
    3. Change to "Featured on..." if legitimate

---

## 🟢 LATER (Medium/Low Priority - Week 2+)

### Testing & Quality

- [ ] **Add Playwright configuration** (1h)
  - File mentioned in CLAUDE.md but `playwright.config.ts` missing
  - Create config with proper viewport sizes
  - Set up CI integration

- [ ] **Update failing snapshot test** (0.5h)
  - File: `tests/nav.spec.tsx`
  - Navigation snapshot doesn't match current structure
  - Update snapshot or fix nav component

- [ ] **Expand test coverage** (4h)
  - Add E2E tests for:
    - [ ] Contact form submission flow
    - [ ] Client signin flow
    - [ ] Calendly booking flow
    - [ ] ChatKit support chat
  - Target 80% coverage for critical paths

### Monitoring & Observability

- [ ] **Add error monitoring** (2h)
  - Install Sentry or similar
  - Track client-side errors
  - Monitor API route failures
  - Set up alerts for critical errors

- [ ] **Add performance monitoring** (1h)
  - Vercel Analytics already installed
  - Add custom Web Vitals tracking
  - Monitor form conversion rates
  - Track ChatKit engagement

### UX Enhancements

- [ ] **Add loading states to all forms** (2h)
  - Contact form
  - Client signin
  - Newsletter signup
  - Add spinners and disabled states

- [ ] **Implement newsletter signup backend** (3h)
  - Currently just links to contact form
  - Options:
    - Resend + Supabase
    - ConvertKit/Mailchimp integration
    - Custom email service

- [ ] **Add success pages** (2h)
  - Contact form thank you page
  - Newsletter confirmation page
  - Download confirmation for lead magnets

### Content & Polish

- [ ] **Add product schema for premade designs** (1h)
  - JSON-LD Product schema
  - Include price, image, description
  - Improve e-commerce SEO

- [ ] **Missing image assets** (1h)
  - `/design-hero.jpg` referenced but not found
  - Audit all image references
  - Add fallbacks or placeholders

- [ ] **Client testimonials enhancements** (3h)
  - Add real client photos
  - Add company logos
  - Link to case studies
  - Add video testimonials option

### Infrastructure

- [ ] **Create staging environment** (2h)
  - Set up Vercel preview branch
  - Separate Supabase project for staging
  - Test API keys for dev environment
  - Document deployment workflow

- [ ] **Add GitHub Actions CI workflow** (2h)
  - Run on PR: lint, typecheck, test
  - Block merge if checks fail
  - Add Playwright E2E tests
  - Deploy preview to Vercel

### Future Features

- [ ] **Blog/content marketing** (20h+)
  - Add `/blog` route
  - Set up MDX or CMS integration
  - Write initial content
  - Add RSS feed

- [ ] **Portfolio filtering** (4h)
  - Add category filters to work page
  - Add search functionality
  - Add sorting (date, category, etc.)

- [ ] **Video case studies** (varies)
  - Film client success stories
  - Add video player component
  - Host on Vimeo/YouTube
  - Embed on work page

---

## ✅ COMPLETED

- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS + shadcn/ui setup
- [x] Supabase client intake integration
- [x] OpenAI ChatKit support chat
- [x] Vercel Analytics integration
- [x] Mobile responsive design
- [x] SEO meta tags (OpenGraph, Twitter)
- [x] JSON-LD on pricing page
- [x] Calendly booking integration
- [x] Client portal signin system
- [x] Secret scanning with secretlint
- [x] Husky pre-commit hooks
- [x] Contact form validation
- [x] Pricing page with 3 tiers
- [x] Process page with methodology
- [x] Legal pages (Terms, Privacy)
- [x] Resources hub
- [x] Premade designs catalog (UI only)

---

## NOTES

### Priority Breakdown

- **NOW (Critical):** 4.5 hours - Must complete before launch
- **NEXT (High):** 12.5 hours - Complete in Week 1 post-launch
- **LATER (Medium/Low):** 30+ hours - Ongoing improvements

### Dependencies

- Stripe integration blocks premade design sales
- Email sending blocks lead generation
- TypeScript errors block strict builds
- Exposed secrets block secure launch

### Quick Wins (< 1 hour each)

1. Fix homepage service links (0.5h)
2. Add RESEND_API_KEY (0.5h)
3. Create robots.txt (0.5h)
4. Update snapshot test (0.5h)
5. Rotate API keys (0.5h)

### Technical Debt

- Next.js config ignores TypeScript/ESLint errors (for v0.app sync)
- In-memory rate limiting in contact API (loses data on restart)
- No database migrations system (Supabase only)
- Client access uses hardcoded passcodes (not hashed)
