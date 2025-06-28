import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';

const AdminHeader = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Clear admin session/token
    localStorage.removeItem('adminToken');
    // Redirect to login
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-[#000D3A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <img
                src="/logo.png"
                alt="CardioCare Logo"
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold">CardioCare Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === '/admin/dashboard'
                  ? 'bg-[#FF5733] text-white'
                  : 'text-gray-300 hover:bg-[#FF5733]/10 hover:text-white'
                }`}
            >
              <FaCalendarAlt className="mr-2" />
              Appointments
            </Link>
            <Link
              to="/admin/finances"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === '/admin/finances'
                  ? 'bg-[#FF5733] text-white'
                  : 'text-gray-300 hover:bg-[#FF5733]/10 hover:text-white'
                }`}
            >
              <FaMoneyBillWave className="mr-2" />
              Finances
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#FF5733]/10 hover:text-white transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 