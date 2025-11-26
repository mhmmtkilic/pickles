"use client";

import { Entry } from "@/types";
import { Avatar } from "@/components/ui";
import { RoleBadge } from "@/components/role";
import { ROLES } from "@/constants";

interface EntryCardProps {
  entry: Entry;
  onLike?: () => void;
  onDislike?: () => void;
}

export function EntryCard({ entry, onLike, onDislike }: EntryCardProps) {
  const roleColor = ROLES[entry.author.role]?.color;

  return (
    <div className="border-b border-zinc-200 py-4 dark:border-zinc-800">
      <div className="flex gap-3">
        <Avatar
          fallback={entry.author.username.slice(0, 2).toUpperCase()}
          roleColor={roleColor}
          size="md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900 dark:text-white">
              {entry.author.username}
            </span>
            <RoleBadge role={entry.author.role} size="sm" showIcon={false} />
            <span className="text-sm text-zinc-500">
              {new Date(entry.createdAt).toLocaleDateString("tr-TR")}
            </span>
          </div>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            {entry.content}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                entry.isLiked
                  ? "text-green-600"
                  : "text-zinc-500 hover:text-green-600"
              }`}
            >
              👍 {entry.likes}
            </button>
            <button
              onClick={onDislike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                entry.isDisliked
                  ? "text-red-600"
                  : "text-zinc-500 hover:text-red-600"
              }`}
            >
              👎 {entry.dislikes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

