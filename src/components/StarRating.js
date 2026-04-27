import React, { useState } from 'react';

export function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= rating ? '#F57F17' : '#ddd' }}>
          {i <= Math.floor(rating) ? '★' : rating % 1 > 0 && i === Math.ceil(rating) ? '⭐' : '☆'}
        </span>
      ))}
    </span>
  );
}

export default Stars;
