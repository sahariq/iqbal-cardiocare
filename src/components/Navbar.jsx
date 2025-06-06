import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-[#000D3A] z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight select-none">
            <span className="font-extrabold text-lg text-white tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>iqbal</span>
            <span className="font-extrabold text-3xl text-white tracking-widest -mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>cardiocare</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-white hover:text-[#FF5733] font-medium transition-colors lowercase">
              home
            </Link>
            <Link to="/appointment" className="text-white hover:text-[#FF5733] font-medium transition-colors lowercase">
              appointment
            </Link>
            <Link to="/services" className="text-white hover:text-[#FF5733] font-medium transition-colors lowercase">
              services
            </Link>
            <Link to="/contact" className="text-white hover:text-[#FF5733] font-medium transition-colors lowercase">
              contact
            </Link>
            <Link to="/about" className="text-white hover:text-[#FF5733] font-medium transition-colors lowercase">
              about
            </Link>
          </div>

          {/* Book Appointment Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/appointment"
              className="bg-[#FF5733] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors lowercase"
            >
              book appointment
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white hover:text-[#FF5733]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 