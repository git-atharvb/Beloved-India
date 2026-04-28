export interface Destination {
  id: number;
  name: string;
  state: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
  rating: number; // e.g., 4.5
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Taj Mahal',
    state: 'Uttar Pradesh',
    image: 'bg-gradient-to-br from-rose-100 to-teal-100',
    description: 'An immense mausoleum of white marble, an icon of Mughal architecture.',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'bg-gradient-to-br from-pink-200 to-amber-200',
    description: 'The "Pink City", known for its stunning forts, palaces, and vibrant markets.',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Kerala Backwaters',
    state: 'Kerala',
    image: 'bg-gradient-to-br from-emerald-200 to-cyan-300',
    description: 'A serene network of lakes, canals, and lagoons parallel to the Arabian Sea coast.',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    image: 'bg-gradient-to-br from-sky-300 to-indigo-400',
    description: 'A rugged, high-altitude desert known for its dramatic landscapes and Buddhist monasteries.',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'bg-gradient-to-br from-orange-200 to-yellow-300',
    description: 'A spiritual city on the banks of the Ganges, with sacred ghats and ancient temples.',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Goa Beaches',
    state: 'Goa',
    image: 'bg-gradient-to-br from-cyan-200 to-blue-300',
    description: 'Famous for its golden-sand beaches, vibrant nightlife, and Portuguese heritage.',
    rating: 4.5,
  },
  {
    id: 7,
    name: 'Rann of Kutch',
    state: 'Gujarat',
    image: 'bg-gradient-to-br from-slate-200 to-gray-300',
    description: 'A vast salt marsh that transforms into a surreal white desert under the moonlight.',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Mysore Palace',
    state: 'Karnataka',
    image: 'bg-gradient-to-br from-amber-200 to-yellow-400',
    description: 'A historical palace and the royal residence at Mysore, known for its grandeur.',
    rating: 4.8,
  },
];