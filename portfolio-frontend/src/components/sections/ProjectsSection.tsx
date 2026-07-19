'use client';

import { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Project } from '@/types';
import { useInstrumentBus } from '@/context/InstrumentBus';
import FirmwareInspector from '@/components/sections/FirmwareInspector';

interface Props {
  data: Project[];
  label?: string;
  heading?: string;
}

export default function ProjectsSection({ data, label, heading }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const {
    openProject,
    activeProjectId,
    techFilter,
    projectsHighlight,
    filterByTech,
  } = useInstrumentBus();

  const filtered = useMemo(() => {
    if (!techFilter) return data;
    const q = techFilter.toLowerCase();
    return data.filter((p) => (p.techStack || '').toLowerCase().includes(q));
  }, [data, techFilter]);

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(70px, 12vw, 120px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        outline: projectsHighlight ? '1px solid rgba(0,212,255,0.35)' : 'none',
        outlineOffset: '-1px',
        transition: 'outline 0.3s ease',
      }}
    >
          <div className="pcb-grid alive" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            color: 'var(--blue)',
            letterSpacing: '0.14em',
            marginBottom: 12,
          }}
        >
          {label}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 16,
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
            letterSpacing: '0.06em',
            marginBottom: 36,
            maxWidth: 520,
          }}
        >
          Select a module to open the Firmware Inspector.
          {techFilter ? (
            <>
              {' '}
              Filter active:{' '}
              <button
                type="button"
                onClick={() => filterByTech(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#00D4FF',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  letterSpacing: 'inherit',
                  textDecoration: 'underline',
                }}
              >
                {techFilter} ×
              </button>
            </>
          ) : null}
        </p>

        <div>
          {filtered.map((project, i) => {
            const tags = (project.techStack || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
              .slice(0, 4);
            const active = activeProjectId === project.documentId;
            return (
              <motion.button
                key={project.documentId}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.05 }}
                onClick={() => openProject(project.documentId)}
                className="eng-pulse project-row"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  borderTop: '1px solid rgba(0,212,255,0.12)',
                  borderLeft: active ? '2px solid #00D4FF' : '2px solid transparent',
                  borderRight: 'none',
                  borderBottom: 'none',
                  padding: '28px 12px 28px 16px',
                  background: active ? 'rgba(0,212,255,0.05)' : 'transparent',
                  cursor: 'pointer',
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 12,
                    color: 'rgba(0,212,255,0.55)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="project-title"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)',
                      fontWeight: 700,
                      color: 'var(--white)',
                      marginBottom: 8,
                    }}
                  >
                    {project.title}
                  </div>
                  <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: 'DM Mono, monospace',
                          fontSize: 10,
                          color: 'var(--muted)',
                          border: '1px solid rgba(0,212,255,0.18)',
                          padding: '3px 8px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className="project-inspect"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    color: '#00D4FF',
                  }}
                >
                  INSPECT →
                </span>
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>
              No modules match this filter.
            </p>
          )}
        </div>
      </div>

      <FirmwareInspector project={null} projects={data} />
    </section>
  );
}
