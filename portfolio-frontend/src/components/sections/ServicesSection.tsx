'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Service } from '@/types';
import OscilloscopeWave from '@/components/svg/OscilloscopeWave';

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
      ref={ref}
      style={{
        background: 'var(--surface)',
        borderRadius: '40px 40px 0 0',
        marginTop: '-32px',
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(50px, 10vw, 100px) clamp(20px, 6vw, 80px)',
        minHeight: '80vh',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .service-row { display: flex; gap: 32px; align-items: flex-start; }
        @media (max-width: 600px) {
          .service-row { gap: 16px; }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
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
          {label ?? ''}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 9vw, 8rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          {heading ?? ''}
        </motion.h2>

        <div style={{ marginBottom: '48px' }}>
          <OscilloscopeWave color="var(--blue)" width={300} height={30} animated />
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {data.map((service, i) => (
            <motion.div
              key={service.documentId}
              className="service-row"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(service.documentId)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: '1px solid rgba(14,165,233,0.1)',
                padding: '32px 0',
                cursor: 'default',
              }}
            >
              <span
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.8rem, 5vw, 6rem)',
                  fontWeight: 700,
                  color: hovered === service.documentId ? 'var(--blue)' : 'rgba(14,165,233,0.08)',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  minWidth: '50px',
                  textShadow: hovered === service.documentId ? '0 0 20px rgba(14,165,233,0.4)' : 'none',
                }}
              >
                {service.number}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                    fontWeight: 600,
                    color: 'var(--white)',
                    marginBottom: '8px',
                    transform: hovered === service.documentId ? 'translateX(8px)' : 'translateX(0)',
                    transition: 'transform 0.2s',
                  }}
                >
                  {service.name}
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '480px' }}>
                  {service.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
