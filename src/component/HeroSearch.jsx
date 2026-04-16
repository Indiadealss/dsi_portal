import React, { useEffect, useState } from "react";
import { getAllProjectNames, getallProperty, searchaddress } from "../api/api";
import projectName from '../Images/dubai-marina-panorama-photo.jpg';
import { useNavigate } from "react-router-dom";
import { updateFilter } from "./Redux/filterSlice";
import { useDispatch } from "react-redux";

const HeroSearch = () => {

  const [projectname, setProjectName] = useState([])
  useEffect(() => {
    const featchAllProjectNames = async () => {

      const res = await getAllProjectNames()
      setProjectName(res.data.data)
    }

    featchAllProjectNames()

  }, [])

  const navigate = useNavigate()

  let dispatch = useDispatch();



  const residentalProperty = [
    { name: 'Independent House/Villa', value: 'Independent House/Villa' },
    { name: 'Apartment/Flat', value: 'Apartment / Flat' },
    { name: 'Builder Floor', value: 'Builder Floor' },
    { name: 'Row House/Townhouse', value: 'Row House/Townhouse' },
    { name: 'Residential Plot', value: 'Residential Plot' },
    { name: 'Studio Apartment', value: 'Studio Apartment' },
    { name: 'Penthouse', value: 'Penthouse' }
  ];

  const [construtStatus,setConstrutStatus] = useState('')

  const constructionStatus = [
    { name: 'New launch', value: 'New launch' },
    { name: ' Under Construction', value: 'Under Construction' },
    { name: 'Ready to move', value: ' Ready to move' }

  ]

  const Bedroom = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
    { name: '7', value: '7' },
  ]

  const CommericalProperty = [
    { name: 'Office Space', value: 'Office Space' },
    { name: 'Shop / Retail Space', value: 'Shop / Retail Space' },
    { name: 'Showroom', value: 'Showroom' },
    { name: 'Warehouse/Godown', value: 'Warehouse/Godown' },
    { name: 'Industrial Property', value: 'Industrial Property' },
    { name: 'Hotel / Hospitality', value: 'Hotel/Hospitality' },
    { name: 'Restaurant/Cafe', value: 'Restaurant/Cafe' },
    { name: 'Commercial Plot/Land', value: 'Commercial Plot/Land' }
  ];

  const allStatus = [
    { name: 'All Status', value: 'All Status' },
    { name: 'For Sale', value: 'For Sale' },
    { name: 'For Rent', value: 'For Rent' },
    { name: 'PG', value: 'PG' }
  ];

  const propertyTypes = [
    { name: 'All Types', value: 'All Types', component: [] },
    { name: 'Residential', value: 'Residential', component: residentalProperty },
    { name: 'Commercial', value: 'Commercial', component: CommericalProperty },
    { name: 'Project', value: 'Project', component: [] }
  ];

  const [propertyType, setPropertyType] = useState([]);
  const [alltype, setAlltype] = useState('All Types');
  const [sizeSpace, setSizeSpace] = useState('Any');
  const [selectedSize, setSelectedSize] = useState("");
  const [projectNpxid,setProjectNpxid] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState();
  const [locationInput, setLocationInput] = useState();
  const [projectInput, setProjectInut] = useState()
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState()

  const size = [
    { name: '100 - 300 sqft', value: '100-500' },
    { name: '300 - 500 sqft', value: '500-1000' },
    { name: '500 - 700 sqft', value: '500-700' },
    { name: '700 - 1000 sqft', value: '700-1000' },
  ]

  // handle change
  const handlePropertyTypeChange = (value) => {
    const selected = propertyTypes.find(item => item.value === value);
    setPropertyType(selected?.component || []);
    setAlltype(selected?.value || '')
    console.log(selected?.value, 'selected value');

  };

  // 🔥 NEW STATE ADD
const [filteredProjects, setFilteredProjects] = useState([]);
const [projectList,setProjectList] = useState([]);

useEffect(() => {
  if (projectname.length) {
    setFilteredProjects(projectname);
  }
}, [projectname]);

// 🔥 FILTER LOGIC ADD
useEffect(() => {
  let filtered = [...projectname];

  // city filter
  if (selectedLocation) {
    filtered = filtered.filter(project => {
      let city = "";

      if (Array.isArray(project.location)) {
        city = project.location[0]?.City || "";
      } else {
        try {
          const parsed = JSON.parse(project.location);
          city = parsed.City || "";
        } catch {
          city = "";
        }
      }

      return city.toLowerCase().includes(selectedLocation.toLowerCase());
    });
  }

  // construction status filter
  if (construtStatus) {

  filtered = filtered.filter(project => {
    const status = project.availabestatus?.trim().toLowerCase();
    const selected = construtStatus.trim().toLowerCase();

    // skip empty status (optional)
    if (!status) return false;

    return status === selected;
  });

}
  // fallback → show all
  if (!selectedLocation && !construtStatus) {
    filtered = projectname;
  }

  setFilteredProjects(filtered);

}, [selectedLocation, construtStatus, projectname]);


  const createSearchSlug = (query) => {
    // default fallback
    const city = "noida";

    return `${query}-ffid`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const createProjectSlug = (project) => {
    if (!project && alltype === 'Project') {
      console.log(locationInput ,alltype,'no project found');
      // dispatch(updateFilter({location:locationInput}));
      if(locationInput){
        dispatch(updateFilter({location:locationInput}));
      }else{        dispatch(updateFilter({location:'All India'}));
      } 
      dispatch(updateFilter({purpose:alltype}));
      return `${locationInput}-${alltype}-${construtStatus}-ffid`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    }

    if (!project) {
      return "";
    }

    console.log(project,'no project found');
    let city = "";

    dispatch(updateFilter({purpose:construtStatus}));

    // handle both cases (array / string)
    if (Array.isArray(project.location)) {
      city = project.location[0]?.City || "";
    } else {
      try {
        const parsed = JSON.parse(project.location);
        city = parsed.City || "";
      } catch {
        city = "";
      }
    }

    return `${project.projectname}-${city}-npxid-${project.npxid}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSearch = async () => {
    const query = new URLSearchParams();

    if (alltype !== "All Types" && alltype !== "Project") {
      query.append("property", alltype.toLowerCase());
    }

    if (alltype === 'Project') {
      query.append("purpose", alltype);
    }

    if (selectedSubType) {
      query.append("propertyType", selectedSubType);
    }

    if(selectedLocation){
      query.append("location",selectedLocation);
    }

    if (selectedSize) {
      query.append("size", selectedSize);
    }

    if (alltype === "Residential" && bedroom) {
      query.append("bedroom", bedroom);
    }

    

    if (alltype !== 'Project') {
      const slug = createSearchSlug(query);
      navigate(`/property/${slug}`);
    }

    if (alltype === "Project") {
      const selectedProject = projectname.find(
  (p) => p.npxid === selectedProjectId
);

      console.log(selectedProjectId,projectNpxid,"let's check");
      

      const slug = createProjectSlug(selectedProject);

      navigate(`/property/${slug}?preference=S`);
      return;
    }




  };



  const handleLocationSearch = async (value) => {
    setLocationInput(value);

    if (value.length < 2) {
      setLocationList([]);
      return;
    }

    

    try {
      const res = await searchaddress(value, "Noida");

      if (res.status === 200) {
        setLocationList(res.data.existingAddresses);
      }
    } catch (err) {
      console.log(err);
    }
  };

    const handleProjectSearch = async (value) => {
      const filtered = filteredProjects.filter(project =>
    project.projectname?.toLowerCase().includes(value.toLowerCase()) ||
    project.npxid?.toLowerCase().includes(value.toLowerCase())
  );

  setProjectList(filtered);
      console.log(filteredProjects);
      setProjectInut(value)
    }
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh]">

      <img
        src={projectName}
        alt="property"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4 text-center">

        <h1 className="text-white text-2xl md:text-5xl font-semibold">
          <span className="text-white">Find your perfect</span> <span className="text-white">property</span>
        </h1>

        {/* <p className="text-gray-200 mt-3 text-sm md:text-lg">
          We have over million properties for you
        </p> */}

        <div className="mt-6 w-full max-w-6xl bg-[#ffffff78] rounded md:rounded-full shadow-lg p-2 flex flex-col md:flex-row">

          {/* Property Type */}
          <select
            className="flex-1 px-4 py-3 outline-none bg-white md:rounded-s-full text-gray-600 border-b md:border-b-0"
            onChange={(e) => handlePropertyTypeChange(e.target.value)}
          >
            {propertyTypes.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => handleLocationSearch(e.target.value)}
              placeholder="Search Location..."
              className="w-full px-4 py-3 bg-white outline-none text-gray-600 border-b md:border-b-0"
            />

            {locationList.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border mt-1 shadow-md max-h-48 overflow-y-auto z-50">
                {locationList.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      const value = `${item.city}`;
                      setLocationInput(value);
                      setSelectedLocation(value);
                      setLocationList([]);
                    }}
                  >
                    {item.city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Status */}
          {alltype !== 'Project' && (
            <select className="flex-1 px-4 py-3 bg-white outline-none text-gray-600 border-b md:border-b-0 ">
              {allStatus.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          )}


          <select className="flex-1 px-4 py-3 bg-white outline-none text-gray-600 border-b md:border-b-0 " onChange={(e) => setConstrutStatus(e.target.value)}>
            <option value="">Looking For</option>
            {constructionStatus.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Sub Property Type */}
          {(alltype === 'Commercial' || alltype === 'Residential') && (
            <select
              disabled={propertyType.length === 0}
              onChange={(e) => setSelectedSubType(e.target.value)}
              className={`flex-1 px-4 py-3 outline-none border-b md:border-b-0  
              ${propertyType.length === 0 ? "bg-white text-gray-400 cursor-not-allowed" : "bg-white"}
                `}
                >
              <option value="">Type of Property</option>

              {propertyType.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          {alltype === 'Residential' && (
            <select
              value={bedroom}
              onChange={(e) => setBedroom(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-600 border-b md:border-b-0 bg-white"
            >
              <option value="">Any Bedroom</option>

              {Bedroom.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          {(alltype === 'Commercial' || selectedSubType === 'Residential Plot') && (
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="flex-1 px-4 py-3 bg-white outline-none text-gray-600 border-b md:border-b-0"
            >
              <option value="">All Size</option>

              {size.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          )}

          {(alltype === 'Project') && (
            <div className="relative flex-1">
            <input
              type="text"
              value={projectInput}
              onChange={(e) => handleProjectSearch(e.target.value)}
              placeholder="Search Project By Name..."
              className="w-full px-4 py-3 bg-white outline-none text-gray-600 border-b md:border-b-0"
            />
            

            {filteredProjects.length > 0 && projectInput && (
              <ul className="absolute left-0 right-0 bg-white border mt-1 shadow-md max-h-48 overflow-y-auto z-50">
                {projectList.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      const value = `${item.npxid}`;
                      const projectName = `${item.projectname}`;
                      setProjectNpxid(value);
                      setSelectedProjectId(item.npxid);
                      setProjectInut(projectName);
                      setSelectedLocation(value);
                      setLocationList([]);
                    }}
                  >
                    {item.projectname}
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}
          {/* Button */}
          <button onClick={handleSearch} className="my-5 md:my-0 bg-[#e9ae01] text-white px-6 py-3 rounded-full md:rounded-r-full md:rounded-l-none font-semibold hover:bg-lime-600">
            SEARCH
          </button>

        </div>
      </div>
    </div>
  );
};

export default HeroSearch;