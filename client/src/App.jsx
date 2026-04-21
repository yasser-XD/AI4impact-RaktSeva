import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import HospitalPortal from './components/Hospital/HospitalPortal';
import DonorPortal from './components/Auth/DonorPortal';
import './index.css';

function App() {
  const [role, setRole] = useState(null); // 'hospital' or 'donor'
  

  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light-theme');
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: role ? 'space-between' : 'flex-end', alignItems: 'center', marginBottom: role ? '2rem' : '1rem' }}>
        {role && (
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>🩸 RaktSeva {role === 'hospital' ? 'Hospital' : 'Donor'} Console</h2>
        )}
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 100 }}>
          <button 
            onClick={toggleTheme}
            style={{ background: 'var(--bg-panel)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px var(--shadow-base)', fontWeight: 600, transition: 'all 0.2s' }}
          >
            {isLightMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          {role && (
            <button className="btn btn-secondary" onClick={() => setRole(null)}>Sign Out</button>
          )}
        </div>
      </header>
      
      {!role ? (
        <Login onSelectRole={setRole} />
      ) : role === 'hospital' ? (
        <HospitalPortal />
      ) : (
        <DonorPortal />
      )}
    </div>
  );
}

export default App;
