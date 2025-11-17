# Content Idea Finder — Angular 17 + AI Generator

This bundle adds a serverless AI generator and connects the frontend to it.

## Local setup

1. Install root deps:
   ```bash
   npm install
   ```

2. Install function deps:
   ```bash
   cd functions/generate
   npm install
   ```

3. Start AI function (separate terminal):
   ```bash
   cd functions/generate
   npm start
   ```

4. Run Angular dev server:
   ```bash
   npm start
   ```

5. Set `OPENAI_API_KEY` in your environment before starting the function. Production: configure env vars in your host (Vercel/Netlify).

## Push to your GitHub repo

Unzip this bundle into a local folder and run:
```bash
git init
git remote add origin https://github.com/shubhamjha008/content-idea-finder.git
git add .
git commit -m "Add AI generator integration"
git push -u origin main
```

Do NOT commit any secret keys. Use environment variables.
