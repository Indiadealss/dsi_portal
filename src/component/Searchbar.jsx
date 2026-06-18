// components/HeroSearch.jsx
"use client";
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateFilter } from './Redux/filterSlice';
import { getAllProjectNames, searchaddress } from '../api/api';
import { FiExternalLink } from "react-icons/fi";


export default function Searchbar() {

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('BUY');
  const tabs = ['BUY', 'RENT','RESIDENTIAL','COMMERCIAL', 'INDUSTRIAL', 'PLOTS/LAND', 'PROJECTS'];


  function activateTabFun(tab) {
    setActiveTab(tab);
    setInputValue(''); 
    setLocation([]);
    setProjectList([]);
  }
  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState('');


   const [projectnameL, setProjectNameL] = useState([])
  useEffect(() => {
    const featchAllProjectNames = async () => {

      const res = await getAllProjectNames()
      setProjectNameL(res.data.data)
    }

    featchAllProjectNames()

  }, [])

  const navigate = useNavigate()


  const getlocation = (value, location) => {

    if (value.length >= 2) {
      try {
        searchaddress(value, location)
          .then(res => {
            if (res.status === 200) {
              console.log(res, 'hello where are you');
              setLocation(res.data.existingAddresses);
            }
          })

      } catch (err) {
        // console.log(err);

      }
    }
    else {
      setLocation([])
    }
  }

  const dispatch = useDispatch();

  const [prLocation, setPrLocation] = useState('');
  const [np, setNp] = useState('');
  const [projectid, setProjectId] = useState('');
  const [projectname, setProjectname] = useState('');
  const [projectList, setProjectList] = useState([]);
  const [parsedLocation,setParsedLocation] = useState(null);

   const handleProjectSearch = async (value) => {
      let inValure = value;
    inValure = inValure.charAt(0).toUpperCase() + inValure.slice(1);
    setInputValue(inValure)
    console.log(projectnameL,'projectNames are');
    const filtered = projectnameL.filter(project =>
      project.projectname?.toLowerCase().includes(value.toLowerCase()) ||
      project.npxid?.toLowerCase().includes(value.toLowerCase())
    );
    
    setProjectList(filtered);
  }

  function handleClick() {

    if (np !== 'N/A') {
      dispatch(updateFilter({ projectNpxid: np }));
    }
    else {
      dispatch(updateFilter({ location: prLocation }));
    }
  }

 

  const handleSearchlocation = (e) => {
    let value = e.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    setInputValue(value)

    if (value.length >= 3) {
      getlocation(value, 'Noida')
    }
    else {
      setLocation([])
      setPrLocation('')
    }
  }

  const handleSelect = (item) => {
    // console.log(item.name == inputValue);

    console.log(item.npxid ? item.npxid : item, "let do it");


    if(activeTab === "PROJECTS"){

      let city = "";

       if (Array.isArray(item.location)) {
      city = item.location[0]?.City || "";
    } else {
      try {
        const parsed = JSON.parse(item.location);
        city = parsed.City || "";
      } catch {
        city = "";
      }
    }
    setParsedLocation(city);
    
    setNp(item.npxid ? item.npxid : 'N/A');
    setProjectId(item);
    setLocation([]);
    setInputValue(item.projectname);
    setProjectList([]);
       return `${item.projectname}-${city}-npxid-${item.npxid}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    }
    else{
    if (item.name === item.city) {
      setInputValue(`${item.name}`)
      setLocation([])
      setPrLocation(inputValue);
      setProjectname(item.name);
      setProjectId(item)
    }
    else {
      setInputValue(`${item.name} , ${item.sector}, ${item.city}`)
      setLocation([])
      setPrLocation(inputValue)
      setNp(item.npxid ? item.npxid : 'N/A')
      setProjectId(item)
    }
  }
  }

  const createSlug = (item) => {
    
    if (!item?.npxid) return "";


    return `${item.name}-${item.city}-${item.sector}-npxid-${item.npxid}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const createSlugs = (item) => {
    return `${item.name}-${item.city}-ffid`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  const placeholders = [
    "Flat in Noida",
    "Villa in Gurgaon",
    "Office in Delhi",
    "Plot in Yamuna Expressway",
    "Shop in Greater Noida",
  ];

  const texts = [
    "Flat in Noida",
    "Villa in Gurgaon",
    "Office in Delhi",
    "Plot in Yamuna Expressway",
    "Shop in Greater Noida",
  ];


  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);

      return () => clearTimeout(timeout);
    }

    // Wait before changing text
    const resetTimeout = setTimeout(() => {
      setDisplayText("");
      setCharIndex(0);
      setTextIndex((prev) =>
        prev === texts.length - 1 ? 0 : prev + 1
      );
    }, 1500);

    return () => clearTimeout(resetTimeout);
  }, [charIndex, textIndex]);
  return (
    <div className="w-full max-w-3xl border-x border-t border-t-white border-x-white rounded-t-xl rounded-b-xl  backdrop-blur-md bg-black/20 ">
      {/* 1. Tabs Section */}
      <div className="flex flex-wrap gap-0 md:gap-4  rounded-t-xl p-2 shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => activateTabFun(tab)}
            className={`text-xs md:text-sm font-medium transition-all duration-200 drop-shadow-md cursor-pointer text-wider px-3
              ${activeTab === tab ? 'text-white ' : 'text-gray-200 hover:text-white'}
            `}
          >
            {tab}
            <div
              className={`h-[0.8px] bg-white transition-all duration-300
        ${activeTab === tab
                  ? tab === "BUY"
                    ? "w-[20px] md:w-[22px]"
                    : tab === "RENT"
                      ? "w-[25px] md:w-[35px]"
                      : tab === "COMMERCIAL"
                        ? "w-[80px] md:w-[90px]"
                        : "w-[60px] md:w-[70px]"
                  : "w-0"
                }
      `}
            />
          </button>
        ))}
      </div>

      {/* 2. Glassmorphism Search Bar */}
      <div className=" rounded-b-xl">
        <div  className={
    (inputValue.trim().length > 0 &&
      (location.length > 0 || projectList.length > 0))
      ? "bg-white px-2 flex items-center gap-2"
      : "bg-white px-2 flex items-center gap-2 rounded-b-xl"
  }>

          {/* Location Search */}
          <div className="relative flex items-center flex-1 w-full  px-3 border-b md:border-b-0 md:border-r border-gray-200 h-12">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder={displayText}
              value={inputValue}
              onChange={activeTab === "PROJECTS" ? (e) => handleProjectSearch(e.target.value) : handleSearchlocation}
              className="w-full outline-none text-gray-700 placeholder:text-gray-400"
            />
            
          </div>
          {inputValue.trim().length > 0 &&(location.length > 0 || projectList.length > 0) && (
              <ul className={location.length > 2 || projectList.length > 2 ? " absolute left-0 top-full w-full bg-white border-x border-b border-gray-200 shadow-xl rounded-b-xl overflow-auto  z-50 animate-dropdown h-[135px]" : " absolute left-0 top-full w-full bg-white border-x border-b border-gray-200 shadow-xl rounded-b-xl overflow-auto  z-50 animate-dropdown"}>
                {location.map((item, index) => (
                  <div className="flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all duration-200">
                    <li
                      key={index}
                      className="px-4 py-3 cursor-pointer text-gray-700 text-sm w-full text-justify"
                      onClick={() => handleSelect(item)}
                    >
                      {item.name === inputValue ? item.city : `${item.name},${item.sector}, ${item.city}`}
                    </li>
                    <div>
                      <p className="text-gray-600 flex p-2"><span className="text-xl p-1"><FiExternalLink /></span></p>
                    </div>
                  </div>
                ))}
                {projectList.map((item, index) => (
                  <div className="flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all duration-200">
                    <li
                      key={index}
                      className="px-4 py-3 cursor-pointer text-gray-700 text-sm w-full text-justify"
                      onClick={() => handleSelect(item)}
                    >
                      {item.projectname}
                    </li>
                    <div>
                      <p className="text-gray-600 flex p-2"><span className="text-xl p-1"><FiExternalLink /></span></p>
                    </div>
                  </div>
                ))}
              </ul>
            )}



          {/* Filter & Search Button */}
<div className="flex items-center gap-2 md:w-auto">
  <button className="text-gray-500 hover:bg-gray-100 transition-colors w-full">
    <SlidersHorizontal size={20} />
  </button>

  <div className="w-[1px] h-[35px] bg-gray-400" />

  {activeTab !== "PROJECTS" &&
  inputValue.trim().length < 3 ? (
    <button
      disabled
      className="
        hidden md:block
        px-2 py-0 md:px-8 md:py-[2px]
        rounded-sm
        bg-blue-200
        cursor-not-allowed
        text-white
      "
    >
      Search
    </button>
  ) : (
    <Link
      to={
        activeTab === "PROJECTS"
          ? projectid?.npxid
            ? `${projectid?.projectname}-${parsedLocation}-npxid-${projectid?.npxid}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            : `${inputValue
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}-pidd`
          : np !== "N/A" && np?.length === 5
          ? createSlug(projectid)
          : createSlugs(projectid)
      }
      onClick={handleClick}
    >
      <button
        className="
          hidden md:block
          px-2 py-0 md:px-8 md:py-[2px]
          rounded-sm
          transition-all
          md:w-auto
          bg-[#3477c5]
          hover:bg-[#2f6db5]
          text-white
          cursor-pointer
        "
      >
        Search
      </button>
    </Link>
  )}

  <Search
    className="mr-2 block md:hidden bg-[#3477c5] p-4 text-white"
    size={20}
  />
</div>
        </div>
      </div>

    </div>
  );
}