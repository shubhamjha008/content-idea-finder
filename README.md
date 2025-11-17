
# Content Idea Finder (Angular 17) - Starter

This repo contains a lightweight Angular 17 starter scaffold for the Content Idea Finder Micro‑SaaS.
It uses standalone components, a minimal bootstrap, Tailwind-ready setup, and stubs for Supabase and AI integration.

## Quick start (local)

1. Install dependencies
```bash
npm install
```

2. Start dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

## Push to your GitHub repo
If your GitHub repo is empty, you can run the single command provided by the assistant in the chat to push these files into your repo.

## Next steps provided by the assistant:
- Wire up Supabase keys in `src/environments/env.ts`
- Add OpenAI / Gemini keys to your backend or edge function
- Deploy to Vercel / Netlify / Firebase Hosting


## Supabase Auth Setup

1. Create a free project at https://supabase.com
2. In Project Settings -> API, copy the `anon` key and URL and paste into `src/environments/env.ts`.
3. In Supabase Auth settings enable Email + Password and OAuth providers you want (Google/GitHub). For OAuth, set redirect URL to your app domain (e.g. http://localhost:4200).
4. Run the app and test signup/signin.
