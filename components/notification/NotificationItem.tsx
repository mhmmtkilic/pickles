import Link from "next/link";
import { Notification } from "@/types";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: () => void;
}

const notificationIcons: Record<string, string> = {
  coin_earned: "🪙",
  role_upgrade: "🎉",
  entry_liked: "👍",
  wiki_approved: "✅",
  wiki_rejected: "❌",
  badge_earned: "🏆",
  system: "📢",
};

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg p-3 transition-colors",
        notification.isRead
          ? "bg-transparent"
          : "bg-amber-50 dark:bg-amber-950/20"
      )}
      onClick={onMarkRead}
    >
      <span className="text-xl">
        {notificationIcons[notification.type] || "📌"}
      </span>
      <div className="flex-1">
        <p className="font-medium text-zinc-900 dark:text-white">
          {notification.title}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {notification.message}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {new Date(notification.createdAt).toLocaleDateString("tr-TR")}
        </p>
      </div>
      {!notification.isRead && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}
    </div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }

  return content;
}

