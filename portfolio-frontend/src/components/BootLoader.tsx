'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '[ OK ] POWER-ON SELF TEST',
  '[ OK ] INIT GPIO PORTS',
  '[ OK ] UART READY @ 115200 BAUD',
  '[ OK ] MOUNTING PORTFOLIO v2.0',
  '[ OK ] SYSTEM ONLINE',
];

const LINE_INTERVAL = 260;
const FADE_DELAY = 400;

export default function BootLoader() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) {
      setDone(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * LINE_INTERVAL));
    });
    timers.push(
      setTimeout(() => setFading(true), BOOT_LINES.length * LINE_INTERVAL + FADE_DELAY)
    );
    timers.push(
      setTimeout(() => {
        setDone(true);
        sessionStorage.setItem('booted', '1');
      }, BOOT_LINES.length * LINE_INTERVAL + FADE_DELAY + 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#080C10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', lineHeight: 2, minWidth: '280px' }}>
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: i === BOOT_LINES.length - 1 ? '#00FF88' : '#475569' }}>
            <span style={{ color: '#00FF88' }}>{line.slice(0, 6)}</span>
            {line.slice(6)}
          </div>
        ))}
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '14px',
            background: '#00FF88',
            animation: 'blink 0.8s step-end infinite',
            verticalAlign: 'middle',
          }}
        />
      </div>
    </div>
  );
}
