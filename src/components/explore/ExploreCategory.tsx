import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ExploreCategoryProps {
 categories: string[];
 onSelectCategory: (category: string) => void;
 selectedCategory: string;
}

export default function ExploreCategory({
 categories,
 onSelectCategory,
 selectedCategory,
}: ExploreCategoryProps) {
 return (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="flex overflow-x-auto whitespace-nowrap space-x-4 py-2 px-4 sm:px-0 scrollbar-hide justify-center"
 >
 <button
 onClick={() => onSelectCategory('')}
 className={clsx(
 'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
 selectedCategory === ''
 ? 'bg-primary-500 text-white shadow-md'
 : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100 :bg-primary-900 hover:text-primary-700 :text-primary-100',
 )}
 >
 All Categories
 </button>
 {categories.map((category) => (
 <button
 key={category}
 onClick={() => onSelectCategory(category)}
 className={clsx(
 'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
 selectedCategory === category
 ? 'bg-primary-500 text-white shadow-md'
 : 'bg-neutral-100 text-neutral-700 hover:bg-primary-100 :bg-primary-900 hover:text-primary-700 :text-primary-100',
 )}
 >
 {category}
 </button>
 ))}
 </motion.div>
 );
}