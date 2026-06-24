"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

// In production the frontend and API ship in the same Vercel deployment, so the
// API is reached via a relative path (same origin). Locally they run on different
// ports, so fall back to :8000. Override anytime with NEXT_PUBLIC_API_BASE.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

type Role = "user" | "coach";
interface Message {
  role: Role;
  content: string;
}

// Starter prompts shown before the first reply — one tap to send.
const SUGGESTIONS = [
  "I'm feeling overwhelmed",
  "Help me build a better habit",
  "I need a confidence boost",
  "Help me unwind",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "coach",
      content: "Hi, I'm here for you. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-scroll to the newest message whenever the thread changes.
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(textArg?: string) {
    const text = (textArg ?? input).trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        // Surface the backend's detail (e.g. "OPENAI_API_KEY not configured").
        const detail = await res.json().catch(() => null);
        throw new Error(detail?.detail ?? `Request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "coach", content: data.reply }]);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Couldn't reach the coach. Is the backend running on :8000?"
      );
    } finally {
      setLoading(false);
    }
  }

  // Enter sends; Shift+Enter inserts a newline.
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main className="app">
      <div className="card">
        <header className="header">
          <div className="avatar" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </div>
          <div>
            <p className="title">Mindful coach</p>
            <p className="subtitle">
              <span className="dot" aria-hidden="true" /> your supportive ai coach
            </p>
          </div>
        </header>

        <div className="thread">
          {messages.map((m, i) => (
            <div key={i} className={`row ${m.role}`}>
              <div className={`bubble ${m.role}`}>
                {m.role === "coach" ? (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="row coach">
              <div className="bubble coach muted">…</div>
            </div>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div ref={endRef} />
        </div>

        {messages.length === 1 && !loading && (
          <div className="chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="composer">
          <textarea
            className="input"
            rows={1}
            placeholder="Share what's on your mind…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className="send"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
