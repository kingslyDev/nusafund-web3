import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute yang memeriksa plugPrincipal di localStorage
const MustHavePrincipeId = ({ children }) => {
  const plugPrincipal = localStorage.getItem('plugPrincipal');

  // Redirect ke halaman login jika tidak ada plugPrincipal
  if (!plugPrincipal) {
    return <Navigate to="/" replace />;
  }

  // Jika ada plugPrincipal, render children (komponen halaman)
  return children;
};

export default MustHavePrincipeId;
