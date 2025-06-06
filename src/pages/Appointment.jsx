import { useState } from 'react';
import { FaHeartbeat, FaStethoscope, FaUserMd, FaProcedures, FaCalendarAlt } from 'react-icons/fa';
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

  const FULL_SLOTS = getFullSlots(form.date);

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
    try {
      // Get reCAPTCHA token
      const token = window.grecaptcha.getResponse();
      if (!token) {
        setError('Please complete the reCAPTCHA verification');
        return;
      }

      const response = await api.post('/api/appointments', {
        ...form,
        token
      });
      
      if (response.data.success) {
        setSubmitted(true);
        // Reset reCAPTCHA
        window.grecaptcha.reset();
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setError(error.response?.data?.error || 'Failed to submit appointment');
      // Reset reCAPTCHA on error
      window.grecaptcha.reset();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#000D3A] flex flex-col justify-center pt-36">
      <div className="w-full max-w-2xl mx-auto px-4 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Book an Appointment</h1>
        {submitted ? (
          <div className="text-center text-white text-xl font-bold py-12 drop-shadow-lg">Thank you! Your appointment request has been submitted.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection */}
            <div>
              <label className="block text-white font-semibold mb-2 drop-shadow">Select Service(s)</label>
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
            <div>
              <label className="block text-white font-semibold mb-2 drop-shadow">Select Date</label>
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
              <label className="block text-white font-semibold mb-2 drop-shadow">Select Time Slot (5:00 PM - 8:00 PM)</label>
              <div className="flex flex-wrap gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    disabled={FULL_SLOTS.includes(slot)}
                    className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors text-sm
                      ${form.time === slot ? 'bg-[#8080D7] text-white border-[#8080D7]' : FULL_SLOTS.includes(slot) ? 'bg-red-200 text-red-700 border-red-400 cursor-not-allowed' : 'bg-[#000D3A] text-white border-[#8080D7] hover:bg-[#8080D7]/10'}`}
                  >
                    {slot.replace(':', ':')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-1 drop-shadow">Name</label>
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
              <label className="block text-white font-semibold mb-1 drop-shadow">Email / Phone</label>
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
              <label className="block text-white font-semibold mb-1 drop-shadow">Message / Reason</label>
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
            {/* Add reCAPTCHA before the submit button */}
            <div className="flex justify-center">
              <div className="g-recaptcha" data-sitekey="6LePJlgrAAAAAKC-4k0THaPDcUeiCphOtv5zlvrX"></div>
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
        {/* Placeholder for calendar/slots */}
        <div className="mt-10 text-center text-[#8080D7]">
          <span className="font-semibold">Coming soon:</span> Availability calendar / Google Calendar slots
        </div>
      </div>
    </div>
  );
};

export default Appointment; 