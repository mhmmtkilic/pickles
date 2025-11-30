import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
}

export function EventCard({ title, description, date, time, location, attendees, image, category }: EventCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-accent text-white text-xs rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Meta Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-accent" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
            <Users className="w-4 h-4 text-accent" />
            <span>{attendees} kişi katılıyor</span>
          </div>
        </div>
      </div>
    </div>
  );
}

