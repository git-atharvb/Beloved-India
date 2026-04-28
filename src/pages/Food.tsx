import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { foods } from '@/data/foods';
import type { Food } from '@/data/foods';
import FoodFilter from '@/components/food/FoodFilter';
import FoodGrid from '@/components/food/FoodGrid';
import FoodModal from '@/components/food/FoodModal';

export default function Food() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const availableRegions = useMemo(() => {
    const regions = new Set(foods.map((f) => f.region));
    return Array.from(regions).sort();
  }, []);

  const filteredFoods = useMemo(() => {
    if (!selectedRegion) {
      return foods;
    }
    return foods.filter((food) => food.region === selectedRegion);
  }, [selectedRegion]);

  const handleCardClick = (food: Food) => {
    setSelectedFood(food);
  };

  const handleCloseModal = () => {
    setSelectedFood(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 sm:py-12 lg:py-16" // MainLayout already provides max-width and horizontal padding
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-4">
            Taste the Flavors of India
          </h1>
          <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Discover India's rich and diverse culinary heritage.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <FoodFilter
            regions={availableRegions}
            onFilter={setSelectedRegion}
            selectedRegion={selectedRegion}
          />
        </div>

        <FoodGrid foods={filteredFoods} onCardClick={handleCardClick} />
      </motion.div>

      <FoodModal food={selectedFood} onClose={handleCloseModal} />
    </>
  );
}