export interface CulturalItem {
  id: number;
  title: string;
  category: 'Festival' | 'Classical Dance' | 'Dance Drama' | 'Folk Art' | 'Folk Dance' | 'Folk Theatre';
  region: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
}

export const culturalItems: CulturalItem[] = [
  {
    id: 1,
    title: 'Diwali',
    category: 'Festival',
    region: 'All India',
    image: 'bg-gradient-to-br from-amber-400 to-orange-500',
    description: 'The festival of lights, symbolizing the victory of light over darkness, good over evil, and knowledge over ignorance.',
  },
  {
    id: 2,
    title: 'Holi',
    category: 'Festival',
    region: 'North India',
    image: 'bg-gradient-to-br from-pink-400 to-purple-500',
    description: 'A vibrant festival of colors, love, and spring, where people smear each other with colored powders.',
  },
  {
    id: 3,
    title: 'Durga Puja',
    category: 'Festival',
    region: 'West Bengal',
    image: 'bg-gradient-to-br from-red-500 to-yellow-500',
    description: 'A ten-day festival celebrating the victory of the goddess Durga over the demon Mahishasur.',
  },
  {
    id: 4,
    title: 'Onam',
    category: 'Festival',
    region: 'Kerala',
    image: 'bg-gradient-to-br from-green-400 to-yellow-400',
    description: 'A harvest festival celebrating the homecoming of the mythical King Mahabali.',
  },
  {
    id: 5,
    title: 'Kathak',
    category: 'Classical Dance',
    region: 'North India',
    image: 'bg-gradient-to-br from-rose-300 to-pink-400',
    description: 'One of the eight major forms of Indian classical dance, characterized by intricate footwork and storytelling.',
  },
  {
    id: 6,
    title: 'Bharatanatyam',
    category: 'Classical Dance',
    region: 'Tamil Nadu',
    image: 'bg-gradient-to-br from-orange-400 to-red-500',
    description: 'A major genre of Indian classical dance that originated in the Hindu temples of Tamil Nadu.',
  },
  {
    id: 7,
    title: 'Kathakali',
    category: 'Dance Drama',
    region: 'Kerala',
    image: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    description: 'A stylized classical Indian dance-drama noted for its attractive make-up of characters and elaborate costumes.',
  },
  {
    id: 8,
    title: 'Warli Painting',
    category: 'Folk Art',
    region: 'Maharashtra',
    image: 'bg-gradient-to-br from-stone-400 to-gray-500',
    description: 'A form of tribal art mostly created by the tribal people from the North Sahyadri Range in Maharashtra, India.',
  },
  {
    id: 9,
    title: 'Madhubani Painting',
    category: 'Folk Art',
    region: 'Bihar',
    image: 'bg-gradient-to-br from-cyan-300 to-blue-400',
    description: 'Characterized by its eye-catching geometrical patterns, this style of painting is done with a variety of tools.',
  },
  {
    id: 10,
    title: 'Bhangra',
    category: 'Folk Dance',
    region: 'Punjab',
    image: 'bg-gradient-to-br from-yellow-400 to-lime-500',
    description: 'A high-energy folk dance and music form that originated in the Punjab region.',
  },
  {
    id: 11,
    title: 'Garba',
    category: 'Folk Dance',
    region: 'Gujarat',
    image: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
    description: 'A form of dance which originated in the state of Gujarat, performed during Navaratri.',
  },
  {
    id: 12,
    title: 'Yakshagana',
    category: 'Folk Theatre',
    region: 'Karnataka',
    image: 'bg-gradient-to-br from-red-600 to-orange-500',
    description: 'A traditional Indian theatre form, developed in Karnataka, combining dance, music, dialogue, and costume.',
  },
];