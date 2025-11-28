import { TrendingUp, MapPin, Wallet, Calendar, Trophy, ArrowRight, Coins } from 'lucide-react';

const popularBusinesses = [
  {
    id: 1,
    name: 'Cafe Nero',
    category: 'Kafe',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDc0NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '4.8',
  },
  {
    id: 2,
    name: 'Studio Space',
    category: 'Çalışma Alanı',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '4.9',
  },
  {
    id: 3,
    name: 'Urban Bistro',
    category: 'Restoran',
    image: 'https://images.unsplash.com/photo-1722739541715-1d59cde9cca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbW9kZXJufGVufDF8fHx8MTc2NDE0OTE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: '4.7',
  },
];

const trendingTags = [
  { id: 1, tag: '#teknoloji', count: '2.4k' },
  { id: 2, tag: '#kariyer', count: '1.8k' },
  { id: 3, tag: '#startup', count: '1.5k' },
  { id: 4, tag: '#eğitim', count: '1.2k' },
  { id: 5, tag: '#seyahat', count: '980' },
  { id: 6, tag: '#tasarım', count: '850' },
];

export function Sidebar() {
  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Wallet Widget */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-5 h-5 text-accent" />
          <h3>Cüzdanım</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl text-accent">2.450</span>
            <span className="text-sm text-muted-foreground">GençCoin</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Bir sonraki ödül</span>
            <span className="text-xs font-medium text-accent">%80</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1">
            <div className="h-full bg-accent rounded-full" style={{ width: '80%' }}></div>
          </div>
          <span className="text-xs text-muted-foreground">Bedava Kahve için 245 coin kaldı</span>
        </div>
      </div>

      {/* Events Widget */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            <h3>Yaklaşan Etkinlikler</h3>
          </div>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
            <span>Tümünü Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-secondary hover:bg-muted transition-colors cursor-pointer">
            <h4 className="mb-1">KBB Gençlik Festivali</h4>
            <p className="text-xs text-muted-foreground">24 Kasım • Kılıçarslan Meydanı</p>
          </div>

          <div className="p-3 rounded-lg bg-secondary hover:bg-muted transition-colors cursor-pointer">
            <h4 className="mb-1">Yaz Dönemi Staj Başvuruları</h4>
            <p className="text-xs text-muted-foreground">Son Tarih: Cuma • Kariyer</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Widget */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-accent" />
          <h3>Haftanın Liderleri</h3>
        </div>
        
        <div className="space-y-3 mb-4">
          {/* Top 1 */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/5">
            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs shrink-0">1</div>
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" 
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm truncate">Ayşe Demir</h4>
              <p className="text-xs text-muted-foreground truncate">Konya Bilgesi</p>
            </div>
            <span className="text-xs font-medium text-accent shrink-0">15.400</span>
          </div>

          {/* Top 2 */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
            <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs shrink-0">2</div>
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop" 
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm truncate">Mehmet Yılmaz</h4>
              <p className="text-xs text-muted-foreground truncate">Kampüs Kahramanı</p>
            </div>
            <span className="text-xs font-medium shrink-0">12.850</span>
          </div>

          {/* Top 3 */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
            <div className="w-6 h-6 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs shrink-0">3</div>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" 
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm truncate">Zeynep Kara</h4>
              <p className="text-xs text-muted-foreground truncate">Keşif Tutkunuu</p>
            </div>
            <span className="text-xs font-medium shrink-0">11.200</span>
          </div>
        </div>

        {/* User Ranking */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sen: <span className="text-foreground font-medium">24. Sıradasın</span></span>
            <span className="font-medium text-accent">2.450</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
