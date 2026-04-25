import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export const ProtectedRoute: React.FC = () => {
  const auth = useSelector((state: any) => state.auth || {});
  const isAuthenticated = auth.isAuthenticated || false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const auth = useSelector((state: any) => state.auth || {});
  const isAuthenticated = auth.isAuthenticated || false;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
