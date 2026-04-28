import { motion } from 'framer-motion';
import { Food } from '@/data/foods';
import FoodCard from './FoodCard';

interface FoodGridProps {
  foods: Food[];
  onCardClick: (food: Food) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Staggered animation for cards
    },
  },
};

export default function FoodGrid({ foods, onCardClick }: FoodGridProps) {
  if (foods.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 text-neutral-600 dark:text-neutral-300 text-xl font-body col-span-full"
      >
        <p>No dishes found matching your criteria.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {foods.map((food, index) => (
        <FoodCard key={food.id} food={food} index={index} onClick={onCardClick} />
      ))}
    </motion.div>
  );
}