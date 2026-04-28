import { motion } from 'framer-motion';
import {
  Map,          // Tourism
  BookOpenText, // Culture
  Utensils,     // Food
  Landmark,     // Heritage
  Globe,        // Geography
  Compass,      // Explore
  PartyPopper,  // Festivals
  PawPrint,     // Wildlife
} from 'lucide-react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    title: 'Tourism',
    description: "Explore India's most breathtaking destinations.",
    icon: Map,
    path: '/tourism',
  },
  {
    title: 'Culture',
    description: 'Experience traditions, festivals, and heritage.',
    icon: BookOpenText,
    path: '/culture',
  },
  {
    title: 'Food',
    description: 'Taste the rich diversity of Indian cuisine.',
    icon: Utensils,
    path: '/food',
  },
  {
    title: 'Heritage',
    description: "Discover India's timeless monuments.",
    icon: Landmark,
    path: '/heritage',
  },
  {
    title: 'Geography',
    description: "Learn about India's landscapes and regions.",
    icon: Globe,
    path: '/geography',
  },
  {
    title: 'Explore',
    description: 'Find hidden gems across India.',
    icon: Compass,
    path: '/explore',
  },
  {
    title: 'Festivals',
    description: 'Celebrate vibrant Indian festivals.',
    icon: PartyPopper,
    path: '/festivals', // Placeholder path
  },
  {
    title: 'Wildlife',
    description: "Discover India's wildlife sanctuaries.",
    icon: PawPrint,
    path: '/wildlife', // Placeholder path
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

export default function CategorySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 dark:text-neutral-50 mb-4">
            Explore Incredible India
          </h2>
          <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Choose a category to begin your journey.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              path={category.path}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}