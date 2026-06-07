'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StackItem } from '@/types';

interface Props {
  data: StackItem[];
}

const TECH_ICONS: Record<string, string> = {
  'React.js': '⚛️',
  'Node.js': '🟢',
  'Express.js': '🚂',
  'MongoDB Atlas': '🍃',
  'Redux Toolkit': '🔄',
  'JavaScript': '🟨',
  'Python': '🐍',
  'JWT Auth': '🔐',
  'AWS': '☁️',
  'Tailwind CSS': '🎨',
  'Git / GitHub': '🐙',
};

export default function StackSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="stack"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: '120px 80px',
        minHeight: '80vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'var(--tan)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        04 · THE ELEVEN
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(3rem, 8vw, 8rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        MY STACK
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '12px',
          color: 'var(--muted)',
          marginBottom: '60px',
        }}
      >
        First-choice XI for any project
      </motion.p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '1200px',
        }}
      >
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, borderColor: 'var(--green)' }}
            style={{
              border: '1px solid rgba(10,10,10,0.12)',
              borderRadius: '16px',
              padding: '24px 20px',
              background: 'var(--bg)',
              cursor: 'default',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{TECH_ICONS[item.name] || '⚙️'}</div>
            <div
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: '4px',
              }}
            >
              {item.name}
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--tan)' }}>
              {item.cricketRole}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
