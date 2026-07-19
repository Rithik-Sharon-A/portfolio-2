'use client';

export default function GPIOPinout({
  color = '#00D4FF',
  size = 148,
  onPinClick,
}: {
  color?: string;
  size?: number;
  onPinClick?: (label: string) => void;
}) {
  const accent = '#00D4FF';
  const pins = [
    { label: 'VCC', col: '#FF6B6B', tech: null },
    { label: 'GND', col: '#94A3B8', tech: null },
    { label: 'PA0', col: color, tech: 'GPIO' },
    { label: 'PA1', col: color, tech: 'UART' },
    { label: 'PB0', col: color, tech: 'SPI' },
    { label: 'PB1', col: accent, tech: 'I2C' },
    { label: 'PC13', col: accent, tech: 'STM32' },
    { label: 'NRST', col: '#FBBF24', tech: 'C/C++' },
  ];

  const h = 28 + pins.length * 20;

  return (
    <svg width={size} height={size * (h / 140)} viewBox={`0 0 140 ${h}`}>
      <text
        x="70"
        y="14"
        textAnchor="middle"
        fontFamily="DM Mono"
        fontSize="10"
        fontWeight="600"
        fill={color}
        opacity="0.95"
        letterSpacing="0.12em"
      >
        GPIO HEADER
      </text>

      {pins.map((pin, i) => {
        const cy = 34 + i * 20;
        const interactive = Boolean(onPinClick && pin.tech);
        return (
          <g
            key={pin.label}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={() => pin.tech && onPinClick?.(pin.tech)}
          >
            <title>{pin.tech ? `Open · ${pin.tech}` : pin.label}</title>
            <text
              x="18"
              y={cy + 4}
              fontFamily="DM Mono"
              fontSize="9"
              fill={pin.col}
              opacity="0.85"
              textAnchor="middle"
            >
              {i + 1}
            </text>

            <circle
              cx="42"
              cy={cy}
              r="6"
              fill="none"
              stroke={pin.col}
              strokeWidth="1.6"
              opacity="0.95"
              style={{
                filter: interactive ? `drop-shadow(0 0 4px ${pin.col})` : undefined,
              }}
            >
              {interactive && (
                <animate attributeName="opacity" values="0.7;1;0.7" dur={`${2.2 + i * 0.15}s`} repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="42" cy={cy} r="2.4" fill={pin.col} opacity="0.9" />

            <line
              x1="48"
              y1={cy}
              x2="58"
              y2={cy}
              stroke={pin.col}
              strokeWidth="1.2"
              opacity="0.7"
            />

            <text
              x="62"
              y={cy + 4}
              fontFamily="DM Mono"
              fontSize="11"
              fontWeight="600"
              fill={pin.col}
              opacity="1"
            >
              {pin.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
