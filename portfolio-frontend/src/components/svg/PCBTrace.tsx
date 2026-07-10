export default function PCBTrace({
  color = '#0EA5E9',
  opacity = 0.15,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="0" y1="150" x2="400" y2="150" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="500" y1="150" x2="900" y2="150" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="0" y1="450" x2="300" y2="450" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="1100" y1="600" x2="1440" y2="600" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="400" y1="0" x2="400" y2="300" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="900" y1="150" x2="900" y2="500" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="300" y1="450" x2="300" y2="900" stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1="1100" y1="0" x2="1100" y2="600" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="400" cy="150" r="4" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="900" cy="150" r="4" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="300" cy="450" r="4" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="1100" cy="600" r="4" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
      <circle cx="400" cy="300" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity} />
      <circle cx="900" cy="500" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity} />
      <circle cx="300" cy="700" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity={opacity} />
    </svg>
  );
}
