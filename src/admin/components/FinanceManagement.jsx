import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCreditCard, FaExchangeAlt, FaCalendarAlt, FaDownload, FaFilter, FaSearch } from 'react-icons/fa';
import api from '../../config/axios';

const FinanceManagement = () => {
  const [finances, setFinances] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    refunded: 0,
    byMethod: {
      cash: 0,
      card: 0,
      bank_transfer: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  useEffect(() => {
    fetchFinances();
  }, [dateRange]);

  const fetchFinances = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch finances
      const financesResponse = await api.get('/api/admin/finances');
      if (financesResponse.data.success) {
        setFinances(financesResponse.data.data);
        setSummary(financesResponse.data.summary);
      }

      // Fetch summary with date range if set
      if (dateRange.startDate && dateRange.endDate) {
        const summaryResponse = await api.get('/api/admin/finances/summary', {
          params: dateRange
        });
        if (summaryResponse.data.success) {
          setSummary(prev => ({
            ...prev,
            ...summaryResponse.data.data
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching finances:', error);
      setError('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await api.put(`/api/admin/finances/${id}`, {
        status: newStatus
      });

      if (response.data.success) {
        setFinances(finances.map(f => 
          f._id === id ? response.data.data : f
        ));
        fetchFinances(); // Refresh summary
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update payment status');
    }
  };

  const exportToCSV = () => {
    const headers = ['Patient Name', 'Amount', 'Payment Method', 'Date', 'Status', 'Notes'];
    const csvData = finances.map(f => [
      f.patientName,
      f.amount,
      f.paymentMethod,
      new Date(f.paymentDate).toLocaleDateString(),
      f.status,
      f.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `finances_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter and search functionality
  const filteredFinances = finances.filter(finance => {
    const matchesSearch = finance.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || finance.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || finance.paymentMethod === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#000D3A]">Finance Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="flex items-center px-4 py-2 bg-[#FF5733] text-white rounded-md hover:bg-[#FF5733]/90 transition-colors"
        >
          <FaDownload className="mr-2" />
          Export to CSV
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            >
              <option value="all">All Methods</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-[#000D3A]">{formatCurrency(summary.total)}</p>
            </div>
            <FaMoneyBillWave className="text-[#FF5733] text-2xl" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Payments</p>
              <p className="text-2xl font-bold text-[#000D3A]">{formatCurrency(summary.pending)}</p>
            </div>
            <FaCalendarAlt className="text-[#FF5733] text-2xl" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed Payments</p>
              <p className="text-2xl font-bold text-[#000D3A]">{formatCurrency(summary.completed)}</p>
            </div>
            <FaCreditCard className="text-[#FF5733] text-2xl" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Refunded</p>
              <p className="text-2xl font-bold text-[#000D3A]">{formatCurrency(summary.refunded)}</p>
            </div>
            <FaExchangeAlt className="text-[#FF5733] text-2xl" />
          </div>
        </motion.div>
      </div>

      {/* Payment Methods Summary */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold text-[#000D3A] mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">Cash</p>
            <p className="text-xl font-bold text-[#000D3A]">{formatCurrency(summary.byMethod.cash)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">Card</p>
            <p className="text-xl font-bold text-[#000D3A]">{formatCurrency(summary.byMethod.card)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">Bank Transfer</p>
            <p className="text-xl font-bold text-[#000D3A]">{formatCurrency(summary.byMethod.bank_transfer)}</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#000D3A]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredFinances.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredFinances.map((finance) => (
                  <tr key={finance._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {finance.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(finance.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {finance.paymentMethod.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(finance.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${finance.status === 'completed' ? 'bg-green-100 text-green-800' :
                          finance.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {finance.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={finance.status}
                        onChange={(e) => handleStatusUpdate(finance._id, e.target.value)}
                        className="border rounded-md px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement; 