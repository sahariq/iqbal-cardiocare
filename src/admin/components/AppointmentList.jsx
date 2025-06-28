import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/admin/appointments');
      setAppointments(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await axios.put(`/api/admin/appointments/${id}/confirm`);
      fetchAppointments();
    } catch (err) {
      setError('Failed to confirm appointment');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`/api/admin/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`/api/admin/appointments/${id}`);
        fetchAppointments();
      } catch (err) {
        setError('Failed to delete appointment');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5733]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#000D3A]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Services</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <motion.tr 
              key={appointment._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-[#000D3A]">{appointment.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#000D3A]">{appointment.contact}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#000D3A]">
                  {new Date(appointment.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.time}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-[#000D3A]">
                  {appointment.services.join(', ')}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-[#000D3A] max-w-xs truncate">{appointment.message}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {appointment.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleConfirm(appointment._id)}
                      className="text-green-600 hover:text-green-900"
                      title="Confirm"
                    >
                      ✅
                    </motion.button>
                  )}
                  {appointment.status !== 'cancelled' && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCancel(appointment._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Cancel"
                    >
                      ❌
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(appointment._id)}
                    className="text-[#000D3A] hover:text-[#FF5733]"
                    title="Delete"
                  >
                    🗑️
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList; 