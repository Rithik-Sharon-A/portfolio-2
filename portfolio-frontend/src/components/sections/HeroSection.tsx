'use client';

import { motion } from 'framer-motion';
import { Hero } from '@/types';
import OscilloscopeScreen from '@/components/svg/OscilloscopeScreen';
import STM32Chip from '@/components/svg/STM32Chip';
import ESP32Board from '@/components/svg/ESP32Board';
import GPIOPinout from '@/components/svg/GPIOPinout';
import UARTDiagram from '@/components/svg/UARTDiagram';
import RotatingCircuitBadge from '@/components/svg/RotatingCircuitBadge';
import TypeText from '@/components/TypeText';

interface Props {
  data: Hero | null;
}

export default function HeroSection({ data }: Props) {
  const bioLeft = data?.bioLeft ?? '';
  const bioRight = data?.bioRight ?? '';
  const counterValue = data?.counterValue ?? '';
  const counterLabel = data?.counterLabel ?? '';
  const heroWordLine1 = data?.heroWordLine1 ?? '';
  const heroWordLine2 = data?.heroWordLine2 ?? '';
  const badgeOuterText = data?.badgeOuterText ?? '';
  const badgeInnerText = data?.badgeInnerText ?? '';
  const bottomLabel = data?.bottomLabel ?? '';
  const bottomName = data?.bottomName ?? '';
  const bottomLocation = data?.bottomLocation ?? '';

  return (
    <section id="hero" className="hero-section">
      <style>{`
        .hero-section {
          --nav-clear: clamp(58px, 7vh, 68px);
          --badge-size: clamp(100px, 13vmin, 176px);
          --side-scale: min(1.05, max(0.68, calc(100dvh / 820)));
          --center-scale: min(1, max(0.72, calc(100dvh / 760)));
          --title-size: clamp(2.8rem, min(12vw, 15vmin), 9rem);

          height: 100dvh;
          max-height: 100dvh;
          background: var(--bg);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-section .hero-rotating-badge {
          width: var(--badge-size) !important;
          height: var(--badge-size) !important;
        }

        .hero-float-top {
          position: absolute;
          top: var(--nav-clear);
          left: 0;
          right: 0;
          padding: 0 clamp(12px, 2.5vw, 40px);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 4;
          pointer-events: none;
        }
        .hero-float-top > * { pointer-events: auto; }

        .hero-center-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: calc(var(--nav-clear) + 4px) clamp(12px, 2vw, 32px) 0;
          z-index: 2;
        }

        .hero-center-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          max-width: 900px;
          transform: scale(var(--center-scale));
          transform-origin: center center;
        }

        .hero-oscilloscope {
          margin-bottom: clamp(6px, 1.2vh, 14px);
          display: flex;
          justify-content: center;
        }
        .hero-section .hero-oscilloscope svg {
          width: min(420px, 48vw);
          height: auto;
          max-height: clamp(60px, 12vh, 110px);
        }

        .hero-word-inter,
        .hero-word-rupt {
          font-family: 'Syne', sans-serif;
          font-size: var(--title-size);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.88;
        }
        .hero-word-inter {
          color: var(--white);
          animation: flicker 12s infinite 3s;
        }
        .hero-word-rupt {
          color: var(--green);
          text-shadow: 0 0 40px rgba(0,255,136,0.3);
        }

        .hero-uart {
          margin-top: clamp(6px, 1.2vh, 14px);
          display: flex;
          justify-content: center;
        }
        .hero-section .hero-uart svg {
          width: min(260px, 42vw);
          height: auto;
          max-height: clamp(44px, 8vh, 72px);
        }

        .hero-side-left,
        .hero-side-right {
          position: absolute;
          top: 50%;
          z-index: 3;
        }
        .hero-side-left {
          left: clamp(20px, 4vw, 90px);
          transform: translateY(-50%) scale(var(--side-scale));
          transform-origin: left center;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.5vh, 28px);
          max-width: 220px;
        }
        .hero-side-right {
          right: clamp(20px, 4vw, 90px);
          transform: translateY(-50%) scale(var(--side-scale));
          transform-origin: right center;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2.5vh, 24px);
          align-items: flex-end;
        }

        .hero-side-bio {
          font-family: 'DM Mono', monospace;
          font-size: clamp(11px, 1.4vmin, 13px);
          color: #64748B;
          line-height: 1.8;
        }
        .hero-side-left .hero-side-bio { max-width: 210px; }
        .hero-side-right .hero-side-bio {
          text-align: right;
          max-width: 210px;
        }

        .hero-counter-value {
          font-family: 'DM Mono', monospace;
          font-size: clamp(1rem, 2.2vmin, 1.75rem);
          color: var(--green);
          line-height: 1;
          text-shadow: 0 0 20px rgba(0,255,136,0.5);
          letter-spacing: 0.08em;
        }
        .hero-counter-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 0.15em;
          margin-top: 3px;
        }

        .hero-bottom-bar {
          flex-shrink: 0;
          border-top: 1px solid rgba(0,255,136,0.35);
          box-shadow: 0 -8px 30px rgba(0,255,136,0.06);
          padding: clamp(14px, 2.4vh, 22px) clamp(16px, 3vw, 48px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(13,17,23,0.96);
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hero-bottom-label {
          font-family: 'DM Mono', monospace;
          font-size: clamp(10px, 1.3vmin, 12px);
          color: #7C8DA3;
          letter-spacing: 0.18em;
        }
        .hero-bottom-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(17px, 2.8vmin, 24px);
          letter-spacing: 0.04em;
          color: #F1F5F9;
          text-shadow: 0 0 24px rgba(0,255,136,0.35);
        }

        .hero-mobile-embeds,
        .hero-mobile-bio { display: none; }

        @media (max-height: 700px) {
          .hero-section {
            --badge-size: clamp(76px, 10vmin, 110px);
            --center-scale: min(0.88, max(0.65, calc(100dvh / 680)));
            --side-scale: min(0.7, max(0.5, calc(100dvh / 900)));
          }
          .hero-side-bio { display: none; }
        }

        @media (max-width: 1024px) {
          .hero-side-left,
          .hero-side-right { display: none; }
          .hero-center-wrap {
            padding-left: 16px;
            padding-right: 16px;
          }
          .hero-mobile-embeds {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 16px;
            margin-top: 16px;
          }
          .hero-mobile-bio {
            display: block !important;
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            color: var(--muted);
            line-height: 1.7;
            margin-top: 12px;
            padding: 0 8px;
          }
        }

        @media (max-width: 640px) {
          .hero-float-top {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .hero-counter { text-align: center !important; }
          .hero-bottom-bar {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>

      <div className="pcb-grid" style={{ position: 'absolute', inset: 0 }} />

      <div style={{
        position: 'absolute', top: '-150px', left: '-150px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
        opacity: 0.08, animation: 'scanline 10s linear infinite',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {/* Traces as dashed paths so the dash flow reads as moving current */}
        <path d="M0,160 H380 V400" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.14"
          strokeDasharray="8 12" style={{ animation: 'traceFlow 5s linear infinite' }} />
        <path d="M1060,0 V300 H1440" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.13"
          strokeDasharray="8 12" style={{ animation: 'traceRun 9s linear infinite' }} />
        <path d="M200,800 H700 V900" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.11"
          strokeDasharray="8 12" style={{ animation: 'traceFlow 7s linear infinite reverse' }} />
        <path d="M1440,620 H1120 V900" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.1"
          strokeDasharray="8 12" style={{ animation: 'traceRun 11s linear infinite 2s' }} />
        <path d="M0,560 H240 V760 H520" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.1"
          strokeDasharray="8 12" style={{ animation: 'traceFlow 8s linear infinite 1s' }} />
        <path d="M760,0 V120 H980" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.09"
          strokeDasharray="8 12" style={{ animation: 'traceRun 10s linear infinite 4s' }} />

        {/* Via joints pulse like status LEDs */}
        <circle cx="380" cy="160" r="4" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.3"
          style={{ animation: 'blink 4s step-end infinite 1s' }} />
        <circle cx="1060" cy="300" r="4" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.25"
          style={{ animation: 'blink 5s step-end infinite' }} />
        <circle cx="380" cy="400" r="5" fill="none" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.22" />
        <circle cx="700" cy="800" r="5" fill="none" stroke="#00FF88" strokeWidth="1.5" opacity="0.2"
          style={{ animation: 'blink 6s step-end infinite 2.5s' }} />
        <circle cx="240" cy="560" r="4" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.2" />
        <circle cx="1120" cy="620" r="4" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.2" />

        {/* Signal packets travelling along the traces */}
        <circle r="2.5" fill="#0EA5E9" opacity="0.8">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0,160 H380 V400" />
        </circle>
        <circle r="2.5" fill="#0EA5E9" opacity="0.7">
          <animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M1060,0 V300 H1440" />
        </circle>
        <circle r="2.5" fill="#00FF88" opacity="0.7">
          <animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M200,800 H700 V900" />
        </circle>
        <circle r="2.5" fill="#00FF88" opacity="0.65">
          <animateMotion dur="9s" begin="3.5s" repeatCount="indefinite" path="M1440,620 H1120 V900" />
        </circle>
        <circle r="2.5" fill="#0EA5E9" opacity="0.65">
          <animateMotion dur="8s" begin="0.5s" repeatCount="indefinite" path="M0,560 H240 V760 H520" />
        </circle>
      </svg>

      {/* Badge + counter float in corners — no vertical flex row */}
      <div className="hero-float-top">
        <motion.div
          className="hero-badge-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RotatingCircuitBadge size={148} outerText={badgeOuterText} innerText={badgeInnerText} />
        </motion.div>

        <motion.div
          className="hero-counter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'right' }}
        >
          <div className="hero-counter-value">{counterValue}</div>
          <div className="hero-counter-label">{counterLabel}</div>
        </motion.div>
      </div>

      <div className="hero-center-wrap">
        <div className="hero-side-left">
          <motion.p
            className="hero-side-bio"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TypeText text={bioLeft} delay={900} />
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <GPIOPinout color="#0EA5E9" />
          </motion.div>
        </div>

        <div className="hero-center-content">
          <motion.div
            className="hero-oscilloscope"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <OscilloscopeScreen width={300} height={72} color="#0EA5E9" />
          </motion.div>

          <motion.h1
            className="hero-word-inter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroWordLine1}
          </motion.h1>
          <motion.h1
            className="hero-word-rupt"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroWordLine2}
          </motion.h1>

          <motion.div
            className="hero-uart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <UARTDiagram color="#0EA5E9" />
          </motion.div>

          <motion.p
            className="hero-mobile-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypeText text={`${bioLeft} ${bioRight}`} delay={900} />
          </motion.p>

          <div className="hero-mobile-embeds">
            <GPIOPinout color="#0EA5E9" />
            <STM32Chip size={80} color="#0EA5E9" animated />
            <ESP32Board color="#0EA5E9" size={38} />
          </div>
        </div>

        <div className="hero-side-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <STM32Chip size={140} color="#0EA5E9" animated />
          </motion.div>

          <motion.p
            className="hero-side-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypeText text={bioRight} delay={1400} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <ESP32Board color="#0EA5E9" size={56} />
          </motion.div>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <span className="hero-bottom-label">{bottomLabel}</span>
        <span className="hero-bottom-name">{bottomName}</span>
        <span className="hero-bottom-label">{bottomLocation}</span>
      </div>
    </section>
  );
}
