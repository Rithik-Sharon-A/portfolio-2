export default function CircuitNode({ size = 60, color = '#00FF88' }: { size?: number; color?: string }) {
  const c = size / 2;
  const r = size * 0.12;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      <line x1={c} y1="0" x2={c} y2={c - r} stroke={color} strokeWidth="1" />
      <line x1={c} y1={c + r} x2={c} y2={size} stroke={color} strokeWidth="1" />
      <line x1="0" y1={c} x2={c - r} y2={c} stroke={color} strokeWidth="1" />
      <line x1={c + r} y1={c} x2={size} y2={c} stroke={color} strokeWidth="1" />
      <rect x="0" y={c - 3} width="6" height="6" fill={color} />
      <rect x={size - 6} y={c - 3} width="6" height="6" fill={color} />
      <rect x={c - 3} y="0" width="6" height="6" fill={color} />
      <rect x={c - 3} y={size - 6} width="6" height="6" fill={color} />
    </svg>
  );
}
