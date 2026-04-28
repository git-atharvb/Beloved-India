export interface HeritageItem {
  id: number;
  title: string;
  year: string;
  location: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const heritageItems: HeritageItem[] = [
  {
    id: 1,
    title: 'Ajanta Caves',
    year: '2nd Century BCE',
    location: 'Maharashtra',
    image: 'bg-gradient-to-br from-amber-200 to-yellow-300',
    description: 'Rock-cut Buddhist cave monuments with expressive paintings.',
  },
  {
    id: 2,
    title: 'Ellora Caves',
    year: '600 CE',
    location: 'Maharashtra',
    image: 'bg-gradient-to-br from-stone-300 to-slate-400',
    description: 'A massive rock-cut monastery-temple complex featuring Hindu, Buddhist, and Jain monuments.',
  },
  {
    id: 3,
    title: 'Qutub Minar',
    year: '1193',
    location: 'Delhi',
    image: 'bg-gradient-to-br from-red-300 to-orange-400',
    description: 'A towering minaret and victory tower, a fine example of Indo-Islamic architecture.',
  },
  {
    id: 4,
    title: 'Konark Sun Temple',
    year: '1250',
    location: 'Odisha',
    image: 'bg-gradient-to-br from-orange-300 to-yellow-400',
    description: 'A monumental representation of the Sun God Surya\'s chariot.',
  },
  {
    id: 5,
    title: 'Hampi Ruins',
    year: '1336',
    location: 'Karnataka',
    image: 'bg-gradient-to-br from-lime-300 to-green-400',
    description: 'The ruins of Vijayanagara, a vast complex of temples, palaces, and markets.',
  },
  {
    id: 6,
    title: 'Taj Mahal',
    year: '1632',
    location: 'Agra',
    image: 'bg-gradient-to-br from-rose-100 to-teal-100',
    description: 'An ivory-white marble mausoleum, the jewel of Muslim art in India.',
  },
  {
    id: 7,
    title: 'Red Fort',
    year: '1648',
    location: 'Delhi',
    image: 'bg-gradient-to-br from-red-400 to-rose-500',
    description: 'The main residence of the Mughal emperors, a symbol of India\'s sovereignty.',
  },
  {
    id: 8,
    title: 'Gateway of India',
    year: '1924',
    location: 'Mumbai',
    image: 'bg-gradient-to-br from-sky-300 to-indigo-400',
    description: 'An arch-monument built to commemorate the landing of King-Emperor George V.',
  },
];