# Mindful Coach — Frontend 💬

A tiny, friendly chat UI for the supportive mental-coach API. Built with **Next.js
(App Router) + TypeScript** — no Tailwind, no extra UI libs, just one page and a
stylesheet you can actually read. It talks to the FastAPI backend in `../api`.

## What it does

- Chat thread with coach (left) and you (right), high-contrast in light **and** dark mode
- Enter to send (Shift+Enter for a newline), auto-scroll to the latest message
- A clear inline error if the backend is down or missing its `OPENAI_API_KEY`

That's the whole feature set — deliberately lean.

## Prerequisites

- **Node.js** (v18.18+) and **pnpm** — both already on this machine
- The **backend running** on http://localhost:8000 (see the repo root README / `api/README.md`)

## Run it locally

From this `frontend/` folder:

```bash
pnpm install      # first time only — pulls next/react into node_modules
pnpm dev          # starts the dev server
```

Open **http://localhost:3000**. Make sure the backend is up in another terminal:

```bash
# from the repo root
$env:OPENAI_API_KEY = "sk-..."           # PowerShell  (bash: export OPENAI_API_KEY=sk-...)
uv run uvicorn api.index:app --reload    # serves http://localhost:8000
```

Type a message, hit Enter — the coach replies. ✨

## Where it looks for the API

- **Local dev:** defaults to `http://localhost:8000` (frontend on :3000, backend on :8000).
- **Production:** uses a **relative** path (`/api/chat`) — frontend and backend ship in
  the same Vercel deployment, so they're same-origin.
- **Override:** set `NEXT_PUBLIC_API_BASE` (copy `.env.local.example` → `.env.local`).

## Deploying to Vercel (single deployment)

The repo's root `vercel.json` builds **both** this Next.js app and the FastAPI function
in one Vercel project, and routes `/api/*` to the backend. So from the **repo root**:

```bash
vercel login        # once
vercel              # preview deploy
vercel --prod       # production deploy → one shareable URL
```

Set your key once on the project (no separate backend URL needed):

```bash
vercel env add OPENAI_API_KEY production
```

> The frontend lives in `frontend/` and the backend in `api/`, combined via the root
> `vercel.json` (`builds` + an `/api/*` route). If Vercel's subfolder build misbehaves,
> the reliable fallback is to move this app to the repo root — ask and it's a quick change.

## Build for production locally

```bash
pnpm build
pnpm start          # serves the production build on :3000
```
