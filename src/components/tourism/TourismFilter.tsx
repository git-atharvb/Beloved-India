import { FC } from 'react';

interface TourismFilterProps {
  states: string[];
  onFilter: (state: string) => void;
  selectedState: string;
}

const TourismFilter: FC<TourismFilterProps> = ({ states, onFilter, selectedState }) => {
  return (
    <div className="w-full md:w-56 flex-shrink-0">
      <select
        value={selectedState}
        onChange={(e) => onFilter(e.target.value)}
        className="w-full bg-white border border-neutral-200 text-neutral-800 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-saffron focus:border-brand-saffron block py-3 px-4 shadow-sm transition-all cursor-pointer dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
      >
        <option value="">Filter: All States</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TourismFilter;