'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { About } from '@/types';
import OscilloscopeWave from '@/components/svg/OscilloscopeWave';
import CircuitCorners from '@/components/svg/CircuitCorners';

interface Props {
  data: About | null;
}

function Row({ k, v }: { k: string; v?: string | null }) {
  if (!v?.trim()) return null;
  return (
    <div
      className="about-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(100px, 180px) 1fr',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
      }}
    >
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'rgba(0,212,255,0.7)',
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 15,
          lineHeight: 1.65,
          color: 'rgba(226,232,240,0.9)',
        }}
      >
        {v}
      </div>
    </div>
  );
}

export default function AboutSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (!data) return null;

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
        .about-sys, .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(32px, 5vw, 80px);
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <CircuitCorners opacity={0.35} />

      <div className="about-sys about-grid" style={{ position: 'relative', zIndex: 1 }}>
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
              marginBottom: '16px',
              marginTop: 'clamp(0px, 2vw, 8px)',
            }}
          >
            {data.sectionLabel}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 28,
              color: 'var(--white)',
            }}
          >
            {data.heading}
          </motion.h2>

          <div
            style={{
              border: '1px solid rgba(0,212,255,0.16)',
              background: 'rgba(22,24,29,0.55)',
              padding: '8px 20px 4px',
            }}
          >
            <Row k="NAME" v={data.name} />
            <Row k="BACKGROUND" v={data.para3} />
            <Row k="PRIMARY LANGUAGE" v={data.stat1Value} />
            <Row k="CURRENT FOCUS" v={data.focus} />
            <Row k="MISSION" v={data.para1} />
            <Row k="PHILOSOPHY" v={data.philosophy} />
            <Row k="CURRENT LEARNING" v={data.learning} />
            <Row k="LOCATION / OPS" v={data.para2} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}
        >
          <OscilloscopeWave color="#00D4FF" />
          <div className="about-stats" style={{ display: 'grid', gap: 10, width: '100%' }}>
            {[
              { v: data.stat1Value, l: data.stat1Label },
              { v: data.stat2Value, l: data.stat2Label },
              { v: data.stat3Value, l: data.stat3Label },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  border: '1px solid rgba(0,212,255,0.14)',
                  padding: 'clamp(14px, 2vw, 18px) clamp(14px, 2vw, 20px)',
                  background: 'var(--surface)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#00D4FF',
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    color: 'var(--muted)',
                    letterSpacing: '0.12em',
                    marginTop: 4,
                  }}
                >
                  {(s.l || '').toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
