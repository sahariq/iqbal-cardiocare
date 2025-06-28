import { useState, useEffect } from 'react';
import { FaHeartbeat, FaStethoscope, FaUserMd, FaProcedures, FaCalendarAlt, FaSync } from 'react-icons/fa';
import api from '../config/axios';

const SERVICES = [
  { key: 'consult', label: 'Consultation', icon: <FaUserMd className="w-6 h-6" /> },
  { key: 'ecg', label: 'ECG', icon: <FaHeartbeat className="w-6 h-6" /> },
  { key: 'echo', label: 'Echocardiography', icon: <FaStethoscope className="w-6 h-6" /> },
  { key: 'angiography', label: 'Angiography', icon: <FaProcedures className="w-6 h-6" /> },
];

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

const MAX_SLOTS_PER_TIME = 2; // Maximum number of appointments per time slot

// Simulate full slots for a given date
const getFullSlots = (date) => {
  // Example: If the day is even, 18:00 and 19:00 are full; if odd, 17:30 and 19:30 are full
  const d = new Date(date);
  if (isNaN(d)) return [];
  return d.getDate() % 2 === 0 ? ['18:00', '19:00'] : ['17:30', '19:30'];
};

const Appointment = () => {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    services: [],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Fetch booked slots when date changes
  const fetchBookedSlots = async () => {
    if (!form.date) return;
    
    setIsLoading(true);
    setFetchError('');
    
    try {
      const response = await api.get(`/api/appointments/available-slots?date=${form.date}`);
      if (response.data.success) {
        // Count appointments for each time slot
        const slotCounts = TIME_SLOTS.reduce((acc, slot) => {
          acc[slot] = response.data.data.filter(time => time === slot).length;
          return acc;
        }, {});
        setBookedSlots(slotCounts);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      setFetchError('Failed to load available time slots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [form.date]);

  // Calculate available slots for each time
  const getAvailableSlots = (time) => {
    const bookedCount = bookedSlots[time] || 0;
    return MAX_SLOTS_PER_TIME - bookedCount;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleTimeSelect = (time) => {
    setForm(prev => ({ ...prev, time }));
  };

  const handleDateChange = (e) => {
    setForm({ ...form, date: e.target.value, time: '' }); // Reset time on date change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!form.name || !form.contact || !form.date || !form.time || form.services.length === 0 || !form.message) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if slot is still available
    if (getAvailableSlots(form.time) <= 0) {
      setError('This time slot is no longer available. Please select another time.');
      return;
    }

    try {
      const response = await api.post('/api/appointments', form);
      
      if (response.data.success) {
        setSubmitted(true);
        // Reset form
        setForm({
          name: '',
          contact: '',
          date: '',
          time: '',
          services: [],
          message: ''
        });
        // Refresh available slots
        fetchBookedSlots();
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      const errorMessage = error.response?.data?.error || 'Failed to submit appointment. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000D3A] to-[#1A237E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Book an Appointment</h1>
          <p className="text-gray-300">Schedule your visit with our expert cardiologists</p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <FaCalendarAlt className="text-[#FF5733] text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Requested!</h2>
            <p className="text-gray-600">We'll contact you shortly to confirm your appointment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-xl">
            {/* Service Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-bold">Select Service(s)</label>
              <div className="flex flex-wrap gap-4 mb-2">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s.key}
                    onClick={() => handleServiceToggle(s.key)}
                    className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 transition-colors font-semibold ${form.services.includes(s.key) ? 'bg-[#8080D7] text-white border-[#8080D7]' : 'bg-[#000D3A] border-[#8080D7] text-white hover:bg-[#8080D7]/10'}`}
                  >
                    {s.icon}
                    <span className="mt-1 text-sm">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Date Picker + Time Slots */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-bold">
                  Preferred Time
                </label>
                <button
                  type="button"
                  onClick={fetchBookedSlots}
                  disabled={isLoading}
                  className="text-[#FF5733] hover:text-[#FF5733]/80 flex items-center gap-2 text-sm"
                >
                  <FaSync className={`${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              
              {fetchError && (
                <div className="text-red-500 text-sm mb-2">{fetchError}</div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const availableSlots = getAvailableSlots(slot);
                  const isAvailable = availableSlots > 0;
                  
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => isAvailable && setForm({ ...form, time: slot })}
                      disabled={!isAvailable}
                      className={`p-3 rounded-lg border-2 transition-all
                        ${form.time === slot 
                          ? 'bg-[#FF5733] text-white border-[#FF5733]' 
                          : isAvailable 
                            ? 'bg-white text-gray-800 border-gray-300 hover:border-[#FF5733] hover:bg-[#FF5733]/5' 
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                    >
                      <div className="font-semibold">{slot}</div>
                      <div className="text-xs mt-1">
                        {isAvailable 
                          ? `${availableSlots} slot${availableSlots > 1 ? 's' : ''} left`
                          : 'Fully booked'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold">Select Date</label>
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-[#8080D7] w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  min={today}
                  onChange={handleDateChange}
                  className="px-4 py-2 rounded-lg border border-[#8080D7] bg-[#000D3A] text-white focus:outline-none focus:ring-2 focus:ring-[#8080D7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border border-[#8080D7] bg-[#000D3A] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8080D7]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold">Email / Phone</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                placeholder="Enter your email or phone"
                className="w-full px-4 py-2 rounded-lg border border-[#8080D7] bg-[#000D3A] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8080D7]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold">Message / Reason</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Reason for appointment"
                className="w-full px-4 py-2 rounded-lg border border-[#8080D7] bg-[#000D3A] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8080D7]"
              />
            </div>

            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#8080D7] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointment; 