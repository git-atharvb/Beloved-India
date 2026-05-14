import { motion } from 'framer-motion';
import {
 Map, // Tourism
 BookOpenText, // Culture
 Utensils, // Food
 Landmark, // Heritage
 Globe, // Geography
 Compass, // Explore
 Users, // People
 PawPrint, // Wildlife (already there, just ensuring it's used)
} from 'lucide-react';
import CategoryCard from './CategoryCard';

const categories = [
 {
 title: 'Tourism',
 description: "Explore India's most breathtaking destinations.",
 icon: Map,
 path: '/tourism',
 },
 {
 title: 'Culture',
 description: 'Experience traditions, festivals, and heritage.',
 icon: BookOpenText,
 path: '/culture',
 },
 {
 title: 'Food',
 description: 'Taste the rich diversity of Indian cuisine.',
 icon: Utensils,
 path: '/food',
 },
 {
 title: 'Heritage',
 description: "Discover India's timeless monuments.",
 icon: Landmark,
 path: '/heritage',
 },
 {
 title: 'Geography',
 description: "Learn about India's landscapes and regions.",
 icon: Globe,
 path: '/geography',
 },
 {
 title: 'Explore',
 description: 'Find hidden gems across India.',
 icon: Compass,
 path: '/explore',
 },
 {
 title: 'People',
 description: 'Discover the great personalities who shaped India.',
 icon: Users,
 path: '/people',
 },
 {
 title: 'Wildlife',
 description: "Discover India's wildlife sanctuaries.",
 icon: PawPrint,
 path: '/wildlife',
 },
];

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.1, // Stagger children animations
 },
 },
};

export default function CategorySection() {
 return (
 <section className="section-padding bg-background relative overflow-hidden">
 <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-brand-pink bg-opacity-10 blur-[120px] pointer-events-none" />
 <div className="container-width relative z-10">
 {/* Section Header */}
 <motion.div
 className="text-center mb-12"
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease: 'easeOut' }}
 >
 <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-brand mb-4">
 Explore Incredible India
 </h2>
 <p className="text-lg md:text-xl font-body text-fg-secondary max-w-2xl mx-auto">
 Choose a category to begin your journey.
 </p>
 </motion.div>

 {/* Categories Grid */}
 <motion.div
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 >
 {categories.map((category, index) => (
 <CategoryCard
 key={category.title}
 icon={category.icon}
 title={category.title}
 description={category.description}
 path={category.path}
 index={index}
 />
 ))}
 </motion.div>
 </div>
 </section>
 );
}