'use client';

import { useEffect, useState } from 'react';

interface Props {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

export default function TypeText({ text, delay = 0, speed = 22, showCursor = true }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span>
      {text.slice(0, count)}
      {showCursor && (
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '0.5em',
            marginLeft: '2px',
            borderBottom: '2px solid currentColor',
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}
    </span>
  );
}
