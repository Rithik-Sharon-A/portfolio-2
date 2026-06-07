'use client';

const cricketWords = ['BOUNDARY', 'CENTURY', 'WICKET', 'OVER', 'CREASE', 'PITCH', 'INNINGS'];
const techWords = ['REACT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'FASTAPI', 'POSTGRES', 'DOCKER'];

export default function MarqueeSection() {
  return (
    <div style={{ background: 'var(--ink)', overflow: 'hidden', padding: '14px 0' }}>
      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-left { animation: marqueeLeft 20s linear infinite; display: flex; white-space: nowrap; }
        .marquee-right { animation: marqueeRight 24s linear infinite; display: flex; white-space: nowrap; }
      `}</style>

      <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
        <div className="marquee-left">
          {[...cricketWords, ...cricketWords, ...cricketWords, ...cricketWords].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--bg)',
                letterSpacing: '0.15em',
                marginRight: '32px',
              }}
            >
              {w} ·
            </span>
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-right">
          {[...techWords, ...techWords, ...techWords, ...techWords].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '12px',
                color: 'var(--tan)',
                letterSpacing: '0.1em',
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
