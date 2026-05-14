import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { Destination } from '@/data/destinations';

interface DestinationCardProps {
 destination: Destination;
 index: number;
}

const cardVariants = {
 hidden: { opacity: 0, y: 50 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.1,
 duration: 0.5,
 ease: 'easeOut',
 },
 }),
 hover: {
 y: -8, // Card lift effect
 transition: { duration: 0.2 },
 },
};

const StarRating = ({ rating }: { rating: number }) => {
 const fullStars = Math.floor(rating);
 const halfStar = rating % 1 !== 0;
 const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

 return (
 <div className="flex items-center gap-0.5 text-amber-400">
 {[...Array(fullStars)].map((_, i) => (
 <Star key={`full-${i}`} size={16} fill="currentColor" />
 ))}
 {halfStar && <StarHalf key="half" size={16} fill="currentColor" />}
 {[...Array(emptyStars)].map((_, i) => (
 <Star key={`empty-${i}`} size={16} className="text-neutral-300 " />
 ))}
 </div>
 );
};

export default function DestinationCard({ destination, index }: DestinationCardProps) {
 return (
 <motion.div
 className="card-surface overflow-hidden flex flex-col group cursor-pointer"
 variants={cardVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.5 }}
 whileHover="hover"
 custom={index}
 >
 <div className="relative h-56 w-full overflow-hidden shrink-0">
 <div
 className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${destination.image}`}
 />
 </div>
 <div className="p-6 flex-grow flex flex-col">
 <div className="flex justify-between items-start mb-3">
 <div>
 <h3 className="font-heading font-semibold text-lg text-primary-saffron ">
 {destination.name}
 </h3>
 <p className="text-sm color-transition">{destination.state}</p>
 </div>
 <div className="flex items-center gap-1">
 <StarRating rating={destination.rating} />
 <span className="text-sm font-semibold text-neutral-700 ">
 {destination.rating.toFixed(1)}
 </span>
 </div>
 </div>
 <p className="text-sm font-body color-transition flex-grow">
 {destination.description}
 </p>
 </div>
 </motion.div>
 );
}