import { notFound } from 'next/navigation';
import CollectionPage from '@/components/CollectionPage';
import { COLLECTIONS, PETAL_BAGS } from '@/data/bags';

export const metadata = {
  title: 'Stessara Collection — STESSARA',
  description: 'Floral, soft, romantic bead bags from the STESSARA 01 Collection.',
};

export default function PetalCollectionPage() {
  const collection = COLLECTIONS.find((c) => c.slug === 'petal');
  if (!collection) notFound();
  return <CollectionPage collection={collection} bags={PETAL_BAGS} />;
}
