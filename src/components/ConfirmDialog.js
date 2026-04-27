import React from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 400, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 16 }}>⚠️</div>
        <p style={{ textAlign: 'center', fontWeight: 600, fontSize: 16, color: '#1A1A1A', marginBottom: 24 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1.5px solid #ddd', background: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#C62828', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
