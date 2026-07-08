'use client';

import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { Vehicle } from '@/types/vehicles';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onWishlistToggle: (id: string) => void;
  isWishlisted: boolean;
}

export default function VehicleCard({
  vehicle,
  onWishlistToggle,
  isWishlisted,
}: VehicleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-800">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-700" />
        )}

        {/* Brand Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
          {vehicle.brand}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onWishlistToggle(vehicle.id)}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 transition-all hover:bg-white/20 backdrop-blur-md"
          aria-label="Add to wishlist"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Vehicle Name */}
        <h3 className="mb-2 text-xl font-bold text-white">{vehicle.name}</h3>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(vehicle.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">({vehicle.reviews})</span>
        </div>

        {/* Vehicle Specs */}
        <div className="mb-4 space-y-2 text-sm text-slate-400">
          <div className="flex justify-between">
            <span>{vehicle.transmission}</span>
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex justify-between">
            <span>{vehicle.year}</span>
            <span>{vehicle.color}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-slate-700" />

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-400">
            ₦{vehicle.price.toLocaleString()}
          </p>
        </div>

        <Link
          href={`/inventory/${vehicle.id}`}
          className="mt-4 block w-full rounded-lg bg-blue-600 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
