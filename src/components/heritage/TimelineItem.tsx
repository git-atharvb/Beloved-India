import { motion } from 'framer-motion';
import { HeritageItem as HeritageItemType } from '@/data/heritage';
import clsx from 'clsx';

interface TimelineItemProps {
  item: HeritageItemType;
  isLeft: boolean;
}

export default function TimelineItem({ item, isLeft }: TimelineItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="flex md:justify-between items-center w-full"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Desktop: Left Item */}
      <div className={clsx('hidden md:block w-5/12', { 'order-1': !isLeft, 'order-3': isLeft })}>
        <div
          className="rounded-lg shadow-lg bg-white dark:bg-neutral-800 p-4
                     hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
        >
          <div className="overflow-hidden rounded-md mb-3 h-40">
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${item.image}`}
            />
          </div>
          <h3 className="font-heading font-bold text-xl text-neutral-800 dark:text-neutral-100 mb-1">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-primary dark:text-primary-400 mb-2">
            {item.year} &bull; {item.location}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
        </div>
      </div>

      {/* Timeline Connector */}
      <div className="hidden md:flex justify-center w-1/12 order-2">
        <div className="w-1 h-1 bg-primary rounded-full" />
      </div>

      {/* Mobile: Single Column Item */}
      <div className="md:hidden w-full pl-8">
        <div
          className="rounded-lg shadow-lg bg-white dark:bg-neutral-800 p-4
                     hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
        >
          <div className="overflow-hidden rounded-md mb-3 h-40">
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110 ${item.image}`}
            />
          </div>
          <h3 className="font-heading font-bold text-xl text-neutral-800 dark:text-neutral-100 mb-1">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-primary dark:text-primary-400 mb-2">
            {item.year} &bull; {item.location}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}