'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { BTS_PHOTOS } from '@/data/bags';
import { waLink, customOrderMessage } from '@/lib/whatsapp';

const BAG_STYLES = [
  'Clutch',
  'Mini bag',
  'Tote',
  'Crossbody',
  'Bucket',
  'Pouch',
  'Something else',
];

const PALETTE = [
  { id: 'red',   label: 'Red',   hex: '#980002' },
  { id: 'pink',  label: 'Pink',  hex: '#E97197' },
  { id: 'white', label: 'White', hex: '#FFFFFF' },
  { id: 'black', label: 'Black', hex: '#0E0E0E' },
  { id: 'gold',  label: 'Gold',  hex: '#C9A86A' },
];

const OCCASIONS = [
  'Wedding',
  'Birthday',
  'Everyday',
  'Anniversary',
  'Bridal shower',
  'Just because',
];

export default function CustomOrderSection() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    style: '',
    palette: [],
    occasion: '',
    deadline: '',
    notes: '',
    referenceImageName: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const togglePalette = (id) => {
    setForm((f) => ({
      ...f,
      palette: f.palette.includes(id)
        ? f.palette.filter((p) => p !== id)
        : [...f.palette, id],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const message = customOrderMessage({
      name: form.name || '—',
      contact: form.contact || '—',
      style: form.style || '—',
      palette: form.palette.length ? form.palette : ['—'],
      occasion: form.occasion || '—',
      deadline: form.deadline || '—',
      notes: form.notes || '—',
    });
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section
      id="custom-order"
      className="bg-paper py-24 md:py-32"
      aria-labelledby="custom-order-title"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">



        {/* Inspiration photos */}
        {/* <RevealOnScroll>
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-16 md:mb-20">
            {BTS_PHOTOS.slice(0, 3).map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] bg-cream overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Custom-order inspiration ${i + 1} — STESSARA`}
                  fill
                  sizes="(max-width: 768px) 33vw, 30vw"
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </RevealOnScroll> */}

        {/* Header */}
        <RevealOnScroll className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
            Designed by you. Handmade by us.
          </p>
          <h2 id="custom-order-title" className="section-title mb-6">
            Custom Orders
          </h2>
          <p className="text-ink/70 leading-relaxed">
            Have a bag in mind that isn’t in the collection? Tell us about it —
            your preferred shape, palette, and occasion. We’ll come back with a quote
            within 48 hours.
          </p>
        </RevealOnScroll>

        {/* Form */}
        <RevealOnScroll>
          <form
            onSubmit={onSubmit}
            className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Field label="Name" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                placeholder="Your name"
              />
            </Field>

            <Field label="Email or phone" required>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="form-input"
                placeholder="hello@email.com  or  +234…"
              />
            </Field>

            <Field label="Preferred bag style">
              <select
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value })}
                className="form-input"
              >
                <option value="">Select a style…</option>
                {BAG_STYLES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Occasion">
              <select
                value={form.occasion}
                onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                className="form-input"
              >
                <option value="">Select an occasion…</option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>

            <Field label="Preferred colour palette" className="md:col-span-2">
              <div className="flex flex-wrap gap-3 mt-2">
                {PALETTE.map((p) => {
                  const active = form.palette.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePalette(p.id)}
                      aria-pressed={active}
                      aria-label={`${p.label}${active ? ' (selected)' : ''}`}
                      className={`group flex items-center gap-2 pl-1 pr-3 py-1 border
                                  transition-all duration-700 ease-silk
                                  ${active ? 'border-crimson bg-cream' : 'border-ink/15 hover:border-ink/40'}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-ink/15"
                        style={{ backgroundColor: p.hex }}
                        aria-hidden="true"
                      />
                      <span className="text-xs uppercase tracking-wide-luxe">
                        {p.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Deadline (if any)">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="form-input"
              />
            </Field>

            <Field label="Reference image (optional)">
              <label className="form-input flex items-center justify-between cursor-pointer
                                hover:border-ink/40 transition-colors duration-700 ease-silk">
                <span className={form.referenceImageName ? 'text-ink' : 'text-ink/40'}>
                  {form.referenceImageName || 'Upload an image'}
                </span>
                <span className="text-xs uppercase tracking-wide-luxe text-ink/60">
                  Browse
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      referenceImageName: e.target.files?.[0]?.name ?? '',
                    })
                  }
                />
              </label>
            </Field>

            <Field label="Notes / message" className="md:col-span-2">
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="form-input resize-none"
                placeholder="Tell us about your dream bag…"
              />
            </Field>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-crimson disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Opening WhatsApp…' : 'Send via WhatsApp'}
              </button>
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Chat with us directly
              </a>
            </div>
          </form>
        </RevealOnScroll>
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



