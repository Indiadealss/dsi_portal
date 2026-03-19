import React, { useEffect, useState } from 'react'
import Smallmain from './customantdesign/Smallmain'
import { useSelector } from 'react-redux';
import { getUserConnected, getUserShortlist, getUserViewed } from '../api/api';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Recentactivity = () => {

  const [active, setActive] = useState('');
  const user = useSelector((state) => state.user);
  const [allData, setAllData] = useState([]); 
  const [recentViewed, setRecentViewed] = useState([]);
  const [connectedViewed,setConnectedViewed] = useState([])
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  if (type === "shortlist") {
    setActive("shortlisted");
  } else if (type === "viewed") {
    setActive("viewed");
  } else if (type === "contacted") {
    setActive("contacted");
  }
}, [location.search]);

  const fetchShortlist = async () => {
    try {

      const { data } = await getUserShortlist(user?.id);

      if (data.success) {

        const resultsAre = data?.data;

        // ✅ extract actual property
        const result = resultsAre.map(item => item.propertyId);

        // ✅ filter
        const filtered = result.filter((p) => p.purpose === 'Project');

        if (filtered.length === 0) {
          setHasMore(false);
          return;
        }

        const formattedData = filtered.map((p) => {

          // ✅ location fix (string OR array handle)
          let locationData = [];
          try {
            if (typeof p.location === "string") {
              locationData = JSON.parse(p.location);
            } else {
              locationData = p.location;
            }
          } catch (err) {
            locationData = [];
          }

          // ✅ highlights
          let highlights = [];
          if (p.propertyfacing) highlights.push({ helight: p.propertyfacing });
          if (p.pobackup) highlights.push({ helight: p.pobackup });
          if (p.watersource) highlights.push({ helight: p.watersource });

          if (Array.isArray(p.overlo)) {
            p.overlo.forEach((item) => {
              highlights.push({ helight: item });
            });
          }

          // ✅ images fix (your data has broken first image)
          const validImages =
            Array.isArray(p.images) && p.images.length > 0
              ? p.images
                .filter((img) => img && img.src) // only valid src
                .map((img) => ({
                  type: img.type || "unknown",
                  src: img.src,
                  image: img,
                }))
              : [];

          return {
            id: p._id,
            property: p.property,

            images: validImages.length
              ? validImages
              : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg' }],

            title: locationData?.[0]?.apartment_name || p.projectname,

            heilights: highlights.length
              ? highlights
              : [{ helight: "N/A" }],

            subtitle:
              p.property === 'commercial'
                ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData?.[0]?.City}`
                : `${p.bedroom || ''} BHK ${p.propertyType} in ${locationData?.[0]?.City}`,

            bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
            bedroom: p.bedroom || '',

            location: locationData?.[0]?.Address || "Unknown",

            price: p.price || 0,
            npxid: p.npxid || "N/A",
            deposit: p.deposit || "N/A",
            unitData: p.unitData || "N/A",

            size: p.plotarea || 0,
            area: p.areaType || "Built-up",

            description: p.description || "No description available",

            time: new Date(p.updatedAt).toLocaleDateString(),

            owner: p.owner || "Owner",
          };
        });

        // ✅ append
        setAllData((prev) => [...prev, ...formattedData]);



      }

    } catch (error) {
      console.error(error);
    }
  };


  const fetchConnected = async () => {
    try {

      const { data } = await getUserConnected(user?.id);

      if (data.success) {

        const resultsAre = data?.data;

        // ✅ extract actual property
        const result = resultsAre.map(item => item.propertyId);

        // ✅ filter
        const filtered = result.filter((p) => p.purpose === 'Project');

        if (filtered.length === 0) {
          setHasMore(false);
          return;
        }

        const formattedData = filtered.map((p) => {

          // ✅ location fix (string OR array handle)
          let locationData = [];
          try {
            if (typeof p.location === "string") {
              locationData = JSON.parse(p.location);
            } else {
              locationData = p.location;
            }
          } catch (err) {
            locationData = [];
          }

          // ✅ highlights
          let highlights = [];
          if (p.propertyfacing) highlights.push({ helight: p.propertyfacing });
          if (p.pobackup) highlights.push({ helight: p.pobackup });
          if (p.watersource) highlights.push({ helight: p.watersource });

          if (Array.isArray(p.overlo)) {
            p.overlo.forEach((item) => {
              highlights.push({ helight: item });
            });
          }

          // ✅ images fix (your data has broken first image)
          const validImages =
            Array.isArray(p.images) && p.images.length > 0
              ? p.images
                .filter((img) => img && img.src) // only valid src
                .map((img) => ({
                  type: img.type || "unknown",
                  src: img.src,
                  image: img,
                }))
              : [];

          return {
            id: p._id,
            property: p.property,

            images: validImages.length
              ? validImages
              : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg' }],

            title: locationData?.[0]?.apartment_name || p.projectname,

            heilights: highlights.length
              ? highlights
              : [{ helight: "N/A" }],

            subtitle:
              p.property === 'commercial'
                ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData?.[0]?.City}`
                : `${p.bedroom || ''} BHK ${p.propertyType} in ${locationData?.[0]?.City}`,

            bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
            bedroom: p.bedroom || '',

            location: locationData?.[0]?.Address || "Unknown",

            price: p.price || 0,
            npxid: p.npxid || "N/A",
            deposit: p.deposit || "N/A",
            unitData: p.unitData || "N/A",

            size: p.plotarea || 0,
            area: p.areaType || "Built-up",

            description: p.description || "No description available",

            time: new Date(p.updatedAt).toLocaleDateString(),

            owner: p.owner || "Owner",
          };
        });

        // ✅ append
        setConnectedViewed((prev) => [...prev, ...formattedData]);



      }

    } catch (error) {
      console.error(error);
    }
  };


  const fetchViewed = async () => {
    try {

      const { data } = await getUserViewed(user?.id);

      if (data.success) {

        const resultsAre = data?.data;

        // ✅ extract actual property
        const result = resultsAre.map(item => item.propertyId);

        // ✅ filter
        const filtered = result.filter((p) => p.purpose === 'Project');

        if (filtered.length === 0) {
          setHasMore(false);
          return;
        }

        const formattedData = filtered.map((p) => {

          // ✅ location fix (string OR array handle)
          let locationData = [];
          try {
            if (typeof p.location === "string") {
              locationData = JSON.parse(p.location);
            } else {
              locationData = p.location;
            }
          } catch (err) {
            locationData = [];
          }

          // ✅ highlights
          let highlights = [];
          if (p.propertyfacing) highlights.push({ helight: p.propertyfacing });
          if (p.pobackup) highlights.push({ helight: p.pobackup });
          if (p.watersource) highlights.push({ helight: p.watersource });

          if (Array.isArray(p.overlo)) {
            p.overlo.forEach((item) => {
              highlights.push({ helight: item });
            });
          }

          // ✅ images fix (your data has broken first image)
          const validImages =
            Array.isArray(p.images) && p.images.length > 0
              ? p.images
                .filter((img) => img && img.src) // only valid src
                .map((img) => ({
                  type: img.type || "unknown",
                  src: img.src,
                  image: img,
                }))
              : [];

          return {
            id: p._id,
            property: p.property,

            images: validImages.length
              ? validImages
              : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg' }],

            title: locationData?.[0]?.apartment_name || p.projectname,

            heilights: highlights.length
              ? highlights
              : [{ helight: "N/A" }],

            subtitle:
              p.property === 'commercial'
                ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData?.[0]?.City}`
                : `${p.bedroom || ''} BHK ${p.propertyType} in ${locationData?.[0]?.City}`,

            bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
            bedroom: p.bedroom || '',

            location: locationData?.[0]?.Address || "Unknown",

            price: p.price || 0,
            npxid: p.npxid || "N/A",
            deposit: p.deposit || "N/A",
            unitData: p.unitData || "N/A",

            size: p.plotarea || 0,
            area: p.areaType || "Built-up",

            description: p.description || "No description available",

            time: new Date(p.updatedAt).toLocaleDateString(),

            owner: p.owner || "Owner",
          };
        });

        // ✅ append
        setRecentViewed((prev) => [...prev, ...formattedData]);



      }

    } catch (error) {
      console.error(error);
    }
  };



useEffect(() => {
  if (!user?.id) return;

  if (active === "shortlisted") {
    fetchShortlist();
  } else if (active === "viewed") {
    fetchViewed();
  }else if (active === 'contacted') {
    fetchConnected();
  }
}, [user?.id, active]);
  const data = null
  return (
    <div className='w-[70vw] mx-auto mt-[10vw]'>
      <div>
        <div className='flex border-none overflow-x-auto lg:border-b lg:border-gray-200'>

  {/* <button
    onClick={() => navigate("/recent-activity?type=recent")}
    className={active === 'recent' ? 'p-4 border-b-2 border-blue-300' : 'p-4'}
  >
    <span className='text-xs lg:text-lg'>Recent Searches</span>
  </button> */}

  <button
    onClick={() => navigate("/recent-activity?type=viewed")}
    className={active === 'viewed' ? 'p-4 border-b-2 border-blue-300' : 'p-4'}
  >
    <span className='text-xs lg:text-lg'>Viewed</span>
  </button>

  <button
    onClick={() => navigate("/recent-activity?type=shortlist")}
    className={active === 'shortlisted' ? 'p-4 border-b-2 border-blue-300' : 'p-4'}
  >
    <span className='text-xs lg:text-lg'>Shortlisted</span>
  </button>

  <button
    onClick={() => navigate("/recent-activity?type=contacted")}
    className={active === 'contacted' ? 'p-4 border-b-2 border-blue-300' : 'p-4'}
  >
    <span className='text-xs lg:text-lg'>Contacted</span>
  </button>

</div>

        <div className={active === 'shortlisted' ? 'mt-10' : 'hidden'}>
          <Smallmain title='Your Dream List' data={allData} />
        </div>

        <div className={active === 'viewed' ? 'mt-10' : 'hidden'}>
          <Smallmain title='GET STARTED WITH EXPLORING REAL ESTATE OPTIONS' data={recentViewed} />
        </div>

        <div className={active === 'contacted' ? 'mt-10' : 'hidden'}>
          <Smallmain title='GET STARTED WITH EXPLORING REAL ESTATE OPTIONS' data={connectedViewed} />
        </div>

        
      </div>
    </div>
  )
}

export default Recentactivity;
