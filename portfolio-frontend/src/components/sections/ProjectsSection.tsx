'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Project, SiteSettings } from '@/types';
import { useInstrumentBus } from '@/context/InstrumentBus';
import FirmwareInspector from '@/components/sections/FirmwareInspector';

interface Props {
  data: Project[];
  label?: string;
  heading?: string;
  ui?: Pick<
    SiteSettings,
    | 'projectsHint'
    | 'projectsFilterLabel'
    | 'projectsEmpty'
    | 'projectsInspectLabel'
    | 'inspectorTitle'
    | 'inspectorOverview'
    | 'inspectorHardware'
    | 'inspectorArchitecture'
    | 'inspectorProtocols'
    | 'inspectorChallenges'
    | 'inspectorDecisions'
    | 'inspectorFirmware'
    | 'inspectorLessons'
    | 'inspectorTech'
    | 'inspectorGallery'
    | 'inspectorVideo'
    | 'inspectorRepo'
    | 'inspectorDocs'
    | 'inspectorLive'
  > | null;
}

function getPreviewImage(project: Project): string | null {
  return (
    project.col1Image1?.url ||
    project.col1Image2?.url ||
    project.col2Image?.url ||
    project.blockDiagram?.url ||
    project.schematic?.url ||
    null
  );
}

export default function ProjectsSection({ data, label, heading, ui }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const {
    openProject,
    activeProjectId,
    techFilter,
    projectsHighlight,
    filterByTech,
  } = useInstrumentBus();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  const filtered = useMemo(() => {
    if (!techFilter) return data;
    const q = techFilter.toLowerCase();
    return data.filter((p) => (p.techStack || '').toLowerCase().includes(q));
  }, [data, techFilter]);

  const previewLeft =
    typeof window !== 'undefined' && mousePos.x + 24 + 260 > window.innerWidth
      ? mousePos.x - 284
      : mousePos.x + 24;

  return (
    <section
      id="work"
      ref={ref}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 6vw, 80px)',
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
          {ui?.projectsHint || 'Select a module to open the Firmware Inspector.'}
          {techFilter ? (
            <>
              {' '}
              {ui?.projectsFilterLabel || 'Filter active:'}{' '}
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
                onMouseEnter={() => {
                  if (!isMobile) setHoveredId(project.documentId);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (isMobile) {
                    if (mobileExpandedId === project.documentId) {
                      openProject(project.documentId);
                      setMobileExpandedId(null);
                    } else {
                      setMobileExpandedId(project.documentId);
                    }
                  } else {
                    openProject(project.documentId);
                  }
                }}
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
                  <AnimatePresence mode="wait">
                    {isMobile && mobileExpandedId === project.documentId && (
                      <motion.div
                        key="mobile-preview"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ overflow: 'hidden', marginBottom: 10, marginTop: 8 }}
                      >
                        {(() => {
                          const img = getPreviewImage(project);
                          return img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img}
                              alt={project.title}
                              style={{
                                width: '100%',
                                maxHeight: 180,
                                objectFit: 'cover',
                                display: 'block',
                                border: '1px solid rgba(0,212,255,0.2)',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                height: 120,
                                background: 'rgba(0,212,255,0.04)',
                                border: '1px solid rgba(0,212,255,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'DM Mono, monospace',
                                  fontSize: 10,
                                  color: 'rgba(0,212,255,0.5)',
                                  letterSpacing: '0.12em',
                                }}
                              >
                                IMAGE COMING SOON
                              </span>
                            </div>
                          );
                        })()}
                        <p
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 9,
                            color: 'rgba(0,212,255,0.45)',
                            letterSpacing: '0.1em',
                            marginTop: 6,
                            marginBottom: 0,
                          }}
                        >
                          TAP AGAIN TO INSPECT →
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                  {ui?.projectsInspectLabel || 'INSPECT →'}
                </span>
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>
              {ui?.projectsEmpty || 'No modules match this filter.'}
            </p>
          )}
        </div>

        {!isMobile &&
          typeof window !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {hoveredId && (
                <motion.div
                  key={hoveredId}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    position: 'fixed',
                    left: previewLeft,
                    top: mousePos.y - 80,
                    zIndex: 999,
                    pointerEvents: 'none',
                    borderRadius: 0,
                    border: '1px solid rgba(0,212,255,0.22)',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    background: 'rgba(14,15,18,0.97)',
                  }}
                >
                  {(() => {
                    const project = data.find((p) => p.documentId === hoveredId);
                    if (!project) return null;
                    const img = getPreviewImage(project);
                    return img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={project.title}
                        style={{ width: 260, height: 160, objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 260,
                          height: 160,
                          background: 'rgba(0,212,255,0.04)',
                          border: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 10,
                            color: 'rgba(0,212,255,0.5)',
                            letterSpacing: '0.12em',
                          }}
                        >
                          IMAGE COMING SOON
                        </span>
                        <span
                          style={{
                            fontFamily: 'DM Mono, monospace',
                            fontSize: 9,
                            color: 'rgba(0,212,255,0.3)',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {project.title.toUpperCase().slice(0, 20)}
                        </span>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>

      <FirmwareInspector project={null} projects={data} labels={ui} />
    </section>
  );
}
