import { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AppointmentList from '../components/AppointmentList';
import FinanceManagement from '../components/FinanceManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${
                  activeTab === 'appointments'
                    ? 'border-[#FF5733] text-[#FF5733]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('finances')}
                className={`${
                  activeTab === 'finances'
                    ? 'border-[#FF5733] text-[#FF5733]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Finances
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'appointments' ? (
          <AppointmentList />
        ) : (
          <FinanceManagement />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 