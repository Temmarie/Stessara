'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Full-width BTS lifestyle card that breaks up the Featured grid.
 * Used after every 2 bags as per the brief.
 */
export default function BTSCard({ image, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[21/9] md:aspect-[24/9] bg-cream overflow-hidden"
    >
      {image && (
        <Image
          src="/img/garden-tote.png"
          alt="Behind the scenes at STESSARA, Lagos — handmade bead bags being crafted"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
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
