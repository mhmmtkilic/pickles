"use client";

import { useState } from "react";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "GENC2024XYZ";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Arkadaşını Davet Et</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-6">
          Arkadaşlarını davet et, her başarılı davet için 100 GençCoin kazan!
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Davet Kodun</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralCode}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {copied ? "Kopyalandı!" : "Kopyala"}
            </button>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2">Kazanımların</h3>
          <div className="flex justify-between text-sm">
            <span>Toplam Davet:</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Kazanılan Coin:</span>
            <span className="font-semibold text-yellow-600">1,200 GençCoin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
