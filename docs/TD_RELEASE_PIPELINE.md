# TD Studios Release Pipeline

## Development Workflow

### Core Principles

- **Single Dev Server**: Always run only one Next.js dev server on port 3000
- **Node 20.x**: Lock to Node version 20 for consistency
- **pnpm**: Use pnpm as the primary package manager
- **Clean Builds**: Always clear .next cache when switching contexts

### Development Commands

```bash
# Start development
NEXT_PORT=3000 pnpm dev

# Clean and restart
pkill -f "next dev" || true && rm -rf .next node_modules/.cache && pnpm dev

# Testing
npx playwright test
npx playwright test --ui

# Linting and type checking
pnpm lint
pnpm build  # includes type checking
```

### Port Management

- **Port 3000**: Primary development port
- **Never auto-switch**: If port 3000 is in use, stop and resolve conflicts
- **Kill processes**: Use `lsof -nP -iTCP:3000 -sTCP:LISTEN` to find conflicts

### Cache Management

- Clear `.next` directory when encountering module resolution errors
- Clear `node_modules/.cache` for dependency issues
- Recreate webpack cache structure: `mkdir -p .next/cache/webpack`

### Claude Code Integration

- Always use single dev server to avoid ENOENT race conditions
- Keep core documentation loaded in context
- Use .clauderc for persistent configuration

## Deployment Pipeline

### v0.app Integration

- Primary development through v0.app interface
- Auto-sync with GitHub repository
- Automatic Vercel deployment

### Production Build

- ESLint errors ignored for deployment compatibility
- TypeScript errors ignored for v0.app integration
- Images set to unoptimized for static deployment

### Environment Configuration

- `.env.local` for local development variables
- Vercel environment variables for production
- Analytics configuration through Vercel Analytics

## Quality Gates

### Pre-deployment Checklist

- [ ] Single dev server running without errors
- [ ] No ENOENT or module resolution errors
- [ ] All tests passing
- [ ] Build completes successfully
- [ ] Analytics tracking functional

### Error Handling

- **ENOENT Module Errors**: Clear .next cache and restart
- **Port Conflicts**: Kill existing processes, don't auto-switch
- **Dependency Issues**: Use `pnpm install` to resolve
- **Build Failures**: Check TypeScript and ESLint configuration

## Troubleshooting

### Common Issues

1. **Multiple dev servers**: Kill all and start single instance
2. **Module not found**: Clear .next and restart
3. **Port conflicts**: Use lsof to identify and kill conflicting processes
4. **Cache corruption**: Remove .next and node_modules/.cache

### Emergency Reset

```bash
pkill -f "next dev" || true && rm -rf .next node_modules/.cache && nvm use 20 && pnpm ci && NEXT_PORT=3000 pnpm dev
```
