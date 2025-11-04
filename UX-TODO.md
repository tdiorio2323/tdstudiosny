# TD Studios - Non-API Improvements TODO

**Generated:** 2025-10-07
**Scope:** UI/UX, SEO, Content, Performance (excludes `/api` and backend logic)

---

## 🧠 Summary

**Current UX Condition:**

- **Good:** Strong luxury aesthetic, glassmorphism design system, mobile-responsive, proper analytics tracking, JSON-LD structured data on some pages
- **Critical Issues:** Broken homepage service links (4 routes don't exist), outdated sitemap, missing alt text on hero images, unverified award claims, massive image files (4MB+), placeholder references still in code
- **SEO Status:** Partial implementation - metadata present but sitemap incomplete, no robots.txt, missing JSON-LD on key pages
- **Performance:** Heavy image assets (parallax-hero.jpg = 4.4MB), no WebP conversion, multiple unused placeholder files

---

## ✅ Quick Wins (< 1 hour each)

### Routing & Navigation

- [ ] **Fix broken homepage service links** (app/page.tsx:14,21,28,35,42)
  - Links point to `/web`, `/dev`, `/social`, `/design` (don't exist)
  - Should all redirect to `/services` or `/services?tab=<category>`
  - **Impact:** Prevents 404s, improves navigation flow
  - **Files:** `app/page.tsx` lines 14, 21, 28, 35, 42, 49

- [ ] **Update homepage portfolio link** (app/page.tsx:49)
  - Links to `/portfolio` but route is `/work`
  - Change href from `/portfolio` to `/work`
  - **Files:** `app/page.tsx` line 49

- [ ] **Update sitemap.ts with all routes** (app/sitemap.ts)
  - Currently only includes `/`, `/portfolio`, `/contact`
  - Missing: `/work`, `/services`, `/pricing`, `/process`, `/book`, `/support`, `/resources`, `/resources/premade-designs`, `/legal`
  - Fix base URL: change `www.tdstudiosdigital.com` → `tdstudiosdigital.com` (www redirects)
  - **Files:** `app/sitemap.ts` lines 4-10

### Content & Trust

- [ ] **Remove or verify unverified award claims** (app/page.tsx:157-197)
  - All industry awards marked with `data-verify="pending"`
  - **Options:** (1) Remove badges, (2) Apply & verify, (3) Change to "As Featured On"
  - **Impact:** Credibility, trust signals, potential FTC compliance
  - **Files:** `app/page.tsx` lines 157-197

### Accessibility

- [ ] **Add missing alt text to hero section** (app/page.tsx:75-91)
  - Hero section has no background image alt text
  - Add descriptive alt to all decorative images
  - **Files:** `app/page.tsx`, check all `<Image>` components

- [ ] **Add skip-to-content link** (components/sticky-header.tsx or app/layout.tsx)
  - Keyboard navigation improvement
  - Add before header: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`
  - **Files:** `components/sticky-header.tsx` or `app/layout.tsx`

### SEO Basics

- [ ] **Create robots.txt** (app/robots.ts)
  - Next.js 15 format: export default function robots()
  - Allow all crawlers, reference sitemap
  - **Files:** Create `app/robots.ts`

---

## 🚀 High-Leverage Upgrades (1-4 hours each)

### Performance Optimization

- [ ] **Optimize hero images** (Priority: HIGH)
  - `parallax-hero.jpg` = 4.4MB, `design-showcase-1.jpg` = 4.2MB, `parallax-hero-backup.jpg` = 4.0MB, `web-hero.jpg` = 3.0MB
  - Convert to WebP format, resize to max 1920px wide
  - Target: < 300KB per hero image
  - **Impact:** LCP improvement, mobile loading speed, bandwidth savings
  - **Files:** `/public/*.jpg` (top 10 largest files)
  - **Commands:**
    ```bash
    # Install sharp if needed
    pnpm add -D sharp
    # Create optimization script
    # Convert JPG → WebP, resize, compress
    ```

- [ ] **Remove unused placeholder files** (public/)
  - `placeholder.svg`, `placeholder.jpg`, `placeholder-logo.png`, `placeholder-logo.svg`, `placeholder-user.jpg`
  - Only used in `app/page.tsx:280` with fallback
  - Replace fallback with proper asset or remove
  - **Files:** `public/placeholder.*`, update `app/page.tsx:280`

- [ ] **Implement lazy loading for below-fold images**
  - Homepage testimonials, capabilities, lead magnets sections
  - Add `loading="lazy"` to all images except hero (which has `priority`)
  - **Files:** `app/page.tsx` (all Image components after line 200)

### SEO Enhancement

- [ ] **Add JSON-LD structured data to all pages**
  - **Homepage:** Organization + WebSite schema
  - **Work page:** CollectionPage + CreativeWork schemas
  - **Services page:** ✅ Already has Service + Breadcrumb
  - **Process page:** HowTo schema with steps
  - **Support page:** Organization + ContactPoint
  - **Resources page:** ItemList schema
  - **Files:** Create schemas in respective `page.tsx` files, use `<JsonLd>` component

- [ ] **Add canonical URLs to all pages**
  - Currently only in root layout metadata
  - Add `alternates: { canonical: 'https://tdstudiosdigital.com/[route]' }` to each page's metadata
  - **Files:** All `app/*/page.tsx` metadata exports

- [ ] **Optimize meta descriptions** (150-160 chars)
  - Review all pages for compelling, keyword-rich descriptions
  - Ensure unique descriptions per page
  - **Files:** All `page.tsx` metadata objects

### Content Improvements

- [ ] **Add testimonial images** (app/page.tsx:204-264)
  - Currently using placeholder initials (M, S, R)
  - Add real client photos or professional headshots
  - **Files:** `app/page.tsx` lines 214, 231, 248 | Add images to `/public/testimonials/`

- [ ] **Replace "Featured Capabilities" placeholder fallback** (app/page.tsx:280)
  - Uses `placeholder.svg` as fallback
  - Ensure all capability images exist or create proper fallbacks
  - **Files:** `app/page.tsx` line 280

- [ ] **Add case study links from work page**
  - Work page exists but needs content enrichment
  - Link portfolio items to detailed case studies
  - **Files:** `app/work/portfolio-client-page.tsx`

### Mobile UX Polish

- [ ] **Enhance mobile menu animations**
  - Add slide-in/fade transitions
  - Improve touch feedback on mobile nav items
  - **Files:** `components/nav.tsx` lines 114-165

- [ ] **Add mobile-optimized touch zones**
  - Ensure all CTAs are minimum 44x44px tap targets
  - Review button spacing on mobile
  - **Files:** `app/page.tsx`, all CTA buttons

- [ ] **Improve mobile form UX** (contact page)
  - Add floating labels or better placeholder text
  - Improve input field spacing on mobile
  - Add inline validation feedback
  - **Files:** `app/contact/page.tsx`

---

## ⚙️ Technical Cleanup

### Code Quality

- [ ] **Remove console.log statements**
  - Found in: `tests/mobile-layout.spec.ts` (only in tests, acceptable)
  - Audit entire codebase for production console statements
  - **Files:** Run `grep -r "console.log" app/ components/ --exclude-dir=node_modules`

- [ ] **Remove unused Image fallback reference** (app/page.tsx:280)
  - References `placeholder.svg` which should be eliminated
  - Update capability images to use proper assets
  - **Files:** `app/page.tsx` line 280

- [ ] **Consolidate duplicate hero images**
  - `parallax-hero.jpg` (4.4MB) and `parallax-hero-backup.jpg` (4.0MB)
  - Determine which is active, remove unused
  - **Files:** `public/parallax-hero*.jpg`

### Asset Organization

- [ ] **Audit and remove unused public images**
  - Multiple "new-hero-image" variants (jpg and png)
  - Duplicate backgrounds (`global-background.jpg`, `main-background.jpg`)
  - **Files:** Review all `/public/*.{jpg,png}` files, remove unused

- [ ] **Organize client logos into consistent structure**
  - Currently: `/public/clients/[client]/logo.{png,jpg}`
  - Inconsistent extensions (png vs jpg)
  - Convert all to WebP, standardize naming
  - **Files:** `/public/clients/*/logo.*`

- [ ] **Create image optimization script**
  - Automate WebP conversion on pre-commit
  - Add to package.json scripts
  - **Files:** Create `scripts/optimize-images.mjs`

### Layout & Structure

- [ ] **Extract testimonials to separate component**
  - Homepage testimonials section is 80+ lines
  - Create reusable `<TestimonialCard>` component
  - **Files:** Extract from `app/page.tsx:204-264` → `components/testimonial-card.tsx`

- [ ] **Create reusable stat card component**
  - Stats section duplicates structure
  - Extract to `<StatCard>` component
  - **Files:** Extract from `app/page.tsx:126-151` → `components/stat-card.tsx`

- [ ] **Standardize page hero sections**
  - Multiple pages have similar hero structure
  - Create `<PageHero>` component with consistent props
  - **Files:** Extract pattern from pricing, process, contact pages

### Mobile-Specific

- [ ] **Test mobile viewport height fix** (app/layout.tsx:62-89)
  - Inline script handles iOS Safari viewport issues
  - Verify functionality on iOS 14+, Android Chrome
  - Consider moving to external script file for CSP compliance
  - **Files:** `app/layout.tsx` lines 62-89

- [ ] **Add touch gesture support to design carousel**
  - If `design-carousel.tsx` component exists
  - Add swipe gestures for mobile users
  - **Files:** `components/design-carousel.tsx`

### Typography & Readability

- [ ] **Review mobile text sizing**
  - Ensure all body text is minimum 16px on mobile
  - Check headings for proper hierarchy
  - **Files:** `app/globals.css`, all page components

- [ ] **Improve contrast ratios**
  - White text on glassmorphism needs sufficient backdrop blur
  - Verify WCAG AA compliance (4.5:1 for normal text)
  - **Files:** `app/globals.css` (glass-card classes)

---

## 📊 Priority Ranking

**Immediate (Pre-Launch):**

1. Fix broken service links (app/page.tsx)
2. Update sitemap with all routes
3. Optimize hero images (4MB+ files)
4. Remove/verify award badges

**Week 1 (Post-Launch):**

1. Add JSON-LD to all pages
2. Create robots.txt
3. Add testimonial images
4. Remove unused placeholder files

**Week 2-3 (Polish):**

1. Lazy load below-fold images
2. Mobile UX improvements
3. Extract reusable components
4. Asset organization cleanup

---

## 🎯 Expected Impact

**Quick Wins Total Time:** ~4 hours
**Quick Wins Impact:** Fixes critical navigation bugs, improves SEO crawlability, establishes trust signals

**High-Leverage Total Time:** ~16 hours
**High-Leverage Impact:** 50-70% reduction in page load time, comprehensive SEO coverage, improved mobile conversion

**Technical Cleanup Total Time:** ~12 hours
**Technical Cleanup Impact:** Improved maintainability, reduced bundle size, better developer experience

---

## 📝 Notes

- All tasks exclude `/api` routes and backend logic per constraints
- Focus on user-facing improvements that directly impact conversion and engagement
- Mobile-first approach prioritized throughout recommendations
- SEO improvements target both technical and content-level optimization
- Performance gains focused on LCP, CLS, and FID metrics
