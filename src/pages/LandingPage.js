import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const quickAdminLogin = () => {
    const result = login('admin@arshop.com', 'admin123');
    if (result.success) navigate('/admin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D0D0D 0%, #1A0800 35%, #0D0D1A 70%, #0D0D0D 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      {[
        { w: 500, h: 500, top: '-10%', left: '-10%', color: 'rgba(255,69,0,0.1)' },
        { w: 400, h: 400, top: '60%', right: '-10%', color: 'rgba(255,69,0,0.08)' },
        { w: 300, h: 300, top: '30%', left: '60%', color: 'rgba(100,50,200,0.06)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', width: orb.w, height: orb.h, borderRadius: '50%',
          background: orb.color, top: orb.top, left: orb.left, right: orb.right,
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900, textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(48px,8vw,80px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-2px' }}>
            <span style={{ color: '#FF4500' }}>AR</span><span style={{ color: '#fff' }}>Shop</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.25)', borderRadius: 999, padding: '5px 16px', marginTop: 12 }}>
            <span>🔮</span>
            <span style={{ color: '#FF6B35', fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>AUGMENTED REALITY SHOPPING</span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.3 }}>
          Shop. See. Experience.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.7 }}>
          Preview products in your real space with Augmented Reality before you buy. The future of shopping is here.
        </p>

        {/* Auth Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 680, margin: '0 auto 32px' }}>
          {/* User Card */}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,69,0,0.15), rgba(255,107,53,0.08))',
              border: '1.5px solid rgba(255,69,0,0.35)', borderRadius: 20, padding: '32px 28px',
              cursor: 'pointer', transition: 'all 0.25s', textAlign: 'center',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,69,0,0.7)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,69,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,69,0,0.35)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>👤</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Customer</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                Browse products, preview in AR, manage cart & orders
              </div>
              <div style={{ background: 'linear-gradient(135deg, #FF4500, #FF6B35)', color: '#fff', borderRadius: 12, padding: '13px 24px', fontWeight: 800, fontSize: 15, boxShadow: '0 4px 20px rgba(255,69,0,0.35)' }}>
                Sign In / Register →
              </div>
            </div>
          </Link>

          {/* Admin Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
            border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '32px 28px',
            cursor: 'pointer', transition: 'all 0.25s', textAlign: 'center',
          }}
            onClick={quickAdminLogin}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🛠️</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Admin</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
              Manage products, orders, users and analytics dashboard
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 12, padding: '13px 24px', fontWeight: 800, fontSize: 15 }}>
              Enter Admin Panel →
            </div>
          </div>
        </div>

        {/* Guest */}
        <Link to="/home" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
          Browse as Guest →
        </Link>

        {/* Features strip */}
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap', marginTop: 56 }}>
          {[['🔮', 'AR Preview'], ['🚚', 'Free Delivery'], ['🔄', 'Easy Returns'], ['🔒', 'Secure Payment']].map(([icon, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 600 }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
