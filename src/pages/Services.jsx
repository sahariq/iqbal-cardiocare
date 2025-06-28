import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';
import pic6 from '../assets/pic6.png';
import pic7 from '../assets/pic7.png';
import { motion } from 'framer-motion';

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
    title: "Facility of Coronary Angiography and Intervention",
    description: "Expert Diagnosis and Treatment of Coronary Artery Disease with State-of-the-Art Intervention Facilities.",
    bg: "bg-purple-50"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000D3A' }}>
      {/* Hero Section */}
      <section className="w-full py-16 px-4 flex flex-col items-center pt-36">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#8080D7' }}>
          Our Services
        </h1>
        <p className="text-lg text-center mb-8 text-white max-w-2xl">
          We offer a comprehensive range of cardiac services, from consultation to advanced intervention, all under one roof.
        </p>
      </section>
      {/* Services Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center ${service.bg}`}
            >
              <img src={service.image} alt={service.title} className="w-36 h-36 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#8080D7] text-center">{service.title}</h3>
              <p className="text-gray-700 text-center mb-4">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services; 