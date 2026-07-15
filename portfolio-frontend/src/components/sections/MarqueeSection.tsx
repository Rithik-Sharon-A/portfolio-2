'use client';

interface Props {
  line1?: string;
  line2?: string;
}

export default function MarqueeSection({ line1, line2 }: Props) {
  const wordsTop = (line1 ?? '').split(',').map((w) => w.trim()).filter(Boolean);
  const wordsBottom = (line2 ?? '').split(',').map((w) => w.trim()).filter(Boolean);

  return (
    <div
      style={{
        background: 'var(--surface)',
        overflow: 'hidden',
        padding: '12px 0',
        borderTop: '1px solid rgba(81,246,218,0.1)',
        borderBottom: '1px solid rgba(81,246,218,0.1)',
      }}
    >
      <style>{`
        .mL { animation: marqueeLeft 18s linear infinite; display:flex; white-space:nowrap; }
        .mR { animation: marqueeRight 22s linear infinite; display:flex; white-space:nowrap; }
      `}</style>
      <div style={{ overflow: 'hidden', marginBottom: '6px' }}>
        <div className="mL">
          {[...wordsTop, ...wordsTop, ...wordsTop, ...wordsTop].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--green)',
                letterSpacing: '0.2em',
                marginRight: '32px',
                textShadow: '0 0 8px rgba(81,246,218,0.3)',
              }}
            >
              {w} ·
            </span>
          ))}
        </div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="mR">
          {[...wordsBottom, ...wordsBottom, ...wordsBottom, ...wordsBottom].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                color: 'var(--blue)',
                letterSpacing: '0.15em',
                marginRight: '32px',
              }}
            >
              {w} ·
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
