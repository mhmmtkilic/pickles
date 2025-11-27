import { useState } from 'react';
import { Wifi, Zap, Cigarette, TreePine, ChevronDown } from 'lucide-react';

type SortOption = 'rating' | 'newest' | 'nearest';

interface VenueFiltersProps {
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export function VenueFilters({ sortBy = 'rating', onSortChange }: VenueFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: false,
    type: false,
    amenities: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Sıralama Bölümü */}
      <div className="bg-white border border-border rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3>Sırala</h3>
          <button 
            onClick={() => onSortChange?.('rating')}
            className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all"
          >
            Temizle
          </button>
        </div>
        <div className="space-y-2.5">
          {[
            { value: 'rating' as SortOption, label: 'Puana Göre' },
            { value: 'newest' as SortOption, label: 'En Yeni' },
            { value: 'nearest' as SortOption, label: 'En Yakın' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="sort"
                checked={sortBy === option.value}
                onChange={() => onSortChange?.(option.value)}
                className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
              />
              <span className="text-sm group-hover:text-accent transition-colors select-none">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtreleme Bölümü */}
      <div className="bg-white border border-border rounded-lg p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3>Filtrele</h3>
          <button className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all">
            Temizle
          </button>
        </div>

        {/* Özel Rozetler - Always Visible, Top Position */}
        <div className="mb-5">
          <h4 className="mb-3 text-sm text-muted-foreground uppercase tracking-wide">Özel Rozetler</h4>
          <div className="space-y-3">
            {[
              { label: 'Öğrenci Dostu (Ekonomik)', emoji: '💸' },
              { label: '7/24 Açık', emoji: '🌙' },
              { label: 'Sessiz Ortam', emoji: '🤫' }
            ].map((badge) => (
              <label key={badge.label} className="flex items-center justify-between cursor-pointer group py-1 px-2 -mx-2 rounded-md hover:bg-secondary transition-colors">
                <span className="text-sm flex items-center gap-2.5">
                  <span className="text-base">{badge.emoji}</span>
                  <span className="group-hover:text-accent transition-colors select-none">{badge.label}</span>
                </span>
                <div className="relative inline-block w-10 h-5">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-accent"></div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Lokasyon - Accordion */}
        <div className="mb-5 pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('location')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Lokasyon
            </h4>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.location ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.location && (
            <div className="space-y-2.5">
              {[
                'Kampüs İçi (Selçuk Üni.)',
                'Bosna Hersek Mah.',
                'Zafer Meydanı / Alaaddin',
                'Yazır / Otogar Çevresi',
                'Meram'
              ].map((location) => (
                <label key={location} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{location}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Mekan Türü - Accordion */}
        <div className="mb-5 pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('type')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Mekan Türü
            </h4>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.type ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.type && (
            <div className="space-y-2.5">
              {[
                'Ders Çalışma Kafesi',
                'Kütüphane',
                'Restoran / Yemek',
                'Çorbacı',
                'Co-Working'
              ].map((type) => (
                <label key={type} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* İhtiyaçlar & İmkanlar - Accordion */}
        <div className="pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('amenities')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              İhtiyaçlar & İmkanlar
            </h4>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.amenities ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.amenities && (
            <div className="space-y-2.5">
              {[
                { icon: Wifi, label: 'WiFi Var' },
                { icon: Zap, label: 'Priz Masada' },
                { icon: Cigarette, label: 'Sigara Alanı' },
                { icon: TreePine, label: 'Bahçeli' }
              ].map((amenity) => (
                <label key={amenity.label} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <amenity.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{amenity.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
