import React from "react";
import logo from "../Images/logo.png";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  YoutubeFilled,
  RedditCircleFilled,
  DribbbleCircleFilled,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-[#011638] text-white p-6 footerA  md:py-10">
      {/* Top Section with Logo and Social */}
      <div className="container mx-auto border-b border-gray-700 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="..." width={150} />
          </a>

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
      </div>

      {/* Widgets Section */}
      <div className="container mx-auto py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="mb-3 font-semibold">Land/Plots</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Accessibility Statement</a></li>
            <li><a href="#!" className="hover:text-gray-300">ADA Compliance</a></li>
            <li><a href="#!" className="hover:text-gray-300">Assistive Technologies</a></li>
            <li><a href="#!" className="hover:text-gray-300">Accessibility Resources</a></li>
            <li><a href="#!" className="hover:text-gray-300">Accessibility Standards</a></li>
            <li><a href="#!" className="hover:text-gray-300">Design Guidelines</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Home</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Shop Now</a></li>
            <li><a href="#!" className="hover:text-gray-300">Product Categories</a></li>
            <li><a href="#!" className="hover:text-gray-300">Special Offers</a></li>
            <li><a href="#!" className="hover:text-gray-300">New Releases</a></li>
            <li><a href="#!" className="hover:text-gray-300">Exclusive Deals</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Commercials</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Partners</a></li>
            <li><a href="#!" className="hover:text-gray-300">Affiliates</a></li>
            <li><a href="#!" className="hover:text-gray-300">Collaborations</a></li>
            <li><a href="#!" className="hover:text-gray-300">Strategic Alliances</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Insights</h4>
          <ul className="space-y-2">
            <li><a href="#!" className="hover:text-gray-300">Contributions</a></li>
            <li><a href="#!" className="hover:text-gray-300">Community Engagement</a></li>
            <li><a href="#!" className="hover:text-gray-300">Donate</a></li>
            <li><a href="#!" className="hover:text-gray-300">Volunteer Opportunities</a></li>
            <li><a href="#!" className="hover:text-gray-300">Local Initiatives</a></li>
            <li><a href="#!" className="hover:text-gray-300">Community Partnerships</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-center text-xs gap-4">
        <div className="text-gray-400 text-center lg:text-left">
          © 2025. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
