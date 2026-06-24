'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HERO_SLIDES } from '@/data/bags';

const DISMISSED_KEY = 'stessara_discount_modal_dismissed_v1';

export default function DiscountModal() {
  const [open, setOpen] = useState(false);
  // Featured bag for the modal — the Petals Clutch if present
  const featuredBag =
    HERO_SLIDES.find((b) => b.slug === 'petals-clutch') ?? HERO_SLIDES[0];
  const modalImage = featuredBag?.photos?.[0];

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const dismissed = localStorage.getItem(DISMISSED_KEY);
      if (dismissed) return;
      // small delay so it doesn't fight the hero animation
      const t = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(t);
    } catch {}
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(DISMISSED_KEY, '1'); } catch {}
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-labelledby="discount-modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto bg-paper max-w-3xl w-full grid grid-cols-1 md:grid-cols-2
                            shadow-2xl relative overflow-hidden">

              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute top-3 right-3 z-10 p-2 bg-paper/80 backdrop-blur
                           hover:text-crimson transition-colors duration-700 ease-silk"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {/* Image */}
              <div className="relative aspect-square md:aspect-auto bg-cream">
                {modalImage && (
                  <Image
                    src={modalImage}
                    alt={featuredBag?.name ?? 'STESSARA'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center px-8 py-10 md:py-14 md:px-12">
                <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-4">
                  Welcome to STESSARA
                </p>
                <h2
                  id="discount-modal-title"
                  className="font-display text-3xl md:text-4xl text-crimson
                             tracking-title-luxe uppercase leading-tight mb-5"
                >
                  10% off your first order on the website
                </h2>
                <p className="text-ink/70 mb-8 leading-relaxed">
                  Begin with our signature piece, the {featuredBag?.name ?? 'Petals Clutch'} —
                  handmade in Lagos, designed for the ones who love to stand out.
                </p>
                <Link
                  href={`/bags/${featuredBag?.slug ?? 'petals-clutch'}`}
                  onClick={dismiss}
                  className="btn-crimson self-start"
                >
                  Claim Discount
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
