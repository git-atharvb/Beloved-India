import { Outlet, NavLink } from 'react-router-dom';
import { Map } from 'lucide-react';
import clsx from 'clsx';

export default function MainLayout() {
  const links = [
    { name: 'Tourism', path: '/tourism' },
    { name: 'Culture', path: '/culture' },
    { name: 'Food', path: '/food' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'Geography', path: '/geography' },
    { name: 'Explore', path: '/explore' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2 text-primary font-heading font-bold text-xl">
            <Map className="w-6 h-6 text-accent" />
            <span>Beloved India</span>
          </NavLink>
          <nav className="hidden md:flex space-x-6 font-body text-sm font-medium">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => clsx("transition-colors", isActive ? "text-primary" : "text-neutral-600 dark:text-neutral-300 hover:text-accent dark:hover:text-accent")}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-grow bg-neutral-50 dark:bg-neutral-950">
        <Outlet />
      </main>
      <footer className="bg-neutral-100 dark:bg-neutral-900 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Beloved India. All rights reserved.
      </footer>
    </div>
  );
}