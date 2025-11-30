import { TopicCard } from './TopicCard';
import { useState } from 'react';

const mockTopics = [
  {
    id: 1,
    title: 'Yapay Zeka ile Öğrenme Teknikleri',
    description: 'Modern eğitim yöntemleri ve yapay zeka araçlarının öğrenmede kullanımı hakkında tartışma başlığı',
    author: {
      name: 'Ayşe Demir',
      username: 'ayse_tech',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Konya Bilgesi',
        color: 'purple',
      },
    },
    category: 'Teknoloji',
    timestamp: '2 saat önce',
    postCount: 342,
    upvotes: 1240,
    views: 5680,
    lastActivity: '5dk önce',
  },
  {
    id: 2,
    title: 'İlk İş Görüşmesinde Nelere Dikkat Edilmeli?',
    description: 'İş görüşmesi deneyimleri, tavsiyeleri ve hazırlık süreçleri',
    author: {
      name: 'Mehmet Kaya',
      username: 'mehmet_kariyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Gezgin',
        color: 'green',
      },
    },
    category: 'İş & Kariyer',
    timestamp: '5 saat önce',
    postCount: 298,
    upvotes: 890,
    views: 4320,
    lastActivity: '12dk önce',
  },
  {
    id: 3,
    title: 'Üniversitede Zaman Yönetimi İpuçları',
    description: 'Ders, sosyal hayat ve ödev dengesini sağlamak için pratik öneriler',
    author: {
      name: 'Zeynep Yıldız',
      username: 'zeynep_student',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Seyyah',
        color: 'blue',
      },
    },
    category: 'Eğitim',
    timestamp: '1 gün önce',
    postCount: 276,
    upvotes: 720,
    views: 3890,
    lastActivity: '1s önce',
  },
  {
    id: 4,
    title: 'Remote Çalışma Deneyimlerim',
    description: 'Uzaktan çalışmanın avantajları, zorlukları ve verimlilik ipuçları',
    author: {
      name: 'Can Özkan',
      username: 'can_remote',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'İş & Kariyer',
    timestamp: '2 gün önce',
    postCount: 245,
    upvotes: 650,
    views: 2980,
    lastActivity: '45dk önce',
  },
  {
    id: 5,
    title: 'Freelance İşe Nasıl Başladım?',
    description: 'Sıfırdan freelance kariyere başlama rehberi ve ilk müşterileri bulma stratejileri',
    author: {
      name: 'Selin Demir',
      username: 'selin_freelance',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Gezgin',
        color: 'green',
      },
    },
    category: 'İş & Kariyer',
    timestamp: '3 gün önce',
    postCount: 213,
    upvotes: 580,
    views: 2560,
    lastActivity: '2s önce',
  },
  {
    id: 6,
    title: 'UI/UX Tasarım Kaynakları',
    description: 'Tasarım öğrenmek isteyenler için en iyi online kaynaklar, kitaplar ve araçlar',
    author: {
      name: 'Burak Arslan',
      username: 'burak_design',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Seyyah',
        color: 'blue',
      },
    },
    category: 'Tasarım',
    timestamp: '4 gün önce',
    postCount: 189,
    upvotes: 490,
    views: 2180,
    lastActivity: '3s önce',
  },
  {
    id: 7,
    title: 'Konya\'da Çalışılacak En İyi Kafeler',
    description: 'Ders çalışmak, proje yapmak için ideal kafe önerileri ve deneyimler',
    author: {
      name: 'Elif Kara',
      username: 'elif_konya',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Konya Bilgesi',
        color: 'purple',
      },
    },
    category: 'Yaşam',
    timestamp: '1 hafta önce',
    postCount: 167,
    upvotes: 420,
    views: 1890,
    lastActivity: '1s önce',
  },
  {
    id: 8,
    title: 'Python ile Veri Bilimi',
    description: 'Veri bilimi öğrenme yolculuğu, Python kütüphaneleri ve projeler',
    author: {
      name: 'Ahmet Yılmaz',
      username: 'ahmet_data',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxMjI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'Teknoloji',
    timestamp: '1 hafta önce',
    postCount: 234,
    upvotes: 680,
    views: 3240,
    lastActivity: '30dk önce',
  },
];

interface TopicListProps {
  onTopicClick: (topicId: number) => void;
}

export function TopicList({ onTopicClick }: TopicListProps) {
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');

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
        {mockTopics.map((topic) => (
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

