import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { destinations, Destination } from '@/data/destinations';
import DestinationCard from './DestinationCard';
import DestinationModal from '../shared/DestinationModal';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function FeaturedDestinations() {
  const [featured, setFeatured] = useState<Destination[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Get highly rated destinations
  const highlyRated = destinations.filter(d => d.rating >= 4.8 && d.rating <= 5.0);

  // Initialize with top 8 by rating
  useEffect(() => {
    const top8 = [...highlyRated]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    setFeatured(top8);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Add a tiny delay for animation feel
    setTimeout(() => {
      const shuffled = [...highlyRated].sort(() => 0.5 - Math.random());
      const random8 = shuffled.slice(0, 8);
      setFeatured(random8);
      setIsRefreshing(false);
    }, 400);
  };

  // Generate a unique key for the grid so framer-motion re-animates it on refresh
  const gridKey = featured.map((f) => f.id).join('-');

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-brand-cyan bg-opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-violet bg-opacity-10 blur-[150px] pointer-events-none" />

      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text-brand mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg md:text-xl font-body text-fg-secondary max-w-3xl mx-auto">
            Explore India's most iconic and breathtaking locations.
          </p>
        </motion.div>

        {/* Toolbar before Grid */}
        <div className="flex justify-end mb-4 pr-2">
          <button
            onClick={handleRefresh}
            className="p-2 md:p-2.5 rounded-full bg-white dark:bg-neutral-800 text-brand-saffron border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all active:scale-95"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-brand-cyan' : ''}`} />
          </button>
        </div>

        {/* Destinations Grid */}
        <AnimatePresence mode="wait">
          {featured.length > 0 && (
            <motion.div
              key={gridKey}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featured.map((destination, index) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination} 
                  index={index} 
                  onClick={setSelectedDestination}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/tourism">
            <motion.button
              className="px-8 py-4 rounded-xl shiny-button font-semibold text-lg"
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
            </motion.button>
          </Link>
        </div>
      </div>

      <DestinationModal 
        destination={selectedDestination} 
        isOpen={!!selectedDestination} 
        onClose={() => setSelectedDestination(null)} 
      />
    </section>
  );
}