"use client";

import { Avatar, Button, Card, CardHeader, CardTitle, CardContent, Tabs } from "@/components/ui";
import { CoinBalance } from "@/components/coin";
import { RoleBadge, RoleProgress } from "@/components/role";
import { ROLES } from "@/constants";
import { UserRole } from "@/types";

// Örnek kullanıcı verisi
const mockUser = {
  id: "1",
  username: "gezgin_ali",
  email: "ali@selcuk.edu.tr",
  role: "gezgin" as UserRole,
  gencCoin: 4750,
  kulturKartId: "GK-123456",
  badges: [
    { id: "1", name: "İlk Yorum", icon: "💬" },
    { id: "2", name: "Wiki Editörü", icon: "📝" },
    { id: "3", name: "100 Beğeni", icon: "👍" },
  ],
  contributions: {
    topics: 5,
    wikiEdits: 23,
    entries: 67,
  },
};

export default function ProfilePage() {
  const roleInfo = ROLES[mockUser.role];

  const tabContent = [
    {
      id: "contributions",
      label: "Katkılarım",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {mockUser.contributions.topics}
                </p>
                <p className="text-sm text-zinc-500">Açılan Başlık</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {mockUser.contributions.wikiEdits}
                </p>
                <p className="text-sm text-zinc-500">Wiki Düzenlemesi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {mockUser.contributions.entries}
                </p>
                <p className="text-sm text-zinc-500">Yorum</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "badges",
      label: "Rozetlerim",
      content: (
        <div className="grid gap-4 sm:grid-cols-3">
          {mockUser.badges.map((badge) => (
            <Card key={badge.id}>
              <CardContent className="flex items-center gap-3 pt-4">
                <span className="text-3xl">{badge.icon}</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {badge.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: "history",
      label: "Coin Geçmişi",
      content: (
        <div className="text-center text-zinc-500 py-8">
          Coin geçmişi yakında...
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar
              fallback={mockUser.username.slice(0, 2).toUpperCase()}
              roleColor={roleInfo.color}
              size="xl"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  @{mockUser.username}
                </h1>
                <RoleBadge role={mockUser.role} />
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                Kültür Kart: {mockUser.kulturKartId}
              </p>
              
              {/* Coin Balance */}
              <div className="mt-4">
                <CoinBalance amount={mockUser.gencCoin} size="lg" />
              </div>

              {/* Role Progress */}
              <div className="mt-4">
                <RoleProgress currentCoin={mockUser.gencCoin} currentRole={mockUser.role} />
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
                <Button variant="primary">
                  🪙 Coin'leri Karta Aktar
                </Button>
                <Button variant="outline">
                  Profili Düzenle
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabContent} />
    </div>
  );
}
