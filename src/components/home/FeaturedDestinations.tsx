import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/destinations';
import DestinationCard from './DestinationCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function FeaturedDestinations() {
  return (
    <section className="section-padding vibrant-bg">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-saffron dark:text-accent-gold mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg md:text-xl font-body text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Explore India's most iconic and breathtaking locations.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/tourism">
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-saffron to-accent-gold text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 0px 16px rgba(255, 153, 51, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}