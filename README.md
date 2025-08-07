# TD Studios NY

Official website for TD Studios New York - Premium AI Solutions & Digital Innovation

## Project Overview

**Domain:** tdstudiosny.com  
**Status:** Development  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS  
**Created:** 2025-08-07

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd tdstudiosny

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your actual API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
tdstudiosny/
├── app/                  # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── public/              # Static assets
│   └── images/          # Image assets
├── components.json      # UI component configuration
├── tailwind.config.ts   # Tailwind configuration
├── next.config.ts       # Next.js configuration
└── package.json         # Dependencies

```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker
```

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🔒 TypeScript for type safety
- 🚀 Optimized for performance
- 🎯 SEO optimized
- 🤖 AI integration ready

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## Environment Variables

Create a `.env.local` file with:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://tdstudiosny.com
NEXT_PUBLIC_SITE_NAME=TD Studios NY

# API Keys
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
STRIPE_PUBLISHABLE_KEY=your_key_here
```

## Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Run linting: `npm run lint`
4. Build project: `npm run build`
5. Commit changes: `git commit -m "Add: your feature"`
6. Push to repository: `git push origin feature/your-feature`
7. Create pull request

## Key Pages & Routes

- `/` - Homepage
- `/about` - About TD Studios NY
- `/services` - Services offered
- `/contact` - Contact information
- `/api/*` - API endpoints

## Tech Stack Details

- **Framework:** Next.js 15.4.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

## Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Core Web Vitals: All green

## Security

- Environment variables for sensitive data
- HTTPS enforced in production
- API rate limiting implemented
- Input validation on all forms
- XSS protection headers

## Contact

**TD Studios NY**  
Website: tdstudiosny.com  
Email: contact@tdstudiosny.com

---

© 2025 TD Studios NY. All rights reserved.
EOF < /dev/null