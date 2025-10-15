import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  YoutubeFilled,
  RedditCircleFilled,
  DribbbleCircleFilled,
  PhoneOutlined
} from "@ant-design/icons";

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
            <img src={'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/newLogo.png'} alt="..." width={150} />
          </a>
          <div className="">
            <p><span className="pt-2 px-2 text-xl text-blue-600"><PhoneOutlined className="rotate-90" /></span><span className="font-medium text-xl ">+91 9818763100</span></p>
            <p className="flex"><span className="pt-2 text-blue-600 px-2 text-xl"><MdOutlineAttachEmail  /></span><span className="font-medium text-xl ">info@indiadealss.com</span></p>
            </div>
          
        </div>
      </div>

      {/* Widgets Section */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Land/Plots</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Accessibility Statement</a></li>
            <li><a href="#!" className="hover:text-gray-300">ADA Compliance</a></li>
            <li><a href="#!" className="hover:text-gray-300">Assistive Technologies</a></li>
            <li><a href="#!" className="hover:text-gray-300">Accessibility Resources</a></li>
            <li><a href="#!" className="hover:text-gray-300">Accessibility Standards</a></li>
            <li><a href="#!" className="hover:text-gray-300">Design Guidelines</a></li>
          </ul>
        </div>
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Home</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Shop Now</a></li>
            <li><a href="#!" className="hover:text-gray-300">Product Categories</a></li>
            <li><a href="#!" className="hover:text-gray-300">Special Offers</a></li>
            <li><a href="#!" className="hover:text-gray-300">New Releases</a></li>
            <li><a href="#!" className="hover:text-gray-300">Exclusive Deals</a></li>
          </ul>
        </div>
        <div className="mx-auto hidden lg:block">
          <h4 className="mb-3 font-semibold text-center lg:text-start">Commercials</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Partners</a></li>
            <li><a href="#!" className="hover:text-gray-300">Affiliates</a></li>
            <li><a href="#!" className="hover:text-gray-300">Collaborations</a></li>
            <li><a href="#!" className="hover:text-gray-300">Strategic Alliances</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-center ">Address</h4>
          <div className="">
            <p className="flex"><span className="text-lg pt-2 "><CiLocationOn /></span><span className="text-white text-lg ps-1  font-medium">Rise shoplex SF-30, and 31 second floor ,Sector Techzone 4,Grater Noida West 201306</span></p>
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
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <FacebookFilled />
            </a>
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <TwitterOutlined />
            </a>
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <LinkedinFilled />
            </a>
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <YoutubeFilled />
            </a>
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <RedditCircleFilled />
            </a>
            <a href="#!" className="p-2 rounded-full border border-white hover:bg-white hover:text-black transition">
              <DribbbleCircleFilled />
            </a>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
