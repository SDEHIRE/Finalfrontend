
import { useUser } from './context/UserContext';

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';


export default function ProtectedRoute({ element: Element }) {
  const { isAuthenticated, checkAuth } = useUser();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('ProtectedRoute - Is authenticated:', isAuthenticated());
  console.log('ProtectedRoute - Current location:', location);

  if (!isAuthenticated()) {
    console.log('ProtectedRoute - Redirecting to login');
    return <Navigate to="/Sdehire-pro-Student-login" state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute - Rendering protected component');
  return <Element />;
}

