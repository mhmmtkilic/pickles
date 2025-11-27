"use client";

import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug?.replace(/-/g, " ")}</h1>
      <div className="grid gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Örnek Başlık {i}</h3>
            <p className="text-gray-600 text-sm">Bu kategorideki örnek içerik açıklaması...</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <span>24 yorum</span>
              <span>128 beğeni</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
