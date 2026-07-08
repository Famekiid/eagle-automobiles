'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { FEATURED_BRANDS, FOOTER_QUICK_LINKS, CONTACT_INFO } from '@/constants/brands';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-lg font-bold text-white">EA</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Eagle</h3>
                <p className="text-xs text-slate-400">Automobiles</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium luxury vehicles for discerning clientele. Experience world-class automotive excellence.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={`https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-blue-600"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-blue-600"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="rounded-lg bg-slate-800 p-2 transition-colors hover:bg-blue-600"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-base font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Brands */}
          <div>
            <h4 className="mb-4 text-base font-bold text-white">Featured Brands</h4>
            <ul className="space-y-2">
              {FEATURED_BRANDS.slice(0, 5).map((brand) => (
                <li key={brand.name}>
                  <Link
                    href={brand.href}
                    className="text-sm transition-colors hover:text-blue-400"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-base font-bold text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-sm">{CONTACT_INFO.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <div className="space-y-1 text-sm">
                  {CONTACT_INFO.phone.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block transition-colors hover:text-blue-400"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm transition-colors hover:text-blue-400"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-slate-400 md:text-left">
            © {currentYear} Eagle Automobiles. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="transition-colors hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
