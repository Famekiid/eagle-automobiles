'use client';

import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      {/* Background Gradient Orbs */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-md"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Premium Luxury Vehicles
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Elevate Your Drive with
              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                World-Class Luxury Vehicles
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 sm:text-xl">
              Experience premium automobiles from the world's most prestigious brands.
              Expert financing. Seamless booking. Unmatched service.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/inventory"
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              Explore Inventory
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-8 py-4 font-semibold text-white transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Schedule Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-8 pt-8 sm:flex-row"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">500+</p>
              <p className="text-sm text-slate-400">Vehicles Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">10+</p>
              <p className="text-sm text-slate-400">Premium Brands</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">2000+</p>
              <p className="text-sm text-slate-400">Happy Customers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
