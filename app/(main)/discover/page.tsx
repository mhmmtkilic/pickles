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
import { useState, useMemo } from 'react';
import { posts, jobs, academicMaterials, users, getUserById, postComments } from '@/data/mock';

// Aktif kullanıcı (gerçek uygulamada auth'tan gelir)
const CURRENT_USER_ID = "usr_001";
const currentUser = users.find(u => u.id === CURRENT_USER_ID) || users[0];

// Yardımcı fonksiyon: tarih formatlama
const formatTimestamp = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins}dk`;
  if (diffHours < 24) return `${diffHours}s`;
  if (diffDays < 7) return `${diffDays}g`;
  return date.toLocaleDateString('tr-TR');
};

// Yardımcı fonksiyon: rol badge'i oluştur
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

// Post için gerçek yorum sayısını hesapla
const getPostCommentCount = (postId: string) => {
  return postComments.filter(c => c.postId === postId).length;
};

// Feed için postları hazırla
const prepareFeedPosts = () => {
  return posts.map(post => {
    const author = getUserById(post.authorId);
    const commentCount = getPostCommentCount(post.id);
    return {
      id: post.id,
      type: post.type,
      author: author ? {
        name: author.username,
        username: author.username,
        avatar: author.avatar,
        badge: getRoleBadge(author.role)
      } : { name: 'Anonim', username: 'anonim', avatar: '' },
      title: (post as any).title || '',
      content: post.content,
      timestamp: formatTimestamp(post.createdAt),
      upvotes: post.stats.upvotes,
      downvotes: post.stats.downvotes,
      helpfulCount: (post.stats as any).helpfulCount || post.stats.upvotes,
      categories: (post as any).categories || [],
      tags: (post as any).tags || [],
      topicLink: (post as any).topicLink,
      comments: commentCount,
      image: (post as any).images?.[0] || null
    };
  });
};

// Jobs için ilanları hazırla
const prepareFeedJobs = () => {
  return jobs.map(job => {
    const author = getUserById(job.authorId);
    return {
      id: job.id,
      type: 'job',
      author: author ? {
        name: author.username,
        username: author.username,
        avatar: author.avatar,
        badge: getRoleBadge(author.role)
      } : { name: 'Anonim', username: 'anonim', avatar: '' },
      category: job.category,
      title: job.title,
      details: job.details,
      description: job.description,
      timestamp: formatTimestamp(job.createdAt)
    };
  });
};

// Academic materials hazırla  
const prepareAcademicPosts = () => {
  return academicMaterials.map(material => {
    const uploader = getUserById(material.uploaderId);
    return {
      id: material.id,
      type: 'academic',
      courseCode: material.courseCode,
      courseName: material.courseName,
      university: material.university,
      department: material.department,
      uploader: uploader ? {
        name: uploader.username,
        username: uploader.username,
        avatar: uploader.avatar,
        badge: getRoleBadge(uploader.role)
      } : { name: 'Anonim', username: 'anonim' },
      timestamp: formatTimestamp(material.createdAt),
      file: material.file,
      description: material.description,
      rating: material.rating,
      ratingCount: material.ratingCount,
      downloads: material.downloads,
      comments: material.comments
    };
  });
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'trends' | 'followings'>('newest');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'feed' | 'venue-list' | 'venue-detail' | 'topic-list' | 'jobs' | 'academic' | 'cultural' | 'profile' | 'wallet'>('feed');
  const [profileTab, setProfileTab] = useState<'posts' | 'bookmarks' | 'likes'>('posts');
  const [selectedVenueId, setSelectedVenueId] = useState<string | number | null>(null);
  const [venueSortBy, setVenueSortBy] = useState<'all' | 'rating' | 'newest' | 'nearest'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string | number | null>(null);
  const [jobCategoryFilter, setJobCategoryFilter] = useState<'all' | 'job' | 'roommate' | 'sale'>('all');
  const [academicTypeFilter, setAcademicTypeFilter] = useState<'all' | 'notes' | 'book' | 'article' | 'video' | 'presentation' | 'project'>('all');

  // Mock verileri hazırla
  const feedPosts = useMemo(() => prepareFeedPosts(), []);
  const feedJobs = useMemo(() => prepareFeedJobs(), []);
  const academicPosts = useMemo(() => prepareAcademicPosts(), []);

  // Feed postlarını filtrele
  const getDisplayedPosts = () => {
    const allPosts = [...feedPosts];
    
    switch (activeFilter) {
      case 'trends':
        // En çok upvote alanları göster
        return [...allPosts].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)).slice(0, 10);
      case 'followings':
        // İlk 5 postu göster (gerçek uygulamada takip edilen kullanıcıların postları)
        return allPosts.slice(0, 5);
      default:
        return allPosts;
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
                {feedJobs
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
                {academicPosts.map((post: any) => (
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
              <ProfileHeader 
                user={{
                  username: currentUser.username,
                  displayName: (currentUser as any).displayName,
                  avatar: currentUser.avatar,
                  bio: currentUser.bio,
                  university: currentUser.university,
                  department: currentUser.department,
                  location: (currentUser as any).location,
                  role: currentUser.role,
                  level: (currentUser as any).level,
                  joinedAt: (currentUser as any).joinedAt,
                  verified: (currentUser as any).verified
                }}
              />
              
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