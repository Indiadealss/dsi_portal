import { Outlet } from "react-router-dom";
import Navbar from "./component/Nevbar";
import Footer from "./component/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Layout = () => {
  const phoneNumber = "919818752056"; 
  const whatsappNumber = "919818752056";

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        
        {/* Call Button */}
        <a
          href={`tel:+${phoneNumber}`}
          className="bg-[#011638] text-white p-3 rounded-full shadow-lg cursor-pointer transition"
        >
          <FaPhoneAlt size={20} />
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <FaWhatsapp size={22} />
        </a>

      </div>
    </>
  );
};

export default Layout;