import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/home" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useApp();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  // Hide Navbar only on the root landing page when user is NOT logged in
  const hidingNavbar = location.pathname === '/' && !user;

  return (
    <>
      {!hidingNavbar && <Navbar />}
      <Routes>
        {/* Root: Landing if not logged in, Home if logged in */}
        <Route path="/" element={
          user
            ? <Navigate to={isAdmin ? '/admin' : '/home'} replace />
            : <LandingPage />
        } />

        {/* Main store */}
        <Route path="/home" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Auth — redirect if already logged in */}
        <Route path="/login" element={
          user ? <Navigate to={isAdmin ? '/admin' : '/home'} replace /> : <LoginPage />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/home" replace /> : <SignupPage />
        } />

        {/* Protected user */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Protected admin */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute requireAdmin><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
