import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import initialProducts from '../data/products';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const ADMIN = { email: 'admin@arshop.com', password: 'admin123', name: 'Admin', role: 'admin' };
const LS = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => LS.get('arshop_products', initialProducts));
  const [user, setUser] = useState(() => LS.get('arshop_user', null));
  const [users, setUsers] = useState(() => LS.get('arshop_users', []));
  const [cart, setCart] = useState(() => LS.get('arshop_cart', []));
  const [wishlist, setWishlist] = useState(() => LS.get('arshop_wishlist', []));
  const [orders, setOrders] = useState(() => LS.get('arshop_orders', []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => LS.get('arshop_recent', []));
  const [toast, setToast] = useState(null);

  useEffect(() => { LS.set('arshop_products', products); }, [products]);
  useEffect(() => { LS.set('arshop_user', user); }, [user]);
  useEffect(() => { LS.set('arshop_users', users); }, [users]);
  useEffect(() => { LS.set('arshop_cart', cart); }, [cart]);
  useEffect(() => { LS.set('arshop_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { LS.set('arshop_orders', orders); }, [orders]);
  useEffect(() => { LS.set('arshop_recent', recentlyViewed); }, [recentlyViewed]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // AUTH
  const signup = (name, email, password) => {
    if (users.find(u => u.email === email)) return { error: 'Email already registered.' };
    const newUser = { id: Date.now(), name, email, password, role: 'user', joinDate: new Date().toISOString(), blocked: false };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    showToast(`Welcome, ${name}! 🎉`);
    return { success: true };
  };

  const login = (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      setUser(ADMIN);
      showToast('Welcome back, Admin! 👋');
      return { success: true, role: 'admin' };
    }
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: 'Invalid email or password.' };
    if (found.blocked) return { error: 'Your account has been blocked.' };
    setUser(found);
    showToast(`Welcome back, ${found.name.split(' ')[0]}! 👋`);
    return { success: true, role: 'user' };
  };

  const logout = () => { setUser(null); setCart([]); showToast('Logged out successfully.'); };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    showToast('Profile updated!');
  };

  // CART
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = (id) => { setCart(prev => prev.filter(i => i.id !== id)); };
  const updateCartQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartGST = Math.round(cartSubtotal * 0.18);
  const cartShipping = cartSubtotal >= 999 ? 0 : 99;
  const cartTotal = cartSubtotal + cartGST + cartShipping;

  // WISHLIST
  const toggleWishlist = (product) => {
    const inWishlist = wishlist.find(i => i.id === product.id);
    if (inWishlist) { setWishlist(prev => prev.filter(i => i.id !== product.id)); showToast('Removed from wishlist'); }
    else { setWishlist(prev => [...prev, product]); showToast('Added to wishlist ❤️'); }
  };
  const isInWishlist = (id) => wishlist.some(i => i.id === id);

  // ORDERS
  const placeOrder = () => {
    if (!user || cart.length === 0) return null;
    const order = {
      id: 'ORD' + Date.now(),
      userId: user.id || 'admin',
      userEmail: user.email,
      userName: user.name,
      items: cart.map(i => ({ ...i })),
      subtotal: cartSubtotal,
      gst: cartGST,
      shipping: cartShipping,
      total: cartTotal,
      status: 'Confirmed',
      date: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    showToast('Order placed successfully! 🎉');
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const userOrders = (uid) => orders.filter(o => o.userId === uid || o.userEmail === user?.email);

  // RECENTLY VIEWED
  const addRecentlyViewed = (productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  // PRODUCTS (ADMIN)
  const addProduct = (product) => {
    const newP = { ...product, id: String(Date.now()), createdAt: new Date().toISOString() };
    setProducts(prev => [newP, ...prev]);
    showToast('Product added! ✅');
    return newP;
  };

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    showToast('Product updated!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted.');
  };

  const updateStock = (id, stock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock, inStock: stock > 0 } : p));
  };

  // USERS (ADMIN)
  const toggleBlockUser = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, blocked: !u.blocked } : u));
  };

  // STATS
  const stats = {
    totalProducts: products.length,
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((s, o) => s + o.total, 0),
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    mostViewed: products.reduce((a, b) => ((a.reviews || 0) > (b.reviews || 0) ? a : b), products[0]),
  };

  return (
    <AppContext.Provider value={{
      products, user, users, cart, wishlist, orders, recentlyViewed, toast, stats,
      cartCount, cartSubtotal, cartGST, cartShipping, cartTotal,
      signup, login, logout, updateProfile,
      addToCart, removeFromCart, updateCartQty, clearCart,
      toggleWishlist, isInWishlist,
      placeOrder, updateOrderStatus, userOrders,
      addRecentlyViewed,
      addProduct, updateProduct, deleteProduct, updateStock,
      toggleBlockUser, showToast,
    }}>
      {children}
      {toast && <Toast toast={toast} />}
    </AppContext.Provider>
  );
}

function Toast({ toast }) {
  const colors = { success: '#2E7D32', error: '#C62828', info: '#1565C0', warning: '#F57F17' };
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: colors[toast.type] || colors.success, color: '#fff',
      padding: '14px 20px', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      fontWeight: 600, fontSize: 14, maxWidth: 320,
      animation: 'slideInRight 0.3s ease',
    }}>
      {toast.message}
    </div>
  );
}
