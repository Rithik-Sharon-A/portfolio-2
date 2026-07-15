export default function ESP32Board({
  color = '#00FF88',
  size = 80,
  onSelect,
}: {
  color?: string;
  size?: number;
  onSelect?: () => void;
}) {
  return (
    <svg
      width={size}
      height={size * 1.8}
      viewBox="0 0 80 144"
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        animation: 'float 5s ease-in-out infinite 1s',
        cursor: onSelect ? 'pointer' : undefined,
      }}
    >
      <rect x="8" y="8" width="64" height="128" rx="4"
        fill="none" stroke={color} strokeWidth="1.5" />

      <rect x="28" y="2" width="24" height="8"
        fill="none" stroke={color} strokeWidth="1" />

      <rect x="30" y="136" width="20" height="8" rx="2"
        fill="none" stroke={color} strokeWidth="1" />

      {[20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((y, i) => (
        <g key={`l${i}`}>
          <line x1="0" y1={y} x2="8" y2={y}
            stroke={color} strokeWidth="1" />
          <text x="10" y={y + 3} fontFamily="DM Mono" fontSize="5"
            fill={color} opacity="0.5">
            {['3V3', 'GND', 'IO23', 'IO22', 'TX', 'RX', 'IO21', 'IO19', 'IO18', 'IO5', 'IO17'][i]}
          </text>
        </g>
      ))}

      {[20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((y, i) => (
        <g key={`r${i}`}>
          <line x1="72" y1={y} x2="80" y2={y}
            stroke={color} strokeWidth="1" />
        </g>
      ))}

      <rect x="22" y="50" width="36" height="44" rx="2"
        fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <text x="40" y="69" textAnchor="middle"
        fontFamily="DM Mono" fontSize="6" fill={color} opacity="0.8">
        ESP32
      </text>
      <text x="40" y="79" textAnchor="middle"
        fontFamily="DM Mono" fontSize="5" fill={color} opacity="0.4">
        WROOM-32
      </text>

      <circle cx="20" cy="35" r="3" fill={color} opacity="0.6"
        style={{ animation: 'glowPulse 1.5s ease-in-out infinite' }} />
      <circle cx="60" cy="35" r="3" fill="#00FF88" opacity="0.5"
        style={{ animation: 'glowPulse 2s ease-in-out infinite 0.5s' }} />
    </svg>
  );
}
