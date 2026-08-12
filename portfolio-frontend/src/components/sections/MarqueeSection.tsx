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
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        padding: '12px 0',
        borderTop: '1px solid rgba(0,212,255,0.1)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
      }}
    >
      <style>{`
        .mL { animation: marqueeLeft 18s linear infinite; display:flex; white-space:nowrap; width:max-content; }
        .mR { animation: marqueeRight 22s linear infinite; display:flex; white-space:nowrap; width:max-content; }
      `}</style>
      <div style={{ overflow: 'hidden', width: '100%', maxWidth: '100%', marginBottom: '6px' }}>
        <div className="mL">
          {[...wordsTop, ...wordsTop, ...wordsTop, ...wordsTop].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                fontWeight: 400,
                color: '#00D4FF',
                letterSpacing: '0.2em',
                marginRight: '32px',
                textShadow: '0 0 8px rgba(0,212,255,0.3)',
              }}
            >
              {w} ·
            </span>
          ))}
        </div>
      </div>
      <div style={{ overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
        <div className="mR">
          {[...wordsBottom, ...wordsBottom, ...wordsBottom, ...wordsBottom].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                color: '#00FFE5',
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
