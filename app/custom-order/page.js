import CustomOrderSection from '@/components/CustomOrderSection';

export const metadata = {
  title: 'Custom Order — STESSARA',
  description: 'Designed by you. Handmade by us. Commission a bespoke bead bag from STESSARA Lagos.',
};

export default function CustomOrderPage() {
  return (
    <section className="bg-paper pt-12 md:pt-20">
      <CustomOrderSection />
    </section>
  );
}
