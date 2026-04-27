import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const { user, cartCount, logout } = useApp();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/home?search=${encodeURIComponent(search.trim())}`); setSearch(''); }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const firstName = user?.name?.split(' ')[0] || '';
  const isAdmin = user?.role === 'admin';
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(26,26,26,0.98)' : '#1A1A1A',
      backdropFilter: 'blur(12px)', height: 70,
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', gap: 16 }}>

        {/* Logo */}
        <Link to={user ? (isAdmin ? '/admin' : '/home') : '/'} style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#FF4500', textDecoration: 'none', flexShrink: 0, letterSpacing: '-0.5px' }}>
          AR<span style={{ color: '#fff' }}>Shop</span>
        </Link>

        {/* Search bar - hidden on very small screens */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 500, display: 'flex' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{ flex: 1, padding: '9px 16px', borderRadius: '10px 0 0 10px', border: '1.5px solid #333', borderRight: 'none', background: '#2D2D2D', color: '#fff', fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#FF4500'}
            onBlur={e => e.target.style.borderColor = '#333'}
          />
          <button type="submit" style={{ padding: '9px 16px', background: '#FF4500', color: '#fff', border: 'none', borderRadius: '0 10px 10px 0', cursor: 'pointer', fontSize: 15 }}>🔍</button>
        </form>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>

          {/* Category icons — desktop only */}
          <div style={{ display: 'flex', gap: 2 }}>
            {CATEGORIES.map(c => (
              <Link key={c.id} to={`/category/${c.id}`} title={c.name}
                style={{ color: '#aaa', padding: '6px 10px', borderRadius: 8, fontSize: 18, textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2D2D2D'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#aaa'; }}>
                {c.icon}
              </Link>
            ))}
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" title="Wishlist"
            style={{ color: '#aaa', padding: '6px 10px', borderRadius: 8, fontSize: 18, textDecoration: 'none', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FF4500'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#aaa'; }}>
            ♡
          </Link>

          {/* Cart */}
          <button onClick={() => navigate('/cart')} style={{
            position: 'relative', background: '#FF4500', color: '#fff', border: 'none',
            borderRadius: 10, padding: '8px 14px', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
          }}>
            🛒 <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -7, right: -7, background: '#fff', color: '#FF4500', borderRadius: '50%', width: 19, height: 19, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #1A1A1A' }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Auth section */}
          {user ? (
            /* Logged in: Avatar dropdown + Sign Out */
            <div ref={profileRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setProfileOpen(!profileOpen)} style={{
                background: 'rgba(255,69,0,0.15)', border: '1.5px solid rgba(255,69,0,0.4)', borderRadius: 10,
                padding: '6px 12px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,69,0,0.15)'}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{initials}</span>
                {firstName}
                <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
              </button>

              {/* Sign Out — always visible quick button */}
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 10,
                padding: '7px 12px', color: '#aaa', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C62828'; e.currentTarget.style.color = '#EF9A9A'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#aaa'; }}>
                🚪 Sign Out
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff',
                  borderRadius: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.2)', minWidth: 190, overflow: 'hidden', zIndex: 1001,
                }}>
                  {/* User info header */}
                  <div style={{ padding: '14px 16px', background: '#F7F4EF', borderBottom: '1px solid #E8E5E0' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1A1A1A' }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{user.email}</div>
                    <div style={{ marginTop: 6, display: 'inline-block', background: isAdmin ? '#FF4500' : '#E8F5E9', color: isAdmin ? '#fff' : '#2E7D32', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      {isAdmin ? '🛠️ Admin' : '👤 Customer'}
                    </div>
                  </div>

                  {isAdmin ? (
                    <>
                      <DropLink to="/admin">📊 Dashboard</DropLink>
                      <DropLink to="/admin/products">📦 Products</DropLink>
                      <DropLink to="/admin/orders">📋 Orders</DropLink>
                      <DropLink to="/admin/users">👥 Users</DropLink>
                    </>
                  ) : (
                    <>
                      <DropLink to="/home">🏠 Shop</DropLink>
                      <DropLink to="/profile">👤 My Profile</DropLink>
                      <DropLink to="/wishlist">❤️ Wishlist</DropLink>
                      <DropLink to="/cart">🛒 Cart</DropLink>
                    </>
                  )}
                  <div style={{ height: 1, background: '#F0EDE8' }} />
                  <button onClick={handleLogout} style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', color: '#C62828', fontWeight: 700, fontSize: 14, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not logged in: Sign In + Register buttons */
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Link to="/login" style={{
                background: 'linear-gradient(135deg, #FF4500, #FF6B35)', color: '#fff',
                borderRadius: 10, padding: '8px 18px', fontWeight: 700, fontSize: 13,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: '0 2px 12px rgba(255,69,0,0.35)', transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                Sign In
              </Link>
              <Link to="/signup" style={{
                background: 'transparent', color: '#fff', borderRadius: 10, padding: '8px 16px',
                fontWeight: 700, fontSize: 13, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; }}>
                Register
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', padding: 6, flexShrink: 0 }}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#1A1A1A', borderTop: '1px solid #2D2D2D', padding: '16px 24px', maxHeight: '80vh', overflowY: 'auto' }}>
          <form style={{ display: 'flex', marginBottom: 16 }} onSubmit={handleSearch}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px 0 0 10px', border: '1.5px solid #333', borderRight: 'none', background: '#2D2D2D', color: '#fff', fontSize: 14, outline: 'none' }} />
            <button type="submit" style={{ padding: '10px 14px', background: '#FF4500', color: '#fff', border: 'none', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}>🔍</button>
          </form>
          {CATEGORIES.map(c => (
            <Link key={c.id} to={`/category/${c.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ccc', padding: '12px 0', fontSize: 15, borderBottom: '1px solid #2D2D2D', textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>{c.name}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} style={{ width: '100%', marginTop: 16, padding: '12px', borderRadius: 10, border: 'none', background: '#C62828', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              🚪 Sign Out
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Link to="/login" style={{ flex: 1, background: '#FF4500', color: '#fff', borderRadius: 10, padding: '12px', fontWeight: 700, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}>Sign In</Link>
              <Link to="/signup" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 10, padding: '12px', fontWeight: 700, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}>Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function DropLink({ to, children }) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', fontSize: 14, fontWeight: 500, color: '#1A1A1A', textDecoration: 'none', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = '#F7F4EF'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
      {children}
    </Link>
  );
}
