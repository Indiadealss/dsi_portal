import React, { useEffect, useState } from 'react'
import img1 from '../Images/noImageBg.svg';
import { IoIosAdd } from 'react-icons/io';
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router";
import Ownerdetails from './Ownerdetails';
import { getallProperty } from '../api/api';
import { Carousel } from 'antd';
import Custompropertycrousal from './customantdesign/Custompropertycrousal';
import { formatDistanceToNow } from 'date-fns';
export const PropertiesData = () => {

    let timeStamp = Date.now();

    console.log(timeStamp);
    const [properties, setProperties] = useState([]);
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore]  = useState(true)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
  console.log("Updated properties:", properties);
}, [properties]);

    const fetchProperties = async (pageNumber) => {
       try{

        const res = await getallProperty(pageNumber,10);
        const result = res.data;

        if(result.data.length === 0){
            setHasMore(false);
            return;
        }

        const formattedData = result.data.map((p) => {
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
            return{
                id:p._id,
      images: p.images?.length ? p.images : [{ src: img1, alt: "No image" }],
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
            }
        };
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[hasMore,loading])

    useEffect(() => {
        fetchProperties(page)
    },[page]);

    
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
        <div className=''>
            {properties.map((item, index) => {
                return (
                    <div key={index} className="flex w-full propertyListingHeight flex-col lg:flex-row  bg-white border border-gray-200 rounded-lg shadow-sm sm:p-2 dark:bg-gray-800 dark:border-gray-700 mt-5">
                        <div className=''>
                            <Custompropertycrousal images={item.images} />
                        </div>
                        <div className='md:webkitFillAvailable lg:w-[max-content] '>
                            <div className="px-6" >
                                <Link to={`/propertyDetails/${item.id}`}><h5 className='text-base font-base' ><span className='font-bold text-xl text-gray-700'>{item.title}</span></h5></Link>
                                <Link to="/propertyDetails"><h6 className='text-base font-medium'><span className='font-medium text-gray-700'>{item.subtitle}</span></h6></Link>
                            </div>
                            <div className='flex m-2 py-2'>

                                <div className='px-2 border-e border-gray-300'>
                                    <div className='flex '>
                                        <span className='text-sm'><MdCurrencyRupee className="mt-2 text-[15px] font-bold" /></span>
                                        <p ><span className='text-[15px] font-medium'>{item.price}/month </span></p>
                                    </div>
                                    <div className='flex'>
                                        <span className='text-sm'><IoIosAdd className="mt-1  text-lg" /></span>
                                        <p className='text-sm'><span className='text-[15px] font-medium'>Deposit</span></p>
                                        <span className='text-base'><MdCurrencyRupee className='mt-2 text-[15px]' /></span>
                                        <p>{item.deposit}</p>
                                    </div>
                                </div>

                                <div className='px-5 border-e border-gray-300'>
                                    <div className='flex'>
                                        <p className='text-sm'><span className='text-[15px] font-medium'>{Math.round(item.size * 10.76391041671)} Sqft ({item.size})</span></p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm'><span className='text-[15px] font-medium'>{item.area} Area</span></p>
                                    </div>

                                </div>
                                <div className='px-5'>
                                    <div className='flex'>
                                        <p className='text-sm'><span className='text-[15px] font-medium'>{item.bedroom}</span></p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm'><span className='text-[15px] font-medium'>{item.bathroom}</span></p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex py-2 relative group cursor-pointer">
                                <div>
                                    <p className="text-sm font-bold ps-5"><span className='text-[18px] font-medium'>Highlights:</span></p>
                                </div>

                                {Array.isArray(item.heilights) && item.heilights.slice(0, 2).map((item, index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full">
                                            {item.helight}
                                        </p>
                                    </div>
                                ))}

                                {Array.isArray(item.heilights) && item.heilights.length >= 3 && (
                                    <p className="text-gray-500 text-sm mx-1 px-2 py-0.5 bg-gray-100 rounded-full">
                                        +{item.heilights.length - 2}
                                    </p>
                                )}

                                {/* Hover card showing all highlights */}
                                <div className="absolute  left-0  bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
                                    <div className="flex flex-wrap gap-1">
                                        <div>
                                            <p className="font-bold text-sm mb-1">Highlights:</p>
                                        </div>
                                        {item.heilights.map((item, index) => (
                                            <span key={index} className="text-gray-700 text-sm px-2 py-1 bg-gray-100 rounded-full">
                                                {item.helight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            <div className="flex flex-wrap w-[32vw] px-5 py-3  group cursor-pointer">
                                <p className='text-sm wrap-normal md:wrap-break-word truncate '>{item.description}</p>

                                {/* Hover card showing all highlights */}
                                <div className="absolute    bg-white shadow-md border rounded-md p-3 hidden group-hover:block z-10">
                                    <div className="flex flex-wrap gap-1">
                                        <div>
                                            {/* <p className="font-bold text-sm mb-1">Desct:</p> */}
                                        </div>
                                        
                                            <span key={index} className="text-gray-700 text-sm px-2 py-1 ">
                                                {item.description}
                                            </span>
                                            <span>View Details</span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='flex ps-2 pt-2 justify-between'>
                                <div>
                                    <p className='text-base text-gray-500'>Dealer . {formatDistanceToNow(item.time , {addSuffix:true})}</p>
                                    <p className='text-sm font-bold text-gray-500'>{item.owner.name}</p>
                                </div>
                                <div className='flex'>
                                    <Ownerdetails details={item.owner}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
