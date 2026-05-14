import { motion } from 'framer-motion';
import { Destination } from '@/data/destinations';
import TourismCard from './TourismCard';

interface TourismGridProps {
 destinations: Destination[];
 onToggleFavorite: (id: number) => void;
 favoriteIds: Set<number>;
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

export default function TourismGrid({ destinations, onToggleFavorite, favoriteIds }: TourismGridProps) {
 if (destinations.length === 0) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center py-16 text-neutral-600 text-xl font-body"
 >
 <p>No destinations found matching your criteria.</p>
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
 {destinations.map((destination, index) => (
 <TourismCard
 key={destination.id}
 destination={destination}
 index={index}
 onToggleFavorite={onToggleFavorite}
 isFavorite={favoriteIds.has(destination.id)}
 />
 ))}
 </motion.div>
 );
}