import Facebook from "../Images/Facebook.png";
import Instagram from "../Images/Instagram.png";
import Linkedin from "../Images/Linkedin.png";
import Youtube from "../Images/youtube.png";
import FooterImage from "../Images/FooterImage.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#001B33] overflow-hidden">
      
      {/* TOP CONTENT */}
      <div className="w-[-webkit-fill-available] mx-auto px-10 md:px-[135px]  pt-12 pb-30 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* ABOUT */}
          <div className="col-span-2">
            <p className="text-white font-semibold text-lg uppercase">
              ABOUT BRANDSDOOR
            </p>

            <p className="text-[#d8d8d8] text-xs leading-[1.6] mt-2 max-w-[300px] text-justify ">
              Brandsdoor is a leading real estate platform that empowers you
              to navigate real estate with ease.
              <br />
              We connect you with verified listings, genuine leads, and expert
              support to help you Buy, Sell and Invest in properties and real estate.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="text-white font-semibold text-lg">
              Quick Links
            </p>

            <div className="flex gap-1 mt-2">
              <ul className="space-y-1 text-[#d8d8d8] text-xs">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/buy'>Buy</Link></li>
                <li><Link to='/rent'>Rent</Link></li>
                <li><Link to='/'>Services</Link></li>
                <li><Link to='/'>Resources</Link></li>
              </ul>

            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-white font-semibold text-lg">
              Support
            </p>

            <ul className="space-y-1 mt-2 text-[#d8d8d8] text-xs">
              <li><Link to='/info/privacy'>Privacy Policy</Link></li>
              <li><Link to='/info/terms-and-conditions'>Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <p className="text-white font-semibold text-lg">
              Contact
            </p>

            <div className="mt-2 space-y-1 text-[#d8d8d8] text-xs">
              <p>+91 9818764200</p>
              <p>www.brandsdoor.in</p>
            </div>

           
          </div>

          {/* social   */}
           <div >
              <p className="text-white font-semibold text-lg">
                Follow us
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://facebook.com/profile.php?id=61588169025866" target="_blank" ><img src={Facebook} alt="Facebook" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://instagram.com/_brandsdoor_?igsh=OGVqeHVtNG1mbjMy" target="_blank" ><img src={Instagram} alt="Instagram" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://linkedin.com/company/brandsdoor" target="_blank" ><img src={Linkedin} alt="Linkedin" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://youtube.com/@brandsdoor-f7v?si=6GZAbAPZfsNc85kE" target="_blank" ><img src={Youtube} alt="Youtube" /></a>
                </div>
              </div>
            </div>
          
        </div>

        {/* LINE */}
        <div className="border-t border-white mt-10 pt-2 flex items-center justify-between relative z-10">
          <p className="text-[#d8d8d8] text-[10px]">
            © 2025. All Rights Reserved.
          </p>

          <p className="text-[#d8d8d8] text-[10px]">
            Made with ❤️ Brandsdoor
          </p>
        </div>
      </div>

      {/* BUILDINGS */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <img
          src={FooterImage}
          alt="Footer Buildings"
          className="w-[1300px] h-auto object-cover mx-auto"
        />
      </div>
    </footer>
  );
}