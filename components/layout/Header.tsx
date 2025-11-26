"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CoinBalance } from "@/components/coin";
import { Avatar } from "@/components/ui";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // Mock user data - gerçek uygulamada auth context'ten gelecek
  const user = { username: "gezgin_ali", coin: 4750 };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/discover" className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
          <span>📚</span>
          <span className="hidden sm:inline">Konya Genç WikiSözlük</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/discover" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Keşfet
          </Link>
          <Link href="/search" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Ara
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            Liderlik
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <CoinBalance amount={user.coin} size="sm" />
          <Link href="/notifications" className="relative">
            <span className="text-xl">🔔</span>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">2</span>
          </Link>
          <Link href="/profile">
            <Avatar fallback={user.username.slice(0, 2).toUpperCase()} size="sm" roleColor="#3b82f6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
