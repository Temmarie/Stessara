'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatNGN } from '@/data/bags';

/**
 * Bag card with gentle hover zoom + soft shadow lift.
 * Optional `btsSlot` prop renders an alternate BTS card after every N cards.
 */
export default function BagCard({ bag, priority = false }) {
  const image = bag.photos?.[0];

  return (
    <Link
      href={`/bags/${bag.slug}`}
      className="group block hover-lift"
      aria-label={`View ${bag.name}`}
    >
      <div className="relative aspect-[4/5] bg-cream overflow-hidden mb-5">
        {image && (
          <Image
            src={image}
            alt={`${bag.name} — handmade bead bag from STESSARA`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 ease-silk
                       group-hover:scale-[1.04]"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
          />
        )}
      </div>
      <div className="flex items-baseline justify-between gap-4 px-1">
        <h3 className="font-script text-crimson text-2xl md:text-3xl">{bag.name}</h3>
        <p className="font-sans text-sm text-ink/70 whitespace-nowrap">
          {formatNGN(bag.price)}
        </p>
      </div>
      <p className="font-sans text-xs uppercase tracking-wide-luxe text-ink/50 mt-2 px-1">
        {bag.collection === 'petal' ? 'Petal Collection' : 'Bloom Collection'}
      </p>
    </Link>
  );
}
