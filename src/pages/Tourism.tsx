import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { destinations } from '@/data/destinations';
import TourismSearch from '../components/tourism/TourismSearch';
import TourismFilter from '../components/tourism/TourismFilter';
import TourismSort from '../components/tourism/TourismSort';
import TourismCard from '@/components/tourism/TourismCard';

export default function Tourism() {
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedState, setSelectedState] = useState('');
 const [sortOrder, setSortOrder] = useState<'none' | 'rating-asc' | 'rating-desc'>('none');
 const [currentPage, setCurrentPage] = useState(1);
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
 let filtered = [...destinations];

 if (searchTerm) {
 filtered = filtered.filter((d) =>
 d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 d.description.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }

 if (selectedState) {
 filtered = filtered.filter((d) => d.state === selectedState);
 } else if (!searchTerm && sortOrder === 'none') {
 // Pseudo-random deterministic shuffle for "All States" default view
 // This spreads out the states so they aren't clumped together
 filtered.sort((a, b) => ((a.id * 97) % 720) - ((b.id * 97) % 720));
 }

 if (sortOrder === 'rating-desc') {
 filtered.sort((a, b) => b.rating - a.rating);
 } else if (sortOrder === 'rating-asc') {
 filtered.sort((a, b) => a.rating - b.rating);
 }

 return filtered;
 }, [searchTerm, selectedState, sortOrder]);

 // Reset page when filters change
 useEffect(() => {
 setCurrentPage(1);
 }, [searchTerm, selectedState, sortOrder]);

 const handlePageChange = (updater: number | ((p: number) => number)) => {
   setCurrentPage(updater);
   window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const itemsPerPage = 10;
 const showPagination = filteredDestinations.length > itemsPerPage;
 const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

 const displayedDestinations = useMemo(() => {
 const startIndex = (currentPage - 1) * itemsPerPage;
 return filteredDestinations.slice(startIndex, startIndex + itemsPerPage);
 }, [filteredDestinations, currentPage]);

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
 <TourismSort sortOrder={sortOrder} onSortChange={setSortOrder} />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
 {displayedDestinations.length > 0 ? (
 displayedDestinations.map((destination, index) => (
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

 {/* Pagination Controls */}
 {showPagination && totalPages > 1 && (
 <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
 <button
 onClick={() => handlePageChange((p) => Math.max(1, p - 1))}
 disabled={currentPage === 1}
 className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors font-medium"
 >
 Prev
 </button>

 {Array.from({ length: totalPages }).map((_, i) => {
 const pageNum = i + 1;
 // Simplified pagination view: only show pages near current page to prevent massive lists
 if (
 pageNum === 1 ||
 pageNum === totalPages ||
 (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
 ) {
 return (
 <button
 key={pageNum}
 onClick={() => handlePageChange(pageNum)}
 className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
 currentPage === pageNum
 ? 'bg-brand-saffron text-white shadow-md'
 : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700'
 }`}
 >
 {pageNum}
 </button>
 );
 } else if (
 pageNum === currentPage - 3 ||
 pageNum === currentPage + 3
 ) {
 return <span key={pageNum} className="px-1 text-neutral-400">...</span>;
 }
 return null;
 })}

 <button
 onClick={() => handlePageChange((p) => Math.min(totalPages, p + 1))}
 disabled={currentPage === totalPages}
 className="px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors font-medium"
 >
 Next
 </button>
 </div>
 )}
 </motion.div>
 );
}