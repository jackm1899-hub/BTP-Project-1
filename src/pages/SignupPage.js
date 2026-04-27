import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SignupPage() {
  const { signup } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const result = signup(form.name, form.email, form.password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    navigate('/home');
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
    color: '#fff', fontSize: 14, outline: 'none',
  };
  const labelStyle = { display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg,#0D0D0D,#1A0A00,#1A1A1A)', padding: '80px 24px 40px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 800, color: '#FF4500' }}>AR<span style={{ color: '#fff' }}>Shop</span></div>
          <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8, fontSize: 15 }}>Create your account and start shopping in AR.</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 36, backdropFilter: 'blur(12px)' }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 28 }}>Create Account</h2>

          {error && (
            <div style={{ background: 'rgba(198,40,40,0.15)', border: '1px solid rgba(198,40,40,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#EF9A9A', fontSize: 14 }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>FULL NAME</label>
              <input type="text" required value={form.name} onChange={set('name')} placeholder="Your full name" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input type="email" required value={form.email} onChange={set('email')} placeholder="you@email.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={labelStyle}>PASSWORD</label>
              <input type="password" required value={form.password} onChange={set('password')} placeholder="Min. 6 characters" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <div>
              <label style={labelStyle}>CONFIRM PASSWORD</label>
              <input type="password" required value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#FF4500'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
            </div>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginTop: 8, boxShadow: '0 4px 20px rgba(255,69,0,0.4)' }}>
              {loading ? '⏳ Creating...' : '🚀 Create Account'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#FF6B35', fontWeight: 700 }}>Sign in</Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link to="/home" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>← Browse as guest</Link>
        </div>
      </div>
    </div>
  );
}
