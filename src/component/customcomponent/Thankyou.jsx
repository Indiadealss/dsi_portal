import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  YoutubeFilled,
  RedditCircleFilled,
  DribbbleCircleFilled,
} from "@ant-design/icons";

const Thankyou = () => {
  const navigate = useNavigate(); // ✅ Add this

  useEffect(() => {
  const timer = setTimeout(() => {
    navigate(-1);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        {/* Logo */}
        <div className="mb-6">
          <img
            src="https://cdn.brandsdoor.in/indiadealss/indiadealss/1771509319781-brandsdoorlog.png"
            alt="BRANDSDOOR"
            width={180}
            className="mx-auto"
          />
        </div>

        <h1 className="text-3xl font-bold mb-3">Thank You!</h1>

        <p className="text-gray-600 mb-6">
          Our team will connect with you soon.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition mb-6"
        >
          Back to Home
        </button>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-3 text-black text-lg">
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <FacebookFilled />
          </a>
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <TwitterOutlined />
          </a>
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <LinkedinFilled />
          </a>
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <YoutubeFilled />
          </a>
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <RedditCircleFilled />
          </a>
          <a href="#!" className="p-2 rounded-full bg-gray-200 hover:bg-black hover:text-white transition">
            <DribbbleCircleFilled />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Thankyou;