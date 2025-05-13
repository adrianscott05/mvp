import { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Ruler, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-slide-up group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          {property.type.toUpperCase()}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-card-foreground mb-1 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Ruler className="h-4 w-4" />
            <span>{property.size.toLocaleString()} sqft</span>
          </div>
          {property.bedrooms && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div>
            <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${(property.price / 1000000).toFixed(2)}M
            </p>
          </div>
          <Button
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => navigate(`/property/${property.propertyId}`)}
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
