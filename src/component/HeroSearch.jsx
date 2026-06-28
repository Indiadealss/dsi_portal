import React, { useEffect, useState } from "react";
import { getAllProjectNames, getallProperty, getSearch, getSearchcitiesList, searchaddress } from "../api/api";
import projectName from '../Images/Irish-1.png';
import { useNavigate } from "react-router-dom";
import { updateFilter } from "./Redux/filterSlice";
import { useDispatch } from "react-redux";
import Searchbar from "./Searchbar";

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

  const [construtStatus, setConstrutStatus] = useState('')

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
    { name: 'Projects', value: 'Projects', component: [] }
  ];

  const [propertyType, setPropertyType] = useState([]);
  const [alltype, setAlltype] = useState('All Types');
  const [sizeSpace, setSizeSpace] = useState('Any');
  const [selectedSize, setSelectedSize] = useState("");
  const [projectNpxid, setProjectNpxid] = useState("");
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
  const [projectList, setProjectList] = useState([]);

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
    if (!project && alltype === 'Projects') {
      console.log(locationInput, alltype, 'no project found');
      // dispatch(updateFilter({location:locationInput}));
      const finalLocation = locationInput || 'All India';
      if (locationInput) {
        dispatch(updateFilter({ location: locationInput }));
      } else {
        dispatch(updateFilter({ location: 'All India' }));
      }
      dispatch(updateFilter({ purpose: alltype }));
      return `${finalLocation}-${alltype}-${construtStatus}-ffid`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    if (!project) {
      return "";
    }

    console.log(project, 'no project found');
    let city = "";

    dispatch(updateFilter({ purpose: construtStatus }));

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

    if (selectedLocation) {
      query.append("location", selectedLocation);
    }

    if (!selectedLocation) {
      query.append("location", 'All India');
    }

    if (alltype !== "All Types" && alltype !== "Projects") {
      query.append("property", alltype);
    }

    if (alltype === 'Projects') {
      query.append("purpose", alltype);
    }

    if (selectedSubType) {
      query.append("propertyType", selectedSubType);
    }



    if (selectedSize) {
      query.append("size", selectedSize);
    }

    if (alltype === "Residential" && bedroom) {
      query.append("bedroom", bedroom);
    }

    console.log(query, 'all query has been updated ?');




    if (alltype !== 'Projects') {
      const slug = createSearchSlug(query);
      navigate(`/${slug}`);
    }

    if (alltype === "Projects") {
      const selectedProject = projectname.find(
        (p) => p.npxid === selectedProjectId
      );

      console.log(selectedProjectId, projectNpxid, "let's check");


      const slug = createProjectSlug(selectedProject);

      navigate(`/${slug}?preference=S`);
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
      const res = await getSearchcitiesList(value);

      if (res.status === 200) {
        setLocationList(res.data.data);
        console.log(res.data.data, 'res.data', res.data.existingAddresses, 'res existingAddresses');

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
    <div className="relative w-full h-[40vh] md:h-[52vh]">

      <img
        src={projectName}
        alt="property"
        className="w-full h-full "
      />

      <div className="absolute inset-0  flex flex-col items-center justify-center px-4 text-center pt-[30vh]">

        {/* <p className="text-gray-200 mt-3 text-sm md:text-lg">
          We have over million properties for you
        </p> */}

        <Searchbar />
      </div>
    </div>
  );
};

export default HeroSearch;