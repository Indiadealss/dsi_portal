import React, { useEffect, useState } from 'react'
import { lead } from '../../api/api';
import { useSelector } from 'react-redux';

const Homepage = () => {

    const [projects, setProjects] = useState([]);
const [properties, setProperties] = useState([]);
    const [stats, setStats] = useState({
  newProjects: 0,
  expiringSoon: 0,
  recentlyExpired: 0,
  enquiry: 0
});




  



 const user = useSelector((state) => state.user);



 

useEffect(() => {
      lead(user.id)
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data,'res.datas');
         const data = res.data.data;

         const propertyList = data[0] || [];
        const enquiryList = data[1] || [];

        setProjects(propertyList.filter(p => p.npxid));
        setProperties(propertyList.filter(p => p.spid));

          setStats({
  newProjects: propertyList.filter(p => p.npxid).length,
  properties: propertyList.filter(p => p.spid).length,
  expiringSoon: 0,
  recentlyExpired: 0,
  enquiry: enquiryList.length
});

console.log("propertyList", propertyList);
console.log("projects", propertyList.filter(p => p.npxid));
console.log("properties", propertyList.filter(p => p.spid));
        }
      })
      .catch(err => {
        console.error(err);
      });
  
},[user.id])
if (!projects.length && !properties.length) {
  return <div>Loading...</div>;
}


  return (
    <div className='mx-5'>
      <div className='flex'>
         {/* <select
      value={range}
      onChange={(e) => setRange(e.target.value)}
      className="border rounded px-2 py-2 text-sm w-40"
    >
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
    </select> */}
    <h4 className='ms-10 mt-2'><span className='font-medium text-gray-700'>Listings</span></h4>
    </div>

    {/*  */}

    <div className="flex gap-4 mt-5">
      <div className=" shadow-sm p-4 w-60 h-[20vw]">
        <div className='flex justify-between'>
        <div className={stats.newProjects  ? '' : 'hidden'}>
        <h3 className="font-medium text-gray-700"><span className='text-gray-700 font-medium'>New Projects</span></h3>
        <p className="text-3xl font-semibold mt-1">{stats.newProjects}</p>
        </div>
        <div className={stats.properties  ? '' : 'hidden'}>
        <h3 className="font-medium text-gray-700"><span className='text-gray-700 font-medium'>Properties</span></h3>
        <p className="text-3xl font-semibold mt-1">{stats.properties}</p>
        </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="bg-gray-100 p-2 rounded-full">
            📣 {/* icon placeholder */}
          </div>
          <div>
            <h3 className="text-sm font-medium"><span className='text-gray-700 font-medium'>Enquiry</span></h3>
            <p className="text-lg font-semibold">{stats.enquiry}</p>
          </div>
        </div>
      </div>

      <div className="h-[max-content] shadow-sm p-4 w-60 ">
        <h3 className="font-medium text-gray-700"><span className='text-gray-700 font-medium'>Expiring Soon</span></h3>
        <p className="text-3xl font-semibold mt-1">{stats.expiringSoon}</p>
        <p className="text-gray-400 text-sm">Listings</p>
      </div>

      <div className="h-[max-content] shadow-sm p-4 w-60">
        <h3 className="font-medium text-gray-700"><span className='text-gray-700 font-medium'>Recently Expired</span></h3>
        <p className="text-3xl font-semibold mt-1">{stats.recentlyExpired}</p>
        <p className="text-gray-400 text-sm">Listings</p>
      </div>
    </div>


    {/*Edit properties*/}


   
    </div>
  )
}

export default Homepage
