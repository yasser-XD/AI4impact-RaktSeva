import React, { useState, useRef, useEffect } from 'react';

function AiCopilot({ onNavigate }) {
  const [history, setHistory] = useState([
    { role: 'assistant', text: "Hello. I am Sentinel AI, the automated logistics handler for RaktSeva.\n\nType your blood request (e.g., 'Need 2 units O+ urgently') and I will scan the decentralized network for the fastest match." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      setHistory(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setHistory(prev => [...prev, { role: 'assistant', text: "Network connection to Sentinel AI failed. Please check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '65vh', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.02em' }}>Sentinel AI Dispatch Copilot</h3>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} style={{ flexGrow: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {history.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            background: msg.role === 'user' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.05)',
            border: msg.role === 'user' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(255,255,255,0.1)',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: msg.role === 'user' ? 'var(--accent-cyan)' : '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              {msg.role === 'user' ? 'Facility Medic' : 'System AI'}
            </div>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '80%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.25rem', borderRadius: '12px', color: '#888', fontSize: '0.95rem' }}>
            <span className="blinking">Analyzing logistics network...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="E.g., We have a localized trauma case. Need AB- immediately..." 
          style={{ flexGrow: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '1rem 1.25rem', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          style={{ background: 'var(--text-main)', color: '#000', border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', opacity: loading || !input.trim() ? 0.5 : 1 }}
        >
          {loading ? 'Processing' : 'Send Command'}
        </button>
      </form>
    </div>
  );
}

export default AiCopilot;
