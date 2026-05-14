import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Person } from '@/data/people';

interface PeopleModalProps {
 person: Person | null;
 onClose: () => void;
}

const backdropVariants = {
 hidden: { opacity: 0 },
 visible: { opacity: 1 },
};

const modalVariants = {
 hidden: { opacity: 0, y: '-100vh' },
 visible: {
 opacity: 1,
 y: '0',
 transition: { delay: 0.1, duration: 0.3, type: 'spring', damping: 25, stiffness: 500 },
 },
 exit: { opacity: 0, y: '100vh', transition: { duration: 0.2 } },
};

export default function PeopleModal({ person, onClose }: PeopleModalProps) {
 if (!person) return null;

 return (
 <AnimatePresence>
 {person && (
 <motion.div
 className="fixed inset-0 z-50 flex items-center justify-center p-4"
 variants={backdropVariants}
 initial="hidden"
 animate="visible"
 exit="hidden"
 >
 {/* Backdrop */}
 <div
 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
 onClick={onClose}
 />

 {/* Modal Content */}
 <motion.div
 className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto
 border border-neutral-200 "
 variants={modalVariants}
 >
 <button
 onClick={onClose}
 className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-600 
 hover:bg-neutral-200 :bg-neutral-700 transition-colors duration-200 z-10"
 aria-label="Close modal"
 >
 <X className="w-5 h-5" />
 </button>

 <div className={`w-full h-64 rounded-t-lg ${person.image} bg-cover bg-center`} />

 <div className="p-6">
 <h2 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
 {person.name}
 </h2>
 <p className="text-lg font-body text-primary-600 mb-2">
 {person.profession} &bull; {person.era}
 </p>
 <p className="text-neutral-700 ">{person.description}</p>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}