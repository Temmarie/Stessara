import { notFound } from 'next/navigation';
import CollectionPage from '@/components/CollectionPage';
import { COLLECTIONS, STESSARA01_BAGS } from '@/data/bags';

export const metadata = {
  title: 'Stessara Collection — STESSARA',
  description: 'Floral, soft, functional bead bags from the STESSARA 0\'1 Collection.',
};


export default function PetalCollectionPage() {
  const collection = COLLECTIONS.find((c) => c.slug === 'stessara01');
  if (!collection) notFound();
  return <CollectionPage collection={collection} bags={STESSARA01_BAGS} />;
}
