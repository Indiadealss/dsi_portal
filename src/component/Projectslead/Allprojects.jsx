import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllProjectlistingWithleads, getAllpropertiesDetailsUser } from '../../api/api';
import Dynameiclistingallprodects from '../crmCustomcomponents/Dynameiclistingallprodects';
import { useNavigate } from 'react-router-dom';

const Allprojects = () => {


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();


   

    const [numberofActiveProduct, setNumberofActiveProduct] = useState(0);
    const [numberofCampain, setNumberofCampain] = useState([]);

        const totalPages = Math.ceil(numberofActiveProduct / limit);

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
      useEffect(() => {
      if (!user?.id) return;
    
      const fetchProperties = async () => {
        try {
          const res = await getAllProjectlistingWithleads(user.id, page, limit);
    
          if (res.status === 200) {
            const properties = res.data;
    
            setNumberofActiveProduct(properties.total);
    
            const formattedData = await Promise.all(
              properties.properties.map(async (item) => {
                const location = await parseLocation(item.location);
    
                return {
                  id: item._id,
                  title: `${item.projectname}` || "",
                  campain_type:'All' || '',
                  count:'0',
                  price: item.price || "",
                  spid: item.spid || `npx${item.npxid}`,
                  status: item.status || "",
                  createdAt: item.createdAt || "",
                  expiry_Date: item.expiryDate || "N/A",
                  location: location || ""
                };
              })
            );
    
            setNumberofCampain(formattedData);
            console.log(res, properties);
          }
    
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchProperties();
    
    }, [user?.id, page, limit]);

    const numberofCampai = [
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'},
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'},
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'},
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'},
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'},
        {projectName:'Golden i',expiry_Date:'18 JAN 2026', campain_type:'All',count:'2'}
    ]

    const handleResponse = (id, item) => {
    navigate(`/mybrandsdoor/all_listings/responce/${id}`, {
      state: item
    });
  };
  return (
    <div className=' overflow-y-auto'>
        <div className='flex justify-between px-5 border-b-2 p-3 border-gray-300'>
            <div>
                <span className='text-xs cursor-default'>ACTIVATION STATUS</span>
                <div className='flex'>
                <span className='text-xs px-3  border-e cursor-pointer text-gray-600'>ALL</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Active</span>
                <span className='text-xs px-3 border-e cursor-pointer text-gray-600'>Expired</span>
            </div>
            </div>
            <div>
                <span className='cursor-default'>SORT</span>
            </div>
            
        </div>

        <div className='shadow-md w-[96%] m-3 p-2 border border-gray-300 rounded'>
            <span className='font-medium text-sm'>{numberofActiveProduct} Active Products</span> 
        </div>
        <div className='pb-20 '>
        {numberofCampain.map((item,index) => {
            return <div className='shadow-xl w-[96%] m-3 p-2 border border-gray-300 rounded py-10'>
                <div className='flex justify-around'>
                    <div><span>{item.title}</span></div>
                    <div>
                        <span>Expiry on: {item.expiry_Date}</span>
                    </div>
                    <div>
                        <p><span className='text-sm'>Campaign Type:{item.campain_type}</span></p>
                        <p><span className='text-sm'>Status:{item.campain_type}</span></p>
                        <p><span className='text-sm cursor-pointer text-blue-500' onClick={() => handleResponse(item.id, item)}>View Responses</span></p>
                    </div>
                </div>
            </div>
        })}

        

        <p className="mt-4 text-gray-700">
                Displaying {Array.from({ length: totalPages }, (_, index) => (
    
    <button
      key={index}
      onClick={() => setPage(index + 1)}
      className={`px-3 py-1 rounded cursor-pointer 
      ${page === index + 1 ? "text-blue-500 font-bold" : ""}`}
    >
      {index + 1}
    </button>

  ))} of {numberofActiveProduct}  results
            </p>
        </div>
        
    </div>
  )
}

export default Allprojects
