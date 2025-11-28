export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Toplam Gönderi</h3>
        <p className="text-3xl font-bold text-purple-600">24</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-2">GençCoin</h3>
        <p className="text-3xl font-bold text-yellow-500">2,450</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Takipçi</h3>
        <p className="text-3xl font-bold text-blue-600">128</p>
      </div>
    </div>
  );
}
