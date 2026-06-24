'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '@/data/bags';

const ROTATE_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const kenRef = useRef(null);

  const slide = HERO_SLIDES[index];

  // Auto-rotate
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  // Ken Burns on each slide change (slow zoom + drift)
  useEffect(() => {
    if (!kenRef.current) return;
    gsap.fromTo(
      kenRef.current,
      { scale: 1, x: 0, y: 0 },
      {
        scale: 1.08,
        x: '-1.5%',
        y: '-1%',
        duration: ROTATE_MS / 1000,
        ease: 'power1.out',
      }
    );
  }, [index]);

  if (!slide) return null;

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-ink"
      aria-label="Hero"
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Image — gets the Ken Burns treatment via the ref */}
          <div ref={kenRef} className="absolute inset-0 will-change-transform">
            <Image
              src={slide.photos[0]}
              alt={`${slide.name} — STESSARA`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Dark gradient — fades to 10% on hover */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 hero-gradient ${revealed ? 'is-revealed' : ''}`}
          />

          {/* Text overlay — bottom-left */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="max-w-7xl mx-auto w-full px-5 md:px-10 pb-16 md:pb-24 pointer-events-auto">
              <motion.div
                key={`text-${slide.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="max-w-xl"
              >
                <p className="font-sans text-xs uppercase tracking-wide-luxe text-paper/80 mb-3">
                  {slide.tagline}
                </p>
                <h1 className="font-script text-rose text-5xl md:text-7xl lg:text-8xl
                               leading-[0.95] mb-8">
                  {slide.name}
                </h1>
                <Link href={`/bags/${slide.slug}`} className="btn-crimson">
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${s.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className="group relative p-1"
          >
            <span
              className={`block h-1.5 transition-all duration-700 ease-silk
                          ${i === index ? 'w-10 bg-paper' : 'w-4 bg-paper/50 group-hover:bg-paper/80'}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
