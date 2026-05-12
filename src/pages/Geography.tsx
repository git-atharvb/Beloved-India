import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { regions } from '@/data/geography';
import RegionFilter from '@/components/geography/RegionFilter';
import RegionGrid from '@/components/geography/RegionGrid';

export default function Geography() {
  const [selectedType, setSelectedType] = useState('');

  const availableTypes = useMemo(() => {
    const types = new Set(regions.map((r) => r.type));
    // Add "All Types" option and sort
    return ['All Types', ...Array.from(types).sort()];
  }, []);

  const filteredRegions = useMemo(() => {
    if (!selectedType || selectedType === 'All Types') {
      return regions;
    }
    return regions.filter((region) => region.type === selectedType);
  }, [selectedType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 sm:py-12 lg:py-16" // MainLayout already provides max-width and horizontal padding
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Geography of India
        </h1>
        <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Discover India's diverse landscapes and natural wonders.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <RegionFilter
          types={availableTypes}
          onFilter={setSelectedType}
          selectedType={selectedType}
        />
      </div>

      <RegionGrid regions={filteredRegions} />
    </motion.div>
  );
}