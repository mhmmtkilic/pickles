"use client";

import { useState, useMemo } from "react";
import { users, badges as badgesList, posts, postComments, getUserById } from "@/data/mock";
import { PostCard } from "../discover/components/PostCard";
import { ProfileHeader } from "../discover/components/ProfileHeader";
import { Bookmark, Heart, FileText } from "lucide-react";

// Aktif kullanıcı ID'si (gerçek uygulamada auth'tan gelir)
const CURRENT_USER_ID = "usr_001";

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
  return date.toLocaleDateString('tr-TR');
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

// Post için yorum sayısını hesapla
const getPostCommentCount = (postId: string) => {
  return postComments.filter(c => c.postId === postId).length;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  
  // Kullanıcı verilerini al
  const userData = useMemo(() => {
    return users.find(u => u.id === CURRENT_USER_ID) || users[0];
  }, []);

  // Kullanıcının gönderilerini al
  const userPosts = useMemo(() => {
    return posts
      .filter(post => post.authorId === userData.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(post => {
        const author = getUserById(post.authorId);
        const commentCount = getPostCommentCount(post.id);
        return {
          id: post.id,
          type: post.type,
          author: author ? {
            name: (author as any).displayName || author.username,
            username: author.username,
            avatar: author.avatar,
            badge: getRoleBadge(author.role)
          } : { name: 'Anonim', username: 'anonim', avatar: '' },
          title: (post as any).title || '',
          content: post.content,
          timestamp: formatTimestamp(post.createdAt),
          upvotes: post.stats.upvotes,
          categories: (post as any).categories || [],
          tags: (post as any).tags || [],
          topicLink: (post as any).topicLink,
          commentCount
        };
      });
  }, [userData]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Profile Header */}
      <ProfileHeader 
        user={{
          username: userData.username,
          displayName: (userData as any).displayName,
          avatar: userData.avatar,
          bio: userData.bio,
          university: userData.university,
          department: userData.department,
          location: (userData as any).location,
          role: userData.role,
          level: (userData as any).level,
          joinedAt: (userData as any).joinedAt,
          verified: (userData as any).verified
        }}
      />

      {/* Tabs */}
      <div className="bg-white border border-border rounded-lg mt-4 flex">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 px-4 py-3 text-center transition-colors text-sm font-medium border-b-2 ${
            activeTab === 'posts'
              ? 'border-accent text-accent bg-violet-50/50'
              : 'border-transparent text-zinc-600 hover:bg-zinc-50'
          }`}
        >
          Gönderiler
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 px-4 py-3 text-center transition-colors text-sm font-medium border-b-2 ${
            activeTab === 'saved'
              ? 'border-accent text-accent bg-violet-50/50'
              : 'border-transparent text-zinc-600 hover:bg-zinc-50'
          }`}
        >
          Kaydedilenler
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 px-4 py-3 text-center transition-colors text-sm font-medium border-b-2 ${
            activeTab === 'liked'
              ? 'border-accent text-accent bg-violet-50/50'
              : 'border-transparent text-zinc-600 hover:bg-zinc-50'
          }`}
        >
          Beğeniler
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 space-y-4">
        {activeTab === 'posts' && (
          <>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  title={post.title}
                  content={post.content}
                  timestamp={post.timestamp}
                  upvotes={post.upvotes}
                  categories={post.categories}
                  topicLink={post.topicLink}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-border p-12 text-center text-zinc-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                <p className="font-medium">Henüz gönderi yok.</p>
                <p className="text-sm mt-1">İlk gönderinizi paylaşmaya ne dersiniz?</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white rounded-lg border border-border p-12 text-center text-zinc-500">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
            <p className="font-medium">Kaydedilen gönderi yok.</p>
            <p className="text-sm mt-1">Beğendiğiniz gönderileri kaydedin.</p>
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="bg-white rounded-lg border border-border p-12 text-center text-zinc-500">
            <Heart className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
            <p className="font-medium">Beğenilen gönderi yok.</p>
            <p className="text-sm mt-1">Gönderileri beğenmeye başlayın.</p>
          </div>
        )}
      </div>
    </div>
  );
}
