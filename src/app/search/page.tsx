"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ara</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kullanıcı, konu veya mekan ara..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex gap-2 mb-6">
        {["Tümü", "Kullanıcılar", "Konular", "Mekanlar"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {query && (
        <div className="bg-white rounded-lg shadow divide-y">
          <div className="p-4 hover:bg-gray-50">
            <p className="font-medium">"{query}" için sonuç bulunamadı</p>
            <p className="text-sm text-gray-500 mt-1">Farklı anahtar kelimeler deneyin</p>
          </div>
        </div>
      )}
    </div>
  );
}
