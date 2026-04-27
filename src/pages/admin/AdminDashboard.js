import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';

function AdminNav() {
  return (
    <div style={{ background: '#1A1A1A', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
      {[['📊', 'Dashboard', '/admin'], ['📦', 'Products', '/admin/products'], ['📋', 'Orders', '/admin/orders'], ['👥', 'Users', '/admin/users']].map(([icon, label, path]) => (
        <Link key={path} to={path} style={{ color: window.location.pathname === path ? '#FF4500' : '#999', padding: '14px 16px', fontSize: 13, fontWeight: 600, textDecoration: 'none', borderBottom: window.location.pathname === path ? '2px solid #FF4500' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
          {icon} {label}
        </Link>
      ))}
    </div>
  );
}

export { AdminNav };

export default function AdminDashboard() {
  const { stats, orders, products } = useApp();

  // Last 7 days sales
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-IN', { weekday: 'short' });
    const dayOrders = orders.filter(o => new Date(o.date).toDateString() === d.toDateString());
    const revenue = dayOrders.reduce((s, o) => s + o.total, 0);
    return { day: dayStr, revenue };
  });
  const maxRev = Math.max(...last7.map(d => d.revenue), 1);

  // Category sales
  const catSales = CATEGORIES.map(cat => {
    const catOrders = orders.flatMap(o => o.items.filter(i => i.category === cat.id));
    const rev = catOrders.reduce((s, i) => s + i.price * i.qty, 0);
    return { ...cat, rev };
  });
  const totalCatRev = catSales.reduce((s, c) => s + c.rev, 1);

  const catColors = ['#FF4500', '#1565C0', '#6A1B9A', '#E65100', '#2E7D32'];

  // Top 5 products
  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  const todayRev = orders.filter(o => new Date(o.date).toDateString() === new Date().toDateString()).reduce((s, o) => s + o.total, 0);
  const weekRev = orders.filter(o => (Date.now() - new Date(o.date)) < 7 * 86400000).reduce((s, o) => s + o.total, 0);
  const monthRev = orders.filter(o => new Date(o.date).getMonth() === new Date().getMonth()).reduce((s, o) => s + o.total, 0);

  return (
    <div className="page-wrapper">
      <div style={{ background: '#1A1A1A', padding: '24px', borderBottom: '1px solid #2D2D2D' }}>
        <div className="container" style={{ padding: 0 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, color: '#fff' }}>Admin Panel</h1>
          <p style={{ color: '#9E9E9E', marginTop: 4, fontSize: 14 }}>Manage your ARShop store</p>
        </div>
      </div>
      <AdminNav />

      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: '#1565C0' },
            { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#6A1B9A' },
            { label: 'Total Orders', value: stats.totalOrders, icon: '📋', color: '#FF4500' },
            { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#2E7D32' },
            { label: 'In Stock', value: stats.inStock, icon: '✅', color: '#2E7D32' },
            { label: 'Out of Stock', value: stats.outOfStock, icon: '❌', color: '#C62828' },
            { label: 'Low Stock', value: stats.lowStock, icon: '⚠️', color: '#F57F17' },
            { label: 'Most Viewed', value: stats.mostViewed?.name?.split(' ').slice(0, 2).join(' ') || '-', icon: '👁️', color: '#555' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '20px 16px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 36 }}>
          {/* Revenue Summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 20 }}>💰 Revenue Summary</h3>
            {[['Today', todayRev], ['This Week', weekRev], ['This Month', monthRev], ['All Time', stats.totalRevenue]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0EDE8', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#444' }}>{label}</span>
                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#FF4500', fontSize: 16 }}>₹{val.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Top Products */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 20 }}>🏆 Top Products</h3>
            {topProducts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F0EDE8' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#9E9E9E' }}>{p.reviews.toLocaleString()} reviews · ₹{p.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Bar Chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 24 }}>📊 Last 7 Days Sales</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 160 }}>
            {last7.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#FF4500' }}>{d.revenue > 0 ? `₹${Math.round(d.revenue / 1000)}k` : ''}</div>
                <div style={{ width: '100%', background: d.revenue > 0 ? 'linear-gradient(to top,#FF4500,#FF8C00)' : '#F0EDE8', borderRadius: '6px 6px 0 0', height: `${(d.revenue / maxRev) * 120 + 4}px`, transition: 'height 0.4s', minHeight: 4 }} />
                <div style={{ fontSize: 11, color: '#9E9E9E', fontWeight: 600 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pie */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 20 }}>🥧 Category Sales Breakdown</h3>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              width: 160, height: 160, borderRadius: '50%', flexShrink: 0,
              background: `conic-gradient(${catSales.map((c, i) => `${catColors[i]} ${catSales.slice(0, i).reduce((s, x) => s + x.rev, 0) / totalCatRev * 360}deg ${catSales.slice(0, i + 1).reduce((s, x) => s + x.rev, 0) / totalCatRev * 360}deg`).join(',')})`,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {catSales.map((c, i) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: catColors[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#444' }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>₹{c.rev.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
