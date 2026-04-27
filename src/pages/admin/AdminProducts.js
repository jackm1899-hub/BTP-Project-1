import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminNav } from './AdminDashboard';
import { CATEGORIES, SUBCATEGORIES } from '../../data/products';
import ConfirmDialog from '../../components/ConfirmDialog';

const EMPTY = { name: '', category: 'furniture', subcategory: '', description: '', price: '', mrp: '', stock: '', image: '', modelPath: '', arEnabled: true, featured: false, inStock: true, features: [] };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, updateStock } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [featureInput, setFeatureInput] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState('');
  const [editingStock, setEditingStock] = useState({});

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const set = k => e => setForm(f => ({ ...f, [k]: e.target?.value !== undefined ? e.target.value : e }));

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ ...p, price: String(p.price), mrp: String(p.mrp), stock: String(p.stock), features: p.features || [] });
    setEditId(p.id); setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), mrp: Number(form.mrp), stock: Number(form.stock), inStock: Number(form.stock) > 0, discount: Math.round(((Number(form.mrp) - Number(form.price)) / Number(form.mrp)) * 100), image: form.image || `https://picsum.photos/seed/${Date.now()}/400/300`, rating: form.rating || 4.0, reviews: form.reviews || 0 };
    if (editId) updateProduct(editId, data);
    else addProduct(data);
    setShowForm(false); setForm(EMPTY); setEditId(null);
  };

  const addFeature = () => { if (featureInput.trim()) { setForm(f => ({ ...f, features: [...(f.features || []), featureInput.trim()] })); setFeatureInput(''); } };

  const stockColor = (s) => s > 10 ? '#2E7D32' : s > 0 ? '#F57F17' : '#C62828';

  const inputS = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E0DDD8', background: '#fff', fontSize: 14, outline: 'none' };

  return (
    <div className="page-wrapper">
      <div style={{ background: '#1A1A1A', padding: '24px' }}>
        <div className="container" style={{ padding: 0 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, color: '#fff' }}>Admin Panel</h1>
        </div>
      </div>
      <AdminNav />

      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800 }}>Products</h2>
            <p style={{ color: '#9E9E9E', fontSize: 14 }}>{filtered.length} products</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ ...inputS, width: 220 }} />
            <button onClick={openAdd} style={{ background: '#FF4500', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>+ Add Product</button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F7F4EF' }}>
                  {['Image', 'Product', 'Category', 'Price', 'Stock', 'Status', 'AR', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#9E9E9E', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #F0EDE8', background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <img src={p.image} alt={p.name} style={{ width: 50, height: 38, objectFit: 'cover', borderRadius: 6 }} onError={e => e.target.style.display = 'none'} />
                    </td>
                    <td style={{ padding: '12px 16px', maxWidth: 200 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#9E9E9E' }}>{p.subcategory}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#444', whiteSpace: 'nowrap' }}>{p.category}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {editingStock[p.id] !== undefined ? (
                        <input type="number" value={editingStock[p.id]} min={0}
                          onChange={e => setEditingStock(s => ({ ...s, [p.id]: e.target.value }))}
                          onBlur={() => { updateStock(p.id, Number(editingStock[p.id])); setEditingStock(s => { const n = { ...s }; delete n[p.id]; return n; }); }}
                          style={{ width: 70, padding: '4px 8px', borderRadius: 6, border: '1.5px solid #FF4500', fontSize: 13, outline: 'none' }}
                          autoFocus />
                      ) : (
                        <span onClick={() => setEditingStock(s => ({ ...s, [p.id]: p.stock }))} style={{ fontWeight: 700, color: stockColor(p.stock), cursor: 'pointer', padding: '3px 8px', borderRadius: 6, background: stockColor(p.stock) + '15' }}>
                          {p.stock}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '3px 10px', background: p.inStock ? '#E8F5E9' : '#FFEBEE', color: p.inStock ? '#2E7D32' : '#C62828' }}>
                        {p.inStock ? (p.stock <= 10 ? 'Low' : 'In Stock') : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 18 }}>{p.arEnabled ? '🔮' : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => openEdit(p)} style={{ background: '#E3F2FD', color: '#1565C0', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => setConfirmId(p.id)} style={{ background: '#FFEBEE', color: '#C62828', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 36, maxWidth: 640, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800 }}>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#9E9E9E' }}>✕</button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>PRODUCT NAME *</label>
                    <input required value={form.name} onChange={set('name')} style={inputS} placeholder="Product name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>CATEGORY *</label>
                    <select value={form.category} onChange={e => { setForm(f => ({ ...f, category: e.target.value, subcategory: '' })); }} style={inputS}>
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>SUB-CATEGORY</label>
                    <select value={form.subcategory} onChange={set('subcategory')} style={inputS}>
                      <option value="">Select...</option>
                      {(SUBCATEGORIES[form.category] || []).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>PRICE (₹) *</label>
                    <input required type="number" value={form.price} onChange={set('price')} style={inputS} placeholder="0" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>MRP (₹) *</label>
                    <input required type="number" value={form.mrp} onChange={set('mrp')} style={inputS} placeholder="0" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>STOCK QTY *</label>
                    <input required type="number" value={form.stock} onChange={set('stock')} style={inputS} placeholder="0" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>DESCRIPTION</label>
                    <textarea value={form.description} onChange={set('description')} style={{ ...inputS, height: 80, resize: 'vertical' }} placeholder="Product description..." />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>IMAGE URL</label>
                    <input value={form.image} onChange={set('image')} style={inputS} placeholder="https://..." />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>3D MODEL PATH</label>
                    <input value={form.modelPath} onChange={set('modelPath')} style={inputS} placeholder="/models/category/product.glb" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#9E9E9E', display: 'block', marginBottom: 6 }}>FEATURES</label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} style={{ ...inputS, flex: 1 }} placeholder="Add a feature..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                      <button type="button" onClick={addFeature} style={{ background: '#F7F4EF', border: '1.5px solid #ddd', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', fontWeight: 700 }}>+</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(form.features || []).map((f, i) => (
                        <span key={i} style={{ background: '#F7F4EF', border: '1px solid #ddd', borderRadius: 8, padding: '4px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {f}
                          <button type="button" onClick={() => setForm(ff => ({ ...ff, features: ff.features.filter((_, fi) => fi !== i) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C62828', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, gridColumn: '1/-1', flexWrap: 'wrap' }}>
                    {[['arEnabled', '🔮 AR Enabled'], ['featured', '⭐ Featured'], ['inStock', '✅ In Stock']].map(([k, label]) => (
                      <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                        <input type="checkbox" checked={!!form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.checked }))} style={{ accentColor: '#FF4500', width: 16, height: 16 }} />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1.5px solid #ddd', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '13px', borderRadius: 10, border: 'none', background: '#FF4500', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                    {editId ? '💾 Update Product' : '✅ Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {confirmId && (
          <ConfirmDialog
            message="Delete this product? This cannot be undone."
            onConfirm={() => { deleteProduct(confirmId); setConfirmId(null); }}
            onCancel={() => setConfirmId(null)}
          />
        )}
      </div>
    </div>
  );
}
