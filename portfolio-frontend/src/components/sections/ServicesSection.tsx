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
        padding: 'clamp(32px, 5vw, 56px) clamp(20px, 6vw, 80px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,212,255,0.1)',
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
            fontSize: 'clamp(2rem, 7vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 12,
            color: 'var(--white)',
          }}
        >
          {heading}
        </motion.h2>
        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            color: 'rgba(226,232,240,0.55)',
            letterSpacing: '0.06em',
            marginBottom: 24,
            maxWidth: 480,
          }}
        >
          Domains I operate in — from silicon to software.
        </p>

        {/* Desktop: 2 columns. Mobile: 1 column — order stays 01|02 / 03|04 / 05 */}
        <div className="services-grid">
          {data.map((service, i) => (
            <motion.div
              key={service.documentId}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setHovered(service.documentId)}
              onMouseLeave={() => setHovered(null)}
              className={i === 4 && data.length === 5 ? 'services-grid-odd' : undefined}
              style={{
                border: `1px solid ${
                  hovered === service.documentId
                    ? 'rgba(0,212,255,0.4)'
                    : 'rgba(0,212,255,0.15)'
                }`,
                background:
                  hovered === service.documentId
                    ? 'rgba(0,212,255,0.04)'
                    : 'rgba(6,18,28,0.6)',
                padding: '16px 18px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
            >
              {/* Ghost number — large, right side watermark */}
              <div
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  fontWeight: 800,
                  color:
                    hovered === service.documentId
                      ? 'rgba(0,212,255,0.18)'
                      : 'rgba(0,212,255,0.09)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  transition: 'color 0.2s',
                  letterSpacing: '-0.04em',
                }}
              >
                {service.number}
              </div>

              {/* Service name */}
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: 700,
                  color:
                    hovered === service.documentId ? '#00D4FF' : 'var(--white)',
                  marginBottom: 8,
                  transition: 'color 0.2s',
                  paddingRight: 60,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {service.name}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: 'rgba(226,232,240,0.55)',
                  margin: 0,
                  paddingRight: 60,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
