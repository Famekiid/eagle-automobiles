'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 2)
  );
  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-700 p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-500/10"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Left Ellipsis */}
      {showLeftEllipsis && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-lg px-3 py-2 text-white transition-all hover:bg-slate-800"
          >
            1
          </button>
          <span className="text-slate-400">...</span>
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 transition-all ${
            currentPage === page
              ? 'bg-blue-600 font-semibold text-white'
              : 'text-white hover:bg-slate-800'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Right Ellipsis */}
      {showRightEllipsis && (
        <>
          <span className="text-slate-400">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="rounded-lg px-3 py-2 text-white transition-all hover:bg-slate-800"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-700 p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:bg-blue-500/10"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
