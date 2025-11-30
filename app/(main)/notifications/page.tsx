"use client";

import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { NotificationItem } from "@/components/notification";
import { Notification } from "@/types";
import { notifications } from "@/data/mock";

// Notification verilerini hazırla
const notificationData: Notification[] = notifications.slice(0, 5).map(ntf => ({
  id: ntf.id,
  userId: ntf.userId,
  type: ntf.type as Notification["type"],
  title: ntf.title.charAt(0).toUpperCase() + ntf.title.slice(1),
  message: ntf.message.charAt(0).toUpperCase() + ntf.message.slice(1),
  isRead: ntf.isRead,
  link: ntf.link,
  createdAt: new Date(ntf.createdAt),
}));

export default function NotificationsPage() {
  const unreadCount = notificationData.filter((n) => !n.isRead).length;

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
          {notificationData.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

