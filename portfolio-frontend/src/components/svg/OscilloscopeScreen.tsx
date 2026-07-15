export default function OscilloscopeScreen({
  width = 280,
  height = 180,
  color = '#00FF88',
  intensity = 0.45,
}: {
  width?: number;
  height?: number;
  color?: string;
  intensity?: number;
}) {
  const w = width;
  const h = height;
  const mid = h / 2;
  const amp = h * (0.16 + intensity * 0.18);
  // Slow continuous scroll — subtle, not frantic
  const dur = `${Math.max(5.5, 9 - intensity * 2.5)}s`;

  // Coordinates rounded so SSR and client render identical strings
  const sinePoints = Array.from({ length: 120 }, (_, i) => {
    const x = Math.round(((i / 119) * w) * 100) / 100;
    const y =
      Math.round(
        (mid +
          Math.sin((i / 119) * Math.PI * 5) * amp +
          Math.sin((i / 119) * Math.PI * 11) * amp * 0.12) *
          100
      ) / 100;
    return `${x},${y}`;
  }).join(' ');

  // Duplicate path for seamless horizontal scroll
  const scrollPath = `${sinePoints} ${Array.from({ length: 120 }, (_, i) => {
    const x = Math.round((w + (i / 119) * w) * 100) / 100;
    const y =
      Math.round(
        (mid +
          Math.sin((i / 119) * Math.PI * 5) * amp +
          Math.sin((i / 119) * Math.PI * 11) * amp * 0.12) *
          100
      ) / 100;
    return `${x},${y}`;
  }).join(' ')}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <clipPath id="scope-clip">
          <rect x="1" y="1" width={w - 2} height={h - 2} rx="6" />
        </clipPath>
      </defs>

      <rect
        x="0"
        y="0"
        width={w}
        height={h}
        rx="6"
        fill="rgba(0,0,0,0.55)"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.9"
      />

      {[1, 2, 3, 4].map((i) => (
        <line
          key={`gh${i}`}
          x1="0"
          y1={(h * i) / 5}
          x2={w}
          y2={(h * i) / 5}
          stroke={color}
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
          stroke={color}
          strokeWidth="0.3"
          opacity="0.12"
        />
      ))}

      <line x1={w / 2} y1="0" x2={w / 2} y2={h} stroke={color} strokeWidth="0.4" opacity="0.22" />
      <line x1="0" y1={mid} x2={w} y2={mid} stroke={color} strokeWidth="0.4" opacity="0.22" />

      <g clipPath="url(#scope-clip)">
        <g style={{ animation: `scopeScroll ${dur} linear infinite` }}>
          <polyline
            points={scrollPath}
            fill="none"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.55 + intensity * 0.35}
          />
        </g>
      </g>

      <text
        x="8"
        y="14"
        fontFamily="DM Mono"
        fontSize="9"
        fontWeight="600"
        fill={color}
        opacity="0.75"
      >
        CH1 5V/div
      </text>
      <text
        x="8"
        y={h - 6}
        fontFamily="DM Mono"
        fontSize="9"
        fontWeight="600"
        fill={color}
        opacity="0.7"
      >
        CH2 1ms/div
      </text>

      <style>{`
        @keyframes scopeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${w}px); }
        }
      `}</style>
    </svg>
  );
}
