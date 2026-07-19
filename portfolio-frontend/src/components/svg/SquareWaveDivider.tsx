interface Props {
  color?: string;
  background?: string;
  flip?: boolean;
}

export default function SquareWaveDivider({ color = '#00D4FF', background = 'transparent', flip = false }: Props) {
  const period = 120;
  const high = 8;
  const low = 32;
  const width = 1440;
  let d = `M0,${low}`;
  for (let x = 0; x < width; x += period) {
    d += ` H${x + period * 0.4} V${high} H${x + period * 0.9} V${low}`;
  }
  d += ` H${width}`;

  return (
    <div style={{ background, lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none' }} aria-hidden>
      <svg
        viewBox={`0 0 ${width} 40`}
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '32px' }}
      >
        <path d={d} fill="none" stroke={color} strokeWidth="1.2" opacity="0.25" />
      </svg>
    </div>
  );
}
