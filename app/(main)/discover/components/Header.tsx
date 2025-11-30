import { Trophy, Gem, Search, Bell, ChevronDown, Coins, Sparkles, Bot } from 'lucide-react';

type FilterType = 'newest' | 'trends' | 'followings';

interface HeaderProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onProfileClick?: () => void;
}

const categories: { label: string; value: FilterType }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Trends', value: 'trends' },
  { label: 'Followings', value: 'followings' },
];

export function Header({ activeFilter, onFilterChange, onProfileClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-[20px] py-[0px] gap-5 max-w-[1800px] mx-auto">

        {/* Left: Search Bar + AI Button */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="flex-1 min-w-0 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ders notu, mekan veya yurt ara..."
              className="w-full h-[42px] pl-10 pr-4 bg-[#F3F4F6] rounded-lg border border-transparent focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          
          {/* AI Sor Button */}
          <button className="flex items-center gap-2 h-[42px] px-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI'a Sor</span>
          </button>
        </div>
        
        {/* Center-Right: Gamification Widget */}
        <div className="flex items-center gap-4 w-80 shrink-0 justify-end">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          
          {/* Divider */}
          <div className="w-px h-8 bg-border"></div>
          
          {/* Level Progress */}
          <div>
            <div className="flex items-center gap-3 mb-1 justify-end">
              <span className="text-xs text-muted-foreground">125/250 XP</span>
              <span className="text-sm font-medium">Seyyah</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: '50%' }}></div>
            </div>
          </div>
          
          {/* User Profile */}
          <button 
            onClick={onProfileClick}
            className="p-1 rounded-lg hover:bg-secondary transition-colors"
          >
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