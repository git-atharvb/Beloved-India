import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import belovedIndiaLogo from '@/assets/images/beloved_india_logo.png';
import { useTheme } from '@/hooks/useTheme';

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

  // Theme toggle
  const { dark, toggle } = useTheme();

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
          "backdrop-blur-2xl bg-white/70 dark:bg-zinc-950/70 border-border shadow-premium-glass"
        )}
        animate={{
          scale: isShrunk ? 0.98 : 1,
          y: isShrunk ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full flex items-center justify-between gap-6 px-6 transition-all duration-300 h-20 py-3">
          <NavLink to="/" onClick={closeMobileMenu} className="flex items-center gap-4 group">
            <div className="flex items-center justify-center rounded-2xl bg-white overflow-hidden shadow-sm h-12 w-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img src={belovedIndiaLogo} alt="Beloved India Logo" className="w-full h-full object-cover" />
            </div>
            <motion.div
              animate={{ opacity: isShrunk ? 0 : 1, width: isShrunk ? 0 : 'auto', overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap"
            >
              <p className="text-sm font-bold tracking-[0.2em] uppercase gradient-text-holi">Beloved India</p>
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
                    'relative px-4 py-2 rounded-xl transition-colors duration-300',
                    isActive ? 'text-brand-saffron font-bold' : 'text-foreground hover:text-brand-saffron hover:bg-brand-saffron/5'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <>
                        {/* Soft background pill */}
                        <motion.div
                          layoutId="navbar-active-bg"
                          className="absolute inset-0 bg-brand-saffron/10 dark:bg-brand-saffron/15 rounded-xl z-0"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        {/* Indian Flag gradient sliding line */}
                        <motion.div
                          layoutId="navbar-active-line"
                          className="absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-0 shadow-[0_0_8px_rgba(255,153,51,0.5)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme toggle button */}
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center justify-center rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-border h-10 w-10 hover:bg-hover transition-colors duration-200 text-foreground"
              aria-label="Toggle dark mode"
            >
              {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-border h-10 w-10 hover:bg-hover transition-colors duration-200 xl:hidden text-foreground"
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
                      'relative overflow-hidden rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200',
                      isActive ? 'bg-brand-saffron/10 dark:bg-brand-saffron/15 text-brand-saffron font-bold' : 'text-foreground hover:bg-hover'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-active-line"
                          className="absolute left-0 top-1 bottom-1 w-[4px] rounded-r-full bg-gradient-to-b from-[#FF9933] via-white to-[#138808] shadow-[0_0_8px_rgba(255,153,51,0.5)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
