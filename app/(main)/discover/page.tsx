"use client";

import { SearchInput, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { CategoryGrid } from "@/components/category";
import { TopicCategory } from "@/types";

// Örnek veri
const categories: { category: TopicCategory; count: number }[] = [
  { category: "akademik", count: 124 },
  { category: "sosyal_yasam", count: 89 },
  { category: "barinma", count: 67 },
  { category: "kariyer", count: 45 },
  { category: "konya_kesif", count: 78 },
];

const trendingTopics = [
  { id: "1", title: "Selçuk Hukuk Final Notları 2024", views: 1234 },
  { id: "2", title: "Meram'da Öğrenci Dostu Kafeler", views: 987 },
  { id: "3", title: "KYK Yurt Başvuru Rehberi", views: 876 },
  { id: "4", title: "Part-time İş Fırsatları Konya", views: 654 },
  { id: "5", title: "Etli Ekmek Nerede Yenir?", views: 543 },
];

const popularEntries = [
  { id: "1", content: "Mevlana Müzesi'ne sabah erken gidin, kalabalık olmuyor...", likes: 89, author: "gezgin_ali" },
  { id: "2", content: "Hukuk kütüphanesi 7/24 açık, sınav döneminde birebir...", likes: 76, author: "seyyah_zeynep" },
  { id: "3", content: "Bosna Hersek'te ev arıyorsan dikkat et, bazı evler...", likes: 65, author: "kasif_mehmet" },
];

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
          Konya Genç WikiSözlük
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Konya'daki öğrenci hayatıyla ilgili her şeyi keşfet, paylaş, kazan!
        </p>
      </div>

      {/* Search */}
      <SearchInput className="mx-auto mb-12 max-w-2xl" />

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Kategoriler
        </h2>
        <CategoryGrid categories={categories} />
      </section>

      {/* Trending & Popular */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔥 Trend Başlıklar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <li key={topic.id} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-zinc-700 dark:text-zinc-300">
                    {topic.title}
                  </span>
                  <span className="text-sm text-zinc-500">
                    👁️ {topic.views}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Popular Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⭐ Popüler Yorumlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {popularEntries.map((entry) => (
                <li key={entry.id} className="border-b border-zinc-100 pb-3 last:border-0 dark:border-zinc-800">
                  <p className="line-clamp-2 text-sm text-zinc-700 dark:text-zinc-300">
                    "{entry.content}"
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span>@{entry.author}</span>
                    <span>•</span>
                    <span>👍 {entry.likes}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

