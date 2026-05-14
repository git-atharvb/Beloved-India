import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4 sm:px-6 pointer-events-none">
      <motion.header
        className={clsx(
          "w-full max-w-7xl pointer-events-auto rounded-3xl border transition-all duration-300",
          "backdrop-blur-2xl bg-white/70 dark:bg-[#0f0f0f]/70 border-border shadow-premium-glass"
        )}
        animate={{
          scale: isShrunk ? 0.98 : 1,
          y: isShrunk ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full flex items-center justify-between gap-6 px-6 transition-all duration-300 h-20 py-3">
          <NavLink to="/" onClick={closeMobileMenu} className="flex items-center gap-4 group">
            <div className="flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 shadow-sm h-12 w-12 transition-transform duration-300 group-hover:scale-105">
              <img src={belovedIndiaLogo} alt="Beloved India Logo" className="w-auto h-8" />
            </div>
            <motion.div
              animate={{ opacity: isShrunk ? 0 : 1, width: isShrunk ? 0 : 'auto', overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap"
            >
              <p className="text-sm font-bold tracking-[0.2em] uppercase gradient-text-brand">Beloved India</p>
              <p className="text-xs text-fg-muted font-medium">Travel · Culture · Heritage</p>
            </motion.div>
          </NavLink>

          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'relative px-4 py-2 rounded-xl transition-colors duration-200 hover:text-brand-cyan hover:bg-cyan-600/5 dark:hover:bg-cyan-400/5 text-foreground',
                    isActive && 'text-brand-cyan font-semibold bg-cyan-600/10 dark:bg-cyan-400/10'
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
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-xl bg-white/50 dark:bg-[#0f0f0f]/50 border border-border h-10 w-10 hover:bg-hover transition-colors duration-200 xl:hidden text-foreground"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="w-[min(95vw,420px)] pointer-events-auto mt-4 self-end rounded-3xl backdrop-blur-2xl bg-white/90 dark:bg-[#0f0f0f]/90 border border-border shadow-premium-glass"
          >
            <div className="flex flex-col gap-1 py-4 px-4 w-full">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 text-foreground hover:bg-hover',
                      isActive && 'bg-cyan-600/10 dark:bg-cyan-400/10 text-brand-cyan font-bold'
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
    </div>
  );
}
