export interface Person {
  id: number;
  name: string;
  profession: string;
  era: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const people: Person[] = [
  {
    id: 1,
    name: 'Mahatma Gandhi',
    profession: 'Freedom Fighter',
    era: '20th Century',
    image: 'bg-gradient-to-br from-gray-300 to-slate-400',
    description: 'Leader of the Indian independence movement against British rule, advocating for nonviolent civil disobedience.',
  },
  {
    id: 2,
    name: 'Jawaharlal Nehru',
    profession: 'First Prime Minister',
    era: '20th Century',
    image: 'bg-gradient-to-br from-blue-300 to-indigo-400',
    description: 'A central figure in Indian politics before and after independence, and the first Prime Minister of India.',
  },
  {
    id: 3,
    name: 'Sardar Vallabhbhai Patel',
    profession: 'Statesman',
    era: '20th Century',
    image: 'bg-gradient-to-br from-orange-300 to-red-400',
    description: 'A senior leader of the Indian National Congress and a founding father of the Republic of India.',
  },
  {
    id: 4,
    name: 'Mother Teresa',
    profession: 'Humanitarian',
    era: '20th Century',
    image: 'bg-gradient-to-br from-pink-300 to-purple-400',
    description: 'A Roman Catholic nun who devoted her life to serving the poor and sick in Kolkata.',
  },
  {
    id: 5,
    name: 'Rabindranath Tagore',
    profession: 'Poet & Philosopher',
    era: '19th-20th Century',
    image: 'bg-gradient-to-br from-emerald-300 to-teal-400',
    description: 'A Bengali polymath who reshaped Bengali literature and music, and Indian art with Contextual Modernism.',
  },
  {
    id: 6,
    name: 'Dr. A.P.J. Abdul Kalam',
    profession: 'Scientist & President',
    era: '20th-21st Century',
    image: 'bg-gradient-to-br from-cyan-300 to-blue-400',
    description: 'An aerospace scientist who served as the 11th President of India, known as the "Missile Man of India".',
  },
  {
    id: 7,
    name: 'Swami Vivekananda',
    profession: 'Spiritual Leader',
    era: '19th Century',
    image: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    description: 'A Hindu monk and chief disciple of the 19th-century Indian mystic Ramakrishna.',
  },
];