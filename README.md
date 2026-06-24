# STESSARA — Handmade Bead Bags

A chic, feminine e-commerce MVP for STESSARA, a handmade bead bag brand based in Lagos, Nigeria.

## Tech stack

- **Next.js 14** (App Router) — JavaScript (no TypeScript)
- **Tailwind CSS** with a custom STESSARA palette
- **Framer Motion** for component transitions + scroll-triggered reveals
- **GSAP** for the hero Ken Burns animation
- **Lucide React** for icons
- **next/font** with Cormorant Garamond (Tan Nimbus substitute) and Playfair Display italic (Romie Italics substitute)
- **Satoshi** loaded from Fontshare via CSS `@import`

> The brand fonts (Tan Nimbus, Romie Italics) are paid. The MVP uses the closest free substitutes that capture the same vibe. To use the originals, swap the imports in `app/layout.js` and `app/globals.css`.

## Brand palette

| Token     | Hex       | Use                                       |
| --------- | --------- | ----------------------------------------- |
| `crimson` | `#980002` | CTAs, section titles, 10% off buttons     |
| `rose`    | `#E97197` | Collection + bag names, decorative accent |
| `ink`     | `#000000` | Header/footer background, body text       |
| `paper`   | `#FFFFFF` | Main background                           |
| `cream`   | `#FAF7F5` | Subtle section contrast                   |

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Pages

| Route                     | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `/`                       | Hero slideshow, Featured Pieces (with BTS interludes), Collections, Custom Order CTA |
| `/collections/petal`      | Petal Collection — all floral / soft pieces                     |
| `/collections/bloom`      | Bloom Collection — all bold / dark pieces                       |
| `/bags/[slug]`            | Bag detail with colour-variant crossfade + WhatsApp share       |
| `/custom-order`           | Full custom-order form                                          |
| `/checkout`               | Two-step checkout — delivery details, then bank transfer       |

## Components

| Component                  | Purpose                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `Header`                   | Sticky black header with cart count, mobile hamburger menu    |
| `Footer`                   | Black footer with social icons that turn pink on hover        |
| `Hero`                     | 3-slide auto-rotating hero with Ken Burns + hover gradient    |
| `FeaturedPieces`           | 4-bag grid with BTS cards inserted after every 2 bags         |
| `CollectionsSection`       | Two large collection covers (Petal / Bloom)                   |
| `CustomOrderSection`       | Custom-order form (posts to WhatsApp)                         |
| `BagCard` / `BTSCard`      | Reusable bag & BTS cards                                      |
| `CollectionPage`           | Shared shell for `/collections/petal` and `/collections/bloom`|
| `BagDetailClient`          | Colour-variant crossfade + Add-to-Cart + WhatsApp CTA         |
| `CartProvider` (context)   | Cart state with localStorage persistence                       |
| `CartDrawer`               | Slide-out cart drawer                                         |
| `DiscountModal`            | First-visit 10%-off modal (dismissal in localStorage)          |
| `RevealOnScroll`           | Framer Motion `useInView` wrapper for section title fade-ins  |

## WhatsApp flow

All "send to WhatsApp" buttons route through `lib/whatsapp.js`, which builds a `wa.me/{number}?text=` URL with a prefilled, formatted message. To wire to the real number, replace `WHATSAPP_NUMBER` in that file.

## Sample data

Bag catalogue is in `data/bags.js`. Replace photo URLs with real product photography once available — every bag has a main image and 3–4 colour variants.

## What's intentionally an MVP

- No payment gateway — checkout collects delivery details then shows bank account for transfer
- No real auth / order history
- No CMS — bag data is hardcoded
- No image upload server (the custom-order reference image name is captured but not uploaded)
