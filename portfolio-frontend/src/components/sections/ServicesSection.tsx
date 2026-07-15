'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Service } from '@/types';

interface Props {
  data: Service[];
  label?: string;
  heading?: string;
}

export default function ServicesSection({ data, label, heading }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="domains"
      ref={ref}
      style={{
        background: 'var(--surface)',
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(50px, 10vw, 100px) clamp(20px, 6vw, 80px)',
        minHeight: '80vh',
        overflow: 'hidden',
        borderTop: '1px solid rgba(81,246,218,0.1)',
      }}
    >
      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            color: 'var(--blue)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {label}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 40,
            color: 'var(--white)',
          }}
        >
          {heading}
        </motion.h2>

        <div>
          {data.map((service, i) => (
            <motion.div
              key={service.documentId}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setHovered(service.documentId)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: '1px solid rgba(81,246,218,0.12)',
                padding: '28px 0',
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                gap: 20,
                cursor: 'default',
              }}
            >
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color:
                    hovered === service.documentId
                      ? 'var(--blue)'
                      : 'rgba(81,246,218,0.12)',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  textShadow:
                    hovered === service.documentId
                      ? '0 0 18px rgba(81,246,218,0.35)'
                      : 'none',
                }}
              >
                {service.number}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                    fontWeight: 600,
                    color: 'var(--white)',
                    marginBottom: 8,
                  }}
                >
                  {service.name}
                </div>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'var(--muted)',
                    maxWidth: 640,
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
