import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { PropertyPagination } from '@/components/properties/PropertyPagination';
import { fetchProperties } from '@/utils/propertyApi';
import { Property, PropertyFilters as Filters, PaginationMetadata } from '@/types/property';
import { Loader2 } from 'lucide-react';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [metadata, setMetadata] = useState<PaginationMetadata>({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 9,
  });
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties(metadata.currentPage);
  }, [filters]);

  const loadProperties = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchProperties(page, 9, filters);
      setProperties(response.properties);
      setMetadata(response.metadata);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    loadProperties(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Properties</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of investment properties
        </p>
      </div>

      <PropertyFilters filters={filters} onFiltersChange={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {properties.map((property, index) => (
              <PropertyCard key={property.propertyId} property={property} index={index} />
            ))}
          </div>

          <PropertyPagination metadata={metadata} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No properties found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
