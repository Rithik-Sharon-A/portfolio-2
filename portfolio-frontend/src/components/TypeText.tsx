'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** Single line, or list that cycles after each type/delete. */
  text?: string;
  texts?: string[];
  delay?: number;
  speed?: number;
  deleteSpeed?: number;
  holdMs?: number;
  gapMs?: number;
  loop?: boolean;
  showCursor?: boolean;
}

export default function TypeText({
  text = '',
  texts,
  delay = 0,
  speed = 28,
  deleteSpeed = 16,
  holdMs = 1800,
  gapMs = 400,
  loop = true,
  showCursor = true,
}: Props) {
  const lines = (texts?.filter(Boolean).length ? texts : [text]).filter(Boolean) as string[];
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!lines.length) {
      setDisplayed('');
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const run = async () => {
      await wait(delay);
      let lineIdx = 0;

      while (!cancelled) {
        const full = lines[lineIdx % lines.length];

        for (let i = 1; i <= full.length; i++) {
          if (cancelled) return;
          setDisplayed(full.slice(0, i));
          await wait(speed);
        }

        await wait(holdMs);
        if (cancelled) return;

        if (!loop && lineIdx === lines.length - 1) return;

        for (let i = full.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setDisplayed(full.slice(0, i));
          await wait(deleteSpeed);
        }

        await wait(gapMs);
        if (cancelled) return;

        lineIdx += 1;
        if (!loop && lineIdx >= lines.length) return;
      }
    };

    void run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lines joined for stable deps
  }, [lines.join('\0'), delay, speed, deleteSpeed, holdMs, gapMs, loop]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '0.55em',
            marginLeft: '2px',
            borderBottom: '2px solid currentColor',
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}
    </span>
  );
}
