'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center"
      >
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Eagle Automobiles
        </h1>
        <p className="mb-8 text-xl text-slate-300">
          Premium luxury vehicles for discerning clientele
        </p>
        <p className="mb-12 text-lg text-slate-400">
          Experience world-class automotive excellence
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/inventory"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
          >
            View Inventory
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-white transition-all hover:border-slate-400 hover:bg-slate-800 hover:text-slate-100"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
