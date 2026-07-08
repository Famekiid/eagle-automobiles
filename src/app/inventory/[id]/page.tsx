'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Phone } from 'lucide-react';
import { VEHICLE_DETAILS, FINANCE_OPTIONS } from '@/constants/vehicleDetails';
import ImageGallery from '@/components/details/ImageGallery';
import Specifications from '@/components/details/Specifications';
import FinanceCalculator from '@/components/details/FinanceCalculator';
import WhatsAppEnquiry from '@/components/details/WhatsAppEnquiry';
import RelatedVehicles from '@/components/details/RelatedVehicles';
import { CONTACT_INFO } from '@/constants/brands';

interface VehicleDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VehicleDetailsPage({
  params,
}: VehicleDetailsPageProps) {
  const { id } = await params;
  const vehicle = VEHICLE_DETAILS[id as keyof typeof VEHICLE_DETAILS];

  if (!vehicle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Vehicle Not Found</h1>
          <p className="text-slate-400">The vehicle you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-semibold text-blue-400">{vehicle.brand}</p>
            <h1 className="mb-2 text-4xl font-bold text-white sm:text-5xl">
              {vehicle.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(vehicle.rating)
                        ? 'text-yellow-400'
                        : 'text-slate-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-slate-400">({vehicle.reviews} reviews)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <ClientButton />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <ImageGallery
              images={vehicle.gallery}
              vehicleName={vehicle.name}
            />
          </motion.div>

          {/* Right Column - Price & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Price Card */}
            <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-900 p-6">
              <p className="mb-2 text-sm text-slate-400">Price</p>
              <p className="mb-6 text-4xl font-bold text-white">
                ₦{vehicle.price.toLocaleString()}
              </p>

              {/* Quick Specs */}
              <div className="space-y-3 border-t border-slate-700 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Year</span>
                  <span className="font-semibold text-white">{vehicle.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transmission</span>
                  <span className="font-semibold text-white">
                    {vehicle.transmission}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Fuel Type</span>
                  <span className="font-semibold text-white">
                    {vehicle.fuelType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Color</span>
                  <span className="font-semibold text-white">{vehicle.color}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50">
                Enquire Now
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 py-3 font-semibold text-white transition-all hover:border-blue-500 hover:bg-blue-500/10">
                <Phone size={20} />
                Call Us
              </button>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-xl border border-slate-700 bg-slate-900/50 p-8"
        >
          <h2 className="mb-4 text-2xl font-bold text-white">About This Vehicle</h2>
          <p className="leading-relaxed text-slate-300">{vehicle.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Key Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vehicle.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-blue-400">✓ {feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Specifications</h2>
          <Specifications specifications={vehicle.specifications} />
        </motion.div>

        {/* Bottom Section - Finance & Contact */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Finance Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FinanceCalculator price={vehicle.price} />
          </motion.div>

          {/* WhatsApp Enquiry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <WhatsAppEnquiry
              vehicleName={vehicle.name}
              vehicleBrand={vehicle.brand}
              price={vehicle.price}
              phoneNumber={CONTACT_INFO.phone[0]}
            />
          </motion.div>
        </div>

        {/* Related Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <RelatedVehicles
            currentBrand={vehicle.brand}
            currentId={vehicle.id}
          />
        </motion.div>
      </div>
    </main>
  );
}

// Client component for interactive buttons
function ClientButton() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <button
      onClick={() => setIsWishlisted(!isWishlisted)}
      className="rounded-lg border border-slate-700 p-3 transition-all hover:border-red-500 hover:bg-red-500/10"
      aria-label="Add to wishlist"
    >
      <Heart
        size={24}
        className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
      />
    </button>
  );
}
