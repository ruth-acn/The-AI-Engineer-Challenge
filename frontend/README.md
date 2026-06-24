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

## Pointing at a different backend

The API base URL defaults to `http://localhost:8000`. To override (e.g. a deployed
backend), copy the example env file and edit it:

```bash
cp .env.local.example .env.local         # then set NEXT_PUBLIC_API_BASE
```

## Build for production

```bash
pnpm build
pnpm start                                # serves the production build on :3000
```

> Heads up: the repo's root `vercel.json` currently routes every path to the Python
> function, so deploying this Next.js app to Vercel needs that config revisited first.
> Local dev (above) works as-is.
