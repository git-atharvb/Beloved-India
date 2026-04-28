import { motion } from 'framer-motion';

export default function Explore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold text-primary mb-4">Explore</h1>
      <div className="h-1 w-20 bg-accent mb-8"></div>
      <p className="text-neutral-600 dark:text-neutral-300 font-body">
        Start your personalized journey into the heart of India.
      </p>
    </motion.div>
  );
}