export interface WildlifeItem {
  id: number;
  name: string;
  type: string; // e.g., Mammal, Bird, Reptile
  habitat: string; // e.g., Forest, Desert, Aquatic
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const wildlife: WildlifeItem[] = [
  {
    id: 1,
    name: 'Bengal Tiger',
    type: 'Mammal',
    habitat: 'Forest',
    image: 'bg-gradient-to-br from-orange-400 to-red-500',
    description: 'The national animal of India, known for its majestic stripes and powerful presence.',
  },
  {
    id: 2,
    name: 'Indian Elephant',
    type: 'Mammal',
    habitat: 'Forest',
    image: 'bg-gradient-to-br from-gray-400 to-slate-500',
    description: 'The largest land animal in Asia, revered in Indian culture and religion.',
  },
  {
    id: 3,
    name: 'Indian Rhinoceros',
    type: 'Mammal',
    habitat: 'Grasslands, Wetlands',
    image: 'bg-gradient-to-br from-stone-400 to-neutral-500',
    description: 'A large rhinoceros species native to the Indian subcontinent, primarily found in Assam.',
  },
  {
    id: 4,
    name: 'Asiatic Lion',
    type: 'Mammal',
    habitat: 'Forest, Grasslands',
    image: 'bg-gradient-to-br from-amber-400 to-yellow-500',
    description: 'A majestic big cat found exclusively in the Gir Forest National Park in Gujarat.',
  },
  {
    id: 5,
    name: 'Peacock',
    type: 'Bird',
    habitat: 'Forest, Farmland',
    image: 'bg-gradient-to-br from-blue-400 to-purple-500',
    description: 'The national bird of India, famous for its vibrant plumage and elaborate courtship display.',
  },
  {
    id: 6,
    name: 'Gharial',
    type: 'Reptile',
    habitat: 'Rivers',
    image: 'bg-gradient-to-br from-green-400 to-emerald-500',
    description: 'A critically endangered crocodilian distinguished by its long, thin snout.',
  },
  {
    id: 7,
    name: 'Snow Leopard',
    type: 'Mammal',
    habitat: 'Mountains',
    image: 'bg-gradient-to-br from-sky-400 to-indigo-500',
    description: 'An elusive big cat native to the mountain ranges of Central and South Asia, including the Himalayas.',
  },
];