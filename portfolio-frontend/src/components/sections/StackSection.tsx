'use client';

import { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StackDomain, StackItem } from '@/types';
import { useInstrumentBus } from '@/context/InstrumentBus';

function mediaUrl(url?: string) {
  if (!url) return '';
  return url;
}

interface Props {
  data: StackItem[];
  label?: string;
  heading?: string;
  subtitle?: string;
}

const DOMAIN_ORDER: StackDomain[] = [
  'Firmware',
  'MCU',
  'Protocols',
  'RTOS',
  'Tools',
  'Cloud',
  'AI',
  'Testing',
];

export default function StackSection({ data, label, heading, subtitle }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { filterByTech, techFilter } = useInstrumentBus();

  const grouped = useMemo(() => {
    const map = new Map<string, StackItem[]>();
    for (const item of data) {
      const d = item.domain || 'Firmware';
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(item);
    }
    return DOMAIN_ORDER.filter((d) => map.has(d)).map((d) => ({
      domain: d,
      items: map.get(d)!,
    }));
  }, [data]);

  return (
    <section
      id="stack"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 6vw, 80px)',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            color: 'var(--blue)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {label}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 7vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 12,
            color: 'var(--white)',
          }}
        >
          {heading}
        </motion.h2>
        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            color: 'var(--muted)',
            marginBottom: 40,
            maxWidth: 560,
            letterSpacing: '0.04em',
          }}
        >
          {subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {grouped.map((group, gi) => (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.06 }}
            >
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  color: 'rgba(0,212,255,0.75)',
                  marginBottom: 14,
                  borderBottom: '1px solid rgba(0,212,255,0.12)',
                  paddingBottom: 8,
                }}
              >
                {group.domain.toUpperCase()}
              </div>
              <div
                className="stack-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 'clamp(8px, 1.5vw, 12px)',
                }}
              >
                {group.items.map((item) => {
                  const active = techFilter?.toLowerCase() === item.name.toLowerCase();
                  const iconSrc = item.icon?.url ? mediaUrl(item.icon.url) : item.iconUrl;
                  return (
                    <button
                      key={item.documentId}
                      type="button"
                      onClick={() =>
                        filterByTech(active ? null : item.name)
                      }
                      className="eng-pulse"
                      style={{
                        textAlign: 'left',
                        border: `1px solid rgba(0,212,255,${active ? 0.45 : 0.14})`,
                        background: active ? 'rgba(0,212,255,0.08)' : 'var(--surface)',
                        padding: 'clamp(12px, 2vw, 20px) clamp(10px, 1.5vw, 16px)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                    >
                      {iconSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={iconSrc}
                          alt=""
                          style={{
                            width: 22,
                            height: 22,
                            objectFit: 'contain',
                            marginBottom: 8,
                            opacity: 0.85,
                          }}
                        />
                      ) : null}
                      <div
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: 15,
                          fontWeight: 600,
                          color: 'var(--white)',
                          marginBottom: 6,
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'DM Mono, monospace',
                          fontSize: 10,
                          color: 'var(--muted)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {item.cricketRole}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
