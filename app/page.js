import Hero from '@/components/Hero';
import FeaturedPieces from '@/components/FeaturedPieces';
import CollectionsSection from '@/components/CollectionsSection';
import CustomOrderSection from '@/components/CustomOrderSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPieces />
      <CollectionsSection />
      <CustomOrderSection />
    </>
  );
}
