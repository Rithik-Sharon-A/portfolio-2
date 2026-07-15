'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Hero } from '@/types';

interface Props {
  data: Hero | null;
}

function STM32Small() {
  const pins = 4;
  return (
    <svg width="72" height="72" viewBox="0 0 90 90" aria-hidden>
      <rect x="20" y="20" width="50" height="50" fill="rgba(0,255,136,0.04)" stroke="#00FF88" strokeWidth="1.2" />
      <path d="M20 30 Q20 20 30 20" fill="none" stroke="#00FF88" strokeWidth="1.2" />
      {Array.from({ length: pins }).map((_, i) => {
        const y = 27 + i * 12;
        return (
          <g key={`l${i}`}>
            <line x1="4" y1={y} x2="20" y2={y} stroke="#00FF88" strokeWidth="1" />
            <rect x="1" y={y - 2.5} width="5" height="5" fill="#00FF88" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const y = 27 + i * 12;
        return (
          <g key={`r${i}`}>
            <line x1="70" y1={y} x2="86" y2={y} stroke="#00FF88" strokeWidth="1" />
            <rect x="84" y={y - 2.5} width="5" height="5" fill="#00FF88" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const x = 27 + i * 12;
        return (
          <g key={`t${i}`}>
            <line x1={x} y1="4" x2={x} y2="20" stroke="#00FF88" strokeWidth="1" />
            <rect x={x - 2.5} y="1" width="5" height="5" fill="#00FF88" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const x = 27 + i * 12;
        return (
          <g key={`b${i}`}>
            <line x1={x} y1="70" x2={x} y2="86" stroke="#00FF88" strokeWidth="1" />
            <rect x={x - 2.5} y="84" width="5" height="5" fill="#00FF88" opacity="0.7" />
          </g>
        );
      })}
      {(
        [
          [20, 20],
          [70, 20],
          [20, 70],
          [70, 70],
        ] as const
      ).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#00FF88" opacity="0.8" />
      ))}
      <text x="45" y="42" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#00FF88" fontWeight="bold">
        STM32
      </text>
      <text x="45" y="53" textAnchor="middle" fontFamily="DM Mono" fontSize="6" fill="#00FF88" opacity="0.6">
        F407VG
      </text>
    </svg>
  );
}

function Oscilloscope() {
  const w = 400;
  const h = 120;
  const mid = h / 2;

  return (
    <div
      style={{
        border: '1px solid rgba(0,255,136,0.25)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.6)',
        width: '100%',
        maxWidth: 520,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 14px',
          borderBottom: '1px solid rgba(0,255,136,0.15)',
          background: 'rgba(0,255,136,0.04)',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            color: '#E2E8F0',
            letterSpacing: '0.15em',
          }}
        >
          OSCILLOSCOPE
        </span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#00FF88' }}>
            CH1 5V/div
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#0EA5E9' }}>
            CH2 1ms/div
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', height: `${h}px` }}>
        <style>{`
          @keyframes moveWave {
            from { transform: translateX(0); }
            to   { transform: translateX(-${w}px); }
          }
          @keyframes moveSine {
            from { transform: translateX(0); }
            to   { transform: translateX(-${w}px); }
          }
          .wave-sq  { animation: moveWave 1.8s linear infinite; }
          .wave-sin { animation: moveSine 2.4s linear infinite; }
        `}</style>

        <svg
          width="100%"
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <line
              key={`gh${i}`}
              x1="0"
              y1={(h * i) / 5}
              x2={w}
              y2={(h * i) / 5}
              stroke="#00FF88"
              strokeWidth="0.3"
              opacity="0.15"
            />
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line
              key={`gv${i}`}
              x1={(w * i) / 10}
              y1="0"
              x2={(w * i) / 10}
              y2={h}
              stroke="#00FF88"
              strokeWidth="0.3"
              opacity="0.15"
            />
          ))}
          <line x1="0" y1={mid} x2={w} y2={mid} stroke="#00FF88" strokeWidth="0.4" opacity="0.2" />
          <text
            x={w - 30}
            y={mid - h * 0.28 + 4}
            fontFamily="DM Mono"
            fontSize="8"
            fill="#00FF88"
            opacity="0.6"
          >
            +5V
          </text>
          <text
            x={w - 30}
            y={mid + h * 0.28 + 4}
            fontFamily="DM Mono"
            fontSize="8"
            fill="#00FF88"
            opacity="0.6"
          >
            GND
          </text>
        </svg>

        <svg
          width={w * 2}
          height={h}
          viewBox={`0 0 ${w * 2} ${h}`}
          className="wave-sq"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {[0, w].map((offset) => {
            const pts = [
              [0, mid],
              [w * 0.04, mid],
              [w * 0.04, mid - h * 0.3],
              [w * 0.21, mid - h * 0.3],
              [w * 0.21, mid + h * 0.3],
              [w * 0.46, mid + h * 0.3],
              [w * 0.46, mid - h * 0.3],
              [w * 0.71, mid - h * 0.3],
              [w * 0.71, mid + h * 0.3],
              [w * 0.96, mid + h * 0.3],
              [w * 0.96, mid],
              [w, mid],
            ]
              .map(([x, y]) => `${(x + offset).toFixed(1)},${y.toFixed(1)}`)
              .join(' ');
            return (
              <polyline
                key={offset}
                points={pts}
                fill="none"
                stroke="#00FF88"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
            );
          })}
        </svg>

        <svg
          width={w * 2}
          height={h}
          viewBox={`0 0 ${w * 2} ${h}`}
          className="wave-sin"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {[0, w].map((offset) => {
            const pts = Array.from({ length: 120 }, (_, i) => {
              const x = (i / 119) * w + offset;
              const y = mid + Math.sin((i / 119) * Math.PI * 4) * (h * 0.28);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            return (
              <polyline
                key={offset}
                points={pts}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="1.3"
                opacity="0.6"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function parseLines(raw?: string | null) {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseKvRows(raw?: string | null) {
  if (!raw?.trim()) return [] as [string, string][];
  return raw
    .split(/\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split('|');
      return [label.trim(), rest.join('|').trim()] as [string, string];
    })
    .filter(([a, b]) => a && b);
}

function TypewriterTagline({ lines }: { lines: string[] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const lineKey = lines.join('\n');

  useEffect(() => {
    const lines = lineKey.split('\n').filter(Boolean);
    if (!lines.length) return;
    const full = lines[lineIdx % lines.length];
    const typingMs = deleting ? 28 : 42;
    const pauseMs = deleting ? 280 : 1800;

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false);
        setLineIdx((i) => (i + 1) % lines.length);
      }, pauseMs);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? full.slice(0, Math.max(0, prev.length - 1)) : full.slice(0, prev.length + 1)
      );
    }, typingMs);
    return () => clearTimeout(t);
  }, [text, deleting, lineIdx, lineKey]);

  if (!lines.length) return null;

  return (
    <p className="hero-tagline" aria-live="polite">
      <span>[ </span>
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: '0.55em',
          marginLeft: 2,
          color: '#00FF88',
          animation: 'blink 1s step-end infinite',
        }}
      >
        ▌
      </span>
      <span> ]</span>
    </p>
  );
}

export default function HeroSection({ data }: Props) {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const typedLines = useMemo(() => parseLines(data?.typedLines), [data?.typedLines]);
  const profileRows = useMemo(() => parseKvRows(data?.profileRows), [data?.profileRows]);
  const statusPills = useMemo(
    () =>
      (data?.statusTags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    [data?.statusTags]
  );

  if (!data) return null;

  const pillColors = ['#00FF88', '#0EA5E9', '#00FF88', '#0EA5E9'];

  function openTerminal() {
    window.dispatchEvent(new CustomEvent('open-terminal'));
    setMenuOpen(false);
  }

  const mono = { fontFamily: 'DM Mono, monospace' } as const;
  const panel: CSSProperties = {
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: 8,
    background: 'rgba(13,17,23,0.92)',
    overflow: 'hidden',
  };
  const panelHeader: CSSProperties = {
    ...mono,
    fontSize: 10,
    color: '#E2E8F0',
    letterSpacing: '0.14em',
    padding: '8px 12px',
    borderBottom: '1px solid rgba(0,255,136,0.12)',
    background: 'rgba(0,255,136,0.04)',
  };

  const navLinks = [
    { label: 'SYSTEMS', href: '#work' },
    { label: 'SYSINFO', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'CONNECT', href: '#contact' },
  ];

  const debuggerRows = [
    ['Firmware', 'Loaded'],
    ['Knowledge Base', 'Ready'],
    ['UART', '115200'],
    ['AI Assistant', 'Online'],
  ] as const;

  const coreRows = [
    ['CORE', 'ARM Cortex-M4'],
    ['FLASH', '512 KB'],
    ['RAM', '128 KB'],
    ['CLOCK', '168 MHz'],
    ['STATUS', '● ACTIVE'],
  ] as const;

  return (
    <section id="hero" className="hero-shell">
      <div className="hero-grid-bg" aria-hidden />

      {/* Nav */}
      <header className="hero-nav">
        <div className="hero-nav-left">
          <span className="hero-logo">{data.avatarInitials}</span>
          {[
            { label: 'PWR', color: '#00FF88', blink: false },
            { label: 'TX', color: '#0EA5E9', blink: true },
            { label: 'RX', color: '#00FF88', blink: false },
          ].map((led) => (
            <span key={led.label} className="hero-led">
              <i
                style={{
                  background: led.color,
                  boxShadow: `0 0 6px ${led.color}`,
                  animation: led.blink ? 'blink 0.7s step-end infinite' : 'glowPulse 2s infinite',
                }}
              />
              {led.label}
            </span>
          ))}
        </div>

        <nav className="hero-nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <button type="button" className="hero-nav-term" onClick={openTerminal}>
            TERMINAL
          </button>
        </nav>

        <button
          type="button"
          className="hero-nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {menuOpen && (
        <div className="hero-mobile-menu">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <button type="button" onClick={openTerminal}>
            OPEN TERMINAL
          </button>
        </div>
      )}

      {/* 3-col grid: left profile | center | right core+debugger */}
      <div className="hero-grid">
        {/* LEFT — Radar + Profile */}
        <motion.aside
          className="hero-left"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {/* Radar Scanner panel */}
          <div style={panel} className="hero-panel">
            <div style={panelHeader}>RADAR ARRAY</div>
            <div
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="rgba(0,255,136,0.02)"
                  stroke="#00FF88"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <circle cx="70" cy="70" r="44" fill="none" stroke="#00FF88" strokeWidth="0.6" opacity="0.2" />
                <circle cx="70" cy="70" r="26" fill="none" stroke="#00FF88" strokeWidth="0.6" opacity="0.2" />
                <circle cx="70" cy="70" r="8" fill="none" stroke="#00FF88" strokeWidth="0.5" opacity="0.3" />

                <line x1="70" y1="8" x2="70" y2="132" stroke="#00FF88" strokeWidth="0.4" opacity="0.15" />
                <line x1="8" y1="70" x2="132" y2="70" stroke="#00FF88" strokeWidth="0.4" opacity="0.15" />
                <line x1="26" y1="26" x2="114" y2="114" stroke="#00FF88" strokeWidth="0.3" opacity="0.1" />
                <line x1="114" y1="26" x2="26" y2="114" stroke="#00FF88" strokeWidth="0.3" opacity="0.1" />

                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = (i * 10 * Math.PI) / 180;
                  const isLarge = i % 9 === 0;
                  const r1 = isLarge ? 58 : 60;
                  const r2 = 62;
                  const x1 = 70 + r1 * Math.cos(angle);
                  const y1 = 70 + r1 * Math.sin(angle);
                  const x2 = 70 + r2 * Math.cos(angle);
                  const y2 = 70 + r2 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1.toFixed(1)}
                      y1={y1.toFixed(1)}
                      x2={x2.toFixed(1)}
                      y2={y2.toFixed(1)}
                      stroke="#00FF88"
                      strokeWidth={isLarge ? '1' : '0.5'}
                      opacity={isLarge ? '0.4' : '0.2'}
                    />
                  );
                })}

                <g
                  style={{
                    transformOrigin: '70px 70px',
                    animation: 'spin 3s linear infinite',
                  }}
                >
                  <defs>
                    <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%" fx="0%" fy="50%">
                      <stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
                      <stop offset="60%" stopColor="#00FF88" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00FF88" stopOpacity="0.6" />
                    </radialGradient>
                  </defs>
                  <path d="M70 70 L70 8 A62 62 0 0 1 123.7 101 Z" fill="url(#sweepGrad)" opacity="0.7" />
                  <line x1="70" y1="70" x2="70" y2="8" stroke="#00FF88" strokeWidth="1.2" opacity="0.8" />
                </g>

                <circle
                  cx="95"
                  cy="42"
                  r="3"
                  fill="#00FF88"
                  opacity="0.9"
                  style={{ animation: 'glowPulse 1.8s ease-in-out infinite' }}
                />
                <circle
                  cx="48"
                  cy="88"
                  r="2.5"
                  fill="#0EA5E9"
                  opacity="0.8"
                  style={{ animation: 'glowPulse 2.4s ease-in-out infinite 0.6s' }}
                />
                <circle
                  cx="100"
                  cy="80"
                  r="2"
                  fill="#00FF88"
                  opacity="0.7"
                  style={{ animation: 'glowPulse 2s ease-in-out infinite 1.2s' }}
                />
                <circle
                  cx="55"
                  cy="45"
                  r="1.8"
                  fill="#00FF88"
                  opacity="0.6"
                  style={{ animation: 'glowPulse 1.6s ease-in-out infinite 0.3s' }}
                />

                <circle
                  cx="70"
                  cy="70"
                  r="4"
                  fill="#00FF88"
                  opacity="0.9"
                  style={{ animation: 'glowPulse 2s ease-in-out infinite' }}
                />
                <circle cx="70" cy="70" r="1.5" fill="#080C10" />
              </svg>

              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px',
                  color: '#00FF88',
                  letterSpacing: '0.25em',
                  animation: 'blink 2s step-end infinite',
                }}
              >
                SCANNING...
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '3px',
                  marginTop: '4px',
                }}
              >
                {[6, 10, 14, 18, 14, 10, 6].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: `${h}px`,
                      background: '#00FF88',
                      opacity: 0.3 + (i / 6) * 0.5,
                      borderRadius: '1px',
                      animation: `glowPulse ${1.2 + i * 0.15}s ease-in-out infinite ${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={panel} className="hero-panel">
            <div style={panelHeader}>DEVELOPER PROFILE</div>
            <div className="hero-panel-body">
              <div className="hero-profile-top">
                <div className="hero-avatar">{data.avatarInitials}</div>
                <div>
                  <div className="hero-profile-name">{data.bottomName}</div>
                  <div className="hero-profile-status">● {data.profileStatus}</div>
                </div>
              </div>
              {profileRows.map(([label, value]) => (
                <div key={label} className="hero-kv">
                  <span>{label}</span>
                  <span className="hero-kv-val">{value}</span>
                </div>
              ))}
              <div className="hero-badge">
                <span>🏆</span>
                <div>
                  <div>{data.badgeTitle}</div>
                  <div className="hero-badge-sub">{data.badgeSubtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* CENTER */}
        <motion.div
          className="hero-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Oscilloscope />

          <div className="hero-title-block">
            <div className="hero-word">{data.heroWordLine1}</div>
            <div className="hero-word hero-word-accent">{data.heroWordLine2}</div>
            <div className="hero-role">{data.roleSubtitle}</div>
            <TypewriterTagline lines={typedLines} />
          </div>

          <div className="hero-pills">
            {statusPills.map((pill, i) => {
              const color = pillColors[i % pillColors.length];
              return (
                <span key={pill} style={{ color, borderColor: `${color}44` }}>
                  {pill}
                </span>
              );
            })}
          </div>

          <div className="hero-ctas">
            <button type="button" className="hero-cta-solid" onClick={openTerminal}>
              {'>_'} OPEN TERMINAL
            </button>
            <a href="#work" className="hero-cta-ghost">
              ▦ VIEW SYSTEMS
            </a>
          </div>
        </motion.div>

        {/* RIGHT — CORE + Debugger (swapped from left; GPIO removed) */}
        <motion.aside
          className="hero-right"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <div style={panel} className="hero-panel">
            <div className="hero-core-heads">
              <div style={{ ...panelHeader, borderRight: '1px solid rgba(0,255,136,0.12)' }}>CORE</div>
              <div style={{ ...panelHeader, textAlign: 'right' }}>LANG</div>
            </div>
            <div className="hero-panel-body">
              <div className="hero-core-top">
                <STM32Small />
                <div style={{ textAlign: 'right' }}>
                  <div className="hero-lang">{data.counterValue}</div>
                  <div className="hero-lang-sub">{data.counterLabel}</div>
                </div>
              </div>
              {coreRows.map(([label, value]) => (
                <div key={label} className="hero-kv">
                  <span>{label}</span>
                  <span className={value.includes('ACTIVE') ? 'hero-kv-accent' : 'hero-kv-val'}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={panel} className="hero-panel">
            <div style={panelHeader}>STM32 DEBUGGER</div>
            <div className="hero-panel-body">
              <div className="hero-kv hero-kv-status">
                <span>STATUS</span>
                <span className="hero-kv-accent">● CONNECTED</span>
              </div>
              {debuggerRows.map(([label, value]) => (
                <div key={label} className="hero-kv">
                  <span>{label}</span>
                  <span className={value === 'Online' ? 'hero-kv-accent' : 'hero-kv-val'}>{value}</span>
                </div>
              ))}
              <button type="button" className="hero-dbg-btn" onClick={openTerminal}>
                PRESS TO OPEN TERMINAL {'>'}
              </button>
            </div>
          </div>

          <div style={panel} className="hero-panel hero-time-panel">
            <span style={{ ...mono, fontSize: 10, color: '#475569', letterSpacing: '0.12em' }}>
              SYSTEM TIME
            </span>
            <span className="hero-time">{time || '00:00:00'}</span>
          </div>
        </motion.aside>
      </div>

      <footer className="hero-footer">
        <span className="hero-footer-side">{data.bottomLabel}</span>
        <div className="hero-footer-name">
          <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden>
            <line x1="0" y1="5" x2="30" y2="5" stroke="#00FF88" strokeWidth="0.8" opacity="0.3" />
            <circle cx="34" cy="5" r="2.5" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.4" />
          </svg>
          <span>{data.bottomName}</span>
          <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden>
            <circle cx="6" cy="5" r="2.5" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="5" x2="40" y2="5" stroke="#00FF88" strokeWidth="0.8" opacity="0.3" />
          </svg>
        </div>
        <span className="hero-footer-side hero-footer-right">{data.bottomLocation} ◉</span>
      </footer>
    </section>
  );
}
