export default function OscilloscopeScreen({
  width = 280,
  height = 180,
  color = '#0EA5E9',
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  const w = width;
  const h = height;
  const mid = h / 2;

  const points = [
    `0,${mid}`,
    `${w * 0.05},${mid}`,
    `${w * 0.05},${mid - h * 0.3}`,
    `${w * 0.2},${mid - h * 0.3}`,
    `${w * 0.2},${mid + h * 0.3}`,
    `${w * 0.35},${mid + h * 0.3}`,
    `${w * 0.35},${mid - h * 0.3}`,
    `${w * 0.5},${mid - h * 0.3}`,
    `${w * 0.5},${mid + h * 0.3}`,
    `${w * 0.65},${mid + h * 0.3}`,
    `${w * 0.65},${mid - h * 0.3}`,
    `${w * 0.8},${mid - h * 0.3}`,
    `${w * 0.8},${mid + h * 0.3}`,
    `${w * 0.95},${mid + h * 0.3}`,
    `${w * 0.95},${mid}`,
    `${w},${mid}`,
  ].join(' ');

  // Coordinates rounded so SSR and client render identical strings (raw trig
  // output differs in the last float digit between builds → hydration mismatch)
  const sinePoints = Array.from({ length: 100 }, (_, i) => {
    const x = Math.round(((i / 99) * w) * 100) / 100;
    const y = Math.round((mid + Math.sin((i / 99) * Math.PI * 4) * (h * 0.25)) * 100) / 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="0" y="0" width={w} height={h} rx="8"
        fill="rgba(0,0,0,0.6)" stroke={color} strokeWidth="1.5" />

      {[1, 2, 3, 4].map((i) => (
        <line key={`gh${i}`}
          x1="0" y1={h * i / 5} x2={w} y2={h * i / 5}
          stroke={color} strokeWidth="0.3" opacity="0.2" />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line key={`gv${i}`}
          x1={w * i / 10} y1="0" x2={w * i / 10} y2={h}
          stroke={color} strokeWidth="0.3" opacity="0.2" />
      ))}

      <line x1={w / 2} y1="0" x2={w / 2} y2={h}
        stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1={mid} x2={w} y2={mid}
        stroke={color} strokeWidth="0.5" opacity="0.3" />

      <polyline points={sinePoints}
        fill="none" stroke="#00FF88" strokeWidth="1.2" opacity="0.5" />

      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeDasharray="1200"
        strokeDashoffset="1200"
        style={{ animation: 'oscilloscope 1.5s ease-out forwards' }}
      />

      <text x="8" y="14" fontFamily="DM Mono" fontSize="8"
        fill={color} opacity="0.6">CH1 5V/div</text>
      <text x="8" y={h - 6} fontFamily="DM Mono" fontSize="8"
        fill="#00FF88" opacity="0.5">CH2 1ms/div</text>

      <text x={w - 30} y={mid - h * 0.3 + 4} fontFamily="DM Mono"
        fontSize="7" fill={color} opacity="0.5">+5V</text>
      <text x={w - 30} y={mid + h * 0.3 + 4} fontFamily="DM Mono"
        fontSize="7" fill={color} opacity="0.5">0V</text>

      <rect x="0" y="0" width={w} height="2"
        fill={color} opacity="0.05"
        style={{ animation: 'scanline 4s linear infinite' }} />
    </svg>
  );
}
