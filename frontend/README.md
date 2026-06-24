# Mindful Coach — Frontend 💬

A tiny, friendly chat UI for the supportive mental-coach API. Built with **Next.js
(App Router) + TypeScript** — no Tailwind, no extra UI libs, just one page and a
stylesheet you can actually read. It talks to the FastAPI backend in `../api`.

## What it does

- Chat thread with coach (left) and you (right), high-contrast in light **and** dark mode
- Enter to send (Shift+Enter for a newline), auto-scroll to the latest message
- A clear inline error if the backend is down or missing its `OPENAI_API_KEY`

That's the whole feature set — deliberately lean.

## Run it locally

The frontend talks to the backend, so run both. From this `frontend/` folder:

```bash
pnpm install      # first time only — pulls next/react into node_modules
pnpm dev          # http://localhost:3000
```

In another terminal, from the **repo root**, start the backend on :8000:

```bash
$env:OPENAI_API_KEY = "sk-..."           # PowerShell  (bash: export OPENAI_API_KEY=sk-...)
uv run uvicorn api.index:app --reload    # http://localhost:8000
```

Open **http://localhost:3000** and chat. ✨

## Where it looks for the API

- **Local dev:** defaults to `http://localhost:8000`.
- **Production:** uses a **relative** path (`/api/chat`) — same origin, since the root
  `vercel.json` deploys this frontend and the FastAPI backend together.
- **Override:** set `NEXT_PUBLIC_API_BASE` (copy `.env.local.example` → `.env.local`).

## Deploying

This frontend deploys as part of the single Vercel project configured in the repo
root `vercel.json` (it builds `frontend/` + `api/` and routes `/api/*` to FastAPI).
Run `vercel` / `vercel --prod` from the **repo root**, not from here. See
`../RUN_LOCALLY.md` / the root README for full deploy steps.
