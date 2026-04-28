export interface Food {
  id: number;
  name: string;
  region: string;
  image: string; // Using Tailwind gradient classes as placeholders
  description: string;
  ingredients: string[];
}

export const foods: Food[] = [
  {
    id: 1,
    name: 'Butter Chicken',
    region: 'North India',
    image: 'bg-gradient-to-br from-orange-300 to-red-400',
    description: 'A classic Indian dish with tender chicken pieces cooked in a rich, creamy tomato sauce.',
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Spices'],
  },
  {
    id: 2,
    name: 'Biryani',
    region: 'Hyderabad',
    image: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    description: 'A fragrant, flavorful rice dish made with basmati rice, meat (chicken, mutton, or beef), and aromatic spices.',
    ingredients: ['Basmati Rice', 'Meat', 'Yogurt', 'Onions', 'Spices', 'Saffron'],
  },
  {
    id: 3,
    name: 'Dosa',
    region: 'South India',
    image: 'bg-gradient-to-br from-lime-300 to-green-400',
    description: 'A thin, savory pancake made from fermented rice and lentil batter, often served with sambar and chutney.',
    ingredients: ['Rice', 'Lentils', 'Sambar', 'Chutney'],
  },
  {
    id: 4,
    name: 'Rogan Josh',
    region: 'Kashmir',
    image: 'bg-gradient-to-br from-purple-300 to-pink-400',
    description: 'An aromatic curried meat dish, traditionally made with red meat, originating from Kashmir.',
    ingredients: ['Lamb/Goat', 'Yogurt', 'Ginger', 'Garlic', 'Kashmiri Chili', 'Spices'],
  },
  {
    id: 5,
    name: 'Pav Bhaji',
    region: 'Maharashtra',
    image: 'bg-gradient-to-br from-red-300 to-orange-400',
    description: 'A fast food dish from Mumbai, consisting of a thick vegetable curry served with a soft bread roll.',
    ingredients: ['Mixed Vegetables', 'Potatoes', 'Tomatoes', 'Pav Bhaji Masala', 'Butter', 'Pav (Bread)'],
  },
  {
    id: 6,
    name: 'Dal Baati Churma',
    region: 'Rajasthan',
    image: 'bg-gradient-to-br from-amber-300 to-yellow-400',
    description: 'A traditional Rajasthani dish with spicy dal, deep-fried baati (wheat balls), and sweet churma.',
    ingredients: ['Lentils', 'Wheat Flour', 'Ghee', 'Sugar', 'Spices'],
  },
  {
    id: 7,
    name: 'Fish Curry',
    region: 'Kerala',
    image: 'bg-gradient-to-br from-blue-300 to-cyan-400',
    description: 'A tangy and spicy fish curry, a staple in coastal South India, often made with coconut milk.',
    ingredients: ['Fish', 'Coconut Milk', 'Tamarind', 'Green Chilies', 'Curry Leaves', 'Spices'],
  },
  {
    id: 8,
    name: 'Sandesh',
    region: 'West Bengal',
    image: 'bg-gradient-to-br from-sky-300 to-indigo-400',
    description: 'A popular Bengali sweet made from chhena (Indian cheese) and sugar, often flavored with cardamom or saffron.',
    ingredients: ['Chhena (Paneer)', 'Sugar', 'Cardamom', 'Saffron'],
  },
  {
    id: 9,
    name: 'Chole Bhature',
    region: 'Punjab',
    image: 'bg-gradient-to-br from-lime-400 to-emerald-500',
    description: 'A combination of chana masala (spicy chickpea curry) and bhatura (fried bread), a popular North Indian dish.',
    ingredients: ['Chickpeas', 'Flour', 'Yogurt', 'Spices', 'Onions', 'Tomatoes'],
  },
  {
    id: 10,
    name: 'Vada Pav',
    region: 'Maharashtra',
    image: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    description: 'A popular vegetarian fast food dish native to the Indian state of Maharashtra, consisting of a deep fried potato dumpling placed inside a bread bun (pav) sliced almost in half through the middle.',
    ingredients: ['Potato Vada', 'Pav (Bread)', 'Chutneys'],
  },
  {
    id: 11,
    name: 'Idli Sambhar',
    region: 'South India',
    image: 'bg-gradient-to-br from-green-400 to-teal-500',
    description: 'A savory rice cake, popular as a breakfast food in South India, served with sambar (lentil stew) and coconut chutney.',
    ingredients: ['Rice', 'Lentils', 'Sambar', 'Chutney'],
  },
  {
    id: 12,
    name: 'Pani Puri',
    region: 'All India',
    image: 'bg-gradient-to-br from-fuchsia-400 to-pink-500',
    description: 'A popular street snack consisting of a round, hollow puri, fried crisp and filled with a mixture of flavored water (pani), tamarind chutney, chili, chaat masala, potato, onion or chickpeas.',
    ingredients: ['Puri', 'Spiced Water (Pani)', 'Tamarind Chutney', 'Potatoes', 'Chickpeas'],
  },
];