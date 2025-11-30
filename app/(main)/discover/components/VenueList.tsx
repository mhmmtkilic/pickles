import { MapPin, Star, CheckCircle, Wifi, Plug, Coffee, BookOpen, Moon, DollarSign, Zap, Heart, VolumeX, Users, Clock, Gift, type LucideIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useMemo } from 'react';
import { venues } from '@/data/mock';

interface Venue {
  id: string;
  name: string;
  verified: boolean;
  category: string;
  description: string;
  image: string;
  address: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  priceLevel: string;
}

// Fiyat seviyesi dönüşümü
const priceLevelMap: Record<string, string> = {
  uygun: '₺',
  ucretsiz: '₺',
  orta: '₺₺',
  pahali: '₺₺₺'
};

// Amenity dönüşümü
const amenityMap: Record<string, string> = {
  wifi: 'WiFi',
  priz: 'Priz',
  kahve: 'Kahve',
  sessiz: 'Sessiz',
  toplantı: 'Toplantı',
  toplanti: 'Toplantı',
  '24saat': '24 Saat',
  ücretsiz: 'Ücretsiz',
  ucretsiz: 'Ücretsiz'
};

// Kategori dönüşümü
const categoryMap: Record<string, string> = {
  kafe: 'Kafe',
  kutuphane: 'Kütüphane',
  'calisma kafesi': 'Çalışma Kafesi',
  'coworking': 'Co-working',
  restoran: 'Restoran'
};

// Venue verilerini hazırla
const prepareVenues = (): Venue[] => {
  return venues.map(venue => ({
    id: venue.id,
    name: venue.name.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    verified: venue.verified,
    category: categoryMap[venue.category] || venue.category,
    description: venue.description,
    image: venue.image,
    address: venue.address,
    rating: venue.rating,
    reviewCount: venue.reviewCount,
    amenities: venue.amenities.map((a: string) => amenityMap[a] || a).filter(Boolean) as string[],
    priceLevel: priceLevelMap[venue.priceLevel] || '₺₺'
  }));
};

const getAmenityIcon = (amenity: string): LucideIcon | null => {
  switch (amenity) {
    case 'WiFi':
      return Wifi;
    case 'Priz':
      return Plug;
    case 'Kahve':
      return Coffee;
    case 'Sessiz':
      return VolumeX;
    case 'Toplantı':
      return Users;
    case '24 Saat':
      return Clock;
    case 'Ücretsiz':
      return Gift;
    default:
      return null;
  }
};

export function VenueList({ onVenueClick, sortBy, onSortChange }: { 
  onVenueClick: (venueId: number | string) => void;
  sortBy: 'all' | 'rating' | 'newest' | 'nearest';
  onSortChange: (sort: 'all' | 'rating' | 'newest' | 'nearest') => void;
}) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Mock verileri hazırla
  const venueList = useMemo(() => prepareVenues(), []);

  const toggleFavorite = (venueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(venueId)) {
        newFavorites.delete(venueId);
      } else {
        newFavorites.add(venueId);
      }
      return newFavorites;
    });
  };

  // Sort venues based on selected filter
  const sortedVenues = useMemo(() => {
    const venuesCopy = [...venueList];
    
    switch (sortBy) {
      case 'rating':
        return venuesCopy.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return venuesCopy.reverse();
      case 'nearest':
        return venuesCopy;
      case 'all':
      default:
        return venuesCopy;
    }
  }, [venueList, sortBy]);

  return (
    <div className="flex-1 min-w-0">
      {/* Filter Tabs */}
      <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
        <button
          onClick={() => onSortChange('all')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'all'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          Tümü
        </button>
        <button
          onClick={() => onSortChange('rating')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'rating'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          En İyiler
        </button>
        <button
          onClick={() => onSortChange('nearest')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'nearest'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          En Yakınlar
        </button>
        <button
          onClick={() => onSortChange('newest')}
          className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
            sortBy === 'newest'
              ? 'bg-violet-50 text-accent'
              : 'text-text/60 hover:bg-background hover:text-text'
          }`}
        >
          En Yeni
        </button>
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-2 gap-4">
        {sortedVenues.map((venue) => (
          <button
            key={venue.id}
            onClick={() => onVenueClick(venue.id)}
            className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 hover:border-accent group text-left"
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Rating & Price Badges - Top Left */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{venue.rating}</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm">{venue.priceLevel}</span>
                </div>
              </div>
              
              {/* Favorite Button - Top Right */}
              <div 
                onClick={(e) => toggleFavorite(venue.id, e)}
                className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors cursor-pointer"
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    favorites.has(venue.id)
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-600 hover:text-red-500 hover:fill-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground mb-2">
                  {venue.category}
                </span>
                <h3 className="group-hover:text-accent transition-colors">
                  {venue.name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {venue.description}
              </p>

              {/* Amenities */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {venue.amenities.map((amenity, index) => {
                  const Icon = getAmenityIcon(amenity);
                  if (!Icon) return null;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
