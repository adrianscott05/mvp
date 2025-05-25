import { Property, PropertyFilters, PaginationMetadata } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';

interface PropertyResponse {
  properties: Property[];
  metadata: PaginationMetadata;
}

export const fetchProperties = async (
  page: number = 1,
  itemsPerPage: number = 6,
  filters: PropertyFilters = {}
): Promise<PropertyResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredProperties = [...mockProperties];

  // Apply type filter
  if (filters.type && filters.type !== 'all') {
    filteredProperties = filteredProperties.filter(p => p.type === filters.type);
  }

  // Apply price range filter
  if (filters.minPrice !== undefined) {
    filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredProperties.sort((a, b) => {
      const aValue = filters.sortBy === 'price' ? a.price : new Date(a.listedDate).getTime();
      const bValue = filters.sortBy === 'price' ? b.price : new Date(b.listedDate).getTime();
      
      return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
  }

  // Calculate pagination
  const total = filteredProperties.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  return {
    properties: paginatedProperties,
    metadata: {
      total,
      totalPages,
      currentPage: page,
      itemsPerPage,
    },
  };
};
