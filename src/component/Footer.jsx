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
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* ABOUT */}
         

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
              <p>+91 9818763100</p>
              <p>www.indiadealsgroup.com</p>
            </div>

           
          </div>

          {/* social   */}
           <div >
              <p className="text-white font-semibold text-lg">
                Follow us
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://www.facebook.com/people/Indiadeals/61587222626520" target="_blank" ><img src={Facebook} alt="Facebook" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://www.instagram.com/indiadeals_official?igsh=eGEwc2x0enJtaWk0" target="_blank" ><img src={Instagram} alt="Instagram" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://www.linkedin.com/company/indiadeals-official/" target="_blank" ><img src={Linkedin} alt="Linkedin" /></a>
                </div>

                <div className="w-18 h-10   rounded-md flex items-center justify-center">
                  <a href="https://www.youtube.com/@indiadealss" target="_blank" ><img src={Youtube} alt="Youtube" /></a>
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
            Made with ❤️ Indiadeals group
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