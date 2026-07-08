'use client';

import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { FilterOptions, SortOption } from '@/types/vehicles';

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
  onFilterClick?: () => void;
}

export default function SearchAndSort({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  resultsCount,
  onFilterClick,
}: SearchAndSortProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by vehicle name or brand..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </motion.div>

      {/* Sort and Filters Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          {/* Filter Button (Mobile) */}
          <button
            onClick={onFilterClick}
            className="md:hidden rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 font-semibold text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10"
          >
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-4 pr-10 font-semibold text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-400"
        >
          Showing {resultsCount} results
        </motion.p>
      </div>
    </div>
  );
}
