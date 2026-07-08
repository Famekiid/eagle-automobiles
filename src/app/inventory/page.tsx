'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { VEHICLES_DATA } from '@/constants/vehicles';
import { FilterOptions, SortOption, Vehicle } from '@/types/vehicles';
import VehicleCard from '@/components/inventory/VehicleCard';
import FilterPanel from '@/components/inventory/FilterPanel';
import SearchAndSort from '@/components/inventory/SearchAndSort';
import Pagination from '@/components/inventory/Pagination';

const ITEMS_PER_PAGE = 8;

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: [0, 100000],
    fuelType: [],
    transmission: [],
  });

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    let result = VEHICLES_DATA;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((vehicle) =>
        filters.brands.includes(vehicle.brand)
      );
    }

    // Price filter
    result = result.filter(
      (vehicle) =>
        vehicle.price >= filters.priceRange[0] &&
        vehicle.price <= filters.priceRange[1]
    );

    // Fuel type filter
    if (filters.fuelType.length > 0) {
      result = result.filter((vehicle) =>
        filters.fuelType.includes(vehicle.fuelType)
      );
    }

    // Transmission filter
    if (filters.transmission.length > 0) {
      result = result.filter((vehicle) =>
        filters.transmission.includes(vehicle.transmission)
      );
    }

    return result;
  }, [searchQuery, filters]);

  // Sort vehicles
  const sortedVehicles = useMemo(() => {
    const sorted = [...filteredVehicles];

    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        break;
    }

    return sorted;
  }, [filteredVehicles, sortOption]);

  // Paginate vehicles
  const totalPages = Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = sortedVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Vehicle Inventory
          </h1>
          <p className="text-lg text-slate-400">
            Explore our premium collection of luxury vehicles
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden w-64 md:block">
            <div className="sticky top-24 space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="mb-8">
              <SearchAndSort
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOption={sortOption}
                onSortChange={setSortOption}
                resultsCount={sortedVehicles.length}
                onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Mobile Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Vehicles Grid */}
            {paginatedVehicles.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onWishlistToggle={toggleWishlist}
                      isWishlisted={wishlist.includes(vehicle.id)}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 py-20"
              >
                <p className="mb-4 text-2xl font-bold text-white">
                  No vehicles found
                </p>
                <p className="mb-8 text-slate-400">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      brands: [],
                      priceRange: [0, 100000],
                      fuelType: [],
                      transmission: [],
                    });
                  }}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
