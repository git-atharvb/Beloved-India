import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Compass, BookOpenText, Utensils, Landmark } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex flex-col justify-start bg-background">
      {/* Dynamic Performant Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 dark:bg-cyan-400/20 blur-[120px] pointer-events-none transform translate-z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/10 dark:bg-pink-400/10 blur-[150px] pointer-events-none transform translate-z-0" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-violet-600/10 dark:bg-violet-400/10 blur-[100px] pointer-events-none transform translate-z-0" />

      {/* Fade out bottom to blend with next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div className="relative z-10 container-width pt-6 pb-20 lg:pt-8 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          
          {/* Text Content */}
          <motion.div className="space-y-8" initial="hidden" animate="visible" variants={textVariants}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-600/10 dark:bg-cyan-400/10 border border-cyan-600/20 dark:border-cyan-400/20 text-sm font-medium text-brand-cyan backdrop-blur-md">
              Discover India's timeless heritage and vibrant culture
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-heading font-extrabold tracking-tighter text-foreground leading-[1.1]">
                Discover the <span className="gradient-text-brand">Soul of India</span> with immersive travel stories.
              </h1>
              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-fg-secondary">
                Explore unforgettable cultural journeys, stunning landscapes, and modern travel experiences designed to inspire every explorer.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-4">
              <Link to="/explore" className="inline-flex w-full items-center justify-center rounded-xl shiny-button px-8 py-4 text-base sm:w-auto">
                Start Exploring
              </Link>
              <Link to="/tourism" className="inline-flex w-full items-center justify-center rounded-xl bg-surface border border-border hover:bg-hover px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 sm:w-auto shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Plan Your Adventure
              </Link>
            </div>
          </motion.div>

          {/* Image Slider */}
          <motion.div 
            className="hidden lg:block relative" 
            initial={{ opacity: 0, x: 40 }} 
            animate={{ opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-premium-md border border-white/20 dark:border-white/10 group h-[500px]">
              <AnimatePresence mode="wait">
                {images.length > 0 && (
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Incredible India ${currentImageIndex}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 1.2, ease: 'easeInOut' },
                      scale: { duration: 6, ease: 'linear' }
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-80 transition-opacity duration-500 z-10" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 group-hover-dim">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.title} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
              className="h-full group-hover-target"
            >
              <GlassCard interactive className="p-6 h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink bg-opacity-10 text-brand-pink mb-6">
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-fg-secondary">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="absolute inset-x-0 bottom-8 flex justify-center z-20 pointer-events-none" 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white/80 dark:bg-[#0f0f0f]/80 text-foreground shadow-premium-sm backdrop-blur-md pointer-events-auto cursor-pointer hover:bg-hover transition-colors">
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  );
}
