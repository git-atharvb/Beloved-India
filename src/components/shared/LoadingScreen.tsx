import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import belovedIndiaLogo from '@/assets/images/beloved_india_logo.png';

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
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center vibrant-bg" exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}>
      <div className="absolute inset-0 hero-overlay" />
      <motion.img src={belovedIndiaLogo} alt="Beloved India Logo" className="relative h-48 w-auto mb-8" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }} />
      <motion.h2 className="relative text-4xl md:text-5xl font-heading font-bold mb-6 text-center text-primary-saffron dark:text-accent-gold" initial={{ y: 30, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.9, ease: 'easeOut' } }}>
        Beloved India
      </motion.h2>
      <div className="relative h-10 text-center px-6">
        <AnimatePresence mode="wait">
          <motion.p key={index} className="text-base font-medium color-transition" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.45 } }} exit={{ y: -20, opacity: 0, transition: { duration: 0.45 } }}>
            {loadingTexts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
