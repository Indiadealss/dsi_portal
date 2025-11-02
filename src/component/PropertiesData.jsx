import React, { useEffect, useState } from 'react'
import img1 from '../Images/noImageBg.svg';
import { IoIosAdd } from 'react-icons/io';
import { MdCurrencyRupee } from "react-icons/md";
import { data, Link } from "react-router";
import Ownerdetails from './Ownerdetails';
import { getallProperty } from '../api/api';
import { Carousel } from 'antd';
import Custompropertycrousal from './customantdesign/Custompropertycrousal';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from './Redux/filterSlice';
export const PropertiesData = () => {

    let timeStamp = Date.now();

    let dispatch = useDispatch();

    console.log(timeStamp);
    const [properties, setProperties] = useState([]);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore]  = useState(true)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
  console.log("Updated properties:", properties);
}, [properties]);


  const [location,setLocation] = useState(useSelector((state) => state.filterSlice.location))
  const [projectname,setProjectname] = useState(useSelector((state) => state.filterSlice.projectname))
    const fetchProperties = async (pageNumber) => {
        
       try{
         
        const res = await getallProperty(pageNumber,location,projectname);
        const resultsAre = res.data?.data || [];

        const result = resultsAre.filter((p) => p.purpose != 'Project')
        

        if(result.length === 0){
            setHasMore(false);
            return;
        }

        const formattedData = result.map((p) => {
            let locationData = [];
            try{
                locationData = JSON.parse(p.location);
                console.log(p);
                
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
      images: validImages.length ? validImages : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg', alt: "No image" }],
      title: locationData[0]?.apartment_name || "Untitled Property",
      heilights:highlights.length ? highlights : [{ helight: "N/A" }],
      subtitle: p.property === 'commercial' ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData[0]?.City}`: `${p.propertyType === 'plotLand' ? `${p.property} Property available in ${p.City} for ${p.purpose}`: `${p.bedroom} BHK ${p.propertyType} in ${p.City}`}`,
      bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
      bedroom:p.bedroom ? p.bedroom : '',
      location: p.location || "Unknown",
      price: p.price || 0,
      deposit: p.deposit || "N/A",
      size: p.plotarea || 0,
      area: p.areaType || "Built-up",
      description: p.description || "No description available",
      time: new Date(p.updatedAt).toLocaleDateString() || "N/A",
      owner: p.owner || "Owner",
       };
    });

    
        setProperties(prev => [...prev, ...formattedData]);
        console.log(result.data);
        
    }catch(err){
        console.error(err);
    }finally{
        setLoading(false);
    }
    };

    useEffect(() => {
        const handleScroll = ()  => {
          
            if(
                window.innerHeight + document.documentElement.scrollTop >=
                 document.documentElement.offsetHeight - 100 && 
                 hasMore && 
                 !loading
            ) {
                setPage(prev => prev + 1);
          console.log('check',page);
            }
        };
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[hasMore,loading])

    useEffect(() => {
        fetchProperties(page)
    },[page,location]);


    function clearFilter() {
        dispatch(updateFilter({location:'All India'}));
        setLocation('All India')
        setProjectname((state) => state.filterSlice.projectname)
    }

    
    const propertyData = [
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43  ', time: '08/08/2025', owner: 'Rohit' },
        { images: [{ src: img1, alt: '...' }], title: 'Supertech Eco Village', heilights: [{ helight: '1 BHK' }, { helight: 'North-East Facing' }, { helight: 'Full Power Backup' }], bedroom: '2 BHK', bathroom: '1 Baths', location: 'Grater Noida', price: 20000, deposit: '11000', size: 117, area: 'Build up', description: 'Find this 2 bhk apartment for rent in sector 43 ', time: '08/08/2025', owner: 'Rohit' }
    ]
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
            <Link to={`/propertyDetails/${item.id}`}>
              <h5 className="text-base font-base">
                <span className="font-bold text-xl text-gray-700">{item.title}</span>
              </h5>
            </Link>
            <Link to={`/propertyDetails/${item.id}`}>
              <h6 className="text-base font-medium text-gray-700">{item.subtitle}</h6>
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
                <IoIosAdd className="text-lg" />
                <p className="text-[15px] font-medium px-1">Deposit</p>
                <MdCurrencyRupee className="text-[15px]" />
                <p>{item.deposit}</p>
              </div>
            </div>

            <div className="px-5 border-e border-gray-300">
              <p className="text-[15px] font-medium">
                {Math.round(item.size * 10.7639)} Sqft ({item.size})
              </p>
              <p className="text-[15px] font-medium">{item.area} Area</p>
            </div>

            <div className="px-5">
              <p className="text-[15px] font-medium">{item.bedroom}</p>
              <p className="text-[15px] font-medium">{item.bathroom}</p>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="flex py-2 relative group cursor-pointer">
            <p className="text-sm font-bold ps-5 text-[18px]">Highlights:</p>

            {Array.isArray(item.heilights) &&
              item.heilights.slice(0, 2).map((h, i) => (
                <p
                  key={i}
                  className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full"
                >
                  {h.helight}
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
                    {h.helight}
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
              <p className="text-base text-gray-500">
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
