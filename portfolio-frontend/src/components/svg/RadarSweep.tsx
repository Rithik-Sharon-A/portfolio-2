'use client';

import { useEffect, useState } from 'react';

const ACCENT = '#00D4FF';

// Round to 2 decimals so SSR and client render identical coordinate strings
const r2 = (n: number) => Math.round(n * 100) / 100;

const SWEEP_SECONDS = 3.5;

const BLIPS = [
  { angle: 28, radius: 48 },
  { angle: 67, radius: 72 },
  { angle: 95, radius: 38 },
  { angle: 142, radius: 64 },
  { angle: 178, radius: 52 },
  { angle: 211, radius: 70 },
  { angle: 255, radius: 44 },
  { angle: 288, radius: 66 },
  { angle: 318, radius: 36 },
  { angle: 348, radius: 58 },
];

const TARGET_SLOTS = [
  { angle: 42, radius: 58 },
  { angle: 118, radius: 62 },
  { angle: 198, radius: 48 },
  { angle: 272, radius: 66 },
  { angle: 330, radius: 54 },
];

const RINGS = [82, 68, 54, 40, 26];

export default function RadarSweep({
  size = 148,
  outerText = '',
  label = 'SCANNING FOR OPPORTUNITIES',
  onScan,
  quiet = false,
}: {
  size?: number;
  outerText?: string;
  label?: string;
  onScan?: () => void;
  quiet?: boolean;
}) {
  const [activeTarget, setActiveTarget] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setActiveTarget((i) => (i + 1) % TARGET_SLOTS.length);
      setShowTooltip(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setShowTooltip(false), 2200);
    }, 4800);
    // First detection shortly after mount
    const first = setTimeout(() => {
      setShowTooltip(true);
      hideTimer = setTimeout(() => setShowTooltip(false), 2200);
    }, 1600);
    return () => {
      clearInterval(id);
      clearTimeout(first);
      clearTimeout(hideTimer);
    };
  }, []);

  const target = TARGET_SLOTS[activeTarget];
  const trad = (target.angle * Math.PI) / 180;
  const tx = r2(100 + Math.sin(trad) * target.radius);
  const ty = r2(100 - Math.cos(trad) * target.radius);

  return (
    <div
      className="hero-rotating-badge"
      role={onScan ? 'button' : undefined}
      tabIndex={onScan ? 0 : undefined}
      onClick={onScan}
      onKeyDown={(e) => {
        if (!onScan) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onScan();
        }
      }}
      title={onScan ? 'Discover deployed systems' : undefined}
      style={{
        position: 'relative',
        width: size,
        height: size,
        filter: quiet
          ? 'drop-shadow(0 0 10px rgba(0,212,255,0.16))'
          : 'drop-shadow(0 0 18px rgba(0,212,255,0.3))',
        cursor: onScan ? 'pointer' : 'default',
      }}
    >
      <style>{`
        @keyframes radarBlip {
          0%   { opacity: 0.95; transform: scale(1); }
          18%  { opacity: 0.95; transform: scale(1.15); }
          55%  { opacity: 0; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(0.85); }
        }
        @keyframes targetPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: '9%',
          borderRadius: '50%',
          background: quiet
            ? 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0,212,255,0.015) 270deg, rgba(0,212,255,0.06) 310deg, rgba(0,212,255,0.2) 345deg, rgba(0,212,255,0.45) 360deg)'
            : 'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(0,212,255,0.02) 250deg, rgba(0,212,255,0.08) 300deg, rgba(0,212,255,0.28) 340deg, rgba(0,212,255,0.55) 355deg, rgba(0,212,255,0.85) 360deg)',
          animation: `spin ${SWEEP_SECONDS}s linear infinite`,
        }}
      />

      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {RINGS.map((r, i) => (
          <circle
            key={`ring-${r}`}
            cx="100"
            cy="100"
            r={r}
            fill={i === 0 ? 'rgba(14,15,18,0.35)' : 'none'}
            stroke={ACCENT}
            strokeWidth={i === 0 ? 1.1 : 0.55}
            opacity={(quiet ? 0.55 : 0.65) * (i === 0 ? 1 : 0.35 + (RINGS.length - i) * 0.05)}
          />
        ))}

        <line x1="100" y1="18" x2="100" y2="182" stroke={ACCENT} strokeWidth="0.4" opacity={quiet ? 0.15 : 0.22} />
        <line x1="18" y1="100" x2="182" y2="100" stroke={ACCENT} strokeWidth="0.4" opacity={quiet ? 0.15 : 0.22} />

        {Array.from({ length: 12 }).map((_, i) => {
          const rad = (i * 30 * Math.PI) / 180;
          const x1 = r2(100 + Math.sin(rad) * 76);
          const y1 = r2(100 - Math.cos(rad) * 76);
          const x2 = r2(100 + Math.sin(rad) * 82);
          const y2 = r2(100 - Math.cos(rad) * 82);
          return (
            <line
              key={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={ACCENT}
              strokeWidth={i % 3 === 0 ? 1.3 : 0.6}
              opacity={quiet ? (i % 3 === 0 ? 0.4 : 0.18) : i % 3 === 0 ? 0.55 : 0.28}
            />
          );
        })}

        <g style={{ transformOrigin: '100px 100px', animation: `spin ${SWEEP_SECONDS}s linear infinite` }}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="18"
            stroke={ACCENT}
            strokeWidth={quiet ? 1.2 : 1.6}
            strokeLinecap="round"
            opacity={quiet ? 0.75 : 0.95}
          />
          <circle cx="100" cy="18" r="2" fill={ACCENT} opacity="0.8" />
        </g>

        {BLIPS.map(({ angle, radius }, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = r2(100 + Math.sin(rad) * radius);
          const cy = r2(100 - Math.cos(rad) * radius);
          const delay = r2((angle / 360) * SWEEP_SECONDS);
          return (
            <g
              key={`blip-${i}`}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: `radarBlip ${SWEEP_SECONDS}s linear infinite ${delay}s`,
                opacity: 0,
              }}
            >
              <circle cx={cx} cy={cy} r="1.6" fill={ACCENT} />
              <circle cx={cx} cy={cy} r="3.5" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.4" />
            </g>
          );
        })}

        {/* Rotating project target */}
        <g
          key={`target-${activeTarget}`}
          style={{ animation: 'targetPulse 1.4s ease-in-out infinite' }}
        >
          <circle
            cx={tx}
            cy={ty}
            r="4"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.2"
            opacity="0.9"
          />
          <circle cx={tx} cy={ty} r="2" fill={ACCENT} opacity="0.95" />
          <title>Project Detected</title>
        </g>

        <circle cx="100" cy="100" r="3" fill={ACCENT} opacity={quiet ? 0.75 : 0.95} />
        <circle cx="100" cy="100" r="6" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.28" />
      </svg>

      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            left: `${(tx / 200) * 100}%`,
            top: `${(ty / 200) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 10px))',
            fontFamily: 'DM Mono, monospace',
            fontSize: 8,
            letterSpacing: '0.1em',
            color: '#020D14',
            background: ACCENT,
            padding: '3px 6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          Project Detected
        </div>
      )}

      {outerText ? (
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            animation: 'spinReverse 24s linear infinite',
            pointerEvents: 'none',
            opacity: quiet ? 0.65 : 1,
          }}
        >
          <defs>
            <path id="radar-text-ring" d="M 100,100 m -93,0 a 93,93 0 1,1 186,0 a 93,93 0 1,1 -186,0" />
          </defs>
          <text fontSize="8" fontFamily="DM Mono, monospace" fill={ACCENT} letterSpacing="2.4" opacity="0.65">
            <textPath href="#radar-text-ring">{outerText}</textPath>
          </text>
        </svg>
      ) : null}

      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '10px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '7px',
          letterSpacing: '0.14em',
          color: ACCENT,
          whiteSpace: 'nowrap',
          opacity: quiet ? 0.55 : 0.85,
        }}
      >
        {label}
      </div>
    </div>
  );
}
