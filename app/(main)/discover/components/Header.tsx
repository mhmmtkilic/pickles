import { Trophy, Gem, Search, Bell, ChevronDown, Coins, Sparkles } from 'lucide-react';

type FilterType = 'newest' | 'trends' | 'followings';

interface HeaderProps {
  activeFilter?: FilterType;
  onFilterChange?: (filter: FilterType) => void;
}

const categories: { label: string; value: FilterType }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Trends', value: 'trends' },
  { label: 'Followings', value: 'followings' },
];

export function Header({ activeFilter = 'newest', onFilterChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-[20px] py-[0px] gap-6">

        
        {/* Left: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ders notu, mekan veya yurt ara..."
              className="w-full pl-10 pr-32 py-2.5 bg-[#F3F4F6] rounded-lg border border-transparent focus:border-accent focus:outline-none transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-accent to-purple-600 hover:from-purple-700 hover:to-accent text-white rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs">AI'a Sor</span>
            </button>
          </div>
        </div>
        
        {/* Center-Right: Gamification Widget */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Seyyah</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-[#FFD703]" />
              <span className="text-sm font-medium">2,450 GençCoin</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-border"></div>
          
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          
          {/* User Profile */}
          <button className="p-1 rounded-lg hover:bg-secondary transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}