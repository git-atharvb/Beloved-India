import { motion } from 'framer-motion';
import { Person } from '@/data/people';

interface PeopleCardProps {
 person: Person;
 index: number; // For staggered animation
 onClick: (person: Person) => void;
}

const cardVariants = {
 hidden: { opacity: 0, y: 50 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.05,
 duration: 0.4,
 ease: 'easeOut',
 },
 }),
 hover: {
 scale: 1.03,
 boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
 transition: { duration: 0.2 },
 },
 tap: { scale: 0.98 },
};

export default function PeopleCard({ person, index, onClick }: PeopleCardProps) {
 return (
 <motion.div
 className="card-surface overflow-hidden flex flex-col group cursor-pointer"
 variants={cardVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.5 }}
 whileHover="hover"
 whileTap="tap"
 custom={index}
 onClick={() => onClick(person)}
 >
 <div className="relative h-56 w-full overflow-hidden shrink-0">
 <div
 className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${person.image}`}
 />
 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
 <span className="text-white text-lg font-semibold">View Details</span>
 </div>
 </div>
 <div className="p-6 flex-grow flex flex-col">
 <h3 className="font-heading font-semibold text-xl text-neutral-800 mb-1">
 {person.name}
 </h3>
 <p className="text-sm text-primary-600 mb-2">{person.profession}</p>
 <p className="text-sm text-neutral-500 mt-auto">{person.era}</p>
 </div>
 </motion.div>
 );
}