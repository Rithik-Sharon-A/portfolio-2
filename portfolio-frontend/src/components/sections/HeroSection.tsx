'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import { Hero } from '@/types';
import CircuitBoardBackground, {
  emitPcbPulse,
} from '@/components/svg/CircuitBoardBackground';

function onInteractiveHover(e: MouseEvent) {
  emitPcbPulse(e.clientX, e.clientY);
}

interface Props {
  data: Hero | null;
}

function STM32Small() {
  const pins = 4;
  return (
    <svg width="72" height="72" viewBox="0 0 90 90" aria-hidden>
      <rect x="20" y="20" width="50" height="50" fill="rgba(0,212,255,0.04)" stroke="#00D4FF" strokeWidth="1.2" />
      <path d="M20 30 Q20 20 30 20" fill="none" stroke="#00D4FF" strokeWidth="1.2" />
      {Array.from({ length: pins }).map((_, i) => {
        const y = 27 + i * 12;
        return (
          <g key={`l${i}`}>
            <line x1="4" y1={y} x2="20" y2={y} stroke="#00D4FF" strokeWidth="1" />
            <rect x="1" y={y - 2.5} width="5" height="5" fill="#00D4FF" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const y = 27 + i * 12;
        return (
          <g key={`r${i}`}>
            <line x1="70" y1={y} x2="86" y2={y} stroke="#00D4FF" strokeWidth="1" />
            <rect x="84" y={y - 2.5} width="5" height="5" fill="#00D4FF" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const x = 27 + i * 12;
        return (
          <g key={`t${i}`}>
            <line x1={x} y1="4" x2={x} y2="20" stroke="#00D4FF" strokeWidth="1" />
            <rect x={x - 2.5} y="1" width="5" height="5" fill="#00D4FF" opacity="0.7" />
          </g>
        );
      })}
      {Array.from({ length: pins }).map((_, i) => {
        const x = 27 + i * 12;
        return (
          <g key={`b${i}`}>
            <line x1={x} y1="70" x2={x} y2="86" stroke="#00D4FF" strokeWidth="1" />
            <rect x={x - 2.5} y="84" width="5" height="5" fill="#00D4FF" opacity="0.7" />
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
        <circle key={i} cx={x} cy={y} r="2.5" fill="#00D4FF" opacity="0.8" />
      ))}
      <text x="45" y="42" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="#00D4FF" fontWeight="bold">
        STM32
      </text>
      <text x="45" y="53" textAnchor="middle" fontFamily="DM Mono" fontSize="6" fill="#00D4FF" opacity="0.6">
        F407VG
      </text>
    </svg>
  );
}

function Oscilloscope() {
  const w = 500;
  const h = 130;
  const mid = h / 2;
  const CORNER = 16;

  const generateSine = (offset: number) =>
    Array.from({ length: 160 }, (_, i) => {
      const x = (i / 159) * w + offset;
      const y = mid + Math.sin((i / 159) * Math.PI * 6) * (h * 0.32);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');

  const s = CORNER + 4;
  const brackets: { path: string; style: CSSProperties }[] = [
    { path: `M ${CORNER} 2 L 2 2 L 2 ${CORNER}`, style: { top: 0, left: 0 } },
    { path: `M 2 2 L ${s - 2} 2 L ${s - 2} ${CORNER}`, style: { top: 0, right: 0 } },
    { path: `M 2 ${CORNER} L 2 ${s - 2} L ${CORNER} ${s - 2}`, style: { bottom: 0, left: 0 } },
    { path: `M ${s - 2} 2 L ${s - 2} ${s - 2} L 2 ${s - 2}`, style: { bottom: 0, right: 0 } },
  ];

  return (
    <div
      className="oscilloscope-wrapper"
      style={{
        position: 'relative',
        padding: '10px',
        background: '#010a14',
        width: '100%',
        maxWidth: 520,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Shared glow filter for corner brackets */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="bracketGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {brackets.map((b, i) => (
        <svg
          key={i}
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'visible',
            ...b.style,
          }}
          aria-hidden
        >
          <path
            d={b.path}
            fill="none"
            stroke="#00FFE5"
            strokeWidth="2"
            strokeLinecap="square"
            filter="url(#bracketGlow)"
          />
        </svg>
      ))}

      {/* Outer border with glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(0,212,255,0.35)',
          borderRadius: '4px',
          boxShadow: `
          0 0 0 1px rgba(0,212,255,0.08),
          0 0 20px rgba(0,212,255,0.12),
          inset 0 0 30px rgba(0,0,0,0.8),
          inset 0 0 60px rgba(0,8,20,0.6)
        `,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Top edge decorations */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 12px',
          background: '#010a14',
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: '30px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00D4FF)',
          }}
        />
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#00FFE5',
            boxShadow: '0 0 8px #00FFE5',
          }}
        />
        <div
          style={{
            width: '30px',
            height: '1px',
            background: 'linear-gradient(90deg, #00D4FF, transparent)',
          }}
        />
      </div>

      {/* Side decorations — left */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 0',
          background: '#010a14',
          zIndex: 4,
        }}
      >
        {[8, 5, 3, 5, 8].map((barW, i) => (
          <div
            key={i}
            style={{
              width: `${barW}px`,
              height: '1.5px',
              background: '#00D4FF',
              opacity: 0.4 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Side decorations — right */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 0',
          background: '#010a14',
          zIndex: 4,
        }}
      >
        {[8, 5, 3, 5, 8].map((barW, i) => (
          <div
            key={i}
            style={{
              width: `${barW}px`,
              height: '1.5px',
              background: '#00D4FF',
              opacity: 0.4 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Inner content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 14px',
            borderBottom: '1px solid rgba(0,212,255,0.15)',
            background: 'rgba(0,212,255,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#00FFE5',
                boxShadow: '0 0 8px #00FFE5',
                animation: 'glowPulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                color: '#E8F4F8',
                letterSpacing: '0.2em',
              }}
            >
              OSCILLOSCOPE
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }} className="hide-mobile">
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                color: '#00D4FF',
                letterSpacing: '0.1em',
              }}
            >
              CH1
            </span>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                color: '#2A4A5A',
              }}
            >
              5V/div · 1ms/div · AUTO
            </span>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                color: '#00FFE5',
                animation: 'blink 2s step-end infinite',
              }}
            >
              ● RUN
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            height: `${h}px`,
            overflow: 'hidden',
            background: 'rgba(0,4,12,1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(
              ellipse 80% 60% at 50% 50%,
              rgba(0,212,255,0.05) 0%,
              transparent 70%
            )`,
              pointerEvents: 'none',
            }}
          />

          <svg
            width="100%"
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {[1, 2, 3, 4].map((i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={(h * i) / 5}
                x2={w}
                y2={(h * i) / 5}
                stroke="#00D4FF"
                strokeWidth="0.3"
                opacity="0.1"
              />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line
                key={`v${i}`}
                x1={(w * i) / 10}
                y1="0"
                x2={(w * i) / 10}
                y2={h}
                stroke="#00D4FF"
                strokeWidth="0.3"
                opacity="0.1"
              />
            ))}
            <line x1="0" y1={mid} x2={w} y2={mid} stroke="#00D4FF" strokeWidth="0.6" opacity="0.2" />
            <line x1={w / 2} y1="0" x2={w / 2} y2={h} stroke="#00D4FF" strokeWidth="0.4" opacity="0.1" />
            <text
              x={w - 4}
              y={mid - h * 0.3 + 4}
              fontFamily="DM Mono"
              fontSize="8"
              fill="#00D4FF"
              opacity="0.5"
              textAnchor="end"
            >
              +5V
            </text>
            <text
              x={w - 4}
              y={mid + 4}
              fontFamily="DM Mono"
              fontSize="8"
              fill="#00D4FF"
              opacity="0.35"
              textAnchor="end"
            >
              0V
            </text>
            <text
              x={w - 4}
              y={mid + h * 0.3 + 4}
              fontFamily="DM Mono"
              fontSize="8"
              fill="#00D4FF"
              opacity="0.5"
              textAnchor="end"
            >
              -5V
            </text>
            <line
              x1="0"
              y1={mid - h * 0.1}
              x2="10"
              y2={mid - h * 0.1}
              stroke="#00FFE5"
              strokeWidth="1"
              opacity="0.8"
            />
            <polygon
              points={`0,${mid - h * 0.1 - 4} 5,${mid - h * 0.1} 0,${mid - h * 0.1 + 4}`}
              fill="#00FFE5"
              opacity="0.9"
            />
          </svg>

          <style>{`
            @keyframes sineScroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .s-glow { animation: sineScroll 2.5s linear infinite; filter: blur(5px); opacity: 0.3; }
            .s-wave { animation: sineScroll 2.5s linear infinite; }
          `}</style>

          <svg
            width={w * 2}
            height={h}
            viewBox={`0 0 ${w * 2} ${h}`}
            preserveAspectRatio="xMinYMid meet"
            className="s-glow"
            style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: `${h}px`, maxWidth: 'none' }}
          >
            {[0, w].map((o) => (
              <polyline key={o} points={generateSine(o)} fill="none" stroke="#00D4FF" strokeWidth="5" />
            ))}
          </svg>

          <svg
            width={w * 2}
            height={h}
            viewBox={`0 0 ${w * 2} ${h}`}
            preserveAspectRatio="xMinYMid meet"
            className="s-wave"
            style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: `${h}px`, maxWidth: 'none' }}
          >
            <defs>
              <linearGradient id="wFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, w].map((o) => (
              <g key={o}>
                <polyline
                  points={[
                    `${o},${mid}`,
                    ...Array.from({ length: 160 }, (_, i) => {
                      const x = (i / 159) * w + o;
                      const y = mid + Math.sin((i / 159) * Math.PI * 6) * (h * 0.32);
                      return `${x.toFixed(2)},${y.toFixed(2)}`;
                    }),
                    `${o + w},${mid}`,
                  ].join(' ')}
                  fill="url(#wFill)"
                  stroke="none"
                />
                <polyline
                  points={generateSine(o)}
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)',
              animation: 'scanline 6s linear infinite',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 14px',
            borderTop: '1px solid rgba(0,212,255,0.1)',
            background: 'rgba(0,212,255,0.03)',
          }}
        >
          {[
            ['FREQ', '1.0kHz'],
            ['PERIOD', '1.00ms'],
            ['Vpp', '10.0V'],
            ['RMS', '7.07V'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '9px',
                  color: '#2A4A5A',
                  letterSpacing: '0.1em',
                }}
              >
                {label}:
              </span>
              <span
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '9px',
                  color: '#00D4FF',
                  letterSpacing: '0.05em',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
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
  const [started, setStarted] = useState(false);
  const lineKey = lines.join('\n');

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const list = lineKey.split('\n').filter(Boolean);
    if (!list.length) return;
    const full = list[lineIdx % list.length];
    const typingMs = deleting ? 22 : 28;
    const pauseMs = deleting ? 280 : 1800;

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false);
        setLineIdx((i) => (i + 1) % list.length);
      }, pauseMs);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? full.slice(0, Math.max(0, prev.length - 1)) : full.slice(0, prev.length + 1)
      );
    }, typingMs);
    return () => clearTimeout(t);
  }, [text, deleting, lineIdx, lineKey, started]);

  if (!lines.length) return null;

  return (
    <div
      className="hero-tagline-box"
      aria-live="polite"
      style={{
        width: '100%',
        maxWidth: '520px',
        height: '88px',
        margin: '8px auto 0',
        border: '1px solid rgba(0,212,255,0.35)',
        borderRadius: 4,
        background: '#010a14',
        boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexShrink: 0,
        textAlign: 'left',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 10px',
          borderBottom: '1px solid rgba(0,212,255,0.2)',
          background: 'rgba(0,12,20,0.95)',
          flexShrink: 0,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
        <span
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 10,
            color: '#6B8FA8',
            letterSpacing: '0.08em',
            marginLeft: 6,
          }}
        >
          bash — rs@embedded:~
        </span>
      </div>

      {/* Terminal body — fixed height */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          padding: '10px 12px',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'DM Mono, monospace',
            fontSize: 'clamp(0.65rem, 1vw, 0.78rem)',
            color: '#E8F4F8',
            lineHeight: 1.55,
            letterSpacing: '0.02em',
            width: '100%',
          }}
        >
          <span style={{ color: '#00D4FF' }}>rs@embedded</span>
          <span style={{ color: '#6B8FA8' }}>:</span>
          <span style={{ color: '#00FFE5' }}>~</span>
          <span style={{ color: '#6B8FA8' }}>$ </span>
          <span>{text}</span>
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 13,
              background: '#00D4FF',
              marginLeft: 1,
              verticalAlign: 'text-bottom',
              animation: 'blink 0.9s step-end infinite',
            }}
          />
        </p>
      </div>
    </div>
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

  const pillPalette = ['#00FFE5', '#00D4FF', '#00FFE5', '#00D4FF'];

  function openTerminal() {
    window.dispatchEvent(new CustomEvent('open-terminal'));
    setMenuOpen(false);
  }

  const mono = { fontFamily: 'DM Mono, monospace' } as const;
  const panel: CSSProperties = {
    border: '1px solid rgba(0,212,255,0.4)',
    borderRadius: '6px',
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
    backdropFilter: 'none',
  };
  const panelHeader: CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '11px',
    color: '#E8F4F8',
    letterSpacing: '0.15em',
    padding: '10px 16px',
    borderBottom: '1px solid rgba(0,212,255,0.25)',
    background: 'transparent',
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
      <CircuitBoardBackground />
      {/* Nav */}
      <header className="hero-nav">
        <div className="hero-nav-left">
          <span className="hero-logo">{data.avatarInitials}</span>
          {[
            { label: 'PWR', color: '#00D4FF', blink: false },
            { label: 'TX', color: '#00FFE5', blink: true },
            { label: 'RX', color: '#00D4FF', blink: false },
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
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={i === 0 ? 'hero-nav-active' : undefined}
              onMouseEnter={onInteractiveHover}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="hero-nav-term"
            onClick={openTerminal}
            onMouseEnter={onInteractiveHover}
          >
            TERMINAL
          </button>
        </nav>

        <button
          type="button"
          className="hero-nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
          onMouseEnter={onInteractiveHover}
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
                  fill="rgba(0,212,255,0.02)"
                  stroke="#00D4FF"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <circle cx="70" cy="70" r="44" fill="none" stroke="#00D4FF" strokeWidth="0.6" opacity="0.2" />
                <circle cx="70" cy="70" r="26" fill="none" stroke="#00D4FF" strokeWidth="0.6" opacity="0.2" />
                <circle cx="70" cy="70" r="8" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.3" />

                <line x1="70" y1="8" x2="70" y2="132" stroke="#00D4FF" strokeWidth="0.4" opacity="0.15" />
                <line x1="8" y1="70" x2="132" y2="70" stroke="#00D4FF" strokeWidth="0.4" opacity="0.15" />
                <line x1="26" y1="26" x2="114" y2="114" stroke="#00D4FF" strokeWidth="0.3" opacity="0.1" />
                <line x1="114" y1="26" x2="26" y2="114" stroke="#00D4FF" strokeWidth="0.3" opacity="0.1" />

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
                      stroke="#00D4FF"
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
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
                      <stop offset="60%" stopColor="#00D4FF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00FFE5" stopOpacity="0.6" />
                    </radialGradient>
                  </defs>
                  <path d="M70 70 L70 8 A62 62 0 0 1 123.7 101 Z" fill="url(#sweepGrad)" opacity="0.7" />
                  <line x1="70" y1="70" x2="70" y2="8" stroke="#00FFE5" strokeWidth="1.2" opacity="0.8" />
                </g>

                <circle
                  cx="95"
                  cy="42"
                  r="3"
                  fill="#00D4FF"
                  opacity="0.9"
                  style={{ animation: 'glowPulse 1.8s ease-in-out infinite' }}
                />
                <circle
                  cx="48"
                  cy="88"
                  r="2.5"
                  fill="#00FFE5"
                  opacity="0.8"
                  style={{ animation: 'glowPulse 2.4s ease-in-out infinite 0.6s' }}
                />
                <circle
                  cx="100"
                  cy="80"
                  r="2"
                  fill="#00D4FF"
                  opacity="0.7"
                  style={{ animation: 'glowPulse 2s ease-in-out infinite 1.2s' }}
                />
                <circle
                  cx="55"
                  cy="45"
                  r="1.8"
                  fill="#00D4FF"
                  opacity="0.6"
                  style={{ animation: 'glowPulse 1.6s ease-in-out infinite 0.3s' }}
                />

                <circle
                  cx="70"
                  cy="70"
                  r="4"
                  fill="#00D4FF"
                  opacity="0.9"
                  style={{ animation: 'glowPulse 2s ease-in-out infinite' }}
                />
                <circle cx="70" cy="70" r="1.5" fill="#020D14" />
              </svg>

              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '11px',
                  color: '#00D4FF',
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
                      background: '#00D4FF',
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
            <div className="hero-word-resume-row">
              <div style={{ lineHeight: 0.85 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-word"
                >
                  {data.heroWordLine1}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-word hero-word-accent"
                >
                  {data.heroWordLine2}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="hero-resume-divider"
                aria-hidden
              />

              <motion.a
                href="/resume.pdf"
                download="Rithik_Sharon_A_Resume.pdf"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hero-resume-cta"
                onMouseEnter={(e) => {
                  onInteractiveHover(e);
                  e.currentTarget.style.background = 'rgba(0,212,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,212,255,0.06)';
                }}
              >
                <svg
                  className="hero-resume-cta-frame"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <filter id="rGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 10 1 L 90 1 L 99 10 L 99 90 L 90 99 L 10 99 L 1 90 L 1 10 Z"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.55"
                    filter="url(#rGlow)"
                  />
                  <line x1="0" y1="0" x2="10" y2="0" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="100" y1="0" x2="90" y2="0" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="100" y1="0" x2="100" y2="10" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="0" y1="100" x2="10" y2="100" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="0" y1="100" x2="0" y2="90" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="100" y1="100" x2="90" y2="100" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                  <line x1="100" y1="100" x2="100" y2="90" stroke="#00FFE5" strokeWidth="2" vectorEffect="non-scaling-stroke" opacity="0.9" />
                </svg>

                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid #00FFE5',
                      animation: 'ledRing 1.5s ease-out infinite',
                      opacity: 0,
                    }}
                  />
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#00FFE5',
                      boxShadow: '0 0 8px #00FFE5, 0 0 20px rgba(0,255,229,0.5)',
                      animation: 'ledBlink 1.2s ease-in-out infinite',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </div>

                <div style={{ zIndex: 3, textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '13px',
                      color: '#E8F4F8',
                      letterSpacing: '0.15em',
                      marginBottom: '3px',
                    }}
                  >
                    RESUME
                  </div>
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '10px',
                      color: '#00D4FF',
                      letterSpacing: '0.1em',
                    }}
                  >
                    .PDF
                  </div>
                </div>

                <div style={{ zIndex: 3 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <line
                      x1="9"
                      y1="2"
                      x2="9"
                      y2="13"
                      stroke="#00D4FF"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="4,9 9,14 14,9"
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="2"
                      y1="16"
                      x2="16"
                      y2="16"
                      stroke="#00D4FF"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background:
                      'linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)',
                    animation: 'scanline 2.5s linear infinite',
                    pointerEvents: 'none',
                    zIndex: 4,
                  }}
                />
              </motion.a>
            </div>

            <div className="hero-role">{data.roleSubtitle}</div>
            <TypewriterTagline lines={typedLines} />
          </div>

          <div className="hero-pills">
            {statusPills.map((pill, i) => {
              const color = pillPalette[i % pillPalette.length];
              const label = pill.replace(/^[●▣◷■◆▸▹]+\s*/, '').trim() || pill;
              return (
                <div
                  key={pill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    border: `1px solid ${color}50`,
                    borderRadius: '3px',
                    background: `${color}08`,
                    clipPath:
                      'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)',
                    boxShadow: `0 0 8px ${color}15`,
                  }}
                >
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 6px ${color}, 0 0 12px ${color}60`,
                      animation: 'ledBlink 1.5s ease-in-out infinite',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: color === '#00FFE5' ? '#E8F4F8' : '#B8D4E8',
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="hero-ctas">
            <button
              type="button"
              className="hero-cta-solid eng-pulse"
              onClick={openTerminal}
              onMouseEnter={onInteractiveHover}
            >
              {'>_'} OPEN TERMINAL
            </button>
            <a
              href="#work"
              className="hero-cta-ghost eng-pulse"
              onMouseEnter={onInteractiveHover}
            >
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
              <div style={{ ...panelHeader, borderRight: '1px solid rgba(0,212,255,0.35)' }}>CORE</div>
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
              <button
                type="button"
                className="hero-dbg-btn eng-pulse"
                onClick={openTerminal}
                onMouseEnter={onInteractiveHover}
              >
                PRESS TO OPEN TERMINAL {'>'}
              </button>
            </div>
          </div>

          <div style={panel} className="hero-panel hero-time-panel">
            <span style={{ ...mono, fontSize: 10, color: '#2A4A5A', letterSpacing: '0.12em' }}>
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
            <line x1="0" y1="5" x2="30" y2="5" stroke="#00D4FF" strokeWidth="0.8" opacity="0.3" />
            <circle cx="34" cy="5" r="2.5" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
          </svg>
          <span>{data.bottomName}</span>
          <svg width="40" height="10" viewBox="0 0 40 10" aria-hidden>
            <circle cx="6" cy="5" r="2.5" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="5" x2="40" y2="5" stroke="#00D4FF" strokeWidth="0.8" opacity="0.3" />
          </svg>
        </div>
        <span className="hero-footer-side hero-footer-right">{data.bottomLocation} ◉</span>
      </footer>
    </section>
  );
}
