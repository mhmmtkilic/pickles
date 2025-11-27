"use client";

import { useState } from "react";

export default function CoinTransferPage() {
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">GençCoin Transfer</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">Mevcut Bakiye</p>
          <p className="text-2xl font-bold text-yellow-600">2,450 GençCoin</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Alıcı Kullanıcı Adı</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="@kullaniciadi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Miktar</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Transfer Et
          </button>
        </form>
      </div>
    </div>
  );
}
