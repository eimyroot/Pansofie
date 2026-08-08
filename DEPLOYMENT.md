# Deployment

## Render

1. Connect repository `nulleimy/PANSOFIE`.
2. Render can consume `render.yaml` from the repository root.
3. Build command: `npm install && npm run build`.
4. Publish directory: `dist`.
5. Keep the SPA rewrite `/* -> /index.html`.
6. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Render environment variables.

## Supabase

Apply the SQL migration in `supabase/migrations/20260808130500_auth_profiles_roles.sql`.

Configure Auth URL settings so the deployed Pansofie origin is allowed for:

- Site URL
- Redirect URLs
- Google OAuth callback flow if Google sign-in is enabled

Do not expose or commit the Supabase service-role key.
