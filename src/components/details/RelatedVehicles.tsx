'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { Vehicle } from '@/types/vehicles';
import { VEHICLES_DATA } from '@/constants/vehicles';
import { useState } from 'react';

interface RelatedVehiclesProps {
  currentBrand: string;
  currentId: string;
}

export default function RelatedVehicles({
  currentBrand,
  currentId,
}: RelatedVehiclesProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get related vehicles (same brand, excluding current)
  const relatedVehicles = VEHICLES_DATA.filter(
    (vehicle) => vehicle.brand === currentBrand && vehicle.id !== currentId
  ).slice(0, 4);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (relatedVehicles.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-white">Related Vehicles</h2>
        <p className="mt-2 text-slate-400">Other {currentBrand} vehicles you might like</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:border-blue-500/50"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-slate-800">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={() => toggleWishlist(vehicle.id)}
                className="absolute right-3 top-3 rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
              >
                <Heart
                  size={16}
                  className={`${
                    wishlist.includes(vehicle.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-white'
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-white">{vehicle.name}</h3>

              {/* Rating */}
              <div className="my-2 flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
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

              {/* Price */}
              <p className="mb-3 text-lg font-bold text-blue-400">
                ₦{vehicle.price.toLocaleString()}
              </p>

              {/* CTA */}
              <Link
                href={`/inventory/${vehicle.id}`}
                className="block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
