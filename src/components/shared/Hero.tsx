import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Placeholder background gradients as images are not provided.
// In a real scenario, these would be image URLs.
const backgroundImages = [
  'bg-gradient-to-r from-blue-500 to-indigo-600',
  'bg-gradient-to-r from-green-500 to-teal-600',
  'bg-gradient-to-r from-purple-500 to-pink-600',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const scrollIndicatorVariants: Variants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className={`absolute inset-0 w-full h-full bg-cover bg-center ${backgroundImages[currentImageIndex]}`}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Discover the <span className="text-primary-400">Soul of India</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-body mb-10 max-w-2xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Explore culture, heritage, landscapes, and traditions across incredible India.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, staggerChildren: 0.2, ease: 'easeOut' }}
        >
          <Link to="/explore">
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore India
            </motion.button>
          </Link>
          <Link to="/tourism">
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Start Journey
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        variants={scrollIndicatorVariants}
        initial="animate"
        animate="animate"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}