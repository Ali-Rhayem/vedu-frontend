import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If there's a token, render the child components (protected page)
  return children;
};

export default ProtectedRoute;
