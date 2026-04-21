import React, { useEffect, useState, useRef } from 'react';

function Dashboard({ userRole }) {
  const [state, setState] = useState(null);
  const logEndRef = useRef(null);

  const fetchState = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/state');
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.error("Failed to fetch state:", err);
    }
  };

  useEffect(() => {
    fetchState();
    const inv = setInterval(fetchState, 2000); // Poll every 2s for demo realtime feel
    return () => clearInterval(inv);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state]);

  const handleReset = async () => {
    await fetch('http://localhost:5000/api/reset', { method: 'POST' });
    fetchState();
  };

  if (!state) return <div style={{ color: 'var(--text-muted)' }}>Connecting to network...</div>;

  const activeReq = state.activeRequests.length > 0 ? state.activeRequests[state.activeRequests.length - 1] : null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--text-main)' }}>Live Network Status</h3>
        <button onClick={handleReset} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
          Reset Demo
        </button>
      </div>

      {!activeReq ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>No active emergencies.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>System is idle and monitoring network.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Header Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hospital</div>
              <div style={{ fontWeight: '600' }}>{activeReq.hospitalName}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blood Requirement</div>
              <div style={{ fontWeight: '800', color: 'var(--primary)', textAlign: 'right' }}>
                {activeReq.bloodGroup} <span className="badge badge-warning">{activeReq.urgency}</span>
              </div>
            </div>
          </div>

          {/* Logistics Log */}
          {userRole === 'hospital' && (
            <div>
              <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Decision Engine Logs</label>
              <div className="log-box">
                {activeReq.logs.map((log, i) => (
                  <div key={i} className="log-entry">&gt; {log}</div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          )}

          {/* ETA Module */}
          {activeReq.status === 'MATCHED' ? (
            <div className="eta-box" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(244,63,94,0.9)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', color: 'white', zIndex: '10', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                 🚑 ESTIMATED TIME OF ARRIVAL (ETA): {activeReq.etaMins} MINS
              </div>
              <iframe 
                width="100%" 
                height="180" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0" 
                src={`https://maps.google.com/maps?q=${activeReq.matchedDonor?.lat},${activeReq.matchedDonor?.lon}&z=15&output=embed`}
                style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(100%)', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'auto' }}
              ></iframe>
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Donor Location</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{activeReq.matchedDonor?.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="eta-number" style={{ fontSize: '2rem' }}>{activeReq.etaMins}</span>
                  <span style={{ fontSize: '0.8rem', color: 'white', marginLeft: '0.2rem', fontWeight: 'bold' }}>MINS</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="map-placeholder">
              <div className="map-radar"></div>
              <div className="map-marker" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                Searching 5km Radius...
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default Dashboard;
