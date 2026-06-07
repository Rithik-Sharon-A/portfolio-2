'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = ['WORK', 'ABOUT', 'STACK', 'CONTACT'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(245,245,239,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,10,10,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--ink)',
          letterSpacing: '0.05em',
        }}
      >
        RS
      </span>
      <div style={{ display: 'flex', gap: '40px' }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
