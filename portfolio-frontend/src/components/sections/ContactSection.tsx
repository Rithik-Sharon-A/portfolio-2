'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Contact } from '@/types';
import { FolderGit2, Link2, Mail, Phone } from 'lucide-react';
import CircuitNode from '@/components/svg/CircuitNode';

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
        ? 'SYN →'
        : phase === 'ack'
          ? '← ACK'
          : 'CHANNEL OPEN · MAIL';

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(70px, 14vw, 140px) clamp(20px, 6vw, 80px)',
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
          border-top: 1px solid rgba(81,246,218,0.12);
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 32px clamp(20px, 6vw, 80px) 0;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .contact-footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

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
            fontSize: 'clamp(2.8rem, 11vw, 7rem)',
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
            fontSize: 'clamp(2.8rem, 11vw, 7rem)',
            fontWeight: 800,
            color: '#00FF88',
            letterSpacing: '-0.03em',
            lineHeight: 0.92,
            marginBottom: 28,
            textShadow: '0 0 40px rgba(81,246,218,0.25)',
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
          whileHover={{ borderColor: 'rgba(81,246,218,0.6)' }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 13,
            letterSpacing: '0.12em',
            color: phase === 'open' ? '#080C10' : '#00FF88',
            background: phase === 'open' ? '#00FF88' : 'transparent',
            border: '1px solid rgba(81,246,218,0.4)',
            padding: '16px 28px',
            cursor: 'pointer',
            marginBottom: 40,
            minWidth: 240,
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
                gap: 32,
                marginBottom: 80,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[
                { href: data?.github, icon: <FolderGit2 size={20} />, label: 'GitHub' },
                { href: data?.linkedin, icon: <Link2 size={20} />, label: 'LinkedIn' },
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
                      e.currentTarget.style.color = 'var(--green)';
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
