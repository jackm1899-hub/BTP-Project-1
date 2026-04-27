import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminNav } from './AdminDashboard';

const STATUSES = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
const STATUS_COLORS = { Confirmed: '#1565C0', Processing: '#F57F17', Shipped: '#6A1B9A', Delivered: '#2E7D32' };

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

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
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800 }}>Orders</h2>
            <p style={{ color: '#9E9E9E', fontSize: 14 }}>{filtered.length} orders</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['All', ...STATUSES].map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid ' + (filter === s ? '#FF4500' : '#ddd'), background: filter === s ? '#FF4500' : '#fff', color: filter === s ? '#fff' : '#444', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{s}</button>
            ))}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-title">No orders yet</div>
            <div className="empty-state-subtitle">Orders will appear here once customers start buying.</div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F7F4EF' }}>
                    {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#9E9E9E', whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => (
                    <React.Fragment key={order.id}>
                      <tr style={{ borderTop: '1px solid #F0EDE8', background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)} style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: 13, color: '#FF4500', cursor: 'pointer' }}>
                            {expandedId === order.id ? '▼' : '▶'} {order.id}
                          </button>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{order.userName}</div>
                          <div style={{ fontSize: 11, color: '#9E9E9E' }}>{order.userEmail}</div>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: 13, color: '#444', whiteSpace: 'nowrap' }}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td style={{ padding: '14px 16px', fontSize: 13 }}>{order.items?.length || 0} items</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 14 }}>₹{order.total.toLocaleString()}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 6, padding: '4px 10px', background: (STATUS_COLORS[order.status] || '#555') + '20', color: STATUS_COLORS[order.status] || '#555' }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 12, cursor: 'pointer', outline: 'none' }}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                      {expandedId === order.id && (
                        <tr>
                          <td colSpan={7} style={{ padding: '0 16px 16px 40px', background: '#F7F4EF' }}>
                            <div style={{ paddingTop: 12 }}>
                              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Order Items:</div>
                              {order.items?.map((item, j) => (
                                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '1px solid #E0DDD8' }}>
                                  <span>{item.name} <span style={{ color: '#9E9E9E' }}>×{item.qty}</span></span>
                                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                              ))}
                              <div style={{ display: 'flex', gap: 24, marginTop: 10, fontSize: 12, color: '#9E9E9E' }}>
                                <span>GST: ₹{order.gst?.toLocaleString()}</span>
                                <span>Shipping: {order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                                <span style={{ color: '#1A1A1A', fontWeight: 700 }}>Total: ₹{order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
