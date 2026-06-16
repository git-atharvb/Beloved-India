import { FC } from 'react';

interface TourismSortProps {
  sortOrder: 'none' | 'rating-asc' | 'rating-desc';
  onSortChange: (order: 'none' | 'rating-asc' | 'rating-desc') => void;
}

const TourismSort: FC<TourismSortProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="w-full md:w-56 flex-shrink-0">
      <select
        id="tourism-sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as any)}
        className="w-full bg-white border border-neutral-200 text-neutral-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-saffron focus:border-brand-saffron block py-3 px-4 shadow-sm transition-all cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
      >
        <option value="none">Sort: Default (Mixed)</option>
        <option value="rating-desc">Sort: Rating (High to Low)</option>
        <option value="rating-asc">Sort: Rating (Low to High)</option>
      </select>
    </div>
  );
};

export default TourismSort;
