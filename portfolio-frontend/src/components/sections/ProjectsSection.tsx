'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Project } from '@/types';

interface Props {
  data: Project[];
}

export default function ProjectsSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    setMousePos({ x: e.clientX, y: e.clientY });
  }

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--ink)',
        padding: '120px 80px',
        minHeight: '100vh',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          color: 'var(--tan)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        03 · INNINGS PLAYED
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(4rem, 10vw, 9rem)',
          fontWeight: 700,
          color: 'var(--bg)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '60px',
        }}
      >
        PROJECTS
      </motion.h2>

      <div style={{ maxWidth: '1200px' }}>
        {data.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              borderTop: '1px solid rgba(245,245,239,0.1)',
              padding: '32px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              cursor: 'pointer',
              background: hoveredId === project.id ? 'rgba(245,245,239,0.03)' : 'transparent',
              transition: 'background 0.2s',
            }}
          >
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                color: 'var(--muted)',
                minWidth: '24px',
              }}
            >
              0{i + 1}
            </span>

            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: hoveredId === project.id ? 'var(--tan)' : 'var(--bg)',
                flex: 1,
                transition: 'color 0.2s',
              }}
            >
              {project.title}
            </span>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.techStack?.split(',').slice(0, 3).map((tech, j) => (
                <span
                  key={j}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    border: '1px solid rgba(245,245,239,0.15)',
                    borderRadius: '100px',
                    padding: '4px 12px',
                  }}
                >
                  {tech.trim()}
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
                  color: 'var(--tan)',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  transform: hoveredId === project.id ? 'translateX(6px)' : 'translateX(0)',
                  display: 'inline-block',
                }}
              >
                VIEW →
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {hoveredId !== null && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 20,
            top: mousePos.y - 60,
            width: '200px',
            height: '130px',
            background: 'rgba(245,245,239,0.08)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(245,245,239,0.1)',
            pointerEvents: 'none',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
            {data.find((p) => p.id === hoveredId)?.category}
          </span>
        </div>
      )}
    </section>
  );
}
