import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
 icon: LucideIcon; // Lucide icon component
 title: string;
 description: string;
 path: string;
 index: number; // For staggered animation
}

const cardVariants = {
 hidden: { opacity: 0, y: 50 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.1, // Staggered animation delay
 duration: 0.5,
 ease: 'easeOut',
 },
 }),
 hover: {
 scale: 1.03,
 // Custom glow shadow using the primary color from tailwind.config.js (#FF9933)
 boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2), 0px 0px 15px rgba(255, 153, 51, 0.3)',
 transition: { duration: 0.2 },
 },
 tap: { scale: 0.98 },
};

const iconVariants = {
 hover: {
 scale: 1.1,
 rotate: 5,
 transition: { duration: 0.2 },
 },
};

export default function CategoryCard({ icon: Icon, title, description, path, index }: CategoryCardProps) {
 return (
 <motion.div
 className="card-surface overflow-hidden flex flex-col group cursor-pointer"
 variants={cardVariants}
 initial="hidden"
 animate="visible"
 whileHover="hover"
 whileTap="tap"
 custom={index}
 >
 {/* Gradient Overlay for background effect on hover */}
 <div className="absolute inset-0 bg-gradient-to-br from-primary-saffron/10 to-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

 <Link to={path} className="relative z-10 flex flex-col h-full p-6 lg:p-8">
 <motion.div
 className="mb-4 text-primary-saffron glow-on-hover"
 variants={iconVariants}
 >
 <Icon size={48} strokeWidth={1.5} />
 </motion.div>
 <h3 className="text-xl font-heading font-semibold text-primary-saffron mb-2">
 {title}
 </h3>
 <p className="text-sm font-body text-fg-secondary color-transition mt-auto">
 {description}
 </p>
 </Link>
 </motion.div>
 );
}