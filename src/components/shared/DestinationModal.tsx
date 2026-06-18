import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, StarHalf, MapPin, Image as ImageIcon, Bed } from 'lucide-react';
import { Destination } from '@/data/destinations';
import { downloadPDF } from '@/utils/pdfGenerator';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-brand-saffron">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={18} fill="currentColor" />
      ))}
      {halfStar && <StarHalf key="half" size={18} fill="currentColor" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={18} className="text-neutral-300 dark:text-neutral-600" />
      ))}
    </div>
  );
};

export default function DestinationModal({ destination, isOpen, onClose }: DestinationModalProps) {
  const [detailedText, setDetailedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fetch detailed info
  useEffect(() => {
    if (isOpen && destination) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setDetailedText('');
        try {
          const query = `${destination.name} ${destination.state}`;
          const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=8&explaintext=1&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&origin=*`;
          
          const res = await fetch(url);
          const data = await res.json();
          
          if (data.query && data.query.pages) {
            let extract = (Object.values(data.query.pages)[0] as any).extract as string;
            // Clean up Wikipedia section headers like "== History =="
            extract = extract.replace(/==+.*?==+/g, '\n\n');
            setDetailedText(extract.trim());
          } else {
            setDetailedText(destination.description); // Fallback
          }
        } catch (error: any) {
          console.error('Failed to fetch destination details:', error);
          setDetailedText(destination.description); // Fallback
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchDetails();
    }
  }, [isOpen, destination]);

  const handleDownload = async () => {
    if (!destination || !modalRef.current) return;
    setIsDownloading(true);
    try {
      const modal = modalRef.current;
      // Temporarily hide the close/download buttons during capture
      const buttons = modal.querySelectorAll('.no-print');
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = 'none'));
      
      // Temporarily expand the modal fully to capture all text without cropping
      const originalMaxHeight = modal.style.maxHeight;
      modal.style.maxHeight = 'none';
      
      const textContainer = modal.querySelector('.custom-scrollbar') as HTMLElement;
      let originalTextOverflow = '';
      if (textContainer) {
        originalTextOverflow = textContainer.style.overflowY;
        textContainer.style.overflowY = 'visible';
      }

      // Wait a moment for the DOM to repaint at the new full height
      await new Promise(resolve => setTimeout(resolve, 150));

      await downloadPDF('destination-modal-content', destination.name);
      
      // Restore original styles
      modal.style.maxHeight = originalMaxHeight;
      if (textContainer) {
        textContainer.style.overflowY = originalTextOverflow;
      }

      // Restore buttons
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = ''));
    } catch (error) {
      console.error('Failed to download PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            id="destination-modal-content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl flex flex-col md:flex-row border border-border overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="no-print absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-neutral-100 dark:bg-neutral-900 shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${destination.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative bg-white dark:bg-zinc-950">
              
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-brand-saffron font-medium text-sm tracking-widest uppercase">
                  <MapPin size={16} />
                  <span>{destination.state}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                  {destination.name}
                </h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={destination.rating} />
                  <span className="text-sm font-semibold text-fg-secondary">
                    {destination.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>

              {/* Dynamic Text Section */}
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent="true">
                {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-11/12" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full mt-4" />
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-10/12" />
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    {detailedText.split('\n\n').map((paragraph, idx) => (
                      paragraph.trim() ? (
                        <p key={idx} className="text-base text-fg-secondary leading-relaxed mb-4">
                          {paragraph.trim()}
                        </p>
                      ) : null
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="no-print pt-6 mt-auto border-t border-border flex justify-end gap-3">
                <a
                  href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${destination.name} ${destination.state} India tourism`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View more images"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-brand-saffron border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <ImageIcon size={22} />
                </a>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(`best hotels in ${destination.name} ${destination.state}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Find best hotels"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-brand-saffron border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <Bed size={22} />
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.state}, India`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Map"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-brand-saffron border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <MapPin size={22} />
                </a>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading || isLoading}
                  title="Download Guide"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-brand-saffron to-brand-crimson text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Download size={22} className={isDownloading ? 'animate-bounce' : ''} />
                </button>
              </div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
