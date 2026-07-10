'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Contact } from '@/types';
import { FolderGit2, Link2, Mail, Phone } from 'lucide-react';
import OscilloscopeWave from '@/components/svg/OscilloscopeWave';
import CircuitNode from '@/components/svg/CircuitNode';

interface Props {
  data: Contact | null;
}

export default function ContactSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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
          border-top: 1px solid rgba(14,165,233,0.12);
          padding-top: 32px;
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

      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
        <div
          key={pos}
          style={{
            position: 'absolute',
            top: pos.includes('top') ? '-50px' : 'auto',
            bottom: pos.includes('bottom') ? '-50px' : 'auto',
            left: pos.includes('left') ? '-50px' : 'auto',
            right: pos.includes('right') ? '-50px' : 'auto',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      ))}

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
            marginBottom: '24px',
          }}
        >
          {data?.sectionLabel ?? ''}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 11vw, 10rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            marginBottom: '16px',
            textShadow: '0 0 60px rgba(14,165,233,0.15)',
          }}
        >
          {data?.headingLine1 ?? ''}
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 11vw, 10rem)',
            fontWeight: 800,
            color: 'var(--green)',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            marginBottom: '48px',
            textShadow: '0 0 40px rgba(0,255,136,0.3)',
          }}
        >
          {data?.headingLine2 ?? ''}
        </motion.h2>

        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
          <OscilloscopeWave color="var(--blue)" width={300} height={40} animated />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 300, color: 'var(--muted)', marginBottom: '48px' }}
        >
          {data?.availabilityText ?? ''}
        </motion.p>

        <motion.a
          href={`mailto:${data?.email ?? ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          whileHover={{ background: 'var(--blue)', color: 'var(--bg)', boxShadow: '0 0 30px rgba(14,165,233,0.4)' }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '14px',
            color: 'var(--blue)',
            border: '1px solid var(--blue)',
            borderRadius: '4px',
            padding: '16px 40px',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '64px',
            letterSpacing: '0.1em',
            transition: 'all 0.3s',
          }}
        >
          {data?.ctaText ?? ''}
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '32px', marginBottom: '80px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { href: data?.github, icon: <FolderGit2 size={20} />, label: 'GitHub' },
            { href: data?.linkedin, icon: <Link2 size={20} />, label: 'LinkedIn' },
            { href: data?.email ? `mailto:${data.email}` : undefined, icon: <Mail size={20} />, label: 'Email' },
            { href: data?.phone ? `tel:${data.phone}` : undefined, icon: <Phone size={20} />, label: 'Phone' },
          ]
            .filter((l) => l.href)
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--muted)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--green)';
                  e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(0,255,136,0.6))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.filter = 'none';
                }}
              >
                {link.icon}
              </a>
            ))}
        </motion.div>

        <div className="contact-footer">
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>{data?.footerCopyright ?? ''}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CircuitNode size={20} color="var(--blue)" />
            <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>{data?.footerStatus ?? ''}</span>
          </div>
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>{data?.footerTagline ?? ''}</span>
        </div>
      </div>
    </section>
  );
}
