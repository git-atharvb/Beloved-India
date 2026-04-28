import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import belovedIndiaLogo from '@/assets/images/beloved_india_logo.png';

// A collection of engaging texts to display during loading
const loadingTexts = [
  'Discovering the soul of a nation...',
  'Did you know? The game of Chess was invented in India.',
  'Unveiling centuries of heritage...',
  'Did you know? India has the largest postal network in the world.',
  'Preparing your journey...',
  '"A nation\'s culture resides in the hearts and in the soul of its people." - Mahatma Gandhi',
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycle through the loading texts every 2.5 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-950"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <motion.img
        src={belovedIndiaLogo}
        alt="Beloved India Logo"
        className="h-60 w-auto mb-8" // Further enlarged the logo
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }}
      />
      <motion.h2
        className="text-5xl md:text-7xl font-heading font-bold mb-8 text-center px-4 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text"
        style={{ backgroundSize: '250% 250%' }} // Increased background size for more movement
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{
          y: { delay: 0.6, duration: 0.7, ease: 'easeOut' },
          opacity: { delay: 0.6, duration: 0.7, ease: 'easeOut' },
          scale: { delay: 0.6, duration: 0.7, ease: 'easeOut' },
          backgroundPosition: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        Beloved India - Our Pride Nation
      </motion.h2>
      {/* Container to prevent layout shift and animate text changes */}
      <div className="h-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-lg font-body text-neutral-600 dark:text-neutral-300 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.5 } }}
          >
            {loadingTexts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}