'use client';

import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/Slider';
import { FINANCE_OPTIONS } from '@/constants/vehicleDetails';
import { useState, useMemo } from 'react';

interface FinanceCalculatorProps {
  price: number;
}

export default function FinanceCalculator({ price }: FinanceCalculatorProps) {
  const [tenure, setTenure] = useState(36);
  const [downPayment, setDownPayment] = useState(Math.floor(price * 0.2)); // 20% down

  const selectedOption = FINANCE_OPTIONS.find((opt) => opt.months === tenure);
  const rate = selectedOption?.rate || 8.5;

  const calculateMonthlyPayment = useMemo(() => {
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = tenure;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return monthlyPayment;
  }, [price, downPayment, tenure, rate]);

  const totalPayment = calculateMonthlyPayment * tenure;
  const totalInterest = totalPayment - (price - downPayment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-900 p-8"
    >
      <div>
        <h3 className="mb-6 text-2xl font-bold text-white">
          Flexible Finance Calculator
        </h3>

        {/* Down Payment Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-300">
              Down Payment
            </label>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">
                ₦{downPayment.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400">
                ({((downPayment / price) * 100).toFixed(1)}% of price)
              </p>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={price}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="h-2 w-full rounded-lg bg-slate-700 accent-blue-600"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>₦{Math.max(0, downPayment - 1000000).toLocaleString()}</span>
            <span>₦{Math.min(price, downPayment + 1000000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tenure Selection */}
      <div>
        <label className="mb-4 block text-sm font-semibold text-slate-300">
          Loan Tenure
        </label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {FINANCE_OPTIONS.map((option) => (
            <button
              key={option.months}
              onClick={() => setTenure(option.months)}
              className={`rounded-lg px-3 py-2 font-semibold transition-all ${
                tenure === option.months
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-700 text-slate-300 hover:border-blue-500'
              }`}
            >
              {option.months}m
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Interest Rate: {rate}% p.a.
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3 border-t border-slate-700 pt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <span className="text-slate-300">Loan Amount:</span>
          <span className="font-semibold text-slate-100">
            ₦{(price - downPayment).toLocaleString()}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-between"
        >
          <span className="text-slate-300">Total Interest:</span>
          <span className="font-semibold text-slate-100">
            ₦{Math.round(totalInterest).toLocaleString()}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between border-t border-slate-700 pt-3"
        >
          <span className="text-slate-300">Total Amount to Pay:</span>
          <span className="font-semibold text-slate-100">
            ₦{Math.round(totalPayment).toLocaleString()}
          </span>
        </motion.div>
      </div>

      {/* Monthly Payment Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center"
      >
        <p className="mb-2 text-sm font-semibold text-blue-100">
          Monthly Payment
        </p>
        <p className="text-4xl font-bold text-white">
          ₦{Math.round(calculateMonthlyPayment).toLocaleString()}
        </p>
        <p className="mt-2 text-xs text-blue-100">
          for {tenure} months
        </p>
      </motion.div>

      {/* CTA */}
      <button className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 font-semibold text-white transition-all hover:border-blue-500 hover:bg-blue-500/10">
        Apply for Finance
      </button>
    </motion.div>
  );
}
