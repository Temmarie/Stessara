'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { formatNGN } from '@/data/bags';

const CartContext = createContext(null);

const STORAGE_KEY = 'stessara_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('no-scroll', isOpen);
  }, [isOpen]);

  const addItem = useCallback((bag, variant, qty = 1) => {
    setItems((prev) => {
      const id = `${bag.slug}__${variant?.id ?? 'default'}`;
      const existing = prev.find((it) => it.id === id);
      if (existing) {
        return prev.map((it) =>
          it.id === id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [
        ...prev,
        {
          id,
          slug: bag.slug,
          name: bag.name,
          price: bag.price,
          priceLabel: formatNGN(bag.price),
          image: variant?.image ?? bag.photos?.[0],
          variant: variant ? { id: variant.id, name: variant.name, hex: variant.hex } : null,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, qty } : it))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const count    = items.reduce((s, it) => s + it.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items, subtotal, count,
        isOpen, openCart, closeCart, toggleCart,
        addItem, updateQty, removeItem, clear,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
