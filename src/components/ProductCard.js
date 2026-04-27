import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ImageWithFallback from './ImageWithFallback';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);
  const isAndroid = navigator.userAgent.toLowerCase().includes('android');
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;
  const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const categoryColors = {
    furniture: '#8B4513', electronics: '#1565C0', fashion: '#6A1B9A', toys: '#E65100', other: '#2E7D32'
  };
  const catColor = categoryColors[product.category] || '#555';

  return (
    <div
      style={{
        background: '#fff', borderRadius: 14,
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.13)' : '0 2px 16px rgba(0,0,0,0.07)',
        overflow: 'hidden', transition: 'all 0.22s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wishlist */}
      <button
        onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          background: inWishlist ? '#FF4500' : 'rgba(255,255,255,0.92)',
          border: 'none', borderRadius: '50%', width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'all 0.2s',
        }}>
        {inWishlist ? '❤️' : '🤍'}
      </button>

      {/* Category badge (top-left) */}
      <div style={{
        position: 'absolute', top: 10, left: 10, zIndex: 2,
        background: catColor, color: '#fff', borderRadius: 6,
        padding: '3px 8px', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
      }}>
        {product.category.toUpperCase()}
      </div>

      {/* AR Badge */}
      {product.arEnabled && (
        <div style={{
          position: 'absolute', top: 44, left: 10, zIndex: 2,
          background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff',
          borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700,
        }}>
          🔮 AR Ready
        </div>
      )}

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14,
        }}>
          <span style={{ background: '#C62828', color: '#fff', borderRadius: 8, padding: '8px 20px', fontWeight: 700, fontSize: 14 }}>Out of Stock</span>
        </div>
      )}

      {/* Thumbnail — uses ImageWithFallback (local, always works) */}
      <div onClick={() => navigate(`/product/${product.id}`)} style={{ flexShrink: 0 }}>
        <ImageWithFallback
          product={product}
          style={{
            width: '100%', aspectRatio: '4/3',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ fontSize: 11, color: '#9E9E9E', fontWeight: 500 }}>{product.subcategory}</div>

        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', cursor: 'pointer' }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 12, color: '#9E9E9E' }}>({product.reviews?.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <>
              <span style={{ fontSize: 12, color: '#9E9E9E', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString()}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', borderRadius: 4, padding: '1px 6px' }}>{discount}% off</span>
            </>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
          <button
            disabled={!product.inStock}
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            style={{
              background: '#FF4500', color: '#fff', border: 'none', borderRadius: 8,
              padding: '10px', fontWeight: 700, fontSize: 13,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              opacity: product.inStock ? 1 : 0.5, transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (product.inStock) e.target.style.background = '#CC3700'; }}
            onMouseLeave={e => { e.target.style.background = '#FF4500'; }}>
            🛒 Add to Cart
          </button>
          {isMobile && product.arEnabled && (
            <Link to={`/product/${product.id}`}
              style={{
                background: '#1A1A1A', color: '#fff', borderRadius: 8, padding: '10px',
                fontWeight: 700, fontSize: 13, textAlign: 'center', display: 'block',
                animation: 'pulse 1.8s infinite', textDecoration: 'none',
              }}>
              🔮 View in AR
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function Stars({ rating, size = 13 }) {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.floor(rating) ? '#F57F17' : '#E0E0E0' }}>
          {i <= Math.floor(rating) ? '★' : i - rating < 1 ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
