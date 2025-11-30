import { TopicCard } from './TopicCard';
import { useState, useMemo } from 'react';
import { topics, getUserById } from '@/data/mock';

// Yardımcı fonksiyon: tarih formatlama
const formatTimestamp = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins}dk önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 7) return `${diffDays} gün önce`;
  return `${Math.floor(diffDays / 7)} hafta önce`;
};

// Yardımcı fonksiyon: rol badge'i
const getRoleBadge = (role: string) => {
  if (role === 'yeni_gelen') return undefined;
  const badges: Record<string, { text: string; color: string }> = {
    konya_bilgesi: { text: 'Konya Bilgesi', color: 'purple' },
    kasif_meraklisi: { text: 'Kaşif', color: 'orange' },
    gezgin: { text: 'Gezgin', color: 'green' },
    seyyah: { text: 'Seyyah', color: 'blue' }
  };
  return badges[role];
};

// Kategori mapping
const categoryNames: Record<string, string> = {
  akademik: 'Eğitim',
  sosyal_yasam: 'Yaşam',
  kariyer: 'İş & Kariyer',
  mekan: 'Mekan',
  teknoloji: 'Teknoloji',
  tasarim: 'Tasarım'
};

// Topic verilerini hazırla
const prepareTopics = () => {
  return topics.map(topic => {
    const author = getUserById(topic.createdBy);
    return {
      id: topic.id,
      title: topic.title,
      description: topic.wikiContent?.content?.substring(0, 150) + '...' || '',
      author: author ? {
        name: author.username,
        username: author.username,
        avatar: author.avatar,
        badge: getRoleBadge(author.role)
      } : { name: 'Anonim', username: 'anonim', avatar: '' },
      category: categoryNames[topic.category] || topic.category,
      timestamp: formatTimestamp(topic.createdAt),
      postCount: topic.entryCount,
      upvotes: topic.wikiContent?.usefulVotes || 0,
      views: topic.viewCount,
      lastActivity: formatTimestamp(topic.updatedAt)
    };
  });
};

interface TopicListProps {
  onTopicClick: (topicId: string | number) => void;
}

export function TopicList({ onTopicClick }: TopicListProps) {
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  
  // Mock verileri hazırla
  const topicList = useMemo(() => prepareTopics(), []);
  
  // Sıralama uygula
  const sortedTopics = useMemo(() => {
    const sorted = [...topicList];
    switch (sortBy) {
      case 'hot':
        return sorted.sort((a, b) => b.upvotes - a.upvotes);
      case 'new':
        return sorted;
      case 'top':
        return sorted.sort((a, b) => b.postCount - a.postCount);
      default:
        return sorted;
    }
  }, [topicList, sortBy]);

  return (
    <div className="flex-1 min-w-0">
      {/* Filter Tabs */}
      <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
        <button
          onClick={() => setSortBy('hot')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'hot'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          Popüler
        </button>
        <button
          onClick={() => setSortBy('new')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'new'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          En Yeniler
        </button>
        <button
          onClick={() => setSortBy('top')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'top'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          En Çok Yanıtlanan
        </button>
      </div>

      {/* Topics List */}
      <div>
        {sortedTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            {...topic}
            onClick={() => onTopicClick(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}

