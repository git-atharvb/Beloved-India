import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface WildlifeFilterProps {
 types: string[];
 onFilter: (type: string) => void;
 selectedType: string;
}

export default function WildlifeFilter({ types, onFilter, selectedType }: WildlifeFilterProps) {
 const [isOpen, setIsOpen] = useState(false);

 const handleSelect = (type: string) => {
 onFilter(type);
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
 bg-surface text-primary 
 border border-neutral-200 
 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
 transition-all duration-200"
 onClick={() => setIsOpen(!isOpen)}
 aria-haspopup="true"
 aria-expanded={isOpen}
 >
 <span>{selectedType === '' ? 'Filter by Type' : selectedType}</span>
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
 bg-surface border border-neutral-200 
 max-h-60 overflow-y-auto"
 role="menu"
 aria-orientation="vertical"
 >
 <li
 className="px-4 py-2 text-secondary hover:bg-surface :bg-neutral-700 cursor-pointer rounded-t-lg"
 onClick={() => handleSelect('')}
 role="menuitem"
 >
 All Types
 </li>
 {types.map((type) => (
 <li
 key={type}
 className="px-4 py-2 text-secondary hover:bg-surface :bg-neutral-700 cursor-pointer"
 onClick={() => handleSelect(type)}
 role="menuitem"
 >
 {type}
 </li>
 ))}
 </motion.ul>
 )}
 </AnimatePresence>
 </motion.div>
 );
}