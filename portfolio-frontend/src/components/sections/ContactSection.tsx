'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Contact } from '@/types';
import { FolderGit2, Link2, Mail, Phone } from 'lucide-react';
import CircuitNode from '@/components/svg/CircuitNode';
import CircuitCorners from '@/components/svg/CircuitCorners';

interface Props {
  data: Contact | null;
}

type Handshake = 'idle' | 'syn' | 'ack' | 'open';

export default function ContactSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [phase, setPhase] = useState<Handshake>('idle');

  async function runHandshake() {
    if (phase !== 'idle' && phase !== 'open') return;
    if (phase === 'open') {
      if (data?.email) window.location.href = `mailto:${data.email}`;
      return;
    }
    setPhase('syn');
    await new Promise((r) => setTimeout(r, 700));
    setPhase('ack');
    await new Promise((r) => setTimeout(r, 700));
    setPhase('open');
  }

  if (!data) return null;

  const ctaLabel =
    phase === 'idle'
      ? data.ctaText
      : phase === 'syn'
        ? data.handshakeSyn || 'SYN →'
        : phase === 'ack'
          ? data.handshakeAck || '← ACK'
          : data.handshakeOpen || 'CHANNEL OPEN · MAIL';

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 10vw, 140px) clamp(16px, 4vw, 80px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .contact-footer {
          border-top: 1px solid rgba(0,212,255,0.12);
          width: 100%;
          max-width: 100vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: clamp(16px, 3vw, 32px) 0 0;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .contact-footer {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      <CircuitCorners opacity={0.35} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
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
          {data.sectionLabel}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            marginBottom: 12,
          }}
        >
          {data.headingLine1}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            fontWeight: 800,
            color: '#00FFE5',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            marginBottom: 28,
            textShadow: '0 0 40px rgba(0,255,229,0.3)',
          }}
        >
          {data.headingLine2}
        </motion.h2>

        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            marginBottom: 36,
            maxWidth: 420,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {data.availabilityText}
        </p>

        <motion.button
          type="button"
          onClick={runHandshake}
          className="eng-pulse"
          whileHover={{ borderColor: 'rgba(0,212,255,0.6)' }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 13,
            letterSpacing: '0.12em',
            color: phase === 'open' ? '#020D14' : '#00D4FF',
            background: phase === 'open' ? '#00D4FF' : 'transparent',
            border: '1px solid #00D4FF',
            padding: 'clamp(12px, 2vw, 18px) clamp(24px, 4vw, 48px)',
            cursor: 'pointer',
            marginBottom: 'clamp(24px, 4vw, 40px)',
            minWidth: 'min(240px, 100%)',
            width: '100%',
            maxWidth: 320,
            justifyContent: 'center',
            transition: 'background 0.25s, color 0.25s',
          }}
        >
          {ctaLabel}
        </motion.button>

        <AnimatePresence>
          {phase === 'open' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                gap: 'clamp(16px, 4vw, 32px)',
                marginBottom: 'clamp(40px, 6vw, 80px)',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[
                { href: data?.github, icon: <FolderGit2 size={20} />, label: 'GitHub' },
                { href: data?.linkedin, icon: <Link2 size={20} />, label: 'LinkedIn' },
                { href: data?.twitter, icon: <Link2 size={20} />, label: 'Twitter' },
                {
                  href: data?.email ? `mailto:${data.email}` : undefined,
                  icon: <Mail size={20} />,
                  label: 'Email',
                },
                {
                  href: data?.phone ? `tel:${data.phone}` : undefined,
                  icon: <Phone size={20} />,
                  label: 'Phone',
                },
              ]
                .filter((l) => l.href)
                .map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--muted)';
                    }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="contact-footer">
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
            {data.footerCopyright}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CircuitNode size={20} color="var(--blue)" />
            <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
              {data.footerStatus}
            </span>
          </div>
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
            {data.footerTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
