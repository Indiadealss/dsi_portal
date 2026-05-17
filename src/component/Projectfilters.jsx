import React, { useState } from "react";
import { MapPin, IndianRupee, Building2, BedDouble } from "lucide-react";

const Projectfilters = () => {
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

  return (
    <div className="w-full px-4 py-6 bg-white">
      
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        Home › All Projects › Residential
      </p>

      {/* Heading */}
      <h1 className="text-sm font-bold text-slate-900 mt-3">
        ALL INDIA PROJECTS
      </h1>

      <p className="text-gray-500 mt-2 leading-6">
        Explore 1000+ premium residential projects across India.
        <br />
        Find your perfect home for verified listings.
      </p>

      {/* Filter Box */}
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
                <option value="50L">Below 50L</option>
                <option value="1Cr">50L - 1Cr</option>
                <option value="2Cr">1Cr - 2Cr</option>
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
                <option value="">Residential</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
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
                onChange={(e) => handleChange("bhk", e.target.value)}
                className="w-full outline-none bg-transparent text-gray-600 ml-2"
              >
                <option value="">All BHK</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Project Status
            </label>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-2">
              <select
                value={filters.status}
                onChange={(e) =>
                  handleChange("status", e.target.value)
                }
                className="w-full outline-none bg-transparent text-gray-600"
              >
                <option value="">All Status</option>
                <option value="Ready">Ready To Move</option>
                <option value="Under">Under Construction</option>
                <option value="New">New Launch</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-3">
            
            <button
              onClick={resetFilters}
              className="border border-blue-500 text-blue-500 px-5 py-2 rounded w-full"
            >
              Reset
            </button>

            <button className="bg-blue-500 text-white px-5 py-2 rounded w-full">
              Apply Filters
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
        
        <p className="text-gray-600">
          Showing 1-12 of 1000+ Projects
        </p>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort By:</span>

          <select className="border border-gray-300 rounded px-4 py-2 outline-none">
            <option>Recommended</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Projectfilters;