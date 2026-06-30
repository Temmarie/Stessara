'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from './CartProvider';

const NAV = [
  { href: '/',             label: 'Home' },
  { href: '/collections/stessara01', label: 'Collections' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/#contact',     label: 'Contact' },
]; 

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-ink text-paper transition-all duration-700 ease-silk
                  ${scrolled ? 'shadow-[0_2px_30px_-10px_rgba(0,0,0,0.5)]' : ''}`}
    >
<div className="max-w-7xl mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
  {/* Logo Wrapper */}
  <Link
    href="/"
    aria-label="STESSARA home"
    className="relative flex items-center group shrink-0 h-auto"
  >
    {/* Original Logo */}
    <Image
      src="/img/logostess.png"
      alt="STESSARA logo"
      width={300} 
      height={80} 
      priority
      className="w-[180px] md:w-[200px] h-auto transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
    />

    {/* Rose Logo */}
    <Image
      src="/img/logostess-rose.png"
      alt=""
      width={300} 
      height={80} 
      priority
      aria-hidden="true"
      className="absolute top-0 left-0 w-[180px] md:w-[200px] h-auto transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
    />
  </Link>






        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
          {NAV.map((n) => {
            const isActive = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative font-sans text-xs uppercase tracking-wide-luxe py-2
                            transition-colors duration-700 ease-silk
                            ${isActive ? 'text-rose' : 'text-paper hover:text-rose'}`}
              >
                {n.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-rose"
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className="relative p-2 hover:text-rose transition-colors duration-700 ease-silk"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                             bg-crimson text-paper text-[10px] font-medium
                             flex items-center justify-center rounded-full"
                  aria-hidden="true"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 hover:text-rose transition-colors duration-700 ease-silk"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-paper/10 bg-ink"
            aria-label="Mobile"
          >
            <ul className="flex flex-col py-4">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block px-6 py-3 font-sans text-sm uppercase tracking-wide-luxe
                               text-paper hover:text-rose hover:bg-paper/5
                               transition-colors duration-700 ease-silk"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
