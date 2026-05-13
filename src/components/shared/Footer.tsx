import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tourism', path: '/tourism' },
  { name: 'Culture', path: '/culture' },
  { name: 'Food', path: '/food' },
  { name: 'Explore', path: '/explore' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/your-profile' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/your-profile' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/your-profile' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden vibrant-bg text-white py-16">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,154,51,0.18),transparent_40%)]" />
      <div className="container-width relative grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] items-start">
        <div className="card-surface">
          <p className="text-sm uppercase tracking-[0.24em] gradient-text">Beloved India</p>
          <h2 className="mt-4 text-3xl font-heading font-bold gradient-text">Journey beyond the ordinary.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 color-transition">
            A beautiful guide for every traveler who wants to explore India’s heritage, cuisine, people, and vibrant landscapes.
          </p>
          <div className="mt-8 feature-pill">
            <span className="mr-3 h-2.5 w-2.5 rounded-full bg-primary-400 animate-pulse" />
            Ready for your next adventure?
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-white transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
          <div className="flex items-center gap-4 text-neutral-300">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-white" aria-label={social.name}>
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-neutral-400 max-w-xs">
            Follow the latest stories and cultural highlights while you plan your next trip.
          </p>
        </div>
      </div>

      <div className="container-width mt-12 border-t border-white/10 pt-8 text-sm text-neutral-500 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Beloved India. All rights reserved.</p>
        <p>Designed and coded by Atharv.</p>
      </div>
    </footer>
  );
}
