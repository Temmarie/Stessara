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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {COLLECTIONS.map((c, i) => (
            <RevealOnScroll key={c.slug} delay={i * 0.15}>
              <Link
                href={`/collections/${c.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden bg-paper hover-lift"
              >


                {/* Gradient — bottom-up so text reads */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                      
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-paper">
                  <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-2">
                    {c.tagline}
                  </p>
                  <h3 className="font-script text-rose text-4xl md:text-5xl mb-4">
                    {c.name}
                  </h3>
                  <p className="text-paper/80 text-sm md:text-base max-w-xs mb-6 leading-relaxed">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-xs uppercase
                                   tracking-wide-luxe text-paper group-hover:text-rose
                                   transition-colors duration-700 ease-silk">
                    View Collection
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-700 ease-silk
                                 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
