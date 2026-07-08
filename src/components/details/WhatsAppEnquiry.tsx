'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppEnquiryProps {
  vehicleName: string;
  vehicleBrand: string;
  price: number;
  phoneNumber: string;
}

export default function WhatsAppEnquiry({
  vehicleName,
  vehicleBrand,
  price,
  phoneNumber,
}: WhatsAppEnquiryProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${vehicleBrand} ${vehicleName} (\u20a6${price.toLocaleString()}). Could you provide more details and availability? Thanks!`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-slate-900 p-8"
    >
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold text-white">
          Quick WhatsApp Enquiry
        </h3>
        <p className="text-slate-400">
          Get instant responses to your vehicle queries
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppClick}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-green-500/50"
      >
        <MessageCircle size={24} />
        Chat on WhatsApp
      </motion.button>

      {/* Info Box */}
      <div className="mt-6 space-y-2 rounded-lg bg-slate-800/50 p-4 text-sm text-slate-400">
        <p>
          💬 <strong>Message will include:</strong>
        </p>
        <ul className="space-y-1 pl-6 text-xs">
          <li>• Vehicle: {vehicleBrand} {vehicleName}</li>
          <li>• Price: ₦{price.toLocaleString()}</li>
          <li>• Request for availability & details</li>
        </ul>
      </div>
    </motion.div>
  );
}
