"use client";

const leaderboardData = [
  { rank: 1, name: "Ayşe Demir", points: 15480, badge: "Konya Bilgesi" },
  { rank: 2, name: "Mehmet Yılmaz", points: 12850, badge: "Kampüs Kahramanı" },
  { rank: 3, name: "Zeynep Kara", points: 11200, badge: "Aktif Yıldız" },
  { rank: 4, name: "Ali Öztürk", points: 9800, badge: "Seyyah" },
  { rank: 5, name: "Fatma Şahin", points: 8500, badge: "Keşifçi" },
];

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liderlik Tablosu</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Sıra</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Kullanıcı</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rozet</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Puan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboardData.map((user) => (
              <tr key={user.rank} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className={`font-bold ${user.rank <= 3 ? 'text-yellow-500' : 'text-gray-500'}`}>
                    #{user.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {user.badge}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-purple-600">
                  {user.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

