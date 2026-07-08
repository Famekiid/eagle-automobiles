'use client';

import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setEmail('');
    setLoading(false);

    // Reset message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="border-t border-slate-800 bg-gradient-to-br from-slate-950 via-blue-900/20 to-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-950 p-12 text-center backdrop-blur-md"
        >
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-500/20 p-4">
            <Mail size={32} className="text-blue-400" />
          </div>

          {/* Content */}
          <h2 className="mb-4 text-4xl font-bold text-white">
            Stay Updated
          </h2>
          <p className="mb-8 text-lg text-slate-400">
            Subscribe to our newsletter for the latest luxury vehicle launches,
            exclusive deals, and financing tips.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 rounded-lg bg-green-500/20 p-4 text-green-400"
            >
              <CheckCircle size={24} />
              <span className="font-semibold">
                Thank you! Check your email for updates.
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
