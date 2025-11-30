"use client";

import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { PostCreator } from './components/PostCreator';
import { PostCard } from './components/PostCard';
import { WikiCard } from './components/WikiCard';
import { JobCard } from './components/JobCard';
import { AcademicCard } from './components/AcademicCard';
import { Sidebar } from './components/Sidebar';
import { VenueSidebar } from './components/VenueSidebar';
import { VenueFilters } from './components/VenueFilters';
import { CreatePostModal } from './components/CreatePostModal';
import { VenueDetail } from './components/VenueDetail';
import { VenueList } from './components/VenueList';
import { TopicList } from './components/TopicList';
import { TopicFilterSidebar } from './components/TopicFilterSidebar';
import { JobFilters } from './components/JobFilters';
import { AcademicFilters } from './components/AcademicFilters';
import { CulturalDiscovery } from './components/CulturalDiscovery';
import { CulturalSidebar } from './components/CulturalSidebar';
import { ProfileHeader } from './components/ProfileHeader';
import { GamificationWidget } from './components/GamificationWidget';
import { BadgeShowcase } from './components/BadgeShowcase';
import { ReferralCard } from './components/ReferralCard';
import { Target, Coins, Award } from 'lucide-react';
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
    title: 'Startup Projesinde Kullanıcı Deneyimi Başarısı',
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
    title: 'Kampüste Yapay Zeka Konferansı',
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
    title: 'Kadıköy\'de Yeni Açılan Harika Kafe',
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
    title: 'Portfolio Güncellemesi ve Kariyer Tavsiyeleri',
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
    type: 'post',
    author: {
      name: 'Elif Yıldız',
      username: 'elifylz',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'ChatGPT\'nin Yeni Özellikleri ve Kullanım Deneyimi',
    content: 'ChatGPT\'nin yeni özellikleri gerçekten etkileyici! Özellikle kod yazma ve debugging konusunda büyük yardımcı oluyor. Herkesin denemesini tavsiye ederim 🤖',
    timestamp: '30dk',
    upvotes: 284,
    helpfulCount: 197,
    categories: ['Teknoloji', 'Yapay Zeka', 'Programlama'],
  },
  {
    id: 102,
    type: 'post',
    author: {
      name: 'Burak Aslan',
      username: 'burakaslan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Junior Developer İçin CV Hazırlama Rehberi',
    content: 'Junior developer pozisyonları için CV hazırlama rehberi hazırladım. 50\'den fazla başvuru sonucunda öğrendiklerimi paylaşıyorum. İsteyen varsa DM atabilir! 📝',
    timestamp: '1s',
    upvotes: 421,
    helpfulCount: 356,
    categories: ['Kariyer', 'Teknoloji', 'İş Başvurusu'],
  },
  {
    id: 103,
    type: 'post',
    author: {
      name: 'Selin Kara',
      username: 'selinkara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Beşiktaş\'ta Öğrencilere Özel Restoran Rehberi',
    content: 'Beşiktaş\'ta öğrenciler için uygun fiyatlı ve kaliteli restoran listesi! 10 mekan denedim ve en iyilerini derledim 🍽️✨',
    timestamp: '2s',
    upvotes: 512,
    helpfulCount: 478,
    categories: ['Mekan Rehberi', 'Restoran', 'Beşiktaş'],
  },
  {
    id: 104,
    type: 'post',
    author: {
      name: 'Arda Yılmaz',
      username: 'ardaylmz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Freelance İşlere Başlama Rehberi',
    content: 'Freelance işlere nasıl başlanır? 6 aylık deneyimimle kazandığım bilgileri paylaşıyorum. Upwork ve Fiverr\'da ilk işi almanın püf noktaları 💼',
    timestamp: '4s',
    upvotes: 389,
    helpfulCount: 312,
    categories: ['Freelance', 'Kariyer', 'Girişimcilik'],
  },
  {
    id: 105,
    type: 'post',
    author: {
      name: 'Deniz Öztürk',
      username: 'denizozturk',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'React vs Vue: 2025 Karşılaştırması',
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
    type: 'post',
    author: {
      name: 'Ahmet Şahin',
      username: 'ahmetsahin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Yeni Yan Proje: AI Tabanlı Ürün Öneri Sistemi',
    content: 'Bugün yeni bir yan projeye başladım! E-ticaret platformu için AI tabanlı ürün öneri sistemi geliştiriyorum 🎯',
    timestamp: '10dk',
    upvotes: 15,
    helpfulCount: 8,
    categories: ['Proje', 'Yapay Zeka', 'E-ticaret'],
  },
  {
    id: 202,
    type: 'post',
    author: {
      name: 'Leyla Koç',
      username: 'leylakoc',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Sabah Rutini: Koşu ve Kahve',
    content: 'Sabah koşusu sonrası muhteşem bir kahve molası ☕ Çalışma motivasyonumu arttırıyor!',
    timestamp: '25dk',
    upvotes: 28,
    helpfulCount: 12,
    categories: ['Yaşam Tarzı', 'Sağlık'],
  },
];

const mockJobs = [
  {
    id: 301,
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
    id: 302,
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
    id: 303,
    type: 'job',
    author: {
      name: 'Zeynep Teknik',
      username: 'zeytech',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTIyOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Yazılımcı',
        color: 'blue',
      },
    },
    category: 'internship',
    title: 'Frontend Developer Stajyeri',
    details: {
      location: 'Selçuklu, Konya',
      payment: '8,000₺ / Ay',
      time: 'Tam Zamanlı',
    },
    description: 'Konya\'da yerleşik yazılım şirketimizde React ve TypeScript ile çalışacak stajyer frontend developer arıyoruz. Üniversite öğrencileri başvurabilir. SGK ve yemek kartı dahil.',
    timestamp: '2s',
  },
  {
    id: 304,
    type: 'job',
    author: {
      name: 'Ahmet Dersane',
      username: 'ahmet_egitim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'tutor',
    title: 'İngilizce Öğretmeni - Özel Ders',
    details: {
      location: 'Karatay, Konya',
      payment: '350₺ / Saat',
      time: 'Hafta İçi Akşam',
    },
    description: 'YDS, TOEFL, IELTS hazırlık dersleri veriyorum. İngilizce Öğretmenliği mezunuyum ve yurtdışı deneyimim var. Konuşma pratiği ve akademik İngilizce konusunda uzmanım.',
    timestamp: '3s',
  },
  {
    id: 305,
    type: 'job',
    author: {
      name: 'Selin Freelance',
      username: 'selin_design',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Tasarımcı',
        color: 'pink',
      },
    },
    category: 'freelance',
    title: 'UI/UX Tasarımcı - Freelance',
    details: {
      location: 'Uzaktan',
      payment: '5,000₺ / Proje',
      time: 'Esnek',
    },
    description: 'Startup ve küçük işletmeler için UI/UX tasarım hizmeti veriyorum. Figma ile profesyonel tasarımlar, mobil ve web arayüz tasarımları. Portfolio linkimi DM\'den paylaşabilirim.',
    timestamp: '1s',
  },
  {
    id: 306,
    type: 'job',
    author: {
      name: 'Mehmet Cafe',
      username: 'mehmet_kafe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'parttime',
    title: 'Part-time Barista',
    details: {
      location: 'Meram, Konya',
      payment: '17,000₺ / Ay',
      time: 'Hafta Sonu',
    },
    description: 'Meram\'daki kafemizde hafta sonları çalışacak barista arıyoruz. Öğrenciler için ideal. Kahve yapma deneyimi tercih sebebi. Eğitim verilecektir.',
    timestamp: '4s',
  },
  {
    id: 307,
    type: 'job',
    author: {
      name: 'Ayşe Karataş',
      username: 'ayse_student',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'roommate',
    title: 'Selçuklu\'da Kız Öğrenci Ev Arkadaşı',
    details: {
      location: 'Selçuklu, Konya',
      payment: '3,800₺ / Ay',
      time: 'Mart 2025',
    },
    description: '2+1 dairede kız öğrenci ev arkadaşı arıyorum. Kampüse yürüme mesafesinde, güvenli bir mahallede. Temizlik ve düzene önem veren, sessiz biri tercih edilir.',
    timestamp: '6s',
  },
  {
    id: 308,
    type: 'job',
    author: {
      name: 'Kemal Yazılım',
      username: 'kemal_dev',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxMjI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Developer',
        color: 'green',
      },
    },
    category: 'freelance',
    title: 'Python Developer - Otomasyon Projeleri',
    details: {
      location: 'Uzaktan',
      payment: '3,000₺ / Proje',
      time: 'Esnek',
    },
    description: 'Küçük ve orta ölçekli işletmeler için Python ile otomasyon scriptleri yazıyorum. Web scraping, veri işleme, Excel otomasyonu gibi konularda deneyimliyim.',
    timestamp: '2s',
  },
  {
    id: 309,
    type: 'job',
    author: {
      name: 'Fatma Öğrenci',
      username: 'fatma_ogrenci',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'sale',
    title: 'İkinci El Macbook Air M1 Satılık',
    details: {
      location: 'Selçuklu, Konya',
      payment: '18,000₺',
      time: 'Acil Satılık',
    },
    description: '2021 model Macbook Air M1, 8GB RAM, 256GB SSD. Çok temiz, hemen hemen hiç kullanılmadı. Kutusu ve tüm aksesuarları mevcut. Mezun olduğum için satıyorum.',
    timestamp: '1s',
  },
  {
    id: 310,
    type: 'job',
    author: {
      name: 'Can Teknoloji',
      username: 'can_tech',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'sale',
    title: 'Programlama Kitapları - Temiz',
    details: {
      location: 'Meram, Konya',
      payment: '150₺ / Adet',
      time: 'Müsait',
    },
    description: 'Clean Code, Design Patterns, Refactoring kitaplarımı satıyorum. Tamamı İngilizce orijinal baskı, çok az kullanılmış durumda. Toplu alana indirim yapabilirim.',
    timestamp: '3s',
  },
  {
    id: 311,
    type: 'job',
    author: {
      name: 'Deniz Mobilya',
      username: 'deniz_ev',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'sale',
    title: 'Çalışma Masası ve Sandalye Seti',
    details: {
      location: 'Karatay, Konya',
      payment: '2,500₺',
      time: 'Bu Hafta',
    },
    description: 'IKEA çalışma masası ve ergonomik sandalye seti. 1 yıllık, çok temiz. Taşınma nedeniyle acil satılık. Fotoğrafları DM\'den gönderebilirim.',
    timestamp: '4s',
  },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'trends' | 'followings'>('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'feed' | 'venue-list' | 'venue-detail' | 'topic-list' | 'jobs' | 'academic' | 'cultural' | 'profile' | 'wallet'>('feed');
  const [profileTab, setProfileTab] = useState<'posts' | 'bookmarks' | 'likes'>('posts');
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [venueSortBy, setVenueSortBy] = useState<'all' | 'rating' | 'newest' | 'nearest'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [jobCategoryFilter, setJobCategoryFilter] = useState<'all' | 'job' | 'roommate' | 'sale'>('all');
  const [academicTypeFilter, setAcademicTypeFilter] = useState<'all' | 'notes' | 'book' | 'article' | 'video' | 'presentation' | 'project'>('all');

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
        onNavigate={(page) => {
          setCurrentPage(page);
          if (page === 'jobs' || page === 'academic' || page === 'cultural') {
            setActiveFilter('newest');
          }
        }}
      />
      
      <div className={`transition-all duration-500 ${isNavCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          onProfileClick={() => {
            setCurrentPage('profile');
          }}
        />
        
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
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  En Yeniler
                </button>
                <button
                  onClick={() => setActiveFilter('trends')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'trends'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Trendler
                </button>
                <button
                  onClick={() => setActiveFilter('followings')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'followings'
                      ? 'bg-violet-50 text-accent'
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
            <div className="flex-1 min-w-0">
            <VenueList 
              onVenueClick={(venueId) => {
                setSelectedVenueId(venueId);
                setCurrentPage('venue-detail');
                setIsNavCollapsed(true);
              }}
                sortBy={venueSortBy}
                onSortChange={setVenueSortBy}
            />
            </div>
          ) : currentPage === 'venue-detail' ? (
            <VenueDetail 
              onBackClick={() => {
                setCurrentPage('venue-list');
                setIsNavCollapsed(false);
              }}
            />
          ) : currentPage === 'topic-list' ? (
            <div className="flex-1 min-w-0">
              <PostCreator onOpenModal={() => setShowCreateModal(true)} />
              <TopicList onTopicClick={(topicId) => {
                setSelectedTopicId(topicId);
                // TODO: Navigate to topic detail page
                console.log('Topic clicked:', topicId);
              }} />
            </div>
          ) : currentPage === 'jobs' ? (
            <div className="flex-1 min-w-0">
              <PostCreator onOpenModal={() => setShowCreateModal(true)} />
              
              {/* Jobs Filter Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
                <button
                  onClick={() => setJobCategoryFilter('all')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    jobCategoryFilter === 'all'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setJobCategoryFilter('job')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    jobCategoryFilter === 'job'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  İş
                </button>
                <button
                  onClick={() => setJobCategoryFilter('roommate')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    jobCategoryFilter === 'roommate'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Ev Arkadaşı
                </button>
                <button
                  onClick={() => setJobCategoryFilter('sale')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    jobCategoryFilter === 'sale'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Satış
                </button>
              </div>

              <div>
                {mockJobs
                  .filter((job: any) => 
                    jobCategoryFilter === 'all' || job.category === jobCategoryFilter || 
                    (jobCategoryFilter === 'job' && (job.category === 'internship' || job.category === 'parttime' || job.category === 'freelance' || job.category === 'tutor' || job.category === 'job'))
                  )
                  .map((job: any) => (
                    <JobCard key={job.id} {...job} />
                  ))}
              </div>
            </div>
          ) : currentPage === 'academic' ? (
            <div className="flex-1 min-w-0">
              <PostCreator onOpenModal={() => setShowCreateModal(true)} />
              
              {/* Academic Filter Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
                <button
                  onClick={() => setActiveFilter('newest')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'newest'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  En Yeniler
                </button>
                <button
                  onClick={() => setActiveFilter('trends')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'trends'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Trendler
                </button>
                <button
                  onClick={() => setActiveFilter('followings')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    activeFilter === 'followings'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Takip Edilenler
                </button>
              </div>

              <div>
                {getDisplayedPosts()
                  .filter((post: any) => post.type === 'academic')
                  .map((post: any) => (
                    <AcademicCard key={post.id} {...post} />
                  ))}
              </div>
            </div>
          ) : currentPage === 'cultural' ? (
            <div className="flex-1 min-w-0">
              <CulturalDiscovery />
            </div>
          ) : currentPage === 'profile' ? (
            <div className="flex-1 min-w-0 space-y-5">
              <ProfileHeader />
              
              {/* Profile Content Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setProfileTab('posts')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'posts'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Gönderiler
                </button>
                <button
                  onClick={() => setProfileTab('bookmarks')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'bookmarks'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Kaydedilenler
                </button>
                <button
                  onClick={() => setProfileTab('likes')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'likes'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Beğeniler
                </button>
              </div>

              {/* Content List */}
              <div>
                {profileTab === 'posts' && getDisplayedPosts().slice(0, 3).map((post: any) => {
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
                {profileTab === 'bookmarks' && (
                  <div className="text-center py-10 text-muted-foreground">
                    Kaydedilen içerik bulunamadı
                  </div>
                )}
                {profileTab === 'likes' && (
                  <div className="text-center py-10 text-muted-foreground">
                    Beğenilen içerik bulunamadı
                  </div>
                )}
              </div>
            </div>
          ) : null}
          
          {/* Sidebar - Different for each page */}
          <div className="w-80 shrink-0 sticky top-[20px] self-start hidden lg:block">
            {currentPage === 'venue-list' ? (
              <VenueFilters sortBy={venueSortBy} onSortChange={setVenueSortBy} />
            ) : currentPage === 'venue-detail' ? (
              <VenueSidebar />
            ) : currentPage === 'topic-list' ? (
              <TopicFilterSidebar />
            ) : currentPage === 'jobs' ? (
              <JobFilters category={jobCategoryFilter} />
            ) : currentPage === 'academic' ? (
              <AcademicFilters 
                typeFilter={academicTypeFilter}
                onTypeChange={setAcademicTypeFilter}
              />
            ) : currentPage === 'cultural' ? (
              <CulturalSidebar onNavigateToLiveEvents={() => {
                // Live Events sayfasına geçiş - şimdilik boş
                console.log('Live Events clicked');
              }} />
            ) : currentPage === 'profile' ? (
              <aside className="space-y-4">
                {/* Wallet Widget */}
                <button 
                  onClick={() => setCurrentPage('wallet')}
                  className="w-full text-left relative bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl p-5 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-white/90" />
                      <span className="text-sm text-white/90">GençCoin Cüzdan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-7 h-7 bg-violet-400 rounded-full flex items-center justify-center">
                        <Coins className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-7 h-7 bg-violet-500/80 rounded-full flex items-center justify-center -ml-3">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="relative mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl text-white tracking-wider">
                        2.450
                      </span>
                      <span className="text-sm text-white/80">
                        Coin
                      </span>
                    </div>
                    <p className="text-xs text-white/70">≈ 1 Kahve Parası Değerinde</p>
                  </div>

                  {/* Progress */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/80">Kahve ödülüne</span>
                      <span className="text-xs text-white">50 Coin kaldı</span>
                    </div>
                    <div className="h-2 bg-violet-400/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </button>

                {/* Quests Widget */}
                <div className="bg-white border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent" />
                      <h3>Aktif Görevler</h3>
                    </div>
                    <button className="text-xs text-accent hover:text-accent/80 transition-colors">
                      Tümü
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Quest 1 */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">İlk Postunu Paylaş</h4>
                          <p className="text-xs text-muted-foreground">
                            Forum'da ilk içeriğini oluştur
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-accent shrink-0">
                          <Coins className="w-3.5 h-3.5" />
                          <span className="text-xs">50</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">0/1</p>
                    </div>

                    {/* Quest 2 */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">5 Yorum Yap</h4>
                          <p className="text-xs text-muted-foreground">
                            Diğer gönderilere katkıda bulun
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-accent shrink-0">
                          <Coins className="w-3.5 h-3.5" />
                          <span className="text-xs">25</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">2/5</p>
                    </div>

                    {/* Quest 3 */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">Mekan İncele</h4>
                          <p className="text-xs text-muted-foreground">
                            Gittiğin bir mekanı incele
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-accent shrink-0">
                          <Coins className="w-3.5 h-3.5" />
                          <span className="text-xs">100</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">0/1</p>
                    </div>
                  </div>
                </div>
                
                <GamificationWidget />
                <BadgeShowcase />
                <ReferralCard />
              </aside>
            ) : (
              <Sidebar onWalletClick={() => {
                // Wallet sayfasına geçiş - şimdilik boş
                console.log('Wallet clicked');
              }} />
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