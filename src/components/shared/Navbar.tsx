import { useState, useEffect } from 'react';
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
  const [isShrunk, setIsShrunk] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl backdrop-blur-md bg-background/70 border border-border/50 rounded-full shadow-glass"
        animate={{
          scale: isShrunk ? 0.9 : 1,
          y: isShrunk ? -10 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className={clsx(
          "w-full flex items-center justify-between gap-6 px-6 transition-all duration-300",
          isShrunk ? "h-16 py-2" : "h-20 py-3"
        )}>
          <NavLink to="/" onClick={closeMobileMenu} className="flex items-center gap-4">
            <div className={clsx(
              "flex items-center justify-center rounded-3xl bg-white/90 shadow-sm dark:bg-neutral-950/80 transition-all duration-300",
              isShrunk ? "h-10 w-10" : "h-12 w-12"
            )}>
              <img src={belovedIndiaLogo} alt="Beloved India Logo" className={clsx(
                "w-auto transition-all duration-300",
                isShrunk ? "h-7" : "h-9"
              )} />
            </div>
            {!isShrunk && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary-600 dark:text-sunrise-400">Beloved India</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Travel · Culture · Heritage</p>
              </motion.div>
            )}
          </NavLink>

          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'transition duration-200 ease-out text-neutral-700 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-sunrise-300 px-3 py-2 rounded-full',
                    isActive && 'text-primary-600 dark:text-sunrise-300 bg-primary-50/50 dark:bg-sunrise-500/10',
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={clsx(
                "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-sunrise-300",
                isShrunk ? "h-9 w-9" : "h-11 w-11"
              )}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className={clsx(isShrunk ? "h-4 w-4" : "h-5 w-5")} /> : <Moon className={clsx(isShrunk ? "h-4 w-4" : "h-5 w-5")} />}
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className={clsx(
                "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-sunrise-300 xl:hidden",
                isShrunk ? "h-9 w-9" : "h-11 w-11"
              )}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className={clsx(isShrunk ? "h-5 w-5" : "h-6 w-6")} /> : <Menu className={clsx(isShrunk ? "h-5 w-5" : "h-6 w-6")} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed top-24 left-1/2 z-40 -translate-x-1/2 md:hidden border border-neutral-200/70 dark:border-neutral-700/70 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl rounded-2xl shadow-glass w-[min(95vw,420px)]"
          >
            <div className="flex flex-col gap-3 py-4 px-6 text-center w-full">
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
    </>
  );
}
