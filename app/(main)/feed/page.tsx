"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components";

interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: { name: "Ayşe Yılmaz", username: "ayseyilmaz", avatar: "AY" },
    content: "Bugün yeni bir proje başlattım! Next.js 14 ile harika şeyler yapıyorum 🚀",
    likes: 24,
    comments: 5,
    time: "2 saat önce",
    liked: false,
  },
  {
    id: 2,
    author: { name: "Mehmet Kaya", username: "mehmetkaya", avatar: "MK" },
    content: "React Server Components gerçekten oyunun kurallarını değiştiriyor. Performans artışı inanılmaz!",
    likes: 45,
    comments: 12,
    time: "4 saat önce",
    liked: true,
  },
  {
    id: 3,
    author: { name: "Zeynep Demir", username: "zeynepdemir", avatar: "ZD" },
    content: "Tailwind CSS ile tasarım yapmak artık çok kolay. Herkese öneriyorum 💅",
    likes: 67,
    comments: 8,
    time: "6 saat önce",
    liked: false,
  },
  {
    id: 4,
    author: { name: "Ali Öztürk", username: "aliozturk", avatar: "AÖ" },
    content: "TypeScript olmadan kod yazmak artık imkansız geliyor. Tip güvenliği her şey! 🔒",
    likes: 89,
    comments: 15,
    time: "8 saat önce",
    liked: false,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      author: { name: "John Doe", username: "johndoe", avatar: "JD" },
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Şimdi",
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Akış
      </h1>

      {/* Yeni Gönderi */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                  JD
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Ne düşünüyorsun?"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
                />
                <div className="mt-2 flex justify-end">
                  <Button type="submit" size="sm">
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Gönderiler */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <Link href="/profile">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500">
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                      {post.author.avatar}
                    </div>
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link href="/profile" className="font-semibold text-zinc-900 hover:underline dark:text-white">
                      {post.author.name}
                    </Link>
                    <span className="text-sm text-zinc-500">@{post.author.username}</span>
                    <span className="text-zinc-300 dark:text-zinc-600">·</span>
                    <span className="text-sm text-zinc-500">{post.time}</span>
                  </div>
                  <p className="mt-2 text-zinc-700 dark:text-zinc-300">{post.content}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-6 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    post.liked 
                      ? "text-red-500" 
                      : "text-zinc-500 hover:text-red-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill={post.liked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {post.comments}
                </button>
                <button className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Paylaş
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

