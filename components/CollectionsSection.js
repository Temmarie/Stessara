'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/bags';
import RevealOnScroll from './RevealOnScroll';

export default function CollectionsSection() {
  return (
    <section className="bg-cream py-24 md:py-32" aria-labelledby="collections-title">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
            Two worlds, one craft
          </p>
          <h2 id="collections-title" className="section-title">
            Collections
          </h2>
        </RevealOnScroll>

<div className="max-w-7xl mx-auto"> {/* Centered and narrowed the container */}
  {COLLECTIONS.map((c, i) => (
    <RevealOnScroll key={c.slug} delay={i * 0.15}>
      <Link
        href={`/collections/${c.slug}`}
        className="group block relative w-full h-[450px] md:h-[500px] overflow-hidden bg-paper hover-lift rounded-sm"
      >
        {/* 1. Background Image (Placed first) */}
        <Image
          src={c.coverImage}
          alt={`${c.name} — STESSARA`}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-1000 ease-silk group-hover:scale-102"
        />

        {/* 2. Gradient Overlay (Middle layer - modified for an elegant side-to-bottom fade) */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink/80 via-ink/40 to-transparent z-10" />

        {/* 3. Content Overlay (Top layer) */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center items-start text-paper z-20">
          <div className="max-w-md"> {/* Restricts text width for readability */}
            <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
              {c.tagline}
            </p>
            <h3 className="font-script text-rose text-4xl md:text-6xl mb-4 tracking-wide">
              {c.name}
            </h3>
            <p className="text-paper/80 text-sm md:text-base mb-8 leading-relaxed">
              {c.description}
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wide-luxe text-paper group-hover:text-rose transition-colors duration-700 ease-silk border-b border-paper/20 pb-1 group-hover:border-rose">
              View Collection
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-700 ease-silk group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  ))}
</div>

      </div>
    </section>
  );
}
