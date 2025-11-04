# GEMINI.md

## Project Overview

This is a Next.js project for the TD Studios website, built with [v0.app](https://v0.app) and deployed on Vercel. The project uses TypeScript, Tailwind CSS, and various React libraries for UI components. The site is designed to be a luxury-focused creative agency website.

## Building and Running

### Development

To run the development server:

```bash
npm run dev
```

### Production Build

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

To lint the project files:

```bash
npm run lint
```

## Development Conventions

- **Styling:** The project uses Tailwind CSS for styling. Global styles are defined in `app/globals.css`.
- **Components:** Reusable components are located in the `components` directory.
- **Analytics:** The project uses Vercel Analytics, configured in `app/layout.tsx`.
- **Deployment:** The project is automatically deployed to Vercel from the `main` branch.
- **v0.app:** The project is synced with a v0.app project, which means that changes made in the v0.app UI will be automatically pushed to this repository.
