'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Rithik's AI assistant. Ask me anything about his work, skills, or projects! 🏏",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, I had trouble with that.' },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Try again!' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
          background: 'var(--bg)',
          border: '1px solid var(--ink)',
          borderRadius: '100px',
          cursor: 'pointer',
          fontFamily: 'DM Mono, monospace',
          fontSize: '13px',
          color: 'var(--ink)',
          zIndex: 999,
          boxShadow: '2px 2px 0 var(--ink)',
        }}
      >
        <Zap size={14} />
        Ask Rithik
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '32px',
              width: '360px',
              height: '480px',
              background: 'var(--bg)',
              border: '1px solid var(--ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0 var(--ink)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(10,10,10,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600 }}>Ask Rithik</div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '11px', color: 'var(--muted)' }}>
                  AI Assistant · Online
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user' ? 'var(--ink)' : 'rgba(10,10,10,0.06)',
                      color: msg.role === 'user' ? 'var(--bg)' : 'var(--ink)',
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
                      borderRadius: '16px 16px 16px 4px',
                      background: 'rgba(10,10,10,0.06)',
                      fontFamily: 'DM Mono',
                      fontSize: '13px',
                      color: 'var(--muted)',
                    }}
                  >
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(10,10,10,0.1)',
                display: 'flex',
                gap: '8px',
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '100px',
                  border: '1px solid rgba(10,10,10,0.15)',
                  background: 'transparent',
                  fontFamily: 'Space Grotesk',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--ink)',
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
