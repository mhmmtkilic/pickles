"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

interface EntryFormProps {
  onSubmit?: (content: string) => void;
  placeholder?: string;
}

export function EntryForm({ onSubmit, placeholder = "Deneyimini paylaş..." }: EntryFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit?.(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          Yorum yaparak +2 GençCoin kazanırsın 🪙
        </span>
        <Button type="submit" disabled={!content.trim()}>
          Yorum Yap
        </Button>
      </div>
    </form>
  );
}

