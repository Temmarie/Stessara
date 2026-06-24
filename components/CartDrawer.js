'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatNGN } from '@/data/bags';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-paper
                       flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h2 className="font-display text-2xl tracking-title-luxe uppercase text-ink">
                Your Bag
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 hover:text-crimson transition-colors duration-700 ease-silk"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <p className="font-script text-rose text-3xl mb-3">Your bag is empty</p>
                  <p className="text-ink/60 mb-8 max-w-xs">
                    Begin with a piece from the Petal or Bloom collection.
                  </p>
                  <Link
                    href="/collections/petal"
                    onClick={closeCart}
                    className="btn-crimson"
                  >
                    Shop collections
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-cream flex-shrink-0 overflow-hidden">
                        {it.image && (
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-script text-rose text-lg truncate">{it.name}</p>
                        {it.variant && (
                          <p className="text-xs text-ink/60 uppercase tracking-wide-luxe mt-0.5">
                            {it.variant.name}
                          </p>
                        )}
                        <p className="text-sm text-ink mt-1">{it.priceLabel}</p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-ink/15">
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, it.qty - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center
                                         hover:bg-ink hover:text-paper
                                         transition-colors duration-700 ease-silk"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-8 text-center text-sm">{it.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, it.qty + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center
                                         hover:bg-ink hover:text-paper
                                         transition-colors duration-700 ease-silk"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            aria-label={`Remove ${it.name}`}
                            className="p-2 text-ink/50 hover:text-crimson
                                       transition-colors duration-700 ease-silk"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5 space-y-4 bg-cream">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm uppercase tracking-wide-luxe text-ink/70">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {formatNGN(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-crimson w-full"
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full text-center text-xs uppercase tracking-wide-luxe
                             text-ink/60 hover:text-ink py-2
                             transition-colors duration-700 ease-silk"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
