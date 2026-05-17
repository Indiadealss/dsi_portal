import React from "react";
import {
  MapPin,
  Heart,
  ArrowRight,
  Construction,
} from "lucide-react";

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      price: "3.25 -3.55 CR",
      description:
        "Premium residential plot project with world-class amenities and excellent connectivity at Yamuna express way.",
      status: "Ready to Move",
      statusColor: "green",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      price: "3.25 -3.55 CR",
      description:
        "Premium residential plot project with world-class amenities and excellent connectivity at Yamuna express way.",
      status: "Under Construction",
      statusColor: "yellow",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      price: "3.25 -3.55 CR",
      description:
        "Premium residential plot project with world-class amenities and excellent connectivity at Yamuna express way.",
      status: "Under Construction",
      statusColor: "yellow",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
  ];

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#EEF5FB] border border-[#D4E4F3] rounded-2xl p-3"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr_220px] gap-5">
            
            {/* Left Image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover lg:h-[230px]"
              />
            </div>

            {/* Middle Content */}
            <div className="py-2">
              <h2 className="text-[18px] font-bold text-[#0F172A]">
                {project.name}
              </h2>

              {/* Location */}
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <MapPin size={18} />
                <p className="text-[15px]">{project.location}</p>
              </div>

              {/* Price */}
              <h3 className="text-[#1E80E4] text-[18px] font-bold mt-5">
                {project.price}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[15px] leading-7 mt-3 max-w-[650px]">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 mt-6">
                {project.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="border border-[#1E80E4] text-[#1E80E4] text-sm px-5 py-[6px] rounded-lg"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="border-l border-[#C8DDF0] flex flex-col justify-between items-center py-6">
              
              {/* Status */}
              <div
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium ${
                  project.statusColor === "green"
                    ? "border border-green-500 text-green-600 bg-green-50"
                    : "border border-yellow-500 text-yellow-600 bg-yellow-50"
                }`}
              >
                <Construction size={16} />
                {project.status}
              </div>

              {/* View Button */}
              <button className="border border-[#1E80E4] text-[#1E80E4] rounded-lg px-10 py-2 text-[18px] hover:bg-[#1E80E4] hover:text-white transition-all">
                View Details
              </button>

              {/* Save */}
              <button className="flex items-center gap-2 text-[#1E80E4] text-lg">
                <Heart size={18} />
                save
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;