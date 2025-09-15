import { PropertyFilters as Filters } from '@/types/property';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-card/50 rounded-lg border border-border/50">
      <div className="space-y-2">
        <Label htmlFor="type">Property Type</Label>
        <Select
          value={filters.type || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, type: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger id="type" className="bg-background">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="minPrice">Min Price</Label>
        <Input
          id="minPrice"
          type="number"
          placeholder="Min"
          className="bg-background"
          value={filters.minPrice || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              minPrice: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxPrice">Max Price</Label>
        <Input
          id="maxPrice"
          type="number"
          placeholder="Max"
          className="bg-background"
          value={filters.maxPrice || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select
          value={filters.sortBy ? `${filters.sortBy}-${filters.sortOrder}` : 'none'}
          onValueChange={(value) => {
            if (value === 'none') {
              onFiltersChange({ ...filters, sortBy: undefined, sortOrder: undefined });
            } else {
              const [sortBy, sortOrder] = value.split('-') as [
                'price' | 'listedDate',
                'asc' | 'desc'
              ];
              onFiltersChange({ ...filters, sortBy, sortOrder });
            }
          }}
        >
          <SelectTrigger id="sort" className="bg-background">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="listedDate-desc">Newest First</SelectItem>
            <SelectItem value="listedDate-asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
