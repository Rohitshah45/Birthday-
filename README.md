# The Little World (foundation build, M1)
Done: schema+RLS, hashed-answer gate, rate limit, JWT cookie + revocation epoch, protected /world shell, set-answer script, entry screen.
NOT built yet: admin dashboard, uploads, gallery, videos, cards, letter, final surprise, QR page, tests. NOT verified: nothing here has been run against Supabase/Vercel.
## Setup
1. Supabase: run supabase/migrations/001_init.sql; create PRIVATE bucket `media-private`.
2. cp .env.example .env.local; fill values (random 32+ byte strings for ANSWER_PEPPER, SESSION_SECRET, IP_HASH_SECRET). Never prefix secrets with NEXT_PUBLIC_.
3. npm i && npx tsx --env-file=.env.local scripts/set-entry-answer.ts   (hidden prompt)
4. npm run dev, then deploy to Vercel with the same env vars.
Note: ANSWER_PEPPER must not change after the answer is set (re-run the script if it does).
