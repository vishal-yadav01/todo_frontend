import React from 'react';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default OpenRoute;
