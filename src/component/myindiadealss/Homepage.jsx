import React, { useEffect, useState } from 'react'

const Homepage = () => {
    const [range, setRange] = useState("30");
    const [stats, setStats] = useState(null);

    const handleFruitChange = {
  "newProjects": 284,
  "expiringSoon": 20,
  "recentlyExpired": 1,
  "enquiry": 284
}

useEffect(() => {
  setStats(handleFruitChange)
},[])
if (!stats) return <div>Loading...</div>;
  return (
    <div className='mx-5'>
      <div className='flex'>
         <select
      value={range}
      onChange={(e) => setRange(e.target.value)}
      className="border rounded px-2 py-2 text-sm w-40"
    >
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
    </select>
    <h4 className='ms-10 mt-2'><span className='font-medium text-gray-700'>Listings</span></h4>
    </div>

    {/*  */}

    <div className="flex gap-4 mt-5">
      <div className=" shadow-sm p-4 w-60 h-[20vw]">
        <h3 className="font-medium text-gray-700"><span className='text-gray-700 font-medium'>New Projects</span></h3>
        <p className="text-3xl font-semibold mt-1">{stats.newProjects}</p>
        <p className="text-gray-400 text-sm">responses</p>

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


    {/*  */}

    <div>
      <div>
        
      </div>
      <div></div>
    </div>
    </div>
  )
}

export default Homepage
