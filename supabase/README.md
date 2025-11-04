# Supabase Development Notes

This project uses the Supabase CLI for local schema changes. The `pnpm db:migrate` and `pnpm db:seed` scripts wrap the common commands.

## Requirements

- Supabase CLI installed locally (`brew install supabase/tap/supabase` or see https://supabase.com/docs/guides/cli)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in your `.env.local`

## Common Tasks

- Apply migrations locally: `pnpm db:migrate`
- Generate a new migration: `supabase migration new <name>`
- Seed the database: `pnpm db:seed`
- Generate Supabase client types: `supabase gen types typescript --project-id <ref> --schema public > types/supabase.ts`

Document any schema changes here when you modify `supabase-schema.sql` or create new migrations.
