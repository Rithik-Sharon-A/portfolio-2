'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FolderGit2, FileText } from 'lucide-react';
import { Project, SiteSettings } from '@/types';
import { useInstrumentBus } from '@/context/InstrumentBus';

/** Media URLs are full https:// links or /public paths — no CMS prefix. */
function mediaUrl(url?: string) {
  if (!url) return '';
  return url;
}

type InspectorLabels = Pick<
  SiteSettings,
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
>;

function Block({ title, body }: { title: string; body?: string | null }) {
  if (!body?.trim()) return null;
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 10,
          letterSpacing: '0.14em',
          color: 'rgba(0,212,255,0.75)',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 14,
          lineHeight: 1.7,
          color: 'rgba(226,232,240,0.88)',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

export default function FirmwareInspector({
  project,
  projects,
  labels,
}: {
  project: Project | null;
  projects: Project[];
  labels?: InspectorLabels | null;
}) {
  const { activeProjectId, openProject } = useInstrumentBus();
  const active = project || projects.find((p) => p.documentId === activeProjectId) || null;
  const open = Boolean(active);
  const L = {
    title: labels?.inspectorTitle || 'FIRMWARE INSPECTOR',
    overview: labels?.inspectorOverview || 'OVERVIEW',
    hardware: labels?.inspectorHardware || 'HARDWARE USED',
    architecture: labels?.inspectorArchitecture || 'ARCHITECTURE',
    protocols: labels?.inspectorProtocols || 'COMMUNICATION PROTOCOLS',
    challenges: labels?.inspectorChallenges || 'CHALLENGES',
    decisions: labels?.inspectorDecisions || 'ENGINEERING DECISIONS',
    firmware: labels?.inspectorFirmware || 'FIRMWARE FEATURES',
    lessons: labels?.inspectorLessons || 'LESSONS LEARNED',
    tech: labels?.inspectorTech || 'TECH STACK',
    gallery: labels?.inspectorGallery || 'GALLERY / DIAGRAMS',
    video: labels?.inspectorVideo || 'VIDEO',
    repo: labels?.inspectorRepo || 'REPOSITORY',
    docs: labels?.inspectorDocs || 'DOCUMENTATION',
    live: labels?.inspectorLive || 'LIVE',
  };

  const gallery = [active?.col1Image1, active?.col1Image2, active?.col2Image, active?.blockDiagram, active?.schematic]
    .filter(Boolean)
    .map((m) => mediaUrl(m!.url));

  return (
    <AnimatePresence>
      {open && active && (
        <motion.aside
          key={active.documentId}
          initial={{ x: '100%', opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'min(520px, 100vw)',
            zIndex: 910,
            background: 'rgba(14,15,18,0.97)',
            borderLeft: '1px solid rgba(0,212,255,0.22)',
            boxShadow: '-16px 0 48px rgba(0,0,0,0.45)',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(14px)',
          }}
          role="dialog"
          aria-label={`Inspect ${active.title}`}
        >
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid rgba(0,212,255,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  color: 'rgba(0,212,255,0.7)',
                  marginBottom: 6,
                }}
              >
                {L.title} · {active.category.toUpperCase()}
              </div>
              <h2
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {active.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => openProject(null)}
              aria-label="Close inspector"
              style={{
                width: 36,
                height: 36,
                display: 'grid',
                placeItems: 'center',
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.18)',
                color: 'var(--muted)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 40px' }}>
            <Block title={L.overview} body={active.overview || active.description} />
            <Block title={L.hardware} body={active.hardwareUsed} />
            <Block title={L.architecture} body={active.architecture} />
            <Block title={L.protocols} body={active.protocols} />
            <Block title={L.challenges} body={active.challenges} />
            <Block title={L.decisions} body={active.decisions} />
            <Block title={L.firmware} body={active.firmwareFeatures} />
            <Block title={L.lessons} body={active.lessonsLearned} />

            {active.techStack && (
              <div style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'rgba(0,212,255,0.75)',
                    marginBottom: 10,
                  }}
                >
                  {L.tech}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {active.techStack.split(',').map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: 11,
                        color: 'var(--muted)',
                        border: '1px solid rgba(0,212,255,0.2)',
                        padding: '4px 10px',
                      }}
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'rgba(0,212,255,0.75)',
                    marginBottom: 10,
                  }}
                >
                  {L.gallery}
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {gallery.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      style={{
                        width: '100%',
                        border: '1px solid rgba(0,212,255,0.15)',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {active.video?.url && (
              <div style={{ marginBottom: 22 }}>
                <div
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: 'rgba(0,212,255,0.75)',
                    marginBottom: 10,
                  }}
                >
                  {L.video}
                </div>
                <video
                  controls
                  src={mediaUrl(active.video.url)}
                  style={{ width: '100%', border: '1px solid rgba(0,212,255,0.15)' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
              {active.repoUrl && (
                <a
                  href={active.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eng-pulse"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: '#00D4FF',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,212,255,0.3)',
                    padding: '10px 14px',
                  }}
                >
                  <FolderGit2 size={14} /> {L.repo}
                </a>
              )}
              {active.docsUrl && (
                <a
                  href={active.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: '#00D4FF',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,212,255,0.3)',
                    padding: '10px 14px',
                  }}
                >
                  <FileText size={14} /> {L.docs}
                </a>
              )}
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    color: '#00D4FF',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,212,255,0.3)',
                    padding: '10px 14px',
                  }}
                >
                  <ExternalLink size={14} /> {L.live}
                </a>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
