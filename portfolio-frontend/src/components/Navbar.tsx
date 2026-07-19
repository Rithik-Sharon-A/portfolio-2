'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useInstrumentBus } from '@/context/InstrumentBus';

const navLinks = [
  { label: 'SYSTEMS', href: '#work' },
  { label: 'SYSINFO', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'CONNECT', href: '#contact' },
];

function openTerminal() {
  window.dispatchEvent(new Event('open-terminal'));
}

function StatusLed({
  label,
  color,
  blink,
  active,
}: {
  label: string;
  color: string;
  blink?: string;
  active?: boolean;
}) {
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
      <span
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </span>
  );
}

export default function Navbar({ logoText }: { logoText?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [txActive, setTxActive] = useState(false);
  const { systemMode, toggleDebug } = useInstrumentBus();

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
        .nav-links { display: flex; gap: clamp(16px, 3vw, 40px); align-items: center; }
        .nav-toggle { display: none; }
        .nav-leds { display: inline-flex; align-items: center; gap: 10px; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-leds { display: none; }
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
          background: scrolled ? 'rgba(1,5,9,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? `1px solid rgba(0,212,255,${systemMode === 'debug' ? 0.28 : 0.12})`
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>
          <button
            type="button"
            onDoubleClick={() => toggleDebug()}
            title="Double-click for Debug Mode"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '18px',
              color: '#00FFE5',
              letterSpacing: '0.1em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textShadow: '0 0 14px rgba(0,255,229,0.7)',
            }}
          >
            {logoText ?? ''}
            {systemMode === 'debug' && (
              <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.7 }}>DBG</span>
            )}
          </button>
          <span className="nav-leds">
            <StatusLed label="PWR" color="#00D4FF" blink="glowPulse 2.4s ease-in-out infinite" />
            <StatusLed
              label="TX"
              color="#00FFE5"
              active={txActive}
              blink="blink 0.7s step-end infinite"
            />
            <StatusLed label="RX" color="#00D4FF" blink="blink 3.7s step-end infinite" />
            {systemMode === 'debug' && (
              <StatusLed label="DBG" color="#00D4FF" blink="blink 1.2s step-end infinite" />
            )}
          </span>
        </div>

        <div className="nav-links">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              style={
                i === 0
                  ? {
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '12px',
                      color: '#00D4FF',
                      textDecoration: 'none',
                      letterSpacing: '0.1em',
                      padding: '4px 10px',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: '3px',
                      background: 'rgba(0,212,255,0.06)',
                      transition: 'all 0.2s',
                    }
                  : {
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '12px',
                      color: '#6B8FA8',
                      textDecoration: 'none',
                      letterSpacing: '0.1em',
                      padding: '4px 0',
                      borderBottom: '1px solid transparent',
                      transition: 'all 0.2s',
                    }
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00FFE5';
                if (i === 0) {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
                } else {
                  e.currentTarget.style.borderBottomColor = '#00D4FF';
                }
              }}
              onMouseLeave={(e) => {
                if (i === 0) {
                  e.currentTarget.style.color = '#00D4FF';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                } else {
                  e.currentTarget.style.color = '#6B8FA8';
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={openTerminal}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              color: '#6B8FA8',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid transparent',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00FFE5';
              e.currentTarget.style.borderBottomColor = '#00D4FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6B8FA8';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
          >
            TERMINAL
          </button>
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
              background: 'rgba(1,5,9,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(0,212,255,0.2)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px', gap: 4 }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '14px',
                    color: '#E8F4F8',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(0,212,255,0.1)',
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openTerminal();
                }}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '14px',
                  color: '#00D4FF',
                  textAlign: 'center',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  borderRadius: 4,
                  letterSpacing: '0.1em',
                  padding: '14px',
                  marginTop: 8,
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                {'>_'} OPEN TERMINAL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
