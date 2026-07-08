"use client";

import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { assistantKnowledge } from "@/lib/assistant/knowledge";
import { answerWithRules } from "@/lib/assistant/rules";
import { Button } from "@/components/ui/button";

export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const answer = useMemo(() => answerWithRules(question, assistantKnowledge), [question]);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="flex h-[min(520px,calc(100vh-2rem))] w-[calc(100vw-2rem)] max-w-sm flex-col rounded-lg border border-[var(--border)] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
            <div>
              <p className="text-sm font-semibold">Scottish AI Guy assistant</p>
              <p className="text-xs text-[var(--muted-foreground)]">Deterministic starter guidance</p>
            </div>
            <button
              aria-label="Close assistant"
              className="rounded-md p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="rounded-lg bg-[var(--muted)] p-4 text-sm leading-6">{answer}</div>
          </div>
          <div className="border-t border-[var(--border)] p-4">
            <label className="sr-only" htmlFor="assistant-question">
              Ask the assistant
            </label>
            <textarea
              className="min-h-24 w-full resize-none rounded-md border border-[var(--border)] p-3 text-sm outline-none focus:border-[var(--primary)]"
              id="assistant-question"
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about the stack, standards, or next steps..."
              value={question}
            />
          </div>
        </div>
      ) : (
        <Button
          aria-label="Open assistant"
          className="h-14 w-14 rounded-full p-0 shadow-lg"
          onClick={() => setOpen(true)}
          type="button"
        >
          <MessageCircle size={22} />
        </Button>
      )}
    </div>
  );
}
