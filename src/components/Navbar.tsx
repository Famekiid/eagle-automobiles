'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Search,
  Heart,
  Phone,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS, CONTACT_INFO } from '@/constants/brands';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg'
            : 'bg-slate-950'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-lg font-bold">EA</span>
              </div>
              <span className="hidden sm:inline">Eagle</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Action Items */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              {/* Call Now Button - Desktop */}
              <a
                href={`tel:${CONTACT_INFO.phone[0]}`}
                className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:flex"
              >
                <Phone size={16} />
                Call Now
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 text-slate-300 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-20 z-40 h-screen w-80 border-l border-slate-800 bg-slate-950 p-6"
            >
              <div className="space-y-6">
                {/* Navigation Links */}
                <div className="space-y-3">
                  {NAVIGATION_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800" />

                {/* Auth Links */}
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>

                {/* Mobile Call Button */}
                <a
                  href={`tel:${CONTACT_INFO.phone[0]}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Padding for fixed navbar */}
      <div className="h-20" />
    </>
  );
}
