import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Compass, BookOpenText, Utensils, Landmark } from 'lucide-react';

const stats = [
  { label: 'States Covered', value: '28+' },
  { label: 'Heritage Sites', value: '120+' },
  { label: 'Culinary Styles', value: '300+' },
  { label: 'Wild Experiences', value: '150+' },
];

const features = [
  { title: 'Ancient History', description: 'Timeless monuments and stories.', icon: Landmark },
  { title: 'Local Cuisine', description: 'Regional flavors from every state.', icon: Utensils },
  { title: 'Cultural Trails', description: 'Festivals, art, and living traditions.', icon: BookOpenText },
  { title: 'Hidden Routes', description: 'Curated travel paths beyond the ordinary.', icon: Compass },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Hero() {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] vibrant-bg">
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-neutral-950 dark:via-neutral-950/70 dark:to-transparent" />

      <div className="relative z-10 container-width py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1.2fr] items-center">
          <motion.div className="space-y-8" initial="hidden" animate="visible" variants={textVariants}>
            <span className="feature-pill text-sm font-medium text-primary-saffron dark:text-accent-gold">
              Discover India's timeless heritage and vibrant culture
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-heading font-bold tracking-tight text-primary-saffron dark:text-accent-gold">
                Discover the <span className="text-primary-green dark:text-accent-teal">Soul of India</span> with immersive travel stories.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                Explore unforgettable cultural journeys, stunning landscapes, and modern travel experiences designed to inspire every explorer.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/explore" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-saffron hover:bg-primary-saffron/90 px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 sm:w-auto">
                Start Exploring
              </Link>
              <Link to="/tourism" className="inline-flex w-full items-center justify-center rounded-full glass-effect px-8 py-4 text-sm font-semibold color-transition sm:w-auto">
                Plan Your Adventure
              </Link>
            </div>
          </motion.div>

          <motion.div className="hidden lg:block hero-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">Travel Dashboard</p>
                <h2 className="mt-4 text-3xl font-heading font-bold text-neutral-950 dark:text-white">Journey metrics</h2>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary-700">Top rated</div>
            </div>

            <div className="mt-10 grid gap-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`rounded-xl glass-effect p-5 transition duration-300 ${activeStat === index ? 'ring-2 ring-primary-saffron/50 bg-primary-saffron/5' : ''}`}>
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                  <p className="mt-3 text-3xl font-heading font-bold text-neutral-950 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <motion.div key={feature.title} className="card-surface" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-700">
                <feature.icon size={24} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="absolute inset-x-0 bottom-10 flex justify-center" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 text-neutral-950 shadow-soft backdrop-blur-xl dark:bg-neutral-900/40 dark:text-white">
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  );
}
