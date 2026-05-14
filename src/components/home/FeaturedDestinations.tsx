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
 className="px-8 py-4 rounded-xl shiny-button font-semibold text-lg"
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