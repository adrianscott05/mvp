import { useParams, useNavigate } from 'react-router-dom';
import { mockProperties } from '@/data/mockProperties';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Ruler, Home, Bath, Calendar, ArrowLeft } from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.propertyId === id);

  if (!property) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl animate-fade-in">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {property.type.toUpperCase()}
            </div>
          </div>
        </div>

        <Card className="p-8 bg-gradient-card border-border/50 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Price</p>
            <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${property.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Ruler className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-semibold">{property.size.toLocaleString()} sqft</p>
              </div>
            </div>

            {property.bedrooms && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
              </div>
            )}

            {property.bathrooms && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Bath className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
              </div>
            )}

            {property.yearBuilt && (
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-semibold">{property.yearBuilt}</p>
                </div>
              </div>
            )}
          </div>

          {property.description && (
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-foreground">{property.description}</p>
            </div>
          )}

          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Listed Date</p>
            <p className="font-semibold">
              {new Date(property.listedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg">
            Make an Offer
          </Button>
        </Card>
      </div>
    </div>
  );
}
