import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./component/Nevbar";
import Footer from "./component/Footer";
import MessageOwnerPanel from "./component/MessageOwnerPanel";
import { FaPhoneAlt, FaWhatsapp, FaCommentDots } from "react-icons/fa";

const Layout = () => {
  const phoneNumber = " 9818763100";
  const whatsappNumber = " 9818763100";

  const location = useLocation();
  const currentListing = useSelector((state) => state.propertyid.data);
  const isListingDetailPage =
    location.pathname.includes("spid") || location.pathname.includes("npxid");

    const page = location.pathname.split("/")[1]; // Get the first segment of the path
    const project = location.pathname.split("/")[2]; // Get the second segment of the path
    const propertyProject = location.pathname.split("/")[2]; // Get the second segment of the path
  console.log(page,'page is the',project);

  // 2. Define the paths where you want to hide the header/footer
  const hiddenPaths = ["/irish-platinum", "/eldeco-eoe","/ace-estate","/crc-maesta","/ashtech-presidential-towers", "/ace-acreville", "/ace-hanei","/sobha-rivana", "/irish-eta-1-greater-noida"];
  const hideLayout = hiddenPaths.includes(location.pathname);

  // The dashboard has its own Help & Support / Contact Support entry points,
  // so the site-wide floating Call/WhatsApp widget just overlaps its content.
  const hideFloatingContact = location.pathname === "/myDashboard";

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
  if (page === "property" && project) {
    message = `Hi I am interested in your property ${formattedProject}`;
  }
  if (
  page !== "" &&
  project &&
  !project.toLowerCase().includes("ffid")
) {
   message =
  page === "property"
    ? `Hi I am interested in your property ${formattedProject}`
    : `Hi I am interested in **${formattedPage}**`;
  }else {
       message =
  page === "property"
    ? `Hi I am interested in your property ${formattedProject}`
    : `Hi I am interested in **${formattedPage}**`;
  }
// encode for URL
const encodedMessage = encodeURIComponent(message);

  // document.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
     {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}

      {/* Floating Buttons */}
      {!hideFloatingContact && (
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

          {/* Message Button — only on property/project detail pages, once owner data has loaded */}
          {isListingDetailPage && currentListing?.owner?._id && (
            <MessageOwnerPanel
              propertyId={currentListing._id}
              ownerId={currentListing.owner._id}
              ownerName={currentListing.owner.name}
              propertyLabel={currentListing.projectname}
              className="group flex items-center gap-2 bg-[#0D6EFD] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <FaCommentDots size={20} className="text-white" />
              <span className="hidden md:inline text-sm font-medium text-white">
                Message
              </span>
            </MessageOwnerPanel>
          )}

        </div>
      )}
    </>
  );
};

export default Layout;