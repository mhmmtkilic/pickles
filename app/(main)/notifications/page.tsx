"use client";

import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { NotificationItem } from "@/components/notification";
import { Notification } from "@/types";

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "coin_earned",
    title: "+10 GençCoin Kazandın!",
    message: "Wiki düzenlemen onaylandı.",
    isRead: false,
    link: "/topic/selcuk-hukuk",
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    type: "entry_liked",
    title: "Yorumun Beğenildi",
    message: "@seyyah_zeynep yorumunu beğendi.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    userId: "1",
    type: "role_upgrade",
    title: "Tebrikler! 🎉",
    message: "Seyyah rolüne terfi ettin!",
    isRead: true,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "4",
    userId: "1",
    type: "badge_earned",
    title: "Yeni Rozet Kazandın! 🏆",
    message: "'100 Beğeni' rozetini kazandın.",
    isRead: true,
    createdAt: new Date(Date.now() - 172800000),
  },
];

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Bildirimler
          {unreadCount > 0 && (
            <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-sm text-white">
              {unreadCount}
            </span>
          )}
        </h1>
        <Button variant="ghost" size="sm">
          Tümünü Okundu İşaretle
        </Button>
      </div>

      <Card>
        <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
          {mockNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

