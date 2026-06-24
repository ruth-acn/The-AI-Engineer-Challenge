# The AI Engineer Challenge — Project Guide

Project rules and conventions for Claude Code. Everything here is loaded into context
automatically every session.

## Project shape
- **Backend:** FastAPI app at `api/index.py` (entry: `api.index:app`). Run from the
  project root with `uv run uvicorn api.index:app --reload` → http://localhost:8000.
- **Frontend:** Next.js app in `frontend/` (deployed on Vercel).
- **Env:** Python 3.12 via `uv` (`.venv/`). Secrets in `.env` (git-ignored); set
  `OPENAI_API_KEY` before making chat calls.

## Always-follow rules
- **Commit changes whenever you update code.** Small, focused commits.
- Write **well-documented code** (self-documenting or commented).
- **Work on a single feature at a time.**
- **Explain your decisions thoroughly** to the user.

## When working on the frontend
- Pay attention to **visual clarity and contrast** — never white text on a white
  background. Aim for WCAG AA contrast.
- Keep the **UX pleasant**: containers should grow to fit their contents, sensible
  spacing, no clipped/overflowing text.
- For **sensitive input** (e.g. API keys), use **password-style** masked inputs.
- Use **Next.js** (best fit for Vercel deployment).
- It must be **deployable on Vercel** but also **runnable locally** for testing.
- **Always tell the user how to run the UI** after you build or change it.

### Theming / colour scheme
> Starting palette — edit freely to taste, or tell me a vibe and I'll update it.

Use CSS variables so the theme is centralised and easy to change. Default = a modern,
high-contrast scheme with light + dark support:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#0B0F19` | page background |
| `--surface` | `#F4F6FB` | `#151B2B` | cards, message bubbles |
| `--text` | `#0B0F19` | `#E6EAF2` | primary text (AA contrast on `--bg`) |
| `--muted` | `#5A6478` | `#9AA4B8` | secondary text |
| `--primary` | `#6366F1` | `#818CF8` | buttons, links, user bubble |
| `--accent` | `#10B981` | `#34D399` | success / send action |
| `--danger` | `#EF4444` | `#F87171` | errors |
| `--border` | `#E2E6EF` | `#26304A` | dividers, input outlines |

Guidelines: never hard-code hex in components — reference the variables; always check
text-on-surface contrast; respect `prefers-color-scheme` for dark mode.

## When writing/editing Markdown & READMEs
- READMEs should be **dope** — fun, approachable language — **while staying
  technically accurate**.

## Documentation sources (Claude Code's "indexed docs" equivalent)
Claude Code fetches docs live rather than pre-indexing. When you need framework docs,
fetch from these canonical sources (or use the Context7 MCP if installed):
- **Next.js:** https://nextjs.org/docs
- **Vercel:** https://vercel.com/docs

Just ask me to "check the Next.js docs for X" and I'll WebFetch the relevant page.
