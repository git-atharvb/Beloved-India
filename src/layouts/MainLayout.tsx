import { Outlet } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ScrollToTop from '@/components/utils/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow bg-background transition-colors duration-300">
        <div className="container-width section-padding">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}