'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FEATURED_BRANDS } from '@/constants/brands';

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

export default function FeaturedBrands() {
  return (
    <section className="border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
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
            Featured Brands
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Discover premium automobiles from the world's most prestigious brands
          </p>
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {FEATURED_BRANDS.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Link
                href={brand.href}
                className="flex h-32 items-center justify-center rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-4 transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-slate-950"
              >
                <span className="text-center text-lg font-bold text-slate-200 transition-colors group-hover:text-blue-400">
                  {brand.name}
                </span>
              </Link>
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
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
          >
            View All Brands
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
