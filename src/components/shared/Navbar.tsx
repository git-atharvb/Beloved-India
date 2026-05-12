import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import useDarkMode from '@/hooks/useDarkMode';
import belovedIndiaLogo from '@/assets/images/beloved_india_logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tourism', path: '/tourism' },
  { name: 'Culture', path: '/culture' },
  { name: 'Food', path: '/food' },
  { name: 'Heritage', path: '/heritage' },
  { name: 'Geography', path: '/geography' },
  { name: 'People', path: '/people' },
  { name: 'Wildlife', path: '/wildlife' },
  { name: 'Explore', path: '/explore' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 dark:border-white/10 glass-effect backdrop-blur-xl shadow-soft">
      <div className="container-width h-20 flex items-center justify-between gap-6">
        <NavLink to="/" onClick={closeMobileMenu} className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/90 shadow-sm dark:bg-neutral-950/80">
            <img src={belovedIndiaLogo} alt="Beloved India Logo" className="h-8 w-auto" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary-600 dark:text-sunrise-400">Beloved India</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Travel · Culture · Heritage</p>
          </div>
        </NavLink>

        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'transition duration-200 ease-out text-neutral-700 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-sunrise-300',
                  isActive && 'text-primary-600 dark:text-sunrise-300',
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-sunrise-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-sunrise-300 xl:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden border-t border-neutral-200/70 dark:border-neutral-700/70 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl"
          >
            <div className="container-width flex flex-col gap-3 py-4 text-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-3xl px-4 py-3 text-base font-medium transition duration-200 ease-out',
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-sunrise-500/10 dark:text-sunrise-200'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900',
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
