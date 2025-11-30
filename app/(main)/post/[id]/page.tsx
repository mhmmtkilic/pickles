"use client";

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUp, ArrowDown, Heart, MessageCircle, Bookmark, Share2, Send, MoreHorizontal } from 'lucide-react';
import { posts, postComments, getUserById } from '@/data/mock';

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

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: { text: string; color: string };
  };
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  isPostAuthor?: boolean;
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes - comment.downvotes);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleUpvote = () => {
    if (voteState === 'up') {
      setVoteState(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setVoteState('up');
      setUpvoteCount(voteState === 'down' ? upvoteCount + 2 : upvoteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setVoteState(null);
      setUpvoteCount(upvoteCount + 1);
    } else {
      setVoteState('down');
      setUpvoteCount(voteState === 'up' ? upvoteCount - 2 : upvoteCount - 1);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 pl-4 border-l-2 border-gray-100' : ''}`}>
      <div className="py-4">
        <div className="flex items-start gap-3">
          <img 
            src={comment.author.avatar || 'https://via.placeholder.com/40'} 
            alt={comment.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-medium text-sm">{comment.author.name}</span>
              {comment.isPostAuthor && (
                <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-xs rounded">OP</span>
              )}
              {comment.author.badge && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  comment.author.badge.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  comment.author.badge.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  comment.author.badge.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  comment.author.badge.color === 'green' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {comment.author.badge.text}
                </span>
              )}
              <span className="text-xs text-muted-foreground">· {comment.timestamp}</span>
            </div>
            <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
            
            {/* Comment Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleUpvote}
                  className={`p-1 rounded transition-all ${
                    voteState === 'up' ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className={`text-xs font-medium ${
                  voteState === 'up' ? 'text-green-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>{upvoteCount}</span>
                <button 
                  onClick={handleDownvote}
                  className={`p-1 rounded transition-all ${
                    voteState === 'down' ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                Yanıtla
              </button>
            </div>

            {/* Reply Input */}
            {showReplyInput && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Yanıtınızı yazın..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
                <button className="px-3 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [commentText, setCommentText] = useState('');
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Post verisini bul
  const post = useMemo(() => {
    const foundPost = posts.find(p => p.id === postId);
    if (!foundPost) return null;
    
    const author = getUserById(foundPost.authorId);
    return {
      ...foundPost,
      author: author ? {
        name: author.username,
        username: author.username,
        avatar: author.avatar,
        badge: getRoleBadge(author.role)
      } : { name: 'Anonim', username: 'anonim', avatar: '' },
      timestamp: formatTimestamp(foundPost.createdAt)
    };
  }, [postId]);

  // Yorumları hazırla
  const comments = useMemo(() => {
    const postCommentsFiltered = postComments.filter(c => c.postId === postId);
    
    // Root yorumları bul (parentCommentId olmayan)
    const rootComments = postCommentsFiltered.filter(c => !c.parentCommentId);
    
    const buildCommentTree = (comment: typeof postCommentsFiltered[number]): Comment => {
      const author = getUserById(comment.authorId);
      const replies = postCommentsFiltered
        .filter(c => c.parentCommentId === comment.id)
        .map(buildCommentTree);
      
      return {
        id: comment.id,
        content: comment.content,
        author: author ? {
          name: author.username,
          username: author.username,
          avatar: author.avatar,
          badge: getRoleBadge(author.role)
        } : { name: 'Anonim', username: 'anonim', avatar: '' },
        timestamp: formatTimestamp(comment.createdAt),
        upvotes: comment.stats.upvotes,
        downvotes: comment.stats.downvotes,
        replies,
        isPostAuthor: post ? comment.authorId === (post as any).authorId : false
      };
    };
    
    return rootComments.map(buildCommentTree);
  }, [postId, post]);

  const [upvoteCount, setUpvoteCount] = useState(post?.stats?.upvotes || 0);
  const [likeCount, setLikeCount] = useState(post?.stats?.upvotes || 0);

  const handleUpvote = () => {
    if (voteState === 'up') {
      setVoteState(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setVoteState('up');
      setUpvoteCount(voteState === 'down' ? upvoteCount + 2 : upvoteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setVoteState(null);
      setUpvoteCount(upvoteCount + 1);
    } else {
      setVoteState('down');
      setUpvoteCount(voteState === 'up' ? upvoteCount - 2 : upvoteCount - 1);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-text mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri
          </button>
          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground">Post bulunamadı</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Geri
        </button>

        {/* Post Content */}
        <div className="bg-white rounded-lg border border-border overflow-hidden mb-6">
          <div className="p-6">
            {/* Author Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar || 'https://via.placeholder.com/48'} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold">{post.author.name}</h4>
                    {post.author.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        post.author.badge.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        post.author.badge.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        post.author.badge.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                        post.author.badge.color === 'green' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {post.author.badge.text}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">@{post.author.username} · {post.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-md transition-all ${
                    isSaved ? 'text-accent bg-violet-50' : 'text-gray-400 hover:text-accent hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-accent' : ''}`} />
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Post Title */}
            {(post as any).title && (
              <h1 className="text-2xl font-bold mb-4">{(post as any).title}</h1>
            )}

            {/* Post Content */}
            <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

            {/* Categories */}
            {(post as any).categories && (post as any).categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(post as any).categories.map((category: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary text-sm rounded-md hover:bg-muted transition-colors cursor-pointer"
                  >
                    #{category}
                  </span>
                ))}
              </div>
            )}

            {/* Interaction Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleUpvote}
                  className={`p-2 rounded-md transition-all ${
                    voteState === 'up' ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className={`text-sm font-medium min-w-[2rem] text-center ${
                  voteState === 'up' ? 'text-green-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-700'
                }`}>{upvoteCount}</span>
                <button 
                  onClick={handleDownvote}
                  className={`p-2 rounded-md transition-all ${
                    voteState === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>

              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 transition-all ${
                  isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span className="text-sm">{likeCount}</span>
              </button>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{comments.length} yorum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="bg-white rounded-lg border border-border p-4 mb-6">
          <div className="flex gap-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
              alt="You"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Yorumunuzu yazın..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-accent min-h-[100px]"
              />
              <div className="flex justify-end mt-2">
                <button 
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
                  disabled={!commentText.trim()}
                >
                  <Send className="w-4 h-4" />
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Yorumlar ({comments.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="px-4">
                  <CommentItem comment={comment} />
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Henüz yorum yok. İlk yorumu sen yap!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

