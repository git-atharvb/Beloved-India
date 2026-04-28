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
    <footer className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20 pb-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Beloved India</h3>
            <p className="text-sm text-white/90">
              Beloved India — Discover the soul of India through culture, tourism, and heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/90 hover:text-white hover:underline transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Beloved India. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}