import { motion } from 'framer-motion';
import { Region } from '@/data/geography';

interface RegionCardProps {
 region: Region;
 index: number; // For staggered animation
}

const cardVariants = {
 hidden: { opacity: 0, y: 50 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.08, // Staggered animation delay
 duration: 0.5,
 ease: 'easeOut',
 },
 }),
 hover: {
 y: -8, // Card lift effect
 boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
 transition: { duration: 0.2 },
 },
};

export default function RegionCard({ region, index }: RegionCardProps) {
 return (
 <motion.div
 className="card overflow-hidden flex flex-col group cursor-pointer"
 variants={cardVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.5 }}
 whileHover="hover"
 custom={index}
 >
 <div className="relative h-56 w-full overflow-hidden shrink-0">
 <div
 className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${region.image}`}
 />
 </div>
 <div className="p-6 flex-grow flex flex-col">
 <h3 className="font-heading font-semibold text-xl text-neutral-800 ">
 {region.name}
 </h3>
 <p className="text-sm text-primary-600 mb-3">{region.type}</p>
 <p className="text-sm font-body text-neutral-600 flex-grow">
 {region.description}
 </p>
 </div>
 </motion.div>
 );
}