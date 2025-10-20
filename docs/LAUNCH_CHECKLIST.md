# TD Studios Launch Checklist

**Owner:** Tyler
**Project:** tdstudiosny.com
**Target Launch:** TBD
**Last Updated:** 2025-10-07

---

## PRE-LAUNCH BLOCKERS (Must Complete)

### 🔴 1. Fix TypeScript Errors (2h)
**File:** `app/[client]/signin/page.tsx`

```bash
# Verify the issue
pnpm typecheck

# Possible fixes:
# Option 1: Check if "use client" is properly placed (line 1)
# Option 2: Verify React types are imported
# Option 3: Check tsconfig.json jsx configuration

# After fixing, verify:
pnpm typecheck
# Should show 0 errors
```

**Acceptance:** `pnpm typecheck` passes with 0 errors

---

### 🔴 2. Rotate Exposed API Keys (30min)

**CRITICAL:** `.env.local` contains active credentials that may be exposed.

#### Step 1: Rotate OpenAI Key
```bash
# 1. Go to https://platform.openai.com/api-keys
# 2. Click "Create new secret key"
# 3. Name it "TD Studios Production"
# 4. Copy the new key (starts with sk-proj-)
# 5. Revoke the old key: sk-proj-2RYVz...Of4oA

# 6. Update Vercel production environment
# Go to: https://vercel.com/your-team/tdstudiosny/settings/environment-variables
# Update OPENAI_API_KEY value

# 7. Update local .env.local (DO NOT COMMIT)
echo "OPENAI_API_KEY=sk-proj-NEW_KEY_HERE" >> .env.local
```

#### Step 2: Rotate Supabase Keys
```bash
# 1. Go to https://supabase.com/dashboard/project/crpalakzdzvtgvljlutd/settings/api
# 2. Click "Reset service_role secret"
# 3. Confirm and copy new key

# 4. Update Vercel production environment
# SUPABASE_SERVICE_ROLE_KEY=new_key_here

# 5. Update local .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=new_key_here" >> .env.local
```

#### Step 3: Clean Up
```bash
# Remove exposed .env.local from disk
rm .env.local

# Verify .env.local is in .gitignore
grep -q ".env.local" .gitignore && echo "✓ .env.local is ignored" || echo "✗ ADD .env.local TO .gitignore"

# Create fresh .env.local from example
cp .env.local.example .env.local
# Then manually add new keys
```

**Acceptance:** All keys rotated, old keys revoked, Vercel env vars updated

---

### 🔴 3. Implement Contact Form Email Sending (1h)

**File:** `app/api/contact/route.ts`

```bash
# 1. Sign up for Resend account
# Go to: https://resend.com/signup

# 2. Get API key from: https://resend.com/api-keys

# 3. Add to Vercel environment variables
# RESEND_API_KEY=re_xxx

# 4. Update .env.local
echo "RESEND_API_KEY=re_xxx" >> .env.local

# 5. Update the route handler
```

**Code changes needed in `app/api/contact/route.ts`:**

```typescript
// Add after imports
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Replace line 41: // TODO: send email / persist
// With:

try {
  await resend.emails.send({
    from: 'TD Studios <noreply@tdstudiosny.com>',
    to: process.env.CONTACT_TO_EMAIL || 'tyler@tdstudiosny.com',
    subject: `New ${parsed.data.service} Inquiry from ${parsed.data.fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${parsed.data.fullName}</p>
      <p><strong>Email:</strong> ${parsed.data.email}</p>
      <p><strong>Company:</strong> ${parsed.data.company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${parsed.data.phone || 'N/A'}</p>
      <p><strong>Service:</strong> ${parsed.data.service}</p>
      <p><strong>Budget:</strong> ${parsed.data.budget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${parsed.data.timeline || 'N/A'}</p>
      <p><strong>Details:</strong></p>
      <p>${parsed.data.details}</p>
    `,
  })

  console.log('✓ Contact email sent successfully')
  return new Response('OK', { status: 200 })
} catch (error) {
  console.error('✗ Failed to send email:', error)
  return new Response('Failed to send email', { status: 500 })
}
```

**Test the endpoint:**
```bash
# Start dev server
pnpm dev

# In another terminal, test the API
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "service": "Web Design",
    "details": "This is a test inquiry"
  }'

# Should return: OK
# Check tyler@tdstudiosny.com for email
```

**Acceptance:** Contact form sends emails to tyler@tdstudiosny.com successfully

---

### 🔴 4. Fix Broken Homepage Service Links (15min)

**File:** `app/page.tsx`

```bash
# Open the file
code app/page.tsx
```

**Update lines 14, 21, 28, 35 (services array):**

```typescript
// Current (BROKEN):
{ href: "/web" }
{ href: "/dev" }
{ href: "/social" }
{ href: "/design" }

// Change to:
{ href: "/services" }
{ href: "/services" }
{ href: "/services" }
{ href: "/services" }

// Or create anchor links:
{ href: "/services#web" }
{ href: "/services#development" }
{ href: "/services#social" }
{ href: "/services#design" }
```

**Verify the fix:**
```bash
# Search for broken links
grep -n "href=\"/web\"\|href=\"/dev\"\|href=\"/social\"\|href=\"/design\"" app/page.tsx

# Should return empty after fix

# Test in browser
pnpm dev
# Visit http://localhost:3000 and click service links
```

**Acceptance:** All service links on homepage navigate correctly

---

### 🔴 5. Verify Environment Variables in Vercel (15min)

```bash
# List current environment variables (requires Vercel CLI)
vercel env ls

# Required variables for production:
# ✓ OPENAI_API_KEY (rotated from step 2)
# ✓ SUPABASE_URL
# ✓ SUPABASE_SERVICE_ROLE_KEY (rotated from step 2)
# ✓ NEXT_PUBLIC_SUPABASE_URL
# ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
# ✓ RESEND_API_KEY (added in step 3)
# ✓ CONTACT_TO_EMAIL

# Add missing variables:
vercel env add RESEND_API_KEY production
# Paste value when prompted

vercel env add CONTACT_TO_EMAIL production
# Enter: tyler@tdstudiosny.com
```

**Manual verification:**
1. Go to https://vercel.com/your-team/tdstudiosny/settings/environment-variables
2. Verify all 7 variables are set for "Production"
3. Ensure no variables have placeholder values

**Acceptance:** All environment variables configured in Vercel

---

## PRE-LAUNCH VALIDATION (1h)

### Run Full CI Check
```bash
# Lint check
pnpm lint
# Expected: ✔ No ESLint warnings or errors

# Type check
pnpm typecheck
# Expected: 0 errors (after fixing signin page)

# Run tests
pnpm test
# Expected: All tests pass (update snapshot if needed)

# Build for production
pnpm build
# Expected: Build completes successfully

# Verify build output
ls -lh .next
# Should see optimized production build

# Test production build locally
pnpm serve
# Visit http://localhost:3000 and test all pages
```

### Manual Testing Checklist

#### Homepage (/)
- [ ] Hero section displays correctly
- [ ] All service cards render
- [ ] Service links navigate to `/services`
- [ ] Stats section shows correct numbers
- [ ] Testimonials display properly
- [ ] Lead magnet CTAs work
- [ ] Mobile responsive (test on phone)

#### Contact Form (/contact)
- [ ] Form validates required fields
- [ ] Honeypot (website field) catches spam
- [ ] Submit sends email to tyler@tdstudiosny.com
- [ ] User receives confirmation
- [ ] Error handling works (test invalid email)
- [ ] Rate limiting triggers after 5 requests

#### Services (/services)
- [ ] All three tabs load (Design, Development, Web Experience)
- [ ] Content displays correctly in each tab
- [ ] CTAs link to contact/book pages
- [ ] Mobile tabs work properly

#### Pricing (/pricing)
- [ ] All three tiers display
- [ ] FAQ section renders
- [ ] "Get Started" buttons work
- [ ] JSON-LD structured data validates

#### Work (/work)
- [ ] Portfolio items display
- [ ] Images load correctly
- [ ] Links work properly

#### Process (/process)
- [ ] All 5 steps render
- [ ] Timeline displays correctly
- [ ] CTAs work

#### Book (/book)
- [ ] Calendly widget loads
- [ ] Booking flow completes

#### Support (/support)
- [ ] ChatKit widget loads
- [ ] Can initiate chat
- [ ] AI responses work

#### Legal (/legal)
- [ ] Terms of Service display
- [ ] Privacy Policy displays
- [ ] Content is accurate and up-to-date

#### Client Portal (/[client]/signin)
- [ ] Signin page loads without TypeScript errors
- [ ] Keypad works
- [ ] Correct passcode grants access
- [ ] Wrong passcode shows error
- [ ] Redirects to client dashboard after signin

#### Resources (/resources)
- [ ] Resource hub displays
- [ ] Links work properly

#### Premade Designs (/resources/premade-designs)
- [ ] All 6 designs display
- [ ] Images load correctly
- [ ] Prices show correctly
- [ ] "Contact" button works (Stripe integration comes later)

---

## DEPLOYMENT (30min)

### Pre-Deploy Verification
```bash
# Ensure you're on main branch
git branch
# Should show: * main

# Pull latest changes
git pull origin main

# Verify no uncommitted changes
git status
# Should be clean (except .env.local which is ignored)

# Verify secrets are NOT committed
git log --all --full-history -- .env.local
# Should return empty (no commits with .env.local)
```

### Deploy to Vercel
```bash
# Option 1: Via Git Push (Recommended)
git push origin main
# Vercel will auto-deploy

# Option 2: Via Vercel CLI
vercel --prod

# Monitor deployment
vercel logs --follow
```

### Post-Deploy Validation
```bash
# Wait for deployment to complete
# Visit: https://tdstudiosny.com

# Check deployment status
vercel ls

# Verify deployment URL
curl -I https://tdstudiosny.com
# Should return: HTTP/2 200

# Test SSL certificate
curl -vI https://tdstudiosny.com 2>&1 | grep -i "SSL"
# Should show valid certificate
```

### DNS & Domain Verification
```bash
# Check DNS propagation
nslookup tdstudiosny.com
# Should resolve to Vercel IP

# Check www redirect
curl -I https://www.tdstudiosdigital.com
# Should redirect 301 to https://tdstudiosny.com

# Verify all pages are accessible
curl -I https://tdstudiosny.com/
curl -I https://tdstudiosny.com/work
curl -I https://tdstudiosny.com/services
curl -I https://tdstudiosny.com/pricing
curl -I https://tdstudiosny.com/contact
# All should return 200
```

---

## POST-LAUNCH (1-2h)

### Monitoring Setup

#### 1. Vercel Analytics
```bash
# Already installed, verify it's working
# Visit: https://vercel.com/your-team/tdstudiosny/analytics
# Should see real-time traffic data
```

#### 2. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://tdstudiosny.com`
3. Verify via DNS or HTML tag
4. Submit sitemap (once created): `https://tdstudiosny.com/sitemap.xml`

#### 3. Test Contact Form End-to-End
```bash
# From production site
# 1. Visit https://tdstudiosny.com/contact
# 2. Fill out form with real data
# 3. Submit
# 4. Check tyler@tdstudiosny.com for email
# 5. Verify Supabase has record (if persisting)
```

#### 4. Check Error Logs
```bash
# Monitor for errors in first hour
vercel logs --follow

# Check for common issues:
# - 500 errors
# - Failed API calls
# - Missing environment variables
# - Image loading failures
```

### SEO Validation

#### Meta Tags
```bash
# Test OpenGraph tags
curl -s https://tdstudiosny.com | grep -o '<meta property="og:[^"]*" content="[^"]*"'

# Test Twitter Card
curl -s https://tdstudiosny.com | grep -o '<meta name="twitter:[^"]*" content="[^"]*"'

# Validate with tools:
# - https://cards-dev.twitter.com/validator
# - https://developers.facebook.com/tools/debug/
```

#### JSON-LD Structured Data
```bash
# Test with Google Rich Results Tool
# Visit: https://search.google.com/test/rich-results
# Test URL: https://tdstudiosny.com/pricing
# Should show valid FAQ and Breadcrumb schema
```

### Performance Testing

#### Lighthouse Audit
```bash
# Run Lighthouse via CLI (if installed)
pnpm lh:routes

# Or use Chrome DevTools:
# 1. Open Chrome DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Run audit for:
#    - Performance
#    - Accessibility
#    - Best Practices
#    - SEO

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

#### Core Web Vitals
```bash
# Check real user metrics after 24-48 hours
# Visit: https://vercel.com/your-team/tdstudiosny/analytics

# Target metrics:
# LCP (Largest Contentful Paint): < 2.5s
# FID (First Input Delay): < 100ms
# CLS (Cumulative Layout Shift): < 0.1
```

### Security Validation

#### SSL/TLS
```bash
# Test SSL configuration
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=tdstudiosny.com
# Target: A+ rating
```

#### Headers
```bash
# Check security headers
curl -I https://tdstudiosny.com | grep -i "x-frame-options\|x-content-type\|strict-transport"

# Should see:
# x-frame-options: SAMEORIGIN
# x-content-type-options: nosniff
# strict-transport-security: max-age=...
```

#### Secret Scanning
```bash
# Run final secret scan
pnpm scan:secrets

# Should return: No secrets found
```

---

## WEEK 1 POST-LAUNCH

### Analytics Monitoring

#### Daily Checks (First 3 Days)
```bash
# Check Vercel Analytics
# https://vercel.com/your-team/tdstudiosny/analytics

# Monitor:
# - Unique visitors
# - Page views
# - Top pages
# - Bounce rate
# - Error rate (should be <1%)

# Check error logs
vercel logs | grep -i "error"
```

#### Contact Form Conversions
- [ ] Track number of form submissions
- [ ] Verify all emails are received
- [ ] Calculate conversion rate (submissions / visitors)
- [ ] Identify any patterns in errors

#### ChatKit Support Usage
- [ ] Monitor chat session count
- [ ] Track common questions
- [ ] Evaluate AI response quality
- [ ] Adjust prompts if needed

### Content Updates

#### Add Real Testimonials (if available)
```bash
# File: app/page.tsx (lines 212-263)
# Replace placeholder testimonials with real client quotes
# Add actual client names, companies, photos
```

#### Verify Award Claims
```bash
# File: app/page.tsx (lines 158-197)
# If not yet verified:
# 1. Remove data-verify="pending" attribute
# 2. Or apply for actual awards
# 3. Or replace with "Featured on..." if applicable
```

---

## KNOWN ISSUES & FUTURE WORK

### Not Blocking Launch

#### 1. Premade Designs Checkout (8h effort)
- Currently shows "Contact" button only
- Stripe integration needed for direct purchases
- Tracked in TODO.md under "NEXT" priority

#### 2. Missing JSON-LD on Key Pages (2h effort)
- Homepage needs Organization schema
- Work page needs CreativeWork schema
- Services page needs Service schema

#### 3. No Sitemap.xml (1h effort)
```bash
# Create app/sitemap.ts after launch
# Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
```

#### 4. No Error Monitoring (2h effort)
- Consider adding Sentry or similar
- Track client-side errors
- Monitor API route failures

#### 5. Test Snapshot Mismatch (30min effort)
```bash
# Update failing test
pnpm test -- -u
# Verify test passes
pnpm test
```

---

## ROLLBACK PROCEDURE

If critical issues arise post-launch:

### Option 1: Rollback via Vercel Dashboard
1. Go to https://vercel.com/your-team/tdstudiosny/deployments
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

### Option 2: Rollback via Git
```bash
# Find last working commit
git log --oneline

# Revert to previous commit
git revert HEAD
git push origin main

# Vercel will auto-deploy the rollback
```

### Option 3: Emergency Fix
```bash
# For quick hotfixes:
git checkout -b hotfix/issue-name
# Make minimal fix
git commit -m "hotfix: description"
git push origin hotfix/issue-name

# Merge to main via PR (or force push if urgent)
git checkout main
git merge hotfix/issue-name
git push origin main
```

---

## LAUNCH SIGN-OFF

### Pre-Launch Checklist (All Must Be ✓)

- [ ] TypeScript builds without errors
- [ ] All tests passing
- [ ] Contact form sends emails
- [ ] API keys rotated and secure
- [ ] Environment variables set in Vercel
- [ ] Homepage service links fixed
- [ ] All pages manually tested
- [ ] Mobile responsive verified
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] Vercel deployment successful
- [ ] Post-launch monitoring configured

### Launch Approval

**Technical Lead:** _____________________ Date: _______

**Project Owner (Tyler):** _____________________ Date: _______

---

## SUPPORT CONTACTS

### Technical Issues
- **Vercel Support:** https://vercel.com/help
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Support:** https://supabase.com/dashboard/support

### Service Providers
- **Domain Registrar:** [Add registrar name]
- **Email Service (Resend):** support@resend.com
- **OpenAI Platform:** https://platform.openai.com/support

### Emergency Contact
- **Tyler:** tyler@tdstudiosny.com

---

**Last Updated:** 2025-10-07
**Checklist Version:** 1.0
**Next Review:** After successful launch
