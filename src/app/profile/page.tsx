"use client";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-purple-500 to-purple-700"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-12 mb-4">
            <img
              src="https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?w=150&h=150&fit=crop"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="ml-4 mb-2">
              <h1 className="text-2xl font-bold">Ahmet Yılmaz</h1>
              <p className="text-gray-500">@ahmetyilmaz</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div>
              <p className="text-2xl font-bold">124</p>
              <p className="text-gray-500 text-sm">Gönderi</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1.2K</p>
              <p className="text-gray-500 text-sm">Takipçi</p>
            </div>
            <div>
              <p className="text-2xl font-bold">356</p>
              <p className="text-gray-500 text-sm">Takip</p>
            </div>
          </div>
          
          {/* Badge */}
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
            <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">Seyyah</span>
            <span className="text-gray-600 text-sm">2,450 GençCoin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
