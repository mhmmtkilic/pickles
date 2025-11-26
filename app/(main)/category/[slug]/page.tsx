"use client";

import { CATEGORIES } from "@/constants";
import { TopicCategory } from "@/types";
import { SearchInput } from "@/components/ui";

// Örnek başlıklar
const mockTopics = [
  { id: "1", title: "Selçuk Hukuk Final Notları 2024", views: 1234, entries: 45 },
  { id: "2", title: "NEÜ Mühendislik Diferansiyel Notları", views: 876, entries: 32 },
  { id: "3", title: "KTO Karatay İşletme Vize Tüyoları", views: 654, entries: 28 },
  { id: "4", title: "Prof. Dr. X'ten Ders Alma Rehberi", views: 543, entries: 67 },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = params.slug as TopicCategory;
  const categoryInfo = CATEGORIES[category];

  if (!categoryInfo) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-zinc-500">Kategori bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{categoryInfo.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {categoryInfo.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Search in category */}
      <SearchInput 
        placeholder={`${categoryInfo.name} içinde ara...`}
        className="mb-8"
      />

      {/* Topics */}
      <div className="space-y-4">
        {mockTopics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {topic.title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-zinc-500">
                <span>👁️ {topic.views}</span>
                <span>💬 {topic.entries} yorum</span>
              </div>
            </div>
            <svg
              className="h-5 w-5 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

