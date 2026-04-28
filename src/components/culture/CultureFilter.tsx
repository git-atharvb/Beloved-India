import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface CultureFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
  selectedCategory: string;
}

export default function CultureFilter({ categories, onFilter, selectedCategory }: CultureFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category: string) => {
    onFilter(category);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.95 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative w-full max-w-xs mx-auto"
    >
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 rounded-full shadow-md
                   bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100
                   border border-neutral-200 dark:border-neutral-700
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{selectedCategory === '' ? 'Filter by Category' : selectedCategory}</span>
        <ChevronDown className={clsx('w-5 h-5 transition-transform duration-200', { 'rotate-180': isOpen })} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-20 w-full mt-2 rounded-lg shadow-lg
                       bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
                       max-h-60 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
          >
            <li
              className="px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer rounded-t-lg"
              onClick={() => handleSelect('')}
              role="menuitem"
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                onClick={() => handleSelect(category)}
                role="menuitem"
              >
                {category}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}