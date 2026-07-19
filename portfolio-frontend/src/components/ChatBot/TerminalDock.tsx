'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Line {
  type: 'boot' | 'user' | 'assistant' | 'system';
  text: string;
}

const BOOT_LINES = [
  '> Boot Successful',
  '> Loading Strapi Knowledge Base...',
  '> Initializing Embedded Assistant...',
  '> UART Connection Established @115200',
  '> Firmware Assistant Ready.',
];

const COMMANDS: Record<string, string> = {
  help: 'Available: help · projects · hardware · firmware · experience · contact · clear — or ask me anything in plain English.',
  projects:
    'Deployed systems: 01 · MERN Movie Management Dashboard (React, Node, MongoDB, AWS). 02 · Agentic AI Digital Twin (RAG, OpenRouter, MERN). Type "tell me about project 1" for details.',
  hardware:
    'Hardware focus: STM32 (ARM Cortex-M), ESP32, GPIO/UART/SPI/I2C protocols, bare-metal C/C++ and RTOS concepts.',
  firmware:
    'Firmware expertise: C/C++, register-level programming, interrupt handling, peripheral drivers, moving from full-stack into embedded systems.',
  experience:
    'B.Tech ECE, SASTRA Deemed University (2021-2025). National Hackathon Finalist — Gidy AgentX (autonomous AI agents). Full-stack background, now going deep into embedded.',
  contact:
    'Email: rithiksharon.a@gmail.com · GitHub: github.com/Rithik-Sharon-A · LinkedIn: linkedin.com/in/rithik-sharon · Chennai, India',
};

export default function TerminalDock() {
  const [open, setOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openTerminal = () => setOpen(true);
    window.addEventListener('open-terminal', openTerminal);
    return () => window.removeEventListener('open-terminal', openTerminal);
  }, []);

  useEffect(() => {
    if (open && !booted) {
      setBooted(true);
      BOOT_LINES.forEach((text, i) => {
        setTimeout(() => {
          setLines((prev) => [...prev, { type: 'boot', text }]);
        }, i * 350);
      });
    }
  }, [open, booted]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open]);

  async function handleSubmit() {
    const cmd = input.trim();
    if (!cmd || loading) return;
    setInput('');
    setLines((prev) => [...prev, { type: 'user', text: cmd }]);

    const lower = cmd.toLowerCase();
    if (lower === 'clear') {
      setLines([]);
      return;
    }
    if (COMMANDS[lower]) {
      setLines((prev) => [...prev, { type: 'assistant', text: COMMANDS[lower] }]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cmd, history: [] }),
      });
      const data = await res.json();
      setLines((prev) => [
        ...prev,
        { type: 'assistant', text: data.reply || 'ERR: no response. Retry.' },
      ]);
    } catch {
      setLines((prev) => [
        ...prev,
        {
          type: 'assistant',
          text: 'ERR: connection failed. Email rithiksharon.a@gmail.com directly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const mono = { fontFamily: 'DM Mono, monospace' } as const;

  return (
    <>
      {!open && (
        <motion.button
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => setOpen(true)}
          className="term-launcher"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 998,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px clamp(14px, 4vw, 32px)',
            cursor: 'pointer',
            background: 'rgba(13,17,23,0.95)',
            backdropFilter: 'blur(12px)',
            border: 'none',
            borderTop: '1px solid rgba(0,212,255,0.3)',
            boxShadow: '0 -4px 30px rgba(0,212,255,0.08)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00D4FF',
              boxShadow: '0 0 8px #00D4FF',
              animation: 'glowPulse 2s infinite',
              flexShrink: 0,
            }}
          />
          <span
            className="term-launcher-label"
            style={{ ...mono, fontSize: 13, color: '#00D4FF', letterSpacing: '0.08em' }}
          >
            {'>_'} OPEN TERMINAL — FIRMWARE ASSISTANT
          </span>
          <span
            className="term-launcher-meta"
            style={{
              ...mono,
              fontSize: 11,
              color: '#2A4A5A',
              marginLeft: 'auto',
              letterSpacing: '0.1em',
            }}
          >
            UART @115200 | READY
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="term-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: 'min(460px, 70vh)',
              zIndex: 999,
              background: 'rgba(8,12,16,0.98)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(0,212,255,0.4)',
              boxShadow: '0 -10px 60px rgba(0,212,255,0.12)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px clamp(12px, 3vw, 24px)',
                borderBottom: '1px solid rgba(0,212,255,0.15)',
                background: 'rgba(0,212,255,0.03)',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#00D4FF',
                  boxShadow: '0 0 6px #00D4FF',
                }}
              />
              <span style={{ ...mono, fontSize: 12, color: '#E8F4F8', letterSpacing: '0.15em' }}>
                TERMINAL — FIRMWARE ASSISTANT
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 11,
                  color: '#2A4A5A',
                  marginLeft: 'auto',
                  letterSpacing: '0.1em',
                }}
              >
                UART @115200 | CONNECTED
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  ...mono,
                  background: 'none',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00D4FF',
                  fontSize: 11,
                  padding: '3px 10px',
                  cursor: 'pointer',
                  borderRadius: 3,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                {lines.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      ...mono,
                      fontSize: 13,
                      lineHeight: 2,
                      whiteSpace: 'pre-wrap',
                      color:
                        l.type === 'boot'
                          ? '#00FFE5'
                          : l.type === 'user'
                            ? '#E8F4F8'
                            : '#00D4FF',
                    }}
                  >
                    {l.type === 'user' ? `assistant@rs-embedded:~$ ${l.text}` : l.text}
                  </div>
                ))}
                {loading && (
                  <div
                    style={{
                      ...mono,
                      fontSize: 13,
                      color: '#00D4FF',
                      animation: 'blink 1s step-end infinite',
                    }}
                  >
                    {'>'} processing_query...
                  </div>
                )}
              </div>

              <div
                className="term-sidebar"
                style={{
                  width: 300,
                  borderLeft: '1px solid rgba(0,212,255,0.12)',
                  padding: '16px 20px',
                  overflowY: 'auto',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: '#2A4A5A',
                    letterSpacing: '0.15em',
                    marginBottom: 12,
                  }}
                >
                  AVAILABLE COMMANDS
                </div>
                {Object.keys(COMMANDS).map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setInput(c);
                      inputRef.current?.focus();
                    }}
                    style={{
                      ...mono,
                      fontSize: 12,
                      lineHeight: 2.2,
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 12,
                    }}
                  >
                    <span style={{ color: '#00D4FF', minWidth: 90 }}>{c}</span>
                    <span style={{ color: '#2A4A5A', fontSize: 11 }}>
                      {COMMANDS[c].split('·')[0].slice(0, 34)}…
                    </span>
                  </div>
                ))}
                <div style={{ ...mono, fontSize: 12, lineHeight: 2.2, display: 'flex', gap: 12 }}>
                  <span style={{ color: '#00D4FF', minWidth: 90 }}>clear</span>
                  <span style={{ color: '#2A4A5A', fontSize: 11 }}>Clear terminal</span>
                </div>
              </div>
            </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px clamp(12px, 3vw, 24px)',
                  borderTop: '1px solid rgba(0,212,255,0.15)',
                }}
              >
              <span className="term-prompt-prefix term-prompt-full" style={{ ...mono, fontSize: 13, color: '#00D4FF', flexShrink: 0 }}>
                assistant@rs-embedded:~$
              </span>
              <span className="term-prompt-mobile term-prompt-short" style={{ ...mono, fontSize: 13, color: '#00D4FF', flexShrink: 0, display: 'none' }}>
                rs~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="type a command or ask anything..."
                style={{
                  ...mono,
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#E8F4F8',
                  fontSize: 13,
                  caretColor: '#00D4FF',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .term-sidebar { display: none !important; }
          .term-launcher-label { font-size: 11px !important; }
          .term-launcher-meta { display: none !important; }
          .term-prompt-prefix,
          .term-prompt-full { display: none !important; }
          .term-prompt-mobile,
          .term-prompt-short { display: inline !important; }
        }
        @media (max-width: 480px) {
          .term-panel { height: min(72vh, 520px) !important; }
        }
      `}</style>
    </>
  );
}
