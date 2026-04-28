import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-secondary dark:text-white mb-6">
        Discover <span className="text-primary">Incredible India</span>
      </h1>
      <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-decorative italic max-w-3xl">
        A land of rich heritage, diverse culture, and mesmerizing landscapes waiting to be explored.
      </p>
    </motion.div>
  );
}