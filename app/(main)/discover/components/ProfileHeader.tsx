import { Settings, GraduationCap, CheckCircle2, MapPin, Calendar, Link as LinkIcon, Award, TrendingUp } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    username: string;
    displayName?: string;
    avatar: string;
    bio?: string;
    university?: string;
    department?: string;
    location?: string;
    role: string;
    level?: number;
    joinedAt?: string;
    verified?: boolean;
  };
}

// Rol isimleri
const roleNames: Record<string, string> = {
  yeni_gelen: 'Yeni Gelen',
  seyyah: 'Seyyah',
  gezgin: 'Gezgin',
  kasif_meraklisi: 'Kaşif Meraklısı',
  konya_bilgesi: 'Konya Bilgesi'
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const displayName = user.displayName || user.username;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const roleName = roleNames[user.role] || 'Yeni Gelen';
  const level = user.level || 1;

  return (
    <div className="bg-white rounded-lg border border-border hover:border-muted transition-colors">
      <div className="p-8">
        {/* Profile Section */}
        <div className="flex items-start gap-6 relative">
          {/* Role Badge - Top Right */}
          <div className="absolute top-0 right-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-lg">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent">{roleName} • Lv. {level}</span>
            </div>
          </div>

          {/* Left: Avatar */}
          <div className="relative flex-shrink-0">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={displayName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-violet-100 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-purple-600 flex items-center justify-center text-white text-3xl ring-4 ring-violet-100 shadow-lg">
                {initials}
              </div>
            )}
            {/* Verified Badge */}
            {user.verified && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 ring-4 ring-white">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Right: User Info */}
          <div className="flex-1 min-w-0 pt-1">
            {/* Name */}
            <h1 className="text-2xl mb-2">{displayName}</h1>

            {/* Username */}
            <p className="text-muted-foreground mb-4">@{user.username}</p>
            
            {/* Bio */}
            {user.bio && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm text-gray-600">
              {user.university && user.department && (
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <span>{user.university} - {user.department}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.joinedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{user.joinedAt}'ten beri</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
