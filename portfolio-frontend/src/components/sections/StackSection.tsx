'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { StackDomain, StackItem, Project } from '@/types';
import { useInstrumentBus } from '@/context/InstrumentBus';

interface Props {
  data: StackItem[];
  projects?: Project[];
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

export default function StackSection({
  data,
  projects = [],
  label,
  heading,
  subtitle,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { filterByTech, techFilter, openProject } = useInstrumentBus();

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

  const filteredProjects = useMemo(() => {
    if (!techFilter) return [];
    const q = techFilter.toLowerCase();
    return projects.filter((p) => (p.techStack || '').toLowerCase().includes(q));
  }, [techFilter, projects]);

  return (
    <section
      id="stack"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(32px, 5vw, 48px) clamp(20px, 6vw, 80px)',
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
            marginBottom: '12px',
          }}
        >
          {label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 6,
            color: 'var(--white)',
          }}
        >
          {heading}
        </motion.h2>

        <p
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            color: 'rgba(226,232,240,0.6)',
            letterSpacing: '0.04em',
            marginBottom: 28,
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: techFilter ? '1fr 300px' : '1fr',
            gap: 24,
            transition: 'grid-template-columns 0.3s ease',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {grouped.map((group, gi) => (
                <motion.div
                  key={group.domain}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: gi * 0.04 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(0,212,255,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 9,
                      letterSpacing: '0.14em',
                      color: 'rgba(0,212,255,0.65)',
                      whiteSpace: 'nowrap',
                      width: 68,
                      flexShrink: 0,
                    }}
                  >
                    {group.domain.toUpperCase()}
                  </span>

                  <div
                    style={{
                      width: 1,
                      height: 12,
                      background: 'rgba(0,212,255,0.3)',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {group.items.map((item) => {
                      const active = techFilter?.toLowerCase() === item.name.toLowerCase();
                      return (
                        <motion.button
                          key={item.documentId}
                          type="button"
                          onClick={() => filterByTech(active ? null : item.name)}
                          whileHover={{ borderColor: 'rgba(0,212,255,0.55)' }}
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 11,
                            letterSpacing: '0.05em',
                            color: active ? '#020D14' : 'rgba(226,232,240,0.9)',
                            background: active ? '#00D4FF' : 'transparent',
                            border: `1px solid rgba(0,212,255,${active ? 0.9 : 0.35})`,
                            padding: '4px 12px',
                            borderRadius: 999,
                            cursor: 'pointer',
                            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: active ? 6 : 0,
                          }}
                        >
                          {item.name}
                          {active && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                filterByTech(null);
                              }}
                              style={{
                                fontSize: 10,
                                lineHeight: 1,
                                color: '#020D14',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              ×
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {techFilter && (
              <motion.div
                key="project-panel"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  border: '1px solid rgba(0,212,255,0.2)',
                  background: 'rgba(6,24,36,0.7)',
                  padding: '14px 16px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    color: 'rgba(0,212,255,0.7)',
                    marginBottom: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>MATCHED SYSTEMS · {filteredProjects.length}</span>
                  <button
                    type="button"
                    onClick={() => filterByTech(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(0,212,255,0.5)',
                      cursor: 'pointer',
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                    }}
                  >
                    CLEAR ×
                  </button>
                </div>

                {filteredProjects.length === 0 ? (
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      color: 'rgba(226,232,240,0.4)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    No systems use {techFilter}.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredProjects.map((p, i) => (
                      <motion.button
                        key={p.documentId}
                        type="button"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => openProject(p.documentId)}
                        style={{
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px solid rgba(0,212,255,0.07)',
                          padding: '10px 0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 9,
                            color: 'rgba(0,212,255,0.5)',
                            flexShrink: 0,
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <div
                            style={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#E8F4F8',
                              marginBottom: 2,
                            }}
                          >
                            {p.title}
                          </div>
                          <div
                            style={{
                              fontFamily: 'DM Mono, monospace',
                              fontSize: 9,
                              color: 'rgba(0,212,255,0.6)',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {(p.techStack || '')
                              .split(',')
                              .slice(0, 3)
                              .map((t) => t.trim())
                              .join(' · ')}
                          </div>
                        </div>
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 9,
                            color: 'rgba(0,212,255,0.4)',
                            letterSpacing: '0.1em',
                            flexShrink: 0,
                          }}
                        >
                          INSPECT →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
