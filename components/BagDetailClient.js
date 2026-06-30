'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatNGN } from '@/data/bags';
import { waLink, bagMessage } from '@/lib/whatsapp';

export default function BagDetailClient({ bag }) {
  const initial = bag.variants?.[0];
  const [variant, setVariant] = useState(initial);
  const { addItem } = useCart();

  console.log("Variant image:", variant?.image);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

      {/* Image gallery — single hero image with crossfade on variant change */}
      <div className="relative aspect-[4/5] bg-cream overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={variant?.id ?? 'default'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={variant?.image ?? bag.photos[0]}
              alt={`${bag.name} in ${variant?.name ?? 'default'} — STESSARA`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Details */}
      <div className="lg:py-6">
        <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
          {bag.collection === 'petal' ? 'Petal Collection' : 'Stessara 0\'1 Collection'}
        </p>

        <h1 className="font-script text-rose text-5xl md:text-6xl lg:text-7xl mb-4 leading-[0.95]">
          {bag.name}
        </h1>

        <p className="font-display text-ink/80 text-lg md:text-xl tracking-wide mb-8 max-w-md">
          {bag.tagline}
        </p>

        {/* Price */}
        <p className="font-display text-3xl md:text-4xl text-ink mb-10">
          {formatNGN(bag.price)}
        </p>

        {/* Description */}
        <p className="text-ink/80 leading-relaxed mb-10 max-w-prose">
          {bag.description}
        </p>

        {/* Colour variants */}
        {bag.variants?.length > 0 && (
          <div className="mb-10">
            <p className="text-xs uppercase tracking-wide-luxe text-ink/60 mb-4">
              Colour — <span className="text-ink">{variant?.name}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {bag.variants.map((v) => {
                const active = v.id === variant?.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariant(v)}
                    aria-pressed={active}
                    aria-label={`Select colour: ${v.name}`}
                    className={`relative w-10 h-10 rounded-full transition-all duration-700 ease-silk
                                ${active ? 'ring-2 ring-offset-2 ring-crimson ring-offset-paper scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: v.hex }}
                  >
                    <span className="absolute inset-0 rounded-full border border-ink/10 pointer-events-none" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Specs */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10
                       border-t border-b border-ink/10 py-6">
          <Spec label="Material"   value={bag.material} />
          <Spec label="Dimensions" value={bag.dimensions} />
          <Spec label="Care"       value={bag.care} />
          <Spec label="Delivery"   value={bag.delivery} />
        </dl>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => addItem(bag, variant)}
            className="btn-crimson flex-1 sm:flex-none"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            Add to Cart
          </button>
          <a
            href={waLink(
              bagMessage({ bag, variant, price: formatNGN(bag.price) })
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-none"
          >
            Send to WhatsApp
          </a>
        </div>

        {/* Back link */}
        <Link
          href={`/collections/${bag.collection}`}
          className="inline-block mt-10 text-xs uppercase tracking-wide-luxe
                     text-ink/60 hover:text-crimson
                     transition-colors duration-700 ease-silk"
        >
          ← Back to {bag.collection === 'petal' ? 'Petal' : 'Stessara 0\'1'} Collection 
        </Link>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide-luxe text-ink/50 mb-1">{label}</dt>
      <dd className="text-sm text-ink/85">{value}</dd>
    </div>
  );
}
