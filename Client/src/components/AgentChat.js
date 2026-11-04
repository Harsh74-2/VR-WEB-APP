// components/AgentChat.js — AI tour-guide panel.
// Posts the conversation to /api/agent/chat (express -> local ollama).
// If the reply contains a <<<goto:N>>> directive, calls onGoto so the
// TourViewer re-positions the camera at that hotspot — real tool-use,
// tiny surface.
import React, { useState, useRef, useEffect } from 'react';

export default function AgentChat({ tourId, hotspots = [], onGoto }) {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => { setMessages([]); }, [tourId]);
  useEffect(() => { listRef.current && (listRef.current.scrollTop = listRef.current.scrollHeight); }, [messages, busy]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput('');
    const next = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId, messages: next }),
      });
      const data = await res.json();
      const reply = (data.reply || data.error || 'Guide unavailable.');
      setMessages(m => [...m, { role: 'assistant', content: reply.replace(/<<<goto:\d+>>>\s*/g, '').trim() }]);
      const m = /<<<goto:(\d+)>>>/.exec(reply);
      if (m && hotspots[+m[1]] && onGoto) onGoto(hotspots[+m[1]].position);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Network error talking to the guide.' }]);
    }
    setBusy(false);
  };

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div className="agent-chat">
      <div className="agent-chat-head">AI guide</div>
      <div className="agent-chat-msgs" ref={listRef}>
        {messages.map((m, i) => <div key={i} className={`msg ${m.role}`}>{m.content}</div>)}
        {busy && <div className="msg assistant">…</div>}
      </div>
      <div className="agent-chat-input">
        <input value={input} placeholder="Ask your guide…" onChange={e => setInput(e.target.value)} onKeyDown={onKey} />
        <button onClick={send} disabled={busy}>Send</button>
      </div>
    </div>
  );
}