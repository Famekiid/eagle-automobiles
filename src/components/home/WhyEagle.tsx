'use client';

import { motion } from 'framer-motion';
import { WHY_EAGLE_FEATURES } from '@/constants/home';

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

export default function WhyEagle() {
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
            Why Choose Eagle Automobiles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            We deliver excellence in every aspect of luxury vehicle ownership
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_EAGLE_FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <p className="mb-4 text-5xl">{feature.icon}</p>
              <h3 className="mb-3 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
