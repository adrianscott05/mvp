export interface Property {
  propertyId: string;
  name: string;
  location: string;
  price: number;
  size: number;
  type: 'apartment' | 'house' | 'villa' | 'condo' | 'penthouse';
  listedDate: string;
  image: string;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
}

export interface PropertyFilters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'listedDate';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMetadata {
  total: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
