import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import AdminApp from './admin/pages/AdminApp';
import Login from './admin/pages/Login';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminFinances from './admin/pages/AdminFinances';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/finances" element={<AdminFinances />} />
      </Routes>
    </Router>
  );
}

export default App; 