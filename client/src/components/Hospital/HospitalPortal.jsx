import React, { useState } from 'react';
import CreateRequest from './CreateRequest';
import Dashboard from '../Dashboard';
import AiCopilot from './AiCopilot';

function HospitalPortal() {
  const [activeTab, setActiveTab] = useState('dispatch');

  const navItems = [
    { id: 'dispatch', label: 'SOS Hub', icon: '🚨' },
    { id: 'copilot', label: 'AI Copilot', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'profile', label: 'Facility Details', icon: '🏥' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', gap: '2rem', animation: 'slideUpFade 0.6s ease forwards' }}>
      
      {/* Left Sidebar Navigation */}
      <div className="glass-panel" style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', alignSelf: 'flex-start', position: 'sticky', top: '2rem' }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>+</span> Apollo Hos.
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Trauma Center</span>
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
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Top Breadcrumb & Status Row */}
        <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Facility / Dashboard / </span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{navItems.find(i=>i.id===activeTab).label}</span>
          </div>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }}></div>
            Network Synced
          </div>
        </div>

        {/* Dynamic Vitals/Stats Row inspired by reference */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {[
            { title: 'Live Requests', value: '4', stat: '+2 today', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
            { title: 'Units Dispatched', value: '18', stat: '-1% weekly', color: 'var(--accent-green)', bg: 'rgba(16, 185, 129, 0.1)' },
            { title: 'Av. Response Time', value: '11m', stat: 'Optimized', color: 'var(--accent-cyan)', bg: 'rgba(6, 182, 212, 0.1)' },
            { title: 'Reliable Donors', value: '342', stat: '+12 new', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' }
          ].map(stat => (
            <div key={stat.title} className="glass-panel" style={{ flex: 1, minWidth: '180px', padding: '1.5rem', borderTop: `4px solid ${stat.color}` }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>{stat.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: stat.color }}>↗</span> {stat.stat}
              </div>
            </div>
          ))}
        </div>

        {/* Content Router */}
        <div style={{ animation: 'fade-in 0.4s ease' }}>
          {activeTab === 'dispatch' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <CreateRequest />
              <Dashboard userRole="hospital" />
            </div>
          )}

          {activeTab === 'copilot' && (
            <div style={{ maxWidth: '100%', margin: '0 auto', animation: 'fade-in 0.3s' }}>
              <AiCopilot />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>📊 Intelligence & Analytics</h3>
              <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-subtle)', borderRadius: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>[Chart visualization module offline]</span>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="glass-panel">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>🏥 Facility Information</h3>
              <div style={{ display: 'grid', gap: '1rem', color: 'var(--text-muted)' }}>
                <p><strong>Name:</strong> Apollo General Hospital</p>
                <p><strong>Location:</strong> Health City Blvd, Sector 9</p>
                <p><strong>Emergency Priority:</strong> Level 1 Trauma Center</p>
                <p><strong>License Auth:</strong> REQ-819A2</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default HospitalPortal;
