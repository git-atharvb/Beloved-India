import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { people, Person } from '@/data/people';
import PeopleFilter from '@/components/people/PeopleFilter';
import PeopleGrid from '@/components/people/PeopleGrid';
import PeopleModal from '@/components/people/PeopleModal';

export default function People() {
 const [selectedProfession, setSelectedProfession] = useState('');
 const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

 const availableProfessions = useMemo(() => {
 const professions = new Set(people.map((p) => p.profession));
 return Array.from(professions).sort();
 }, []);

 const filteredPeople = useMemo(() => {
 if (!selectedProfession) {
 return people;
 }
 return people.filter((person) => person.profession === selectedProfession);
 }, [selectedProfession]);

 const handleCardClick = (person: Person) => {
 setSelectedPerson(person);
 };

 const handleCloseModal = () => {
 setSelectedPerson(null);
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
 Greatest People of India
 </h1>
 <p className="text-lg md:text-xl font-body text-neutral-600 max-w-3xl mx-auto">
 Discover the visionaries, leaders, and artists who shaped India.
 </p>
 </div>

 <div className="flex justify-center mb-12">
 <PeopleFilter professions={availableProfessions} onFilter={setSelectedProfession} selectedProfession={selectedProfession} />
 </div>

 <PeopleGrid people={filteredPeople} onCardClick={handleCardClick} />
 </motion.div>

 <PeopleModal person={selectedPerson} onClose={handleCloseModal} />
 </>
 );
}