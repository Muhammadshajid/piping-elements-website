Piping Elements - Advanced Package (Supabase + Next.js)

This package contains:
 - migration.sql (database schema)
 - supabase_functions/ (Edge Functions)
 - nextjs/ (Next.js app with advanced admin UI)

Deployment steps (non-technical):
1) In Supabase -> SQL Editor -> run migration.sql
2) Create storage bucket 'website-assets' (public) in Supabase Storage
3) Functions -> New function -> create each function from supabase_functions and deploy
4) Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to each function's settings
5) In nextjs/.env.local set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_API_BASE
6) Push nextjs folder to GitHub and connect to Vercel; add env vars in Vercel and deploy

Security: keep service role key secret; do not commit .env.local
