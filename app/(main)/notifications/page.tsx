"use client";

const notifications = [
  { id: 1, type: "like", message: "Ayşe Yılmaz gönderinizi beğendi", time: "2 dk önce" },
  { id: 2, type: "comment", message: "Mehmet Kaya gönderinize yorum yaptı", time: "15 dk önce" },
  { id: 3, type: "follow", message: "Zeynep Demir sizi takip etmeye başladı", time: "1 saat önce" },
  { id: 4, type: "coin", message: "50 GençCoin kazandınız!", time: "2 saat önce" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bildirimler</h1>
      <div className="bg-white rounded-lg shadow divide-y">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 hover:bg-gray-50">
            <p className="font-medium">{notification.message}</p>
            <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
