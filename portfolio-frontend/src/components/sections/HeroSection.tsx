'use client';

import { motion } from 'framer-motion';
import { Hero } from '@/types';

interface Props {
  data: Hero | null;
}

function RotatingBadge() {
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9" fontFamily="DM Mono, monospace" fill="var(--ink)" letterSpacing="2">
          <textPath href="#circle">FULL STACK DEV · OPEN TO WORK · CHENNAI ·</textPath>
        </text>
        <circle cx="50" cy="50" r="37" fill="none" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="4 4" />
      </svg>
      <svg
        viewBox="0 0 40 40"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '28px',
          height: '28px',
        }}
      >
        <circle cx="20" cy="20" r="16" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        <path d="M10 14 Q20 8 30 14" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <path d="M10 26 Q20 32 30 26" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <path d="M6 17 Q3 20 6 23" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
        <path d="M34 17 Q37 20 34 23" fill="none" stroke="var(--ink)" strokeWidth="0.8" />
      </svg>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-badge { animation: spin 12s linear infinite; }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        className="spin-badge"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <path id="circle2" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="9" fontFamily="DM Mono, monospace" fill="var(--ink)" letterSpacing="2">
          <textPath href="#circle2">FULL STACK DEV · OPEN TO WORK · CHENNAI ·</textPath>
        </text>
      </svg>
    </div>
  );
}

export default function HeroSection({ data }: Props) {
  const heroWord = data?.heroWord || 'BOUNDARY';
  const bioLeft = data?.bioLeft || '';
  const bioRight = data?.bioRight || '';
  const counterValue = data?.counterValue || '02+';
  const counterLabel = data?.counterLabel || 'PROJECTS SHIPPED';

  return (
    <section
      id="work"
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '100px 48px 0',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RotatingBadge />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'right' }}
        >
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--ink)',
              lineHeight: 1,
            }}
          >
            _{counterValue}
          </div>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px',
              color: 'var(--muted)',
              letterSpacing: '0.15em',
              marginTop: '4px',
            }}
          >
            {counterLabel}
          </div>
        </motion.div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '0 0 80px',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            left: '48px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--muted)',
            maxWidth: '180px',
            lineHeight: 1.8,
          }}
        >
          {bioLeft}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(10vw, 13vw, 15vw)',
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          {heroWord}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            right: '48px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--muted)',
            maxWidth: '180px',
            lineHeight: 1.8,
            textAlign: 'right',
          }}
        >
          {bioRight}
        </motion.p>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--ink)',
          padding: '16px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg)',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            color: 'var(--muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          FULL STACK DEVELOPER
        </span>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', color: 'var(--ink)' }}>
          Rithik <strong>Sharon A</strong>
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.15em' }}>
          CHENNAI · 2025
        </span>
      </div>
    </section>
  );
}
