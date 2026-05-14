import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourismSearchProps {
 onSearch: (searchTerm: string) => void;
 initialSearchTerm?: string;
}

export default function TourismSearch({ onSearch, initialSearchTerm = '' }: TourismSearchProps) {
 const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
 const debouncedSearchTerm = useRef(initialSearchTerm);
 const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 useEffect(() => {
 if (timeoutRef.current) {
 clearTimeout(timeoutRef.current);
 }

 timeoutRef.current = setTimeout(() => {
 if (debouncedSearchTerm.current !== searchTerm) {
 debouncedSearchTerm.current = searchTerm;
 onSearch(searchTerm);
 }
 }, 300); // Debounce delay

 return () => {
 if (timeoutRef.current) {
 clearTimeout(timeoutRef.current);
 }
 };
 }, [searchTerm, onSearch]);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 setSearchTerm(event.target.value);
 };

 return (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="relative w-full max-w-md mx-auto mb-8"
 >
 <input
 type="text"
 placeholder="Search destinations..."
 value={searchTerm}
 onChange={handleChange}
 className="w-full pl-10 pr-4 py-2 rounded-full shadow-md
 bg-white text-neutral-800 
 border border-neutral-200 
 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
 transition-all duration-200"
 />
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 " />
 </motion.div>
 );
}