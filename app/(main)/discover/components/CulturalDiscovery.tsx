import { EventCard } from './EventCard';
import { PlaceCard } from './PlaceCard';
import { Landmark, Mountain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const upcomingEvents = [
  {
    id: 1,
    title: 'Konya Kitap Fuarı 2024',
    description: 'Türkiye\'nin en büyük kitap fuarlarından biri olan Konya Kitap Fuarı, yüzlerce yayınevi ve binlerce eser ile kitapseverleri bekliyor.',
    date: '15-20 Aralık 2024',
    time: '10:00 - 20:00',
    location: 'Konya Fuar Merkezi',
    attendees: 2400,
    image: 'https://images.unsplash.com/photo-1719935115623-4857df23f3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NjQzMzE2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Kültür'
  },
  {
    id: 2,
    title: 'Mevlana Anma Törenleri',
    description: 'Hz. Mevlana\'nın 750. vuslat yıldönümü anısına düzenlenen özel tören ve etkinlikler. Sema gösterileri ve konferanslar.',
    date: '17 Aralık 2024',
    time: '14:00 - 22:00',
    location: 'Mevlana Kültür Merkezi',
    attendees: 5200,
    image: 'https://images.unsplash.com/photo-1567994132067-402de7698daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGZlc3RpdmFsJTIwdHVya2V5fGVufDF8fHx8MTc2NDMzMTY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tören'
  },
  {
    id: 3,
    title: 'Selçuklu Senfonisi Konseri',
    description: 'Konya Devlet Senfoni Orkestrası\'nın Selçuklu dönemi eserlerinden oluşan özel konseri. Biletler sınırlı sayıda.',
    date: '22 Aralık 2024',
    time: '20:00',
    location: 'Konya Büyükşehir Belediyesi Tiyatro Salonu',
    attendees: 890,
    image: 'https://images.unsplash.com/photo-1744731119696-912f66494b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZXZlbnQlMjBwZW9wbGV8ZW58MXx8fHwxNzY0MzMxNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Müzik'
  }
];

const historicPlaces = [
  {
    id: 1,
    name: 'Mevlana Müzesi',
    description: 'Hz. Mevlana\'nın türbesinin bulunduğu müze, Selçuklu ve Osmanlı dönemi eserlerini barındırıyor.',
    image: 'https://images.unsplash.com/photo-1708793107667-12fc43772a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXZsYW5hJTIwbXVzZXVtJTIwa29ueWF8ZW58MXx8fHwxNzY0MjkyMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    category: 'historic' as const
  },
  {
    id: 2,
    name: 'Alaeddin Tepesi',
    description: 'Selçuklu döneminden kalma tarihi tepe ve cami. Şehrin en eski yerleşim alanlarından biri.',
    image: 'https://images.unsplash.com/photo-1723095419933-510c207824c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDMzMTY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    category: 'historic' as const
  },
  {
    id: 3,
    name: 'Karatay Medresesi',
    description: 'İnce çini işçiliğiyle ünlü Selçuklu dönemi medresesi, günümüzde çini eserleri müzesi olarak hizmet veriyor.',
    image: 'https://images.unsplash.com/photo-1719062123337-4eb7a6a6747f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwY2FzdGxlJTIwdHVya2V5fGVufDF8fHx8MTc2NDMzMTY0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    category: 'historic' as const
  }
];

const touristPlaces = [
  {
    id: 4,
    name: 'Tropical Kelebek Bahçesi',
    description: 'Binlerce kelebek türünün doğal ortamında serbestçe uçtuğu muhteşem tropik bahçe.',
    image: 'https://images.unsplash.com/photo-1761254462038-04194111f905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJmbHklMjBnYXJkZW4lMjB0cm9waWNhbHxlbnwxfHx8fDE3NjQzMzE2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    category: 'tourist' as const
  },
  {
    id: 5,
    name: 'Japon Parkı',
    description: 'Geleneksel Japon bahçe mimarisi ile tasarlanmış huzur dolu bir doğa alanı.',
    image: 'https://images.unsplash.com/photo-1653894917497-9ddb24b369c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwbGFuZHNjYXBlJTIwdHVya2V5fGVufDF8fHx8MTc2NDMzMTY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.4,
    category: 'tourist' as const
  },
  {
    id: 6,
    name: 'Konya Panorama Müzesi',
    description: 'Selçuklu dönemini canlandıran 360 derece panoramik müze deneyimi.',
    image: 'https://images.unsplash.com/photo-1759930018756-1f3bebd6f2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb255YSUyMGNpdHklMjB2aWV3fGVufDF8fHx8MTc2NDMzMTY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    category: 'tourist' as const
  }
];

export function CulturalDiscovery() {
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

