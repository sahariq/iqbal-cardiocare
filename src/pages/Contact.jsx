import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const CONTACT = {
  address: 'Iqbal Cardiocare, Times Square Plaza, G-8 Markaz, Islamabad, Pakistan',
  phone: '03335195321',
  whatsapp: '03335195321',
  email: 'drnaeempims@gmail.com',
  hours: 'Mon - Sat: 5:00 PM - 8:00 PM',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.39307328963!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df951b2e2e2e2e%3A0x123456789abcdef!2sG-8%20Markaz%2C%20Islamabad!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s'
};

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: '#000D3A' }}>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#8080D7' }}>Contact Us</h1>
        <div className="mb-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 text-[#8080D7]">
              <FaMapMarkerAlt />
              <span className="font-semibold">Address:</span>
            </div>
            <div className="text-gray-700 mb-4 ml-7">{CONTACT.address}</div>
            <div className="flex items-center gap-3 text-[#8080D7]">
              <FaPhoneAlt />
              <span className="font-semibold">Phone:</span>
            </div>
            <a href={`tel:${CONTACT.phone}`} className="ml-7 text-[#FF5733] font-semibold block">{CONTACT.phone}</a>
            <div className="flex items-center gap-3 text-[#8080D7]">
              <FaWhatsapp />
              <span className="font-semibold">WhatsApp:</span>
            </div>
            <a href={`https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="ml-7 inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full font-semibold shadow hover:bg-[#1ebe57] transition-colors">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
            <div className="flex items-center gap-3 text-[#8080D7] mt-4">
              <FaEnvelope />
              <span className="font-semibold">Email:</span>
            </div>
            <a href={`mailto:${CONTACT.email}`} className="ml-7 text-[#8080D7] font-semibold block">{CONTACT.email}</a>
            <div className="flex items-center gap-3 text-[#8080D7] mt-4">
              <FaClock />
              <span className="font-semibold">Working Hours:</span>
            </div>
            <div className="ml-7 text-gray-700">{CONTACT.hours}</div>
          </div>
          <div className="flex-1 min-w-[250px]">
            <iframe
              src={CONTACT.mapEmbed}
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Iqbal Cardiocare Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 