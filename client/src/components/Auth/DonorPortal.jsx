import React, { useState } from 'react';
import Dashboard from '../Dashboard';

function DonorPortal() {
  const [activeTab, setActiveTab] = useState('missions');

  const navItems = [
    { id: 'missions', label: 'Active Missions', icon: '🚨' },
    { id: 'history', label: 'Donation History', icon: '📝' },
    { id: 'health', label: 'Health Vitals', icon: '❤️' },
    { id: 'profile', label: 'My Identity', icon: '👤' },
    { id: 'refer', label: 'Recruit a Donor', icon: '🔗' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', gap: '2rem', animation: 'slideUpFade 0.6s ease forwards' }}>
      
      {/* Left Sidebar Navigation */}
      <div className="glass-panel" style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', alignSelf: 'flex-start', position: 'sticky', top: '2rem' }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
            RS
          </div>
          <div>
            <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)' }}>Rahul Sharma</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>O+ | Tier 1 Donor</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                background: activeTab === item.id ? 'var(--primary)' : 'transparent', 
                color: activeTab === item.id ? '#fff' : 'var(--text-muted)', 
                border: 'none', 
                padding: '1rem', 
                borderRadius: '12px', 
                fontSize: '0.95rem', 
                fontWeight: activeTab === item.id ? 600 : 500, 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.2rem', opacity: activeTab === item.id ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1.5rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Reliability Score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'var(--accent-green)' }}></div>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>92%</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Top Breadcrumb & Status Row */}
        <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Donor Network / </span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{navItems.find(i=>i.id===activeTab).label}</span>
          </div>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
            Available for Dispatch
          </div>
        </div>

        {/* Dynamic Vitals/Stats Row inspired by reference */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[
            { title: 'Lives Saved', value: '3', stat: 'Top 5%', color: 'var(--primary)', bg: 'rgba(244, 63, 94, 0.1)' },
            { title: 'Hemoglobin', value: '14.2 g/dL', stat: 'Healthy', color: 'var(--accent-green)', bg: 'rgba(16, 185, 129, 0.1)' },
            { title: 'Last Donation', value: '112 Days', stat: 'Eligible Now', color: 'var(--accent-cyan)', bg: 'rgba(6, 182, 212, 0.1)' },
            { title: 'Blood Group', value: 'O+', stat: 'Universal', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' }
          ].map(stat => (
            <div key={stat.title} className="glass-panel" style={{ flex: 1, minWidth: '180px', padding: '1.5rem', borderTop: `4px solid ${stat.color}` }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>{stat.title}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: stat.color }}>•</span> {stat.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Content Router */}
        <div style={{ animation: 'fade-in 0.4s ease' }}>
          {activeTab === 'missions' && (
            <div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Scanning local grid for emergency signals requiring O+ match...</p>
              <Dashboard userRole="donor" />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>📝 Past Dispatches</h3>
              <div style={{ color: 'var(--text-muted)' }}>
                <p>No recent dispatches in the last 30 days.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Identity</h3>
              <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p>Name: Rahul Sharma</p>
                <p>Grid Number: DNR-8790268186</p>
                <p>Location: Central Base</p>
              </div>
            </div>
          )}
          
          {activeTab === 'health' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Health Vitals Tracker</h3>
              <div style={{ height: '200px', border: '1px dashed var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Connect Health Sync API</span>
              </div>
            </div>
          )}

          {activeTab === 'refer' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>🔗 Grow the RaktSeva Grid</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Every new donor added to the decentralized grid increases the survival rate of critical SOS dispatches. Refer a friend to the network and earn Reliability Score points!
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                
                {/* Contact Number Form */}
                <div style={{ flex: '1 1 300px', background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.05rem' }}>Invite via SMS</h4>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Contact Number</label>
                    <input className="form-input" type="tel" placeholder="+91 9876543210" />
                  </div>
                  <button 
                    onClick={() => alert('Invite Sent!')} 
                    style={{ background: 'var(--accent-cyan)', color: '#000', width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    Send SMS Invite
                  </button>
                </div>

                {/* Referral Link */}
                <div style={{ flex: '1 1 300px', background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.05rem' }}>Your Unique Referral Link</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input className="form-input" type="text" value="https://raktseva.network/join/DNR-87902" readOnly style={{ opacity: 0.8 }} />
                    <button 
                      onClick={() => alert('Link copied to clipboard!')} 
                      style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', padding: '0 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.target.style.background = 'var(--border-subtle)'}
                      onMouseOut={(e) => e.target.style.background = 'var(--bg-panel)'}
                    >
                      Copy
                    </button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)' }}>✓ Referrals to date: 4 (Top 10%)</div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default DonorPortal;
