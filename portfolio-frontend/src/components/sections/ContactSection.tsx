'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Contact } from '@/types';
import { FolderGit2, Link2, Mail, Phone } from 'lucide-react';
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
        padding: 'clamp(32px, 5vw, 56px) clamp(20px, 6vw, 80px)',
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
        @keyframes pcb-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.6); }
        }
        .pcb-pulse-node {
          animation: pcb-pulse 2.4s ease-in-out infinite;
          transform-origin: 400px 16px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .footer-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: rgba(0,212,255,0.7);
          animation: blink 1.1s step-start infinite;
          vertical-align: middle;
        }
        @media (max-width: 600px) {
          .footer-terminal-grid {
            grid-template-columns: 1fr !important;
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
            color: 'rgba(226,232,240,0.6)',
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

        <div style={{ width: '100%', margin: '48px 0 0', position: 'relative' }}>
          <svg
            viewBox="0 0 800 32"
            preserveAspectRatio="none"
            style={{ width: '100%', height: 32, display: 'block', overflow: 'hidden' }}
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="16"
              x2="800"
              y2="16"
              stroke="rgba(0,212,255,0.35)"
              strokeWidth="1"
            />

            <circle cx="0" cy="16" r="3" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="1" />
            <circle cx="0" cy="16" r="1.5" fill="rgba(0,212,255,0.8)" />

            <circle cx="200" cy="16" r="3" fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
            <circle cx="200" cy="16" r="1.5" fill="rgba(0,212,255,0.5)" />
            <line x1="200" y1="16" x2="200" y2="4" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
            <circle cx="200" cy="4" r="2" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />

            <circle cx="400" cy="16" r="4" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="1" />
            <circle cx="400" cy="16" r="2" fill="rgba(0,212,255,0.9)" />
            <circle
              cx="400"
              cy="16"
              r="4"
              fill="none"
              stroke="rgba(0,212,255,0.3)"
              strokeWidth="1"
              className="pcb-pulse-node"
            />

            <circle cx="600" cy="16" r="3" fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="1" />
            <circle cx="600" cy="16" r="1.5" fill="rgba(0,212,255,0.5)" />
            <line x1="600" y1="16" x2="600" y2="28" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
            <circle cx="600" cy="28" r="2" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="1" />

            <circle cx="800" cy="16" r="3" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="1" />
            <circle cx="800" cy="16" r="1.5" fill="rgba(0,212,255,0.8)" />
          </svg>
        </div>

        <motion.div
          className="footer-terminal-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            width: '100%',
            padding: '28px 0 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px 48px',
            textAlign: 'left',
          }}
        >
          {[
            { label: 'SYSTEM', value: `${data.footerCopyright}` },
            { label: 'LOCATION', value: 'Chennai, IN' },
            { label: 'STATUS', value: data.footerStatus || 'Link ready.' },
            { label: 'BUILD', value: data.footerTagline || 'Built from bare metal to browser.' },
            { label: 'CONTACT', value: data.email || '' },
            { label: 'NETWORK', value: 'github · linkedin' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'baseline',
                borderBottom: '1px solid rgba(0,212,255,0.06)',
                padding: '7px 0',
              }}
            >
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color: 'rgba(0,212,255,0.85)',
                  whiteSpace: 'nowrap',
                  minWidth: 72,
                }}
              >
                {'>'} {label}
              </span>
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  color: 'rgba(226,232,240,0.8)',
                  letterSpacing: '0.04em',
                  wordBreak: 'break-all',
                }}
              >
                {value}
              </span>
            </div>
          ))}

          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingTop: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 9,
                color: 'rgba(0,212,255,0.7)',
                letterSpacing: '0.14em',
              }}
            >
              {'>'} rs-embedded:~$
            </span>
            <span className="footer-cursor" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
