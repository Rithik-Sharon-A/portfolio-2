const GREEN = '#00FF88';
const BLUE = '#0EA5E9';

// Round to 2 decimals so SSR and client render identical coordinate strings
const r2 = (n: number) => Math.round(n * 100) / 100;

const SWEEP_SECONDS = 4;

// Fixed blips (angle from top, clockwise; radius from center).
// Each lights up as the sweep line passes its angle, then fades.
const BLIPS = [
  { angle: 45, radius: 55, color: GREEN },
  { angle: 130, radius: 68, color: BLUE },
  { angle: 220, radius: 40, color: GREEN },
  { angle: 300, radius: 62, color: GREEN },
];

export default function RadarSweep({
  size = 148,
  outerText = '',
  innerText = '',
}: {
  size?: number;
  outerText?: string;
  innerText?: string;
}) {
  return (
    <div
      className="hero-rotating-badge"
      style={{
        position: 'relative',
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.25))',
      }}
    >
      <style>{`
        @keyframes radarBlip {
          0%   { opacity: 0.95; }
          45%  { opacity: 0; }
          92%  { opacity: 0; }
          100% { opacity: 0.95; }
        }
      `}</style>

      {/* Sweep wedge: bright leading edge with a trail fading behind it */}
      <div
        style={{
          position: 'absolute',
          inset: '9%',
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgba(0,255,136,0.03) 290deg, rgba(0,255,136,0.4) 358deg, rgba(0,255,136,0.75) 360deg)',
          animation: `spin ${SWEEP_SECONDS}s linear infinite`,
        }}
      />

      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Screen rings */}
        <circle cx="100" cy="100" r="82" fill="rgba(8,12,16,0.25)" stroke={GREEN} strokeWidth="1" opacity="0.55" />
        <circle cx="100" cy="100" r="55" fill="none" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="28" fill="none" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />

        {/* Crosshairs */}
        <line x1="100" y1="18" x2="100" y2="182" stroke={GREEN} strokeWidth="0.4" opacity="0.25" />
        <line x1="18" y1="100" x2="182" y2="100" stroke={GREEN} strokeWidth="0.4" opacity="0.25" />

        {/* Degree ticks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rad = (i * 30 * Math.PI) / 180;
          const x1 = r2(100 + Math.sin(rad) * 76);
          const y1 = r2(100 - Math.cos(rad) * 76);
          const x2 = r2(100 + Math.sin(rad) * 82);
          const y2 = r2(100 - Math.cos(rad) * 82);
          return (
            <line
              key={`tick-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={GREEN}
              strokeWidth={i % 3 === 0 ? 1.4 : 0.7}
              opacity={i % 3 === 0 ? 0.6 : 0.35}
            />
          );
        })}

        {/* Blips lit in sync with the sweep line passing their bearing */}
        {BLIPS.map(({ angle, radius, color }, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = r2(100 + Math.sin(rad) * radius);
          const cy = r2(100 - Math.cos(rad) * radius);
          const delay = r2((angle / 360) * SWEEP_SECONDS);
          return (
            <g key={`blip-${i}`} style={{ animation: `radarBlip ${SWEEP_SECONDS}s linear infinite ${delay}s`, opacity: 0 }}>
              <circle cx={cx} cy={cy} r="2.4" fill={color} />
              <circle cx={cx} cy={cy} r="5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx="100" cy="100" r="2.5" fill={GREEN} opacity="0.9" />
      </svg>

      {/* CMS-driven text ring around the radar, slow counter-rotation */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: 'spinReverse 24s linear infinite',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <path id="radar-text-ring" d="M 100,100 m -93,0 a 93,93 0 1,1 186,0 a 93,93 0 1,1 -186,0" />
        </defs>
        <text fontSize="9" fontFamily="DM Mono, monospace" fill={BLUE} letterSpacing="2.6" opacity="0.9">
          <textPath href="#radar-text-ring">{outerText}</textPath>
        </text>
      </svg>

      {/* CMS-driven caption under the radar */}
      {innerText && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '10px',
            fontFamily: 'DM Mono, monospace',
            fontSize: '8px',
            letterSpacing: '0.18em',
            color: 'var(--muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {innerText}
        </div>
      )}
    </div>
  );
}
