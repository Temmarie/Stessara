import { notFound } from 'next/navigation';
import Link from 'next/link';
import BagDetailClient from '@/components/BagDetailClient';
import BagCard from '@/components/BagCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import { BAGS, getBagBySlug } from '@/data/bags';

// Statically generate every bag page at build time
export function generateStaticParams() {
  return BAGS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const bag = getBagBySlug(params.slug);
  if (!bag) return { title: 'STESSARA' };
  return {
    title: `${bag.name} — STESSARA`,
    description: bag.tagline,
  };
}

export default function BagDetailPage({ params }) {
  const bag = getBagBySlug(params.slug);
  if (!bag) notFound();

  // 3 more from the same collection to suggest
  const more = BAGS
    .filter((b) => b.collection === bag.collection && b.slug !== bag.slug)
    .slice(0, 3);

  return (
    <>
      <section className="bg-paper py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <BagDetailClient bag={bag} />
        </div>
      </section>

      {/* You might also like */}
      {more.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <RevealOnScroll className="text-center mb-12">
              <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
                From the same collection
              </p>
              <h2 className="section-title text-3xl md:text-4xl">
                You might also like
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
              {more.map((b, i) => (
                <BagCard key={b.slug} bag={b} priority={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
