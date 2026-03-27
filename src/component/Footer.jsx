import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import {
  FacebookFilled,
  LinkedinFilled,
  YoutubeFilled,
  PhoneOutlined,
  InstagramFilled
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#011638] text-white p-6 footerA  md:py-10">
      <div className="text-right">
        
      </div>
      {/* Top Section with Logo and Social */}
      <div className="container mx-auto border-b border-gray-700 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src="https://cdn.brandsdoor.in/indiadealss/indiadealss/1771509319781-brandsdoorlog.png" alt="..." width={200} />
          </a>
          <div className="">
            {/* <p><span className="pt-2 px-2 text-xl text-blue-600"><PhoneOutlined className="rotate-90" /></span><span className="font-medium text-xl ">+91 9818764200</span></p>
            <p className="flex"><span className="pt-2 text-blue-600 px-2 text-xl"><MdOutlineAttachEmail  /></span><span className="font-medium text-xl ">brandsdoor.in@gmail.com</span></p> */}
            </div>
          
        </div>
      </div>

      {/* Widgets Section */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Property Cities</h4>
          <ul className="space-y-2">
            <li><a href="/property/Noida-ffid" className="hover:text-gray-300">Noida</a></li>
            <li><a href="/property/Grater-Noida-ffid" className="hover:text-gray-300">Grater Noida</a></li>
            <li><a href="/property/Delhi-ffid" className="hover:text-gray-300">Delhi</a></li>
            <li><a href="/property/Gurgaon-ffid" className="hover:text-gray-300">Gurgaon</a></li>
            <li><a href="/property/Bangalore-ffid" className="hover:text-gray-300">Bangalore</a></li>
            <li><a href="/property/Mumbai-ffid" className="hover:text-gray-300">Mumbai</a></li>
          </ul>
        </div>
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Property Cities</h4>
          <ul className="space-y-2">
            <li><a href="/property/Pune-ffid" className="hover:text-gray-300">Pune</a></li>
            <li><a href="/property/Vrindavan-ffid" className="hover:text-gray-300">Vrindavan</a></li>
            <li><a href="/property/Mathura-ffid" className="hover:text-gray-300">Mathura</a></li>
            <li><a href="/property/Faridabad-ffid" className="hover:text-gray-300">Faridabad</a></li>
            <li><a href="/property/Moradabad-ffid" className="hover:text-gray-300">Moradabad</a></li>
          </ul>
        </div>
        {/* <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Commercials</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Partners</a></li>
            <li><a href="#!" className="hover:text-gray-300">Affiliates</a></li>
            <li><a href="#!" className="hover:text-gray-300">Collaborations</a></li>
            <li><a href="#!" className="hover:text-gray-300">Strategic Alliances</a></li>
          </ul>
        </div> */}
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Company</h4>
          <ul className="space-y-2">
            <li className="pt-1"><a href="" className="hover:text-gray-300"><Link to='/info/privacy'>Privacy Policy</Link></a></li>
          </ul>
          <ul className="space-y-2">
            <li className="pt-1"><a href="" className="hover:text-gray-300"><Link to='/info/terms-and-conditions'>Terms & Conditions</Link></a></li>
          </ul>
          
        </div>

        <div className="block lg:hidden">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Commercials</h4>
          <div className="flex text-center">
            <Link to='/info/privacy'>Privacy Policy</Link>
            <Link to='/info/terms-and-conditions'>Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-center ">Address</h4>
          <div className="">
            <p className="flex"><span className="text-lg pt-2 "><CiLocationOn /></span><span className="text-white text-lg ps-1  font-medium"> Registered Office:<br /> C-337 C , 3rd Floor, Block C, Golden I, Techzone 4, Grater Noida West,201304</span></p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-center text-xs gap-4">
        <div className="text-gray-400 text-center lg:text-left">
          © 2025. All Rights Reserved.
        </div>

        {/* Social Media */}
          <div className="flex gap-3 text-white text-lg">
            <a href="https://facebook.com/profile.php?id=61588169025866" target="_blank" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <FacebookFilled />
            </a>
            <a href="https://instagram.com/_brandsdoor_?igsh=OGVqeHVtNG1mbjMy" target="_blank" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <InstagramFilled />
            </a>
            <a href="https://linkedin.com/company/brandsdoor" target="_blank" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <LinkedinFilled />
            </a>
            <a href="https://youtube.com/@brandsdoor-f7v?si=6GZAbAPZfsNc85kE" target="_blank" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <YoutubeFilled />
            </a>
            
          </div>
      </div>
    </footer>
  );
}

export default Footer;
