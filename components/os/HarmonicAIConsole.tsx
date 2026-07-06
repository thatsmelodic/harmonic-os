'use client';

import { FormEvent, useState } from 'react';
import { askHarmonicAI, harmonicAIPrompts, type HarmonicAIResponse } from '@/lib/harmonic-ai';

export function HarmonicAIConsole() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<HarmonicAIResponse>(() => askHarmonicAI(''));

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse(askHarmonicAI(query));
  }

  function runPrompt(prompt: string) {
    setQuery(prompt);
    setResponse(askHarmonicAI(prompt));
  }

  return (
    <section className="harmonic-container py-16">
      <div className="glass-panel overflow-hidden rounded-[2.75rem] p-5 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Harmonic AI</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">Ask the OS where to go.</h2>
          </div>
          <p className="max-w-xl leading-7 text-purple-100/65">
            A local assistant foundation that understands the Harmonic universe, routes visitors through existing pages, and prepares the system for a future model-backed brain.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <form onSubmit={submitQuestion} className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
            <label className="grid gap-3 text-sm font-black text-purple-100/70">
              Ask Harmonic AI
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                rows={5}
                placeholder="Example: Where should I go for clothing drops?"
                className="min-h-36 rounded-3xl border border-white/10 bg-black/35 px-4 py-4 text-base font-semibold leading-7 text-purple-50 outline-none transition placeholder:text-purple-100/30 focus:border-purple-300/60"
              />
            </label>
            <button className="mt-4 w-full rounded-full bg-purple-200 px-6 py-4 text-sm font-black text-black shadow-purple-glow transition hover:bg-purple-100">
              Route Me
            </button>

            <div className="mt-5 grid gap-2">
              {harmonicAIPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => runPrompt(prompt)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-bold text-purple-100/62 transition hover:bg-white/10 hover:text-purple-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="rounded-full os-badge px-3 py-1 text-xs uppercase tracking-[0.25em] text-purple-100/60">Intent: {response.intent}</p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-purple-100/40">Local brain</span>
            </div>

            <p className="text-lg font-semibold leading-8 text-purple-100/78">{response.answer}</p>

            <div className="mt-6 grid gap-3">
              {response.actions.map((action) => (
                <a key={action.href} href={action.href} className="group rounded-3xl border border-white/10 bg-black/25 p-4 transition hover:-translate-y-0.5 hover:border-purple-200/45 hover:bg-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-black text-purple-50">{action.label}</h3>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-300/15 text-lg shadow-purple-glow transition group-hover:scale-110">↗</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-purple-100/58">{action.reason}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
