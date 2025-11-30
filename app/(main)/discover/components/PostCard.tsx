import { ArrowUp, ArrowDown, Heart, MessageCircle, Bookmark, MoreHorizontal, Share2, MapPin, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  title?: string;
  content: string;
  timestamp: string;
  upvotes: number;
  helpfulCount?: number;
  categories: string[];
  topicLink?: {
    icon: 'venue' | 'course';
    text: string;
  };
}

export function PostCard({ author, title, content, timestamp, upvotes, helpfulCount, categories, topicLink }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [commentCount] = useState(8);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const displayContent = content.length > 200 && !showFullContent 
    ? content.slice(0, 200) + '...' 
    : content;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

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

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white border border-border rounded-lg mb-4 hover:border-muted transition-colors overflow-hidden cursor-pointer">
      <div className="p-5">
          {/* Header: User Info + Actions */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="leading-tight">{author.name}</h4>
                  {author.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      author.badge.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      author.badge.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      author.badge.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {author.badge.text}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">@{author.username} · {timestamp}</p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleSave}
                className={`p-2 rounded-md transition-all ${
                  isSaved 
                    ? 'text-accent bg-violet-50' 
                    : 'text-gray-400 hover:text-accent hover:bg-secondary'
                }`}
                title="Kaydet"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-accent' : ''}`} />
              </button>
              <button 
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all"
                title="Paylaş"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        {/* Post Title */}
        {title && (
          <h3 className="text-lg mb-2">{title}</h3>
        )}

        {/* Post Content */}
        <p className="mb-4 text-gray-800 leading-relaxed">{content}</p>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="px-2.5 py-1 bg-secondary text-xs rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                #{category}
              </span>
            ))}
          </div>
        )}

        {/* Interaction Bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
          {/* Upvote/Downvote */}
          <div className="flex items-center gap-1">
            <button 
              onClick={handleUpvote}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'up' 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ArrowUp className={`w-4 h-4 transition-all ${
                voteState === 'up' ? 'fill-green-600' : ''
              }`} />
            </button>
            <span className={`text-sm font-medium min-w-[1.5rem] text-center ${
              voteState === 'up' ? 'text-green-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-700'
            }`}>{upvoteCount}</span>
            <button 
              onClick={handleDownvote}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'down' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ArrowDown className={`w-4 h-4 transition-all ${
                voteState === 'down' ? 'fill-red-600' : ''
              }`} />
            </button>
          </div>

          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all ${
              isLiked 
                ? 'text-red-500' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 transition-all ${
              isLiked ? 'fill-red-500 scale-110' : ''
            }`} />
            <span className="text-sm">{likeCount}</span>
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{commentCount}</span>
          </button>

          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}