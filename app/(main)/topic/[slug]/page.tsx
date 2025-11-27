"use client";

import { useParams } from "next/navigation";

export default function TopicPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 capitalize">{slug?.replace(/-/g, " ")}</h1>
        <p className="text-gray-600 mb-4">
          Bu konu hakkında topluluk tarafından paylaşılan bilgiler ve deneyimler.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>128 entry</span>
          <span>24 takipçi</span>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
              <div>
                <p className="font-medium">Kullanıcı {i}</p>
                <p className="text-xs text-gray-500">2 saat önce</p>
              </div>
            </div>
            <p className="text-gray-700">
              Bu konu hakkındaki örnek bir entry içeriği. Kullanıcılar burada
              deneyimlerini ve düşüncelerini paylaşabilir.
            </p>
            <div className="flex gap-4 mt-3 text-sm text-gray-500">
              <button className="hover:text-purple-600">↑ 24</button>
              <button className="hover:text-purple-600">↓ 2</button>
              <button className="hover:text-purple-600">Yorum</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
