import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';


export default function FilterSidebar({ filters, onChange, onClear, resultCount }) {
  const [priceRange, setPriceRange] = useState(filters.maxPrice || 200000);

  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const handlePrice = (e) => {
    const val = Number(e.target.value);
    setPriceRange(val);
    onChange({ ...filters, maxPrice: val });
  };

  const s = {
    sidebar: { background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', height: 'fit-content', minWidth: 220 },
    section: { marginBottom: 24 },
    sectionTitle: { fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, color: '#1A1A1A', marginBottom: 12 },
    label: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '5px 0', fontSize: 13, color: '#444', transition: 'color 0.15s' },
    checkbox: { accentColor: '#FF4500', width: 14, height: 14, cursor: 'pointer' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    clearBtn: { background: 'none', border: 'none', color: '#FF4500', fontSize: 12, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' },
    rangeInput: { width: '100%', accentColor: '#FF4500', cursor: 'pointer' },
  };

  return (
    <div style={s.sidebar}>
      <div style={s.header}>
        <div>
          <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, fontWeight: 700 }}>Filters</div>
          <div style={{ fontSize: 12, color: '#9E9E9E' }}>{resultCount} results</div>
        </div>
        <button style={s.clearBtn} onClick={onClear}>Clear all</button>
      </div>

      {/* Sort */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Sort By</div>
        {['Relevance','Price: Low to High','Price: High to Low','Top Rated','Newest'].map(opt => (
          <label key={opt} style={s.label}>
            <input type="radio" name="sort" style={s.checkbox} checked={filters.sort === opt} onChange={() => onChange({ ...filters, sort: opt })} />
            {opt}
          </label>
        ))}
      </div>

      {/* Category */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Category</div>
        {CATEGORIES.map(cat => (
          <label key={cat.id} style={s.label}>
            <input type="checkbox" style={s.checkbox} checked={(filters.categories || []).includes(cat.id)} onChange={() => toggle('categories', cat.id)} />
            {cat.icon} {cat.name}
          </label>
        ))}
      </div>

      {/* Price */}
      <div style={s.section}>
        <div style={{ ...s.sectionTitle, display: 'flex', justifyContent: 'space-between' }}>
          Price Range
          <span style={{ fontWeight: 400, color: '#9E9E9E', fontSize: 12 }}>₹0 – ₹{priceRange.toLocaleString()}</span>
        </div>
        <input type="range" min={0} max={200000} step={500} value={priceRange} onChange={handlePrice} style={s.rangeInput} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>
          <span>₹0</span><span>₹2,00,000</span>
        </div>
      </div>

      {/* Rating */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Min. Rating</div>
        {[4, 3, 2].map(r => (
          <label key={r} style={s.label}>
            <input type="radio" name="rating" style={s.checkbox} checked={filters.minRating === r} onChange={() => onChange({ ...filters, minRating: r })} />
            {'★'.repeat(r)}{'☆'.repeat(5-r)} & above
          </label>
        ))}
        <label style={s.label}>
          <input type="radio" name="rating" style={s.checkbox} checked={!filters.minRating} onChange={() => onChange({ ...filters, minRating: null })} />
          All ratings
        </label>
      </div>

      {/* Toggles */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Availability</div>
        <label style={s.label}>
          <input type="checkbox" style={s.checkbox} checked={!!filters.inStockOnly} onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })} />
          In Stock Only
        </label>
        <label style={{ ...s.label, marginTop: 4 }}>
          <input type="checkbox" style={s.checkbox} checked={!!filters.arOnly} onChange={() => onChange({ ...filters, arOnly: !filters.arOnly })} />
          🔮 AR Enabled Only
        </label>
      </div>
    </div>
  );
}
