const BLUE = '#0EA5E9';
const GREEN = '#00FF88';

// Round to 2 decimals so SSR and client render identical coordinate strings
// (raw trig output differs in the last float digit between V8 builds → hydration mismatch)
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function RotatingCircuitBadge({
  size = 200,
  outerText = '',
  innerText = '',
}: {
  size?: number;
  outerText?: string;
  innerText?: string;
}) {
  const id = 'rcb';
  return (
    <div
      className="hero-rotating-badge"
      style={{
        position: 'relative',
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 24px rgba(14,165,233,0.3))',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: '50%',
          left: size * 0.08,
          width: size * 0.55,
          height: 2,
          transform: 'translateY(-50%)',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        viewBox="0 0 110 2"
      >
        <line x1="0" y1="1" x2="90" y2="1" stroke={BLUE} strokeWidth="1" opacity="0.4" />
        <circle cx="90" cy="1" r="3" fill="none" stroke={BLUE} strokeWidth="1" opacity="0.55" />
        <line x1="90" y1="1" x2="110" y2="1" stroke={BLUE} strokeWidth="0.6" opacity="0.25" strokeDasharray="2 3" />
      </svg>
      <svg
        style={{
          position: 'absolute',
          top: size * 0.72,
          left: '50%',
          width: 2,
          height: size * 0.35,
          transform: 'translateX(-50%)',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
        viewBox="0 0 2 70"
      >
        <line x1="1" y1="0" x2="1" y2="55" stroke={GREEN} strokeWidth="1" opacity="0.35" />
        <circle cx="1" cy="55" r="3" fill="none" stroke={GREEN} strokeWidth="1" opacity="0.5" />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
          animation: 'glowPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: 'spin 14s linear infinite',
        }}
      >
        <defs>
          <path
            id={`${id}-outer`}
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
          />
        </defs>

        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = r2(100 + Math.cos(rad) * 76);
          const y1 = r2(100 + Math.sin(rad) * 76);
          const x2 = r2(100 + Math.cos(rad) * 84);
          const y2 = r2(100 + Math.sin(rad) * 84);
          const isAccent = i % 5 === 0;
          return (
            <line
              key={`pad-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isAccent ? GREEN : BLUE}
              strokeWidth={i % 3 === 0 ? 2 : 1}
              opacity={i % 3 === 0 ? 0.75 : 0.3}
            />
          );
        })}

        <circle cx="100" cy="100" r="82"
          fill="none" stroke={BLUE}
          strokeWidth="1.2" strokeDasharray="6 4"
          opacity="0.6" />

        <text fontSize="9.5" fontFamily="DM Mono, monospace"
          fill={BLUE} letterSpacing="3" opacity="0.95">
          <textPath href={`#${id}-outer`}>{outerText}</textPath>
        </text>
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: 'spinReverse 20s linear infinite',
        }}
      >
        <defs>
          <path
            id={`${id}-mid`}
            d="M 100,100 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          />
        </defs>

        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = r2(100 + Math.cos(rad) * 58);
          const y1 = r2(100 + Math.sin(rad) * 58);
          const x2 = r2(100 + Math.cos(rad) * 66);
          const y2 = r2(100 + Math.sin(rad) * 66);
          return (
            <line
              key={`gear-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i % 4 === 0 ? GREEN : BLUE}
              strokeWidth="1.5"
              opacity="0.55"
            />
          );
        })}

        <circle cx="100" cy="100" r="62"
          fill="none" stroke={BLUE}
          strokeWidth="0.8" strokeDasharray="3 8"
          opacity="0.45" />

        <text fontSize="8" fontFamily="DM Mono, monospace"
          fill={BLUE} letterSpacing="2.5" opacity="0.9">
          <textPath href={`#${id}-mid`}>{innerText}</textPath>
        </text>
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <rect x="62" y="62" width="76" height="76" rx="3"
          fill="rgba(14,165,233,0.04)"
          stroke={BLUE} strokeWidth="1"
          opacity="0.65" />

        {[
          [62, 62], [138, 62], [62, 138], [138, 138],
          [100, 62], [100, 138], [62, 100], [138, 100],
        ].map(([cx, cy], i) => (
          <g key={`via-${i}`}>
            <circle cx={cx} cy={cy} r="4"
              fill="none" stroke={i % 3 === 0 ? GREEN : BLUE} strokeWidth="1" opacity="0.4" />
            <circle cx={cx} cy={cy} r="1.5" fill={i % 3 === 0 ? GREEN : BLUE} opacity="0.55" />
          </g>
        ))}

        {[75, 88, 100, 112, 125].map((pos) => (
          <g key={`grid-${pos}`}>
            <line x1={pos} y1="68" x2={pos} y2="132"
              stroke={BLUE} strokeWidth="0.4" opacity="0.14" />
            <line x1="68" y1={pos} x2="132" y2={pos}
              stroke={BLUE} strokeWidth="0.4" opacity="0.14" />
          </g>
        ))}
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: 'spin 30s linear infinite',
        }}
      >
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = r2(100 + Math.cos(rad) * 48);
          const y2 = r2(100 + Math.sin(rad) * 48);
          const x1 = r2(100 + Math.cos(rad) * 38);
          const y1 = r2(100 + Math.sin(rad) * 38);
          return (
            <line key={`trace-${angle}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={angle % 180 === 0 ? BLUE : GREEN}
              strokeWidth="1.2" opacity="0.65" />
          );
        })}

        <rect x="82" y="82" width="36" height="36" rx="2"
          fill="rgba(8,12,16,0.9)"
          stroke={BLUE} strokeWidth="1.5" />
        <rect x="87" y="87" width="26" height="26"
          fill="none" stroke={BLUE} strokeWidth="0.5" opacity="0.35" />

        {[-14, -7, 0, 7, 14].map((offset) => (
          <g key={`pins-${offset}`}>
            <rect x={98 + offset - 2} y="68" width="4" height="6"
              fill={BLUE} opacity="0.75" />
            <rect x={98 + offset - 2} y="126" width="4" height="6"
              fill={BLUE} opacity="0.75" />
            <rect x="68" y={98 + offset - 2} width="6" height="4"
              fill={offset === 0 ? GREEN : BLUE} opacity="0.75" />
            <rect x="126" y={98 + offset - 2} width="6" height="4"
              fill={BLUE} opacity="0.75" />
          </g>
        ))}

        <text x="100" y="97" textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize="7"
          fill={BLUE} opacity="0.95">
          MCU
        </text>
        <text x="100" y="107" textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize="5.5"
          fill={GREEN} opacity="0.8">
          ACTIVE
        </text>

        <circle cx="88" cy="88" r="2" fill={BLUE}
          style={{ animation: 'blink 1.2s ease-in-out infinite' }} />
        <circle cx="112" cy="88" r="2" fill={GREEN}
          style={{ animation: 'blink 1.8s ease-in-out infinite 0.4s' }} />
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {[
          'M 12 28 L 12 12 L 28 12',
          'M 172 12 L 188 12 L 188 28',
          'M 188 172 L 188 188 L 172 188',
          'M 28 188 L 12 188 L 12 172',
        ].map((d, i) => (
          <path key={`bracket-${i}`} d={d}
            fill="none" stroke={i % 2 === 0 ? BLUE : GREEN}
            strokeWidth="1.5"
            opacity="0.5" strokeLinecap="square" />
        ))}
      </svg>
    </div>
  );
}
