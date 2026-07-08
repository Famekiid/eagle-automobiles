'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { FEATURED_VEHICLES } from '@/constants/home';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedVehicles() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Featured Vehicles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Handpicked luxury vehicles curated for discerning customers
          </p>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURED_VEHICLES.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 transition-all duration-300 hover:border-blue-500/50"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-800">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Badge */}
                {vehicle.badge && (
                  <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    {vehicle.badge}
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(vehicle.id)}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-md transition-all hover:bg-white/20"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      wishlist.includes(vehicle.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="mb-2 text-sm font-semibold text-blue-400">
                  {vehicle.brand}
                </p>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {vehicle.name}
                </h3>

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
                  <span className="text-xs text-slate-400">
                    ({vehicle.reviews})
                  </span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">
                    ${vehicle.price.toLocaleString()}
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
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50"
          >
            Browse All Vehicles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
