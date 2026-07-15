export default function CrystalXTAL({
  color = '#00FF88',
  label = '16MHz',
}: {
  color?: string;
  label?: string;
}) {
  // One period of square wave (high then low), repeated for a long path
  const period = 16;
  const high = 22;
  const low = 42;
  let wave = `M 108,${low}`;
  for (let i = 0; i < 12; i++) {
    const x = 108 + i * period;
    wave += ` H${x + period * 0.45} V${high} H${x + period * 0.9} V${low}`;
  }

  return (
    <svg width="220" height="64" viewBox="0 0 220 64" aria-hidden>
      <style>{`
        @keyframes xtalPulse {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -160; }
        }
        @keyframes xtalGlow {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* Left lead into crystal */}
      <line x1="8" y1="32" x2="38" y2="32" stroke={color} strokeWidth="1.2" opacity="0.55" />

      {/* Left plate */}
      <line x1="38" y1="16" x2="38" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85" />

      {/* Crystal body (rectangle) */}
      <rect
        x="46"
        y="18"
        width="36"
        height="28"
        rx="2"
        fill="rgba(81,246,218,0.06)"
        stroke={color}
        strokeWidth="1.4"
        opacity="0.9"
        style={{ animation: 'xtalGlow 2.4s ease-in-out infinite' }}
      />
      {/* Inner hatch lines — crystal lattice hint */}
      <line x1="54" y1="24" x2="54" y2="40" stroke={color} strokeWidth="0.6" opacity="0.35" />
      <line x1="64" y1="24" x2="64" y2="40" stroke={color} strokeWidth="0.6" opacity="0.35" />
      <line x1="74" y1="24" x2="74" y2="40" stroke={color} strokeWidth="0.6" opacity="0.35" />

      {/* Right plate */}
      <line x1="90" y1="16" x2="90" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85" />

      {/* Right lead out */}
      <line x1="90" y1="32" x2="108" y2="32" stroke={color} strokeWidth="1.2" opacity="0.55" />

      {/* Square wave pulsing out */}
      <path
        d={wave}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.85"
        strokeDasharray="40 120"
        style={{ animation: 'xtalPulse 1.2s linear infinite' }}
      />

      {/* Soft trail under the wave */}
      <path
        d={wave}
        fill="none"
        stroke={color}
        strokeWidth="3"
        opacity="0.12"
        strokeDasharray="40 120"
        style={{ animation: 'xtalPulse 1.2s linear infinite' }}
      />

      {/* Label */}
      <text
        x="64"
        y="58"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="9"
        letterSpacing="0.12em"
        fill={color}
        opacity="0.75"
      >
        {label}
      </text>
      <text
        x="18"
        y="14"
        fontFamily="DM Mono, monospace"
        fontSize="7"
        fill={color}
        opacity="0.45"
      >
        XTAL
      </text>
    </svg>
  );
}
