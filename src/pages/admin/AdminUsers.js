import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminNav } from './AdminDashboard';

export default function AdminUsers() {
  const { users, orders, toggleBlockUser } = useApp();
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const userOrders = (uid, email) => orders.filter(o => o.userId === uid || o.userEmail === email);
  const userTotal = (uid, email) => userOrders(uid, email).reduce((s, o) => s + o.total, 0);

  return (
    <div className="page-wrapper">
      <div style={{ background: '#1A1A1A', padding: '24px' }}>
        <div className="container" style={{ padding: 0 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, color: '#fff' }}>Admin Panel</h1>
        </div>
      </div>
      <AdminNav />

      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800 }}>Users</h2>
            <p style={{ color: '#9E9E9E', fontSize: 14 }}>{filtered.length} registered users</p>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            style={{ padding: '10px 16px', borderRadius: 10, border: '1.5px solid #E0DDD8', fontSize: 14, outline: 'none', width: 240 }} />
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-title">No users yet</div>
            <div className="empty-state-subtitle">Users will appear here once they sign up.</div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F7F4EF' }}>
                    {['User', 'Email', 'Join Date', 'Orders', 'Total Spent', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#9E9E9E', whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => {
                    const ords = userOrders(u.id, u.email);
                    const spent = userTotal(u.id, u.email);
                    const initials = u.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
                    const avatarColors = ['#FF4500', '#1565C0', '#6A1B9A', '#2E7D32', '#E65100'];
                    const avatarColor = avatarColors[u.name?.charCodeAt(0) % avatarColors.length] || '#FF4500';
                    return (
                      <React.Fragment key={u.id}>
                        <tr style={{ borderTop: '1px solid #F0EDE8', background: i % 2 === 0 ? '#fff' : '#FAFAF8', opacity: u.blocked ? 0.6 : 1 }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{initials}</div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>{u.name}</div>
                                <div style={{ fontSize: 11, color: '#9E9E9E' }}>ID: {u.id}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#444' }}>{u.email}</td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: '#444', whiteSpace: 'nowrap' }}>
                            {u.joinDate ? new Date(u.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <button onClick={() => setExpandedId(expandedId === u.id ? null : u.id)} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 13, color: '#FF4500', cursor: 'pointer' }}>
                              {ords.length} order{ords.length !== 1 ? 's' : ''} {ords.length > 0 ? (expandedId === u.id ? '▲' : '▼') : ''}
                            </button>
                          </td>
                          <td style={{ padding: '12px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 14, color: '#2E7D32' }}>₹{spent.toLocaleString()}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 6, padding: '4px 10px', background: u.blocked ? '#FFEBEE' : '#E8F5E9', color: u.blocked ? '#C62828' : '#2E7D32' }}>
                              {u.blocked ? 'Blocked' : 'Active'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <button onClick={() => toggleBlockUser(u.id)} style={{ background: u.blocked ? '#E8F5E9' : '#FFEBEE', color: u.blocked ? '#2E7D32' : '#C62828', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                              {u.blocked ? '✅ Unblock' : '🚫 Block'}
                            </button>
                          </td>
                        </tr>
                        {expandedId === u.id && ords.length > 0 && (
                          <tr>
                            <td colSpan={7} style={{ padding: '0 16px 16px 60px', background: '#F7F4EF' }}>
                              <div style={{ paddingTop: 12 }}>
                                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Order History:</div>
                                {ords.map(o => (
                                  <div key={o.id} style={{ display: 'flex', gap: 16, padding: '6px 0', fontSize: 13, borderBottom: '1px solid #E0DDD8', flexWrap: 'wrap' }}>
                                    <span style={{ color: '#FF4500', fontWeight: 600 }}>{o.id}</span>
                                    <span style={{ color: '#9E9E9E' }}>{new Date(o.date).toLocaleDateString('en-IN')}</span>
                                    <span>{o.items?.length} items</span>
                                    <span style={{ fontWeight: 700 }}>₹{o.total.toLocaleString()}</span>
                                    <span style={{ color: o.status === 'Delivered' ? '#2E7D32' : '#F57F17', fontWeight: 600 }}>{o.status}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
