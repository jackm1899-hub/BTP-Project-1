import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, addToCart } = useApp();

  if (wishlist.length === 0) return (
    <div className="page-wrapper">
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 100 }}>
          <div className="empty-state-icon">💖</div>
          <div className="empty-state-title">Your wishlist is empty</div>
          <div className="empty-state-subtitle">Save your favourite products here and shop later!</div>
          <Link to="/home" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>🛍️ Discover Products</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 800 }}>My Wishlist</h1>
            <p style={{ color: '#9E9E9E', marginTop: 4 }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => { wishlist.forEach(p => addToCart(p)); }} style={{ background: '#FF4500', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            🛒 Add All to Cart
          </button>
        </div>
        <div className="product-grid">
          {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
