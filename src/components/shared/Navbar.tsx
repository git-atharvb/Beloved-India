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
 <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4 sm:px-6 pointer-events-none">
 <motion.header
 className="glass-effect w-full max-w-[1920px] pointer-events-auto"
 animate={{
 scale: isShrunk ? 0.98 : 1,
 y: isShrunk ? -5 : 0,
 }}
 transition={{ duration: 0.3, ease: 'easeOut' }}
 >
 <div className="w-full flex items-center justify-between gap-6 px-6 transition-all duration-300 h-20 py-3">
 <NavLink to="/" onClick={closeMobileMenu} className="flex items-center gap-4">
 <div className="flex items-center justify-center rounded-3xl glass-effect h-12 w-12">
 <img src={belovedIndiaLogo} alt="Beloved India Logo" className="w-auto h-9 transition-all duration-300" />
 </div>
 {!isShrunk && (
 <motion.div
 initial={{ opacity: 1 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 >
 <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary-600 ">Beloved India</p>
 <p className="text-xs text-neutral-500 ">Travel · Culture · Heritage</p>
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
 'transition duration-200 ease-out px-3 py-2 rounded-lg color-transition',
 isActive && 'bg-primary-saffron/10 text-primary-saffron font-semibold',
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
 className="inline-flex items-center justify-center rounded-lg glass-effect h-10 w-10 hover:bg-primary-saffron/10 transition-colors duration-200 xl:hidden"
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
 className="glass-effect rainbow-border w-[min(95vw,420px)] pointer-events-auto mt-4 self-end"
 >
 <div className="flex flex-col gap-3 py-4 px-6 text-center w-full">
 {navLinks.map((link) => (
 <NavLink
 key={link.path}
 to={link.path}
 onClick={closeMobileMenu}
 className={({ isActive }) =>
 clsx(
 'rounded-lg px-4 py-3 text-base font-medium transition duration-200 ease-out color-transition',
 isActive && 'bg-primary-saffron/10 text-primary-saffron font-semibold',
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
