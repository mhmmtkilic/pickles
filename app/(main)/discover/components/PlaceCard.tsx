import { MapPin, Star } from 'lucide-react';

interface PlaceCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  rating?: number;
  category: 'historic' | 'tourist';
}

export function PlaceCard({ name, description, image, rating, category }: PlaceCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="mb-2 group-hover:text-accent transition-colors">{name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

