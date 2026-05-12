import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { exploreThemes } from '@/data/explore';
import ExploreCategory from '@/components/explore/ExploreCategory';
import IndiaMap from '@/components/map/IndiaMap';
import ExploreGrid from '@/components/explore/ExploreGrid';

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const availableCategories = useMemo(() => {
    const categories = new Set(exploreThemes.map((theme) => theme.category));
    return Array.from(categories).sort();
  }, []);

  const filteredThemes = useMemo(() => {
    if (!selectedCategory) {
      return exploreThemes;
    }
    return exploreThemes.filter((theme) => theme.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 sm:py-12 lg:py-16" // MainLayout already provides max-width and horizontal padding
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Explore Incredible India
        </h1>
        <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Discover journeys tailored to every traveler.
        </p>
      </div>

      <div className="mb-12">
        <ExploreCategory
          categories={availableCategories}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* New Section for India Map */}
      <div className="text-center mt-20 mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-4">
          Explore India by State
        </h2>
        <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Click on a state to learn more about its unique offerings.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreGrid themes={filteredThemes} />
        <IndiaMap />
      </div>
    </motion.div>
  );
}