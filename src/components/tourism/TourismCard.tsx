import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf, Heart } from 'lucide-react';
import { Destination } from '@/data/destinations';
import clsx from 'clsx';

interface TourismCardProps {
  destination: Destination;
  index: number; // For staggered animation
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Slightly faster stagger for grid
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
  hover: {
    y: -8, // Card lift effect
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.2 },
  },
};

const heartVariants = {
  initial: { scale: 1 },
  toggled: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.4, ease: 'easeOut' },
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

export default function TourismCard({ destination, index, onToggleFavorite, isFavorite }: TourismCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to a generic placeholder image on error
    e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-surface overflow-hidden flex flex-col group cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      whileHover="hover"
      custom={index}
    >
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        <motion.button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm text-red-500 hover:text-red-600 :text-red-400 transition-colors duration-200"
          onClick={() => onToggleFavorite(destination.id)}
          variants={heartVariants}
          animate={isFavorite ? 'toggled' : 'initial'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={clsx('w-5 h-5', { 'fill-current': isFavorite })} />
        </motion.button>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-heading font-semibold text-lg text-neutral-800 ">{destination.name}</h3>
            <p className="text-sm text-neutral-500 ">{destination.state}</p>
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={destination.rating} />
            <span className="text-sm font-semibold text-neutral-700 ">{destination.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm font-body text-neutral-600 flex-grow">{destination.description}</p>
      </div>
    </motion.div>
  );
}