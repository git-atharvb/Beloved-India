import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { destinations } from '@/data/destinations';
import TourismSearch from '../components/tourism/TourismSearch';
import TourismFilter from '../components/tourism/TourismFilter';
import TourismCard from '@/components/tourism/TourismCard';

export default function Tourism() {
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedState, setSelectedState] = useState('');
 const [favoriteIds, setFavoriteIds] = useState<Set<number>>(() => {
 // Initialize favorites from localStorage
 if (typeof window !== 'undefined') {
 const savedFavorites = localStorage.getItem('favoriteDestinations');
 return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
 }
 return new Set();
 });

 // Persist favorites to localStorage whenever they change
 useEffect(() => {
 if (typeof window !== 'undefined') {
 localStorage.setItem('favoriteDestinations', JSON.stringify(Array.from(favoriteIds)));
 }
 }, [favoriteIds]);

 const handleToggleFavorite = (id: number) => {
 setFavoriteIds((prevFavorites) => {
 const newFavorites = new Set(prevFavorites);
 if (newFavorites.has(id)) {
 newFavorites.delete(id);
 } else {
 newFavorites.add(id);
 }
 return newFavorites;
 });
 };

 const availableStates = useMemo(() => {
 const states = new Set(destinations.map((d) => d.state));
 return Array.from(states).sort();
 }, []);

 const filteredDestinations = useMemo(() => {
 let filtered = destinations;

 if (searchTerm) {
 filtered = filtered.filter((d) =>
 d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 d.description.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }

 if (selectedState) {
 filtered = filtered.filter((d) => d.state === selectedState);
 }

 return filtered;
 }, [searchTerm, selectedState]);

 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-4 lg:pb-16" // MainLayout already provides max-width and horizontal padding
 >
 <div className="text-center mb-12">
 <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 mb-4">
 Explore India's Destinations
 </h1>
 <p className="text-lg md:text-xl font-body text-neutral-600 max-w-3xl mx-auto">
 Search and discover incredible places across India.
 </p>
 </div>

 <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
 <TourismSearch onSearch={setSearchTerm} />
 <TourismFilter states={availableStates} onFilter={setSelectedState} selectedState={selectedState} />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
 {filteredDestinations.length > 0 ? (
 filteredDestinations.map((destination, index) => (
 <TourismCard
 key={destination.id}
 destination={destination}
 index={index}
 onToggleFavorite={handleToggleFavorite}
 isFavorite={favoriteIds.has(destination.id)}
 />
 ))
 ) : (
 <div className="col-span-full text-center py-12 text-neutral-500">
 No destinations found matching your criteria.
 </div>
 )}
 </div>
 </motion.div>
 );
}