'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StackItem } from '@/types';

interface Props {
  data: StackItem[];
  label?: string;
  heading?: string;
  subtitle?: string;
}

const ICONS: Record<string, string> = {
  'C/C++': '⚙️',
  Python: '🐍',
  'React.js': '⚛️',
  'Node.js': '🟢',
  'Express.js': '🚂',
  'MongoDB Atlas': '🍃',
  JavaScript: '🟨',
  TypeScript: '🔷',
  AWS: '☁️',
  'Git / GitHub': '🐙',
  'Tailwind CSS': '🎨',
  'Redux Toolkit': '🔄',
  'JWT Auth': '🔐',
  FreeRTOS: '⏱️',
  Arduino: '🔌',
  ESP32: '📡',
  UART: '📶',
  SPI: '🔗',
  I2C: '🔗',
};

export default function StackSection({ data, label, heading, subtitle }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="stack"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 6vw, 80px)',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          max-width: 1200px;
        }
        @media (max-width: 480px) {
          .stack-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

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
            marginBottom: '8px',
          }}
        >
          {heading ?? ''}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--muted)', marginBottom: '60px' }}
        >
          {subtitle ?? ''}
        </motion.p>

        <div className="stack-grid">
          {data.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              whileHover={{ borderColor: 'var(--blue)', background: 'var(--glow-g)', y: -4 }}
              style={{
                border: '1px solid rgba(14,165,233,0.12)',
                borderRadius: '8px',
                padding: '20px 16px',
                background: 'var(--surface)',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{ICONS[item.name] || '⚡'}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--white)', marginBottom: '4px' }}>
                {item.name}
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--blue)' }}>{item.cricketRole}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
