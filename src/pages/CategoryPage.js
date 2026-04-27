import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { CATEGORIES } from '../data/products';

const DEFAULT_FILTERS = { categories: [], maxPrice: 200000, minRating: null, inStockOnly: false, arOnly: false, sort: 'Relevance' };

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { products } = useApp();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const cat = CATEGORIES.find(c => c.id === categoryId);

  const filtered = useMemo(() => {
    let list = products.filter(p => p.category === categoryId);
    if (filters.maxPrice < 200000) list = list.filter(p => p.price <= filters.maxPrice);
    if (filters.minRating) list = list.filter(p => p.rating >= filters.minRating);
    if (filters.inStockOnly) list = list.filter(p => p.inStock);
    if (filters.arOnly) list = list.filter(p => p.arEnabled);
    switch (filters.sort) {
      case 'Price: Low to High': list.sort((a,b) => a.price - b.price); break;
      case 'Price: High to Low': list.sort((a,b) => b.price - a.price); break;
      case 'Top Rated': list.sort((a,b) => b.rating - a.rating); break;
      case 'Newest': list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      default: break;
    }
    return list;
  }, [products, categoryId, filters]);

  const gradients = { furniture: 'linear-gradient(135deg,#8B4513,#D2691E)', electronics: 'linear-gradient(135deg,#1565C0,#42A5F5)', fashion: 'linear-gradient(135deg,#6A1B9A,#AB47BC)', toys: 'linear-gradient(135deg,#E65100,#FFA726)', other: 'linear-gradient(135deg,#2E7D32,#66BB6A)' };

  if (!cat) return <div className="page-wrapper"><div className="container" style={{paddingTop:40}}><h2>Category not found</h2></div></div>;

  return (
    <div className="page-wrapper">
      {/* Banner */}
      <div style={{ background: gradients[categoryId] || '#1A1A1A', padding: '40px 0', marginBottom: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 56 }}>{cat.icon}</span>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>
                <Link to="/home" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link> / {cat.name}
              </div>
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{cat.name}</h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 999, padding: '4px 14px', marginTop: 10 }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>🔮 {cat.arLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* Sidebar desktop */}
          <div style={{ width: 240, flexShrink: 0, display: window.innerWidth >= 900 ? 'block' : 'none' }}>
            <FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} resultCount={filtered.length} />
          </div>

          <div style={{ flex: 1 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontWeight: 600, color: '#444', fontSize: 15 }}>{filtered.length} products in {cat.name}</span>
              <button onClick={() => setShowFilters(!showFilters)} style={{ background: '#1A1A1A', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer', display: window.innerWidth >= 900 ? 'none' : 'block' }}>
                🎛️ Filters
              </button>
            </div>
            {showFilters && <div style={{ marginBottom: 20 }}><FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} resultCount={filtered.length} /></div>}

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">😕</div>
                <div className="empty-state-title">No products found</div>
                <div className="empty-state-subtitle">Try adjusting filters</div>
                <button className="btn btn-primary" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear Filters</button>
              </div>
            ) : (
              <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
