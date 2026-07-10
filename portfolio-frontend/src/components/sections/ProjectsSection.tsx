'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Project } from '@/types';

interface Props {
  data: Project[];
  label?: string;
  heading?: string;
}

export default function ProjectsSection({ data, label, heading }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 6vw, 80px)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <style>{`
        .project-row {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        @media (max-width: 700px) {
          .project-row { gap: 12px; }
          .project-tags { order: 3; width: 100%; }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
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
          {label ?? ''}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 11vw, 9rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '60px',
          }}
        >
          {heading ?? ''}
        </motion.h2>

        <div style={{ maxWidth: '1200px' }}>
          {data.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-row"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: '1px solid rgba(14,165,233,0.1)',
                padding: '32px 0',
                cursor: 'pointer',
                background: hovered === project.id ? 'rgba(14,165,233,0.03)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--blue)', minWidth: '24px' }}>
                0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1.1rem, 4vw, 2rem)',
                  fontWeight: 600,
                  color: hovered === project.id ? 'var(--blue)' : 'var(--white)',
                  flex: 1,
                  minWidth: '160px',
                  transition: 'color 0.2s',
                }}
              >
                {project.title}
              </span>
              <div className="project-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.techStack?.split(',').slice(0, 3).map((t, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--muted)',
                      border: '1px solid rgba(14,165,233,0.2)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                    }}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--blue)',
                    textDecoration: 'none',
                    transform: hovered === project.id ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform 0.2s',
                    display: 'inline-block',
                  }}
                >
                  VIEW →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {hovered !== null && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 20,
            top: mousePos.y - 60,
            width: '200px',
            height: '120px',
            background: 'var(--surface)',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '8px',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--blue)' }}>
            {data.find((p) => p.id === hovered)?.category}
          </span>
        </div>
      )}
    </section>
  );
}
