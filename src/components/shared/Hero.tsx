import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Compass, BookOpenText, Utensils, Landmark } from 'lucide-react';

// Import all images from the folder dynamically using Vite
const imageModules = import.meta.glob('@/assets/images/HomeImages/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const images = Object.values(imageModules) as string[];

const features = [
 { title: 'Ancient History', description: 'Timeless monuments and stories.', icon: Landmark },
 { title: 'Local Cuisine', description: 'Regional flavors from every state.', icon: Utensils },
 { title: 'Cultural Trails', description: 'Festivals, art, and living traditions.', icon: BookOpenText },
 { title: 'Hidden Routes', description: 'Curated travel paths beyond the ordinary.', icon: Compass },
];

const textVariants = {
 hidden: { opacity: 0, y: 40 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Hero() {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);

 useEffect(() => {
 if (images.length <= 1) return;
 const interval = setInterval(() => {
 setCurrentImageIndex((prev) => (prev + 1) % images.length);
 }, 5000); // Change image every 5 seconds
 return () => clearInterval(interval);
 }, []);

 return (
 <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] vibrant-bg flex flex-col justify-center">
 <div className="absolute inset-0 hero-overlay" />
 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent " />

 {/* Reduced top padding pt-6 and lg:pt-8 to pull everything higher */}
 <div className="relative z-10 container-width pt-6 pb-20 lg:pt-8 lg:pb-24">
 <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
 <motion.div className="space-y-8" initial="hidden" animate="visible" variants={textVariants}>
 <span className="feature-pill text-sm font-medium text-primary-saffron inline-block px-4 py-1.5 rounded-full bg-primary-saffron/10 border border-primary-saffron/20 ">
 Discover India's timeless heritage and vibrant culture
 </span>
 <div className="space-y-6">
 <h1 className="text-5xl md:text-6xl xl:text-7xl font-heading font-bold tracking-tight text-neutral-900 ">
 Discover the <span className="text-primary-saffron ">Soul of India</span> with immersive travel stories.
 </h1>
 <p className="max-w-2xl text-lg leading-8 text-neutral-600 ">
 Explore unforgettable cultural journeys, stunning landscapes, and modern travel experiences designed to inspire every explorer.
 </p>
 </div>
 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
 <Link to="/explore" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-saffron hover:bg-primary-saffron/90 px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 sm:w-auto shadow-lg shadow-primary-saffron/20">
 Start Exploring
 </Link>
 <Link to="/tourism" className="inline-flex w-full items-center justify-center rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 :bg-neutral-800 px-8 py-4 text-sm font-semibold text-neutral-900 transition-colors sm:w-auto shadow-sm">
 Plan Your Adventure
 </Link>
 </div>
 </motion.div>

 <motion.div 
 className="hidden lg:block relative" 
 initial={{ opacity: 0, x: 40 }} 
 animate={{ opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } }}
 >
 {/* Reduced height from h-[600px] to h-[450px] */}
 <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-saffron/10 border-4 border-white group h-[450px]">
 <AnimatePresence>
 {images.length > 0 && (
 <motion.img
 key={currentImageIndex}
 src={images[currentImageIndex]}
 alt={`Incredible India ${currentImageIndex}`}
 className="absolute inset-0 w-full h-full object-cover"
 initial={{ opacity: 0, scale: 1 }}
 animate={{ opacity: 1, scale: 1.05 }}
 exit={{ opacity: 0, scale: 1.05 }}
 transition={{ 
 opacity: { duration: 1.5, ease: 'easeInOut' },
 scale: { duration: 6, ease: 'linear' }
 }}
 />
 )}
 </AnimatePresence>
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />
 </div>
 
 {/* Decorative elements */}
 <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-primary-saffron/20 rounded-full blur-3xl" />
 <div className="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-primary-green/10 rounded-full blur-3xl" />
 </motion.div>
 </div>

 <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
 {features.map((feature, idx) => (
 <motion.div 
 key={feature.title} 
 className="card-surface p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-black/5 shadow-sm hover:shadow-md transition-shadow" 
 initial={{ opacity: 0, y: 20 }} 
 whileInView={{ opacity: 1, y: 0 }} 
 viewport={{ once: true, amount: 0.4 }} 
 transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.1 }}
 >
 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-saffron/10 text-primary-saffron ">
 <feature.icon size={24} />
 </div>
 <h3 className="mt-6 text-lg font-semibold text-neutral-900 ">{feature.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-neutral-600 ">{feature.description}</p>
 </motion.div>
 ))}
 </div>
 </div>

 <motion.div className="absolute inset-x-0 bottom-6 flex justify-center z-20" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}>
 <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-900 shadow-sm backdrop-blur-md cursor-pointer hover:bg-white :bg-neutral-900 transition-colors">
 <ChevronDown className="h-5 w-5" />
 </div>
 </motion.div>
 </section>
 );
}
