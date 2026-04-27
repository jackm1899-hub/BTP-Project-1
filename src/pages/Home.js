import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { CATEGORIES } from '../data/products';

const DEFAULT_FILTERS = { categories: [], maxPrice: 200000, minRating: null, inStockOnly: false, arOnly: false, sort: 'Relevance' };

export default function Home() {
  const { products, recentlyViewed } = useApp();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const searchQuery = searchParams.get('search') || '';
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.subcategory?.toLowerCase().includes(q));
    }
    if (filters.categories.length > 0) list = list.filter(p => filters.categories.includes(p.category));
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
  }, [products, filters, searchQuery]);

  const featured = products.filter(p => p.featured);
  const trending = products.filter(p => p.rating >= 4.7).slice(0, 8);
  const recentProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean).slice(0, 6);

  const isSearching = !!searchQuery || filters.categories.length > 0 || filters.arOnly || filters.inStockOnly || filters.minRating || filters.maxPrice < 200000;

  return (
    <div className="page-wrapper">
      {!isSearching ? (
        <>
          <Hero />
          <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
            <FeatureStrip />
            <CategoryGrid />
            <Section title="⭐ Featured Products" subtitle="Handpicked top-rated items with AR previews">
              <div className="product-grid">{featured.map(p => <ProductCard key={p.id} product={p} />)}</div>
            </Section>
            <Section title="🔥 Trending Now" subtitle="Most loved products this week">
              <div className="product-grid">{trending.map(p => <ProductCard key={p.id} product={p} />)}</div>
            </Section>
            {recentProducts.length > 0 && (
              <Section title="🕒 Recently Viewed" subtitle="Pick up where you left off">
                <div className="product-grid">{recentProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
              </Section>
            )}
          </div>
        </>
      ) : (
        <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
          {searchQuery && (
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 700 }}>
                Search results for "<span style={{ color: '#FF4500' }}>{searchQuery}</span>"
              </h1>
              <p style={{ color: '#9E9E9E', marginTop: 4 }}>{filtered.length} products found</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'none' }} className="filter-desktop">
              <FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} resultCount={filtered.length} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <span style={{ fontWeight: 600, color: '#444' }}>{filtered.length} results</span>
                <button onClick={() => setShowFilters(!showFilters)} style={{ background: '#1A1A1A', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }}>
                  🎛️ Filters
                </button>
              </div>
              {showFilters && <div style={{ marginBottom: 20 }}><FilterSidebar filters={filters} onChange={setFilters} onClear={() => setFilters(DEFAULT_FILTERS)} resultCount={filtered.length} /></div>}
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <div className="empty-state-title">No products found</div>
                  <div className="empty-state-subtitle">Try adjusting your search or filters</div>
                  <button className="btn btn-primary" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear Filters</button>
                </div>
              ) : (
                <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0D0D0D 0%, #1A0A00 40%, #2D1200 70%, #1A1A1A 100%)',
      minHeight: '88vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated blobs */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: [300,200,250,180,220][i], height: [300,200,250,180,220][i],
          borderRadius: '50%',
          background: ['rgba(255,69,0,0.15)','rgba(255,107,53,0.1)','rgba(255,69,0,0.08)','rgba(200,50,0,0.12)','rgba(255,100,0,0.06)'][i],
          top: ['10%','60%','30%','70%','20%'][i], left: ['60%','70%','80%','20%','10%'][i],
          filter: 'blur(60px)', animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
        }} />
      ))}
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,69,0,0.15)', border: '1px solid rgba(255,69,0,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
          <span style={{ fontSize: 16 }}>🔮</span>
          <span style={{ color: '#FF6B35', fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>AUGMENTED REALITY SHOPPING</span>
        </div>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(44px,8vw,96px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-2px' }}>
          Shop.<br /><span style={{ background: 'linear-gradient(135deg,#FF4500,#FF8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>See.</span><br />Experience.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(16px,2vw,20px)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Preview furniture, electronics & fashion in your own space with Augmented Reality before you buy.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#categories" style={{ background: 'linear-gradient(135deg,#FF4500,#FF6B35)', color: '#fff', borderRadius: 12, padding: '16px 36px', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 24px rgba(255,69,0,0.4)', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            🛍️ Explore Products
          </a>
          <a href="#how-ar" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, padding: '16px 36px', fontWeight: 700, fontSize: 16, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.2)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}>
            💡 How AR Works
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureStrip() {
  const items = [
    { icon: '🔮', title: 'AR Preview', desc: 'See before you buy' },
    { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹999' },
    { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free' },
    { icon: '💳', title: 'Safe Payment', desc: 'Encrypted & secure' },
  ];
  return (
    <div id="how-ar" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 56 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, color: '#1A1A1A' }}>{item.title}</div>
          <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

function CategoryGrid() {
  const navigate = useNavigate();
  const gradients = [
    'linear-gradient(135deg,#8B4513,#D2691E)',
    'linear-gradient(135deg,#1565C0,#42A5F5)',
    'linear-gradient(135deg,#6A1B9A,#AB47BC)',
    'linear-gradient(135deg,#E65100,#FFA726)',
    'linear-gradient(135deg,#2E7D32,#66BB6A)',
  ];
  return (
    <div id="categories" style={{ marginBottom: 56 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Explore our AR-powered product categories</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}
            style={{
              background: gradients[i], borderRadius: 16, padding: '28px 20px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              transition: 'transform 0.22s, box-shadow 0.22s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'; }}>
            <span style={{ fontSize: 40 }}>{cat.icon}</span>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>{cat.name}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', background: 'rgba(0,0,0,0.2)', borderRadius: 999, padding: '3px 10px' }}>{cat.arLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
