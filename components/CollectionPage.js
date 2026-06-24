'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BagCard from '@/components/BagCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { formatNGN } from '@/data/bags';

export default function CollectionPage({ collection, bags }) {

  return (
    <>
      {/* Hero cover */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-ink">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={collection.coverImage}
            alt={`${collection.name} — STESSARA`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-5 md:px-10 pb-12 md:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3"
            >
              {collection.tagline}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-script text-rose text-5xl md:text-7xl lg:text-8xl leading-[0.95]"
            >
              {collection.name}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-paper py-20 md:py-24 border-b border-ink/10">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <RevealOnScroll>
            <p className="font-display text-ink/85 text-xl md:text-2xl leading-relaxed tracking-wide">
              {collection.description}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bag grid */}
      <section className="bg-paper py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {bags.map((bag, i) => (
              <BagCard key={bag.slug} bag={bag} priority={i < 3} />
            ))}
          </div>

          {/* CTA */}
          <RevealOnScroll className="text-center mt-20 md:mt-28">
            <Link href="/custom-order" className="btn-outline">
              Request a custom piece
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
