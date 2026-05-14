import { motion } from 'framer-motion';
import Timeline from '@/components/heritage/Timeline';

export default function Heritage() {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-4 lg:pb-16" // MainLayout already provides max-width and horizontal padding
 >
 <div className="text-center mb-12">
 <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 mb-4">
 India's Glorious Heritage
 </h1>
 <p className="text-lg md:text-xl font-body text-neutral-600 max-w-3xl mx-auto">
 Journey through centuries of architectural brilliance and timeless stories.
 </p>
 </div>

 <Timeline />
 </motion.div>
 );
}