import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./component/Nevbar";
import Footer from "./component/Footer";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Layout = () => {
  const phoneNumber = "919818764200";
  const whatsappNumber = "919818764200";

  const location = useLocation();

    const page = location.pathname.split("/")[1]; // Get the first segment of the path
    const project = location.pathname.split("/")[2]; // Get the second segment of the path
    const propertyProject = location.pathname.split("/")[2]; // Get the second segment of the path
  console.log(page,'page is the',project);

  // 2. Define the paths where you want to hide the header/footer
  const hiddenPaths = ["/irish-platinum", "/eldeco-eoe","/ace-estate","/crc-maesta","/ashtech-presidential-towers", "/ace-acreville", "/ace-hanie"];
  const hideLayout = hiddenPaths.includes(location.pathname);

  const capitalizeWords = (str) =>
  str
    ?.replace(/[-_]/g, " ") // replace - or _ with space
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedProject = capitalizeWords(project);
const formattedPage = capitalizeWords(page);
let message = ''
  // condition
  if (
  page !== "" &&
  !project.toLowerCase().includes("ffid")
) {
   message =
  page === "property"
    ? `Hi I am interested in your property ${formattedProject}`
    : `Hi I am interested in **${formattedPage}**`;
  }else {
       message = ``;
  }
// encode for URL
const encodedMessage = encodeURIComponent(message);

  document.addEventListener("contextmenu", (e) => e.preventDefault());

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
          href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
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