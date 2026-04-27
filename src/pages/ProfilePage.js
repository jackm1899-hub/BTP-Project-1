import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const STATUS_COLORS = { Confirmed: '#1565C0', Processing: '#F57F17', Shipped: '#6A1B9A', Delivered: '#2E7D32' };

export default function ProfilePage() {
  const { user, orders, wishlist, logout, updateProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const navigate = useNavigate();

  const userOrders = orders.filter(o => o.userEmail === user?.email);
  const totalSpent = userOrders.reduce((s, o) => s + o.total, 0);

  const handleSave = () => { updateProfile({ name }); setEditing(false); };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const avatarColors = ['#FF4500', '#1565C0', '#6A1B9A', '#2E7D32', '#E65100'];
  const avatarColor = avatarColors[user?.name?.charCodeAt(0) % avatarColors.length] || '#FF4500';

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 56, maxWidth: 900 }}>
        {/* Header card */}
        <div style={{ background: 'linear-gradient(135deg,#1A1A1A,#2D1200)', borderRadius: 20, padding: '36px 32px', marginBottom: 28, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {editing ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input value={name} onChange={e => setName(e.target.value)} style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 18, fontFamily: 'Syne,sans-serif', fontWeight: 700, outline: 'none', flex: 1, minWidth: 200 }} />
                <button onClick={handleSave} style={{ background: '#FF4500', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                <button onClick={() => setEditing(false)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, color: '#fff' }}>{user?.name}</h1>
                <button onClick={() => setEditing(true)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ccc', borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 13 }}>✏️ Edit</button>
              </div>
            )}
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>{user?.email}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 2 }}>Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : 'Today'}</div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ background: 'rgba(198,40,40,0.2)', border: '1px solid rgba(198,40,40,0.4)', color: '#EF9A9A', borderRadius: 10, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14, flexShrink: 0 }}>🚪 Logout</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Orders', value: userOrders.length, icon: '📦' },
            { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, icon: '💰' },
            { label: 'Wishlisted', value: wishlist.length, icon: '❤️' },
            { label: 'Delivered', value: userOrders.filter(o => o.status === 'Delivered').length, icon: '✅' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800 }}>Order History</h2>
            <Link to="/wishlist" style={{ color: '#FF4500', fontWeight: 600, fontSize: 14 }}>❤️ View Wishlist →</Link>
          </div>

          {userOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#9E9E9E' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
              <div style={{ fontWeight: 600 }}>No orders yet</div>
              <Link to="/home" style={{ color: '#FF4500', fontWeight: 600, fontSize: 14, display: 'block', marginTop: 12 }}>Start shopping →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {userOrders.map(order => (
                <div key={order.id} style={{ border: '1.5px solid #F0EDE8', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: '#FAFAF8', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1A1A' }}>{order.id}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16 }}>₹{order.total.toLocaleString()}</span>
                      <span style={{ background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status], borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{order.status}</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#444' }}>
                        <span>{item.name} <span style={{ color: '#9E9E9E' }}>×{item.qty}</span></span>
                        <span style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                    <div style={{ height: 1, background: '#F0EDE8', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9E9E9E' }}>
                      <span>GST: ₹{order.gst?.toLocaleString()} · Shipping: {order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
