import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Sun, Moon, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import useDarkMode from '@/hooks/useDarkMode';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tourism', path: '/tourism' },
  { name: 'Culture', path: '/culture' },
  { name: 'Food', path: '/food' },
  { name: 'Heritage', path: '/heritage' },
  { name: 'Geography', path: '/geography' },
  { name: 'Explore', path: '/explore' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 font-heading font-bold text-xl
                     bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text"
          onClick={closeMobileMenu}
        >
          <Map className="w-6 h-6 text-accent-500" />
          <span>Beloved India 🇮🇳</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-body text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'transition-colors duration-200',
                  isActive
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400',
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 pb-4"
          >
            <div className="flex flex-col items-center space-y-4 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    clsx(
                      'text-lg font-medium transition-colors duration-200 w-full text-center py-2',
                      isActive
                        ? 'text-primary-500 dark:text-primary-400 bg-neutral-100 dark:bg-neutral-800'
                        : 'text-neutral-700 dark:text-neutral-200 hover:text-accent-500 dark:hover:text-accent-400 hover:bg-neutral-50 dark:hover:bg-neutral-850',
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}