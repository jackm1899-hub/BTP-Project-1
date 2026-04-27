import React, { useState } from 'react';

export default function ARViewer({ product }) {
  const [loading, setLoading] = useState(true);
  const isAndroid = navigator.userAgent.toLowerCase().includes('android');
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;

  const categoryEmojis = {
    furniture: '🛋️', electronics: '📺', fashion: '👗', toys: '🎮', other: '🌟'
  };
  const emoji = categoryEmojis[product.category] || '📦';

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      borderRadius: 16, overflow: 'hidden', position: 'relative',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 20 }}>🔮</span>
        <div>
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#fff', fontSize: 15 }}>AR Product Viewer</div>
          <div style={{ fontSize: 12, color: '#999' }}>{isMobile ? 'Tap "View in AR" for real-world preview' : 'Rotate & zoom below · Use mobile for AR'}</div>
        </div>
      </div>

      {/* Viewer */}
      <div style={{ position: 'relative', height: isMobile ? 350 : 500, background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 1 }}>
            <div style={{ fontSize: 64 }}>{emoji}</div>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Loading 3D Model...</div>
            <div style={{ width: 40, height: 40, border: '3px solid #333', borderTopColor: '#FF4500', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}
        <model-viewer
          src={product.modelPath}
          alt={product.name}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        >
          {/* Fallback slot */}
          <div slot="poster" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 80 }}>{emoji}</div>
            <div style={{ color: '#fff', fontSize: 13, opacity: 0.7 }}>3D preview not available</div>
          </div>

          {/* AR Button */}
          {isMobile && (
            <button slot="ar-button" style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff',
              border: 'none', borderRadius: 12, padding: '14px 32px',
              fontWeight: 800, fontSize: 16, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255,69,0,0.5)', animation: 'pulse 1.8s infinite',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'DM Sans, sans-serif',
            }}>
              🔮 {isIOS ? 'View in Your Space' : 'View in AR'}
            </button>
          )}
        </model-viewer>
      </div>

      {/* Instructions */}
      <div style={{ padding: '14px 20px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { icon: '🖱️', text: 'Drag to rotate' },
          { icon: '🔍', text: 'Scroll to zoom' },
          { icon: isMobile ? '📱' : '💻', text: isMobile ? 'Tap AR to place in room' : 'Use mobile for full AR' },
        ].map((tip, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#999', fontSize: 12 }}>
            <span>{tip.icon}</span><span>{tip.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
