export default function UARTDiagram({ color = '#0EA5E9' }: { color?: string }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80">
      <text x="5" y="25" fontFamily="DM Mono" fontSize="9"
        fill={color} opacity="0.7">TX</text>
      <line x1="25" y1="20" x2="175" y2="20"
        stroke={color} strokeWidth="0.8" opacity="0.3" />

      <text x="5" y="55" fontFamily="DM Mono" fontSize="9"
        fill="#00FF88" opacity="0.7">RX</text>
      <line x1="25" y1="50" x2="175" y2="50"
        stroke="#00FF88" strokeWidth="0.8" opacity="0.3" />

      {[0, 1, 0, 1, 1, 0, 1, 0].map((bit, i) => {
        const x = 25 + i * 18;
        const y = bit ? 12 : 22;
        return (
          <g key={i}>
            <rect x={x} y={y} width="16" height="10"
              fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
            {bit === 1 && (
              <rect x={x + 1} y={y + 1} width="14" height="8"
                fill={color} opacity="0.2" />
            )}
          </g>
        );
      })}

      <text x="80" y="70" fontFamily="DM Mono" fontSize="7"
        fill={color} opacity="0.4" textAnchor="middle">
        115200 baud
      </text>
    </svg>
  );
}
