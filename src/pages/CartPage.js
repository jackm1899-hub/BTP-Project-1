import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { cart, user, cartSubtotal, cartGST, cartShipping, cartTotal, removeFromCart, updateCartQty, placeOrder } = useApp();
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!user) { navigate('/login'); return; }
    const order = placeOrder();
    if (order) navigate('/profile');
  };

  if (cart.length === 0) return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 100 }}>
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">Your cart is empty</div>
          <div className="empty-state-subtitle">Add some products to get started with AR shopping!</div>
          <Link to="/home" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>🛍️ Start Shopping</Link>
        </div>
      </div>
    </div>
  );

  const freeShippingLeft = 999 - cartSubtotal;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Shopping Cart</h1>
        <p style={{ color: '#9E9E9E', marginBottom: 32 }}>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>

        {freeShippingLeft > 0 && (
          <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 12, padding: '14px 20px', marginBottom: 24, fontSize: 14, color: '#F57F17', fontWeight: 600 }}>
            🚚 Add ₹{freeShippingLeft.toLocaleString()} more to get <strong>FREE delivery!</strong>
            <div style={{ marginTop: 8, background: '#FFE082', borderRadius: 999, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#F57F17', width: `${Math.min((cartSubtotal / 999) * 100, 100)}%`, borderRadius: 999, transition: 'width 0.4s' }} />
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 14, padding: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} onError={e => { e.target.style.display = 'none'; }} style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 10, flexShrink: 0, background: '#F7F4EF' }} />
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/product/${item.id}`} style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A1A', lineHeight: 1.3, display: 'block', marginBottom: 4 }}>{item.name}</Link>
                  <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 10 }}>{item.subcategory}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                      <button onClick={() => updateCartQty(item.id, item.qty - 1)} style={{ width: 34, height: 34, background: '#F7F4EF', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 700 }}>−</button>
                      <span style={{ width: 36, textAlign: 'center', fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, item.qty + 1)} style={{ width: 34, height: 34, background: '#F7F4EF', border: 'none', fontSize: 16, cursor: 'pointer', fontWeight: 700 }}>+</button>
                    </div>
                    <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#FF4500' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                    <span style={{ color: '#9E9E9E', fontSize: 12 }}>₹{item.price.toLocaleString()} each</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#C62828', fontSize: 18, cursor: 'pointer', padding: 4, flexShrink: 0 }}>🗑️</button>
              </div>
            ))}
            <Link to="/home" style={{ textAlign: 'center', color: '#FF4500', fontWeight: 600, fontSize: 14, padding: 12 }}>← Continue Shopping</Link>
          </div>

          {/* Summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 90 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Order Summary</h2>
            {[
              { label: 'Subtotal', value: `₹${cartSubtotal.toLocaleString()}` },
              { label: 'Shipping', value: cartShipping === 0 ? 'FREE 🎉' : `₹${cartShipping}` },
              { label: 'GST (18%)', value: `₹${cartGST.toLocaleString()}` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 14, color: '#444' }}>
                <span>{row.label}</span>
                <span style={{ fontWeight: 600, color: row.label === 'Shipping' && cartShipping === 0 ? '#2E7D32' : '#1A1A1A' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ height: 1, background: '#F0EDE8', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 18 }}>Grand Total</span>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: '#FF4500' }}>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button onClick={handleOrder} style={{ width: '100%', background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff', border: 'none', borderRadius: 12, padding: '16px', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,69,0,0.35)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              {user ? '🎉 Place Order' : '🔒 Login to Place Order'}
            </button>
            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#9E9E9E' }}>
              💳 Secure checkout · 🔒 256-bit SSL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
