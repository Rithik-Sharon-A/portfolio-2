'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { About } from '@/types';

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
      transition={{ duration: 0.5 }}
      style={{
        border: '1px solid rgba(10,10,10,0.12)',
        borderRadius: '16px',
        padding: '24px 28px',
        background: 'var(--bg)',
        cursor: 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ y: -4, boxShadow: '4px 4px 0 rgba(10,10,10,0.08)' }}
    >
      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: 'var(--ink)',
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
        padding: '120px 80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              color: 'var(--tan)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            02 · ABOUT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.1,
              marginBottom: '32px',
            }}
          >
            {data?.heading || 'Read the spin.'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.9,
              border: '1px solid var(--green)',
              borderRadius: '8px',
              padding: '16px 20px',
              marginBottom: '20px',
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
                fontSize: '16px',
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
          <StatCard value={data?.stat1Value || '02+'} label={data?.stat1Label || 'Projects'} />
          <StatCard value={data?.stat2Value || '∞'} label={data?.stat2Label || 'Chai'} />
          <StatCard value={data?.stat3Value || '10+'} label={data?.stat3Label || 'Technologies'} />
        </div>
      </div>
    </section>
  );
}
