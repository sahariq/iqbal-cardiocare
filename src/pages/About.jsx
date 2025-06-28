import s1 from '../assets/s1.jpeg';
import s2 from '../assets/s2.jpeg';
import s3 from '../assets/s3.jpeg';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-[#000D3A] flex flex-col justify-center pt-36">
      <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Photo and summary */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center md:items-start"
        >
          <img
            src={s1}
            alt="Professor Muhammad Naeem Malik"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg mb-6 border-4 border-[#8080D7]"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg text-center md:text-left">Professor Muhammad Naeem Malik</h1>
          <h2 className="text-lg mb-6 font-semibold text-[#8080D7] text-center md:text-left">Consultant Cardiologist</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#8080D7]/20 rounded-xl p-4 w-full mb-6"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FF5733] border-l-4 border-[#FF5733] pl-3">Career Summary</h3>
            <ul className="list-disc list-inside text-white space-y-1">
              <li>Over 30 years of experience in cardiology</li>
              <li>Former Executive Director, Pakistan Institute of Medical Sciences (PIMS)</li>
              <li>Head of Cardiology Department, PIMS</li>
              <li>Served at leading hospitals in Pakistan and abroad</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Right: Details and gallery */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[#8080D7]/20 rounded-xl p-4"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#8080D7] border-l-4 border-[#8080D7] pl-3">Qualifications & Specializations</h3>
            <ul className="list-disc list-inside text-white space-y-1">
              <li>MBBS, FCPS (Cardiology)</li>
              <li>Specialist in Interventional Cardiology</li>
              <li>Expert in Echocardiography, ECG, and Cardiac Consultation</li>
              <li>Facility in Coronary Angiography and Intervention</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#8080D7]/20 rounded-xl p-4"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FF5733] border-l-4 border-[#FF5733] pl-3">Certifications & Affiliations</h3>
            <ul className="list-disc list-inside text-white space-y-1">
              <li>Fellow, College of Physicians and Surgeons Pakistan (CPSP)</li>
              <li>Member, Pakistan Cardiac Society</li>
              <li>Member, European Society of Cardiology</li>
              <li>Certified in Advanced Cardiac Life Support (ACLS)</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#8080D7] border-l-4 border-[#8080D7] pl-3">Gallery</h3>
            <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6">
              <img src={s2} alt="Professor Muhammad Naeem Malik" className="w-64 h-56 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105" />
              <img src={s3} alt="Professor Muhammad Naeem Malik" className="w-64 h-56 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 