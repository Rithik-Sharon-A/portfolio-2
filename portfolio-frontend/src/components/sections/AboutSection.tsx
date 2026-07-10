'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { About } from '@/types';
import OscilloscopeWave from '@/components/svg/OscilloscopeWave';

interface Props {
  data: About | null;
}

function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ borderColor: 'var(--blue)', background: 'var(--glow-g)' }}
      style={{
        border: '1px solid rgba(14,165,233,0.15)',
        borderRadius: '12px',
        padding: '24px 28px',
        background: 'var(--surface)',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: 'var(--blue)',
          textShadow: '0 0 20px rgba(14,165,233,0.4)',
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 6vw, 80px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div className="about-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              color: 'var(--blue)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            {data?.sectionLabel ?? ''}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            {data?.heading ?? ''}
          </motion.h2>

          <div style={{ marginBottom: '24px' }}>
            <OscilloscopeWave color="var(--blue)" width={200} height={30} animated />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.9,
              borderTop: '1px solid rgba(14,165,233,0.3)',
              borderRight: '1px solid rgba(14,165,233,0.3)',
              borderBottom: '1px solid rgba(14,165,233,0.3)',
              borderLeft: '3px solid var(--green)',
              borderRadius: '0 8px 8px 0',
              padding: '16px 20px',
              marginBottom: '20px',
              background: 'rgba(14,165,233,0.04)',
            }}
          >
            {data?.para1}
          </motion.p>

          {[data?.para2, data?.para3].filter(Boolean).map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.9,
                marginBottom: '16px',
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
          <StatCard value={data?.stat1Value ?? ''} label={data?.stat1Label ?? ''} />
          <StatCard value={data?.stat2Value ?? ''} label={data?.stat2Label ?? ''} />
          <StatCard value={data?.stat3Value ?? ''} label={data?.stat3Label ?? ''} />
        </div>
      </div>
    </section>
  );
}
