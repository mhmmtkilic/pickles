import { TrendingUp, MapPin } from 'lucide-react';
import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const upcomingEvents = [
  { id: 1, title: 'Konya Kitap Fuarı', date: '15-20 Aralık' },
  { id: 2, title: 'Mevlana Anma Törenleri', date: '17 Aralık' },
  { id: 3, title: 'Selçuklu Konseri', date: '22 Aralık' }
];

const recommendedPlaces = [
  { id: 1, name: 'Mevlana Müzesi', visitors: '2.5M/yıl' },
  { id: 2, name: 'Alaeddin Tepesi', visitors: '850K/yıl' },
  { id: 3, name: 'Tropical Kelebek Bahçesi', visitors: '620K/yıl' }
];

// Konya'da 4 rastgele konum (enlem, boylam)
const liveEvents = [
  { 
    id: 1, 
    name: 'Caz Festivali', 
    time: '20:00', 
    category: 'müzik', 
    position: { lat: 37.8746, lng: 32.4932 } // Konya merkez
  },
  { 
    id: 2, 
    name: 'Sokak Sanatları', 
    time: '19:00', 
    category: 'sanat', 
    position: { lat: 37.8650, lng: 32.4850 } // Meram bölgesi
  },
  { 
    id: 3, 
    name: 'Açık Hava Sineması', 
    time: '21:30', 
    category: 'kültür', 
    position: { lat: 37.8840, lng: 32.5010 } // Selçuklu bölgesi
  },
  { 
    id: 4, 
    name: 'Yoga Seansı', 
    time: '18:00', 
    category: 'spor', 
    position: { lat: 37.8600, lng: 32.5100 } // Karatay bölgesi
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '192px'
};

const center = {
  lat: 37.8746,
  lng: 32.4932
};

interface CulturalSidebarProps {
  onNavigateToLiveEvents: () => void;
}

export function CulturalSidebar({ onNavigateToLiveEvents }: CulturalSidebarProps) {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapLoaded(true);
  }, []);

  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Canlı Etkinlikler - Preview */}
      <div 
        className="bg-white border border-accent/30 rounded-lg p-5 cursor-pointer transition-all duration-300 group"
        onClick={onNavigateToLiveEvents}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            Canlı Etkinlikler
          </h3>
          <span className="text-xs px-2.5 py-1 bg-gray-100 rounded-md text-muted-foreground">4 Etkinlik</span>
        </div>
        
        {/* Google Maps - Konya Haritası */}
        <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden mb-4">
          <LoadScript 
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDummyKeyForDevelopment'}
            onLoad={() => setMapLoaded(true)}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
              options={{
                disableDefaultUI: true,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: [
                  {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                  }
                ]
              }}
            >
              {mapLoaded && typeof window !== 'undefined' && window.google && liveEvents.map((event, index) => {
                // Alternating colors: violet for even, pink for odd
                const pinColor = index % 2 === 0 ? '#7c3aed' : '#ec4899';
                
                return (
                  <Marker
                    key={event.id}
                    position={event.position}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: pinColor,
                      fillOpacity: 1,
                      strokeColor: '#ffffff',
                      strokeWeight: 2,
                    }}
                    onMouseOver={() => setHoveredEvent(event.id)}
                    onMouseOut={() => setHoveredEvent(null)}
                  />
                );
              })}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {liveEvents.map((event) => {
            const isHovered = hoveredEvent === event.id;
            const eventIndex = liveEvents.findIndex(e => e.id === event.id);
            const buttonColor = eventIndex % 2 === 0 
              ? (isHovered ? 'bg-violet-100 border-violet-300' : 'bg-gray-100 border-transparent')
              : (isHovered ? 'bg-pink-100 border-pink-300' : 'bg-gray-100 border-transparent');
            
            return (
              <div 
                key={event.id}
                className={`pb-3 border-b border-border last:border-0 last:pb-0 transition-colors`}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <h4 className="text-sm mb-1">{event.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Bugün, {event.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md text-muted-foreground border transition-all duration-200 ${buttonColor}`}>
                    {event.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Yaklaşan Etkinlikler */}
      <div className="bg-white border border-border rounded-lg p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          Yaklaşan Etkinlikler
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <h4 className="text-sm mb-1 hover:text-accent cursor-pointer transition-colors">{event.title}</h4>
              <p className="text-xs text-muted-foreground">{event.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Önerilen Mekanlar */}
      <div className="bg-white border border-border rounded-lg p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-accent" />
          Önerilen Mekanlar
        </h3>
        <div className="space-y-3">
          {recommendedPlaces.map((place) => (
            <div key={place.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <h4 className="text-sm mb-1 hover:text-accent cursor-pointer transition-colors">{place.name}</h4>
              <p className="text-xs text-muted-foreground">{place.visitors}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

