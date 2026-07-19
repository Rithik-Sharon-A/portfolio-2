'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

/** Dispatch from interactive UI to send a pulse into the nearest edge trace. */
export function emitPcbPulse(clientX: number, clientY: number) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('pcb-pulse', { detail: { clientX, clientY } }),
  );
}

type TraceDef = {
  id: string;
  d: string;
  /** Sample points in viewBox space for nearest-trace lookup */
  samples: [number, number][];
};

/** Manhattan copper routes hugging the board edges — STM32-dev-board vernacular. */
const TRACES: TraceDef[] = [
  {
    id: 'L1',
    d: 'M 28 40 L 28 120 L 52 120 L 52 200 L 28 200 L 28 340 L 70 340 L 70 420',
    samples: [
      [28, 80],
      [52, 160],
      [28, 270],
      [70, 380],
    ],
  },
  {
    id: 'L2',
    d: 'M 48 60 L 48 160 L 90 160 L 90 240 L 48 240 L 48 520 L 80 520 L 80 620 L 48 620 L 48 760',
    samples: [
      [48, 110],
      [90, 200],
      [48, 380],
      [80, 570],
      [48, 700],
    ],
  },
  {
    id: 'L3',
    d: 'M 18 280 L 18 480 L 60 480 L 60 560 L 100 560 L 100 700 L 40 700 L 40 820',
    samples: [
      [18, 380],
      [60, 520],
      [100, 630],
      [40, 760],
    ],
  },
  {
    id: 'L4',
    d: 'M 72 80 L 120 80 L 120 140 L 72 140 L 72 300',
    samples: [
      [96, 80],
      [120, 110],
      [72, 220],
    ],
  },
  {
    id: 'R1',
    d: 'M 1572 50 L 1572 180 L 1520 180 L 1520 280 L 1572 280 L 1572 460 L 1530 460 L 1530 580',
    samples: [
      [1572, 110],
      [1520, 230],
      [1572, 370],
      [1530, 520],
    ],
  },
  {
    id: 'R2',
    d: 'M 1550 100 L 1550 220 L 1490 220 L 1490 360 L 1550 360 L 1550 640 L 1510 640 L 1510 780 L 1550 780',
    samples: [
      [1550, 160],
      [1490, 290],
      [1550, 500],
      [1510, 710],
    ],
  },
  {
    id: 'R3',
    d: 'M 1582 300 L 1582 500 L 1540 500 L 1540 620 L 1480 620 L 1480 740 L 1560 740 L 1560 850',
    samples: [
      [1582, 400],
      [1540, 560],
      [1480, 680],
      [1560, 800],
    ],
  },
  {
    id: 'R4',
    d: 'M 1500 60 L 1460 60 L 1460 130 L 1500 130 L 1500 260',
    samples: [
      [1480, 60],
      [1460, 95],
      [1500, 200],
    ],
  },
  {
    id: 'T1',
    d: 'M 140 24 L 320 24 L 320 56 L 480 56 L 480 24 L 700 24 L 700 48 L 860 48',
    samples: [
      [230, 24],
      [400, 56],
      [590, 24],
      [780, 48],
    ],
  },
  {
    id: 'T2',
    d: 'M 900 20 L 1100 20 L 1100 52 L 1280 52 L 1280 20 L 1460 20',
    samples: [
      [1000, 20],
      [1190, 52],
      [1370, 20],
    ],
  },
  {
    id: 'T3',
    d: 'M 200 48 L 200 90 L 360 90 L 360 48 L 520 48 L 520 80 L 640 80',
    samples: [
      [200, 70],
      [360, 70],
      [520, 64],
      [640, 80],
    ],
  },
  {
    id: 'B1',
    d: 'M 120 876 L 300 876 L 300 844 L 480 844 L 480 876 L 720 876 L 720 850 L 900 850',
    samples: [
      [210, 876],
      [390, 844],
      [600, 876],
      [810, 850],
    ],
  },
  {
    id: 'B2',
    d: 'M 960 880 L 1180 880 L 1180 848 L 1360 848 L 1360 880 L 1500 880',
    samples: [
      [1070, 880],
      [1270, 848],
      [1430, 880],
    ],
  },
  {
    id: 'B3',
    d: 'M 180 850 L 180 810 L 340 810 L 340 850 L 520 850 L 520 820 L 680 820',
    samples: [
      [180, 830],
      [340, 830],
      [520, 835],
      [680, 820],
    ],
  },
  {
    id: 'C-TL',
    d: 'M 40 40 L 100 40 L 100 100 L 160 100 L 160 40 L 220 40',
    samples: [
      [70, 40],
      [100, 70],
      [160, 70],
      [190, 40],
    ],
  },
  {
    id: 'C-TR',
    d: 'M 1560 40 L 1500 40 L 1500 100 L 1440 100 L 1440 40 L 1380 40',
    samples: [
      [1530, 40],
      [1500, 70],
      [1440, 70],
      [1410, 40],
    ],
  },
  {
    id: 'C-BL',
    d: 'M 40 860 L 100 860 L 100 800 L 160 800 L 160 860 L 240 860',
    samples: [
      [70, 860],
      [100, 830],
      [160, 830],
      [200, 860],
    ],
  },
  {
    id: 'C-BR',
    d: 'M 1560 860 L 1500 860 L 1500 800 L 1440 800 L 1440 860 L 1360 860',
    samples: [
      [1530, 860],
      [1500, 830],
      [1440, 830],
      [1400, 860],
    ],
  },
];

const VIAS: [number, number][] = [
  [28, 120],
  [52, 200],
  [70, 340],
  [48, 160],
  [90, 240],
  [80, 520],
  [18, 480],
  [100, 560],
  [72, 140],
  [1572, 180],
  [1520, 280],
  [1530, 460],
  [1490, 220],
  [1550, 360],
  [1510, 640],
  [1540, 500],
  [1480, 620],
  [320, 56],
  [700, 24],
  [1100, 52],
  [200, 90],
  [520, 48],
  [300, 844],
  [720, 876],
  [1180, 848],
  [340, 810],
  [100, 40],
  [160, 100],
  [1500, 100],
  [100, 860],
  [160, 800],
  [1500, 800],
];

const PADS: { x: number; y: number; w: number; h: number }[] = [
  { x: 12, y: 200, w: 10, h: 36 },
  { x: 12, y: 420, w: 10, h: 48 },
  { x: 1578, y: 220, w: 10, h: 40 },
  { x: 1578, y: 520, w: 10, h: 44 },
  { x: 280, y: 8, w: 48, h: 8 },
  { x: 1200, y: 8, w: 56, h: 8 },
  { x: 260, y: 884, w: 52, h: 8 },
  { x: 1180, y: 884, w: 48, h: 8 },
];

type ActivePulse = {
  key: number;
  traceId: string;
  durationMs: number;
};

function nearestTraceId(vx: number, vy: number): string {
  let best = TRACES[0].id;
  let bestDist = Infinity;
  for (const t of TRACES) {
    for (const [sx, sy] of t.samples) {
      const dx = sx - vx;
      const dy = sy - vy;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        best = t.id;
      }
    }
  }
  return best;
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function CircuitBoardBackground() {
  const uid = useId().replace(/:/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const [pulses, setPulses] = useState<ActivePulse[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  const spawnPulse = useCallback(
    (traceId: string, durationMs = 3200) => {
      if (reducedMotion) return;
      setPulses((prev) => {
        const next = [...prev, { key: Date.now() + Math.random(), traceId, durationMs }];
        return next.slice(-4);
      });
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timer = setTimeout(() => {
        if (cancelled) return;
        const pick = TRACES[Math.floor(Math.random() * TRACES.length)];
        spawnPulse(pick.id, randomBetween(2800, 4000));
        schedule();
      }, randomBetween(8000, 12000));
    };

    timer = setTimeout(() => {
      if (!cancelled) {
        spawnPulse(TRACES[Math.floor(Math.random() * TRACES.length)].id, 3400);
        schedule();
      }
    }, randomBetween(2500, 5000));

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reducedMotion, spawnPulse]);

  useEffect(() => {
    const onPulse = (e: Event) => {
      const { clientX, clientY } = (e as CustomEvent<{ clientX: number; clientY: number }>).detail;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const vx = ((clientX - rect.left) / rect.width) * 1600;
      const vy = ((clientY - rect.top) / rect.height) * 900;
      spawnPulse(nearestTraceId(vx, vy), 2200);
    };
    window.addEventListener('pcb-pulse', onPulse);
    return () => window.removeEventListener('pcb-pulse', onPulse);
  }, [spawnPulse]);

  const maskId = `pcb-edge-mask-${uid}`;
  const copper = 'rgba(0, 180, 200, 0.07)';
  const copperThin = 'rgba(0, 180, 200, 0.055)';

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pcb-env"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Layer 1 — substrate */}
      <div style={{ position: 'absolute', inset: 0, background: '#070B0F' }} />

      {/* Layer 2 — edge PCB copper */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id={`pcb-center-fade-${uid}`} cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="black" />
            <stop offset="55%" stopColor="black" />
            <stop offset="78%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="1600" height="900" fill={`url(#pcb-center-fade-${uid})`} />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <rect x="0" y="0" width="110" height="900" fill="rgba(0,160,180,0.025)" />
          <rect x="1490" y="0" width="110" height="900" fill="rgba(0,160,180,0.025)" />
          <rect x="0" y="0" width="1600" height="70" fill="rgba(0,160,180,0.02)" />
          <rect x="0" y="830" width="1600" height="70" fill="rgba(0,160,180,0.02)" />

          {TRACES.map((t) => (
            <path
              key={t.id}
              d={t.d}
              fill="none"
              stroke={copper}
              strokeWidth={1.6}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          ))}

          <path
            d="M 36 150 L 36 250 M 1564 150 L 1564 250 M 400 32 L 400 70 M 1200 868 L 1200 830"
            fill="none"
            stroke={copperThin}
            strokeWidth={1}
          />

          {VIAS.map(([cx, cy], i) => (
            <g key={`v${i}`}>
              <circle cx={cx} cy={cy} r="3.2" fill="none" stroke={copper} strokeWidth="1" />
              <circle cx={cx} cy={cy} r="1.1" fill={copper} />
            </g>
          ))}

          {PADS.map((p, i) => (
            <rect
              key={`p${i}`}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              rx="1"
              fill="none"
              stroke={copperThin}
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={`smt-l${i}`}
              x="14"
              y={210 + i * 8}
              width="6"
              height="3"
              fill={copperThin}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={`smt-r${i}`}
              x="1580"
              y={230 + i * 8}
              width="6"
              height="3"
              fill={copperThin}
            />
          ))}
        </g>

        {/* Layer 4 — travelling signal pulses (unmasked so edge pulses stay visible) */}
        {pulses.map((p) => {
          const def = TRACES.find((t) => t.id === p.traceId);
          if (!def) return null;
          return (
            <PulseAlongPath
              key={p.key}
              d={def.d}
              durationMs={p.durationMs}
              onDone={() => setPulses((prev) => prev.filter((x) => x.key !== p.key))}
            />
          );
        })}
      </svg>

      {/* Layer 3 — engineering grid (slightly reduced) */}
      <div
        className="pcb-env-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.85,
          maskImage:
            'radial-gradient(ellipse 70% 65% at 50% 48%, black 20%, rgba(0,0,0,0.55) 55%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 65% at 50% 48%, black 20%, rgba(0,0,0,0.55) 55%, transparent 85%)',
        }}
      />
    </div>
  );
}

function PulseAlongPath({
  d,
  durationMs,
  onDone,
}: {
  d: string;
  durationMs: number;
  onDone: () => void;
}) {
  const ref = useRef<SVGPathElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const L = path.getTotalLength();
    const head = Math.min(36, Math.max(18, L * 0.07));
    path.style.strokeDasharray = `${head} ${L + head}`;
    path.style.strokeDashoffset = '0';

    const anim = path.animate(
      [
        { strokeDashoffset: '0', opacity: 0.15 },
        { strokeDashoffset: String(-(L * 0.15)), opacity: 0.45, offset: 0.12 },
        { strokeDashoffset: String(-(L * 0.85)), opacity: 0.4, offset: 0.88 },
        { strokeDashoffset: String(-(L + head)), opacity: 0.1 },
      ],
      { duration: durationMs, easing: 'linear', fill: 'forwards' },
    );

    anim.onfinish = () => onDoneRef.current();
    return () => anim.cancel();
  }, [d, durationMs]);

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke="rgba(0, 212, 255, 0.32)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="miter"
    />
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}
