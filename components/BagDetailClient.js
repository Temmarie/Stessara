'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

import { useCart } from './CartProvider';
import { formatNGN } from '@/data/bags';
import { waLink, bagMessage } from '@/lib/whatsapp';

export default function BagDetailClient({ bag }) {
  // ------------------------------------------------------------
  // Initial variant
  // ------------------------------------------------------------

  const initial = bag.variants?.[0];

  const [variant, setVariant] = useState(initial);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();

  // ------------------------------------------------------------
  // Product images
  //
  // New structure:
  // variant.images = [front, back, side, inside]
  //
  // Fallbacks keep your existing data working:
  // variant.image
  // bag.photos
  // ------------------------------------------------------------

  const images = variant?.images?.length
    ? variant.images
    : variant?.image
      ? [variant.image]
      : bag.photos ?? [];

  // ------------------------------------------------------------
  // Colour selection
  //
  // When the colour changes, return the gallery to the
  // first image of that colour.
  // ------------------------------------------------------------

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    setActiveImage(0);
  };

  // ------------------------------------------------------------
  // Safety fallback
  //
  // Prevents an invalid image index if a variant has fewer
  // images than the previous variant.
  // ------------------------------------------------------------

  const currentImage = images[activeImage] ?? images[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

      {/* ========================================================
          PRODUCT GALLERY
          ======================================================== */}

      <div className="flex flex-col md:flex-row gap-4">

        {/* ------------------------------------------------------
            Thumbnail Gallery
            Desktop: vertical
            Mobile: horizontal
            ------------------------------------------------------ */}

        {images.length > 1 && (
          <div
            className="
              order-2 md:order-1
              flex md:flex-col
              gap-3
              overflow-x-auto md:overflow-visible
              md:w-20
              shrink-0
              pb-2 md:pb-0
            "
          >
            {images.map((image, index) => {
              const active = index === activeImage;

              return (
                <button
                  key={`${variant?.id}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View ${
                    variant?.name ?? ''
                  } image ${index + 1}`}
                  aria-pressed={active}
                  className={`
                    relative
                    w-16 h-20
                    md:w-20 md:h-24
                    shrink-0
                    overflow-hidden
                    bg-cream
                    transition-all duration-500 ease-silk
                    ${
                      active
                        ? 'ring-2 ring-crimson ring-offset-2 ring-offset-paper'
                        : 'opacity-70 hover:opacity-100'
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt={`${bag.name} ${
                      variant?.name ?? ''
                    } view ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* ------------------------------------------------------
            Main Product Image
            ------------------------------------------------------ */}

        <div
          className="
            order-1 md:order-2
            relative
            aspect-[4/5]
            bg-cream
            overflow-hidden
            flex-1
          "
        >
          {currentImage && (
            <AnimatePresence mode="sync">
              <motion.div
                key={`${variant?.id}-${activeImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage}
                  alt={`${bag.name} in ${
                    variant?.name ?? 'default'
                  } — view ${activeImage + 1} — STESSARA`}
                  fill
                  priority={activeImage === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* ----------------------------------------------------
              Image Counter
              ---------------------------------------------------- */}

          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 z-10">
              <span
                className="
                  inline-flex
                  items-center
                  px-3 py-1.5
                  bg-paper/90
                  backdrop-blur-sm
                  text-[10px]
                  uppercase
                  tracking-wide-luxe
                  text-ink/70
                "
              >
                {activeImage + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          PRODUCT DETAILS
          ======================================================== */}

      <div className="lg:py-6">

        {/* Collection */}

        <p className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-3">
          {bag.collection === 'petal'
            ? 'Petal Collection'
            : 'Stessara 0\'1 Collection'}
        </p>

        {/* Product Name */}

        <h1 className="font-script text-rose text-5xl md:text-6xl lg:text-7xl mb-4 leading-[0.95]">
          {bag.name}
        </h1>

        {/* Tagline */}

        <p className="font-display text-ink/80 text-lg md:text-xl tracking-wide mb-8 max-w-md">
          {bag.tagline}
        </p>

        {/* Price */}

        <p className="font-display text-3xl md:text-4xl text-ink mb-10">
          {formatNGN(bag.price)}
        </p>

        {/* Description */}

        <p className="text-ink/80 leading-relaxed mb-10 max-w-prose">
          {bag.description}
        </p>

        {/* ======================================================
            COLOUR VARIANTS
            ====================================================== */}

        {bag.variants?.length > 0 && (
          <div className="mb-10">

            <p className="text-xs uppercase tracking-wide-luxe text-ink/60 mb-4">
              Colour —{' '}
              <span className="text-ink">
                {variant?.name}
              </span>
            </p>

            <div className="flex flex-wrap gap-3">

              {bag.variants.map((v) => {
                const active = v.id === variant?.id;

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleVariantChange(v)}
                    aria-pressed={active}
                    aria-label={`Select colour: ${v.name}`}
                    className={`
                      relative
                      w-10 h-10
                      rounded-full
                      transition-all duration-700 ease-silk
                      ${
                        active
                          ? 'ring-2 ring-offset-2 ring-crimson ring-offset-paper scale-110'
                          : 'hover:scale-105'
                      }
                    `}
                    style={{
                      backgroundColor: v.hex,
                    }}
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-ink/10
                        pointer-events-none
                      "
                    />
                  </button>
                );
              })}

            </div>
          </div>
        )}

        {/* ======================================================
            PRODUCT SPECS
            ====================================================== */}

        <dl
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-y-4
            gap-x-8
            mb-10
            border-t
            border-b
            border-ink/10
            py-6
          "
        >
          <Spec
            label="Material"
            value={bag.material}
          />

          <Spec
            label="Dimensions"
            value={bag.dimensions}
          />

          <Spec
            label="Care"
            value={bag.care}
          />

          <Spec
            label="Delivery"
            value={bag.delivery}
          />
        </dl>

        {/* ======================================================
            CALL TO ACTIONS
            ====================================================== */}

        <div className="flex flex-col sm:flex-row gap-4">

          {/* Add to Cart */}

          <button
            type="button"
            onClick={() => addItem(bag, variant)}
            className="btn-crimson flex-1 sm:flex-none"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.5}
            />

            Add to Cart
          </button>

          {/* WhatsApp */}

          <a
            href={waLink(
              bagMessage({
                bag,
                variant,
                price: formatNGN(bag.price),
              })
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-none"
          >
            Send to WhatsApp
          </a>

        </div>

        {/* ======================================================
            BACK TO COLLECTION
            ====================================================== */}

        <Link
          href={`/collections/${bag.collection}`}
          className="
            inline-block
            mt-10
            text-xs
            uppercase
            tracking-wide-luxe
            text-ink/60
            hover:text-crimson
            transition-colors
            duration-700
            ease-silk
          "
        >
          ← Back to{' '}
          {bag.collection === 'petal'
            ? 'Petal'
            : 'Stessara 0\'1'}{' '}
          Collection
        </Link>

      </div>
    </div>
  );
}

/* ==============================================================
   SPEC COMPONENT
   ============================================================== */

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide-luxe text-ink/50 mb-1">
        {label}
      </dt>

      <dd className="text-sm text-ink/80">
        {value}
      </dd>
    </div>
  );
}
