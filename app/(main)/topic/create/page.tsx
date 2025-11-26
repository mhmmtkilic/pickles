"use client";

import { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CATEGORIES } from "@/constants";
import { TopicCategory } from "@/types";

export default function CreateTopicPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TopicCategory>("akademik");
  const [wikiContent, setWikiContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API çağrısı
    console.log({ title, category, wikiContent });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Yeni Başlık Oluştur
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Başlık Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="title"
              label="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Selçuk Hukuk Final Notları 2024"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TopicCategory)}
                className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-zinc-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              >
                {Object.entries(CATEGORIES).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.icon} {info.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Bilgi Alanı (Wiki) İçeriği
              </label>
              <textarea
                value={wikiContent}
                onChange={(e) => setWikiContent(e.target.value)}
                rows={10}
                placeholder="Objektif bilgileri buraya yazın. Markdown desteklenir."
                className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
              <p className="text-xs text-zinc-500">
                Markdown formatını kullanabilirsiniz. **kalın**, *italik*, ## başlık
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
              <span className="text-sm text-amber-600">
                🪙 Başlık oluşturarak +20 GençCoin kazanırsın!
              </span>
              <Button type="submit">Başlığı Oluştur</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

