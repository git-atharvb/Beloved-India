import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

import clsx from 'clsx';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  index: number;
  image?: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CategoryCard({ icon: Icon, title, description, path, index, image, isActive, onMouseEnter, onMouseLeave }: CategoryCardProps) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative overflow-hidden group cursor-pointer rounded-3xl transition-[flex] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isActive ? "flex-[4] md:flex-[5]" : "flex-[1]"
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
    >
      {/* Background Image */}
      {image ? (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Dynamic Dark Gradient Overlay */}
          <div className={clsx(
            "absolute inset-0 transition-opacity duration-500",
            isActive ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent" : "bg-black/50"
          )} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/10 to-brand-crimson/10 z-0" />
      )}

      <Link to={path} className="relative z-10 flex flex-col h-full justify-end p-4 w-full">
        {/* Expanded Content (Glass Pane) */}
        <div className={clsx(
          "flex items-end gap-4 transition-all duration-500 w-full",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}>
          <div className="bg-black/50 border border-white/20 rounded-2xl p-5 flex flex-col min-w-[240px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-brand-saffron/90 text-white shrink-0">
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-wide whitespace-nowrap">
                {title}
              </h3>
            </div>
            <p className="text-sm md:text-base font-body text-neutral-100 line-clamp-2 whitespace-normal">
              {description}
            </p>
          </div>
        </div>

        {/* Collapsed Icon */}
        <div className={clsx(
          "absolute transition-all duration-500",
          "md:bottom-6 md:left-1/2 md:-translate-x-1/2", // Centered horizontally on desktop
          "bottom-1/2 translate-y-1/2 left-6 md:translate-y-0", // Centered vertically on mobile
          isActive ? "opacity-0 scale-50" : "opacity-100 scale-100 delay-100"
        )}>
          <div className="p-3 rounded-full bg-black/50 text-white border border-white/30 whitespace-nowrap flex items-center gap-2">
            <Icon size={24} />
            {/* Show title next to icon on mobile when collapsed since it's a vertical list */}
            <span className="md:hidden font-heading font-semibold text-lg">{title}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}