'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const FINANCE_PLANS = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for entry-level luxury',
    monthlyPayment: 'From ₦25,000',
    features: ['Flexible tenure', 'Fast approval', '5% down payment'],
    popular: false,
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Most popular choice',
    monthlyPayment: 'From ₦45,000',
    features: ['Flexible tenure', 'Insurance included', 'Warranty coverage'],
    popular: true,
  },
  {
    id: '3',
    name: 'Elite',
    description: 'For the discerning buyer',
    monthlyPayment: 'From ₦65,000',
    features: [
      'Lifetime support',
      'Premium warranty',
      'Concierge service',
    ],
    popular: false,
  },
];

export default function FinanceSection() {
  const [selectedPlan, setSelectedPlan] = useState('2');

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
            Flexible Financing Options
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Choose a financing plan that suits your lifestyle and budget
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {FINANCE_PLANS.map((plan) => (
            <motion.button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden rounded-xl border p-8 text-left transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-blue-900/10 shadow-2xl shadow-blue-500/20'
                  : 'border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 hover:border-blue-500/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-gradient-to-br from-blue-600 to-blue-500 px-4 py-2 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6 pt-2">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-bold text-blue-400">
                  {plan.monthlyPayment}
                </p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/finance"
                className="mt-8 block w-full rounded-lg bg-blue-600 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Learn More
              </Link>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
