'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { FEATURED_BRANDS } from '@/constants/brands';
import { FilterOptions } from '@/types/vehicles';

const FUEL_TYPES = ['Electric', 'Hybrid', 'Petrol'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const PRICE_RANGES = [
  { label: 'Under ₦30,000', min: 0, max: 30000 },
  { label: '₦30,000 - ₦40,000', min: 30000, max: 40000 },
  { label: '₦40,000 - ₦50,000', min: 40000, max: 50000 },
  { label: 'Above ₦50,000', min: 50000, max: 100000 },
];

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  isOpen = true,
  onClose,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    brands: true,
    price: true,
    fuel: true,
    transmission: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleFuelToggle = (fuel: string) => {
    const newFuel = filters.fuelType.includes(fuel)
      ? filters.fuelType.filter((f) => f !== fuel)
      : [...filters.fuelType, fuel];
    onFilterChange({ ...filters, fuelType: newFuel });
  };

  const handleTransmissionToggle = (transmission: string) => {
    const newTransmission = filters.transmission.includes(transmission)
      ? filters.transmission.filter((t) => t !== transmission)
      : [...filters.transmission, transmission];
    onFilterChange({ ...filters, transmission: newTransmission });
  };

  const handlePriceRange = (range: { min: number; max: number }) => {
    onFilterChange({ ...filters, priceRange: [range.min, range.max] });
  };

  const handleClearFilters = () => {
    onFilterChange({
      brands: [],
      priceRange: [0, 100000],
      fuelType: [],
      transmission: [],
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.fuelType.length > 0 ||
    filters.transmission.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 100000;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && onClose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Filter Panel */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        exit={{ x: -300 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed left-0 top-20 z-40 h-screen w-80 border-r border-slate-800 bg-slate-950 p-6 md:static md:top-auto md:z-0 md:h-auto md:w-full md:border-none md:border-r md:bg-slate-950 md:p-0"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between md:hidden">
            <h3 className="text-lg font-bold text-white">Filters</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full rounded-lg border border-slate-700 py-2 text-sm font-semibold text-blue-400 transition-colors hover:border-blue-500 hover:bg-blue-500/10"
            >
              Clear All Filters
            </button>
          )}

          {/* Brand Filter */}
          <div>
            <button
              onClick={() => toggleSection('brands')}
              className="mb-4 flex w-full items-center justify-between text-left"
            >
              <h4 className="font-semibold text-white">Brand</h4>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedSections.brands ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.brands && (
              <div className="space-y-3">
                {FEATURED_BRANDS.map((brand) => (
                  <label key={brand.name} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand.name)}
                      onChange={() => handleBrandToggle(brand.name)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-blue-600"
                    />
                    <span className="text-sm text-slate-300">{brand.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="mb-4 flex w-full items-center justify-between text-left"
            >
              <h4 className="font-semibold text-white">Price Range</h4>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price && (
              <div className="space-y-3">
                {PRICE_RANGES.map((range) => (
                  <label key={range.label} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={
                        filters.priceRange[0] === range.min &&
                        filters.priceRange[1] === range.max
                      }
                      onChange={() => handlePriceRange(range)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-blue-600"
                    />
                    <span className="text-sm text-slate-300">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Fuel Type Filter */}
          <div>
            <button
              onClick={() => toggleSection('fuel')}
              className="mb-4 flex w-full items-center justify-between text-left"
            >
              <h4 className="font-semibold text-white">Fuel Type</h4>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedSections.fuel ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.fuel && (
              <div className="space-y-3">
                {FUEL_TYPES.map((fuel) => (
                  <label key={fuel} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.fuelType.includes(fuel)}
                      onChange={() => handleFuelToggle(fuel)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-blue-600"
                    />
                    <span className="text-sm text-slate-300">{fuel}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Transmission Filter */}
          <div>
            <button
              onClick={() => toggleSection('transmission')}
              className="mb-4 flex w-full items-center justify-between text-left"
            >
              <h4 className="font-semibold text-white">Transmission</h4>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedSections.transmission ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.transmission && (
              <div className="space-y-3">
                {TRANSMISSIONS.map((transmission) => (
                  <label
                    key={transmission}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={filters.transmission.includes(transmission)}
                      onChange={() => handleTransmissionToggle(transmission)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-blue-600"
                    />
                    <span className="text-sm text-slate-300">{transmission}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
