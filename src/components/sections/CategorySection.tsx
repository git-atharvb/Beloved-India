import { useState } from 'react';
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
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    className: 'col-span-1 md:col-span-2 row-span-2 min-h-[300px] md:min-h-[400px]',
  },
  {
    title: 'Culture',
    description: 'Experience traditions, festivals, and heritage.',
    icon: BookOpenText,
    path: '/culture',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Murugashankari_Leo.jpg',
    className: 'col-span-1 md:col-span-1 row-span-1 min-h-[200px]',
  },
  {
    title: 'Food',
    description: 'Taste the rich diversity of Indian cuisine.',
    icon: Utensils,
    path: '/food',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/960px-%22Hyderabadi_Dum_Biryani%22.jpg',
    className: 'col-span-1 md:col-span-1 row-span-1 min-h-[200px]',
  },
  {
    title: 'Heritage',
    description: "Discover India's timeless monuments.",
    icon: Landmark,
    path: '/heritage',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    className: 'col-span-1 md:col-span-2 row-span-1 min-h-[200px]',
  },
  {
    title: 'Geography',
    description: "Learn about India's landscapes and regions.",
    icon: Globe,
    path: '/geography',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    className: 'col-span-1 md:col-span-1 row-span-2 min-h-[300px] md:min-h-[400px]',
  },
  {
    title: 'Explore',
    description: 'Find hidden gems across India.',
    icon: Compass,
    path: '/explore',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    className: 'col-span-1 md:col-span-1 row-span-1 min-h-[200px]',
  },
  {
    title: 'People',
    description: 'Discover the great personalities who shaped India.',
    icon: Users,
    path: '/people',
    image: 'https://i.pinimg.com/1200x/ae/85/99/ae8599dd12f8034343fd3043c76837ec.jpg',
    className: 'col-span-1 md:col-span-2 row-span-1 min-h-[200px]',
  },
  {
    title: 'Wildlife',
    description: "Discover India's wildlife sanctuaries.",
    icon: PawPrint,
    path: '/wildlife',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Elephas_maximus_%28Bandipur%29.jpg/960px-Elephas_maximus_%28Bandipur%29.jpg',
    className: '',
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
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default to first item expanded on desktop

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

        {/* Accordion Container */}
        <motion.div
          className="flex flex-col md:flex-row w-full h-[600px] md:h-[500px] gap-2 md:gap-4 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              path={category.path}
              image={category.image}
              index={index}
              isActive={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          ))}
        </motion.div>
 </div>
 </section>
 );
}