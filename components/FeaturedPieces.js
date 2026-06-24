'use client';

import { FEATURED_BAGS, BTS_PHOTOS } from '@/data/bags';
import BagCard from './BagCard';
import BTSCard from './BTSCard';
import RevealOnScroll from './RevealOnScroll';

export default function FeaturedPieces() {
  return (
    <section
      className="bg-paper py-24 md:py-32"
      aria-labelledby="featured-title"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
            The Edit
          </p>

          <h2
            id="featured-title"
            className="section-title"
          >
            Featured Pieces
          </h2>
        </RevealOnScroll>

        {/* Featured Bags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {FEATURED_BAGS.map((bag, idx) => (
            <BagCard
              key={bag.slug}
              bag={bag}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* BTS Section */}
        <div className="mt-20">
          <BTSCard
            image={BTS_PHOTOS[0]}
            index={0}
          />
        </div>
      </div>
    </section>
  );
}