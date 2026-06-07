'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Contact } from '@/types';
import { Mail, Phone, ExternalLink } from 'lucide-react';

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
        padding: '140px 80px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
          marginBottom: '24px',
        }}
      >
        06 · LET&apos;S TALK
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(4rem, 10vw, 10rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '24px',
        }}
      >
        LET&apos;S BAT
      </motion.h2>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(4rem, 10vw, 10rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '48px',
        }}
      >
        TOGETHER
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '18px',
          fontWeight: 300,
          color: 'var(--muted)',
          marginBottom: '48px',
        }}
      >
        Currently open for full-time roles and freelance projects.
      </motion.p>

      <motion.a
        href={`mailto:${data?.email || 'rithiksharon.a@gmail.com'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
        whileHover={{ background: 'var(--ink)', color: 'var(--bg)' }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--ink)',
          border: '2px solid var(--ink)',
          borderRadius: '100px',
          padding: '18px 48px',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '64px',
          transition: 'all 0.3s',
        }}
      >
        {data?.ctaText || 'GET IN TOUCH →'}
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{ display: 'flex', gap: '32px', marginBottom: '80px' }}
      >
        {data?.github && (
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <ExternalLink size={20} />
          </a>
        )}
        {data?.linkedin && (
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <ExternalLink size={20} />
          </a>
        )}
        {data?.email && (
          <a
            href={`mailto:${data.email}`}
            style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <Mail size={20} />
          </a>
        )}
        {data?.phone && (
          <a
            href={`tel:${data.phone}`}
            style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <Phone size={20} />
          </a>
        )}
      </motion.div>

      <div
        style={{
          borderTop: '1px solid rgba(10,10,10,0.1)',
          paddingTop: '32px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
          © 2025 Rithik Sharon A · Chennai
        </span>
        <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
          Crafted like a good cover drive.
        </span>
      </div>
    </section>
  );
}
