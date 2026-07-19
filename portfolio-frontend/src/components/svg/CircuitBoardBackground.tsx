'use client';

/** Solid hero backdrop — no circuit art. */
export default function CircuitBoardBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#010509',
      }}
    />
  );
}
