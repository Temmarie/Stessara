'use client';

import Link from 'next/link';
import { Instagram, Twitter } from 'lucide-react';

// TikTok isn't in Lucide — inline SVG
const TikTokIcon = ({ size = 18, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-ink text-paper" id="contact">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-20 pb-10">

        {/* Tagline */}
        <p className="font-display text-center text-3xl md:text-5xl tracking-title-luxe
                      text-paper mb-16 md:mb-20">
          For those who love to stand out
        </p>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-16">

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-5">
              Contact us
            </h3>
            <ul className="space-y-2 text-paper/80">
              <li>
                <a
                  href="mailto:hello@stessara.co"
                  className="hover:text-paper transition-colors duration-700 ease-silk"
                >
                  hello@stessara.co
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348000000000"
                  className="hover:text-paper transition-colors duration-700 ease-silk"
                >
                  +234 800 000 0000
                </a>
              </li>
              <li className="text-paper/60 text-sm mt-3">Lagos, Nigeria</li>
            </ul>
          </div>

          {/* Order */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-5">
              My order
            </h3>
            <ul className="space-y-2 text-paper/80">
              <li>
                <Link
                  href="/custom-order"
                  className="hover:text-paper transition-colors duration-700 ease-silk"
                >
                  Custom order
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-paper transition-colors duration-700 ease-silk"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/petal"
                  className="hover:text-paper transition-colors duration-700 ease-silk"
                >
                  Shop collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-wide-luxe text-rose mb-5">
              Follow
            </h3>
            <ul className="flex items-center gap-5">
              {[
                { label: 'Instagram', href: 'https://instagram.com/stessara', Icon: Instagram },
                { label: 'TikTok',    href: 'https://tiktok.com/@stessara',   Icon: TikTokIcon },
                { label: 'X',         href: 'https://x.com/stessara',         Icon: Twitter },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex p-2 text-paper/80 hover:text-rose
                               transition-colors duration-700 ease-silk"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-paper/10">
          <p className="text-center text-paper/60 text-xs tracking-wide-luxe uppercase">
            Every piece is handmade in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
