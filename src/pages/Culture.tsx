import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { culturalItems, CulturalItem } from '@/data/culture';
import CultureFilter from '@/components/culture/CultureFilter';
import CultureGrid from '@/components/culture/CultureGrid';
import CultureModal from '@/components/culture/CultureModal';

export default function Culture() {
 const [selectedCategory, setSelectedCategory] = useState('');
 const [selectedItem, setSelectedItem] = useState<CulturalItem | null>(null);

 const availableCategories = useMemo(() => {
 const categories = new Set(culturalItems.map((item) => item.category));
 return Array.from(categories).sort();
 }, []);

 const filteredItems = useMemo(() => {
 if (!selectedCategory) {
 return culturalItems;
 }
 return culturalItems.filter((item) => item.category === selectedCategory);
 }, [selectedCategory]);

 const handleCardClick = (item: CulturalItem) => {
 setSelectedItem(item);
 };

 const handleCloseModal = () => {
 setSelectedItem(null);
 };

 return (
 <>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="pt-2 pb-8 sm:pt-4 sm:pb-12 lg:pt-4 lg:pb-16" // MainLayout already provides max-width and horizontal padding
 >
 <div className="text-center mb-12">
 <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
 Culture of India
 </h1>
 <p className="text-lg md:text-xl font-body text-secondary max-w-3xl mx-auto">
 Experience the traditions, festivals, and art forms that define India.
 </p>
 </div>

 <div className="flex justify-center mb-12">
 <CultureFilter categories={availableCategories} onFilter={setSelectedCategory} selectedCategory={selectedCategory} />
 </div>

 <CultureGrid items={filteredItems} onCardClick={handleCardClick} />
 </motion.div>

 <CultureModal item={selectedItem} onClose={handleCloseModal} />
 </>
 );
}