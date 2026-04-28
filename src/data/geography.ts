export interface Region {
  id: number;
  name: string;
  type: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const regions: Region[] = [
  {
    id: 1,
    name: 'Himalayan Mountains',
    type: 'Mountains',
    image: 'bg-gradient-to-br from-blue-200 to-indigo-300',
    description: 'The world\'s highest mountain range, forming a natural barrier in the north.',
  },
  {
    id: 2,
    name: 'Thar Desert',
    type: 'Desert',
    image: 'bg-gradient-to-br from-yellow-200 to-orange-300',
    description: 'A large, arid region in the northwestern part of the Indian subcontinent.',
  },
  {
    id: 3,
    name: 'Western Ghats',
    type: 'Mountains',
    image: 'bg-gradient-to-br from-green-300 to-emerald-400',
    description: 'A mountain range running parallel to the western coast of the Indian peninsula.',
  },
  {
    id: 4,
    name: 'Eastern Ghats',
    type: 'Mountains',
    image: 'bg-gradient-to-br from-lime-300 to-teal-400',
    description: 'A discontinuous range of mountains along India\'s eastern coast.',
  },
  {
    id: 5,
    name: 'Indo-Gangetic Plains',
    type: 'Plains',
    image: 'bg-gradient-to-br from-sky-200 to-cyan-300',
    description: 'Vast and fertile plains supporting a large population, fed by major rivers.',
  },
  {
    id: 6,
    name: 'Deccan Plateau',
    type: 'Plateau',
    image: 'bg-gradient-to-br from-red-200 to-rose-300',
    description: 'A large plateau in southern India, rising to 100 meters in the north and over 1,000 meters in the south.',
  },
  {
    id: 7,
    name: 'Sundarbans',
    type: 'Mangrove Forest',
    image: 'bg-gradient-to-br from-emerald-400 to-green-500',
    description: 'The largest mangrove forest in the world, a UNESCO World Heritage Site.',
  },
  {
    id: 8,
    name: 'Rann of Kutch',
    type: 'Salt Desert',
    image: 'bg-gradient-to-br from-gray-200 to-slate-300',
    description: 'A vast salt marsh that is submerged in water during the monsoon season.',
  },
  {
    id: 9,
    name: 'Kerala Backwaters',
    type: 'Wetlands',
    image: 'bg-gradient-to-br from-blue-300 to-cyan-400',
    description: 'A network of brackish lagoons, lakes, canals, and rivers.',
  },
  {
    id: 10,
    name: 'Andaman Islands',
    type: 'Islands',
    image: 'bg-gradient-to-br from-purple-300 to-pink-400',
    description: 'A group of islands in the Bay of Bengal, known for their pristine beaches and coral reefs.',
  },
];