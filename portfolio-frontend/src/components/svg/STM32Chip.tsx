export default function STM32Chip({
  size = 160,
  color = '#0EA5E9',
  animated = true,
}: {
  size?: number;
  color?: string;
  animated?: boolean;
}) {
  const pins = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      style={animated ? { animation: 'float 4s ease-in-out infinite' } : {}}
    >
      <rect
        x="35" y="35" width="90" height="90"
        fill="none" stroke={color} strokeWidth="1.5"
        style={{ animation: 'dash 2s ease forwards' }}
        strokeDasharray="360" strokeDashoffset="360"
      />

      <rect x="45" y="45" width="70" height="70"
        fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />

      {[55, 65, 75, 85, 95, 105].map((x) => (
        <line key={`v${x}`} x1={x} y1="45" x2={x} y2="115"
          stroke={color} strokeWidth="0.3" opacity="0.2" />
      ))}
      {[55, 65, 75, 85, 95, 105].map((y) => (
        <line key={`h${y}`} x1="45" y1={y} x2="115" y2={y}
          stroke={color} strokeWidth="0.3" opacity="0.2" />
      ))}

      <path d="M35 55 Q35 35 55 35"
        fill="none" stroke={color} strokeWidth="1.5" />

      {pins.map((_, i) => {
        const y = 42 + i * 10;
        return (
          <g key={`lp${i}`}>
            <line x1="10" y1={y} x2="35" y2={y}
              stroke={color} strokeWidth="1.2" />
            <rect x="6" y={y - 3} width="6" height="6"
              fill={color} opacity="0.8" />
          </g>
        );
      })}

      {pins.map((_, i) => {
        const y = 42 + i * 10;
        return (
          <g key={`rp${i}`}>
            <line x1="125" y1={y} x2="150" y2={y}
              stroke={color} strokeWidth="1.2" />
            <rect x="148" y={y - 3} width="6" height="6"
              fill={color} opacity="0.8" />
          </g>
        );
      })}

      {pins.map((_, i) => {
        const x = 42 + i * 10;
        return (
          <g key={`tp${i}`}>
            <line x1={x} y1="10" x2={x} y2="35"
              stroke={color} strokeWidth="1.2" />
            <rect x={x - 3} y="6" width="6" height="6"
              fill={color} opacity="0.8" />
          </g>
        );
      })}

      {pins.map((_, i) => {
        const x = 42 + i * 10;
        return (
          <g key={`bp${i}`}>
            <line x1={x} y1="125" x2={x} y2="150"
              stroke={color} strokeWidth="1.2" />
            <rect x={x - 3} y="148" width="6" height="6"
              fill={color} opacity="0.8" />
          </g>
        );
      })}

      <text
        x="80" y="77"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="9"
        fill={color}
        opacity="0.9"
      >
        STM32
      </text>
      <text
        x="80" y="89"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="7"
        fill={color}
        opacity="0.5"
      >
        F407VG
      </text>

      <circle cx="35" cy="35" r="3" fill={color} opacity="0.6" />
      <circle cx="125" cy="35" r="3" fill={color} opacity="0.6" />
      <circle cx="35" cy="125" r="3" fill={color} opacity="0.6" />
      <circle cx="125" cy="125" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}
