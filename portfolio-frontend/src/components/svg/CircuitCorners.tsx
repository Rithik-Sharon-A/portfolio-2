'use client';

export default function CircuitCorners({ opacity = 0.4 }: { opacity?: number }) {
  const CYAN = '#00D4FF';
  const TEAL = '#00FFE5';
  const DIM = '#00A8CC';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity,
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <filter id="ccGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ccDotGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#ccGlow)" opacity="0.6">
        <path d="M0 100 L100 100 L120 120 L280 120" fill="none" stroke={DIM} strokeWidth="0.8" />
        <path d="M80 0 L80 80 L100 100" fill="none" stroke={DIM} strokeWidth="0.8" />
        <circle cx="280" cy="120" r="3" fill={CYAN} filter="url(#ccDotGlow)" />
        <circle cx="80" cy="80" r="2.5" fill={TEAL} filter="url(#ccDotGlow)" />
        <path d="M0 0 L0 50 L30 50" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.5" />
        <path d="M50 0 L100 0" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.4" />
      </g>

      <g filter="url(#ccGlow)" opacity="0.6">
        <path d="M1440 100 L1340 100 L1320 120 L1200 120" fill="none" stroke={DIM} strokeWidth="0.8" />
        <path d="M1360 0 L1360 80 L1340 100" fill="none" stroke={DIM} strokeWidth="0.8" />
        <circle cx="1200" cy="120" r="3" fill={CYAN} filter="url(#ccDotGlow)" />
        <path d="M1440 0 L1440 50 L1410 50" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.5" />
      </g>

      <g filter="url(#ccGlow)" opacity="0.5">
        <path d="M0 780 L100 780 L120 760 L260 760" fill="none" stroke={DIM} strokeWidth="0.8" />
        <path d="M80 900 L80 820 L100 800 L100 780" fill="none" stroke={DIM} strokeWidth="0.8" />
        <circle cx="260" cy="760" r="3" fill={TEAL} filter="url(#ccDotGlow)" />
        <path d="M0 900 L0 860 L40 860" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.4" />
      </g>

      <g filter="url(#ccGlow)" opacity="0.5">
        <path d="M1440 780 L1340 780 L1320 800 L1180 800" fill="none" stroke={DIM} strokeWidth="0.8" />
        <path d="M1360 900 L1360 820 L1340 800" fill="none" stroke={DIM} strokeWidth="0.8" />
        <circle cx="1180" cy="800" r="3" fill={CYAN} filter="url(#ccDotGlow)" />
        <path d="M1440 900 L1440 860 L1400 860" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.4" />
      </g>
    </svg>
  );
}
