import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    navigate(result.role === 'admin' ? '/admin' : '/home');
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg,#0D0D0D,#1A0A00,#1A1A1A)', padding: '80px 24px 40px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 800, color: '#FF4500' }}>AR<span style={{ color: '#fff' }}>Shop</span></div>
          <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: 15 }}>Welcome back! Sign in to continue.</div>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 36, backdropFilter: 'blur(12px)' }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 28 }}>Sign In</h2>

          {error && (
            <div style={{ background: 'rgba(198,40,40,0.15)', border: '1px solid rgba(198,40,40,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#EF9A9A', fontSize: 14 }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>EMAIL ADDRESS</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>PASSWORD</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 14, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>

            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginTop: 8, boxShadow: '0 4px 20px rgba(255,69,0,0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              {loading ? '⏳ Signing in...' : '→ Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#FF6B35', fontWeight: 700 }}>Create one</Link>
          </div>

          {/* Admin hint */}
          <div style={{ marginTop: 20, background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
            🔑 Admin: <span style={{ color: '#FF6B35' }}>admin@arshop.com</span> / <span style={{ color: '#FF6B35' }}>admin123</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/home" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>← Browse as guest</Link>
        </div>
      </div>
    </div>
  );
}
