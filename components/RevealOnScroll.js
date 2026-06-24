'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wraps children in a slow fade-up that fires once when the section scrolls into view.
 * Honours `prefers-reduced-motion` via Framer Motion's built-in handling.
 */
export default function RevealOnScroll({ children, delay = 0, y = 24, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
