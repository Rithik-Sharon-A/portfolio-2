export default function WireframeChip({ size = 120, color = '#00D4FF' }: { size?: number; color?: string }) {
  const pins = [32, 44, 56, 68, 80, 92];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <rect x="30" y="20" width="60" height="80" fill="none" stroke={color} strokeWidth="1.5" />
      {pins.map((y) => (
        <line key={`ll${y}`} x1="10" y1={y} x2="30" y2={y} stroke={color} strokeWidth="1.2" />
      ))}
      {pins.map((y) => (
        <line key={`rl${y}`} x1="90" y1={y} x2="110" y2={y} stroke={color} strokeWidth="1.2" />
      ))}
      {pins.map((y) => (
        <circle key={`l${y}`} cx="10" cy={y} r="2" fill={color} />
      ))}
      {pins.map((y) => (
        <circle key={`r${y}`} cx="110" cy={y} r="2" fill={color} />
      ))}
      <path d="M30 20 Q60 10 90 20" fill="none" stroke={color} strokeWidth="1" />
      <line x1="45" y1="35" x2="75" y2="35" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="45" y1="60" x2="75" y2="60" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="45" y1="85" x2="75" y2="85" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="45" y1="35" x2="45" y2="85" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="60" y1="35" x2="60" y2="85" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="75" y1="35" x2="75" y2="85" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
