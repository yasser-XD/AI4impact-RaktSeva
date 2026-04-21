import React, { useState } from 'react';

function Login({ onSelectRole }) {
  const [view, setView] = useState('hospital');
  
  // Hospital State
  const [hospitalId, setHospitalId] = useState('HOSP-APOLLO-01');
  const [password, setPassword] = useState('reactdemo');
  
  // Donor State
  const [donorId, setDonorId] = useState('DNR-8790268186');
  const [donorPassword, setDonorPassword] = useState('reactdemo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'hospital') {
      onSelectRole('hospital');
    } else {
      onSelectRole('donor');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3.5rem',
    borderRadius: '50px',
    border: '1px solid var(--border-subtle)',
    background: 'var(--glass-bg)',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s'
  };

  const labelIconStyle = {
    position: 'absolute',
    left: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    color: '#fff'
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="animate-slide-up" style={{ 
        width: '100%', 
        maxWidth: '950px', 
        display: 'flex', 
        background: 'var(--bg-panel)', 
        borderRadius: '30px', 
        boxShadow: '0 40px 80px var(--shadow-base), 0 0 0 1px var(--border-subtle)', 
        overflow: 'hidden',
        minHeight: '600px'
      }}>
        
        {/* Left Column - Form Area */}
        <div style={{ flex: '1.2', padding: '4rem', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>Hello!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>Sign in to your {view === 'hospital' ? 'Facility' : 'Donor'} account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={labelIconStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input 
                type="text" 
                placeholder={view === 'hospital' ? "Facility ID" : view === 'donor' ? "Donor ID" : "Full Name"}
                value={view === 'hospital' ? hospitalId : donorId} 
                onChange={e => view === 'hospital' ? setHospitalId(e.target.value) : setDonorId(e.target.value)} 
                required 
                style={inputStyle}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'var(--primary)'; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              />
            </div>

            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <div style={labelIconStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type="password" 
                placeholder="Password / PIN"
                value={view === 'hospital' ? password : donorPassword} 
                onChange={e => view === 'hospital' ? setPassword(e.target.value) : setDonorPassword(e.target.value)} 
                required 
                style={inputStyle}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'var(--primary)'; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              />
              <div style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', cursor: 'pointer' }} /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button 
              type="submit" 
              style={{ width: '180px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', color: '#fff', padding: '1rem', borderRadius: '50px', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(244, 63, 94, 0.3)' }}
              onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 15px 25px rgba(244, 63, 94, 0.4)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 10px 20px rgba(244, 63, 94, 0.3)'; }}
            >
              SIGN IN
            </button>

            <div style={{ marginTop: 'auto', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Don't have an account? <span onClick={() => setView('register')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Create</span>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
              <button type="button" onClick={() => setView('hospital')} style={{ background: 'none', border: 'none', color: view === 'hospital' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: view === 'hospital' ? 600 : 400 }}>Facility Mode</button>
              <button type="button" onClick={() => setView('donor')} style={{ background: 'none', border: 'none', color: view === 'donor' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: view === 'donor' ? 600 : 400 }}>Donor Mode</button>
            </div>
            
          </form>
        </div>

        {/* Right Column - Decor & Wave */}
        <div style={{ flex: '1', position: 'relative', background: 'linear-gradient(135deg, #1e0b3e 0%, var(--primary) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', textAlign: 'center', color: '#fff' }}>
          
          {/* Custom SVG Wave matching the uploaded reference image's flowing shape */}
          <div style={{ position: 'absolute', top: '-1px', bottom: '-1px', left: '-1px', width: '120px', pointerEvents: 'none' }}>
            <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,0 C 70,20 15,40 100,55 C 40,75 80,90 0,100 Z" fill="var(--bg-panel)"/>
            </svg>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '280px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '-0.02em', background: 'none', WebkitTextFillColor: '#fff', color: '#fff' }}>Welcome Back!</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', opacity: 0.85 }}>
              RaktSeva routes live emergency logistics instantly.<br/><br/>
              Log in to intercept and fulfill critical SOS dispatches in real-time.
            </p>
          </div>
          
          {/* Decorative glowing backlights */}
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: '150px', height: '150px', background: 'var(--accent-cyan)', opacity: 0.3, filter: 'blur(50px)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '150px', height: '150px', background: 'var(--primary)', opacity: 0.3, filter: 'blur(50px)', borderRadius: '50%' }}></div>
        </div>

      </div>
    </div>
  );
}

export default Login;
