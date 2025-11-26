"use client";

import { useState } from "react";
import { SearchInput, Badge } from "@/components/ui";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    // TODO: API çağrısı
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Arama
      </h1>

      <SearchInput onSearch={handleSearch} className="mb-8" />

      {/* Popular Searches */}
      {!query && (
        <div>
          <h2 className="mb-3 text-sm font-medium text-zinc-500">
            Popüler Aramalar
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Final notları", "Kiralık ev", "Staj", "Yemekhane", "Kütüphane", "Part-time iş"].map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div>
          <p className="mb-4 text-sm text-zinc-500">
            "{query}" için sonuçlar gösteriliyor
          </p>
          
          {results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-zinc-500">Sonuç bulunamadı</p>
              <p className="mt-2 text-sm text-zinc-400">
                Farklı anahtar kelimeler deneyin
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sonuçlar buraya gelecek */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

