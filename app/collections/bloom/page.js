import { notFound } from 'next/navigation';
import CollectionPage from '@/components/CollectionPage';
import { COLLECTIONS, BLOOM_BAGS } from '@/data/bags';

export const metadata = {
  title: 'Bloom Collection — STESSARA',
  description: 'Bold, dark, unapologetic bead bags from the STESSARA Bloom Collection.',
};

export default function BloomCollectionPage() {
  const collection = COLLECTIONS.find((c) => c.slug === 'bloom');
  if (!collection) notFound();
  return <CollectionPage collection={collection} bags={BLOOM_BAGS} />;
}
