import { Outlet } from 'react-router-dom';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ScrollToTop from '@/components/utils/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
        {/* Max-width container and consistent padding for main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}