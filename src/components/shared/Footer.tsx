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
    <footer className="relative overflow-hidden vibrant-bg text-fg-primary dark:text-fg-primary py-16">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,154,51,0.18),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,154,51,0.12),transparent_40%)]" />
      <div className="container-width relative grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] items-start">
        <div className="card-surface">
          <p className="text-sm uppercase tracking-[0.24em] text-primary-saffron dark:text-accent-gold font-semibold">Beloved India</p>
          <h2 className="mt-4 text-3xl font-heading font-bold text-primary-saffron dark:text-accent-gold">Journey beyond the ordinary.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-fg-secondary dark:text-fg-secondary">
            A beautiful guide for every traveler who wants to explore India's heritage, cuisine, people, and vibrant landscapes.
          </p>
          <div className="mt-8 feature-pill">
            <span className="text-primary-saffron dark:text-accent-gold font-medium">
              Ready for your next adventure?
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-fg-primary dark:text-fg-primary mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-fg-muted dark:text-fg-muted">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-primary-saffron dark:hover:text-accent-gold transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-fg-primary dark:text-fg-primary mb-4">Connect</h3>
          <div className="flex items-center gap-4 text-fg-muted dark:text-fg-muted">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary-saffron dark:hover:text-accent-gold" aria-label={social.name}>
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-fg-muted dark:text-fg-muted max-w-xs">
            Follow the latest stories and cultural highlights while you plan your next trip.
          </p>
        </div>
      </div>

      <div className="container-width mt-12 border-t border-border-primary dark:border-border-primary pt-8 text-sm text-fg-muted dark:text-fg-muted flex flex-col gap-3 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Beloved India. All rights reserved.</p>
        <p>Designed and coded by Atharv.</p>
      </div>
    </footer>
  );
}
