import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import AdminFinances from './AdminFinances';
import AdminHeader from '../components/AdminHeader';
import AppointmentList from '../components/AppointmentList';

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Appointments Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and track all patient appointments
        </p>
      </div>
      <div className="bg-white shadow rounded-lg">
        <AppointmentList />
      </div>
    </div>
  );
};

const ProtectedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        {/* Sidebar will go here */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminApp = () => {
  // Check if admin is logged in
  const isAuthenticated = localStorage.getItem('adminToken');

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="finances"
          element={
            <ProtectedRoute>
              <AdminFinances />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default AdminApp; 