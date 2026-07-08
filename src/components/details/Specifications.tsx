'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Specification {
  [key: string]: {
    [key: string]: string | string[];
  };
}

interface SpecificationsProps {
  specifications: Specification;
}

const TABS = ['Engine', 'Performance', 'Dimensions', 'Interior', 'Safety'];

export default function Specifications({
  specifications,
}: SpecificationsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    engine: true,
    performance: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const currentTab = TABS[activeTab].toLowerCase();
  const currentSpecs = specifications[currentTab] || {};

  const renderSpecValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return (
        <ul className="space-y-2">
          {value.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-slate-300">{value}</p>;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-700">
        {TABS.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(index)}
            whileHover={{ y: -2 }}
            className={`whitespace-nowrap px-4 py-3 font-semibold transition-all ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {Object.entries(currentSpecs).map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(key)}
              className="flex w-full items-center justify-between"
            >
              <h4 className="text-lg font-semibold capitalize text-white">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  expandedSections[key] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Content */}
            {expandedSections[key] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3 border-t border-slate-700 pt-4"
              >
                {Array.isArray(value) ? (
                  renderSpecValue(value)
                ) : (
                  Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey} className="flex items-start justify-between">
                      <span className="capitalize text-slate-400">
                        {subKey.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-right font-semibold text-slate-200">
                        {String(subValue)}
                      </span>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
