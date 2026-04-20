import React, { use, useEffect, useState } from 'react'
import img1 from '../Images/noImageBg.svg';
import { IoIosAdd } from 'react-icons/io';
import { MdCurrencyRupee } from "react-icons/md";
import { data, Link, useParams } from "react-router";
import Ownerdetails from './Ownerdetails';
import { getallProperty } from '../api/api';
import { Carousel, Skeleton } from 'antd';
import Custompropertycrousal from './customantdesign/Custompropertycrousal';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from './Redux/filterSlice';
import SklatingLoding from './Loading/SklatingLoding';
export const PropertiesData = () => {

  

    let timeStamp = Date.now();

    let dispatch = useDispatch();

    // console.log(timeStamp);
    const [properties, setProperties] = useState([]);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore]  = useState(true)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
  // console.log("Updated properties:", properties);
}, [properties]);

const { slug } = useParams();

const parseSlug = (slug) => {
  if (!slug) return {};

  const parts = slug.split("-");
  const validKeys = ["property", "propertytype", "location", "bedroom", "size"];

  let result = {};
  let currentKey = null;


  return {
    location: parts[0],   // noida
    property: parts.includes("projects") ? "Project" : ""
  };
};

const filtersFromSlug = parseSlug(slug);

console.log(filtersFromSlug,'slug filters');





  const filterForm = useSelector((state) => state.filterSlice);
  const location = useSelector((state) => state.filterSlice.location);
  const selectedFilters = useSelector((state) => state.filterSlice);
  const projectname = useSelector((state) => state.filterSlice.projectname);
  let purpose = useSelector((state) => state.filterSlice.purpose);
  if(filtersFromSlug.property === 'Project'){
    purpose = 'Project';
  }

    const fetchProperties = async (pageNumber) => {
        console.log(filterForm,'filterForm');
        
       try{

        const propertyType = selectedFilters.propertyType || selectedFilters.typesOfProperty || '';
        console.log('API Params:', {
          page: pageNumber,
          location: filtersFromSlug.location || location,
          purpose: filtersFromSlug.property || 'sell',
          propertyType: Array.isArray(propertyType) ? propertyType.join(',') : propertyType,
          slug: filtersFromSlug.property || '',
          projectname: projectname
        }, 'API Params');
        
        
         setLoading(true)
        const res = await getallProperty(
          pageNumber,
          filtersFromSlug.location || location,
          filtersFromSlug.property || 'sell',
          Array.isArray(propertyType) ? propertyType.join(',') : propertyType,
          filtersFromSlug.property || '',
          filterForm || {}
        );
        const resultsAre = res.data?.data || [];
        let result = [];
        console.log(slug,resultsAre,purpose,'slug budget');
        if(purpose==='Project'){
          result = resultsAre.filter((p) => p.purpose === 'Project');
        }
        if(purpose!=='Project'){
          result = resultsAre.filter((p) => p.purpose != 'Project');
        }
        // const  = resultsAre.filter((p) => p.purpose != 'Project');
        if(slug.includes('project')){
          console.log('yeah');
          
        }

        // Apply client-side filters
        let filteredResult = result;

        // Budget filter
        if (selectedFilters.budget && Array.isArray(selectedFilters.budget) && selectedFilters.budget.length === 2) {
          const [minPrice, maxPrice] = selectedFilters.budget;
          filteredResult = filteredResult.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        // Bedroom filter
        if (selectedFilters.noOfBedroom && selectedFilters.noOfBedroom.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.noOfBedroom.includes(p.bedroom));
        }

        // Bathroom filter
        if (selectedFilters.noBathroom && selectedFilters.noBathroom.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.noBathroom.includes(p.bathroom?.toString()));
        }

        // Property type filter (additional check)
        if (selectedFilters.typesOfProperty && selectedFilters.typesOfProperty.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.typesOfProperty.includes(p.propertyType));
        }

        // Property type from Redux (if set)
        if (selectedFilters.propertyType) {
          const propType = Array.isArray(selectedFilters.propertyType) ? selectedFilters.propertyType : [selectedFilters.propertyType];
          if (propType.length > 0 && propType[0]) {
            filteredResult = filteredResult.filter(p => propType.includes(p.propertyType));
          }
        }

        // Area filter
        if (selectedFilters.area && Array.isArray(selectedFilters.area) && selectedFilters.area.length === 2) {
          const [minArea, maxArea] = selectedFilters.area;
          filteredResult = filteredResult.filter(p => p.plotarea >= minArea && p.plotarea <= maxArea);
        }

        // Furnishing status filter
        if (selectedFilters.furnishingStatus && selectedFilters.furnishingStatus.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.furnishingStatus.includes(p.furnishing));
        }

        // Posted by filter
        if (selectedFilters.postedby && selectedFilters.postedby.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.postedby.includes(p.postedBy));
        }

        // Available for filter
        if (selectedFilters.avalableFor && selectedFilters.avalableFor.length > 0) {
          filteredResult = filteredResult.filter(p => selectedFilters.avalableFor.includes(p.availableFor));
        }

        // Amenities filter
        if (selectedFilters.anemateFilter && selectedFilters.anemateFilter.length > 0) {
          filteredResult = filteredResult.filter(p => {
            if (!p.amenities) return false;
            return selectedFilters.anemateFilter.some(amenity => p.amenities.includes(amenity));
          });
        }

        if(filteredResult.length === 0){
            setHasMore(false);
            return;
        }

        const formattedData = filteredResult.map((p) => {
            let locationData = [];
            try{
                locationData = parseLocation(p.location);
                // console.log(p);
                
            }catch(err){
                locationData = [];
            }

            let highlights = [];
            
  if (p.propertyfacing) highlights.push({ helight: p.propertyfacing });
  if (p.pobackup) highlights.push({ helight: p.pobackup });
  if (p.watersource) highlights.push({ helight: p.watersource });
  if (Array.isArray(p.overlo)) {
    p.overlo.forEach((item) => {
      highlights.push({ helight: item });
    });
  }

            const validImages =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images.filter((img) => img.src && img.src !== "No image uploaded")
      : [];
            return{
                id:p._id,
                spid:p.spid || p.npxid || '',
      images: validImages.length ? validImages : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg', alt: "No image" }],
      title: locationData?.apartment_name || p.projectname,
      purpose: p.purpose || '',
      heilights:highlights.length ? highlights : [{ helight: "N/A" }],
      subtitle: p.property === 'commercial' ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData?.City}`: `${p.propertyType === 'plotLand' ? `${p.property} Property available in ${p.City} for ${p.purpose}`: `${p.bedroom} BHK ${p.propertyType} in ${locationData.City}`}`,
      subtitle2: p.purpose === 'Project' ? `${p.propertyType} Project in ${parseLocation(locationData)[0]?.City}` : `${p.bedroom} BHK ${p.propertyType} in ${locationData?.City}`,
      bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
      bedroom:p.bedroom ? p.bedroom : '',
      location: p.location || "Unknown",
      price: p.price || 0,
      deposit: Number(p.price) * 0.3 || "N/A",
      size: p.plotarea || p.availabestatus,
      area: p.areaType || "Built-up",
      description: p.description || "No description available",
      time: p.updatedAt || "N/A",
      owner: p.purpose === 'Project' ? '' : `${p.owner || 'Owner'}`,
       };
    });

    console.log(formattedData,'helights');
    

    
        setProperties(prev => [...prev, ...formattedData]);
        // console.log(result.data);
        
    }catch(err){
        console.error(err);
    }finally{
        setLoading(false);
    }
    };

    // Reset page and properties when filters change
    useEffect(() => {
        setPage(1);
        setProperties([]);
        setHasMore(true);
    }, [selectedFilters, location, projectname, purpose]);

    useEffect(() => {
        const handleScroll = ()  => {
          
            if(
                window.innerHeight + document.documentElement.scrollTop >=
                 document.documentElement.offsetHeight - 100 && 
                 hasMore && 
                 !loading
            ) {
                setPage(prev => prev + 1);
          // console.log('check',page);
            }
        };
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[hasMore,loading])

    useEffect(() => {
        fetchProperties(page)
    },[page, location, selectedFilters, projectname, purpose]);


    function clearFilter() {
        dispatch(updateFilter({location:'All India'}));
        // setLocation('All India')
        // setProjectname((state) => state.filterSlice.projectname)
    }

   const parseLocation = (location) => {
  if (typeof location === "string") {
    try {
      return JSON.parse(location);
    } catch {
      return null;
    }
  }
  return location;
};

  const createSlug = (item) => {
  if (!item?.spid) return "";

    const locationData = parseLocation(item.location);
  const city = locationData?.[0]?.City || "";

  if(purpose === 'Project'){
    return `${item.title}-${city}-npxid-${item.spid}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  }



  return `${item.subtitle}-spid-${item.spid}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

if(loading){
  return <div
        
      >
        <SklatingLoding />
      </div>
}

    
    // const propertyData = [
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
    //     { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' }
    // ]
    return (
        <div>
  {properties.length > 0 ? (
    properties.map((item, index) => (
      <div
        key={index}
        className="flex w-full propertyListingHeight flex-col lg:flex-row bg-white border border-gray-200 rounded-lg shadow-sm sm:p-2 mt-5"
      >
        {/* Property Image Carousel */}
        <div>
          <Custompropertycrousal images={item.images} />
        </div>

        {/* Property Details */}
        <div className="md:webkitFillAvailable lg:w-[max-content]">
          <div className="px-6">
            <Link to={`/property/${createSlug(item)}`}>
              <h5 className="text-base font-base">
                <span className="font-bold text-xl text-gray-700">{item.title}</span>
              </h5>
            </Link>
            <Link to={`/property/${createSlug(item)}`}>
              <h6 className="text-base font-medium text-gray-700">{item.subtitle2}</h6>
            </Link>
          </div>

          {/* Pricing Section */}
          <div className="flex m-2 py-2">
            <div className="px-2 border-e border-gray-300">
              <div className="flex items-center">
                <MdCurrencyRupee className="text-[15px]" />
                <p className="text-[15px] font-medium">{item.price}</p>
              </div>
              <div className="flex items-center">
                {/* <IoIosAdd className="text-lg" /> */}
                {/* <p className="text-[15px] font-medium px-1">Deposit</p> */}
                {/* <MdCurrencyRupee className="text-[15px]" />
                <p>{(item.price / item.size).toFixed(0)}/sqft</p> */}
              </div>
            </div>

            <div className="px-5 border-e border-gray-300">
              <p className={item.purpose === 'Project' ?  'text-[15px] font-medium' : 'hidden'}>
                {item.size} 
              </p>
               <p className={item.purpose === 'Project' ?  'hidden' : 'text-[15px] font-medium'}>
                {Math.round(item.size)} Sqft ({(item.size * 0.092903).toFixed(0)} sqm)
              </p>

              <p className={item.purpose === 'Project' ? 'hidden' : 'text-[15px] font-medium'}>{item.area} Area</p>
            </div>

            <div className="px-5">
              <p className="text-[15px] font-medium">{item.bedroom}</p>
              <p className="text-[15px] font-medium">{item.bathroom}</p>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="flex flex-wrap py-2 relative group cursor-pointer">
            <p className="text-sm font-bold ps-5 text-[18px]">Highlights:</p>

            {Array.isArray(item.heilights) &&
              item.heilights.slice(0, 2).map((h, i) => (
                <p
                  key={i}
                  className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full"
                >
                  {typeof h.helight === 'object' ? h.helight.name || h.helight.label || h.helight : h.helight || "N/A"}
                </p>
              ))}

            {Array.isArray(item.heilights) && item.heilights.length > 2 && (
              <p className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full">
                +{item.heilights.length - 2}
              </p>
            )}

            {/* Hover Popup for Highlights */}
            <div className="absolute left-0 bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
              <p className="font-bold text-sm mb-1">Highlights:</p>
              <div className="flex flex-wrap gap-1">
                {item.heilights.map((h, i) => (
                  <span
                    key={i}
                    className="text-gray-700 text-sm px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {typeof h.helight === 'object' ? h.helight.name || h.helight.label || h.helight : h.helight || "N/A"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-wrap w-[32vw] px-5 py-3 group cursor-pointer">
            <p className="text-sm truncate">{item.description}</p>

            <div className="absolute bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
              <span className="text-gray-700 text-sm px-2 py-1">{item.description}</span>
              <span className="text-blue-600 text-sm ps-2 cursor-pointer">
                View Details
              </span>
            </div>
          </div>

          {/* Dealer Section */}
          <div className="flex ps-2 pt-2 justify-between">
            <div>
              <p className={item.purpose === 'Project' ? 'hidden' : 'text-base text-gray-500'}>
                Dealer · {formatDistanceToNow(item.time, { addSuffix: true })}
              </p>
              <p className="text-sm font-bold text-gray-500">{item.owner.name}</p>
            </div>
            <div className="flex">
              <Ownerdetails details={item.owner} />
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className=" flex justify-center text-gray-500 mt-10">
        <div className='border border-blue-300 rounded w-[80%] p-3 bg-blue-50'>
      <div className="flex justify-between">
        <h4><span>No results matching your search</span></h4>
        <button className='text-blue-500 p-2 rounded border border-blue-500'>
            Clear all filters
        </button>
      </div>
      <p><span className=' font-light text-lg'>Try removing some filters:</span></p>
      <button className='text-blue-500  px-4 my-2 border border-blue-500 rounded-3xl cursor-pointer' onClick={clearFilter}>
        {location} <span className='text-'> X </span>
      </button>
      </div>
    </div>
  )}
</div>

    )
}
