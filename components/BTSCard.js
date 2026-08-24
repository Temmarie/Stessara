'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Array containing 4 BTS assets (mix of images and videos)
const BTS_MEDIA = [
  { type: 'image', src: '/img/garden-tote.png', alt: 'Handmade bead bags being crafted in Lagos' },
    { type: 'image', src: '/img/beads-cut.png', alt: 'STESSARA studio bead bowl and scissors' },
  { type: 'image', src: '/img/bts-pic.png', alt: 'STESSARA studio workshop details' },
    { type: 'image', src: '/img/brown-beads.png', alt: 'STESSARA studio brown bead' },
    { type: 'image', src: '/img/heart-strand.png', alt: 'STESSARA studio bead  ' },
   { type: 'image', src: '/img/beads-bowl.png', alt: 'STESSARA studio bead bowl' },
    { type: 'image', src: '/img/white-bloom-bts.png', alt: 'STESSARA studio bead  ' },
    { type: 'image', src: '/img/couer-bowl.png', alt: 'STESSARA studio bead  ' },
    { type: 'video', src: '/video/bts-weaving.mp4', alt: 'Artisan threading crystal beads close up' },

];

export default function BTSCard({ index = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BTS_MEDIA.length);
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const activeMedia = BTS_MEDIA[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[21/9] md:aspect-[24/9] bg-cream overflow-hidden"
    >
      {/* Media Slideshow Layer */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {activeMedia.type === 'video' ? (
              <video
                src={activeMedia.src}
                aria-label={activeMedia.alt}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={currentIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays and Text Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent z-10" />
      
      <div className="absolute inset-0 flex items-center px-8 md:px-16 z-20">
        <div className="max-w-md">
          <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
            Behind the scenes
          </p>
          <p className="font-display text-paper text-2xl md:text-4xl tracking-title-luxe uppercase leading-tight">
            Every bead, strung by hand — in Lagos
          </p>
        </div>
      </div>
    </motion.div>
  );
}
