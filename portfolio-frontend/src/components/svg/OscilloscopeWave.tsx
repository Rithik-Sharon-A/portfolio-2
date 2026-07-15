export default function OscilloscopeWave({
  color = '#00FF88',
  width = 300,
  height = 60,
  animated = true,
}: {
  color?: string;
  width?: number;
  height?: number;
  animated?: boolean;
}) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '100%' }}>
      <polyline
        points={`
          0,${height / 2}
          ${width * 0.08},${height / 2}
          ${width * 0.12},${height * 0.15}
          ${width * 0.2},${height * 0.15}
          ${width * 0.24},${height * 0.85}
          ${width * 0.32},${height * 0.85}
          ${width * 0.36},${height / 2}
          ${width * 0.44},${height / 2}
          ${width * 0.48},${height * 0.15}
          ${width * 0.56},${height * 0.15}
          ${width * 0.6},${height * 0.85}
          ${width * 0.68},${height * 0.85}
          ${width * 0.72},${height / 2}
          ${width * 0.8},${height / 2}
          ${width * 0.84},${height * 0.15}
          ${width * 0.92},${height * 0.15}
          ${width * 0.96},${height * 0.85}
          ${width},${height * 0.85}
        `}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeDasharray="800"
        strokeDashoffset="0"
        style={animated ? { animation: 'waveShift 3s linear infinite' } : {}}
      />
    </svg>
  );
}
