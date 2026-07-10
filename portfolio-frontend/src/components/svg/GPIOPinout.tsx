export default function GPIOPinout({ color = '#0EA5E9' }: { color?: string }) {
  const accent = '#00FF88';
  const pins = [
    { label: 'VCC', col: '#FF4444' },
    { label: 'GND', col: '#888' },
    { label: 'PA0', col: color },
    { label: 'PA1', col: color },
    { label: 'PB0', col: color },
    { label: 'PB1', col: accent },
    { label: 'PC13', col: accent },
    { label: 'NRST', col: '#FFD700' },
  ];

  return (
    <svg width="120" height="180" viewBox="0 0 120 180">
      <text x="60" y="12" textAnchor="middle"
        fontFamily="DM Mono" fontSize="8" fill={color} opacity="0.6">
        GPIO HEADER
      </text>

      {pins.map((pin, i) => (
        <g key={i}>
          <text x="20" y={30 + i * 18} fontFamily="DM Mono"
            fontSize="7" fill={pin.col} opacity="0.5"
            textAnchor="middle">
            {i + 1}
          </text>

          <circle cx="40" cy={26 + i * 18} r="5"
            fill="none" stroke={pin.col} strokeWidth="1.2" />
          <circle cx="40" cy={26 + i * 18} r="2"
            fill={pin.col} opacity="0.6" />

          <text x="52" y={30 + i * 18}
            fontFamily="DM Mono" fontSize="8"
            fill={pin.col} opacity="0.8">
            {pin.label}
          </text>

          <line x1="45" y1={26 + i * 18} x2="50" y2={26 + i * 18}
            stroke={pin.col} strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
