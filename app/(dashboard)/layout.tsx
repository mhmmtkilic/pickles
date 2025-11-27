export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg">Dashboard</span>
          <div className="flex gap-4">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Ana Sayfa</a>
            <a href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">Ayarlar</a>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
