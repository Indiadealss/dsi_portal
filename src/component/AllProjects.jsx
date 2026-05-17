import React, { useMemo, useState } from "react";
import {
  MapPin,
  IndianRupee,
  Building2,
  BedDouble,
  Heart,
  Construction,
} from "lucide-react";

const AllProjects = () => {
  const allProjects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Apartment",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Villa",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "+2"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Apartment",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
  ];

  const [filters, setFilters] = useState({
    location: "",
    budget: "",
    propertyType: "",
    bhk: "",
    status: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      budget: "",
      propertyType: "",
      bhk: "",
      status: "",
    });
  };

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      return (
        (!filters.location ||
          project.city === filters.location) &&
        (!filters.budget ||
          project.budget === filters.budget) &&
        (!filters.propertyType ||
          project.propertyType === filters.propertyType) &&
        (!filters.bhk || project.bhk === filters.bhk) &&
        (!filters.status ||
          project.status === filters.status)
      );
    });
  }, [filters]);

  return (
    <div className="px-[150px] px-4 py-6 bg-white mx-auto">

      {/* Heading */}
      <p className="text-2xl font-bold ">
        All INDIA PROJECTS
      </p>

      <p className="text-gray-500 mt-2">
        Explore premium residential projects across India.
      </p>

      {/* FILTER SECTION */}
      <div className="border border-gray-200 rounded-xl p-4 mt-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-2">
              <MapPin size={16} className="text-gray-400" />

              <select
                value={filters.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600 ml-2"
              >
                <option value="">All Location</option>
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Budget
            </label>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-2">
              <IndianRupee size={16} className="text-gray-400" />

              <select
                value={filters.budget}
                onChange={(e) =>
                  handleChange("budget", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600 ml-2"
              >
                <option value="">All Budget</option>
                <option value="1Cr">1 Cr</option>
                <option value="2Cr">2 Cr</option>
                <option value="3Cr">3 Cr</option>
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Property Type
            </label>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-2">
              <Building2 size={16} className="text-gray-400" />

              <select
                value={filters.propertyType}
                onChange={(e) =>
                  handleChange("propertyType", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600 ml-2"
              >
                <option value="">All Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>

          {/* BHK */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              BHK Type
            </label>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-2">
              <BedDouble size={16} className="text-gray-400" />

              <select
                value={filters.bhk}
                onChange={(e) =>
                  handleChange("bhk", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600 ml-2"
              >
                <option value="">All BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Status
            </label>

            <div className="border border-gray-300 rounded px-3 py-2 mt-2">
              <select
                value={filters.status}
                onChange={(e) =>
                  handleChange("status", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600"
              >
                <option value="">All Status</option>
                <option value="Ready To Move">
                  Ready To Move
                </option>
                <option value="Under Construction">
                  Under Construction
                </option>
                <option value="New Launch">
                  New Launch
                </option>
              </select>
            </div>
          </div>

          
        </div>
      </div>

      {/* COUNT */}
      <div className="mt-5 mb-4 text-gray-600">
        Showing {filteredProjects.length} Projects
      </div>

      {/* PROJECT LIST */}
      <div className="space-y-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#EEF5FB] border border-[#D4E4F3] rounded-2xl p-3"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr_220px] gap-5">

              {/* Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full lg:h-[230px] object-cover"
                />
              </div>

              {/* Content */}
              <div className="py-2">
                <h2 className="text-[22px] font-bold text-[#0F172A]">
                  {project.name}
                </h2>

                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <MapPin size={18} />
                  <p>{project.location}</p>
                </div>

                <h3 className="text-[#1E80E4] text-[28px] font-bold mt-5">
                  {project.price}
                </h3>

                <p className="text-gray-600 leading-7 mt-3">
                  {project.description}
                </p>

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

                <div
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium ${
                    project.status === "Ready To Move"
                      ? "border border-green-500 text-green-600 bg-green-50"
                      : "border border-yellow-500 text-yellow-600 bg-yellow-50"
                  }`}
                >
                  <Construction size={16} />
                  {project.status}
                </div>

                <button className="border border-[#1E80E4] text-[#1E80E4] rounded-lg px-10 py-2 text-[18px]">
                  View Details
                </button>

                <button className="flex items-center gap-2 text-[#1E80E4]">
                  <Heart size={18} />
                  save
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-xl">
            No Projects Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;