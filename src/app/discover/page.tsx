"use client";

import { Navigation } from '@/components/Navigation';
import { Header } from '@/components/Header';
import { PostCreator } from '@/components/PostCreator';
import { PostCard } from '@/components/PostCard';
import { WikiCard } from '@/components/WikiCard';
import { JobCard } from '@/components/JobCard';
import { AcademicCard } from '@/components/AcademicCard';
import { Sidebar } from '@/components/Sidebar';
import { VenueSidebar } from '@/components/VenueSidebar';
import { VenueFilters } from '@/components/VenueFilters';
import { CreatePostModal } from '@/components/CreatePostModal';
import { VenueDetail } from '@/components/VenueDetail';
import { VenueList } from '@/components/VenueList';
import { useState } from 'react';

const mockPosts = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Ayşe Yılmaz',
      username: 'ayseyilmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Yeni başladığım startup projesinde kullanıcı deneyimi konusunda harika geri dönümler alıyoruz! Gençlerin ihtiyaçlarına yönelik çözümler geliştirmek gerçekten heyecan verici. 🚀',
    timestamp: '2s',
    upvotes: 24,
    helpfulCount: 18,
    categories: ['Teknoloji', 'Startup', 'UX/UI'],
  },
  {
    id: 2,
    type: 'wiki',
    author: {
      name: 'Ahmet Seyyah',
      username: 'seyyah_ahmet',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Seyyah',
        color: 'blue',
      },
    },
    content: 'Urban Bistro\'da harika bir deneyim yaşadım! Özellikle priz ve wifi açısından çok iyi. Kahveleri biraz pahalı ama ortamı ve müziği çalışmak için çok uygun. Sabah saatlerinde daha az kalabalık oluyor, tavsiye ederim.',
    timestamp: '3s',
    topicLink: {
      icon: 'venue',
      text: 'Urban Bistro',
    },
    upvotes: 128,
    downvotes: 12,
    comments: 8,
    tags: ['Kahve', 'DersÇalışma', 'PrizVar', 'Sessiz'],
  },
  {
    id: 3,
    type: 'job',
    author: {
      name: 'Elif Mentor',
      username: 'elif_konya',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Konya Bilgesi',
        color: 'purple',
      },
    },
    category: 'tutor',
    title: 'Lise Öğrencisine Matematik Özel Ders',
    details: {
      location: 'Meram, Konya',
      payment: '400₺ / Saat',
      time: 'Haftasonu / Esnek',
    },
    description: 'Selçuk Üniversitesi matematik öğretmenliği son sınıf öğrencisiyim. Lise öğrencilerine matematik dersi veriyorum. YKS hazırlık ve sınav dönemlerinde yoğunlaşacak şekilde eğitim. 3 yıllık deneyim.',
    timestamp: '1s',
  },
  {
    id: 4,
    type: 'post',
    author: {
      name: 'Mehmet Kaya',
      username: 'mkaya',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxMjI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Bugün kampüste harika bir konferans vardı. Yapay zeka ve geleceğe dair çok ilginç tartışmalar yaptık. Bu tür etkinliklerin daha fazla olması gerektiğini düşünüyorum.',
    timestamp: '15dk',
    upvotes: 42,
    helpfulCount: 35,
    categories: ['Akademik', 'Yapay Zeka', 'Etkinlik'],
  },
  {
    id: 5,
    type: 'academic',
    courseCode: 'MAT101',
    courseName: 'Diferansiyel Denklemler',
    university: 'Selçuk Üni.',
    department: 'Bilgisayar Müh.',
    uploader: {
      name: 'İnek Öğrenci',
      username: 'inek_ogrenci',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Gezgin',
        color: 'green',
      },
    },
    timestamp: 'Dün',
    file: {
      name: '2023_Vize_Cikmis_Sorular.pdf',
      type: 'pdf',
      size: '2.4 MB',
      pages: 7,
    },
    description: 'Hocanın derste vurguladığı 3. ünite sorularını içerir. Cevap anahtarı son sayfada.',
    rating: 4.8,
    ratingCount: 42,
    downloads: 1200,
    comments: 5,
  },
  {
    id: 6,
    type: 'wiki',
    author: {
      name: 'Selin Bilge',
      username: 'selin_konya',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Konya Bilgesi',
        color: 'purple',
      },
    },
    content: 'FİZ201 dersinin final sınavı için bu notları çok yararlı buldum. Özellikle elektromanyetik konuları çok net açıklanmış. Kütüphaneden aldığım kitaplarla karşılaştırdığımda çok daha anlaşılır. Herkese tavsiye ederim!',
    timestamp: '2s',
    topicLink: {
      icon: 'course',
      text: 'FİZ201 Ders Notları',
    },
    upvotes: 85,
    downvotes: 3,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMG5vdGVzfGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Fizik', 'Final', 'Elektromanyetik'],
  },
  {
    id: 7,
    type: 'job',
    author: {
      name: 'Burak Meram',
      username: 'burak_meram',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'roommate',
    title: 'Meram\'da 3+1 Eve Ev Arkadaşı Aranıyor',
    details: {
      location: 'Meram, Konya',
      payment: '4,500₺ / Ay (Aidat Dahil)',
      time: 'Şubat 2025',
    },
    description: 'Selçuk Üniversitesi\'ne yakın, temiz ve düzenli ev arkadaşı arıyoruz. Tam mobilyalı, kampüse tramvayla 15 dk. 2 erkek öğrenci kalıyor, sessiz ve çalışma ortamına uygun.',
    timestamp: '5s',
  },
  {
    id: 8,
    type: 'academic',
    courseCode: 'BİL102',
    courseName: 'Veri Yapıları ve Algoritmalar',
    uploader: {
      name: 'Code Master',
      username: 'codemaster42',
    },
    timestamp: '2s',
    file: {
      name: 'Lab_Calismalari_Tum_Kodlar.zip',
      type: 'zip',
      size: '5.8 MB',
    },
    description: 'Tüm dönem boyunca işlediğimiz lab çalışmalarının kodları. C++ dilinde yazılmış, yorumlar eklenmiş.',
    rating: 4.9,
    ratingCount: 67,
    downloads: 2400,
    comments: 18,
  },
  {
    id: 9,
    type: 'post',
    author: {
      name: 'Zeynep Demir',
      username: 'zdemir',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTIyOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Kadıköy\'de yeni açılan kafe harika! Hem çalışma ortamı hem de lezzetli kahveleri ile favori mekanım oldu. Tavsiye ederim ☕',
    timestamp: '1s',
    upvotes: 56,
    helpfulCount: 48,
    categories: ['Mekan Rehberi', 'Kafe', 'Kadıköy'],
  },
  {
    id: 10,
    type: 'post',
    author: {
      name: 'Can Özkan',
      username: 'canozkan',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Staj başvurularım için portfolio güncellemesi yaptım. Sürekli kendinizi geliştirmek ve öğrenmeye devam etmek çok önemli. Herhangi bir tavsiyesi olan var mı?',
    timestamp: '3s',
    upvotes: 31,
    helpfulCount: 22,
    categories: ['Kariyer', 'Staj', 'Portfolio'],
  },
];

const trendingPosts = [
  {
    id: 101,
    author: {
      name: 'Elif Yıldız',
      username: 'elifylz',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'ChatGPT\'nin yeni özellikleri gerçekten etkileyici! Özellikle kod yazma ve debugging konusunda büyük yardımcı oluyor. Herkesin denemesini tavsiye ederim 🤖',
    timestamp: '30dk',
    upvotes: 284,
    helpfulCount: 197,
    categories: ['Teknoloji', 'Yapay Zeka', 'Programlama'],
  },
  {
    id: 102,
    author: {
      name: 'Burak Aslan',
      username: 'burakaslan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Junior developer pozisyonları için CV hazırlama rehberi hazırladım. 50\'den fazla başvuru sonucunda öğrendiklerimi paylaşıyorum. İsteyen varsa DM atabilir! 📝',
    timestamp: '1s',
    upvotes: 421,
    helpfulCount: 356,
    categories: ['Kariyer', 'Teknoloji', 'İş Başvurusu'],
  },
  {
    id: 103,
    author: {
      name: 'Selin Kara',
      username: 'selinkara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Beşiktaş\'ta öğrenciler için uygun fiyatlı ve kaliteli restoran listesi! 10 mekan denedim ve en iyilerini derledim 🍽️✨',
    timestamp: '2s',
    upvotes: 512,
    helpfulCount: 478,
    categories: ['Mekan Rehberi', 'Restoran', 'Beşiktaş'],
  },
  {
    id: 104,
    author: {
      name: 'Arda Yılmaz',
      username: 'ardaylmz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Freelance işlere nasıl başlanır? 6 aylık deneyimimle kazandığım bilgileri paylaşıyorum. Upwork ve Fiverr\'da ilk işi almanın püf noktaları 💼',
    timestamp: '4s',
    upvotes: 389,
    helpfulCount: 312,
    categories: ['Freelance', 'Kariyer', 'Girişimcilik'],
  },
  {
    id: 105,
    author: {
      name: 'Deniz Öztürk',
      username: 'denizozturk',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'React vs Vue hangisi daha iyi? 2025 için detaylı karşılaştırma yaptım. Her ikisinde de proje geliştirdim ve deneyimlerimi paylaşıyorum ⚛️',
    timestamp: '6s',
    upvotes: 367,
    helpfulCount: 289,
    categories: ['Programlama', 'Web Geliştirme', 'Teknoloji'],
  },
];

const followingPosts = [
  {
    id: 201,
    author: {
      name: 'Ahmet Şahin',
      username: 'ahmetsahin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Bugün yeni bir yan projeye başladım! E-ticaret platformu için AI tabanlı ürün öneri sistemi geliştiriyorum 🎯',
    timestamp: '10dk',
    upvotes: 15,
    helpfulCount: 8,
    categories: ['Proje', 'Yapay Zeka', 'E-ticaret'],
  },
  {
    id: 202,
    author: {
      name: 'Leyla Koç',
      username: 'leylakoc',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Sabah koşusu sonrası muhteşem bir kahve molası ☕ Çalışma motivasyonumu arttırıyor!',
    timestamp: '25dk',
    upvotes: 28,
    helpfulCount: 12,
    categories: ['Yaşam Tarzı', 'Sağlık'],
  },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'trends' | 'followings'>('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'feed' | 'venue-list' | 'venue-detail'>('feed');
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [venueSortBy, setVenueSortBy] = useState<'rating' | 'newest' | 'nearest'>('rating');

  const getDisplayedPosts = () => {
    switch (activeFilter) {
      case 'trends':
        return trendingPosts;
      case 'followings':
        return followingPosts;
      default:
        return mockPosts;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onCreateClick={() => setShowCreateModal(true)} 
        isCollapsed={isNavCollapsed} 
        setIsCollapsed={setIsNavCollapsed}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      <div className={`transition-all duration-500 ${isNavCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <main className="flex items-start gap-5 p-[20px] max-w-[1800px] mx-auto">
          {/* Main Content */}
          {currentPage === 'feed' ? (
            <div className="flex-1 min-w-0">
              <PostCreator onOpenModal={() => setShowCreateModal(true)} />
              
              {/* Feed Filter Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
                <button
                  onClick={() => setActiveFilter('newest')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'newest'
                      ? 'bg-gray-100 text-text'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  En Yeniler
                </button>
                <button
                  onClick={() => setActiveFilter('trends')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'trends'
                      ? 'bg-gray-100 text-text'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Trendler
                </button>
                <button
                  onClick={() => setActiveFilter('followings')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'followings'
                      ? 'bg-gray-100 text-text'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Takip Edilenler
                </button>
              </div>

              <div>
                {getDisplayedPosts().map((post: any) => {
                  if (post.type === 'wiki') {
                    return <WikiCard key={post.id} {...post} />;
                  } else if (post.type === 'job') {
                    return <JobCard key={post.id} {...post} />;
                  } else if (post.type === 'academic') {
                    return <AcademicCard key={post.id} {...post} />;
                  } else {
                    return <PostCard key={post.id} {...post} />;
                  }
                })}
              </div>
            </div>
          ) : currentPage === 'venue-list' ? (
            <VenueList 
              onVenueClick={(venueId) => {
                setSelectedVenueId(venueId);
                setCurrentPage('venue-detail');
                setIsNavCollapsed(true);
              }}
            />
          ) : (
            <VenueDetail 
              onBackClick={() => {
                setCurrentPage('venue-list');
                setIsNavCollapsed(false);
              }}
            />
          )}
          
          {/* Sidebar - Different for each page */}
          <div className="w-80 shrink-0 sticky top-[20px] self-start hidden lg:block">
            {currentPage === 'venue-list' ? (
              <VenueFilters sortBy={venueSortBy} onSortChange={setVenueSortBy} />
            ) : currentPage === 'venue-detail' ? (
              <VenueSidebar />
            ) : (
              <Sidebar />
            )}
          </div>
        </main>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}