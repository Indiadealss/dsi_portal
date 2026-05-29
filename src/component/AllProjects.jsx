import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  IndianRupee,
  Building2,
  BedDouble,
  Heart,
  Construction,
} from "lucide-react";
import apps from '../Images/apps.png';
import precision_manufacturing from '../Images/precision_manufacturing.png';
import readyToMove from '../Images/readyToMove.png';
import new_launch from '../Images/rocket_launch.svg';
import refresh from '../Images/refresh.svg';
import { getAlltyprojects, searchaddress } from "../api/api";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";

const AllProjects = () => {

  const [sortBy, setSortBy] = useState("Recommended");
  const [projectsPerPage, setProjectsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  // const projectsPerPage = 5;

  const location = useLocation();

  console.log(location);


  useEffect(() => {

    const savedLocation =
      localStorage.getItem("userLocation");

    const currentLocation =
      location.pathname
        .replace(/^\/+/, "")
        .replace("-pidd", "")
        .trim();

    console.log(currentLocation);

    if (
      savedLocation &&
      (!currentLocation || currentLocation === "")
    ) {

      setSearch(savedLocation);

      setFilters((prev) => ({
        ...prev,
        location: savedLocation,
      }));

    } else {

      setSearch(currentLocation);

      setFilters((prev) => ({
        ...prev,
        location: currentLocation,
      }));
    }

  }, []);

  const getLocation = async (value) => {
    if (value.length >= 2) {
      try {
        const res = await searchaddress(value);

        if (res.status === 200) {
          setLocations(res.data.results || []);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setLocations([]);
    }
  };


  const allProjectsl = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
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
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
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
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
    },
    {
      id: 16,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
      bhk: "2BHK",
      status: "New Launch",
      price: "2.25 - 2.55 CR",
      description:
        "Modern homes with green landscape and smart amenities.",
      tags: ["Park Facing", "Premium", "Semi", "+2"],
    },
    {
      id: 17,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "CRC Maesta",
      city: "Noida",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "3Cr",
      propertyType: "Residential",
      bhk: "3BHK",
      status: "Ready To Move",
      price: "3.25 - 3.55 CR",
      description:
        "Premium residential plot project with world-class amenities.",
      tags: ["North-East", "Premium", "Full", "+2"],
    },
    {
      id: 18,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200",
      name: "MAX Square",
      city: "Delhi",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "1Cr",
      propertyType: "Residential",
      bhk: "4BHK",
      status: "Under Construction",
      price: "1.25 - 1.55 CR",
      description:
        "Luxury commercial property with premium infrastructure.",
      tags: ["Luxury", "Corner", "Full", "Luxury", "Corner", "Full",],
    },
    {
      id: 19,
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
      name: "ACE Terra",
      city: "Gurgaon",
      location:
        "Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh",
      budget: "2Cr",
      propertyType: "Residential",
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
    budget: {
      min: 0,
      max: 100,
    },
    propertyType: "",
    bhk: "",
    size: {
      from: 0,
      to: 10000,
    },
    status: "",
  });

  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);

  const handleChange = (field, value) => {
    setCurrentPage(1);

    setFilters((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      // If Property Type is set to "All Type", hide BHK and reset BHK filter
      if (field === "propertyType" && value === "") {
        next.bhk = "";
      }

      return next;
    });
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      budget: {
        min: 0,
        max: 100,
      },
      propertyType: "",
      bhk: "",
      size: {
        from: 0,
        to: 10000,
      },
      status: "",
    });
  };

  const filteredProjects = useMemo(() => {

    let projects = [...allProjects];

    // BHK FILTER (Frontend)
    if (filters.bhk) {
      projects = projects.filter((item) =>
        item.bhk?.some(
          (bhk) =>
            bhk.toLowerCase().replace(/\s/g, "") ===
            filters.bhk.toLowerCase().replace(/\s/g, "")
        )
      );
    }

    // BUDGET FILTER (Frontend)
    projects = projects.filter((item) => {

      const numericBudget =
        Number(
          item.price
            ?.split("-")[0]
            ?.replace(/[^0-9.]/g, "")
        ) || 0;

      return (
        numericBudget >= filters.budget.min &&
        numericBudget <= filters.budget.max
      );
    });

    // SORTING
    if (sortBy === "Price: Low to High") {
      projects.sort((a, b) => {

        const priceA =
          Number(
            a.price
              ?.split("-")[0]
              ?.replace(/[^0-9.]/g, "")
          ) || 0;

        const priceB =
          Number(
            b.price
              ?.split("-")[0]
              ?.replace(/[^0-9.]/g, "")
          ) || 0;

        return priceA - priceB;
      });
    }

    if (sortBy === "Price: High to Low") {
      projects.sort((a, b) => {

        const priceA =
          Number(
            a.price
              ?.split("-")[0]
              ?.replace(/[^0-9.]/g, "")
          ) || 0;

        const priceB =
          Number(
            b.price
              ?.split("-")[0]
              ?.replace(/[^0-9.]/g, "")
          ) || 0;

        return priceB - priceA;
      });
    }

    // SORT STATUS
    if (sortBy === "Ready To Move") {
      projects = projects.filter(
        (item) =>
          item.status === "Ready To Move"
      );
    }

    if (sortBy === "Under Construction") {
      projects = projects.filter(
        (item) =>
          item.status === "Under Construction"
      );
    }

    return projects;

  }, [
    allProjects,
    filters.bhk,
    filters.budget,
    sortBy,
  ]);


  const currentProjects = filteredProjects;
  const totalPages = pagination?.totalPages || 1;




  useEffect(() => {

    fetchProjects();

  }, [
    currentPage,
    projectsPerPage,
    filters.location,
    filters.propertyType,
    filters.status,
  ]);

  const fetchProjects = async () => {

    try {

      setLoading(true);

      const res = await getAlltyprojects(
        currentPage,
        projectsPerPage,
        filters.location,
        filters.propertyType || "",
        filters.status || "All"
      );

      console.log(res.data, "API RESPONSE");

      const allProjects = res.data.data.map((item) => ({
        id: item.npxid,
        image: item.images?.find((img) => img.type === "cover")?.src ||
          item.images?.[0]?.src || "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200",
        name: item.projectname,
        city: item.location?.[0]?.City || "",
        location: item.location?.[0]?.Address || "",
        budget: item.price,
        propertyType: item.property || "",
        bhk: item.propertyType || [],
        status: item.availabestatus,
        price: item.price,
        description: item.description,
        tags: ["North-East", "Premium", "Full", "+2"],

      }));

      setAllProjects(allProjects);
      // setProjects(res?.data?.data || []);

      setPagination(
        res?.data?.pagination || {}
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  if (loading) {
    return <div>
      loading....
    </div>
  }
  return (
    <div className="px-[4vw] lg:px-[8vw]  py-6 bg-white mx-auto">

      <p className="text-sm text-gray-500">
        Home › All Projects › Residential
      </p>

      {/* Heading */}
      <h1 className=" mt-3">
        <span className="text-3xl lg:text-5xl font-bold text-slate-900">ALL INDIA PROJECTS</span>
      </h1>

      <p className="text-gray-500 text-xs font-medium leading-4">
        Explore 1000+ premium residential projects across India.
        <br />
        Find your perfect home for verified listings.
      </p>

      {/* FILTER SECTION */}
      <div className="border-0 lg:border lg:border-gray-200 rounded-xl p-4 mt-6 bg-white">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex gap-4 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2">

            {/* Location */}
            <div className="relative">

              <label className="hidden lg:block text-sm font-medium text-gray-700">
                Location
              </label>

              <div className="flex items-center border border-gray-300 rounded w-[180px] h-[31px] mt-1 px-2">

                <MapPin size={16} className="text-gray-400 mr-2" />

                <input
                  type="text"
                  placeholder="Search Location"
                  value={search}
                  onChange={(e) => {
                    getLocation(e.target.value);
                    setSearch(e.target.value);
                  }}
                  className="w-full outline-none bg-transparent text-gray-600 text-[11px]"
                />

              </div>

              {/* Dropdown */}
              {locations.length > 0 && (
                <div className="absolute top-[65px] left-0 w-full bg-white border border-gray-200 rounded shadow-lg z-50 max-h-[250px] overflow-y-auto">

                  {locations.map((item) => (
                    <div
                      key={item.place_id}
                      onClick={() => {
                        setSearch(item.city);

                        handleChange("location", item.city);

                        setLocations([]);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                    >
                      <p className="text-sm font-medium">
                        {item.city}
                      </p>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Budget */}

            {/* Budget */}
            <div className="relative z-40">
              <label className="hidden lg:block text-sm font-medium text-gray-700">
                Budget
              </label>

              {/* Trigger */}
              <div
                onClick={() =>
                  setShowBudgetDropdown(!showBudgetDropdown)
                }
                className="flex items-center justify-between border border-gray-300 rounded w-[150px] h-[31px] mt-1 px-3 cursor-pointer bg-white"
              >
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-gray-400" />

                  <span className="text-[12px] text-gray-600">
                    {filters.budget.min} Cr - {filters.budget.max} Cr
                  </span>
                </div>

                <span className="text-gray-800 text-sm"><IoIosArrowDown /></span>
              </div>

              {/* Dropdown */}
              {showBudgetDropdown && (
                <div className="absolute top-[50px] left-0 w-[320px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-[9999]">

                  {/* Inputs */}
                  <div className="flex gap-3 mb-5">

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        Min Budget
                      </p>

                      <input
                        type="number"
                        value={filters.budget.min}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            budget: {
                              ...prev.budget,
                              min: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        Max Budget
                      </p>

                      <input
                        type="number"
                        value={filters.budget.max}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            budget: {
                              ...prev.budget,
                              max: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="relative h-10">

                    {/* Min Slider */}
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={filters.budget.min}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            min: Math.min(
                              Number(e.target.value),
                              prev.budget.max - 0.5
                            ),
                          },
                        }))
                      }
                      className="absolute w-full accent-blue-500"
                    />

                    {/* Max Slider */}
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={filters.budget.max}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            max: Math.max(
                              Number(e.target.value),
                              prev.budget.min + 0.5
                            ),
                          },
                        }))
                      }
                      className="absolute w-full accent-blue-500"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between mt-6 gap-3">

                    <button
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          budget: {
                            min: 1,
                            max: 5,
                          },
                        }));
                      }}
                      className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg text-sm"
                    >
                      Reset
                    </button>

                    <button
                      onClick={() =>
                        setShowBudgetDropdown(false)
                      }
                      className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div>
              <label className="hidden lg:block text-sm font-medium text-gray-700">
                Property Type
              </label>

              <div className="flex items-center border border-gray-300 rounded w-[130px] h-[31px] mt-1 p-[7.8px]">
                <Building2 size={16} className="text-gray-400" />

                <select
                  value={filters.propertyType}
                  onChange={(e) =>
                    handleChange("propertyType", e.target.value)
                  }
                  className="w-full outline-none bg-transparent text-gray-600  text-[11px]"
                >
                  <option value="">All Type</option>
                  <option value="residential">Residental</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* BHK (hide for commercial) */}
            {filters.propertyType !== "" && filters.propertyType !== "commercial" && (
              <div>
                <label className="hidden lg:block text-sm font-medium text-gray-700">
                  BHK Type
                </label>

                <div className="flex items-center border border-gray-300 rounded w-[130px] h-[31px] mt-1 p-[7.8px]">
                  <BedDouble size={16} className="text-gray-400" />

                  <select
                    value={filters.bhk}
                    onChange={(e) =>
                      handleChange("bhk", e.target.value)
                    }
                    className="w-full outline-none bg-transparent text-gray-600 ml-1 text-[11px] "
                  >
                    <option value="">All BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                  </select>
                </div>
              </div>
            )}

            {/* Size From-To (only for commercial) */}
            {/* Size Filter */}


            {/* Status */}
            <div>
              <label className="hidden lg:block text-sm font-medium text-gray-700">
                Status
              </label>

              <div className="flex items-center border border-gray-300 rounded w-[130px] h-[31px] mt-1 p-[7.8px]">
                <img src={apps} alt="brandsdoor" />
                <select
                  value={filters.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value)
                  }
                  className="w-full outline-none bg-transparent text-gray-600 ml-1 text-[11px]"
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


          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2  gap-[15px]">
            {/* Buttons */}

            <button
              onClick={resetFilters}
              className=" cursor-pointer border border-blue-500 text-blue-500 w-[130px] h-[30px] p-0 mt-auto rounded flex justify-center items-center  px-auto"
            >
              <img src={refresh} alt="reset" className="w-[20px] h-[20px]  pe-1" />
              Reset
            </button>

            <button className="bg-blue-500 text-white  rounded w-[130px] h-[30px] p-0 mt-auto cursor-pointer">
              Apply
            </button>



          </div>
        </div>
      </div>

      {/* COUNT */}
      <div className="hidden lg:flex justify-between items-center my-2">
        <div className=" text-gray-600">
          Showing {((currentPage - 1) * projectsPerPage) + 1}
          -
          {Math.min(
            currentPage * projectsPerPage,
            pagination?.totalProjects || 0
          )}
          of {pagination?.totalProjects || 0} Projects
        </div>

        {/* SORT */}
        <div className=" flex items-center gap-3">
          <p className="text-sm text-gray-600 font-medium">
            Sort By:
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-[#D4E4F3] rounded-lg px-3 py-1 text-sm outline-none bg-white text-gray-700"
          >
            <option value="Recommended">Recommended</option>
            <option value="Price: Low to High">
              Price: Low to High
            </option>
            <option value="Price: High to Low">
              Price: High to Low
            </option>
            <option value="Ready To Move">
              Ready To Move
            </option>
            <option value="Under Construction">
              Under Construction
            </option>
          </select>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="shadow-md p-2 rounded-xl border border-[#D4E4F3]">
        <div className="space-y-5">
          {currentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#E8F5FF] border border-[#D4E4F3] rounded-xl p-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[400px_1.5fr_260px] gap-5 h-auto lg:h-[200px]">

                {/* Image */}
                <div className="overflow-hidden rounded-lg h-auto lg:h-[200px] lg:w-[400px] relative">


                  {/* Mobile Status */}
                  <div
                    className={`absolute top-3 right-3 flex lg:hidden items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-medium z-10 ${project.status === "Ready To Move"
                      ? "border border-green-500 text-green-600 bg-green-50"
                      : project.status === "Under Construction"
                        ? "border border-yellow-500 text-yellow-600 bg-yellow-50"
                        : "border border-amber-500 text-amber-600 bg-amber-50"
                      }`}
                  >
                    <img
                      src={
                        project.status === "Ready To Move"
                          ? readyToMove
                          : project.status === "Under Construction"
                            ? precision_manufacturing
                            : new_launch
                      }
                      alt={project.status}
                      className="w-3 h-3"
                    />

                    <span>{project.status}</span>
                  </div>

                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full  object-cover h-auto lg:h-[200px]"
                  />
                </div>



                {/* Content */}
                <div className="py-2 flex flex-col justify-between h-full">
                  <p className="text-xl font-black text-[#0F172A]">
                    {project.name}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <p className="flex gap-1">
                      <MapPin
                        size={18}
                        className="shrink-0 "
                      />

                      <span className="text-xs">
                        {project.location}
                      </span>
                    </p>
                  </div>

                  <p className="text-[#1E80E4] text-xl font-black mt-[10px] uppercase">
                    {project.price}
                  </p>

                  <p className="text-gray-600 text-xs leading-4 mt-[10px] line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 lg:gap-4 mt-4 lg:mt-auto">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <button
                        key={index}
                        className="flex items-center justify-center bg-white border border-[#1E80E4] text-[#1E80E4] min-w-[90px] h-[26px] text-xs px-3 py-[6px] rounded-md "
                      >
                        {tag}
                      </button>
                    ))}

                    {project.tags.length > 2 && (
                      <button className="bg-white border border-[#1E80E4] text-[#1E80E4] min-w-[90px] h-[26px] text-xs px-3 py-[6px] rounded-lg">
                        +{project.tags.length - 2}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side */}
                <div className="border-l border-[#C8DDF0] flex flex-row lg:flex-col justify-between items-center py-1 lg:py-6">

                  <div
                    className={`hidden lg:flex  items-center justify-between lg:justify-center gap-2 px-4 py-2 rounded-lg text-[11px] min-w-[170px] text-center mx-auto font-medium ${project.status === "Ready To Move"
                      ? "border border-green-500 text-green-600 bg-green-50"
                      : project.status === "Under Construction"
                        ? "border border-yellow-500 text-yellow-600 bg-yellow-50"
                        : "border border-amber-500 text-amber-600 bg-amber-50"
                      }`}
                  >
                    <img
                      src={
                        project.status === "Ready To Move"
                          ? readyToMove
                          : project.status === "Under Construction"
                            ? precision_manufacturing
                            : new_launch
                      }
                      alt={project.status}
                      className="w-4 h-4 shrink-0"
                    />

                    <span>{project.status}</span>
                  </div>

                  <div className="flex flex-row justify-between w-[-webkit-fill-available] lg:flex-col items-center">
                    <button className="max-w-[170px] text-center border border-[#1E80E4] text-[#1E80E4] bg-white rounded-lg px-10 py-2 text-[12px] cursor-pointer  transition ">
                      View Details
                    </button>

                    <button className="flex items-center gap-2 text-[#1E80E4] mx-auto mt-3 text-[12px]">
                      <Heart size={18} />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {currentProjects.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-xl">
              No Projects Found
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      {/* Pagination */}
      <div className="grid grid-cols-3 items-center mt-8 mx-2">

        {/* Left Empty */}
        <div />

        {/* Center Pagination */}
        <div className="flex justify-center items-center gap-1">

          {totalPages > 1 && (
            <>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 text-[11px] rounded flex items-center justify-center transition ${currentPage === page
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 text-gray-500 bg-white"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className={`ml-2 text-sm ${currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Right Show Per Page */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-gray-500">
            Show :
          </span>

          <select
            value={projectsPerPage}
            onChange={(e) => {
              setProjectsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-xs outline-none bg-white"
          >
            <option value="12">12/page</option>
            <option value="24">24/page</option>
            <option value="36">36/page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;