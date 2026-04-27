import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ARViewer from '../components/ARViewer';
import ProductCard from '../components/ProductCard';
import { Stars } from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';

export default function ProductPage() {
  const { productId } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useApp();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('ar'); // 'ar' | 'details'

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) return (
    <div className="page-wrapper"><div className="container" style={{ paddingTop: 80, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
      <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Product not found</h2>
      <Link to="/home" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>← Back to Home</Link>
    </div></div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const catColors = { furniture: '#8B4513', electronics: '#1565C0', fashion: '#6A1B9A', toys: '#E65100', other: '#2E7D32' };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: '#9E9E9E' }}>
          <Link to="/home" style={{ color: '#9E9E9E', textDecoration: 'none' }} onMouseEnter={e=>e.target.style.color='#FF4500'} onMouseLeave={e=>e.target.style.color='#9E9E9E'}>Home</Link>
          <span>›</span>
          <Link to={`/category/${product.category}`} style={{ color: '#9E9E9E', textDecoration: 'none' }} onMouseEnter={e=>e.target.style.color='#FF4500'} onMouseLeave={e=>e.target.style.color='#9E9E9E'}>{product.category}</Link>
          <span>›</span>
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Main Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
          {/* Left: Image / AR */}
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {['ar', 'details'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '8px 20px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  background: tab === t ? '#1A1A1A' : '#F0EDE8', color: tab === t ? '#fff' : '#444',
                }}>
                  {t === 'ar' ? '🔮 3D / AR View' : '🖼️ Product Image'}
                </button>
              ))}
            </div>

            {tab === 'ar' ? (
              <ARViewer product={product} />
            ) : (
              <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
                <ImageWithFallback product={product} style={{ width: '100%', height: '100%' }} />
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: catColors[product.category] || '#555', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{product.category.toUpperCase()}</span>
              {product.arEnabled && <span style={{ background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🔮 AR READY</span>}
              {!product.inStock && <span style={{ background: '#C62828', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>OUT OF STOCK</span>}
              {product.isNew && <span style={{ background: '#1565C0', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>NEW</span>}
            </div>

            <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, lineHeight: 1.2, color: '#1A1A1A' }}>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Stars rating={product.rating} size={18} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>{product.rating}</span>
              <span style={{ color: '#9E9E9E', fontSize: 14 }}>({product.reviews?.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 36, fontWeight: 800, color: '#1A1A1A' }}>₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span style={{ fontSize: 18, color: '#9E9E9E', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString()}</span>
                  <span style={{ background: '#E8F5E9', color: '#2E7D32', borderRadius: 6, padding: '4px 10px', fontWeight: 700, fontSize: 14 }}>
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <div style={{ fontSize: 13, color: '#9E9E9E' }}>Inclusive of all taxes (GST 18%)</div>

            {/* Description */}
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: 15 }}>{product.description}</p>

            {/* Features */}
            {product.features?.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Key Features</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.features.map((f, i) => (
                    <span key={i} style={{ background: '#F7F4EF', border: '1px solid #E0DDD8', borderRadius: 8, padding: '5px 12px', fontSize: 13, color: '#444' }}>✓ {f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: product.inStock ? '#2E7D32' : '#C62828' }} />
              <span style={{ fontWeight: 600, fontSize: 14, color: product.inStock ? '#2E7D32' : '#C62828' }}>
                {product.inStock ? `In Stock (${product.stock} left)` : 'Currently Out of Stock'}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #ddd', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 44, background: '#F7F4EF', border: 'none', fontSize: 18, cursor: 'pointer', fontWeight: 700 }}>−</button>
                <span style={{ width: 44, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 44, background: '#F7F4EF', border: 'none', fontSize: 18, cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>
              <button disabled={!product.inStock} onClick={() => addToCart(product, qty)} style={{ flex: 1, background: '#FF4500', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: product.inStock ? 'pointer' : 'not-allowed', opacity: product.inStock ? 1 : 0.5, transition: 'background 0.2s' }}
                onMouseEnter={e => { if (product.inStock) e.target.style.background = '#CC3700'; }}
                onMouseLeave={e => e.target.style.background = '#FF4500'}>
                🛒 Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} style={{ width: 44, height: 44, background: inWishlist ? '#FF4500' : '#F7F4EF', border: '1.5px solid #ddd', borderRadius: 10, fontSize: 20, cursor: 'pointer', transition: 'all 0.2s' }}>
                {inWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Free shipping note */}
            <div style={{ background: '#E8F5E9', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 8 }}>
              🚚 <span><strong>Free delivery</strong> on orders above ₹999 · <strong>30-day returns</strong></span>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 className="section-title" style={{ marginBottom: 4 }}>Related Products</h2>
            <p className="section-subtitle">You might also like</p>
            <div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
