import AdminHeader from '../components/AdminHeader';
import FinanceManagement from '../components/FinanceManagement';

const AdminFinances = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinanceManagement />
      </div>
    </div>
  );
};

export default AdminFinances; 