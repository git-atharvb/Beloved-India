import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { wildlife, WildlifeItem } from '@/data/wildlife';
import WildlifeFilter from '@/components/wildlife/WildlifeFilter';
import WildlifeGrid from '@/components/wildlife/WildlifeGrid';
import WildlifeModal from '@/components/wildlife/WildlifeModal';

export default function Wildlife() {
 const [selectedType, setSelectedType] = useState('');
 const [selectedItem, setSelectedItem] = useState<WildlifeItem | null>(null);

 const availableTypes = useMemo(() => {
 const types = new Set(wildlife.map((item) => item.type));
 return Array.from(types).sort();
 }, []);

 const filteredItems = useMemo(() => {
 if (!selectedType) {
 return wildlife;
 }
 return wildlife.filter((item) => item.type === selectedType);
 }, [selectedType]);

 const handleCardClick = (item: WildlifeItem) => {
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
 <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-800 mb-4">
 Wildlife of India
 </h1>
 <p className="text-lg md:text-xl font-body text-neutral-600 max-w-3xl mx-auto">
 Discover the incredible biodiversity and majestic creatures of India.
 </p>
 </div>

 <div className="flex justify-center mb-12">
 <WildlifeFilter types={availableTypes} onFilter={setSelectedType} selectedType={selectedType} />
 </div>

 <WildlifeGrid items={filteredItems} onCardClick={handleCardClick} />
 </motion.div>

 <WildlifeModal item={selectedItem} onClose={handleCloseModal} />
 </>
 );
}