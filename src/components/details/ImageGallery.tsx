'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  vehicleName: string;
}

export default function ImageGallery({
  images,
  vehicleName,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-96 overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
        >
          <img
            src={images[selectedImage]}
            alt={vehicleName}
            className="h-full w-full object-cover"
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-md transition-all hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 backdrop-blur-md transition-all hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          {/* Lightbox Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 rounded-full bg-blue-600 p-3 transition-all hover:bg-blue-700"
            aria-label="Open lightbox"
          >
            <ZoomIn size={20} className="text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-md">
            {selectedImage + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.05 }}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? 'border-blue-500'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <img
                src={image}
                alt={`${vehicleName} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative h-full max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -right-10 -top-10 rounded-full bg-white/20 p-2 backdrop-blur-md transition-all hover:bg-white/40"
              aria-label="Close lightbox"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Lightbox Image */}
            <img
              src={images[selectedImage]}
              alt={vehicleName}
              className="h-full w-full object-contain"
            />

            {/* Navigation */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-md transition-all hover:bg-white/30"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} className="text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-md transition-all hover:bg-white/30"
              aria-label="Next image"
            >
              <ChevronRight size={28} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
