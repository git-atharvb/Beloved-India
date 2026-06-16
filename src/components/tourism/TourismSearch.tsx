import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

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
    <div className="relative w-full md:w-64 flex-shrink-0">
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl shadow-sm
                   bg-white text-neutral-800 
                   border border-neutral-200 
                   focus:outline-none focus:ring-1 focus:ring-brand-saffron focus:border-brand-saffron
                   transition-all dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
    </div>
  );
}