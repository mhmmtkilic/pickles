import { EventCard } from './EventCard';
import { PlaceCard } from './PlaceCard';
import { Landmark, Mountain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useMemo } from 'react';
import { events, places } from '@/data/mock';

// Kategori mapping
const categoryMap: Record<string, string> = {
  kultur: 'Kültür',
  muzik: 'Müzik',
  kariyer: 'Kariyer',
  spor: 'Spor'
};

// Event verilerini hazırla
const prepareEvents = () => {
  return events.slice(0, 3).map(event => {
    const date = new Date(event.date);
    const endDate = event.endDate ? new Date(event.endDate) : null;
    const dateStr = endDate && endDate.getTime() !== date.getTime()
      ? `${date.getDate()}-${endDate.getDate()} ${date.toLocaleString('tr-TR', { month: 'long' })} ${date.getFullYear()}`
      : `${date.getDate()} ${date.toLocaleString('tr-TR', { month: 'long' })} ${date.getFullYear()}`;
    
    return {
      id: event.id,
      title: event.title.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: event.description,
      date: dateStr,
      time: event.time,
      location: event.location.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      attendees: event.attendees,
      image: event.image,
      category: categoryMap[event.category] || event.category
    };
  });
};

// Place verilerini kategoriye göre ayır
const preparePlaces = () => {
  const historicPlaces = places
    .filter(p => p.category === 'tarihi')
    .slice(0, 3)
    .map(place => ({
      id: place.id,
      name: place.name.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: place.description,
      image: place.image,
      rating: place.rating,
      category: 'historic' as const
    }));
  
  const touristPlaces = places
    .filter(p => p.category === 'turistik')
    .slice(0, 3)
    .map(place => ({
      id: place.id,
      name: place.name.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: place.description,
      image: place.image,
      rating: place.rating,
      category: 'tourist' as const
    }));
  
  return { historicPlaces, touristPlaces };
};

export function CulturalDiscovery() {
  // Mock verileri hazırla
  const upcomingEvents = useMemo(() => prepareEvents(), []);
  const { historicPlaces, touristPlaces } = useMemo(() => preparePlaces(), []);
  
  return (
    <div className="space-y-8">
      {/* Hero Section - Konya Tanıtımı */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1759930018756-1f3bebd6f2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb255YSUyMGNpdHklMjB2aWV3fGVufDF8fHx8MTc2NDMzMTY1MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Konya"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="mb-2">Konya'yı Keşfedin</h1>
            <p className="text-sm opacity-90">Tarihi ve kültürel mirasıyla bin yıllık şehir</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            Konya, Anadolu'nun en eski yerleşim merkezlerinden biri olup, Selçuklu Devleti'nin başkenti olma özelliği taşır. 
            Hz. Mevlana'nın şehri olarak bilinen Konya, zengin tarihi ve kültürel mirası ile her yıl milyonlarca ziyaretçiyi ağırlıyor. 
            Selçuklu mimarisi, müzeler, tarihi yapılar ve modern yaşamın iç içe geçtiği bu eşsiz şehirde keşfedilecek çok şey var.
          </p>
        </div>
      </div>

      {/* Yaklaşan Etkinlikler */}
      <section>
        <h2 className="mb-4 flex items-center gap-2">
          🎭 Yaklaşan Etkinlikler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>

      {/* Tarihi Yerler */}
      <section>
        <h2 className="mb-4 flex items-center gap-2">
          <Landmark className="w-6 h-6 text-accent" />
          Tarihi Yerler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historicPlaces.map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      </section>

      {/* Turistik Yerler */}
      <section>
        <h2 className="mb-4 flex items-center gap-2">
          <Mountain className="w-6 h-6 text-accent" />
          Turistik Yerler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {touristPlaces.map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      </section>
    </div>
  );
}

