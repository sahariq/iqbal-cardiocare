import { motion } from 'framer-motion';
import { FaHeartbeat, FaStethoscope, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import doctorImg from '../assets/doctor.jpg';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';
import pic6 from '../assets/pic6.png';
import pic7 from '../assets/pic7.png';

const services = [
  {
    image: pic4,
    title: "Full Cardiac Consultation",
    description: "Comprehensive Assessment and Expert Advice for all Heart-Related Concerns.",
    bg: "bg-blue-50"
  },
  {
    image: pic5,
    title: "ECG",
    description: "Electrocardiography for Accurate Heart Rhythm and Electrical Activity Analysis.",
    bg: "bg-orange-50"
  },
  {
    image: pic6,
    title: "Echocardiography",
    description: "Advanced Ultrasound Imaging to Evaluate Heart Structure and Function.",
    bg: "bg-green-50"
  },
  {
    image: pic7,
    title: "Faculty of Coronary Angiography and Intervention",
    description: "Expert Diagnosis and Treatment of Coronary Artery Disease with State-of-the-Art Intervention Facilities.",
    bg: "bg-purple-50"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#000D3A]">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 gap-10">
          {/* Hero Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Welcome to Iqbal CardioCare
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-white"
            >
              Your Heart Health is Our Priority
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/appointment"
                className="bg-white text-[#000D3A] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              >
                Book an Appointment
              </Link>
            </motion.div>
          </div>
          {/* Doctor Photo */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img src={doctorImg} alt="Professor Muhammad Naeem Malik" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-lg" />
          </div>
        </div>
      </section>

      {/* Doctor Introduction */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Professor Muhammad Naeem Malik</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Former Executive Director of PIMS and Head of Cardiology Department, Professor Malik brings decades of expertise in cardiac care. 
              With his distinguished career and commitment to excellence, he leads our team in providing the highest quality cardiac care to all our patients.
            </p>
            <Link 
              to="/about"
              className="inline-block mt-6 px-6 py-3 bg-[#000D3A] text-white rounded-full hover:bg-opacity-90 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center ${service.bg}`}
              >
                <img src={service.image} alt={service.title} className="w-36 h-36 object-cover rounded-xl mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-[#000D3A] text-center">{service.title}</h3>
                <p className="text-gray-700 text-center">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#000D3A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Take Care of Your Heart?</h2>
            <p className="text-xl text-white mb-8">
              Schedule your appointment today and take the first step towards better heart health.
            </p>
            <Link
              to="/appointment"
              className="bg-[#FF5733] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 