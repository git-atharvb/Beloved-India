import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface PeopleFilterProps {
 professions: string[];
 onFilter: (profession: string) => void;
 selectedProfession: string;
}

export default function PeopleFilter({ professions, onFilter, selectedProfession }: PeopleFilterProps) {
 const [isOpen, setIsOpen] = useState(false);

 const handleSelect = (profession: string) => {
 onFilter(profession);
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
 bg-white text-neutral-800 
 border border-neutral-200 
 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
 transition-all duration-200"
 onClick={() => setIsOpen(!isOpen)}
 aria-haspopup="true"
 aria-expanded={isOpen}
 >
 <span>{selectedProfession === '' ? 'Filter by Profession' : selectedProfession}</span>
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
 bg-white border border-neutral-200 
 max-h-60 overflow-y-auto"
 role="menu"
 aria-orientation="vertical"
 >
 <li
 className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 :bg-neutral-700 cursor-pointer rounded-t-lg"
 onClick={() => handleSelect('')}
 role="menuitem"
 >
 All Professions
 </li>
 {professions.map((profession) => (
 <li
 key={profession}
 className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 :bg-neutral-700 cursor-pointer"
 onClick={() => handleSelect(profession)}
 role="menuitem"
 >
 {profession}
 </li>
 ))}
 </motion.ul>
 )}
 </AnimatePresence>
 </motion.div>
 );
}