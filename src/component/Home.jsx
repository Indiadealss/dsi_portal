import React, { useEffect, useState } from 'react';
import { WhatsAppOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Card, Avatar, Typography } from "antd";
import banner from '../Images/banner.jpg';
import Banner from './customcomponent/Banner';
import Searchbox from './customcomponent/Searchbox';
import Customcardcrousal from './customantdesign/Customcardcrousal';
import Customimagebar from './customantdesign/Customimagebar';
import Customcard from './customantdesign/Customcard';
import { Button } from "antd";
import Appartmentvill from './customantdesign/Appartmentvill';
import Antdcrousal from './customantdesign/Antdcrousal';
import Newlaunchcard from './customcomponent/Newlaunchcard';
import Dreamherosection from './customantdesign/Dreamherosection';
import Smallmain from './customantdesign/Smallmain';
import Handpickherosection from './customantdesign/Handpickherosection';
import Antdpropertycard from './customantdesign/Antdpropertycard';
import Antdcardcrousal from './customantdesign/Antdcardcrousal';
import Customantservicecard from './customantdesign/Customantservicecard';
import Antddobluecardcrousal from './customantdesign/Antddobluecardcrousal';
import Antdcitiescardcrousal from './customantdesign/Antdcitiescardcrousal';
import Contiunebrowser from './customcomponent/Contiunebrowser';
import { getallProperty, getProjectBanner } from '../api/api';
import { useSelector } from 'react-redux';
const Home = () => {

   const [hideBanner, setHideBanner] = useState(false);
   const [page,setPage] = useState(1)
  const [hasMore,setHasMore]  = useState(true)
  const [loading,setLoading] = useState(false)
  const location = 'All India';
  const [data,setData] = useState([]);

  const [crousalData,setCrousalData] = useState();
  const [HandpickedProject,setHandpickedProject] = useState();

    const getcrousal = async  () => {
      const res =  await  getProjectBanner()
      console.log(res.data.data,'res 35');

       setCrousalData(res.data.data);
      
  }

  const user = useSelector((state) => state.user);

  
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 290) {
        setHideBanner(true);
      } else {
        setHideBanner(false);
      }
    };
    getcrousal()

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


 

  const fetchProperties = async (pageNumber,purpose) => {
          
         try{
          const res = await getallProperty(pageNumber,location,purpose);
          const resultsAre = res.data?.data;
          const result = resultsAre.filter((p) => p.purpose === 'Project')

          if(result.length === 0){
            setHasMore(false);
            return;
          }

          const formattedData = result.map((p) => {
            let locationData = [];
            try{
                locationData = JSON.parse(p.location);
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
    ? p.images
        .filter(
          (img) =>
            img &&
            (img.src || img.fields?.src) &&
            (img.src || img.fields?.src) !== "No image uploaded"
        )
        .map((img) => ({
          type: img.type || img.fields?.type || "unknown",
          src: img.src || img.fields?.src || "",
          image: img, // store full original image object too
        }))
    : [];

            return{
                id:p._id,
                property:p.property,
      images: validImages.length ? validImages : [{ src: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg', alt: "No image" }],
      title: locationData[0]?.apartment_name || p.projectname,
      heilights:highlights.length ? highlights : [{ helight: "N/A" }],
      subtitle: p.property === 'commercial' ? `${p.availabestatus === 'Ready to move' ? p.availabestatus : ''} ${p.propertyType} in ${locationData[0]?.City}`: `${p.propertyType === 'plotLand' ? `${p.property} Property available in ${p.City} for ${p.purpose}`: `${p.bedroom} BHK ${p.propertyType} in ${p.City}`}`,
      bathroom: p.bathroom ? `${p.bathroom} Baths` : "N/A",
      bedroom:p.bedroom ? p.bedroom : '',
      location: p.location || "Unknown",
      price: p.price || 0,
      npxid:p.npxid? p.npxid : "N/A",
      deposit: p.deposit || "N/A",
      unitData:p.unitData || "N/A",
      size: p.plotarea || 0,
      area: p.areaType || "Built-up",
      description: p.description || "No description available",
      time: new Date(p.updatedAt).toLocaleDateString() || "N/A",
      owner: p.owner || "Owner",
       };
    });
    // // console.log(formattedData);
    
          
          setData((prev) => [...prev, ...formattedData])
          
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
              fetchProperties(page,'Project')
          },[page,location]);
      

 const handpickherosection = {
  rentHome:[{
    img : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Bulding_2.jpeg",
    title:"BUY PLOTS/LAND",
    subtitle:"Residential & Commerical Plots/Land",
    subtitleDesc:"Explore Residential,Agricultural, Industrial and Commerical Plots/Land",
    buttonName:"Explore Plots/Land",
    bannercontenttitle:"Best articles on Plots/land",
    articles : [
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ]

  }
  ],
  postPropertyViaWhatsapp:[{
    img : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Bulding_3.jpeg",
    title:`Post via  Whatsapp`,
    subtitle:"Sell or rent faster at the right price!",
    subtitleDesc:"List your property now",
    buttonName:"Post Property,It's Free",
    bannercontenttitle:"Articles & guides for property Owners",
    articles : [
    {
      title: "Kolkata Tower Demolition Impact on Buyers",
      date: "Sep 02,2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "No stamp duty on husing plots in Harya",
      date: "Aug 28,2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ]

  }
  ]

 }

  const  crousalDat = [
    {image:"https://picsum.photos/830/464?random=1"},
    {image:"https://picsum.photos/830/464?random=2"},
    {image:"https://picsum.photos/830/464?random=3"},
    {image:"https://picsum.photos/830/464?random=4"},
    {image:"https://picsum.photos/830/464?random=5"},
  ]

  const cities = [
    {
      title: "Delhi / NCR",
      date: "231,000+ Properties",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Bangalore",
      date: "62,000+ Properties",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "Pune",
      date: "64,000+ Properties",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ]

  if (!data || !crousalData) {
    // console.log(data);
    
        return (
            <div className='mb-5'>
                Loding...
            </div>
        )
    }

    
    const residential = data.map(item => {
        if (item.property === 'residential'){
          console.log(item,'item property');
          
          return item
        }
});

  console.log(residential,'residential');
  


    

    if(crousalData){
      console.log(crousalData);
    }
  return (
    <div className='mb-10'>
      <div className='block'>
        <div className='relative'>
          <Banner image={'https://cdn.brandsdoor.in/indiadealss/indiadealss/1766745220289-Brown%2BWhite%2BModern%2BProfessional%2BReal%2BEstate%2BBanner%2B%281%29.jpg'} />
          <div className='absolute  topSearchbox  object-cover w-[-webkit-fill-available] flex '>
            <Searchbox />
          </div>
        </div>
      </div>

      <div className={user.loggedIn ?  'mt-20 hidden lg:block' : 'hidden'}>
        {/* <Smallmain title='Continue browsing...' /> */}
        <Contiunebrowser title='Continue browsing...' />
      </div>
      {/* small {'GET STARTED WITH EXPLORING REAL ESTATE OPTIONS'} */}
      <div className="  grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 lg:mt-40 lg:hidden w-full max-w-[1440px] mx-auto">
        {/* Left content = 8/12 (≈66.7% ≈ 70%) */}
        <div className="lg:col-span-8 ms-3 space-y-10">
          <Customcardcrousal data={data} />

        {/* <Smallmain  title='The most search project in location' data={data}/> */}

          <Customimagebar />

          <div>
            <Appartmentvill />
            <Card
              style={{
                width: "98%",
                borderRadius: 12,
                background: "#0019432b",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Newlaunchcard colu={2} />
            </Card>
          </div>
        </div>

        {/* Right sidebar = 4/12 (≈33.3% ≈ 30%) */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 right-0 left-10">
            <Customcard />
          </div>
        </div>
      </div>

      {/* main */}
      <div className='mt-40 hidden lg:block w-full homeContainer max-w-[1265px] mx-auto'>
        <Smallmain  title='GET STARTED WITH EXPLORING REAL ESTATE OPTIONS' data={data}/>
        <div className='p-0 lg:p-[40px]'>
          <p className='text-center text-xs font-bold text-gray-400'>ALL PROPERTY NEEDS - ONE PORTAL</p>
          <h1 className='text-start lg:max-w-xl mx-auto lg:text-center font-bold text-black text-lg lg:text-xl my-3'>Find Better Places to Live, Work and Wonder...</h1>
          <Dreamherosection />
        </div>
        <Card
          style={{
            width: "90%",
            margin: "auto",
            borderRadius: 12,
            background: "#0019432b",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Newlaunchcard colu={2} />
        </Card>
        

          <div style={{ padding: "40px" }}>
          <h2 className=' font-bold text-black text-xl '>Handpicked Residential Projects</h2>
          <p className=' text-xs font-medium text-gray-300 mb-3'>Featured Residential projects across India</p>
        <div className="flex justify-evenly w-[85%] ">
          <div className={!residential[0] ? 'hidden' : ''}>
      <Antdpropertycard
        image="https://picsum.photos/500/450?random=1"
        logo="https://picsum.photos/100/100?random=1"
        title="Bricks Marvella"
        description="2,3,4 BHK Apartment, Tellapur, Hyderabad"
        price="₹ 99.71 Lacs - 2.58 Cr"
        featured
        data={residential[0]}
      />
      </div>
      <div className={!residential[1] ? 'hidden' : ''}>
      <Antdpropertycard
        image="https://picsum.photos/500/450?random=1"
        logo="https://picsum.photos/100/100?random=1"
        title="Rishi Coral Wood Bungalows"
        description="4,5 BHK Independent House/Villa, Hoshangabad Road, Bhopal"
        price="₹ 1.95 Cr"
        featured
        data={residential[1]}
      />
      </div>
    </div>
    </div>
    <div style={{ padding: "40px",marginTop:"60px" }} className={`${crousalData.length === 0 ? 'hidden' : ''}`}>
          <h2 className=' font-bold text-black text-xl '>Upcoming Projects</h2>
          <p className=' text-xs font-medium text-gray-300 mb-3'>Visit these projects and get early bird benefits</p>
            <Antdcardcrousal  crousal={crousalData}/>
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Dreamherosection />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Handpickherosection content={handpickherosection.rentHome} />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Handpickherosection content={handpickherosection.postPropertyViaWhatsapp} />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          <h2>Our Services for owners</h2>
          <p>Make your life easier with our service</p>
          <Customantservicecard />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          < Handpickherosection content={handpickherosection.rentHome} />
        </div>
        <div style={{padding:"40px",marginTop:"60px"}}>
          <p><span className='font-bold text-gray-400 '>TOP CITIES</span></p>
          <h1 className=' font-bold text-black text-xl my-3 '>Explore Real Estate in Popular Indian Cities</h1>
          <Antdcitiescardcrousal articles={cities} />
        </div>
      </div>
    </div>
  )
}


export default Home;