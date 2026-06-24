import './globals.css';
import { Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import DiscountModal from '@/components/DiscountModal';

// Tan Nimbus (paid) → closest free substitute: Cormorant Garamond
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Romie Italics (paid) → closest free substitute: Playfair Display (italic)
const script = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-script',
  display: 'swap',
});

// Satoshi loads from Fontshare via globals.css @import
// (next/font doesn't host it; the @import gives us the CSS variables.)

export const metadata = {
  title: 'STESSARA — Handmade Bead Bags from Lagos',
  description:
    'STESSARA is a handmade bead bag brand from Lagos, Nigeria. Beaded clutches, totes and custom orders — designed for those who love to stand out.',
  openGraph: {
    title: 'STESSARA — Handmade Bead Bags',
    description: 'Designed for those who love to stand out.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <DiscountModal />
        </CartProvider>
      </body>
    </html>
  );
}
