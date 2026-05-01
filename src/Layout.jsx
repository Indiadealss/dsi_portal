import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./component/Nevbar";
import Footer from "./component/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Layout = () => {
  const phoneNumber = "919818764200";
  const whatsappNumber = "919818764200";

  const location = useLocation();

  // 2. Define the paths where you want to hide the header/footer
  const hideLayout = location.pathname === "/irish";

  return (
    <>
     {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-4 flex flex-col gap-3 z-50">

        {/* Call Button */}
        <a
          href={`tel:+${phoneNumber}`}
          className="group flex items-center gap-2 bg-[#011638] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          <FaPhoneAlt size={18} className="text-white" />
          <span className="hidden md:inline text-sm font-medium text-white">
            Call Now
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hi%20I%20am%20interested%20in%20your%20property`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          <FaWhatsapp size={20} />
          <span className="hidden md:inline text-sm font-medium">
            WhatsApp
          </span>
        </a>

      </div>
    </>
  );
};

export default Layout;