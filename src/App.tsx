import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import CartPage from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { ProtectedRoute, PublicRoute } from './components/auth/AuthGuard';

const App: React.FC = () => {
  return (
    <div className="antialiased min-h-screen bg-white">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
