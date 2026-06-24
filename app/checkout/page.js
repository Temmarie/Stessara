'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { formatNGN } from '@/data/bags';
import { waLink, cartOrderMessage } from '@/lib/whatsapp';

// Bank account details — replace with real STESSARA account
const BANK = {
  accountName: 'STESSARA',
  accountNumber: '0000000000',
  bankName: 'GTBank',
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [customer, setCustomer] = useState({
    name: '', phone: '', address: '', city: '', state: '',
  });

  const canProceedStep1 =
    customer.name && customer.phone && customer.address && customer.city && customer.state;

  const sendToWhatsApp = () => {
    const message = cartOrderMessage({ items, customer });
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };

  if (items.length === 0 && !confirmed) {
    return (
      <section className="bg-paper py-24 md:py-32">
        <div className="max-w-md mx-auto px-5 text-center">
          <p className="font-script text-rose text-4xl mb-4">Your bag is empty</p>
          <p className="text-ink/60 mb-8">
            Add a piece to your bag before heading to checkout.
          </p>
          <Link href="/collections/petal" className="btn-crimson">
            Shop collections
          </Link>
        </div>
      </section>
    );
  }

  if (confirmed) {
    return (
      <section className="bg-paper py-24 md:py-32">
        <div className="max-w-md mx-auto px-5 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 mx-auto bg-crimson text-paper rounded-full flex items-center justify-center mb-8"
          >
            <Check size={28} strokeWidth={1.5} />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl text-crimson tracking-title-luxe uppercase mb-4">
            Order received
          </h1>
          <p className="text-ink/70 leading-relaxed mb-8">
            Thank you, {customer.name.split(' ')[0] || 'friend'}. We&apos;ve received your order and will
            confirm payment and delivery on WhatsApp within 24 hours.
          </p>
          <Link
            href="/"
            onClick={clear}
            className="btn-crimson"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-10">

        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
            Checkout
          </p>
          <h1 className="section-title text-4xl md:text-5xl">
            {step === 1 ? 'Delivery details' : 'Payment'}
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <StepDot active={step >= 1} label="1 — Delivery" />
          <span className="w-12 h-px bg-ink/20" />
          <StepDot active={step >= 2} label="2 — Payment" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">

          {/* Form area */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="form-input"
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="form-input"
                    placeholder="+234 …"
                  />
                </Field>
                <Field label="Delivery address" required className="md:col-span-2">
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="form-input"
                    placeholder="Street address"
                  />
                </Field>
                <Field label="City" required>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="form-input"
                    placeholder="Lagos"
                  />
                </Field>
                <Field label="State" required>
                  <input
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="form-input"
                    placeholder="Lagos"
                  />
                </Field>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="btn-crimson disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to payment
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="btn-whatsapp"
                  >
                    Send order via WhatsApp
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-cream p-8 md:p-10 mb-8">
                  <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-4">
                    Bank transfer
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-8">
                    Please transfer to:
                  </h2>
                  <dl className="space-y-4">
                    <BankRow label="Account name"   value={BANK.accountName} />
                    <BankRow label="Account number" value={BANK.accountNumber} />
                    <BankRow label="Bank"           value={BANK.bankName} />
                  </dl>
                  <p className="text-sm text-ink/60 mt-8 leading-relaxed">
                    Once your transfer is confirmed, click <strong>I have paid</strong> below.
                    We’ll send a confirmation and tracking info via WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmed(true);
                      clear();
                    }}
                    className="btn-crimson"
                  >
                    I have paid
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline"
                  >
                    <ArrowLeft size={14} strokeWidth={1.5} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    className="btn-whatsapp"
                  >
                    Send order via WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-cream p-6 md:p-8">
              <h3 className="font-display text-xl tracking-title-luxe uppercase text-ink mb-6">
                Your order
              </h3>
              <ul className="space-y-4 mb-6">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-3">
                    <div className="relative w-14 h-16 bg-paper flex-shrink-0 overflow-hidden">
                      {it.image && (
                        <Image src={it.image} alt={it.name} fill sizes="56px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-script text-rose text-base truncate">{it.name}</p>
                      {it.variant && (
                        <p className="text-[10px] uppercase tracking-wide-luxe text-ink/60">
                          {it.variant.name}
                        </p>
                      )}
                      <p className="text-xs text-ink/70">× {it.qty}</p>
                    </div>
                    <p className="text-sm text-ink whitespace-nowrap">
                      {formatNGN(it.price * it.qty)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-ink/10 pt-4 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wide-luxe text-ink/70">Subtotal</span>
                <span className="font-display text-2xl text-ink">{formatNGN(subtotal)}</span>
              </div>
              <p className="text-[11px] text-ink/50 mt-3 leading-relaxed">
                Shipping calculated and confirmed via WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.15);
          padding: 0.85rem 1rem;
          font-family: var(--font-satoshi), system-ui, sans-serif;
          font-size: 0.9rem;
          color: #000;
          transition: border-color 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        :global(.form-input:hover) { border-color: rgba(0, 0, 0, 0.4); }
        :global(.form-input:focus) {
          outline: none;
          border-color: #980002;
        }
      `}</style>
    </section>
  );
}

function StepDot({ active, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full transition-all duration-700 ease-silk
                    ${active ? 'bg-crimson scale-110' : 'bg-ink/20'}`}
      />
      <span className={`text-xs uppercase tracking-wide-luxe
                       ${active ? 'text-ink' : 'text-ink/40'}`}>
        {label}
      </span>
    </div>
  );
}

function Field({ label, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-wide-luxe text-ink/60 mb-2">
        {label} {required && <span className="text-crimson">*</span>}
      </span>
      {children}
    </label>
  );
}

function BankRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
      <dt className="text-xs uppercase tracking-wide-luxe text-ink/60">{label}</dt>
      <dd className="font-display text-xl text-ink">{value}</dd>
    </div>
  );
}




