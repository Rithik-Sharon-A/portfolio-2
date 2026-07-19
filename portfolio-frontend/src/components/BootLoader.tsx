'use client';

import { useEffect, useMemo, useState } from 'react';
import { parseLines } from '@/lib/cmsText';

const DEFAULT_BOOT_LINES = [
  '[ OK ] POWER-ON SELF TEST',
  '[ OK ] ATTACH DEBUG PROBE',
  '[ OK ] OPEN UART @ 115200',
  '[ OK ] ENUMERATE PERIPHERALS',
  '[ OK ] LOAD FIRMWARE IMAGE',
  '[ OK ] SYSTEM ONLINE',
];

const LINE_INTERVAL = 240;
const FADE_DELAY = 380;

export default function BootLoader({
  title,
  lines: linesRaw,
}: {
  title?: string | null;
  lines?: string | null;
}) {
  const bootLines = useMemo(() => {
    const parsed = parseLines(linesRaw);
    return parsed.length ? parsed : DEFAULT_BOOT_LINES;
  }, [linesRaw]);
  const bootTitle = title || 'EMBEDDED WORKSTATION · BOOT';

  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) {
      setDone(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * LINE_INTERVAL));
    });
    timers.push(
      setTimeout(() => setFading(true), bootLines.length * LINE_INTERVAL + FADE_DELAY),
    );
    timers.push(
      setTimeout(() => {
        setDone(true);
        sessionStorage.setItem('booted', '1');
      }, bootLines.length * LINE_INTERVAL + FADE_DELAY + 480),
    );
    return () => timers.forEach(clearTimeout);
  }, [bootLines]);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#020D14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', lineHeight: 2, minWidth: '300px' }}>
        <div style={{ color: 'rgba(0,212,255,0.55)', marginBottom: 12, letterSpacing: '0.14em', fontSize: 11 }}>
          {bootTitle}
        </div>
        {bootLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: i === bootLines.length - 1 ? '#00D4FF' : '#2A4A5A' }}>
            <span style={{ color: '#00D4FF' }}>{line.slice(0, 6)}</span>
            {line.slice(6)}
          </div>
        ))}
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '14px',
            background: '#00D4FF',
            animation: 'blink 0.8s step-end infinite',
            verticalAlign: 'middle',
          }}
        />
      </div>
    </div>
  );
}
