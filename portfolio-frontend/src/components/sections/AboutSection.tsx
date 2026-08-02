'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { About } from '@/types';
import CircuitCorners from '@/components/svg/CircuitCorners';

interface Props {
  data: About | null;
}

function Row({ k, v }: { k: string; v?: string | null }) {
  if (!v?.trim()) return null;
  return (
    <div
      className="about-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(100px, 180px) 1fr',
        gap: 16,
        padding: '14px 0',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
      }}
    >
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          color: 'rgba(0,212,255,0.7)',
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 15,
          lineHeight: 1.65,
          color: 'rgba(226,232,240,0.9)',
        }}
      >
        {v}
      </div>
    </div>
  );
}

export default function AboutSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (!data) return null;

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .about-panel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <CircuitCorners opacity={0.35} />

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
            marginBottom: 12,
          }}
        >
          {data.sectionLabel}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
            marginBottom: 32,
          }}
        >
          {data.heading}
        </motion.h2>

        <motion.div
          className="about-panel-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(16px, 3vw, 32px)',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              border: '1px solid rgba(0,212,255,0.16)',
              background: 'rgba(22,24,29,0.55)',
              padding: '8px 20px 4px',
              height: '100%',
            }}
          >
            <Row k={data.labelName || 'NAME'} v={data.name} />
            <Row k={data.labelMission || 'MISSION'} v={data.para1} />
            <Row k={data.labelFocus || 'CURRENT FOCUS'} v={data.focus} />
            <Row k={data.labelPhilosophy || 'PHILOSOPHY'} v={data.philosophy} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              {[
                { v: data.stat1Value, l: data.stat1Label },
                { v: data.stat2Value, l: data.stat2Label },
                { v: data.stat3Value, l: data.stat3Label },
                { v: '115200', l: 'UART BAUD RATE' },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    border: '1px solid rgba(0,212,255,0.14)',
                    padding: 'clamp(12px, 2vw, 16px)',
                    background: 'var(--surface)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                      fontWeight: 700,
                      color: '#00D4FF',
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 9,
                      color: 'var(--muted)',
                      letterSpacing: '0.12em',
                      marginTop: 4,
                    }}
                  >
                    {(s.l || '').toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                border: '1px solid rgba(0,212,255,0.14)',
                background: 'rgba(22,24,29,0.55)',
                padding: '14px 18px',
              }}
            >
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  color: 'rgba(0,212,255,0.5)',
                  marginBottom: 10,
                }}
              >
                SYSTEM SPEC
              </div>
              {[
                { k: 'MCU', v: 'STM32 · ESP32' },
                { k: 'PROTOCOL', v: 'UART · SPI · I2C · CAN' },
                { k: 'OS', v: 'FreeRTOS · Bare-Metal' },
                { k: 'LANG', v: 'C / C++ / JavaScript' },
                { k: 'IDE', v: 'STM32CubeIDE · VS Code' },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: 12,
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(0,212,255,0.07)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 9,
                      color: 'rgba(0,212,255,0.55)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      color: 'rgba(226,232,240,0.7)',
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
