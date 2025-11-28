"use client";

import { useState } from "react";

export default function CreateTopicPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Yeni Konu Oluştur</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Konu başlığı..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Kategori seçin</option>
              <option value="akademik">Akademik</option>
              <option value="is-ilanlari">İş İlanları</option>
              <option value="mekanlar">Mekanlar</option>
              <option value="etkinlikler">Etkinlikler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">İlk Entry</label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Konuyla ilgili ilk entry'nizi yazın..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Konu Oluştur
          </button>
        </form>
      </div>
    </div>
  );
}
