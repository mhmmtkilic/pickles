"use client";

import { Avatar, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { RoleBadge } from "@/components/role";
import { CoinBalance } from "@/components/coin";
import { ROLES } from "@/constants";
import { UserRole } from "@/types";

const mockLeaderboard = [
  { rank: 1, username: "konya_bilgesi_01", role: "konya_bilgesi" as UserRole, coin: 65000 },
  { rank: 2, username: "kasif_ahmet", role: "kasif_meraklisi" as UserRole, coin: 42000 },
  { rank: 3, username: "gezgin_fatma", role: "kasif_meraklisi" as UserRole, coin: 38500 },
  { rank: 4, username: "gezgin_ali", role: "gezgin" as UserRole, coin: 8750 },
  { rank: 5, username: "seyyah_zeynep", role: "seyyah" as UserRole, coin: 2100 },
];

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        🏆 Liderlik Tablosu
      </h1>

      <Card>
        <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
          {mockLeaderboard.map((user) => {
            const roleInfo = ROLES[user.role];
            return (
              <div key={user.rank} className="flex items-center gap-4 p-4">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  user.rank === 1 ? "bg-amber-400 text-white" :
                  user.rank === 2 ? "bg-zinc-400 text-white" :
                  user.rank === 3 ? "bg-amber-700 text-white" :
                  "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                }`}>
                  {user.rank}
                </span>
                <Avatar fallback={user.username.slice(0, 2).toUpperCase()} roleColor={roleInfo.color} size="md" />
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900 dark:text-white">@{user.username}</p>
                  <RoleBadge role={user.role} size="sm" />
                </div>
                <CoinBalance amount={user.coin} size="sm" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

