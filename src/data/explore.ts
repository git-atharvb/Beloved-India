export interface ExploreTheme {
  id: number;
  title: string;
  category: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const exploreThemes: ExploreTheme[] = [
  {
    id: 1,
    title: 'Spiritual Journeys',
    category: 'Spiritual',
    image: 'bg-gradient-to-br from-purple-300 to-indigo-400',
    description: 'Embark on a soul-stirring journey to ancient temples, sacred rivers, and spiritual retreats.',
  },
  {
    id: 2,
    title: 'Adventure Trails',
    category: 'Adventure',
    image: 'bg-gradient-to-br from-green-300 to-teal-400',
    description: 'Thrill-seeking adventures from trekking in the Himalayas to river rafting in Rishikesh.',
  },
  {
    id: 3,
    title: 'Beach Escapes',
    category: 'Beach',
    image: 'bg-gradient-to-br from-blue-300 to-cyan-400',
    description: 'Relax on sun-kissed beaches, enjoy water sports, and vibrant coastal life.',
  },
  {
    id: 4,
    title: 'Mountain Expeditions',
    category: 'Mountain',
    image: 'bg-gradient-to-br from-gray-300 to-slate-400',
    description: 'Conquer majestic peaks, explore serene valleys, and witness breathtaking mountain vistas.',
  },
  {
    id: 5,
    title: 'Wildlife Safaris',
    category: 'Wildlife',
    image: 'bg-gradient-to-br from-lime-300 to-emerald-400',
    description: 'Encounter diverse wildlife in national parks and sanctuaries, including tigers and elephants.',
  },
  {
    id: 6,
    title: 'Cultural Tours',
    category: 'Cultural',
    image: 'bg-gradient-to-br from-orange-300 to-red-400',
    description: 'Immerse yourself in India\'s rich history, art, music, and dance traditions.',
  },
  {
    id: 7,
    title: 'Historical Walks',
    category: 'Historical',
    image: 'bg-gradient-to-br from-amber-300 to-yellow-400',
    description: 'Step back in time with guided tours through ancient forts, palaces, and archaeological sites.',
  },
  {
    id: 8,
    title: 'Desert Adventures',
    category: 'Adventure',
    image: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    description: 'Experience the magic of the desert with camel safaris, dune bashing, and starlit camps.',
  },
  {
    id: 9,
    title: 'Island Getaways',
    category: 'Beach',
    image: 'bg-gradient-to-br from-pink-300 to-fuchsia-400',
    description: 'Discover pristine islands with turquoise waters, vibrant coral reefs, and tranquil surroundings.',
  },
  {
    id: 10,
    title: 'River Cruises',
    category: 'Nature',
    image: 'bg-gradient-to-br from-indigo-300 to-blue-400',
    description: 'Sail along India\'s sacred rivers, witnessing rural life, ancient ghats, and diverse ecosystems.',
  },
];