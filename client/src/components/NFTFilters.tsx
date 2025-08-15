'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Search, Filter, X } from 'lucide-react';

interface NFTFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    sortOrder: string;
  }) => void;
  initialFilters?: {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
    sortOrder: string;
  };
}

export function NFTFilters({ onFiltersChange, initialFilters }: NFTFiltersProps) {
  const [filters, setFilters] = useState({
    search: initialFilters?.search || '',
    category: initialFilters?.category || '',
    minPrice: initialFilters?.minPrice || '',
    maxPrice: initialFilters?.maxPrice || '',
    sortBy: initialFilters?.sortBy || 'createdAt',
    sortOrder: initialFilters?.sortOrder || 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Trading Cards', label: 'Trading Cards' },
    { value: 'Collectibles', label: 'Collectibles' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Other', label: 'Other' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Recently Created' },
    { value: 'price', label: 'Price' },
    { value: 'name', label: 'Name' },
  ];

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'createdAt' && value !== 'desc');

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search NFTs..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          leftIcon={<Search className="w-5 h-5 text-gray-400" />}
          className="pr-12"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Category"
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              options={categories}
            />

            <Input
              type="number"
              label="Min Price"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
            />

            <Input
              type="number"
              label="Max Price"
              placeholder="∞"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <div className="flex space-x-2">
                <Select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  options={sortOptions}
                  className="flex-1"
                />
                <Select
                  value={filters.sortOrder}
                  onChange={(e) => updateFilter('sortOrder', e.target.value)}
                  options={[
                    { value: 'asc', label: 'ASC' },
                    { value: 'desc', label: 'DESC' },
                  ]}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear Filters</span>
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}