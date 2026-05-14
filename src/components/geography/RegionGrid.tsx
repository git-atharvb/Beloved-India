import { motion } from 'framer-motion';
import { Region } from '@/data/geography';
import RegionCard from './RegionCard';

interface RegionGridProps {
 regions: Region[];
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

export default function RegionGrid({ regions }: RegionGridProps) {
 if (regions.length === 0) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center py-16 text-neutral-600 text-xl font-body col-span-full"
 >
 <p>No regions found matching your criteria.</p>
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
 {regions.map((region, index) => (
 <RegionCard key={region.id} region={region} index={index} />
 ))}
 </motion.div>
 );
}