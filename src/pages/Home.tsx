import Hero from '@/components/shared/Hero';
import CategorySection from '@/components/sections/CategorySection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedDestinations />
    </>
  );
}