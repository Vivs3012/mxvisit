# Visita México CDMX — Vercel Dashboard

Next.js app ready to deploy on [Vercel](https://vercel.com).

## Contents

- Store visits (Jul 20–21): KPIs, bugs, product & UX insights
- CX meeting (Jul 22)
- Product meeting (Jul 22)
- OPS workshop (Jul 23)
- Overall result: cross-trip synthesis and roadmap

## Local development

```bash
cd vercel-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

### Option A — Vercel CLI

```bash
cd vercel-dashboard
npm install -g vercel   # if needed
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

### Option B — GitHub + Vercel dashboard

1. Push the `vercel-dashboard` folder to a GitHub repository.
2. In Vercel: **Add New Project** → import the repo.
3. Set **Root Directory** to `vercel-dashboard` (if the repo root is the parent folder).
4. Framework preset: **Next.js** (auto-detected).
5. Click **Deploy**.

### Access control (@ab-inbev.com only)

Sign in with a corporate `@ab-inbev.com` email (domain check only; no verification code for now).

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | Random secret for session tokens (`openssl rand -base64 32`) |

Local development without login:

```bash
AUTH_SECRET=dev-secret-change-me AUTH_SKIP=true npm run dev
```

## Build

```bash
npm run build
npm start
```

## Notes

- Photos from store visits were stripped to keep the bundle small (~190 KB dashboard). Captions and all text/data are included.
- To restore photos, replace `src/lib/dashboard.tsx` with the full canvas export and re-run the Vercel transform script.
