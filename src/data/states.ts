export interface State {
  id: string; // Using string for consistency with SVG path IDs
  name: string;
  capital: string;
  region: string;
  famousPlace: string;
  description: string;
  svgPath: string; // SVG path data for the state
}

export const states: State[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    capital: 'Mumbai',
    region: 'West India',
    famousPlace: 'Gateway of India',
    description: 'A vibrant state known for its bustling cities, historical forts, and beautiful coastline.',
    svgPath: 'M 100 100 L 200 100 L 200 150 L 100 150 Z', // Placeholder path
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    capital: 'Jaipur',
    region: 'North India',
    famousPlace: 'Hawa Mahal',
    description: 'The "Land of Kings" famous for its deserts, palaces, and rich cultural heritage.',
    svgPath: 'M 250 80 L 350 80 L 350 130 L 250 130 Z', // Placeholder path
  },
  {
    id: 'kerala',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    region: 'South India',
    famousPlace: 'Kerala Backwaters',
    description: 'Known as "God\'s Own Country" for its serene backwaters, lush greenery, and beaches.',
    svgPath: 'M 120 250 L 180 250 L 180 300 L 120 300 Z', // Placeholder path
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    region: 'North India',
    famousPlace: 'Taj Mahal',
    description: 'The most populous state, rich in history, culture, and spiritual sites.',
    svgPath: 'M 300 150 L 400 150 L 400 200 L 300 200 Z', // Placeholder path
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    region: 'West India',
    famousPlace: 'Rann of Kutch',
    description: 'A state with a long coastline, rich history, and vibrant festivals.',
    svgPath: 'M 50 180 L 150 180 L 150 230 L 50 230 Z', // Placeholder path
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    region: 'South India',
    famousPlace: 'Meenakshi Amman Temple',
    description: 'Known for its Dravidian-style Hindu temples, classical arts, and natural beauty.',
    svgPath: 'M 200 320 L 260 320 L 260 370 L 200 370 Z', // Placeholder path
  },
  {
    id: 'punjab',
    name: 'Punjab',
    capital: 'Chandigarh',
    region: 'North India',
    famousPlace: 'Golden Temple',
    description: 'The "Land of Five Rivers" with a rich agricultural heritage and spiritual significance.',
    svgPath: 'M 380 50 L 450 50 L 450 90 L 380 90 Z', // Placeholder path
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    capital: 'Bengaluru',
    region: 'South India',
    famousPlace: 'Hampi',
    description: 'A state of diverse landscapes, from beaches to mountains, and a hub for technology.',
    svgPath: 'M 220 220 L 280 220 L 280 270 L 220 270 Z', // Placeholder path
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    capital: 'Kolkata',
    region: 'East India',
    famousPlace: 'Victoria Memorial',
    description: 'Known for its rich cultural heritage, literary traditions, and the Sundarbans.',
    svgPath: 'M 500 180 L 580 180 L 580 230 L 500 230 Z', // Placeholder path
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    region: 'Central India',
    famousPlace: 'Khajuraho Temples',
    description: 'The "Heart of India" with ancient temples, wildlife, and historical monuments.',
    svgPath: 'M 300 250 L 380 250 L 380 300 L 300 300 Z', // Placeholder path
  },
];