import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../Guard/ProtectedRoute';
import Login from './Login';
import Home from './Home';
import UsermanagementRoute from '../UserManagement/UsermanagementRoute';

const RoutesComponent = () => {
  const isLoggedIn = localStorage?.getItem('loggedIn') ? true : false;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user_management/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <UsermanagementRoute />
          </ProtectedRoute>
        }
      />

      {/* Redirect based on Authentication */}
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
