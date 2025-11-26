"use client";

import { WikiArea } from "@/components/topic";
import { EntryList, EntryForm } from "@/components/entry";
import { Badge } from "@/components/ui";
import { CATEGORIES } from "@/constants";
import { Entry, WikiContent, User, TopicCategory } from "@/types";

// Örnek veri
const mockWiki: WikiContent = {
  id: "1",
  content: `Selçuk Üniversitesi Hukuk Fakültesi, Konya'nın en köklü hukuk fakültelerinden biridir.

**Adres:** Alaeddin Keykubat Kampüsü, Selçuklu/Konya
**Telefon:** 0332 XXX XX XX
**Web:** hukuk.selcuk.edu.tr

## Önemli Tarihler
- Vize Haftası: Genellikle Kasım ortası
- Final Haftası: Ocak başı

## Kütüphane
Hukuk kütüphanesi 7/24 açıktır. Sınav dönemlerinde oldukça kalabalık olabilir.`,
  lastEditedBy: { id: "1", username: "gezgin_ali" } as User,
  lastEditedAt: new Date(),
  version: 12,
  usefulVotes: 45,
  notUsefulVotes: 3,
};

const mockEntries: Entry[] = [
  {
    id: "1",
    topicId: "1",
    content: "Hukuk kütüphanesi gerçekten 7/24 açık ve sınav döneminde hayat kurtarıyor. Sadece prize bulmak zor, şarj aletini tam dolu getir.",
    author: { id: "2", username: "seyyah_zeynep", role: "seyyah" } as User,
    likes: 23,
    dislikes: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    topicId: "1",
    content: "Medeni Hukuk dersine Prof. Dr. X'ten almanızı öneririm. Anlatımı çok iyi ve sınavları makul.",
    author: { id: "3", username: "kasif_mehmet", role: "kasif_meraklisi" } as User,
    likes: 45,
    dislikes: 5,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

export default function TopicPage({ params }: { params: { slug: string } }) {
  const category: TopicCategory = "akademik";
  const categoryInfo = CATEGORIES[category];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span>{categoryInfo.icon}</span>
          <Badge>{categoryInfo.name}</Badge>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
          Selçuk Hukuk Final Notları 2024
        </h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500">
          <span>👁️ 1,234 görüntülenme</span>
          <span>👥 45 katkıda bulunan</span>
        </div>
      </div>

      {/* Wiki Area */}
      <div className="mb-8">
        <WikiArea wiki={mockWiki} canEdit={true} />
      </div>

      {/* Entry Area */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-white">
          💬 Yorumlar ({mockEntries.length})
        </h2>

        {/* Entry Form */}
        <div className="mb-6">
          <EntryForm />
        </div>

        {/* Entry List */}
        <EntryList entries={mockEntries} />
      </div>
    </div>
  );
}

