'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'WORK', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'CONTACT', href: '#contact' },
];

function StatusLed({ label, color, blink, active }: { label: string; color: string; blink?: string; active?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
          boxShadow: active === false ? 'none' : `0 0 6px ${color}`,
          opacity: active === false ? 0.25 : 1,
          animation: blink,
          transition: 'opacity 0.15s, box-shadow 0.15s',
        }}
      />
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '7px', color: 'var(--muted)', letterSpacing: '0.1em' }}>
        {label}
      </span>
    </span>
  );
}

export default function Navbar({ logoText }: { logoText?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [txActive, setTxActive] = useState(false);

  useEffect(() => {
    let txTimer: ReturnType<typeof setTimeout>;
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setTxActive(true);
      clearTimeout(txTimer);
      txTimer = setTimeout(() => setTxActive(false), 250);
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      clearTimeout(txTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: 40px; }
        .nav-toggle { display: none; }
        @media (max-width: 720px) {
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
        }
      `}</style>
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
          padding: 'clamp(14px, 3vw, 20px) clamp(20px, 5vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: scrolled ? 'rgba(8,12,16,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(14,165,233,0.12)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '14px',
              color: 'var(--blue)',
              letterSpacing: '0.1em',
            }}
          >
            {logoText ?? ''}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <StatusLed label="PWR" color="#00FF88" blink="glowPulse 2.4s ease-in-out infinite" />
            <StatusLed label="TX" color="#0EA5E9" active={txActive} />
            <StatusLed label="RX" color="#00FF88" blink="blink 3.7s step-end infinite" />
          </span>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--blue)',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '56px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(8,12,16,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(14,165,233,0.12)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '13px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(14,165,233,0.08)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
