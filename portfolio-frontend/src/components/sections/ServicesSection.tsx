'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Service } from '@/types';

interface Props {
  data: Service[];
}

export default function ServicesSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        background: '#FFFFFF',
        borderRadius: '48px 48px 0 0',
        marginTop: '-40px',
        position: 'relative',
        zIndex: 2,
        padding: '100px 80px',
        minHeight: '80vh',
      }}
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'rgba(10,10,10,0.4)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        05 · WHAT I BUILD
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '60px',
        }}
      >
        SERVICES
      </motion.h2>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {data.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderTop: '1px solid rgba(10,10,10,0.1)',
              padding: '32px 0',
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
              cursor: 'default',
            }}
          >
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 7rem)',
                fontWeight: 700,
                color: hovered === service.id ? 'var(--green)' : 'rgba(10,10,10,0.06)',
                lineHeight: 1,
                transition: 'color 0.2s',
                minWidth: '80px',
              }}
            >
              {service.number}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '8px',
                  transform: hovered === service.id ? 'translateX(8px)' : 'translateX(0)',
                  transition: 'transform 0.2s',
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                }}
              >
                {service.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
