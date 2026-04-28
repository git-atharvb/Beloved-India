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
      className="flex flex-col rounded-xl shadow-md bg-white dark:bg-neutral-800 overflow-hidden group cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      whileHover="hover"
      custom={index}
    >
      <div className="relative overflow-hidden h-48">
        <div
          className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${region.image}`}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-heading font-semibold text-xl text-neutral-800 dark:text-neutral-100">
          {region.name}
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">{region.type}</p>
        <p className="text-sm font-body text-neutral-600 dark:text-neutral-300 flex-grow">
          {region.description}
        </p>
      </div>
    </motion.div>
  );
}