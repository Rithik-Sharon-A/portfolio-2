'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  buttonLabel?: string;
  greeting?: string;
}

export default function ChatBubble({ buttonLabel, greeting }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    greeting ? [{ role: 'assistant', content: greeting }] : []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    setMessages((p) => [...p, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: 'assistant', content: data.reply || 'Try again!' }]);
    } catch {
      setMessages((p) => [...p, { role: 'assistant', content: 'Connection error. Retry!' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .chat-panel {
          position: fixed;
          bottom: 100px;
          left: 32px;
          width: 360px;
          height: 480px;
        }
        @media (max-width: 480px) {
          .chat-panel {
            left: 16px;
            right: 16px;
            width: auto;
            bottom: 90px;
            height: 65vh;
          }
        }
      `}</style>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'var(--surface)',
          border: '1px solid var(--blue)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'DM Mono, monospace',
          fontSize: '13px',
          color: 'var(--blue)',
          zIndex: 999,
          boxShadow: '0 0 12px rgba(14,165,233,0.25)',
          letterSpacing: '0.05em',
        }}
      >
        {buttonLabel ?? ''}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(14,165,233,0.3)',
              borderRadius: '8px',
              boxShadow: '0 0 40px rgba(14,165,233,0.12)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(14,165,233,0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(14,165,233,0.04)',
              }}
            >
              <div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '13px', color: 'var(--blue)', letterSpacing: '0.05em' }}>{(buttonLabel ?? '').toUpperCase()}</div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>AI Assistant · Online</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: msg.role === 'user' ? 'var(--green)' : 'rgba(14,165,233,0.08)',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(14,165,233,0.18)',
                      color: msg.role === 'user' ? 'var(--bg)' : 'var(--white)',
                      fontFamily: 'Space Grotesk',
                      fontSize: '13px',
                      lineHeight: 1.6,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px 12px 12px 2px',
                      background: 'rgba(14,165,233,0.08)',
                      border: '1px solid rgba(14,165,233,0.18)',
                      fontFamily: 'DM Mono',
                      fontSize: '12px',
                      color: 'var(--blue)',
                      animation: 'blink 1s step-end infinite',
                    }}
                  >
                    Processing...
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(14,165,233,0.12)',
                display: 'flex',
                gap: '8px',
                background: 'rgba(14,165,233,0.03)',
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a command..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(14,165,233,0.22)',
                  background: 'transparent',
                  fontFamily: 'DM Mono',
                  fontSize: '12px',
                  color: 'var(--white)',
                  outline: 'none',
                  letterSpacing: '0.03em',
                }}
              />
              <button
                onClick={send}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  background: 'var(--blue)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bg)',
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
