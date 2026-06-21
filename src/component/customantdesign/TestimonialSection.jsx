import React, { useState } from "react";
import { Star } from "lucide-react";

import jp from "../../Images/jpDubay.jpg";
import priya from "../../Images/Priya.jpg";
import rahul from "../../Images/RAHUL.jpg";
import person4 from "../../Images/projectPhoto.jpg";

import projectImg from "../../Images/projectPhoto.jpg";

const testimonials = [
  {
    id: 1,
    name: "JP DUBEY",
    role: "CEO, HOUSE HUSBAND",
    image: jp,
    review:
      "I had Brought plot with INDIADEALSGROUP in ACE it was such a beautiful moment for me the service was amazing and the facility that they are providing i dont know is there anyone that are providing that such service in the market.",
    rating: 4,
    project:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "RAHUL SHARMA",
    role: "BUSINESSMAN",
    image: rahul,
    review:
      "Indiadealsgroup helped me find the perfect property with complete transparency.",
    rating: 5,
    project:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "PRIYA VERMA",
    role: "INTERIOR DESIGNER",
    image: priya,
    review:
      "Very professional team and excellent customer support.",
    rating: 4,
    project:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  return (
    <div className="w-full    justify-center px-4 mt-[100px]">
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mx-auto">
        
        {/* LEFT IMAGES */}
        <div className="w-[-webkit-fill-available] md:w-[190px] bg-white rounded-2xl shadow-md p-2 flex flex-row md:flex-col gap-[2px]">
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer
                transition-all duration-500 ease-in-out
                ${
                  isActive
                    ? "md:h-[-webkit-fill-available] md:h-[190px] scale-100 opacity-100 w-[1135px] md:w-[151px] mx-auto"
                    : "h-[-webkit-fill-available] md:h-[90px] scale-90 opacity-50"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-7">
          
          {/* NAME */}
          <h2 className="heading-h2 font-extrabold leading-none text-[#001B38] uppercase transition-all duration-500">
            {active.name}
          </h2>

          {/* ROLE */}
          <p className="text-[#001B38] font-semibold mt-2 uppercase">
            {active.role}
          </p>

          {/* REVIEW */}
          <p className="text-gray-500 leading-relaxed mt-5 max-w-3xl transition-all duration-500">
            {active.review}
          </p>

          {/* BOTTOM */}
          <div className="flex items-end justify-between mt-10">
            
            {/* PROJECT CARD */}
            <div className="relative w-[210px] h-[145px] rounded-xl overflow-hidden">
              <img
                src={active.project}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-2 left-2 right-2 bg-[#2F80ED] text-white text-center py-1 rounded-md font-semibold text-sm">
                ACE 153
              </div>
            </div>

            {/* STARS */}
           
          </div>
          <div className="block mt-5 md:mt-0 md:flex items-center gap-3 w-full">
          <div className="flex-1 border-t border-dashed border-gray-400 "></div>
           <div className="flex justify-center md:items-center gap-1 ">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= active.rating
                      ? "fill-[#2F80ED] text-[#2F80ED]"
                      : "fill-gray-300 text-gray-300"
                  }
                />
              ))}
            </div>
            </div>
        </div>
      </div>

      <div className=" mx-auto my-[100px]">
          {/* Decorative Circle */}

          <h3 className="md:text-center heading-h3 font-bold text-[#001B38] uppercase ">
            READY TO FIND YOUR PERFECT PROPERTY?
          </h3>
          <p className="text-sm font-medium text-gray-500 mt-2  text-center">
            <span className="">
              Explore verified listings, connect with trusted experts, and take the next step towords. <br/> Your dream property today.
            </span>
          </p>
          <div className="mx-auto flex justify-between w-[max-content]">
            <button className=" bg-[#2F80ED] cursor-pointer text-white px-6 py-1 rounded-md font-semibold hover:bg-[#2F80ED]/90 transition-colors duration-300 uppercase mt-5">
              contact now
            </button>
          </div>
      </div>
    </div>
  );
}