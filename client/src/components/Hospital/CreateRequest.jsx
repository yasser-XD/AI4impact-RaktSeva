import React, { useState } from 'react';

function CreateRequest() {
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [urgency, setUrgency] = useState('URGENT');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hospitalId: 'h1', // Hardcoded demo hospital
          bloodGroup,
          urgency
        })
      });
      // In a real app we might show a success toast here.
      // Dashboard will auto-update via polling or realtime subscription.
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>🚨 Initiate Blood Request</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Blood Group Required</label>
          <select className="form-select" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Urgency Level</label>
          <select className="form-select" value={urgency} onChange={e => setUrgency(e.target.value)}>
            <option value="CRITICAL">Critical (Immediate match required)</option>
            <option value="URGENT">Urgent (Within 4 hours)</option>
            <option value="STANDARD">Normal (Within 24 hours)</option>
          </select>
        </div>

        <div className="form-group" style={{ opacity: 0.6 }}>
          <label className="form-label">Location</label>
          <input className="form-input" type="text" value="Apollo Hospitals, Hyderabad (Auto-detected)" disabled />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          disabled={loading}
        >
          {loading ? 'Dispatching...' : 'Dispatch SOS Signal'}
        </button>
      </form>
    </div>
  );
}

export default CreateRequest;
